import React, { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { Menu, X, Globe, Sun, Moon, Monitor } from 'lucide-react';
import { profile, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { smoothScrollTo } from '../lib/utils';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = translations[language];
  const navRef = useRef<HTMLElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);

  const navLinks = [
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.stack, href: '#stack' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    // Smooth nav entrance with better animation
    const navItems = navRef.current?.querySelectorAll('.nav-item');
    if (navItems) {
      gsap.fromTo(navItems, 
        { y: -30, opacity: 0, scale: 0.9 },
        { 
          y: 0, 
          opacity: 1, 
          scale: 1,
          stagger: 0.08, 
          duration: 0.8, 
          ease: 'power3.out',
          delay: 0.5
        }
      );
    }

    // Smooth scroll for navigation links (optimized)
    const handleNavClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="#"]');
      if (link) {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const targetId = href.substring(1);
          smoothScrollTo(targetId, 80);
          setIsOpen(false);
        }
      }
    };

    navRef.current?.addEventListener('click', handleNavClick);
    return () => {
      navRef.current?.removeEventListener('click', handleNavClick);
    };
  }, []);

  // Close theme menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setThemeMenuOpen(false);
      }
    };

    if (themeMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [themeMenuOpen]);

  const handleThemeSelect = (selectedTheme: 'light' | 'dark' | 'system') => {
    setTheme(selectedTheme);
    setThemeMenuOpen(false);
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <Monitor className="w-4 h-4" />;
    return resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />;
  };

  return (
    <nav ref={navRef} className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
      <div className="flex items-center justify-between">
        <a href="#" className="nav-item text-xl font-display font-bold tracking-tight mix-blend-difference z-50 hover:scale-105 transition-transform">
          {profile.name.toUpperCase().split(' ')[0]}<span className="text-accent">.</span>DEV
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/5 nav-item">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-item text-sm font-medium text-white/70 hover:text-accent transition-all duration-300 relative group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="relative ml-4">
            <button
              onClick={() => {
                setLangMenuOpen(!langMenuOpen);
                setThemeMenuOpen(false);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-surface border border-white/10 rounded-lg overflow-hidden min-w-[100px] shadow-xl animate-in fade-in slide-in-from-top-2">
                {(['en', 'fr', 'de'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left hover:bg-surfaceHighlight transition-colors ${
                      language === lang ? 'text-accent font-semibold' : 'text-white/70'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle with Dropdown */}
          <div className="relative ml-2" ref={themeMenuRef}>
            <button
              onClick={() => {
                setThemeMenuOpen(!themeMenuOpen);
                setLangMenuOpen(false);
              }}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 transition-all duration-300 hover:scale-110"
              aria-label="Toggle theme"
            >
              {getThemeIcon()}
            </button>
            {themeMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-surface border border-white/10 rounded-lg overflow-hidden min-w-[120px] shadow-xl animate-in fade-in slide-in-from-top-2">
                <button
                  onClick={() => handleThemeSelect('light')}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-surfaceHighlight transition-colors flex items-center gap-2 ${
                    theme === 'light' ? 'text-accent font-semibold' : 'text-white/70'
                  }`}
                >
                  <Sun className="w-4 h-4" />
                  Light
                </button>
                <button
                  onClick={() => handleThemeSelect('dark')}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-surfaceHighlight transition-colors flex items-center gap-2 ${
                    theme === 'dark' ? 'text-accent font-semibold' : 'text-white/70'
                  }`}
                >
                  <Moon className="w-4 h-4" />
                  Dark
                </button>
                <button
                  onClick={() => handleThemeSelect('system')}
                  className={`w-full px-4 py-2 text-sm text-left hover:bg-surfaceHighlight transition-colors flex items-center gap-2 ${
                    theme === 'system' ? 'text-accent font-semibold' : 'text-white/70'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Auto
                </button>
              </div>
            )}
          </div>

          <a href="#contact" className="ml-4 text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105 nav-item">
            {t.nav.letsTalk}
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
             {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-4xl font-display font-bold text-white hover:text-accent transition-all duration-300"
            >
              {link.name}
            </a>
          ))}
          <div className="flex gap-4 mt-8">
            {(['en', 'fr', 'de'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  language === lang ? 'bg-accent text-white' : 'bg-white/10 text-white/70'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <button
              onClick={() => {
                handleThemeSelect('light');
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                theme === 'light' ? 'bg-accent text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              <Sun className="w-4 h-4" /> Light
            </button>
            <button
              onClick={() => {
                handleThemeSelect('dark');
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                theme === 'dark' ? 'bg-accent text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              <Moon className="w-4 h-4" /> Dark
            </button>
            <button
              onClick={() => {
                handleThemeSelect('system');
                setIsOpen(false);
              }}
              className={`px-4 py-2 rounded-full text-sm flex items-center gap-2 ${
                theme === 'system' ? 'bg-accent text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              <Monitor className="w-4 h-4" /> Auto
            </button>
          </div>
          </div>
        )}
      </div>
    </nav>
  );
};