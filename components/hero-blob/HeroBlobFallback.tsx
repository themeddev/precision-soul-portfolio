import React from 'react';

interface HeroBlobFallbackProps {
  className?: string;
}

export const HeroBlobFallback: React.FC<HeroBlobFallbackProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative aspect-[0.92] w-full max-w-[30rem] ${className}`}
      aria-hidden="true"
    >
      <div className="absolute inset-[8%] rounded-[42%] bg-[radial-gradient(circle_at_35%_25%,rgba(255,255,255,0.95),rgba(180,205,255,0.18)_16%,rgba(10,10,14,0.95)_48%,rgba(0,0,0,0.98)_72%)] blur-[1px] shadow-[0_0_80px_rgba(255,255,255,0.07)]" />
      <div className="absolute inset-[10%] rounded-[38%] bg-[conic-gradient(from_210deg_at_50%_50%,rgba(18,18,24,0.98),rgba(120,180,255,0.12),rgba(255,120,84,0.14),rgba(164,255,221,0.18),rgba(18,18,24,0.98))] mix-blend-screen opacity-80 blur-[2px]" />
      <div className="absolute inset-[14%] rounded-[44%] border border-white/10 bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.92),rgba(255,255,255,0.08)_18%,rgba(0,0,0,0)_28%),radial-gradient(circle_at_70%_72%,rgba(255,98,71,0.35),rgba(0,0,0,0)_24%),radial-gradient(circle_at_55%_80%,rgba(128,255,220,0.28),rgba(0,0,0,0)_18%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.28),inset_0_-20px_60px_rgba(0,0,0,0.75)]" />
      <div className="absolute inset-[2%] rounded-full bg-[radial-gradient(circle,rgba(120,180,255,0.12),rgba(0,0,0,0)_70%)] blur-3xl opacity-80" />
    </div>
  );
};
