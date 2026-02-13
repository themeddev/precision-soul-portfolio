import React, { useEffect, useState } from 'react';
import { NAV_LINKS } from '../constants';
import gsap from 'gsap';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simple nav entrance
    gsap.fromTo('.nav-item', 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 1 }
    );
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
      <div className="flex items-center justify-between">
        <a href="#" className="nav-item text-xl font-display font-bold tracking-tight mix-blend-difference z-50">
          ALEX<span className="text-accent">.</span>DEV
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/5 nav-item">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a href="#contact" className="ml-4 text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors">
            Let's Talk
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden z-50 text-white nav-item"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="fixed inset-0 bg-background/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8">
             {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-display font-bold text-white hover:text-accent"
            >
              {link.name}
            </a>
          ))}
          </div>
        )}
      </div>
    </nav>
  );
};