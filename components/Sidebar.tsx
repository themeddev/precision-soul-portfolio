import React from 'react';
import { Github, Linkedin, Mail, Download } from 'lucide-react';
import { social, profile } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';

export const Sidebar: React.FC = () => {
  const { language } = useLanguage();

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = profile.cvUrl;
    link.download = `cv-${profile.name.toLowerCase().replace(' ', '-')}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-6">
      <div className="flex flex-col gap-4 bg-surface/80 backdrop-blur-md p-4 rounded-full border border-white/10">
        <a
          href={social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
          aria-label="GitHub"
        >
          <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href={social.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
          aria-label="LinkedIn"
        >
          <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
        <a
          href={`mailto:${social.email}`}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
          aria-label="Email"
        >
          <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </a>
        <button
          onClick={handleDownloadCV}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-accent/20 hover:text-accent transition-all duration-300 group"
          aria-label="Download CV"
        >
          <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>
      
      {/* Vertical line */}
      <div className="w-[1px] h-24 bg-gradient-to-b from-accent/50 to-transparent mx-auto" />
    </aside>
  );
};
