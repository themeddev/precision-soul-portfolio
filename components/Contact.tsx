import React from 'react';
import { Button } from './ui/Button';
import { Send, MapPin, Mail, Linkedin, Github, Twitter } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <footer id="contact" className="relative pt-32 pb-12 bg-black px-6 overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-gradient-to-b from-accent/5 to-transparent blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-start">
            
            <div className="flex-1">
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8">
                    Let's build something <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-orange-600">legendary</span>.
                </h2>
                <div className="flex flex-col gap-6 text-muted text-lg">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-white">
                            <Mail size={18} />
                        </div>
                        <a href="mailto:hello@alexdev.com" className="hover:text-white transition-colors">hello@alexdev.com</a>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="w-10 h-10 rounded-full bg-surface flex items-center justify-center text-white">
                            <MapPin size={18} />
                        </div>
                        <span>San Francisco, CA (Remote Open)</span>
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-auto lg:min-w-[450px] bg-surface p-8 md:p-10 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6">Send a message</h3>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-400">Name</label>
                        <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition-colors" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Email</label>
                        <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition-colors" placeholder="john@example.com" />
                    </div>
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400">Message</label>
                        <textarea rows={4} className="w-full bg-black/50 border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-accent transition-colors" placeholder="Tell me about your project..." />
                    </div>
                    <Button className="w-full">
                        Send Message <Send className="w-4 h-4 ml-2" />
                    </Button>
                </form>
            </div>
        </div>

        <div className="mt-32 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-sm text-muted">
                © {new Date().getFullYear()} AlexDev. All Rights Reserved.
            </div>
            <div className="flex gap-6">
                <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><Github size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><Linkedin size={20} /></a>
                <a href="#" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><Twitter size={20} /></a>
            </div>
        </div>
      </div>
    </footer>
  );
};