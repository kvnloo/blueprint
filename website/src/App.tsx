import React, { lazy, Suspense, useState, useEffect, useCallback } from 'react';
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
import backgroundImage from './assets/background.png';

// Lazy load WebGL background for performance
const WebGLBackground = lazy(() => import('./components/WebGLBackground'));

// Helper to preload an image
const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

// Helper to check if fonts are loaded
const waitForFonts = (): Promise<void> => {
  if (document.fonts && document.fonts.ready) {
    return document.fonts.ready.then(() => {});
  }
  // Fallback: wait a bit for fonts
  return new Promise(resolve => setTimeout(resolve, 100));
};

export default function App() {
  const [loadWebGL, setLoadWebGL] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);

  // Hide loading overlay and show content
  const revealApp = useCallback(() => {
    const overlay = document.getElementById('loading-overlay');
    const root = document.getElementById('root');

    if (overlay) {
      overlay.classList.add('hidden');
    }
    if (root) {
      root.classList.add('ready');
    }
    setIsAppReady(true);
  }, []);

  // Preload critical resources
  useEffect(() => {
    // Preload background image
    preloadImage(backgroundImage)
      .then(() => setImageLoaded(true))
      .catch(() => setImageLoaded(true)); // Continue even if image fails

    // Wait for fonts
    waitForFonts()
      .then(() => setFontsLoaded(true));
  }, []);

  // Reveal app when critical resources are ready
  useEffect(() => {
    if (imageLoaded && fontsLoaded) {
      // Small delay to ensure React has rendered
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          revealApp();
        });
      });
    }
  }, [imageLoaded, fontsLoaded, revealApp]);

  // Load WebGL after app is revealed
  useEffect(() => {
    // Don't load WebGL if user prefers reduced motion or has disabled animations
    if (prefersReducedMotion || !animationsEnabled) return;
    if (!isAppReady) return;

    // Lazy load WebGL after app is ready
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => setLoadWebGL(true), { timeout: 1000 });
    } else {
      setTimeout(() => setLoadWebGL(true), 500);
    }
  }, [prefersReducedMotion, animationsEnabled, isAppReady]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-teal-500/30 selection:text-teal-200">
      {/* Background image layer */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/* WebGL wisps overlay */}
      {loadWebGL && animationsEnabled ? (
        <Suspense fallback={<BackgroundGrid />}>
          <WebGLBackground />
        </Suspense>
      ) : (
        <BackgroundGrid />
      )}

      {/* Accessibility: Animation pause control */}
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