import React, { lazy, Suspense, useState, useEffect } from 'react';
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

export default function App() {
  const [loadWebGL, setLoadWebGL] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);

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
    // Don't load WebGL if user prefers reduced motion or has disabled animations
    if (prefersReducedMotion || !animationsEnabled) return;

    // Lazy load WebGL after initial render
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => setLoadWebGL(true), { timeout: 2000 });
    } else {
      setTimeout(() => setLoadWebGL(true), 1000);
    }
  }, [prefersReducedMotion, animationsEnabled]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-teal-500/30 selection:text-teal-200">
      {/* Background image layer */}
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      {/* Dark vignette overlay for text readability - loads with background */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -15,
          background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.92) 100%)',
        }}
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