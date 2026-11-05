import { mock } from 'node:test';

export function webglHarness() {
  let lost = false;
  let id = 0;
  const calls: Record<string, any[][]> = {};
  const resources = new Set<object>();
  const constants: Record<string, number> = {};
  const gl = new Proxy({}, {
    get(_target, key: string) {
      if (key === 'isContextLost') return () => lost;
      if (key === 'getExtension') return (name: string) => name === 'WEBGL_lose_context'
        ? { loseContext: () => { lost = true; calls.loseContext ??= []; calls.loseContext.push([]); } } : null;
      if (key === 'getProgramParameter') return () => true;
      if (key === 'getAttribLocation') return () => 0;
      if (key === 'checkFramebufferStatus') return () => gl.FRAMEBUFFER_COMPLETE;
      if (/^[A-Z_0-9]+$/.test(key)) return constants[key] ??= ++id;
      return (...args: any[]) => {
        (calls[key] ??= []).push(args);
        if (key.startsWith('create')) { const r = { id: ++id }; resources.add(r); return r; }
        if (key.startsWith('delete')) resources.delete(args[0]);
        if (key === 'getUniformLocation') return {};
      };
    },
  }) as WebGLRenderingContext;
  class Canvas extends EventTarget {
    clientWidth = 800;
    clientHeight = 600;
    width = 0;
    height = 0;
    style = { opacity: '0', transition: '' };
    dataset: Record<string, string> = {};
    getContext() { return gl; }
  }
  const canvas = new Canvas() as unknown as HTMLCanvasElement;
  let now = 0;
  let rafId = 0;
  const frames = new Map<number, FrameRequestCallback>();
  mock.method(performance, 'now', () => now);
  mock.method(globalThis, 'setTimeout', globalThis.setTimeout);
  Object.assign(globalThis, {
    window: { innerWidth: 800, innerHeight: 600, devicePixelRatio: 1 },
    document: { hidden: false },
    Image: class { decode() { return Promise.resolve(); } },
    requestAnimationFrame: (fn: FrameRequestCallback) => { frames.set(++rafId, fn); return rafId; },
    cancelAnimationFrame: (n: number) => frames.delete(n),
  });
  return {
    gl, canvas, calls, resources, frames,
    setNow: (value: number) => { now = value; },
    frame(value: number) {
      now = value;
      const pending = [...frames.values()]; frames.clear();
      for (const fn of pending) fn(now);
    },
    lose() { lost = true; const event = new Event('webglcontextlost', { cancelable: true }); canvas.dispatchEvent(event); return event; },
    restore() { lost = false; resources.clear(); canvas.dispatchEvent(new Event('webglcontextrestored')); },
  };
}

export async function settle() { for (let i = 0; i < 20; i++) await Promise.resolve(); }
