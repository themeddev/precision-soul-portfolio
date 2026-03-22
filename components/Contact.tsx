import React, { useState } from 'react';
import { Button } from './ui/Button';
import { Send, MapPin, Mail, Linkedin, Github, Twitter } from 'lucide-react';
import { profile, social, translations } from '../lib/data-loader';
import { useLanguage } from '../contexts/LanguageContext';

type ContactStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [botField, setBotField] = useState('');
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (status === 'sending' || botField) return;

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setStatus('error');
      setFeedbackMessage(t.contact.missingConfig);
      return;
    }

    setStatus('sending');
    setFeedbackMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          subject: `Portfolio contact from ${formData.name}`,
          from_name: formData.name,
          replyto: formData.email,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: botField,
        }),
      });

      const result = (await response.json()) as { success?: boolean; message?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.message || t.contact.error);
      }

      setStatus('success');
      setFeedbackMessage(t.contact.success);
      setFormData({ name: '', email: '', message: '' });
      setBotField('');

      window.setTimeout(() => {
        setStatus('idle');
        setFeedbackMessage('');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setFeedbackMessage(error instanceof Error ? error.message : t.contact.error);

      window.setTimeout(() => {
        setStatus('idle');
        setFeedbackMessage('');
      }, 3000);
    }
  };

  return (
    <footer id="contact" className="relative overflow-hidden bg-background px-6 pb-12 pt-32">
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-4xl -translate-x-1/2 bg-gradient-to-b from-accent/5 to-transparent blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col items-start gap-20 lg:flex-row">
          <div className="flex-1">
            <h2 className="mb-8 text-5xl font-display font-bold leading-tight md:text-7xl lg:text-8xl">
              {t.contact.title.split(' ').map((word, i) =>
                word === 'legendary' || word === 'légendaire' || word === 'Legendäres' ? (
                  <span key={i} className="bg-gradient-to-r from-accent to-orange-600 bg-clip-text text-transparent">
                    {word}{' '}
                  </span>
                ) : (
                  <span key={i}>{word} </span>
                )
              )}
            </h2>
            <div className="flex flex-col gap-6 text-lg text-muted">
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text">
                  <Mail size={18} />
                </div>
                <a href={`mailto:${profile.email}`} className="transition-colors hover:text-accent">
                  {profile.email}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface text-text">
                  <MapPin size={18} />
                </div>
                <span>{profile.location[language]}</span>
              </div>
            </div>
          </div>

          <div className="w-full rounded-3xl border border-white/10 bg-surface p-8 md:p-10 lg:w-auto lg:min-w-[450px]">
            <h3 className="mb-6 text-2xl font-bold">{t.contact.sendMessage}</h3>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={botField}
                onChange={(e) => setBotField(e.target.value)}
                className="hidden"
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400">{t.contact.name}</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-lg border border-white/10 bg-surfaceHighlight/60 p-4 text-text transition-colors focus:border-accent focus:outline-none"
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
                  className="w-full rounded-lg border border-white/10 bg-surfaceHighlight/60 p-4 text-text transition-colors focus:border-accent focus:outline-none"
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
                  className="w-full rounded-lg border border-white/10 bg-surfaceHighlight/60 p-4 text-text transition-colors focus:border-accent focus:outline-none"
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              {status === 'success' && <div className="text-sm text-green-400">{feedbackMessage}</div>}
              {status === 'error' && <div className="text-sm text-red-400">{feedbackMessage}</div>}

              <Button className="w-full" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? t.contact.sending : t.contact.send}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-32 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-8 md:flex-row">
          <div className="text-sm text-muted">
            © {new Date().getFullYear()} {profile.name}. {t.contact.copyright}
          </div>
          <div className="flex gap-6">
            <a href={social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-all hover:scale-110 hover:text-accent">
              <Github size={20} />
            </a>
            <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-all hover:scale-110 hover:text-accent">
              <Linkedin size={20} />
            </a>
            <a href={social.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-all hover:scale-110 hover:text-accent">
              <Twitter size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
