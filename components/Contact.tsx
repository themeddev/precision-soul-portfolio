import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Send, MapPin, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { profile, social, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === 'sending') return;
    setStatus('sending');

    try {
      const apiUrl = import.meta.env.VITE_CONTACT_API_URL as string | undefined;

      if (apiUrl) {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      } else {
        const params = new URLSearchParams({
          subject: `Portfolio contact from ${formData.name}`,
          body: `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
        });

        window.location.href = `mailto:${profile.email}?${params.toString()}`;
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setStatus('idle'), 3000);
    } catch {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  return (
    <footer id="contact" className="relative pt-32 pb-12 bg-background px-6 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-accent/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
            
            <div className="flex-1">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8">
                    {t.contact.title.split(' ').map((word, i) => 
                      word === 'legendary' || word === 'légendaire' || word === 'Legendäres' ? (
                        <span key={i} className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-600">{word} </span>
                      ) : (
                        <span key={i}>{word} </span>
                      )
                    )}
                </h2>
                <div className="flex flex-col gap-6 text-muted text-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text">
                            <Mail size={18} />
                        </div>
                        <a href={`mailto:${profile.email}`} className="hover:text-accent transition-colors">{profile.email}</a>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-text">
                            <MapPin size={18} />
                        </div>
                        <span>{profile.location[language]}</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[450px] bg-surface p-8 md:p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6">{t.contact.sendMessage}</h3>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">{t.contact.name}</label>
                        <input 
                          type="text" 
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-surfaceHighlight/60 border border-white/10 rounded-lg p-4 text-text focus:outline-none focus:border-accent transition-colors" 
                          placeholder={t.contact.namePlaceholder} 
                        />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">{t.contact.email}</label>
                        <input 
                          type="email" 
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-surfaceHighlight/60 border border-white/10 rounded-lg p-4 text-text focus:outline-none focus:border-accent transition-colors" 
                          placeholder={t.contact.emailPlaceholder} 
                        />
                    </div>
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">{t.contact.message}</label>
                        <textarea 
                          rows={4} 
                          required
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full bg-surfaceHighlight/60 border border-white/10 rounded-lg p-4 text-text focus:outline-none focus:border-accent transition-colors" 
                          placeholder={t.contact.messagePlaceholder} 
                        />
                    </div>
                    {status === 'success' && (
                      <div className="text-green-400 text-sm">Message sent successfully!</div>
                    )}
                    {status === 'error' && (
                      <div className="text-red-400 text-sm">Failed to send message. Please try again.</div>
                    )}
                    <Button className="w-full" type="submit" disabled={status === 'sending'}>
                        {status === 'sending' ? 'Sending...' : t.contact.send} <Send className="w-4 h-4 ml-2" />
                    </Button>
                </form>
            </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted">
                © {new Date().getFullYear()} {profile.name}. {t.contact.copyright}
            </div>
            <div className="flex gap-6">
                <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent hover:scale-110 transition-all"><Github size={20} /></a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent hover:scale-110 transition-all"><Linkedin size={20} /></a>
                <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent hover:scale-110 transition-all"><Twitter size={20} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};
