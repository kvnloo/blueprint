import React, { Suspense, useState, useEffect, lazy } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pipeline from './components/Pipeline';
import Products from './components/Products';
import Showcase from './components/Showcase';
import SuccessStories from './components/SuccessStories';
import Footer from './components/Footer';
import BackgroundGrid from './components/BackgroundGrid';
import { BackgroundControls } from './components/ui';
import { useReducedMotion, useLocalStorage } from './hooks';

// Lazy load WebGL background for performance
const WebGLBackground = lazy(() => import('./components/WebGLBackground'));

export default function App() {
  const [loadWebGL, setLoadWebGL] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);

  useEffect(() => {
    // Don't load WebGL if user prefers reduced motion or animations are disabled
    if (prefersReducedMotion || !animationsEnabled) {
      return;
    }

    // Use requestIdleCallback to load WebGL after critical content paints
    if ('requestIdleCallback' in window) {
      (window as Window & typeof globalThis & { requestIdleCallback: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number }).requestIdleCallback(
        () => setLoadWebGL(true),
        { timeout: 2000 }
      );
    } else {
      // Fallback for Safari
      setTimeout(() => setLoadWebGL(true), 2000);
    }
  }, [prefersReducedMotion, animationsEnabled]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-teal-500/30 selection:text-teal-200">
      {/* WebGL Background with CSS fallback */}
      <Suspense fallback={<BackgroundGrid />}>
        {loadWebGL && animationsEnabled && !prefersReducedMotion ? (
          <WebGLBackground />
        ) : (
          <BackgroundGrid />
        )}
      </Suspense>

      {/* Background animation controls (accessibility) */}
      <BackgroundControls />

      <Navbar />
      <main>
        <Hero />
        <Products />
        <About />
        <Pipeline />
        <Showcase />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}