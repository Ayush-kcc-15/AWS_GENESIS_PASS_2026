import React from 'react';
import { Heart } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const MinimalFooter: React.FC = () => {
  return (
    <footer className="relative bg-genesis-dark/60 border-t border-genesis-electric/15 py-8 mt-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-3">
        
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-genesis-muted">
          <span className="font-bold text-white tracking-wide">
            {eventConfig.brand.organizer}
          </span>
          <span className="text-white/20">•</span>
          <span>{eventConfig.brand.institution}</span>
          <span className="text-white/20">•</span>
          <span className="text-genesis-cyan font-mono font-bold tracking-wider">
            {eventConfig.brand.motto}
          </span>
        </div>

        <p className="text-[11px] font-mono text-slate-400 max-w-xl mx-auto leading-relaxed">
          The GENESIS 2026 digital attendee pass is a social-media promotional identity celebrating the launch of AWS Student Builder Group at KCC ITM and does not constitute verified event admission.
        </p>

        <div className="pt-2 flex items-center justify-center gap-1 text-[11px] text-genesis-muted font-mono">
          <span>Built for Cloud Builders with</span>
          <Heart className="w-3 h-3 text-genesis-electric fill-genesis-electric" />
          <span>at KCC ITM</span>
        </div>

      </div>
    </footer>
  );
};
