import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TIMELINE } from '../constants';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  
  useEffect(() => {
    gsap.fromTo('.about-reveal',
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%',
        }
      }
    );

    gsap.fromTo('.timeline-item',
        { x: -50, opacity: 0 },
        {
            x: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 0.8,
            scrollTrigger: {
                trigger: '#about-timeline',
                start: 'top 80%',
            }
        }
    );
  }, []);

  return (
    <section id="about" className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        
        {/* Bio */}
        <div>
          <h2 className="about-reveal text-sm text-accent font-mono uppercase tracking-widest mb-6">About Me</h2>
          <h3 className="about-reveal text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
            I don't just write code.<br />
            I engineer <span className="text-white">business outcomes</span>.
          </h3>
          <div className="space-y-6 text-muted text-lg">
            <p className="about-reveal">
              With over 6 years of deep technical experience, I bridge the gap between complex backend architecture 
              and intuitive frontend design.
            </p>
            <p className="about-reveal">
              My philosophy is simple: clean code, scalable infrastructure, and a relentless focus on user experience. 
              Whether it's a 0-to-1 startup MVP or an enterprise migration, I bring a product-first mindset.
            </p>
          </div>
          
          <div className="about-reveal grid grid-cols-2 gap-8 mt-12">
             <div className="bg-surface p-6 rounded-2xl border border-white/5">
                 <div className="text-4xl font-display font-bold text-white mb-2">6+</div>
                 <div className="text-sm text-muted">Years Experience</div>
             </div>
             <div className="bg-surface p-6 rounded-2xl border border-white/5">
                 <div className="text-4xl font-display font-bold text-white mb-2">40+</div>
                 <div className="text-sm text-muted">Projects Delivered</div>
             </div>
          </div>
        </div>

        {/* Timeline */}
        <div id="about-timeline">
           <h3 className="text-2xl font-display font-bold mb-8">Experience</h3>
           <div className="relative border-l border-white/10 ml-3 space-y-12">
              {TIMELINE.map((item, idx) => (
                  <div key={idx} className="timeline-item relative pl-12">
                      <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-accent rounded-full shadow-[0_0_10px_rgba(255,77,0,0.8)]"></div>
                      <div className="text-xs font-mono text-accent mb-2">{item.year}</div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.role}</h4>
                      <div className="text-sm text-muted mb-4">{item.company}</div>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-md">{item.description}</p>
                  </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};