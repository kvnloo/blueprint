#!/usr/bin/env node
/**
 * Capture Living Ruins wallpaper frames and a small perf trace with Playwright.
 *
 *   node website/scripts/wallpaper/capture.mjs [baseUrl] [outDir]
 *
 * baseUrl defaults to http://127.0.0.1:4173/ (serve a build, e.g. `npx vite preview --port 4173`
 * from website/src). outDir defaults to <repo>/.wallpaper-shots (gitignored).
 * Set GL=swiftshader to force software GL; by default it asks Chromium for the
 * host GPU through ANGLE (gl-egl), which is what a visitor's browser would use.
 *
 * Writes {desktop,mobile}-t{0,2,4}s.png, {desktop,mobile}-explore.png, perf.json and
 * {desktop,mobile}-trace.json (Chrome trace, open in chrome://tracing or Perfetto).
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const here = dirname(fileURLToPath(import.meta.url));
const require = createRequire(resolve(here, '../../package.json'));
const { chromium } = require('playwright');

const base = process.argv[2] || 'http://127.0.0.1:4173/';
const out = resolve(process.argv[3] || resolve(here, '../../../.wallpaper-shots'));
mkdirSync(out, { recursive: true });

const glArgs =
  process.env.GL === 'swiftshader'
    ? ['--use-angle=swiftshader', '--enable-unsafe-swiftshader']
    : ['--use-angle=gl-egl', '--enable-gpu', '--ignore-gpu-blocklist'];

const targets = [
  { name: 'desktop', context: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 } },
  {
    name: 'mobile',
    context: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true },
  },
];

const browser = await chromium.launch({ args: glArgs });
const report = { base, gl: null, targets: {} };

for (const t of targets) {
  const ctx = await browser.newContext(t.context);
  const page = await ctx.newPage();
  await page.addInitScript(() => {
    window.__longTasks = [];
    try {
      new PerformanceObserver((list) => {
        for (const e of list.getEntries()) window.__longTasks.push({ start: e.startTime, dur: e.duration });
      }).observe({ type: 'longtask', buffered: true });
    } catch {}
  });
  const url = new URL(base);
  url.searchParams.set('wallpaper', 'webgl');
  const t0 = Date.now();
  await page.goto(url.toString(), { waitUntil: 'commit', timeout: 180_000 });
  report.gl ??= await page.evaluate(() => {
    const g = document.createElement('canvas').getContext('webgl');
    const e = g && g.getExtension('WEBGL_debug_renderer_info');
    return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g ? 'webgl' : 'none';
  });
  const canvas = page.locator('canvas[data-testid="living-wallpaper"]');
  await canvas.waitFor({ state: 'attached', timeout: 180_000 });
  await page.waitForFunction(
    () => document.querySelector('canvas[data-testid="living-wallpaper"]')?.dataset.ready === '1',
    null,
    { timeout: 180_000 },
  );
  const readyMs = Date.now() - t0;
  await page.waitForTimeout(1300); // let the 1.2 s crossfade finish

  for (const s of [0, 2, 4]) {
    if (s) await page.waitForTimeout(2000);
    await page.screenshot({ path: `${out}/${t.name}-t${s}s.png`, timeout: 180_000 });
  }

  // perf window: 6 s with pointer movement (parallax + ripples) and a trace
  await browser.startTracing(page, {
    path: `${out}/${t.name}-trace.json`,
    categories: ['devtools.timeline', 'disabled-by-default-devtools.timeline.frame', 'gpu', 'blink'],
  });
  const vp = t.context.viewport;
  const longBefore = await page.evaluate(() => window.__longTasks.length);
  const frames = page.evaluate(
    () =>
      new Promise((res) => {
        const times = [];
        const start = performance.now();
        const tick = (now) => {
          times.push(now);
          if (now - start < 6000) requestAnimationFrame(tick);
          else res(times);
        };
        requestAnimationFrame(tick);
      }),
  );
  for (let i = 0; i < 24; i++) {
    const a = i / 24;
    await page.mouse.move(vp.width * (0.2 + 0.6 * a), vp.height * (0.55 + 0.25 * Math.sin(a * 6.28)));
    await page.waitForTimeout(200);
  }
  const times = await frames;
  await browser.stopTracing();
  const longTasks = await page.evaluate((n) => window.__longTasks.slice(n), longBefore);
  const deltas = times.slice(1).map((v, i) => v - times[i]).sort((x, y) => x - y);
  const pct = (p) => deltas[Math.min(deltas.length - 1, Math.floor(deltas.length * p))];
  const playerFps = await canvas.getAttribute('data-fps');
  report.targets[t.name] = {
    viewport: vp,
    dpr: t.context.deviceScaleFactor,
    canvas: await canvas.evaluate((c) => ({ width: c.width, height: c.height })),
    readyMs,
    fpsAvg: +(((times.length - 1) * 1000) / (times[times.length - 1] - times[0])).toFixed(1),
    playerFps: playerFps ? +playerFps : null,
    frameMs: { p50: +pct(0.5).toFixed(1), p95: +pct(0.95).toFixed(1), max: +deltas[deltas.length - 1].toFixed(1) },
    longTasksDuringWindow: longTasks.length,
    longTaskMsDuringWindow: +longTasks.reduce((s, l) => s + l.dur, 0).toFixed(0),
    longTasksBeforeWindow: longBefore,
  };

  // Explore mode frame (content steps aside, hotspots visible)
  await page.getByTestId('wallpaper-explore').click();
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${out}/${t.name}-explore.png`, timeout: 180_000 });
  await ctx.close();
}

await browser.close();
writeFileSync(`${out}/perf.json`, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify(report, null, 2));
