import { afterEach, test, mock } from 'node:test';
import assert from 'node:assert/strict';

afterEach(() => mock.restoreAll());

async function fixture(id: string, idle = true, brokenRenderer = false) {
  const capability = await import(`../../lib/wallpaper/capability.ts?case=${id}`);
  let callback: () => void = () => {};
  let contexts = 0;
  let released = 0;
  Object.assign(globalThis, {
    window: { matchMedia: () => ({ matches: false }), ...(idle ? {
      requestIdleCallback: (fn: () => void) => { callback = fn; return 1; },
    } : {}) },
    document: { createElement: () => ({ getContext: () => {
      contexts++;
      return {
        getExtension: (name: string) => name === 'WEBGL_lose_context'
          ? { loseContext: () => released++ } : { UNMASKED_RENDERER_WEBGL: 1 },
        getParameter: () => { if (brokenRenderer) throw new Error('driver'); return 'GPU'; },
      };
    } }) },
  });
  if (!idle) mock.method(globalThis, 'setTimeout', ((fn: () => void) => { callback = fn; return 1; }) as any);
  return { capability, run: () => callback(), contexts: () => contexts, released: () => released };
}

test('probe is deferred to idle, shared while pending and cached after resolution', async () => {
  const h = await fixture('idle');
  const first = h.capability.probeWebGL();
  const second = h.capability.probeWebGL();
  assert.equal(h.contexts(), 0, 'mount must not create a context');
  assert.equal(first, second);
  h.run();
  assert.equal(await first, 'hardware');
  assert.equal(await h.capability.probeWebGL(), 'hardware');
  assert.equal(h.contexts(), 1);
  assert.equal(h.released(), 1);
});

test('timer fallback also defers the probe', async () => {
  const h = await fixture('timer', false);
  const result = h.capability.detectWallpaperTier();
  assert.equal(h.contexts(), 0);
  h.run();
  assert.equal(await result, 'webgl');
  assert.equal(h.released(), 1);
});

test('probe releases its context even if renderer inspection throws', async () => {
  const h = await fixture('broken', true, true);
  const result = h.capability.probeWebGL(); h.run();
  assert.equal(await result, 'none');
  assert.equal(h.released(), 1);
});

test('poster policy skips probing entirely', async () => {
  const h = await fixture('poster');
  assert.equal(await h.capability.detectWallpaperTier({ forceTier: 'poster' }), 'poster');
  assert.equal(h.contexts(), 0);
});
