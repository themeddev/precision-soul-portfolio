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
        <h2 className="text-sm text-accent font-mono uppercase tracking-widest mb-4">
          {t.skills.techStack}
        </h2>
        <h3 className="text-4xl md:text-5xl font-display font-bold">
          {t.skills.toolsOfTheTrade}
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skills.map((category, idx) => (
          <div
            key={idx}
            className="group relative bg-surface p-8 rounded-3xl border border-white/5 hover:border-accent/50 transition-colors duration-300"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />

            <h4 className="text-2xl font-bold mb-8 relative z-10">
              {category.category[language]}
            </h4>

            <div className="flex flex-wrap gap-3 relative z-10">
              {category.skills.map((skill, sIdx) => (
                <div
                  key={sIdx}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-background/40 px-4 py-2 text-sm text-gray-200"
                >
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span>{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};