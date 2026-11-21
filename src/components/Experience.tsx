import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Flame, Users, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const Experience: React.FC = () => {
  const iconMap: Record<string, React.ElementType> = {
    'explore-aws': Cloud,
    'build-future': Flame,
    'connect-collaborate': Users,
  };

  return (
    <section id="experience" className="relative py-24 sm:py-32 overflow-hidden bg-genesis-dark/40">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25 pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-genesis-electric/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-genesis-cyan/30 text-genesis-cyan font-mono text-xs tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>THE GENESIS EXPERIENCE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase"
          >
            WHAT AWAITS YOU AT{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric to-genesis-cyan">
              GENESIS 2026.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-genesis-muted leading-relaxed"
          >
            Unlock opportunities designed to accelerate your cloud journey from your very first day with AWS SBG at KCC ITM.
          </motion.p>
        </div>

        {/* 3 Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventConfig.experience.map((item, index) => {
            const Icon = iconMap[item.id] || Cloud;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className="relative rounded-3xl glass-panel p-8 flex flex-col justify-between border-genesis-electric/25 hover:border-genesis-electric/60 transition-all duration-300 group overflow-hidden"
              >
                {/* Floating Number Watermark in Background */}
                <span className="absolute -top-4 -right-4 text-8xl font-black font-mono text-white/[0.03] group-hover:text-genesis-electric/[0.08] transition-colors pointer-events-none select-none">
                  {item.number}
                </span>

                {/* Subtle Gradient Accent */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-genesis-electric/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="space-y-6 relative z-10">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-genesis-midnight border border-genesis-electric/40 flex items-center justify-center text-genesis-electric group-hover:text-genesis-cyan group-hover:border-genesis-cyan group-hover:shadow-glow-electric transition-all">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="font-mono text-lg font-bold text-genesis-electric px-3 py-1 rounded-xl bg-genesis-electric/10 border border-genesis-electric/30">
                      {item.number}
                    </span>
                  </div>

                  {/* Title & Tagline */}
                  <div>
                    <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase group-hover:text-genesis-cyan transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm font-semibold text-genesis-electric mt-1">
                      {item.tagline}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-genesis-muted leading-relaxed">
                    {item.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="pt-2 space-y-2.5">
                    {item.highlights.map((highlight) => (
                      <div key={highlight} className="flex items-center gap-2.5 text-xs text-slate-300 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-genesis-electric shrink-0" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Tag */}
                <div className="pt-6 mt-6 border-t border-genesis-electric/15 flex items-center justify-between">
                  <span className="text-xs font-mono text-genesis-muted">
                    AWS SBG // EXPERIENCE
                  </span>
                  <div className="w-8 h-8 rounded-full bg-genesis-electric/10 border border-genesis-electric/30 flex items-center justify-center text-genesis-electric group-hover:bg-genesis-electric group-hover:text-genesis-midnight transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
