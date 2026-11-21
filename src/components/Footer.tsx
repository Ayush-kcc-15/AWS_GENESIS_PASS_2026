import React from 'react';
import { ArrowUp, Heart } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderSocialIcon = (icon: string) => {
    switch (icon) {
      case 'linkedin':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74 0-.96-.78-1.74-1.74-1.74Z" />
          </svg>
        );
      case 'instagram':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
          </svg>
        );

      case 'twitter':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      case 'github':
        return (
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <footer className="relative bg-genesis-dark border-t border-genesis-electric/20 pt-16 pb-12 overflow-hidden">
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-genesis-electric/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Tier: Organization Details & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/5">
          
          {/* Brand Info */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-genesis-midnight border border-genesis-electric/40 p-1 flex items-center justify-center">
                <img
                  src="/assets/aws-sbg-logo.png"
                  alt="AWS SBG Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center border border-genesis-electric/30">
                <img
                  src="/assets/kcc-logo.png"
                  alt="KCC ITM Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-white text-base tracking-wide">
                  GENESIS 2026
                </span>
                <span className="text-[11px] font-mono text-genesis-electric">
                  AWS Student Builder Group
                </span>
              </div>
            </div>

            <div className="space-y-1 text-sm text-genesis-muted">
              <p className="font-semibold text-white">
                {eventConfig.brand.organizer}
              </p>
              <p>
                {eventConfig.brand.institution}
              </p>
              <p className="text-xs text-slate-400">
                Knowledge Park III, Greater Noida, Uttar Pradesh 201306
              </p>
            </div>

            {/* Motto */}
            <div className="pt-2">
              <div className="inline-block px-3 py-1 rounded-lg bg-genesis-midnight border border-genesis-electric/25 font-mono text-xs font-bold tracking-widest text-genesis-cyan">
                {eventConfig.brand.motto}
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-genesis-cyan tracking-wider font-bold">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm text-genesis-muted">
              {eventConfig.navigation.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="hover:text-genesis-electric transition-colors flex items-center gap-1.5"
                  >
                    <span className="text-genesis-electric text-xs">›</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#pass-cta"
                  className="hover:text-genesis-cyan transition-colors flex items-center gap-1.5 text-genesis-electric font-semibold"
                >
                  <span className="text-genesis-electric text-xs">›</span>
                  <span>Digital Attendee Pass</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase text-genesis-cyan tracking-wider font-bold">
              Connect With Us
            </h4>
            <div className="flex flex-wrap gap-2.5">
              {eventConfig.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-10 h-10 rounded-xl glass-panel flex items-center justify-center text-genesis-muted hover:text-genesis-cyan hover:border-genesis-electric hover:shadow-glow-electric transition-all"
                >
                  {renderSocialIcon(social.icon)}
                </a>
              ))}
            </div>
            <p className="text-xs text-genesis-muted pt-2 leading-relaxed">
              Stay connected for updates, workshop announcements, and pass generation alerts.
            </p>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-genesis-muted">
          <div>
            © {new Date().getFullYear()} {eventConfig.brand.organizer}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1 text-[11px] font-mono">
              Designed for Cloud Builders with <Heart className="w-3.5 h-3.5 text-genesis-electric fill-genesis-electric" />
            </span>

            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-genesis-midnight border border-genesis-electric/30 text-genesis-electric hover:bg-genesis-electric hover:text-genesis-midnight transition-all cursor-pointer"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
