import React, { useEffect, useRef, useState } from 'react';
import hotspotData from '../../data/wallpaper-hotspots.json';
import { plateToScreen, publishCamera, setPanFocus, staticCamera, subscribeCamera } from '../../lib/wallpaper/view';
import { getWallpaperState, setWallpaperState, useWallpaperState } from '../../lib/wallpaper/store';
import { WALLPAPER_ASSET_BASE } from '../../lib/wallpaper/assets';
import './wallpaper.css';

type Hotspot = { id: string; label: string; sub: string; href: string; x: number; y: number; depth: number };
const HOTSPOTS = (hotspotData as { hotspots: Hotspot[] }).hotspots;

/**
 * HUD markers anchored to landmarks on the plate. They read the camera the
 * player publishes every frame (or a static camera in the poster tier) and
 * move with transform only, so they stay glued to the art under parallax.
 * Shown in Explore mode, where the page content steps aside.
 *
 * Portrait screens only see about a quarter of the plate, so Explore mode also
 * shows a bottom row of landmark chips: a chip pans the camera to its landmark
 * (the live player eases there, the poster tier re-crops), where the marker
 * link to the section is then on screen. Tapping the focused chip again opens
 * its page, so the chip row alone is enough to navigate.
 */
const WallpaperHotspots: React.FC = () => {
  const { exploring, live } = useWallpaperState();
  const refs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [focused, setFocused] = useState<string | null>(null);

  const focus = (h: Hotspot | null) => {
    setFocused(h ? h.id : null);
    setPanFocus(h ? h.x : null);
    if (!live) publishCamera(staticCamera(window.innerWidth, window.innerHeight));
  };

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
    if (!exploring) {
      setFocused(null);
      setPanFocus(null);
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setWallpaperState({ exploring: false });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [exploring]);

  // 8K deep zoom: framed on the focused landmark, or the whole painting.
  const inspect = async () => {
    if (getWallpaperState().inspecting) return;
    setWallpaperState({ inspecting: true });
    const h = HOTSPOTS.find((x) => x.id === focused);
    try {
      const { openInspection } = await import('../../lib/wallpaper/inspection');
      openInspection({
        assetBase: WALLPAPER_ASSET_BASE,
        landmark: h ? { label: h.label, sub: h.sub, href: h.href, x: h.x, y: h.y } : undefined,
        onClose: (href) => {
          setWallpaperState({ inspecting: false });
          if (href) go(null, href);
        },
      });
    } catch {
      setWallpaperState({ inspecting: false });
    }
  };

  const go = (e: React.MouseEvent | null, href: string) => {
    e?.preventDefault();
    setWallpaperState({ exploring: false });
    // let the content fade back in, then open the page (or scroll to an in-page section)
    window.setTimeout(() => {
      if (href.startsWith('#/')) window.location.hash = href;
      else document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
      <nav className="wallpaper-chips" aria-label="Landmarks">
        {HOTSPOTS.map((h) => (
          <button
            key={h.id}
            type="button"
            className="wallpaper-chip"
            data-chip={h.id}
            aria-pressed={focused === h.id}
            tabIndex={exploring ? 0 : -1}
            aria-label={focused === h.id ? `Go to ${h.sub}` : `${h.label}: ${h.sub}`}
            onClick={() => (focused === h.id ? go(null, h.href) : focus(h))}
          >
            <span className="wallpaper-chip__name">{h.label}</span>
            <span className="wallpaper-chip__sub">{focused === h.id ? <>Go to {h.sub} &rarr;</> : h.sub}</span>
          </button>
        ))}
        <button
          type="button"
          className="wallpaper-chip wallpaper-chip--inspect"
          data-chip="inspect"
          tabIndex={exploring ? 0 : -1}
          aria-label={focused ? 'Zoom into this landmark in 8K' : 'Zoom into the painting in 8K'}
          onClick={() => void inspect()}
        >
          <span className="wallpaper-chip__name">Inspect 8K</span>
          <span className="wallpaper-chip__sub">{focused ? 'Zoom in here' : 'Pinch to zoom'}</span>
        </button>
      </nav>
    </div>
  );
};

export default WallpaperHotspots;
