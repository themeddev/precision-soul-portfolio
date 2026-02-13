import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS } from '../constants';
import { Github, ExternalLink } from 'lucide-react';
import { Button } from './ui/Button';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const wrapper = wrapperRef.current;
    
    if (!container || !wrapper) return;

    // Need to handle resizing to recalculate width
    const getScrollAmount = () => {
        let wrapperWidth = wrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth);
    };

    const tween = gsap.to(wrapper, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      }
    });

    return () => {
        tween.kill();
    };
  }, []);

  return (
    <section id="projects" className="bg-background relative">
      <div ref={containerRef} className="h-screen overflow-hidden flex flex-col">
        <div className="px-12 py-8 shrink-0 flex items-end justify-between">
           <div>
               <h2 className="text-sm text-accent font-mono uppercase tracking-widest mb-2">Selected Works</h2>
               <h3 className="text-4xl md:text-5xl font-display font-bold">Featured Projects</h3>
           </div>
           <div className="hidden md:block text-muted text-sm">Scroll to explore →</div>
        </div>

        <div ref={wrapperRef} className="flex h-full px-12 gap-12 pb-20 items-center">
            {PROJECTS.map((project) => (
                <div key={project.id} className="relative w-[85vw] md:w-[60vw] lg:w-[45vw] h-[60vh] shrink-0 group perspective-1000">
                    <div className="w-full h-full bg-surface border border-white/5 rounded-3xl overflow-hidden relative transition-transform duration-500 group-hover:scale-[1.02] group-hover:border-white/20">
                        {/* Image */}
                        <div className="absolute inset-0">
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-10" />
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110" 
                            />
                        </div>

                        {/* Content */}
                        <div className="absolute bottom-0 left-0 right-0 p-8 z-20 flex flex-col gap-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-accent text-xs font-bold uppercase tracking-wider mb-2">{project.role}</div>
                                    <h3 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{project.title}</h3>
                                    <p className="text-gray-300 line-clamp-2 max-w-md">{project.description}</p>
                                </div>
                                <div className="bg-accent/10 text-accent px-4 py-2 rounded-full text-xs font-bold border border-accent/20">
                                    {project.metrics}
                                </div>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 my-2">
                                {project.tags.map(tag => (
                                    <span key={tag} className="text-xs border border-white/10 px-3 py-1 rounded-full text-gray-400">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-4 pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <Button variant="primary" className="!py-3 !px-6 text-sm">
                                    View Live <ExternalLink className="w-4 h-4 ml-2" />
                                </Button>
                                <Button variant="secondary" className="!py-3 !px-6 text-sm">
                                    <Github className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            
            {/* View All Card */}
             <div className="w-[85vw] md:w-[30vw] h-[60vh] shrink-0 flex items-center justify-center">
                 <div className="text-center">
                     <h3 className="text-4xl font-display font-bold mb-6">Want to see more?</h3>
                     <Button variant="outline">View GitHub Profile</Button>
                 </div>
             </div>
        </div>
      </div>
    </section>
  );
};