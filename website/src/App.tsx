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
import backgroundImage from './assets/background.png';

const WebGLBackground = lazy(() => import('./components/WebGLBackground'));

export type ViewState = 'home' | 'research' | string;

export default function App() {
  const [loadWebGL, setLoadWebGL] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const [animationsEnabled] = useLocalStorage('bg-animations-enabled', true);
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  useEffect(() => {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      setTimeout(() => {
        overlay.classList.add('hidden');
        setTimeout(() => overlay.remove(), 500);
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !animationsEnabled) return;

    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(() => setLoadWebGL(true), { timeout: 2000 });
    } else {
      setTimeout(() => setLoadWebGL(true), 1000);
    }
  }, [prefersReducedMotion, animationsEnabled]);

  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-teal-500/30 selection:text-teal-200">
      <div
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
        aria-hidden="true"
      />

      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: -15,
          background: 'radial-gradient(ellipse 70% 40% at 50% 20%, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.92) 100%)',
        }}
        aria-hidden="true"
      />

      {loadWebGL && animationsEnabled ? (
        <Suspense fallback={<BackgroundGrid />}>
          <WebGLBackground />
        </Suspense>
      ) : (
        <BackgroundGrid />
      )}

      <BackgroundControls />
      <Navbar currentView={currentView} onNavigate={navigate} />

      <main>
        {currentView === 'home' && (
          <>
            <Hero />
            <About />
            <Pipeline />
            <Products />
            <Showcase />
            <SuccessStories />
          </>
        )}

        {currentView === 'research' && (
          <ResearchHub onNavigate={navigate} />
        )}

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
