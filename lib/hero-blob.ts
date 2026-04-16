export type HeroBlobMode = 'animated' | 'fallback';

export interface HeroBlobCapabilityInput {
  prefersReducedMotion: boolean;
  isCoarsePointer: boolean;
  hardwareConcurrency?: number;
  deviceMemory?: number;
  viewportWidth: number;
}

interface NavigatorWithDeviceMemory extends Navigator {
  deviceMemory?: number;
}

export const getHeroBlobMode = ({
  prefersReducedMotion,
  isCoarsePointer,
  hardwareConcurrency,
  deviceMemory,
  viewportWidth,
}: HeroBlobCapabilityInput): HeroBlobMode => {
  if (prefersReducedMotion) {
    return 'fallback';
  }

  const lowCpu = typeof hardwareConcurrency === 'number' && hardwareConcurrency <= 4;
  const lowMemory = typeof deviceMemory === 'number' && deviceMemory <= 4;
  const compactViewport = viewportWidth < 640;

  if ((isCoarsePointer && compactViewport) || lowCpu || lowMemory) {
    return 'fallback';
  }

  return 'animated';
};

export const detectHeroBlobMode = (): HeroBlobMode => {
  if (typeof window === 'undefined') {
    return 'fallback';
  }

  const navigatorWithMemory = window.navigator as NavigatorWithDeviceMemory;

  return getHeroBlobMode({
    prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    isCoarsePointer: window.matchMedia('(pointer: coarse)').matches,
    hardwareConcurrency: window.navigator.hardwareConcurrency,
    deviceMemory: navigatorWithMemory.deviceMemory,
    viewportWidth: window.innerWidth,
  });
};
