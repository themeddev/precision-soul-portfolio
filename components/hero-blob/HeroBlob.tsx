import React, { Suspense, lazy, useEffect, useState } from 'react';

import { detectHeroBlobMode, type HeroBlobMode } from '../../lib/hero-blob';
import { HeroBlobFallback } from './HeroBlobFallback';

const LazyHeroBlobCanvas = lazy(async () => {
  const module = await import('./HeroBlobCanvas');
  return { default: module.HeroBlobCanvas };
});

interface HeroBlobProps {
  className?: string;
}

export const HeroBlob: React.FC<HeroBlobProps> = ({ className = '' }) => {
  const [mode, setMode] = useState<HeroBlobMode>('fallback');
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const updateMode = () => {
      setMode(detectHeroBlobMode());
      setReady(true);
    };

    updateMode();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pointerQuery = window.matchMedia('(pointer: coarse)');

    motionQuery.addEventListener?.('change', updateMode);
    pointerQuery.addEventListener?.('change', updateMode);
    window.addEventListener('resize', updateMode, { passive: true });

    return () => {
      motionQuery.removeEventListener?.('change', updateMode);
      pointerQuery.removeEventListener?.('change', updateMode);
      window.removeEventListener('resize', updateMode);
    };
  }, []);

  return (
    <div className={`pointer-events-none relative ${className}`} aria-hidden="true">
      <div className="absolute inset-[14%] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),rgba(80,120,255,0.08)_20%,rgba(0,0,0,0)_68%)] blur-3xl" />
      <div className="absolute inset-[18%] rounded-full bg-[radial-gradient(circle,rgba(255,112,79,0.18),rgba(0,0,0,0)_58%)] blur-[80px]" />
      <div className="relative h-full w-full">
        {mode === 'animated' && ready ? (
          <Suspense fallback={<HeroBlobFallback className="mx-auto" />}>
            <LazyHeroBlobCanvas />
          </Suspense>
        ) : (
          <HeroBlobFallback className="mx-auto" />
        )}
      </div>
    </div>
  );
};
