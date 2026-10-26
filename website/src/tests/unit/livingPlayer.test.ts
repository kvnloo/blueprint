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
