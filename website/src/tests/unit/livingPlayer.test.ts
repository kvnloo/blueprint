import { afterEach, test, mock } from 'node:test';
import assert from 'node:assert/strict';
import { LivingPlayer } from '../../lib/wallpaper/livingPlayer';
import { webglHarness, settle } from './webglMock';

afterEach(() => mock.restoreAll());

test('context loss shows poster, pauses frames and rebuilds all GPU resources before resuming', async () => {
  const h = webglHarness();
  let ready = 0;
  let poster = false;
  const player = new LivingPlayer({ canvas: h.canvas, assetBase: '/plate/',
    onReady: () => { ready++; poster = false; },
    onContextLost: () => { poster = true; },
  });
  await player.init(); player.start(); h.frame(16);
  const programs = h.calls.createProgram.length;
  const textures = h.calls.createTexture.length;
  const buffers = h.calls.createBuffer.length;
  const event = h.lose();
  assert.equal(event.defaultPrevented, true);
  assert.equal(poster, true);
  assert.equal(h.frames.size, 0);
  assert.equal(player.ready, false);
  h.restore(); await settle(); h.frame(32);
  assert.equal(h.calls.createProgram.length, programs * 2);
  assert.ok(h.calls.createTexture.length >= textures * 2);
  assert.equal(h.calls.createBuffer.length, buffers * 2);
  assert.equal(ready, 2);
  assert.equal(poster, false);
  assert.ok(h.calls.drawArrays.length >= 8, 'both first frames actually draw, not just signal readiness');
  player.dispose();
});

test('resume excludes hidden time and clears consecutive slow samples before adapting quality', async () => {
  const h = webglHarness();
  const samples: number[] = [];
  const player = new LivingPlayer({ canvas: h.canvas, assetBase: '/plate/', adaptive: true,
    onFps: (fps) => samples.push(fps),
  });
  await player.init(); player.start();
  h.frame(3500); h.frame(4000); h.frame(4500);
  const width = h.canvas.width;
  const count = samples.length;
  player.setVisible(false); h.frame(4600);
  h.setNow(60_000); player.setVisible(true); h.frame(60_016);
  assert.equal(samples.length, count, 'first resumed frame must not report the hidden interval');
  h.frame(60_516); h.frame(61_016); h.frame(61_516);
  assert.equal(h.canvas.width, width, 'old slow samples must not downgrade the resumed player');
  player.dispose();
});

test('20 mount/unmount cycles release every context after deleting resources', async () => {
  let activeContexts = 0;
  for (let i = 0; i < 20; i++) {
    const h = webglHarness();
    activeContexts++;
    const player = new LivingPlayer({ canvas: h.canvas, assetBase: '/plate/' });
    await player.init(); player.start(); h.frame(16);
    player.dispose(); player.dispose();
    assert.equal(h.resources.size, 0);
    assert.equal(h.calls.loseContext?.length, 1, `cycle ${i + 1} must release its context exactly once`);
    activeContexts -= h.calls.loseContext?.length ?? 0;
    assert.equal(activeContexts, 0);
    const programs = h.calls.createProgram.length;
    h.restore(); await settle();
    assert.equal(h.calls.createProgram.length, programs, 'disposed player cannot restore');
    assert.equal(h.frames.size, 0);
    mock.restoreAll();
  }
});

test('dispose during image decoding deletes pending programs and cannot restart later', async () => {
  const h = webglHarness();
  let resolve!: () => void;
  const decoded = new Promise<void>((r) => { resolve = r; });
  Object.assign(globalThis, { Image: class { decode() { return decoded; } } });
  const player = new LivingPlayer({ canvas: h.canvas, assetBase: '/plate/' });
  const init = player.init();
  player.dispose(); resolve(); await init; player.start();
  assert.equal(h.resources.size, 0);
  assert.equal(h.calls.loseContext?.length, 1);
  assert.equal(h.frames.size, 0);
});

test('restore failure stays on the poster without an unhandled rejection', async () => {
  const h = webglHarness();
  let gaveUp = 0;
  const player = new LivingPlayer({ canvas: h.canvas, assetBase: '/plate/', onGiveUp: () => gaveUp++ });
  await player.init(); player.start(); h.frame(16); h.lose();
  Object.assign(globalThis, { Image: class { decode() { return Promise.reject(new Error('decode failed')); } } });
  h.restore(); await settle();
  assert.equal(gaveUp, 1);
  assert.equal(player.ready, false);
  assert.equal(h.frames.size, 0);
  player.dispose();
});
