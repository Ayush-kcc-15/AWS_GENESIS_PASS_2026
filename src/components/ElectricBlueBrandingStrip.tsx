import React from 'react';
import { motion } from 'framer-motion';

export const ElectricBlueBrandingStrip: React.FC = () => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="w-full max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-12"
    >
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end">
        
        {/* The Characteristic Docked Branding Strip matching uploaded reference */}
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ duration: 0.2 }}
          className="flex items-stretch border border-[#515963] bg-[#161C25] shadow-2xl group hover:border-[#40B4F5]/60 hover:shadow-[0_0_25px_rgba(64,180,245,0.2)] transition-all duration-300"
        >
          
          {/* Left Dark Block with the Geometric Processor/Chip Icon */}
          <div className="w-16 sm:w-20 bg-[#161C25] flex items-center justify-center p-3 border-r border-[#515963] overflow-hidden">
            {/* Geometric Processor / Castle Chip Icon matching reference with subtle entrance spin/scale */}
            <motion.svg
              viewBox="0 0 100 100"
              className="w-8 h-8 sm:w-10 sm:h-10"
              initial={{ scale: 0.85, rotate: -8 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <path
                d="M 30,10 L 40,10 L 40,20 L 45,20 L 45,10 L 55,10 L 55,20 L 60,20 L 60,10 L 70,10 L 70,30 L 80,30 L 80,40 L 90,40 L 90,45 L 80,45 L 80,55 L 90,55 L 90,60 L 80,60 L 80,70 L 70,70 L 70,80 L 60,80 L 60,90 L 55,90 L 55,80 L 45,80 L 45,90 L 40,90 L 40,80 L 30,80 L 30,70 L 20,70 L 20,60 L 10,60 L 10,55 L 20,55 L 20,45 L 10,45 L 10,40 L 20,40 L 20,30 L 30,30 Z"
                fill="#40B4F5"
              />
              <rect x="36" y="36" width="28" height="28" fill="#161C25" />
            </motion.svg>
          </div>

          {/* Right Solid Electric Blue Rectangle (#40B4F5) with Dark Charcoal Text (#15212C) */}
          <div className="bg-[#40B4F5] px-6 sm:px-10 py-4 sm:py-5 flex flex-col justify-center text-left">
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="font-mono text-base sm:text-xl font-bold text-[#15212C] tracking-tight leading-tight"
            >
              AWS Student Builder Group
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="font-mono text-xs sm:text-sm font-semibold text-[#15212C]/90 tracking-normal mt-0.5"
            >
              at KCC Institute of Technology &amp; Management
            </motion.span>
          </div>

        </motion.div>

      </div>

      {/* Subtle Bottom Credit & Non-Admission Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-8 pt-4 border-t border-[#515963]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] font-mono text-[#8A95A3]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#40B4F5]" />
          <span>GENESIS 2026 • OFFICIAL ATTENDEE IDENTITY GENERATOR</span>
        </div>
        <p className="text-center sm:text-right">
          This pass is a promotional social identity and does not constitute verified event admission.
        </p>
      </motion.div>
    </motion.footer>
  );
};
