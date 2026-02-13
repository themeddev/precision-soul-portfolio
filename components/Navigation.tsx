import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Globe, Sun, Moon } from 'lucide-react';
import { profile, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const t = translations[language];

  const navLinks = [
    { name: t.nav.projects, href: '#projects' },
    { name: t.nav.about, href: '#about' },
    { name: t.nav.stack, href: '#stack' },
    { name: t.nav.contact, href: '#contact' },
  ];

  useEffect(() => {
    // Simple nav entrance
    gsap.fromTo('.nav-item', 
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 1 }
    );
  }, []);

  const toggleTheme = () => {
    if (theme === 'dark') {
      setTheme('light');
    } else if (theme === 'light') {
      setTheme('system');
    } else {
      setTheme('dark');
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12">
      <div className="flex items-center justify-between">
        <a href="#" className="nav-item text-xl font-display font-bold tracking-tight mix-blend-difference z-50">
          {profile.name.toUpperCase().split(' ')[0]}<span className="text-accent">.</span>DEV
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-4 bg-black/20 backdrop-blur-md px-8 py-3 rounded-full border border-white/5 nav-item">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/70 hover:text-accent transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-accent transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          {/* Language Switcher */}
          <div className="relative ml-4">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-4 h-4" />
            </button>
            {langMenuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-surface border border-white/10 rounded-lg overflow-hidden min-w-[100px]">
                {(['en', 'fr', 'de'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setLanguage(lang);
                      setLangMenuOpen(false);
                    }}
                    className={`w-full px-4 py-2 text-sm text-left hover:bg-surfaceHighlight transition-colors ${
                      language === lang ? 'text-accent' : 'text-white/70'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 transition-colors ml-2"
            aria-label="Toggle theme"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <a href="#contact" className="ml-4 text-sm font-bold bg-white text-black px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors">
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
              className="text-4xl font-display font-bold text-white hover:text-accent"
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
                className={`px-4 py-2 rounded-full text-sm ${
                  language === lang ? 'bg-accent text-white' : 'bg-white/10 text-white/70'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => {
              toggleTheme();
              setIsOpen(false);
            }}
            className="mt-4 p-4 rounded-full bg-white/10 text-white"
          >
            {resolvedTheme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
          </div>
        )}
      </div>
    </nav>
  );
};