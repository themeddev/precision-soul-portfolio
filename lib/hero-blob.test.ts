import { describe, expect, it } from 'vitest';

import { getHeroBlobMode, type HeroBlobCapabilityInput } from './hero-blob';

const buildInput = (
  overrides: Partial<HeroBlobCapabilityInput> = {}
): HeroBlobCapabilityInput => ({
  prefersReducedMotion: false,
  isCoarsePointer: false,
  deviceMemory: 8,
  hardwareConcurrency: 8,
  viewportWidth: 1440,
  ...overrides,
});

describe('getHeroBlobMode', () => {
  it('returns fallback when reduced motion is preferred', () => {
    expect(
      getHeroBlobMode(buildInput({ prefersReducedMotion: true }))
    ).toBe('fallback');
  });

  it('returns fallback for constrained mobile devices', () => {
    expect(
      getHeroBlobMode(
        buildInput({
          isCoarsePointer: true,
          hardwareConcurrency: 2,
          deviceMemory: 2,
          viewportWidth: 390,
        })
      )
    ).toBe('fallback');
  });

  it('returns animated for capable desktops', () => {
    expect(
      getHeroBlobMode(
        buildInput({
          deviceMemory: 16,
          hardwareConcurrency: 12,
          viewportWidth: 1600,
        })
      )
    ).toBe('animated');
  });
});
