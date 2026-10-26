/**
 * Living Ruins WebGL1 player.
 *
 * Ported from the owner's .files RuinsPlayer (ping-pong FBO chain, full-screen
 * triangle passes, additive particle sprites, DPR / max-dimension caps), with
 * passes rebuilt for our own plate and masks:
 *
 *   plate --scene--> A --water--> B --composite--> screen --particles (additive)
 *
 * No CPU simulation beyond <= 64 sprites, no WASM, every pass is a stateless
 * function of time. See shaders.ts and view.ts.
 */

import {
  FRAG_COMPOSITE,
  FRAG_PARTICLE,
  FRAG_SCENE,
  FRAG_WATER,
  VERT_PARTICLE,
  VERT_QUAD,
} from './shaders';
import {
  coverView,
  focusPanX,
  getPanFocus,
  isPortrait,
  MAX_PARALLAX,
  portraitPan,
  publishCamera,
  screenToPlate,
  type Camera,
  type View,
} from './view';

export type WallpaperQuality = 'high' | 'low';

export type LivingPlayerOptions = {
  canvas: HTMLCanvasElement;
  /** URL of the folder that holds base.webp, masks.webp, flow.webp, depth.webp (trailing slash optional). */
  assetBase: string;
  quality?: WallpaperQuality;
  /** Degrade (lower resolution, then drop extras, then give up) when fps stays under 24. */
  adaptive?: boolean;
  onReady?: () => void;
  onFps?: (fps: number) => void;
  /** Called when adaptive degradation runs out of steps; the host should fall back to the poster. */
  onGiveUp?: () => void;
};

type GL = WebGLRenderingContext;
type FBO = { fb: WebGLFramebuffer; tex: WebGLTexture; w: number; h: number };
type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null>; a: Record<string, number> };

type Particle = {
  kind: 0 | 1; // 0 = ember, 1 = pollen
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  r: number;
  g: number;
  b: number;
  a: number;
  seed: number;
};

/** Plate-space anchors on our own plate (see website/art/living-ruins). */
const EMBERS: [number, number, number, number][] = [
  // x, y, radius (plate-height units), intensity
  [0.956, 0.602, 0.03, 0.55], // forge mouth
  [0.804, 0.565, 0.016, 0.45], // post lantern
  [0.875, 0.574, 0.014, 0.4], // workshop lantern
  [0.951, 0.415, 0.012, 0.18], // chimney glow
];
const EMBER_SOURCES: [number, number][] = [
  [0.951, 0.412], // chimney
  [0.956, 0.6], // forge
];
const SUN: [number, number] = [0.53, -0.18];
/** Three of the source scene's waterwaves passes: direction (rad), scale, speed. */
const WAVES: [number, number, number][] = [
  [1.87, 61.55, 5.0],
  [4.96, 92.32, 3.34],
  [0.0, 35.91, 2.83],
];
const MAX_RIPPLES = 8;
const TIME_WRAP = 3600;

type PendingProg = { p: WebGLProgram; v: WebGLShader; f: WebGLShader; uniforms: string[]; attribs: string[] };

/** Start compiling + linking without querying status, so the driver can work in parallel. */
function startProgram(gl: GL, vs: string, fs: string, uniforms: string[], attribs: string[]): PendingProg {
  const p = gl.createProgram()!;
  const v = gl.createShader(gl.VERTEX_SHADER)!;
  const f = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(v, vs);
  gl.shaderSource(f, fs);
  gl.compileShader(v);
  gl.compileShader(f);
  gl.attachShader(p, v);
  gl.attachShader(p, f);
  gl.linkProgram(p);
  return { p, v, f, uniforms, attribs };
}

