import { profile } from './data-loader';
import type { Language } from '../types';

export const updateDocumentTitle = (language: Language) => {
  document.title = `${profile.name} | ${profile.title}`;
};

export const updateDocumentLang = (language: Language) => {
  document.documentElement.lang = language;
};

// Performance utilities
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean;
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;
  return function (this: any, ...args: Parameters<T>) {
    const context = this;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), wait);
  };
};

// Check if user prefers reduced motion
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Optimized scroll function that works with Lenis
export const smoothScrollTo = (elementId: string, offset: number = 80) => {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Use Lenis if available, otherwise fallback to native
  const lenis = (window as any).lenis;
  if (lenis) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    lenis.scrollTo(targetPosition, { duration: 1.2 });
  } else {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  }
};
