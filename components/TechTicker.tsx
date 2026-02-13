import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { techStack } from '../lib/data-loader';

export const TechTicker: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // Clone children for infinite loop
    const totalWidth = wrapper.scrollWidth;
    
    gsap.to(wrapper, {
      x: -totalWidth / 2,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div className="w-full py-10 border-y border-white/5 bg-black/50 overflow-hidden relative z-20">
      <div className="relative w-full flex overflow-hidden">
         <div ref={wrapperRef} className="flex whitespace-nowrap gap-16 px-8">
            {[...techStack, ...techStack, ...techStack].map((tech, i) => (
                <div key={i} className="flex items-center gap-4 text-2xl md:text-4xl font-display font-bold text-white/20 uppercase">
                    <span>{tech}</span>
                    <span className="text-accent text-lg">★</span>
                </div>
            ))}
         </div>
         {/* Gradient Masks */}
         <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent z-10" />
         <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent z-10" />
      </div>
    </div>
  );
};