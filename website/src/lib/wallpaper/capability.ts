/**
 * One-shot capability gate for the Living Ruins wallpaper (ported from the
 * .files player). The poster is always painted first by index.html; this only
 * decides whether to enhance it with the WebGL player.
 */
export type WallpaperTier = 'webgl' | 'poster';

export type CapabilityOptions = {
  /** Force a tier (tests / debugging). */
  forceTier?: WallpaperTier | null;
};

type NavigatorExtras = Navigator & {
  connection?: { saveData?: boolean; downlink?: number; effectiveType?: string };
  deviceMemory?: number;
};

/** `?wallpaper=poster|webgl` overrides detection (used by tests and for debugging). */
export function tierFromUrl(search = typeof location !== 'undefined' ? location.search : ''): WallpaperTier | null {
  const v = new URLSearchParams(search).get('wallpaper');
  return v === 'poster' || v === 'webgl' ? v : null;
}

export function detectWallpaperTier(opts: CapabilityOptions = {}): WallpaperTier {
  if (typeof window === 'undefined') return 'poster';
  if (opts.forceTier) return opts.forceTier;

  if (window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches) return 'poster';

  const nav = navigator as NavigatorExtras;
  if (nav.connection?.saveData) return 'poster';
  const et = nav.connection?.effectiveType;
  if (et === 'slow-2g' || et === '2g') return 'poster';
  const downlink = nav.connection?.downlink;
  if (typeof downlink === 'number' && downlink > 0 && downlink < 1.5) return 'poster';
  if (typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 && nav.deviceMemory <= 2) return 'poster';

  // No WebGL, or a CPU rasteriser (SwiftShader, llvmpipe, WARP) that would starve the page.
  if (probeWebGL() !== 'hardware') return 'poster';
  return 'webgl';
}

const SOFTWARE_GL = /swiftshader|llvmpipe|softpipe|software|basic render|microsoft basic/i;

export function probeWebGL(): 'none' | 'software' | 'hardware' {
  try {
    const c = document.createElement('canvas');
    const gl = (c.getContext('webgl') || c.getContext('experimental-webgl')) as WebGLRenderingContext | null;
    if (!gl) return 'none';
    const info = gl.getExtension('WEBGL_debug_renderer_info');
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : '';
    // Release the probe context right away so it does not count against the page's context limit.
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return SOFTWARE_GL.test(renderer) ? 'software' : 'hardware';
  } catch {
    return 'none';
  }
}

export function hasWebGL(): boolean {
  return probeWebGL() !== 'none';
}
