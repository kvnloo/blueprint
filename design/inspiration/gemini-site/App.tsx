import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Showcase from './components/Showcase';
import SuccessStories from './components/SuccessStories';
import Footer from './components/Footer';
import BackgroundGrid from './components/BackgroundGrid';
import ResearchHub from './components/ResearchHub';
import ArticleView from './components/ArticleView';

export type ViewState = 'home' | 'research' | string;

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const navigate = (view: ViewState) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCurrentView(view);
  };

  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-teal-500/30 selection:text-teal-200 bg-[#050505]">
      <BackgroundGrid />
      <Navbar currentView={currentView} onNavigate={navigate} />
      
      <main className="relative z-10">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <About />
            <Showcase />
            <SuccessStories />
          </>
        )}
        
        {currentView === 'research' && (
          <ResearchHub onNavigate={navigate} />
        )}

        {currentView.startsWith('article:') && (
          <ArticleView articleId={currentView.split(':')[1]} onBack={() => navigate('research')} />
        )}
      </main>
      
      <Footer />
    </div>
  );
}