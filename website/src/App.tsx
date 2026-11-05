import React, { lazy, Suspense, useState, useEffect } from 'react';
import SiteNav from './components/site/SiteNav';
import SiteFooter from './components/site/SiteFooter';
import HomePage from './components/site/HomePage';
import WorkPage from './components/site/WorkPage';
import ResearchPage from './components/site/ResearchPage';
import AboutPage from './components/site/AboutPage';
import OssPage from './components/site/OssPage';
import ArticleView from './components/ArticleView';
import { href, useRoute } from './lib/route';
import { BackgroundControls } from './components/ui';
import { ANIMATIONS_KEY, QUALITY_KEY } from './components/ui/BackgroundControls';
import WallpaperHotspots from './components/wallpaper/WallpaperHotspots';
import { useReducedMotion, useLocalStorage } from './hooks';
import { detectWallpaperTier, tierFromUrl, type WallpaperTier } from './lib/wallpaper/capability';

// Lazy load the WebGL wallpaper player; the static poster (index.html) is the LCP.
const LivingWallpaper = lazy(() => import('./components/wallpaper/LivingWallpaper'));

// Legacy view id still used by ResearchHub ('article:<id>').
export type ViewState = 'home' | 'research' | string;

export default function App() {
  const [loadWebGL, setLoadWebGL] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage(ANIMATIONS_KEY, true);
  const [quality] = useLocalStorage<'high' | 'low'>(QUALITY_KEY, 'high');
  // Capability gate, decided once: reduced motion / Save-Data / slow network /
  // low memory / no WebGL keep the static poster. `?wallpaper=` forces a tier.
  const [forcedTier] = useState(() => tierFromUrl());
  const [tier, setTier] = useState<WallpaperTier>('poster');
  const [webglFailed, setWebglFailed] = useState(false);
  const route = useRoute();

  useEffect(() => {
    // Hide loading overlay once React has mounted
    const overlay = document.getElementById('loading-overlay');

    if (overlay) {
      // Small delay to ensure smooth transition
      setTimeout(() => {
        overlay.classList.add('hidden');
        // Remove from DOM after transition completes
        setTimeout(() => overlay.remove(), 500);
      }, 100);
    }

  }, []);

  useEffect(() => {
    let cancelled = false;
    void detectWallpaperTier({ forceTier: forcedTier }).then((result) => {
      if (!cancelled) setTier(result);
    });
    return () => { cancelled = true; };
  }, [forcedTier]);

  useEffect(() => {
    // Don't load WebGL if user prefers reduced motion or has disabled animations
    if (tier !== 'webgl' || prefersReducedMotion || !animationsEnabled) return;

    // Lazy load WebGL after initial render
    if (typeof window.requestIdleCallback === 'function') {
      const id = window.requestIdleCallback(() => setLoadWebGL(true), { timeout: 2000 });
      return () => window.cancelIdleCallback(id);
    } else {
      const id = setTimeout(() => setLoadWebGL(true), 1000);
      return () => clearTimeout(id);
    }
  }, [tier, prefersReducedMotion, animationsEnabled]);

  const showWebGL =
    tier === 'webgl' && loadWebGL && animationsEnabled && !webglFailed && !prefersReducedMotion;

  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-amber-500/30 selection:text-amber-100">
      {/* Living Ruins wallpaper. The static poster and the readability veil
          live in index.html (LCP, works without JS); the WebGL layer sits
          between them and crossfades in after its first frame. */}
      {showWebGL && (
        <Suspense fallback={null}>
          <LivingWallpaper quality={quality} adaptive={forcedTier !== 'webgl'} onFail={() => setWebglFailed(true)} />
        </Suspense>
      )}
      <WallpaperHotspots />

      {/* Accessibility: Animation pause control */}
      <BackgroundControls />
      <SiteNav route={route} />

      <main>
        {route.page === 'home' && <HomePage />}
        {route.page === 'work' && <WorkPage />}
        {route.page === 'research' && <ResearchPage />}
        {route.page === 'about' && <AboutPage />}
        {route.page === 'oss' && <OssPage />}
        {route.page === 'article' && (
          <ArticleView articleId={route.id} onBack={() => { window.location.hash = href({ page: 'research' }); }} />
        )}
      </main>

      <SiteFooter />
    </div>
  );
}
