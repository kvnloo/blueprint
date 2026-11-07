import { test, expect } from '@playwright/test';

const selector = 'canvas[data-testid="living-wallpaper"]';

test('a real lost context reveals the poster then restores the same canvas with non-black pixels', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?wallpaper=webgl', { waitUntil: 'domcontentloaded' });
  const canvas = page.locator(selector);
  await expect(canvas).toHaveAttribute('data-ready', '1', { timeout: 60_000 });
  await canvas.evaluate((c: HTMLCanvasElement) => {
    (window as any).__wallpaperCanvas = c;
    const ext = c.getContext('webgl')!.getExtension('WEBGL_lose_context')!;
    (window as any).__restoreWallpaper = () => ext.restoreContext();
    ext.loseContext();
  });
  await expect(canvas).toHaveAttribute('data-ready', '0');
  expect(await canvas.evaluate((c) => c.style.opacity)).toBe('0');
  await expect(page.locator('#wallpaper-poster img')).toBeVisible();
  await page.evaluate(() => (window as any).__restoreWallpaper());
  await expect(canvas).toHaveAttribute('data-ready', '1', { timeout: 60_000 });
  expect(await canvas.evaluate((c) => c === (window as any).__wallpaperCanvas)).toBe(true);
  const rgb = await canvas.evaluate((c: HTMLCanvasElement) => new Promise<number[]>((resolve) => {
    requestAnimationFrame(() => {
      const gl = c.getContext('webgl')!;
      const pixel = new Uint8Array(4);
      gl.readPixels(c.width >> 1, c.height >> 1, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, pixel);
      resolve([...pixel].slice(0, 3));
    });
  }));
  expect(rgb.some((channel) => channel > 0)).toBe(true);
  expect(errors).toEqual([]);
  await page.waitForTimeout(1300);
  await page.screenshot({ path: testInfo.outputPath('restored.png') });
});

test('20 React StrictMode mount/unmount cycles leave no live GPU contexts', async ({ page }) => {
  test.setTimeout(180_000);
  const warnings: string[] = [];
  page.on('console', (message) => { if (/Too many active WebGL contexts/i.test(message.text())) warnings.push(message.text()); });
  await page.addInitScript(() => {
    const contexts = new Set<WebGLRenderingContext>();
    (window as any).__wallpaperContexts = contexts;
    const getContext = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: any[]) {
      const context = (getContext as any).call(this, type, ...args);
      if (type === 'webgl' && context) contexts.add(context);
      return context;
    } as any;
  });
  await page.goto('/?wallpaper=webgl', { waitUntil: 'domcontentloaded' });
  const pause = page.locator('button.fixed.bottom-4.right-4');
  for (let i = 0; i < 20; i++) {
    await expect(page.locator(selector)).toHaveAttribute('data-ready', '1', { timeout: 60_000 });
    await pause.click();
    await expect(page.locator(selector)).toHaveCount(0);
    expect(await page.evaluate(() => [...(window as any).__wallpaperContexts].every((gl) => gl.isContextLost()))).toBe(true);
    if (i < 19) await pause.click();
  }
  expect(await page.evaluate(() => (window as any).__wallpaperContexts.size)).toBeGreaterThanOrEqual(20);
  expect(warnings).toEqual([]);
});

test('a context that never comes back is rebuilt once the page is visible again', async ({ page }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/?wallpaper=webgl', { waitUntil: 'domcontentloaded' });
  const canvas = page.locator(selector);
  await expect(canvas).toHaveAttribute('data-ready', '1', { timeout: 60_000 });
  await canvas.evaluate((c: HTMLCanvasElement) => {
    (window as any).__oldCanvas = c;
    c.getContext('webgl')!.getExtension('WEBGL_lose_context')!.loseContext();
  });
  await expect(canvas).toHaveAttribute('data-ready', '0');
  // Background the tab and come back, as a phone browser does; the lost context is never restored.
  await page.evaluate(() => {
    const set = (hidden: boolean) => {
      Object.defineProperty(document, 'hidden', { value: hidden, configurable: true });
      Object.defineProperty(document, 'visibilityState', { value: hidden ? 'hidden' : 'visible', configurable: true });
      document.dispatchEvent(new Event('visibilitychange'));
    };
    set(true);
    set(false);
  });
  await expect.poll(
    () => page.evaluate((sel) => {
      const c = document.querySelector(sel) as HTMLCanvasElement | null;
      return !!c && c !== (window as any).__oldCanvas && c.dataset.ready === '1';
    }, selector),
    { timeout: 60_000 },
  ).toBe(true);
  expect(await page.locator(selector).count()).toBe(1);
  expect(errors).toEqual([]);
});

test('Explore opens the 8K deep-zoom inspector with tiles and the master download', async ({ page }, testInfo) => {
  test.setTimeout(90_000);
  const tiles: number[] = [];
  page.on('response', (r) => { if (r.url().includes('/art/scene_files/')) tiles.push(r.status()); });
  await page.goto('/?wallpaper=poster', { waitUntil: 'domcontentloaded' });
  await page.getByTestId('wallpaper-explore').click();
  const portrait = (page.viewportSize()?.height ?? 0) > (page.viewportSize()?.width ?? 0);
  if (portrait) await page.locator('[data-chip="waterwheel"]').click();
  await page.locator('[data-chip="inspect"]').click();
  const dialog = page.getByRole('dialog', { name: 'Inspect Living Ruins' });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('status')).toHaveText(/Drag to pan/, { timeout: 30_000 });
  await expect.poll(() => tiles.filter((s) => s === 200).length, { timeout: 30_000 }).toBeGreaterThan(0);
  expect(tiles.every((s) => s === 200)).toBe(true);
  await expect(dialog.getByRole('link', { name: 'Download 8K' })).toHaveAttribute('href', /releases\/download\/living-ruins-8k-v1\/living-ruins-8k\.png$/);
  if (portrait) await expect(dialog.locator('strong')).toHaveText('Water wheel');
  await page.waitForTimeout(1500);
  await page.screenshot({ path: testInfo.outputPath('inspect.png') });
  await dialog.getByRole('button', { name: 'Return to scene' }).click();
  await expect(dialog).toHaveCount(0);
});
