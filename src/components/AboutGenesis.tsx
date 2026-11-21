import React from 'react';
import { motion } from 'framer-motion';
import { Cloud, Users2, Building2, Code2, Sparkles } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const AboutGenesis: React.FC = () => {
  const cards = [
    {
      icon: Cloud,
      title: "AWS Student Builder Group",
      subtitle: "Official Student Community",
      description:
        "An ecosystem dedicated to empowering college students with practical AWS cloud knowledge, hands-on building experiences, and direct industry connections.",
      badge: "OFFICIAL CHAPTER",
    },
    {
      icon: Building2,
      title: "KCC ITM Host Institution",
      subtitle: "Greater Noida, Delhi-NCR",
      description:
        "KCC Institute of Technology & Management fosters premier technological innovation and engineering excellence, providing world-class infrastructure for cloud builders.",
      badge: "CAMPUS HOST",
    },
    {
      icon: Code2,
      title: "Hands-on Architecture",
      subtitle: "Beyond Theory to Practice",
      description:
        "Learn core compute, storage, databases, serverless, and cloud security by designing real production environments on Amazon Web Services.",
      badge: "PRODUCTION LABS",
    },
    {
      icon: Users2,
      title: "Inclusive Builder Network",
      subtitle: "Open to All Learners",
      description:
        "Whether you are writing your first line of code or deploying distributed apps, Genesis unites builders of all skill levels across all engineering disciplines.",
      badge: "COMMUNITY DRIVEN",
    },
  ];

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-genesis-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-genesis-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-genesis-electric/30 text-genesis-electric font-mono text-xs tracking-wider uppercase"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>ABOUT THE INITIATIVE</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase"
          >
            A NEW ERA OF{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric to-genesis-cyan">
              CLOUD BUILDERS.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-lg text-genesis-muted leading-relaxed"
          >
            {eventConfig.event.aboutDescription}
          </motion.p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="glass-panel glass-panel-hover p-6 rounded-2xl flex flex-col justify-between relative group overflow-hidden border border-genesis-electric/20 hover:border-genesis-electric/60"
              >
                {/* Subtle Card Glow Effect */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-genesis-electric/10 rounded-full blur-xl group-hover:bg-genesis-electric/25 transition-all" />

                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-genesis-midnight/80 border border-genesis-electric/40 flex items-center justify-center text-genesis-electric group-hover:text-genesis-cyan group-hover:border-genesis-cyan group-hover:shadow-glow-electric transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-genesis-electric/10 border border-genesis-electric/25 text-genesis-electric font-semibold tracking-wider">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white group-hover:text-genesis-cyan transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-xs font-mono text-genesis-electric/80 mt-0.5">
                      {card.subtitle}
                    </p>
                  </div>

                  <p className="text-sm text-genesis-muted leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-xs text-genesis-muted font-mono">
                  <span>PHASE // 01</span>
                  <span className="text-genesis-electric group-hover:translate-x-1 transition-transform inline-block">
                    →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Institutional Synergy Glass Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 p-6 sm:p-8 rounded-2xl glass-panel border border-genesis-electric/25 bg-gradient-to-r from-genesis-dark/90 via-genesis-midnight/90 to-genesis-dark/90 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-center gap-4 sm:gap-6">
            <div className="w-16 h-16 rounded-2xl bg-white p-2.5 flex items-center justify-center border-2 border-genesis-electric/40 shadow-glow-electric shrink-0">
              <img
                src="/assets/kcc-logo.png"
                alt="KCC ITM Logo"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="text-xs font-mono text-genesis-cyan tracking-wider uppercase">
                ACADEMIC & INNOVATION PARTNERSHIP
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                KCC Institute of Technology & Management
              </h4>
              <p className="text-xs sm:text-sm text-genesis-muted mt-1 max-w-xl">
                Dedicated to pioneering cloud literacy and providing a dynamic platform for students to lead the cloud computing revolution.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-xl bg-genesis-midnight border border-genesis-electric/30 text-center">
              <div className="text-sm font-bold text-genesis-electric font-mono">2026</div>
              <div className="text-[10px] text-genesis-muted">INAUGURAL</div>
            </div>
            <div className="px-4 py-2 rounded-xl bg-genesis-midnight border border-genesis-cyan/30 text-center">
              <div className="text-sm font-bold text-genesis-cyan font-mono">100% FREE</div>
              <div className="text-[10px] text-genesis-muted">OPEN PASS</div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
