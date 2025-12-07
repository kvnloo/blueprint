import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Pipeline from './components/Pipeline';
import Products from './components/Products';
import Showcase from './components/Showcase';
import SuccessStories from './components/SuccessStories';
import Footer from './components/Footer';
import BackgroundGrid from './components/BackgroundGrid';

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white selection:bg-teal-500/30 selection:text-teal-200">
      <BackgroundGrid />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Pipeline />
        <Products />
        <Showcase />
        <SuccessStories />
      </main>
      <Footer />
    </div>
  );
}