function finishProgram(gl: GL, pp: PendingProg): Prog {
  const { p, v, f } = pp;
  if (!gl.getProgramParameter(p, gl.LINK_STATUS) && !gl.isContextLost()) {
    const log =
      gl.getShaderInfoLog(v) || gl.getShaderInfoLog(f) || gl.getProgramInfoLog(p) || 'shader link failed';
    throw new Error(log);
  }
  gl.deleteShader(v);
  gl.deleteShader(f);
  const u: Prog['u'] = {};
  for (const n of pp.uniforms) u[n] = gl.getUniformLocation(p, n);
  const a: Prog['a'] = {};
  for (const n of pp.attribs) a[n] = gl.getAttribLocation(p, n);
  return { p, u, a };
}

function texture(gl: GL, wrap: number = gl.CLAMP_TO_EDGE): WebGLTexture {
  const t = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, t);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrap);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrap);
  return t;
}

function createFBO(gl: GL, w: number, h: number): FBO {
  const tex = texture(gl);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
  if (status !== gl.FRAMEBUFFER_COMPLETE && !gl.isContextLost()) throw new Error('framebuffer incomplete');
  return { fb, tex, w, h };
}

async function loadImage(url: string): Promise<HTMLImageElement> {
  const img = new Image();
  img.decoding = 'async';
  img.crossOrigin = 'anonymous';
  img.src = url;
  await img.decode();
  return img;
}

/**
 * Our own tileable ripple normal map: 4 octaves of periodic value noise turned
 * into a tangent-space normal map (RGB, +Z plateau). Power of two, so it can
 * REPEAT and mipmap in WebGL1.
 */
export function generateRippleNormals(size = 256, seed = 7): Uint8Array {
  const h = new Float32Array(size * size);
  let s = seed >>> 0;
  const rand = () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
  const octaves = [
    [8, 0.5],
    [16, 0.28],
    [32, 0.15],
    [64, 0.07],
  ];
  for (const [cells, amp] of octaves) {
    const lattice = new Float32Array(cells * cells);
    for (let i = 0; i < lattice.length; i++) lattice[i] = rand();
    const step = size / cells;
    for (let y = 0; y < size; y++) {
      const gy = y / step;
      const y0 = Math.floor(gy) % cells;
      const y1 = (y0 + 1) % cells;
      let fy = gy - Math.floor(gy);
      fy = fy * fy * (3 - 2 * fy);
      for (let x = 0; x < size; x++) {
        const gx = x / step;
        const x0 = Math.floor(gx) % cells;
        const x1 = (x0 + 1) % cells;
        let fx = gx - Math.floor(gx);
        fx = fx * fx * (3 - 2 * fx);
        const a = lattice[y0 * cells + x0] + (lattice[y0 * cells + x1] - lattice[y0 * cells + x0]) * fx;
        const b = lattice[y1 * cells + x0] + (lattice[y1 * cells + x1] - lattice[y1 * cells + x0]) * fx;
        h[y * size + x] += (a + (b - a) * fy) * amp;
      }
    }
  }
  const out = new Uint8Array(size * size * 4);
  const k = 9.0;
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const l = h[y * size + ((x - 1 + size) % size)];
      const r = h[y * size + ((x + 1) % size)];
      const u = h[((y - 1 + size) % size) * size + x];
      const d = h[((y + 1) % size) * size + x];
      let nx = (l - r) * k;
      let ny = (u - d) * k;
      let nz = 1;
      const len = Math.hypot(nx, ny, nz);
      nx /= len;
      ny /= len;
      nz /= len;
      const i = (y * size + x) * 4;
      out[i] = Math.round((nx * 0.5 + 0.5) * 255);
      out[i + 1] = Math.round((ny * 0.5 + 0.5) * 255);
      out[i + 2] = Math.round((nz * 0.5 + 0.5) * 255);
      out[i + 3] = 255;
    }
  }
  return out;
}

const isSmallScreen = () => typeof window !== 'undefined' && Math.min(window.innerWidth, window.innerHeight) <= 768;

export class LivingPlayer {
  readonly gl: GL;
  private opts: LivingPlayerOptions;
  private quality: WallpaperQuality;
  private disposed = false;
  private running = false;
  private visible = true;
  private raf = 0;
  private startedAt = 0;
  private lastNow = 0;
  private fpsWindowStart = 0;
  private fpsFrames = 0;
  private slowSamples = 0;
  private firstFrame = false;

