import React, { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { timeline, profile, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
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
          <h2 className="about-reveal text-sm text-accent font-mono uppercase tracking-widest mb-6">{t.about.aboutMe}</h2>
          <h3 className="about-reveal text-4xl md:text-5xl font-display font-bold leading-tight mb-8">
            {t.about.title.split('\n').map((line, i, arr) => (
              <React.Fragment key={i}>
                {line}
                {i < arr.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h3>
          <div className="space-y-6 text-muted text-lg">
            <p className="about-reveal">
              {profile.bio[language].split('. ')[0]}.
            </p>
            <p className="about-reveal">
              {profile.bio[language].split('. ').slice(1).join('. ')}
            </p>
          </div>
          
          <div className="about-reveal grid grid-cols-2 gap-8 mt-12">
             <div className="bg-surface p-6 rounded-2xl border border-white/5">
                 <div className="text-4xl font-display font-bold text-white mb-2">{profile.stats.experience}</div>
                 <div className="text-sm text-muted">{profile.stats.experienceLabel[language]}</div>
             </div>
             <div className="bg-surface p-6 rounded-2xl border border-white/5">
                 <div className="text-4xl font-display font-bold text-white mb-2">{profile.stats.projects}</div>
                 <div className="text-sm text-muted">{profile.stats.projectsLabel[language]}</div>
             </div>
          </div>
        </div>

        {/* Timeline */}
        <div id="about-timeline">
           <h3 className="text-2xl font-display font-bold mb-8">{t.about.experience}</h3>
           <div className="relative border-l border-white/10 ml-3 space-y-12">
              {timeline.map((item, idx) => (
                  <div key={idx} className="timeline-item relative pl-12">
                      <div className="absolute -left-[5px] top-2 w-[9px] h-[9px] bg-accent rounded-full shadow-[0_0_10px_rgba(255,77,0,0.8)]"></div>
                      <div className="text-xs font-mono text-accent mb-2">{item.year}</div>
                      <h4 className="text-xl font-bold text-white mb-1">{item.role[language]}</h4>
                      <div className="text-sm text-muted mb-4">{item.company}</div>
                      <p className="text-sm text-gray-400 leading-relaxed max-w-md">{item.description[language]}</p>
                  </div>
              ))}
           </div>
        </div>

      </div>
    </section>
  );
};