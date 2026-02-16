import React, { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from './ui/Button';
import { ArrowRight } from 'lucide-react';
import { profile, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';
import { throttle, prefersReducedMotion, smoothScrollTo } from '../lib/utils';

gsap.registerPlugin(ScrollTrigger);

// Reduced particle count for better performance
const PARTICLE_COUNT = 10;

export const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { language } = useLanguage();
  const t = translations[language];
  const heroText = profile.hero[language];
  const reducedMotion = useMemo(() => prefersReducedMotion(), []);
  
  useEffect(() => {
    // Throttled mouse move tracking for 3D parallax (60fps max)
    const handleMouseMove = throttle((e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mousePositionRef.current = { x, y };
      setMousePosition({ x, y });
    }, 16); // ~60fps

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Master timeline for hero animations (reduced motion support)
    const tl = gsap.timeline({ defaults: { ease: reducedMotion ? 'none' : 'power3.out' } });

    if (!reducedMotion) {
      // 3D Text Reveal with perspective (only if motion is allowed)
      tl.fromTo('.hero-text-line', 
        { 
          y: 120, 
          opacity: 0, 
          rotateX: -45,
          transformOrigin: 'center bottom',
        },
        { 
          y: 0, 
          opacity: 1, 
          rotateX: 0,
          stagger: 0.2, 
          duration: 1.2, 
        }
      )
      .fromTo('.hero-availability',
        { opacity: 0, scale: 0.8, y: -20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.6 },
        '-=0.8'
      )
      .fromTo('.hero-sub',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo('.hero-btn',
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, stagger: 0.1, duration: 0.6 },
        '-=0.4'
      );
    } else {
      // Simple fade-in for reduced motion
      tl.fromTo('.hero-text-line, .hero-availability, .hero-sub, .hero-btn',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, stagger: 0.1 }
      );
    }

    // Animated background blobs (only if motion is allowed, optimized)
    if (!reducedMotion && blob1Ref.current && blob2Ref.current && blob3Ref.current) {
      // Use CSS animations instead of GSAP for better performance
      blob1Ref.current.style.willChange = 'transform';
      blob2Ref.current.style.willChange = 'transform';
      blob3Ref.current.style.willChange = 'transform';

      gsap.to(blob1Ref.current, {
        x: '+=30',
        y: '+=20',
        rotation: 180,
        duration: 30,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(blob2Ref.current, {
        x: '-=25',
        y: '-=30',
        rotation: -180,
        duration: 35,
        repeat: -1,
        ease: 'none',
      });

      gsap.to(blob3Ref.current, {
        x: '+=20',
        y: '+=25',
        rotation: 90,
        duration: 40,
        repeat: -1,
        ease: 'none',
      });
    }

    // Parallax scroll effect (optimized, only if motion allowed)
    if (!reducedMotion && containerRef.current) {
      const scrollTrigger = {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
      };

      gsap.to('.hero-bg-blob', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger,
      });

      if (titleRef.current) {
        gsap.to(titleRef.current, {
          yPercent: -15,
          opacity: 0.5,
          ease: 'none',
          scrollTrigger,
        });
      }
    }

    // Floating particles animation (reduced count, optimized)
    if (!reducedMotion && particlesRef.current) {
      const particles = particlesRef.current.children;
      Array.from(particles).forEach((particle, i) => {
        (particle as HTMLElement).style.willChange = 'transform';
        gsap.to(particle, {
          y: `+=${Math.random() * 100 + 50}`,
          x: `+=${Math.random() * 50 - 25}`,
          duration: Math.random() * 4 + 3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: i * 0.3,
        });
      });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [reducedMotion]);

  // 3D mouse parallax effect (throttled, only if motion allowed)
  useEffect(() => {
    if (reducedMotion) return;

    const updateParallax = throttle(() => {
      const { x, y } = mousePositionRef.current;
      
      if (titleRef.current) {
        gsap.to(titleRef.current, {
          rotationY: x * 3,
          rotationX: -y * 3,
          transformPerspective: 1000,
          duration: 0.8,
          ease: 'power2.out',
        });
      }

      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: x * 20,
          y: y * 20,
          duration: 1.5,
          ease: 'power2.out',
        });
      }

      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: x * -15,
          y: y * -15,
          duration: 1.8,
          ease: 'power2.out',
        });
      }
    }, 16);

    updateParallax();
  }, [mousePosition, reducedMotion]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden px-6 perspective-1000">
      
      {/* Animated Background Blobs with 3D effect */}
      <div 
        ref={blob1Ref}
        className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-accent/30 via-purple-600/20 to-blue-600/20 rounded-full blur-[120px] -z-10 hero-bg-blob translate-x-1/3 -translate-y-1/4"
        style={{ transform: 'translateZ(0)' }}
      />
      <div 
        ref={blob2Ref}
        className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-600/20 via-cyan-500/15 to-transparent rounded-full blur-[100px] -z-10"
        style={{ transform: 'translateZ(0)' }}
      />
      <div 
        ref={blob3Ref}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-r from-accent/15 to-purple-600/15 rounded-full blur-[80px] -z-10"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Floating Particles (reduced count for performance) */}
      {!reducedMotion && (
        <div ref={particlesRef} className="absolute inset-0 -z-10 pointer-events-none">
          {[...Array(PARTICLE_COUNT)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-accent/30 rounded-full"
              style={{
                left: `${(i * 10) % 100}%`,
                top: `${(i * 15) % 100}%`,
                willChange: 'transform',
              }}
            />
          ))}
        </div>
      )}

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] -z-10" />

      <div className="max-w-7xl w-full mx-auto relative z-10 preserve-3d">
        <div className="flex flex-col gap-8 md:gap-12">
          
          {/* Availability Badge */}
          <div className="overflow-hidden">
            <div className="hero-availability flex items-center gap-4 text-accent/90 font-mono text-sm tracking-widest uppercase mb-4">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse shadow-[0_0_10px_rgba(255,77,0,0.8)]"></span>
              {heroText.availability}
            </div>
          </div>
          
          {/* 3D Title */}
          <h1 
            ref={titleRef}
            className="font-display font-bold text-5xl md:text-7xl lg:text-9xl tracking-tight leading-[1.1] md:leading-[1.1] text-white preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="overflow-hidden">
              <span className="hero-text-line block relative">
                {heroText.line1}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-xl opacity-50"></span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-text-line block relative">
                {heroText.line2}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-accent/20 to-transparent blur-xl opacity-50"></span>
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="hero-text-line block text-transparent bg-clip-text bg-gradient-to-r from-accent via-white to-accent relative">
                {heroText.line3}
                <span className="text-accent">.</span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent/30 via-white/30 to-accent/30 blur-2xl opacity-60"></span>
              </span>
            </div>
          </h1>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-end">
            <div className="md:col-span-6 lg:col-span-5">
              <p className="hero-sub text-lg md:text-xl text-muted leading-relaxed">
                {profile.intro[language]}
              </p>
            </div>
            <div className="md:col-span-6 flex flex-wrap gap-4">
              <div className="hero-btn">
                <Button 
                  onClick={() => smoothScrollTo('projects', 80)}
                  className="group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {t.hero.viewProjects} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </Button>
              </div>
              <div className="hero-btn">
                <Button 
                  variant="outline" 
                  onClick={() => smoothScrollTo('contact', 80)}
                  className="group"
                >
                  {t.hero.bookCall}
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Enhanced Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
        <span className="text-xs uppercase tracking-widest font-mono">{t.hero.scroll}</span>
        <div className="relative w-[1px] h-16">
          <div className="absolute inset-0 bg-gradient-to-b from-accent via-white/50 to-transparent"></div>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent rounded-full animate-bounce shadow-[0_0_10px_rgba(255,77,0,0.8)]"></div>
        </div>
      </div>
    </section>
  );
};
