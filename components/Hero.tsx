import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { profile, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const { language } = useLanguage();
  const t = translations[language];
  const heroText = profile.hero[language];
  
  useEffect(() => {
    const tl = gsap.timeline();

    // Staggered Text Reveal
    tl.fromTo('.hero-text-line', 
      { y: 100, opacity: 0, rotateX: -20 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, duration: 1.2, ease: 'power3.out' }
    )
    .fromTo('.hero-sub',
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1 },
      '-=0.5'
    )
    .fromTo('.hero-btn',
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, stagger: 0.1, ease: 'back.out(1.7)' },
      '-=0.8'
    )
    .fromTo('.hero-bg-blob',
      { opacity: 0, scale: 0.5 },
      { opacity: 1, scale: 1, duration: 2, ease: 'power2.out' },
      '-=1.5'
    );

    // Parallax Effect
    if (containerRef.current) {
        gsap.to('.hero-bg-blob', {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    }

  }, []);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6">
      
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-accent/20 to-purple-900/20 rounded-full blur-[120px] -z-10 hero-bg-blob translate-x-1/3 -translate-y-1/4" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col gap-8 md:gap-12">
          
          <div className="flex flex-col gap-2">
             <div className="overflow-hidden">
                <div className="hero-text-line flex items-center gap-4 text-accent/80 font-mono text-sm tracking-widest uppercase mb-4">
                  <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
                  {heroText.availability}
                </div>
             </div>
             
             <h1 ref={titleRef} className="font-display font-bold text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[1.1] md:leading-[1.1] text-white">
                <div className="overflow-hidden"><span className="hero-text-line block">{heroText.line1}</span></div>
                <div className="overflow-hidden"><span className="hero-text-line block">{heroText.line2}</span></div>
                <div className="overflow-hidden"><span className="hero-text-line block text-transparent bg-clip-text bg-gradient-to-r from-accent to-white">{heroText.line3}<span className="text-accent">.</span></span></div>
             </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-6 lg:col-span-5">
               <p className="hero-sub text-lg md:text-xl text-muted leading-relaxed">
                 {profile.intro[language]}
               </p>
            </div>
            <div className="md:col-span-6 flex flex-wrap gap-4">
                <div className="hero-btn">
                    <Button onClick={() => document.getElementById('projects')?.scrollIntoView({behavior:'smooth'})}>
                        {t.hero.viewProjects} <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
                <div className="hero-btn">
                     <Button variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({behavior:'smooth'})}>
                        {t.hero.bookCall}
                     </Button>
                </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 animate-bounce">
         <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
         <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
};