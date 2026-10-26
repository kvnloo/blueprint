import { useSyncExternalStore } from 'react';

/** UI state shared by the wallpaper, its controls and the hotspot HUD. */
export type WallpaperState = {
  /** WebGL player is drawing frames (canvas visible). */
  live: boolean;
  /** "Explore" mode: page content fades out, hotspots show, scene is undimmed. */
  exploring: boolean;
  /** Device tilt is feeding parallax. */
  tiltActive: boolean;
  /** iOS-style permission gate is required before tilt can be used. */
  tiltNeedsPermission: boolean;
  fps: number;
};

let state: WallpaperState = {
  live: false,
  exploring: false,
  tiltActive: false,
  tiltNeedsPermission: false,
  fps: 0,
};
const listeners = new Set<() => void>();

export function setWallpaperState(patch: Partial<WallpaperState>) {
  let changed = false;
  for (const k of Object.keys(patch) as (keyof WallpaperState)[]) {
    if (state[k] !== patch[k]) changed = true;
  }
  if (!changed) return;
  state = { ...state, ...patch };
  listeners.forEach((l) => l());
}

export function getWallpaperState() {
  return state;
}

function subscribe(l: () => void) {
  listeners.add(l);
  return () => {
    listeners.delete(l);
  };
}

export function useWallpaperState(): WallpaperState {
  return useSyncExternalStore(subscribe, getWallpaperState, getWallpaperState);
}

/** Ask for device-orientation permission (iOS 13+). Must run inside a user gesture. */
export async function requestTiltPermission(): Promise<boolean> {
  const DOE = (typeof window !== 'undefined' ? window.DeviceOrientationEvent : undefined) as
    | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<'granted' | 'denied'> })
    | undefined;
  if (!DOE) return false;
  if (typeof DOE.requestPermission !== 'function') return true;
  try {
    const res = await DOE.requestPermission();
    const ok = res === 'granted';
    if (ok) {
      setWallpaperState({ tiltNeedsPermission: false });
      window.dispatchEvent(new Event('wallpaper:tilt-granted'));
    }
    return ok;
  } catch {
    return false;
  }
}
