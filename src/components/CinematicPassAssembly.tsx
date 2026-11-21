import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import '../styles/CinematicPassAssembly.css';

interface CinematicPassAssemblyProps {
  stage: 'generating' | 'revealing';
  studentName: string;
  studentPhoto: string | null;
  collegeName?: string;
  onComplete: () => void;
}

export const CinematicPassAssembly: React.FC<CinematicPassAssemblyProps> = ({
  stage,
  studentName,
  studentPhoto,
  collegeName = 'KCC INSTITUTE OF TECHNOLOGY & MANAGEMENT',
  onComplete,
}) => {
  const [assemblySubstep, setAssemblySubstep] = useState<'wireframe' | 'fading_content' | 'light_sweep'>('wireframe');

  // Multi-step sub-animation timings
  useEffect(() => {
    if (stage === 'revealing') {
      // Step 2A: Wireframe formation
      setAssemblySubstep('wireframe');

      // Step 2B: Photo & Name fade into position after 400ms
      const t1 = setTimeout(() => {
        setAssemblySubstep('fading_content');
      }, 450);

      // Step 2C: Light sweep traverses across the pass after 1000ms
      const t2 = setTimeout(() => {
        setAssemblySubstep('light_sweep');
      }, 1050);

      // Step 3: Complete animation sequence after 1750ms
      const t3 = setTimeout(() => {
        onComplete();
      }, 1750);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
      };
    }
  }, [stage, onComplete]);

  const rawName = studentName?.trim() || 'AYUSH KUMAR';
  const displayName = rawName.toUpperCase();

  return (
    <div className="w-full max-w-xl mx-auto py-8 px-4 flex flex-col items-center justify-center font-mono">
      <AnimatePresence mode="wait">
        
        {/* ==============================================================
            SCENE 1: GENERATING (Circuit Lines & Converging Geometry)
            ============================================================== */}
        {stage === 'generating' && (
          <motion.div
            key="scene-generating"
            initial={{ opacity: 0, scale: 0.94, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#1B222C] border border-[#515963] p-8 sm:p-12 text-center space-y-6 relative overflow-hidden shadow-2xl"
          >
            {/* Background Radial Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-[#40B4F5]/10 rounded-full blur-[80px] pointer-events-none" />

            {/* SVG Circuit Lines Tracing Inward */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              viewBox="0 0 600 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M 50,50 L 150,50 L 220,120 L 380,120 L 450,50 L 550,50"
                stroke="#40B4F5"
                strokeWidth="1.5"
                className="anim-circuit-trace"
              />
              <path
                d="M 50,300 L 170,300 L 250,220 L 350,220 L 430,300 L 550,300"
                stroke="#55C5FF"
                strokeWidth="1.5"
                className="anim-circuit-trace"
              />
              <line x1="300" y1="0" x2="300" y2="90" stroke="#40B4F5" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="300" y1="260" x2="300" y2="350" stroke="#40B4F5" strokeWidth="1" strokeDasharray="4 4" />
            </svg>

            {/* Converging Micro Squares in Four Quadrants */}
            <div className="absolute top-8 left-12 w-3 h-3 bg-[#40B4F5] anim-converge" style={{ '--tx': '-30px', '--ty': '-20px' } as React.CSSProperties} />
            <div className="absolute top-8 right-12 w-3 h-3 bg-[#40B4F5] anim-converge" style={{ '--tx': '30px', '--ty': '-20px' } as React.CSSProperties} />
            <div className="absolute bottom-8 left-12 w-3 h-3 bg-[#55C5FF] anim-converge" style={{ '--tx': '-30px', '--ty': '20px' } as React.CSSProperties} />
            <div className="absolute bottom-8 right-12 w-3 h-3 bg-[#55C5FF] anim-converge" style={{ '--tx': '30px', '--ty': '20px' } as React.CSSProperties} />

            {/* Central Animated Processor Icon */}
            <div className="relative z-10 flex justify-center">
              <div className="relative w-16 h-16 bg-[#161C25] border-2 border-[#40B4F5] flex items-center justify-center shadow-[0_0_24px_rgba(64,180,245,0.4)]">
                <Cpu className="w-8 h-8 text-[#40B4F5] animate-pulse" />
                <div className="absolute -top-1 -left-1 w-2 h-2 bg-white" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-white" />
                <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white" />
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-white" />
              </div>
            </div>

            {/* Text Labels matching specification */}
            <div className="space-y-2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161C25] border border-[#515963] text-[#40B4F5] text-xs font-bold tracking-widest uppercase">
                <Sparkles className="w-3.5 h-3.5 text-[#40B4F5]" />
                <span>02 // DIGITAL SYNTHESIS</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
                GENERATING YOUR GENESIS PASS...
              </h3>

              <p className="text-xs text-[#8A95A3] max-w-sm mx-auto">
                Compiling cryptographic attendee vectors &amp; 1080×1440 HD layout
              </p>
            </div>

            {/* Thin Electric-Blue Animated Progress Bar */}
            <div className="max-w-md mx-auto relative z-10 pt-2">
              <div className="w-full h-1.5 bg-[#161C25] border border-[#515963] overflow-hidden p-0.5">
                <div className="h-full bg-gradient-to-r from-[#40B4F5] to-[#55C5FF] anim-progress-bar shadow-[0_0_10px_#40B4F5]" />
              </div>
              <div className="flex justify-between items-center text-[10px] text-[#8A95A3] mt-2">
                <span>BUFFER: ALLOCATING MEMORY</span>
                <span className="text-[#40B4F5]">PROCESSING</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==============================================================
            SCENE 2 & 3: DIGITAL CARD ASSEMBLY & LIGHT SWEEP REVEAL
            ============================================================== */}
        {stage === 'revealing' && (
          <motion.div
            key="scene-revealing"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="w-full cinematic-stage flex flex-col items-center justify-center relative"
          >
            {/* Header Status */}
            <div className="text-center mb-6 space-y-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-xs font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(64,180,245,0.3)]">
                <ShieldCheck className="w-4 h-4 text-[#40B4F5]" />
                <span>ASSEMBLING DIGITAL IDENTITY</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-wider uppercase">
                SYNTHESIZING PASS BLUEPRINT...
              </h3>
            </div>

            {/* 3D Animated Card Frame (Aspect Ratio 3:4) */}
            <div
              className={`cinematic-card-3d w-full max-w-[380px] sm:max-w-[420px] aspect-[3/4] bg-[#161C25] border-2 border-[#40B4F5] p-5 sm:p-6 relative overflow-hidden shadow-[0_0_35px_rgba(64,180,245,0.3)] flex flex-col justify-between ${
                assemblySubstep === 'light_sweep' ? 'anim-border-glow' : ''
              }`}
              style={{
                transform:
                  assemblySubstep === 'wireframe'
                    ? 'rotateY(-12deg) rotateX(6deg) scale(0.95)'
                    : assemblySubstep === 'fading_content'
                    ? 'rotateY(-5deg) rotateX(2deg) scale(0.98)'
                    : 'rotateY(0deg) rotateX(0deg) scale(1)',
              }}
            >
              {/* Technical Blueprint Grid Background */}
              <div className="assembly-grid-pattern absolute inset-0 opacity-40 pointer-events-none" />

              {/* Glowing Corner Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#40B4F5]" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#40B4F5]" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#40B4F5]" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#40B4F5]" />

              {/* Light Sweep Beam (Scene 3) */}
              {assemblySubstep === 'light_sweep' && (
                <div
                  className="absolute -inset-x-20 inset-y-0 h-48 bg-gradient-to-b from-transparent via-[#40B4F5]/45 to-transparent pointer-events-none anim-light-sweep z-30"
                  style={{ transform: 'rotate(-15deg)' }}
                />
              )}

              {/* Card Header Blueprint Wireframe */}
              <div className="relative z-10 border-b border-[#515963]/50 pb-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-[#40B4F5] tracking-widest font-bold">AWS STUDENT BUILDER GROUP</div>
                  <div className="text-[9px] text-[#8A95A3]">{collegeName}</div>
                </div>
                <div className="w-7 h-7 bg-[#1B222C] border border-[#40B4F5] flex items-center justify-center">
                  <span className="w-2.5 h-2.5 bg-[#40B4F5]" />
                </div>
              </div>

              {/* Card Middle: Photo & Name Reveal */}
              <div className="relative z-10 my-auto text-center space-y-4">
                {/* Photo Frame */}
                <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 border-2 border-[#40B4F5] bg-black/70 flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(64,180,245,0.35)]">
                  {studentPhoto ? (
                    <motion.img
                      src={studentPhoto}
                      alt="Attendee Portrait"
                      className="w-full h-full object-cover"
                      initial={{ opacity: 0, scale: 1.15, filter: 'blur(4px)' }}
                      animate={{
                        opacity: assemblySubstep !== 'wireframe' ? 1 : 0.2,
                        scale: assemblySubstep !== 'wireframe' ? 1 : 1.15,
                        filter: assemblySubstep !== 'wireframe' ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  ) : (
                    <div className="text-[10px] text-[#8A95A3]">PHOTO SCAN</div>
                  )}

                  {/* Corner Crosshairs */}
                  <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-white" />
                  <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-white" />
                  <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-white" />
                  <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-white" />
                </div>

                {/* Attendee Name Reveal */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: assemblySubstep !== 'wireframe' ? 1 : 0,
                    y: assemblySubstep !== 'wireframe' ? 0 : 10,
                  }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="space-y-1"
                >
                  <div className="text-[10px] text-[#8A95A3] tracking-widest uppercase">OFFICIAL ATTENDEE</div>
                  <h4 className="text-lg sm:text-xl font-black text-white tracking-wider truncate px-4 drop-shadow-[0_0_12px_rgba(64,180,245,0.5)]">
                    {displayName}
                  </h4>
                </motion.div>
              </div>

              {/* Card Footer Blueprint Details */}
              <div className="relative z-10 border-t border-[#515963]/50 pt-3 flex items-center justify-between text-[10px] text-[#8A95A3]">
                <div>
                  <div className="text-white font-bold">GENESIS 2026</div>
                  <div className="text-[#40B4F5] text-[9px]">DISCOVER AWS. UNLOCK THE CLOUD.</div>
                </div>
                <div className="text-right">
                  <div className="text-[#C4CBD3]">1080×1440 HD</div>
                  <div className="text-[#40B4F5] text-[9px] font-bold">VERIFIED BADGE</div>
                </div>
              </div>

            </div>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
};

export default CinematicPassAssembly;