  private quad!: WebGLBuffer;
  private progScene!: Prog;
  private progWater!: Prog;
  private progComposite!: Prog;
  private progParticle!: Prog;
  private texBase!: WebGLTexture;
  private texMasks!: WebGLTexture;
  private texFlow!: WebGLTexture;
  private texDepth!: WebGLTexture;
  private texNormal!: WebGLTexture;
  private fboA: FBO | null = null;
  private fboB: FBO | null = null;
  private drawW = 0;
  private drawH = 0;

  /** Resolution multiplier lowered by adaptive degradation. */
  private renderScale = 1;
  private extras = true;

  private particles: Particle[] = [];
  private particleBuf: WebGLBuffer | null = null;
  private particleData = new Float32Array(0);

  private ripples = new Float32Array(MAX_RIPPLES * 4);
  private rippleNext = 0;

  private pointer = { x: 0, y: 0 };
  private tilt = { x: 0, y: 0, on: false };
  private par = { x: 0, y: 0 };
  private scroll = { y: 0, max: 1, vh: 1 };
  private exploring = false;
  private dim = 0;
  private panX = 0;
  private view: View = { sx: 1, sy: 1, ox: 0, oy: 0 };
  private wavesUniform = new Float32Array(12);
  private embersUniform = new Float32Array(16);

  fps = 0;
  ready = false;

