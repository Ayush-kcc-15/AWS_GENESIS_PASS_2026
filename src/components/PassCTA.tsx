import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Ticket, ShieldCheck, Share2, Camera, UserCheck, ArrowRight } from 'lucide-react';

export const PassCTA: React.FC = () => {
  const navigate = useNavigate();

  const handleGenerateClick = () => {
    navigate('/create-pass');
  };

  return (
    <section id="pass-cta" className="relative py-24 sm:py-36 overflow-hidden">
      {/* Background Cyber Glow & Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-genesis-electric/15 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[400px] bg-genesis-cyan/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="relative rounded-3xl glass-panel p-8 sm:p-14 lg:p-16 border-2 border-genesis-electric/40 bg-gradient-to-b from-genesis-dark/95 via-genesis-midnight/90 to-genesis-dark/95 shadow-glow-electric-lg overflow-hidden">
          
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-2 border-l-2 border-genesis-electric pointer-events-none rounded-tl-3xl opacity-80" />
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-2 border-r-2 border-genesis-cyan pointer-events-none rounded-br-3xl opacity-80" />
          <div className="absolute top-0 right-0 w-24 h-24 border-t-2 border-r-2 border-genesis-cyan/40 pointer-events-none rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-2 border-l-2 border-genesis-electric/40 pointer-events-none rounded-bl-3xl" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Heading, Description & Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-genesis-electric/40 text-genesis-electric font-mono text-xs font-semibold tracking-wider uppercase">
                <Ticket className="w-4 h-4 text-genesis-electric animate-bounce" />
                <span>OFFICIAL DIGITAL ATTENDEE BADGE</span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase leading-tight">
                YOUR GENESIS JOURNEY{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric via-genesis-cyan to-white drop-shadow-[0_0_30px_rgba(74,191,255,0.5)]">
                  STARTS HERE.
                </span>
              </h2>

              <p className="text-base sm:text-lg text-genesis-muted max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Create your personalized Genesis 2026 attendee pass and share your excitement with the world.
              </p>

              {/* Pass Features List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <UserCheck className="w-4 h-4 text-genesis-electric shrink-0" />
                  <span>Personalized with Your Full Name</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Camera className="w-4 h-4 text-genesis-cyan shrink-0" />
                  <span>Custom Photograph Upload</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <ShieldCheck className="w-4 h-4 text-genesis-electric shrink-0" />
                  <span>High-Resolution PNG Download</span>
                </div>
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <Share2 className="w-4 h-4 text-genesis-cyan shrink-0" />
                  <span>Instant LinkedIn & Social Sharing</span>
                </div>
              </div>

              {/* Primary CTA Button */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={handleGenerateClick}
                  className="w-full sm:w-auto glow-btn px-10 py-5 rounded-2xl bg-gradient-to-r from-genesis-electric via-genesis-cyan to-genesis-electric bg-[length:200%_auto] text-genesis-midnight font-black text-base sm:text-lg tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer shadow-glow-electric-lg transition-all active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-genesis-midnight" />
                  <span>GENERATE MY PASS</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="text-[11px] text-genesis-muted/80 font-mono text-center lg:text-left">
                No login required • No registration verification • 100% Free promotional pass
              </div>
            </div>

            {/* Right Column: Master Pass Design Showcase */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-[340px] rounded-3xl glass-panel p-3 border-2 border-genesis-electric/50 bg-gradient-to-b from-genesis-dark via-genesis-midnight to-genesis-dark shadow-glow-electric-lg overflow-hidden group">
                
                {/* Holographic light sweep */}
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-45 animate-[glow_6s_linear_infinite] pointer-events-none" />

                <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-genesis-electric/30">
                  <img
                    src="/assets/master-pass-reference.jpg"
                    alt="Master Genesis 2026 Attendee Pass Design"
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-genesis-midnight/70 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Floating interactive badge */}
                  <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-xl glass-panel bg-genesis-dark/90 border border-genesis-electric/40 flex items-center justify-between text-[11px] font-mono text-white">
                    <span className="text-genesis-cyan font-bold">MASTER DESIGN</span>
                    <span className="text-slate-300">GENESIS 2026</span>
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
