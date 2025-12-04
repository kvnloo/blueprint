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
import ResearchHub from './components/ResearchHub';
import ArticleView from './components/ArticleView';
import { BackgroundControls } from './components/ui';
import { useReducedMotion, useLocalStorage } from './hooks';

// Lazy load WebGL background for performance
const WebGLBackground = lazy(() => import('./components/WebGLBackground'));

// ViewState type for routing between views
export type ViewState = 'home' | 'research' | string;

export default function App() {
  const [loadWebGL, setLoadWebGL] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  // Navigation function for view changes
  const navigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

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
      {/* Background: WebGL with CSS fallback */}
      {loadWebGL && animationsEnabled ? (
        <Suspense fallback={<BackgroundGrid />}>
          <WebGLBackground />
        </Suspense>
      ) : (
        <BackgroundGrid />
      )}

      {/* Accessibility: Animation pause control */}
      <BackgroundControls />
      <Navbar currentView={currentView} onNavigate={navigate} />

      <main>
        {/* Home View */}
        {currentView === 'home' && (
          <>
            <Hero />
            <Products />
            <About />
            <Pipeline />
            <Showcase />
            <SuccessStories />
          </>
        )}

        {/* Research Hub View */}
        {currentView === 'research' && (
          <ResearchHub onNavigate={navigate} />
        )}

        {/* Article View */}
        {currentView.startsWith('article:') && (
          <ArticleView
            articleId={currentView.split(':')[1]}
            onBack={() => navigate('research')}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
