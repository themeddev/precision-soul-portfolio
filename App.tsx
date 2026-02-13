import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { TechTicker } from './components/TechTicker';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Services } from './components/Services';
import { Contact } from './components/Contact';
import { CustomCursor } from './components/CustomCursor';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {

  useEffect(() => {
    // Smooth Scroll Setup (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="bg-background text-text min-h-screen relative selection:bg-accent selection:text-white">
      {/* Global Noise Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-noise mix-blend-overlay"></div>
      
      {/* Custom Cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navigation />

      <main className="relative z-10">
        <Hero />
        <TechTicker />
        <Projects />
        <About />
        <Skills />
        <Services />
        <Contact />
      </main>
    </div>
  );
};

export default App;