import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { techStack } from '../lib/data-loader';

export const TechTicker: React.FC = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const totalWidth = wrapper.scrollWidth;

    gsap.to(wrapper, {
      x: -totalWidth / 2,
      duration: 20,
      ease: 'none',
      repeat: -1,
    });
  }, []);

  return (
    <div className="relative z-20 w-full overflow-hidden border-y border-white/5 bg-background/80 py-10">
      <div className="relative flex w-full overflow-hidden">
        <div ref={wrapperRef} className="flex whitespace-nowrap gap-16 px-8">
          {[...techStack, ...techStack, ...techStack].map((tech, i) => (
            <div
              key={i}
              className="flex items-center gap-4 font-display text-2xl font-bold uppercase text-foreground/30 md:text-4xl dark:text-white/20"
            >
              <span>{tech}</span>
              <span className="text-accent text-lg">★</span>
            </div>
          ))}
        </div>

        {/* Gradient Masks */}
        <div className="absolute top-0 left-0 z-10 h-full w-32 bg-gradient-to-r from-background to-transparent" />
        <div className="absolute top-0 right-0 z-10 h-full w-32 bg-gradient-to-l from-background to-transparent" />
      </div>
    </div>
  );
};