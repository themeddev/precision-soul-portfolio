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
import { Sidebar } from './components/Sidebar';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';

// Register GSAP plugins globally
gsap.registerPlugin(ScrollTrigger);

const App: React.FC = () => {

  useEffect(() => {
    // Optimized Smooth Scroll Setup (Lenis)
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    // Store lenis instance globally for smoothScrollTo utility
    (window as any).lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Use GSAP's ticker for the animation loop to ensure perfect sync
    const update = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(update);

    // Disable lag smoothing to prevent jumps during heavy load/scroll
    gsap.ticker.lagSmoothing(0);

    // Force a refresh after a short delay to ensure layout is ready (handles font loading etc)
    const timeout = setTimeout(() => {
        ScrollTrigger.refresh();
    }, 500);

    // Cleanup
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
      delete (window as any).lenis;
      clearTimeout(timeout);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen relative selection:bg-accent selection:text-white" style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
          {/* Global Noise Overlay */}
          <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] bg-noise mix-blend-overlay"></div>
          
          {/* Custom Cursor */}
          <CustomCursor />

          {/* Navigation */}
          <Navigation />

          {/* Sidebar */}
          <Sidebar />

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
      </LanguageProvider>
    </ThemeProvider>
  );
};

export default App;