import React, { useEffect, useRef } from 'react';
import hotspotData from '../../data/wallpaper-hotspots.json';
import { plateToScreen, publishCamera, staticCamera, subscribeCamera } from '../../lib/wallpaper/view';
import { setWallpaperState, useWallpaperState } from '../../lib/wallpaper/store';
import './wallpaper.css';

type Hotspot = { id: string; label: string; sub: string; href: string; x: number; y: number; depth: number };
const HOTSPOTS = (hotspotData as { hotspots: Hotspot[] }).hotspots;

/**
 * HUD markers anchored to landmarks on the plate. They read the camera the
 * player publishes every frame (or a static camera in the poster tier) and
 * move with transform only, so they stay glued to the art under parallax.
 * Shown in Explore mode, where the page content steps aside.
 */
const WallpaperHotspots: React.FC = () => {
  const { exploring, live } = useWallpaperState();
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);

  // Poster tier: publish a static camera so markers still line up with the poster.
  useEffect(() => {
    if (live) return;
    const pub = () => publishCamera(staticCamera(window.innerWidth, window.innerHeight));
    pub();
    window.addEventListener('resize', pub, { passive: true });
    return () => window.removeEventListener('resize', pub);
  }, [live]);

  useEffect(
    () =>
      subscribeCamera((cam) => {
        HOTSPOTS.forEach((h, i) => {
          const el = refs.current[i];
          if (!el) return;
          const s = plateToScreen(cam, h.x, h.y, h.depth);
          // hide markers cropped off screen (portrait crops), flip labels near the right edge
          const onScreen = s.x > 0.04 && s.x < 0.96 && s.y > 0.04 && s.y < 0.96;
          el.style.visibility = onScreen ? '' : 'hidden';
          el.dataset.side = s.x > 0.6 ? 'left' : 'right';
          el.style.transform = `translate3d(${(s.x * cam.width).toFixed(1)}px, ${(s.y * cam.height).toFixed(1)}px, 0)`;
        });
      }),
    [],
  );

  // Explore mode: page content steps aside (CSS on <html>), Esc returns.
  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('wallpaper-exploring', exploring);
    if (!exploring) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWallpaperState({ exploring: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exploring]);

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setWallpaperState({ exploring: false });
    // let the content fade back in, then scroll to the section
    window.setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 350);
  };

  return (
    <div className="wallpaper-hud" data-active={exploring ? '1' : '0'} aria-hidden={!exploring}>
      {HOTSPOTS.map((h, i) => (
        <a
          key={h.id}
          ref={(el) => {
            refs.current[i] = el;
          }}
          href={h.href}
          className="wallpaper-hotspot"
          data-hotspot={h.id}
          data-v={h.y < 0.2 ? 'down' : 'up'}
          tabIndex={exploring ? 0 : -1}
          onClick={(e) => go(e, h.href)}
        >
          <span className="wallpaper-hotspot__dot" />
          <span className="wallpaper-hotspot__line" />
          <span className="wallpaper-hotspot__label">
            <span className="wallpaper-hotspot__name">{h.label}</span>
            <span className="wallpaper-hotspot__sub">{h.sub} &rarr;</span>
          </span>
        </a>
      ))}
    </div>
  );
};

export default WallpaperHotspots;