  constructor(opts: LivingPlayerOptions) {
    const gl = opts.canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
      preserveDrawingBuffer: false,
    }) as GL | null;
    if (!gl) throw new Error('WebGL unavailable');
    this.gl = gl;
    this.opts = opts;
    this.quality = opts.quality ?? 'high';

    WAVES.forEach(([dir, scale, speed], i) => {
      // WE rotateVec2(vec2(0,-1), dir), as in the .files player
      this.wavesUniform.set([Math.sin(dir), -Math.cos(dir), scale, speed], i * 4);
    });
    EMBERS.forEach((e, i) => this.embersUniform.set(e, i * 4));
  }

  async init(): Promise<void> {
    const gl = this.gl;
    // 1. start the network fetches first, 2. queue shader compiles (parallel where the
    //    driver supports KHR_parallel_shader_compile), 3. only then block on results.
    const base = this.opts.assetBase.replace(/\/?$/, '/');
    const images = Promise.all(['base.webp', 'masks.webp', 'flow.webp', 'depth.webp'].map((f) => loadImage(base + f)));
    gl.getExtension('KHR_parallel_shader_compile');
    const plateU = ['u_view', 'u_par', 'u_depth'];
    const pending = [
      startProgram(gl, VERT_QUAD, FRAG_SCENE, [...plateU, 'u_base', 'u_masks', 'u_time', 'u_sway'], ['a_pos']),
      startProgram(
        gl,
        VERT_QUAD,
        FRAG_WATER,
        [...plateU, 'u_fb', 'u_masks', 'u_flow', 'u_normal', 'u_time', 'u_waves', 'u_ripples'],
        ['a_pos'],
      ),
      startProgram(
        gl,
        VERT_QUAD,
        FRAG_COMPOSITE,
        [...plateU, 'u_fb', 'u_masks', 'u_time', 'u_embers', 'u_sun', 'u_shafts', 'u_fog', 'u_vig', 'u_dim'],
        ['a_pos'],
      ),
      startProgram(gl, VERT_PARTICLE, FRAG_PARTICLE, ['u_view', 'u_par', 'u_aspect'], ['a_corner', 'a_pos', 'a_size', 'a_color']),
    ];

    this.quad = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    // Procedural ripple normal (ours; never the workshop texture).
    this.texNormal = texture(gl, gl.REPEAT);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, generateRippleNormals());
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);

    const [imgBase, imgMasks, imgFlow, imgDepth] = await images;
    if (this.disposed) return;
    [this.progScene, this.progWater, this.progComposite, this.progParticle] = pending.map((pp) => finishProgram(gl, pp));
    if (this.disposed) return;
    // Images stay top-left origin (no FLIP_Y): texture (0,0) is the plate's top-left.
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    const upload = (img: HTMLImageElement) => {
      const t = texture(gl);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
      return t;
    };
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.BROWSER_DEFAULT_WEBGL);
    this.texBase = upload(imgBase);
    gl.pixelStorei(gl.UNPACK_COLORSPACE_CONVERSION_WEBGL, gl.NONE);
    this.texMasks = upload(imgMasks);
    this.texFlow = upload(imgFlow);
    this.texDepth = upload(imgDepth);

    this.particleBuf = gl.createBuffer();
    this.seedParticles();
    this.resize();
    this.ready = true;
  }

  /* ------------------------------ inputs ------------------------------ */

  /** Pointer position in -1..1 (x right, y down). */
  setPointer(x: number, y: number) {
    this.pointer.x = Math.max(-1, Math.min(1, x));
    this.pointer.y = Math.max(-1, Math.min(1, y));
  }

  /** Device tilt in -1..1; overrides the pointer while active. */
  setTilt(x: number, y: number) {
    this.tilt.on = true;
    this.tilt.x = Math.max(-1, Math.min(1, x));
    this.tilt.y = Math.max(-1, Math.min(1, y));
  }

  setScroll(y: number, max: number, vh: number) {
    this.scroll.y = y;
    this.scroll.max = Math.max(1, max);
    this.scroll.vh = Math.max(1, vh);
  }

  setExplore(on: boolean) {
    this.exploring = on;
  }

  /** Drop a ripple at a screen position (0..1, top-left origin). Only shows on water. */
  addRipple(sx: number, sy: number, strength = 1) {
    const p = screenToPlate(this.view, sx, sy);
    const i = this.rippleNext;
    this.rippleNext = (this.rippleNext + 1) % MAX_RIPPLES;
    this.ripples.set([p.x, p.y, this.time(), strength], i * 4);
  }

  setQuality(q: WallpaperQuality) {
    if (q === this.quality) return;
    this.quality = q;
    this.seedParticles();
    this.resize(true);
  }

  setVisible(v: boolean) {
    this.visible = v;
    if (v && this.running && !this.raf && !this.disposed) this.raf = requestAnimationFrame(this.loop);
  }

  /* ----------------------------- lifecycle ---------------------------- */

  resize = (force = false) => {
    if (this.disposed || !this.ready) return;
    const canvas = this.opts.canvas;
    const small = isSmallScreen();
    const maxDpr = this.quality === 'low' ? 1 : 1.5;
    const maxDim = (this.quality === 'low' || small ? 1280 : 1920) * this.renderScale;
    const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
    let w = Math.max(1, Math.floor(canvas.clientWidth * dpr * this.renderScale));
    let h = Math.max(1, Math.floor(canvas.clientHeight * dpr * this.renderScale));
    const longest = Math.max(w, h);
    if (longest > maxDim) {
      const s = maxDim / longest;
      w = Math.max(1, Math.floor(w * s));
      h = Math.max(1, Math.floor(h * s));
    }
    if (!force && w === this.drawW && h === this.drawH) return;
    canvas.width = w;
    canvas.height = h;
    this.drawW = w;
    this.drawH = h;
    this.rebuildFBOs(w, h);
  };

  start() {
    if (this.disposed || this.running || !this.ready) return;
    this.running = true;
    this.startedAt = performance.now();
    this.lastNow = this.startedAt;
    this.fpsWindowStart = this.startedAt;
    this.raf = requestAnimationFrame(this.loop);
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.raf = 0;
  }

  dispose() {
    this.stop();
    if (this.disposed) return;
    this.disposed = true;
    const gl = this.gl;
    if (gl.isContextLost()) return;
    for (const f of [this.fboA, this.fboB]) {
      if (!f) continue;
      gl.deleteFramebuffer(f.fb);
      gl.deleteTexture(f.tex);
    }
    for (const t of [this.texBase, this.texMasks, this.texFlow, this.texDepth, this.texNormal]) if (t) gl.deleteTexture(t);
    if (this.quad) gl.deleteBuffer(this.quad);
    if (this.particleBuf) gl.deleteBuffer(this.particleBuf);
    for (const p of [this.progScene, this.progWater, this.progComposite, this.progParticle]) if (p) gl.deleteProgram(p.p);
  }

  /* ------------------------------ frame ------------------------------- */

  private time() {
    return ((performance.now() - this.startedAt) / 1000) % TIME_WRAP;
  }

  private loop = (now: number) => {
    this.raf = 0;
    if (!this.running || this.disposed) return;
    if (!this.visible || document.hidden) return; // setVisible(true) restarts the loop
    this.raf = requestAnimationFrame(this.loop);
    if (this.gl.isContextLost()) return;
    const dt = Math.min(0.05, Math.max(0, (now - this.lastNow) / 1000));
    this.lastNow = now;
    this.frame(((now - this.startedAt) / 1000) % TIME_WRAP, dt);
    if (!this.firstFrame) {
      this.firstFrame = true;
      this.opts.onReady?.();
    }
    this.trackFps(now);
  };

  private trackFps(now: number) {
    this.fpsFrames++;
    const span = now - this.fpsWindowStart;
    if (span < 500) return;
    this.fps = (this.fpsFrames * 1000) / span;
    this.fpsFrames = 0;
    this.fpsWindowStart = now;
    this.opts.onFps?.(this.fps);
    if (!this.opts.adaptive || now - this.startedAt < 3000) return;
    // under 24 fps for 2 s -> degrade: resolution first, then extras, then poster
    this.slowSamples = this.fps < 24 ? this.slowSamples + 1 : 0;
    if (this.slowSamples < 4) return;
    this.slowSamples = 0;
    if (this.renderScale > 0.55) {
      this.renderScale = Math.max(0.5, this.renderScale * 0.75);
      this.resize(true);
    } else if (this.extras) {
      this.extras = false;
    } else {
      this.opts.onGiveUp?.();
    }
  }

  private updateCamera(dt: number, t: number) {
    const target = this.tilt.on ? this.tilt : this.pointer;
    const k = 1 - Math.exp(-dt * 3.5);
    this.par.x += (target.x * MAX_PARALLAX - this.par.x) * k;
    this.par.y += (target.y * MAX_PARALLAX * 0.6 - this.par.y) * k;

    const progress = Math.min(1, this.scroll.y / this.scroll.max);
    const heroOut = Math.min(1, Math.max(0, (this.scroll.y - this.scroll.vh * 0.3) / (this.scroll.vh * 1.2)));
    const dimTarget = this.exploring ? 0 : heroOut * 0.5;
    this.dim += (dimTarget - this.dim) * (1 - Math.exp(-dt * 4));
    const canvas = this.opts.canvas;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    // portrait: slow auto-pan between greenhouse and waterfall, or ease to a chip's landmark
    let panTarget = 0;
    if (isPortrait(cw, ch)) panTarget = getPanFocus() != null ? focusPanX(cw, ch) : portraitPan(t);
    this.panX += (panTarget - this.panX) * (1 - Math.exp(-dt * (getPanFocus() != null ? 2.2 : 1.2)));
    this.view = coverView(cw, ch, {
      zoom: 1 + progress * 0.05,
      driftY: progress * 0.035,
      panX: this.panX,
    });
    const cam: Camera = {
      ...this.view,
      px: this.par.x,
      py: this.par.y,
      dim: this.dim,
      width: cw,
      height: ch,
    };
    publishCamera(cam);
  }

  private frame(t: number, dt: number) {
    const gl = this.gl;
    if (!this.fboA || !this.fboB) return;
    this.updateCamera(dt, t);
    gl.viewport(0, 0, this.drawW, this.drawH);
    gl.disable(gl.BLEND);

    // scene: plate + parallax + foliage sway -> A
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboA.fb);
    const s = this.progScene;
    gl.useProgram(s.p);
    this.plateUniforms(s, 0);
    this.bind(s, 'u_base', 1, this.texBase);
    this.bind(s, 'u_masks', 2, this.texMasks);
    gl.uniform1f(s.u.u_time, t);
    gl.uniform1f(s.u.u_sway, 0.0026);
    this.drawQuad(s);

    // water: A -> B
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.fboB.fb);
    const w = this.progWater;
    gl.useProgram(w.p);
    this.plateUniforms(w, 0);
    this.bind(w, 'u_fb', 1, this.fboA.tex);
    this.bind(w, 'u_masks', 2, this.texMasks);
    this.bind(w, 'u_flow', 3, this.texFlow);
    this.bind(w, 'u_normal', 4, this.texNormal);
    gl.uniform1f(w.u.u_time, t);
    gl.uniform4fv(w.u.u_waves, this.wavesUniform);
    gl.uniform4fv(w.u.u_ripples, this.ripples);
    this.drawQuad(w);

    // composite: B -> screen
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    const c = this.progComposite;
    gl.useProgram(c.p);
    this.plateUniforms(c, 0);
    this.bind(c, 'u_fb', 1, this.fboB.tex);
    this.bind(c, 'u_masks', 2, this.texMasks);
    gl.uniform1f(c.u.u_time, t);
    gl.uniform4fv(c.u.u_embers, this.embersUniform);
    gl.uniform2f(c.u.u_sun, SUN[0], SUN[1]);
    gl.uniform1f(c.u.u_shafts, 1);
    gl.uniform1f(c.u.u_fog, this.extras ? 0.2 : 0);
    gl.uniform1f(c.u.u_vig, 0.22);
    gl.uniform1f(c.u.u_dim, this.dim);
    this.drawQuad(c);

    if (this.extras) this.drawParticles(dt);
  }

  private plateUniforms(pr: Prog, depthUnit: number) {
    const gl = this.gl;
    gl.uniform4f(pr.u.u_view, this.view.sx, this.view.sy, this.view.ox, this.view.oy);
    gl.uniform2f(pr.u.u_par, this.par.x, this.par.y);
    this.bind(pr, 'u_depth', depthUnit, this.texDepth);
  }

  private bind(pr: Prog, name: string, unit: number, tex: WebGLTexture) {
    const gl = this.gl;
    gl.activeTexture(gl.TEXTURE0 + unit);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.uniform1i(pr.u[name], unit);
  }

  private drawQuad(pr: Prog) {
    const gl = this.gl;
    const loc = pr.a.a_pos;
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private rebuildFBOs(w: number, h: number) {
    const gl = this.gl;
    for (const f of [this.fboA, this.fboB]) {
      if (!f) continue;
      gl.deleteFramebuffer(f.fb);
      gl.deleteTexture(f.tex);
    }
    this.fboA = createFBO(gl, w, h);
    this.fboB = createFBO(gl, w, h);
  }

  /* ---------------------------- particles ----------------------------- */

  private seedParticles() {
    const small = isSmallScreen();
    const pollen = this.quality === 'low' || small ? 14 : 34;
    const embers = this.quality === 'low' || small ? 8 : 16;
    this.particles = [];
    for (let i = 0; i < embers; i++) this.particles.push(this.spawn(0, true));
    for (let i = 0; i < pollen; i++) this.particles.push(this.spawn(1, true));
    this.particleData = new Float32Array(this.particles.length * 6 * 10);
  }

  private spawn(kind: 0 | 1, warm = false): Particle {
    const rnd = Math.random;
    if (kind === 0) {
      const src = EMBER_SOURCES[rnd() < 0.7 ? 0 : 1];
      const maxLife = 2.5 + rnd() * 3;
      const warmth = rnd();
      return {
        kind,
        x: src[0] + (rnd() - 0.5) * 0.01,
        y: src[1] + (rnd() - 0.5) * 0.006,
        z: 0.63,
        vx: 0.004 + rnd() * 0.006,
        vy: -(0.018 + rnd() * 0.03),
        life: warm ? rnd() * maxLife : 0,
        maxLife,
        size: 0.006 + rnd() * 0.006,
        r: 1,
        g: 0.45 + warmth * 0.3,
        b: 0.12 + warmth * 0.1,
        a: 0.65 + rnd() * 0.35,
        seed: rnd() * 100,
      };
    }
    const z = 0.25 + rnd() * 0.75; // perspective: near motes are bigger and faster
    const maxLife = 8 + rnd() * 8;
    const teal = rnd() < 0.5;
    return {
      kind,
      x: rnd() * 1.05 - 0.025,
      y: 0.08 + rnd() * 0.85,
      z,
      vx: (0.003 + rnd() * 0.008) * (0.5 + z),
      vy: (rnd() - 0.6) * 0.006 * (0.5 + z),
      life: warm ? rnd() * maxLife : 0,
      maxLife,
      size: 0.003 + z * 0.007,
      r: teal ? 0.75 : 1.0,
      g: teal ? 1.0 : 0.95,
      b: teal ? 0.92 : 0.72,
      a: 0.22 + rnd() * 0.3,
      seed: rnd() * 100,
    };
  }

  private drawParticles(dt: number) {
    const gl = this.gl;
    const pr = this.progParticle;
    const data = this.particleData;
    const t = this.time();
    let o = 0;
    for (let i = 0; i < this.particles.length; i++) {
      let p = this.particles[i];
      p.life += dt;
      const wobble = Math.sin(t * (p.kind === 0 ? 3.1 : 0.7) + p.seed);
      p.x += (p.vx + wobble * (p.kind === 0 ? 0.006 : 0.002)) * dt;
      p.y += p.vy * dt;
      if (p.life > p.maxLife || p.x > 1.05 || p.y < -0.05) {
        p = this.particles[i] = this.spawn(p.kind);
      }
      const u = p.life / p.maxLife;
      const fade = Math.min(1, u * 5) * Math.min(1, (1 - u) * 3);
      const flick = p.kind === 0 ? 0.75 + 0.25 * Math.sin(t * 9 + p.seed) : 1;
      const alpha = p.a * fade * flick;
      const size = p.kind === 0 ? p.size * (1 - u * 0.5) : p.size;
      for (let c = 0; c < 6; c++) {
        const cx = c === 1 || c === 4 || c === 5 ? 1 : -1;
        const cy = c === 2 || c === 3 || c === 5 ? 1 : -1;
        data[o++] = cx;
        data[o++] = cy;
        data[o++] = p.x;
        data[o++] = p.y;
        data[o++] = p.z;
        data[o++] = size;
        data[o++] = p.r;
        data[o++] = p.g;
        data[o++] = p.b;
        data[o++] = alpha;
      }
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.useProgram(pr.p);
    gl.uniform4f(pr.u.u_view, this.view.sx, this.view.sy, this.view.ox, this.view.oy);
    gl.uniform2f(pr.u.u_par, this.par.x, this.par.y);
    gl.uniform1f(pr.u.u_aspect, this.drawW / Math.max(1, this.drawH));
    gl.bindBuffer(gl.ARRAY_BUFFER, this.particleBuf);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW);
    const stride = 10 * 4;
    const attrs: [string, number, number][] = [
      ['a_corner', 2, 0],
      ['a_pos', 3, 8],
      ['a_size', 1, 20],
      ['a_color', 4, 24],
    ];
    for (const [name, size, off] of attrs) {
      const loc = pr.a[name];
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, stride, off);
    }
    gl.drawArrays(gl.TRIANGLES, 0, this.particles.length * 6);
    for (const [name] of attrs) if (name !== 'a_corner') gl.disableVertexAttribArray(pr.a[name]);
    gl.disable(gl.BLEND);
  }
}

