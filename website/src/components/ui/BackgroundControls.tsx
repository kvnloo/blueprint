import React from 'react';
import { useLocalStorage } from '../../hooks';
import { requestTiltPermission, setWallpaperState, useWallpaperState } from '../../lib/wallpaper/store';

export const ANIMATIONS_KEY = 'bg-animations-enabled';
export const QUALITY_KEY = 'bg-wallpaper-quality';

const chip =
  'p-3 bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 group text-gray-400 hover:text-white';

/**
 * Background controls for the Living Ruins wallpaper.
 * - Pause/play (accessibility): stops all background motion, poster stays. Persists.
 * - Quality: high / low render resolution and particle count. Persists.
 * - Explore: steps the page content aside and shows the landmark hotspots.
 * - Tilt: iOS needs a user gesture before device orientation can drive parallax.
 */
export const BackgroundControls: React.FC = () => {
  const [enabled, setEnabled] = useLocalStorage(ANIMATIONS_KEY, true);
  const [quality, setQuality] = useLocalStorage<'high' | 'low'>(QUALITY_KEY, 'high');
  const { exploring, live, tiltNeedsPermission } = useWallpaperState();

  return (
    <>
      <div className="fixed bottom-4 right-[4.5rem] z-50 flex items-center gap-2">
        {tiltNeedsPermission && (
          <button
            type="button"
            onClick={() => void requestTiltPermission()}
            className={chip}
            aria-label="Enable tilt parallax"
            title="Enable tilt parallax"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
              <rect x="7" y="2.5" width="10" height="19" rx="2" transform="rotate(-12 12 12)" />
              <path d="M3 8c-1 2.5-1 5.5 0 8M21 8c1 2.5 1 5.5 0 8" strokeLinecap="round" />
            </svg>
          </button>
        )}
        {enabled && live && (
          <button
            type="button"
            onClick={() => setQuality(quality === 'high' ? 'low' : 'high')}
            className={`${chip} font-mono text-[11px] leading-5 w-11 h-11 p-0`}
            aria-label={`Wallpaper quality: ${quality}. Switch to ${quality === 'high' ? 'low' : 'high'}`}
            title={`Quality: ${quality === 'high' ? 'High' : 'Low'}`}
            data-quality={quality}
          >
            {quality === 'high' ? 'HD' : 'SD'}
          </button>
        )}
        <button
          type="button"
          onClick={() => setWallpaperState({ exploring: !exploring })}
          className={`${chip} ${exploring ? 'border-amber-300/60 text-amber-200' : ''}`}
          aria-pressed={exploring}
          aria-label={exploring ? 'Return to page content' : 'Explore the scene'}
          title={exploring ? 'Back to content (Esc)' : 'Explore the scene'}
          data-testid="wallpaper-explore"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" />
            <path d="M15.5 8.5l-2 5-5 2 2-5 5-2z" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <button
        onClick={() => setEnabled(!enabled)}
        className="fixed bottom-4 right-4 z-50 p-3 bg-gray-900/80 backdrop-blur-sm rounded-full border border-white/10 hover:border-white/20 transition-all duration-200 group"
        aria-label={enabled ? 'Pause background animations' : 'Play background animations'}
        title={enabled ? 'Pause animations' : 'Play animations'}
      >
        {enabled ? (
          // Pause icon
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <rect x="6" y="4" width="4" height="16" rx="1" />
            <rect x="14" y="4" width="4" height="16" rx="1" />
          </svg>
        ) : (
          // Play icon
          <svg className="w-5 h-5 text-gray-400 group-hover:text-teal-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5.14v14.72a1 1 0 001.5.86l11-7.36a1 1 0 000-1.72l-11-7.36a1 1 0 00-1.5.86z" />
          </svg>
        )}
      </button>
    </>
  );
};

export default BackgroundControls;
