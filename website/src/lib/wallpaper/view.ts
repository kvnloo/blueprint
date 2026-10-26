/**
 * Shared camera maths for the Living Ruins wallpaper.
 *
 * Plate coordinates are normalised 0..1 with the origin at the TOP-LEFT of the
 * 16:9 plate. Screen coordinates are normalised 0..1 with the origin at the
 * top-left of the viewport. The mapping is a cover-fit:
 *
 *   plate = screen * scale + offset + parallax * (depth - 0.5)
 *
 * The WebGL shaders, the particle vertex shader and the DOM hotspots all use
 * this one mapping, so markers stay glued to their landmarks.
 */

export const PLATE_ASPECT = 16 / 9;
/** Base zoom so parallax and camera drift never expose the plate edge. */
export const OVERSCAN = 1.07;
/** Maximum parallax shift in plate units (per unit of depth from mid-ground). */
export const MAX_PARALLAX = 0.022;

export type View = {
  /** plate units per screen unit */
  sx: number;
  sy: number;
  /** plate coordinate of the screen's top-left corner */
  ox: number;
  oy: number;
};

export type Camera = View & {
  /** current parallax vector in plate units */
  px: number;
  py: number;
  /** 0..1, how far the page is scrolled past the hero (drives dimming) */
  dim: number;
  width: number;
  height: number;
};

export type ViewOptions = {
  /** extra zoom on top of OVERSCAN (scroll-linked drift) */
  zoom?: number;
  /** vertical drift in plate units, positive = camera moves down the plate */
  driftY?: number;
};

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/**
 * Cover-fit the plate into a viewport. On portrait screens the crop leans right
 * (pool and waterfall sit at x ~ 0.45-0.80) and is anchored near the bottom so
 * the water stays in frame.
 *
 * The offset uses CSS `object-position` semantics (offset = P * (1 - visible))
 * so the static poster in index.html, styled with object-position P and
 * transform: scale(OVERSCAN) about origin P, shows exactly the same crop.
 */
export const POSTER_POSITION = {
  landscape: { x: 0.5, y: 0.5 },
  portrait: { x: 0.66, y: 0.92 },
};

export function coverView(width: number, height: number, opts: ViewOptions = {}): View {
  const aspect = Math.max(1e-3, width / Math.max(1, height));
  let fx = 1;
  let fy = 1;
  if (aspect >= PLATE_ASPECT) fy = PLATE_ASPECT / aspect;
  else fx = aspect / PLATE_ASPECT;
  const z = OVERSCAN * (opts.zoom ?? 1);
  fx /= z;
  fy /= z;
  const pos = aspect <= 1 ? POSTER_POSITION.portrait : POSTER_POSITION.landscape;
  const ox = pos.x * (1 - fx);
  const oy = clamp(pos.y * (1 - fy) + (opts.driftY ?? 0), 0, 1 - fy);
  return { sx: fx, sy: fy, ox, oy };
}

/** Screen position (0..1, top-left origin) of a plate point at a given depth. */
export function plateToScreen(cam: Pick<Camera, 'sx' | 'sy' | 'ox' | 'oy' | 'px' | 'py'>, x: number, y: number, depth: number) {
  const k = depth - 0.5;
  return {
    x: (x - cam.px * k - cam.ox) / cam.sx,
    y: (y - cam.py * k - cam.oy) / cam.sy,
  };
}

/** Plate position under a screen point (ignores parallax; good enough for pointer ripples). */
export function screenToPlate(view: View, sx: number, sy: number) {
  return { x: sx * view.sx + view.ox, y: sy * view.sy + view.oy };
}

/* ------------------------------------------------------------------ */
/* Tiny camera store: the player publishes every frame, hotspots read. */
/* ------------------------------------------------------------------ */

type Listener = (cam: Camera) => void;
const listeners = new Set<Listener>();
let current: Camera | null = null;

export function publishCamera(cam: Camera) {
  current = cam;
  listeners.forEach((l) => l(cam));
}

export function subscribeCamera(l: Listener): () => void {
  listeners.add(l);
  if (current) l(current);
  return () => {
    listeners.delete(l);
  };
}

/** Static camera for the poster tier (no parallax, no drift). */
export function staticCamera(width: number, height: number): Camera {
  return { ...coverView(width, height), px: 0, py: 0, dim: 0, width, height };
}
