import React, { useEffect } from 'react';
import { services, translations } from '../lib/data-loader';
import * as Icons from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const Services: React.FC = () => {
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        gsap.fromTo('.service-card', 
            { y: 50, opacity: 0 },
            { 
                y: 0, opacity: 1, stagger: 0.1, duration: 0.8,
                scrollTrigger: { trigger: '#services', start: 'top 75%' }
            }
        );
    }, []);

  return (
    <section id="services" className="py-32 bg-[#080808] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                 <div>
                    <h2 className="text-sm text-accent font-mono uppercase tracking-widest mb-4">{t.services.services}</h2>
                    <h3 className="text-4xl md:text-6xl font-display font-bold">{t.services.howICanHelp}</h3>
                 </div>
                 <p className="text-muted max-w-sm text-right md:text-left">
                    {t.services.description}
                 </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {services.map((service, idx) => {
                    // Dynamic icon rendering
                    const IconComponent = (Icons as any)[service.icon] || Icons.Code;
                    
                    return (
                        <div key={idx} className="service-card group bg-surface p-8 rounded-2xl border border-white/5 hover:bg-surfaceHighlight transition-all duration-300">
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-8 text-accent group-hover:scale-110 transition-transform">
                                <IconComponent size={24} />
                            </div>
                            <h4 className="text-2xl font-bold mb-4">{service.title[language]}</h4>
                            <p className="text-muted mb-8 leading-relaxed h-20">{service.description[language]}</p>
                            
                            <div className="space-y-2">
                                <h5 className="text-xs font-bold uppercase tracking-wider text-white/50 mb-4">{t.services.process}</h5>
                                <div className="flex flex-wrap gap-2">
                                    {service.steps[language].map(step => (
                                        <span key={step} className="text-xs border border-white/10 px-2 py-1 rounded text-gray-400">
                                            {step}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
  );
};