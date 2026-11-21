import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Cpu, Cloud, Terminal } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const Hero: React.FC = () => {
  const navigate = useNavigate();

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center overflow-hidden">
      {/* Background Animated Cyber Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />

      {/* Ambient Electric Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-genesis-electric/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-genesis-cyan/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-40 left-10 w-80 h-80 bg-[#0051FF]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-8">
            
            {/* Small Label Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass-panel border border-genesis-electric/40 bg-genesis-dark/70 text-genesis-electric text-xs sm:text-sm font-semibold tracking-wider uppercase shadow-glow-electric/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-genesis-electric opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-genesis-cyan"></span>
              </span>
              <span>{eventConfig.event.subLabel}</span>
            </motion.div>

            {/* Main Heading & Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-none">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-genesis-cyan">
                  GENESIS
                </span>{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric to-genesis-cyan drop-shadow-[0_0_35px_rgba(74,191,255,0.6)]">
                  {eventConfig.event.edition}
                </span>
              </h1>
              
              <div className="flex items-center justify-center lg:justify-start gap-3 pt-1">
                <div className="h-0.5 w-8 bg-genesis-electric hidden sm:block shadow-glow-electric" />
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric via-genesis-cyan to-white uppercase font-mono">
                  {eventConfig.event.tagline}
                </h2>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-genesis-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal"
            >
              {eventConfig.event.description}
            </motion.p>

            {/* Action CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <button
                onClick={() => navigate('/create-pass')}
                className="w-full sm:w-auto glow-btn px-8 py-4 rounded-xl bg-gradient-to-r from-genesis-electric via-genesis-cyan to-genesis-electric bg-[length:200%_auto] text-genesis-midnight font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer shadow-glow-electric transition-all"
              >
                <Sparkles className="w-5 h-5 text-genesis-midnight animate-pulse" />
                <span>CREATE YOUR DIGITAL PASS</span>
              </button>

              <button
                onClick={() => scrollTo('experience')}
                className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel text-white hover:text-genesis-cyan hover:border-genesis-electric/50 font-semibold text-sm sm:text-base tracking-wide flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 group"
              >
                <span>EXPLORE THE EXPERIENCE</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-genesis-electric" />
              </button>
            </motion.div>

            {/* Quick Feature Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-6 grid grid-cols-3 gap-2 sm:gap-4 max-w-lg mx-auto lg:mx-0 border-t border-genesis-electric/15"
            >
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xs text-genesis-muted font-mono">ORGANIZER</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">AWS SBG</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-genesis-electric/15 px-2">
                <span className="text-xs text-genesis-muted font-mono">CAMPUS</span>
                <span className="text-xs sm:text-sm font-bold text-white tracking-tight">KCC ITM</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xs text-genesis-muted font-mono">ACCESS</span>
                <span className="text-xs sm:text-sm font-bold text-genesis-cyan tracking-tight">OPEN TO ALL</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: 3D Geometric Blocks & Architectural Digital Structure */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Center Visual: Electric Castle Chip Structure Inspired by AWS SBG */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2 }}
              className="relative w-full max-w-[420px] aspect-square flex items-center justify-center"
            >
              {/* Outer Rotating Glowing Ring */}
              <div className="absolute inset-0 rounded-3xl border border-genesis-electric/30 animate-[spin_40s_linear_infinite] pointer-events-none" />
              <div className="absolute -inset-4 rounded-full border border-dashed border-genesis-cyan/20 animate-[spin_60s_linear_infinite_reverse] pointer-events-none" />

              {/* Main Central Card - Master Pass Preview */}
              <div className="relative w-80 sm:w-88 rounded-2xl glass-panel p-2.5 border-2 border-genesis-electric/50 bg-gradient-to-b from-genesis-dark/95 via-genesis-midnight/90 to-genesis-dark/95 shadow-glow-electric-lg overflow-hidden group">
                <div className="relative rounded-xl overflow-hidden shadow-2xl">
                  <img
                    src="/assets/master-pass-reference.jpg"
                    alt="Genesis 2026 Master Attendee Pass Design"
                    className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
                  {/* Subtle glass scanline overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/30 pointer-events-none" />
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-genesis-cyan to-transparent animate-pulse" />
                </div>
              </div>

              {/* Floating Architectural Glass Card 1 (Top Right) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -right-6 sm:-right-8 p-3.5 rounded-xl glass-panel bg-genesis-dark/85 border-genesis-electric/50 shadow-glow-electric/30 backdrop-blur-md hidden sm:flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-genesis-electric/15 text-genesis-electric border border-genesis-electric/30">
                  <Cloud className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Cloud Builders</div>
                  <div className="text-[10px] text-genesis-cyan font-mono">KCC ITM Campus</div>
                </div>
              </motion.div>

              {/* Floating Architectural Glass Card 2 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-6 -left-6 sm:-left-8 p-3.5 rounded-xl glass-panel bg-genesis-dark/85 border-genesis-cyan/50 shadow-glow-cyan/30 backdrop-blur-md hidden sm:flex items-center gap-3"
              >
                <div className="p-2 rounded-lg bg-genesis-cyan/15 text-genesis-cyan border border-genesis-cyan/30">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Digital Attendee Pass</div>
                  <div className="text-[10px] text-genesis-electric font-mono">Instant Generation</div>
                </div>
              </motion.div>

              {/* Floating Terminal Snippet (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-8 right-2 sm:right-0 p-2.5 rounded-lg glass-panel bg-genesis-midnight/90 border border-genesis-electric/30 font-mono text-[10px] text-genesis-muted hidden md:flex items-center gap-2"
              >
                <Terminal className="w-3.5 h-3.5 text-genesis-electric" />
                <span>$ aws sbg genesis --launch</span>
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
};
