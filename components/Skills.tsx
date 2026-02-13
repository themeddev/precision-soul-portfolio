import React from 'react';
import { skills, translations } from '../lib/data-loader';
import { CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const Skills: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section id="stack" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20">
         <h2 className="text-sm text-accent font-mono uppercase tracking-widest mb-4">{t.skills.techStack}</h2>
         <h3 className="text-4xl md:text-5xl font-display font-bold">{t.skills.toolsOfTheTrade}</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((category, idx) => (
            <div key={idx} className="group relative bg-surface p-8 rounded-3xl border border-white/5 hover:border-accent/50 transition-colors duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                
                <h4 className="text-2xl font-bold mb-8 relative z-10">{category.category[language]}</h4>
                
                <div className="space-y-6 relative z-10">
                    {category.skills.map((skill, sIdx) => (
                        <div key={sIdx} className="space-y-2">
                             <div className="flex justify-between items-center text-sm">
                                 <span className="font-medium text-gray-200 flex items-center gap-2">
                                     <CheckCircle2 className="w-4 h-4 text-accent" /> {skill.name}
                                 </span>
                                 <span className="text-muted">{skill.level}%</span>
                             </div>
                             <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                 <div 
                                    className="h-full bg-accent transition-all duration-1000 ease-out" 
                                    style={{ width: `${skill.level}%`, transform: 'translateX(-100%)' }}
                                    ref={(el) => {
                                        if (!el) return;
                                        const observer = new IntersectionObserver((entries) => {
                                            if (entries[0].isIntersecting) {
                                                el.style.transform = 'translateX(0)';
                                            }
                                        });
                                        observer.observe(el);
                                    }}
                                 />
                             </div>
                        </div>
                    ))}
                </div>
            </div>
        ))}
      </div>
    </section>
  );
};