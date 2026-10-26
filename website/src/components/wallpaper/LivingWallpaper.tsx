import React, { useEffect, useRef } from 'react';
import { LivingPlayer, type WallpaperQuality } from '../../lib/wallpaper/livingPlayer';
import { getWallpaperState, setWallpaperState, useWallpaperState } from '../../lib/wallpaper/store';

type Props = {
  quality: WallpaperQuality;
  /** Degrade and finally fall back to the poster when fps stays low. */
  adaptive?: boolean;
  /** WebGL failed, the context was lost, or adaptive degradation gave up: keep the poster. */
  onFail: () => void;
};

export const WALLPAPER_ASSET_BASE = `${import.meta.env.BASE_URL}wallpaper/living-ruins/`;

/**
 * Living Ruins WebGL layer. Sits above the static poster (painted by
 * index.html) and below the readability veil; crossfades in after its first
 * frame. All motion is on the GPU; the only DOM writes are the canvas opacity
 * and a few data attributes for tests.
 */
const LivingWallpaper: React.FC<Props> = ({ quality, adaptive = true, onFail }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<LivingPlayer | null>(null);
  const { exploring } = useWallpaperState();
  const failRef = useRef(onFail);
  failRef.current = onFail;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let player: LivingPlayer | null = null;
    const cleanups: (() => void)[] = [];
    const on = <K extends keyof WindowEventMap>(
      target: Window | Document | HTMLElement,
      type: K | string,
      fn: (e: any) => void,
      opts: AddEventListenerOptions = { passive: true },
    ) => {
      target.addEventListener(type, fn, opts);
      cleanups.push(() => target.removeEventListener(type, fn, opts));
    };

    const fail = () => {
      if (cancelled) return;
      cancelled = true;
      setWallpaperState({ live: false });
      failRef.current();
    };

    (async () => {
      try {
        player = new LivingPlayer({
          canvas,
          assetBase: WALLPAPER_ASSET_BASE,
          quality,
          adaptive,
          onContextLost: () => {
            // Keep this canvas mounted so it can receive contextrestored.
            canvas.style.transition = 'none';
            canvas.style.opacity = '0';
            canvas.dataset.ready = '0';
            setWallpaperState({ live: false });
          },
          onReady: () => {
            if (cancelled) return;
            canvas.style.transition = 'opacity 1.2s ease-out';
            canvas.style.opacity = '1';
            canvas.dataset.ready = '1';
            setWallpaperState({ live: true });
          },
          onFps: (fps) => {
            canvas.dataset.fps = fps.toFixed(1);
          },
          onGiveUp: fail,
        });
        playerRef.current = player;
        await player.init();
        if (cancelled) {
          player.dispose();
          return;
        }
        player.setExplore(getWallpaperState().exploring);
        wireInputs(player);
        player.start();
      } catch (err) {
        console.warn('[wallpaper] WebGL player unavailable, keeping the poster:', err);
        player?.dispose();
        fail();
      }
    })();

    function wireInputs(p: LivingPlayer) {
      const ro = new ResizeObserver(() => p.resize());
      ro.observe(canvas!);
      cleanups.push(() => ro.disconnect());

      const io = new IntersectionObserver(([entry]) => p.setVisible(entry.isIntersecting && !document.hidden), {
        threshold: 0.01,
      });
      io.observe(canvas!);
      cleanups.push(() => io.disconnect());
      on(document, 'visibilitychange', () => p.setVisible(!document.hidden));

      // scroll-linked camera drift; scrollHeight is cached and refreshed on resize
      let maxScroll = 1;
      const measure = () => {
        maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        p.setScroll(window.scrollY, maxScroll, window.innerHeight);
      };
      const bodyRo = new ResizeObserver(measure);
      bodyRo.observe(document.body);
      cleanups.push(() => bodyRo.disconnect());
      on(window, 'scroll', () => p.setScroll(window.scrollY, maxScroll, window.innerHeight));
      measure();

      // pointer parallax + ripples on the water
      let last = { x: -1, y: -1, t: 0 };
      on(window, 'pointermove', (e: PointerEvent) => {
        const sx = e.clientX / window.innerWidth;
        const sy = e.clientY / window.innerHeight;
        p.setPointer(sx * 2 - 1, sy * 2 - 1);
        const now = performance.now();
        if (Math.hypot(sx - last.x, sy - last.y) > 0.035 && now - last.t > 140) {
          p.addRipple(sx, sy, 0.45);
          last = { x: sx, y: sy, t: now };
        }
      });
      on(window, 'pointerdown', (e: PointerEvent) => {
        p.addRipple(e.clientX / window.innerWidth, e.clientY / window.innerHeight, 1);
      });

      // device tilt (permission-gated on iOS 13+)
      const DOE = window.DeviceOrientationEvent as
        | (typeof DeviceOrientationEvent & { requestPermission?: () => Promise<string> })
        | undefined;
      const coarse = window.matchMedia?.('(pointer: coarse)')?.matches;
      if (DOE && coarse) {
        let beta0: number | null = null;
        const onTilt = (e: DeviceOrientationEvent) => {
          if (e.beta == null || e.gamma == null) return;
          if (beta0 == null) beta0 = Math.max(10, Math.min(80, e.beta));
          const angle = (screen.orientation?.angle ?? 0) % 360;
          let x = e.gamma / 22;
          let y = (e.beta - beta0) / 22;
          if (angle === 90) [x, y] = [y, -x];
          else if (angle === 270 || angle === -90) [x, y] = [-y, x];
          p.setTilt(x, y);
          setWallpaperState({ tiltActive: true });
        };
        const attach = () => on(window, 'deviceorientation', onTilt);
        if (typeof DOE.requestPermission === 'function') {
          setWallpaperState({ tiltNeedsPermission: true });
          on(window, 'wallpaper:tilt-granted', attach);
        } else {
          attach();
        }
      }
    }

    return () => {
      cancelled = true;
      cleanups.forEach((c) => c());
      player?.dispose();
      playerRef.current = null;
      setWallpaperState({ live: false, tiltActive: false, tiltNeedsPermission: false });
    };
    // quality changes are applied live below, without rebuilding the player
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adaptive]);

  useEffect(() => {
    playerRef.current?.setQuality(quality);
  }, [quality]);

  useEffect(() => {
    playerRef.current?.setExplore(exploring);
  }, [exploring]);

  return (
    <canvas
      ref={canvasRef}
      className="living-wallpaper fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -12, opacity: 0, transition: 'opacity 1.2s ease-out' }}
      aria-hidden="true"
      data-testid="living-wallpaper"
    />
  );
};

export default LivingWallpaper;
