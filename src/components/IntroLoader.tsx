import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import '../styles/IntroLoader.css';

interface IntroLoaderProps {
  onComplete: () => void;
  onTransitionStart?: () => void;
}

type CyberScene = 'grid' | 'scanning' | 'revealed' | 'branding' | 'hold' | 'fadeout';

// Subtle glowing grid coordinate points for Scene 1
const GRID_POINTS = [
  { id: 1, x: '25%', y: '30%', delay: 0.1 },
  { id: 2, x: '75%', y: '28%', delay: 0.25 },
  { id: 3, x: '20%', y: '70%', delay: 0.15 },
  { id: 4, x: '80%', y: '68%', delay: 0.3 },
  { id: 5, x: '50%', y: '18%', delay: 0.2 },
  { id: 6, x: '50%', y: '82%', delay: 0.35 },
];

export const IntroLoader: React.FC<IntroLoaderProps> = ({ onComplete, onTransitionStart }) => {
  const [scene, setScene] = useState<CyberScene>('grid');
  const [isSkipped, setIsSkipped] = useState<boolean>(false);
  const hasCompletedRef = useRef<boolean>(false);
  const hasStartedTransitionRef = useRef<boolean>(false);

  // Keep latest callback refs so parent re-renders never interrupt the intro sequence
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;
  const onTransitionStartRef = useRef(onTransitionStart);
  onTransitionStartRef.current = onTransitionStart;

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setScene('revealed');
      const timer = setTimeout(() => {
        handleSkip();
      }, 400);
      return () => clearTimeout(timer);
    }

    // Sequence timing (Total duration ~ 4.4s):
    // 0.0s - 0.6s: SCENE 1 - Dark Grid & illuminating electric-blue points
    // 0.6s - 1.5s: SCENE 2 - Digital Scanning line travels down & circuits illuminate
    // 1.5s - 2.5s: SCENE 3 - Logo revealed with subtle electric-blue glow
    // 2.5s - 3.4s: SCENE 4 - Branding reveals: AWS SBG, KCC ITM, GENESIS 2026
    // 3.4s - 3.7s: FINAL HOLD - Hold the final loader frame briefly (300ms)
    // 3.7s - 4.4s: FADE-OUT - Smooth 700ms opacity & scale dissolution; homepage reveals simultaneously (800ms)
    // 4.4s: UNMOUNT - Complete loader unmount callback
    const tScan = setTimeout(() => setScene('scanning'), 600);
    const tReveal = setTimeout(() => setScene('revealed'), 1500);
    const tBrand = setTimeout(() => setScene('branding'), 2500);
    const tHold = setTimeout(() => setScene('hold'), 3400);

    const tFadeOut = setTimeout(() => {
      if (!hasStartedTransitionRef.current) {
        hasStartedTransitionRef.current = true;
        setScene('fadeout');
        onTransitionStartRef.current?.();
      }
    }, 3700);

    const tComplete = setTimeout(() => {
      if (!hasCompletedRef.current) {
        hasCompletedRef.current = true;
        onCompleteRef.current?.();
      }
    }, 4400);

    const allTimers = [tScan, tReveal, tBrand, tHold, tFadeOut, tComplete];

    // Keyboard shortcut to skip intro immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      allTimers.forEach((t) => clearTimeout(t));
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); // Strictly empty dependency array so parent re-renders never interrupt the intro sequence!

  const handleSkip = () => {
    if (hasCompletedRef.current) return;

    if (!hasStartedTransitionRef.current) {
      hasStartedTransitionRef.current = true;
      setIsSkipped(true);
      setScene('fadeout');
      onTransitionStartRef.current?.();

      setTimeout(() => {
        if (!hasCompletedRef.current) {
          hasCompletedRef.current = true;
          onCompleteRef.current?.();
        }
      }, 350);
    }
  };

  const isScanningOrLater = scene !== 'grid';
  const isRevealedOrLater =
    scene === 'revealed' || scene === 'branding' || scene === 'hold' || scene === 'fadeout';
  const isBrandingOrLater =
    scene === 'branding' || scene === 'hold' || scene === 'fadeout';

  return (
    <motion.div
      key="cyber-intro-overlay"
      initial={{ opacity: 1, scale: 1 }}
      animate={{
        opacity: scene === 'fadeout' ? 0 : 1,
        scale: scene === 'fadeout' ? 1.02 : 1,
      }}
      transition={{
        duration: scene === 'fadeout' ? (isSkipped ? 0.35 : 0.7) : 0.4,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="cyber-loader-root"
      style={{
        pointerEvents: scene === 'fadeout' ? 'none' : 'auto',
      }}
      role="dialog"
      aria-label="Genesis 2026 Cyber Scan Reveal"
    >
      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="cyber-skip-btn"
        title="Press ESC or Click to Skip"
      >
        SKIP [ESC]
      </button>

      {/* ==============================================================
          SCENE 1: Subtle Gray Grid & Point Illuminations
          ============================================================== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scene === 'fadeout' ? 0 : 0.35 }}
        transition={{ duration: 0.5 }}
        className="cyber-grid-background"
      />

      {/* Illuminating Electric-Blue Grid Coordinate Nodes */}
      {GRID_POINTS.map((pt) => (
        <motion.div
          key={pt.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: scene === 'fadeout' ? 0 : [0, 0.8, 0.3],
            scale: [0, 1.4, 1],
          }}
          transition={{
            duration: 1.2,
            delay: pt.delay,
            repeat: scene === 'fadeout' ? 0 : Infinity,
            repeatType: 'reverse',
          }}
          style={{
            position: 'absolute',
            left: pt.x,
            top: pt.y,
            width: 4,
            height: 4,
            backgroundColor: '#40B4F5',
            borderRadius: '50%',
            boxShadow: '0 0 8px #40B4F5',
            pointerEvents: 'none',
            zIndex: 2,
          }}
        />
      ))}

      {/* Central Soft Radial Electric-Blue Glow */}
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{
          scale: isRevealedOrLater ? 1.25 : isScanningOrLater ? 0.95 : 0.7,
          opacity:
            scene === 'fadeout'
              ? 0
              : isRevealedOrLater
              ? 0.45
              : isScanningOrLater
              ? 0.3
              : 0.15,
        }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="cyber-ambient-glow"
      />

      {/* ==============================================================
          CENTRAL CYBER STAGE
          ============================================================== */}
      <div className="cyber-stage">

        {/* Central Scanning Frame / Logo Box */}
        <div className="cyber-logo-container">

          {/* Geometric Corner Brackets */}
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isScanningOrLater ? 1 : 0.4,
              scale: isScanningOrLater ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="cyber-bracket cyber-bracket-tl"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isScanningOrLater ? 1 : 0.4,
              scale: isScanningOrLater ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="cyber-bracket cyber-bracket-tr"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isScanningOrLater ? 1 : 0.4,
              scale: isScanningOrLater ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="cyber-bracket cyber-bracket-bl"
          />
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{
              opacity: isScanningOrLater ? 1 : 0.4,
              scale: isScanningOrLater ? 1 : 0.8,
            }}
            transition={{ duration: 0.4 }}
            className="cyber-bracket cyber-bracket-br"
          />

          {/* Circuit Trace Details on Horizontal Sides */}
          {isScanningOrLater && (
            <>
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.75 }}
                transition={{ duration: 0.5 }}
                className="absolute -left-12 top-1/2 -translate-y-1/2 w-10 h-px bg-gradient-to-r from-transparent to-[#40B4F5] pointer-events-none hidden sm:block"
              />
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.75 }}
                transition={{ duration: 0.5 }}
                className="absolute -right-12 top-1/2 -translate-y-1/2 w-10 h-px bg-gradient-to-l from-transparent to-[#40B4F5] pointer-events-none hidden sm:block"
              />
            </>
          )}

          {/* ==========================================================
              SCENE 2 & 3: DIGITAL SCANLINE & LOGO MASK REVEAL
              Smooth laser scanline passes top-to-bottom over the logo.
              Logo reveals cleanly behind the line with clip-path.
              ========================================================== */}
          <div className="relative w-full h-full overflow-hidden flex items-center justify-center">

            {/* The Unadulterated, Authentic AWS SBG Logo */}
            <motion.div
              initial={{ clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }}
              animate={
                scene === 'grid'
                  ? { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0 }
                  : scene === 'scanning'
                  ? {
                      clipPath: ['inset(0% 0% 100% 0%)', 'inset(0% 0% 0% 0%)'],
                      opacity: 1,
                    }
                  : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }
              }
              transition={
                scene === 'scanning'
                  ? { duration: 0.9, ease: 'easeInOut' }
                  : { duration: 0.3 }
              }
              className="w-full h-full flex items-center justify-center"
            >
              <img
                src="/assets/aws-sbg-logo-transparent.png"
                alt="AWS Student Builder Group Logo"
                className="cyber-logo-img"
              />
            </motion.div>

            {/* The Electric-Blue Horizontal Scanline & Light Trail */}
            {scene === 'scanning' && (
              <motion.div
                initial={{ top: '-4px' }}
                animate={{ top: '100%' }}
                transition={{ duration: 0.9, ease: 'easeInOut' }}
                className="cyber-scanline"
              >
                <div className="cyber-scan-trail -top-12" />
              </motion.div>
            )}

          </div>

        </div>

        {/* Subtle Status Line below Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isScanningOrLater ? 0.7 : 0 }}
          transition={{ duration: 0.4 }}
          className="mt-4 font-mono text-[10px] tracking-[0.2em] text-[#8A95A3] flex items-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#40B4F5] animate-pulse" />
          <span>
            {scene === 'grid'
              ? 'INITIALIZING SCAN...'
              : scene === 'scanning'
              ? 'SYNCHRONIZING DIGITAL CHIP...'
              : 'SYSTEM VERIFIED // IDENTITY ONLINE'}
          </span>
        </motion.div>

        {/* ==============================================================
            SCENE 4: BRANDING REVEAL
            - AWS STUDENT BUILDER GROUP
            - KCC INSTITUTE OF TECHNOLOGY & MANAGEMENT
            - GENESIS 2026
            - DISCOVER AWS. UNLOCK THE CLOUD.
            ============================================================== */}
        <div className="mt-6 text-center space-y-3 min-h-[110px] flex flex-col items-center justify-center">
          {isBrandingOrLater && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1.5"
            >
              <p className="font-mono text-xs sm:text-sm font-bold tracking-[0.22em] text-[#40B4F5] uppercase">
                AWS STUDENT BUILDER GROUP
              </p>
              <p className="font-mono text-[11px] sm:text-xs tracking-wider text-[#C4CBD3] uppercase">
                KCC INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT
              </p>
            </motion.div>
          )}

          {isBrandingOrLater && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1 space-y-1"
            >
              <h2 className="font-mono font-black text-2xl sm:text-3xl text-white tracking-widest uppercase">
                GENESIS 2026
              </h2>
              <p className="font-mono text-[10px] sm:text-xs text-[#8A95A3] tracking-[0.18em] uppercase">
                DISCOVER AWS. UNLOCK THE CLOUD.
              </p>
            </motion.div>
          )}
        </div>

      </div>

    </motion.div>
  );
};
