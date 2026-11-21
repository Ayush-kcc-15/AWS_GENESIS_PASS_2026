import React, { useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { PassProvider } from './context/PassContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { MinimalHeader } from './components/MinimalHeader';
import { ElectricBlueBrandingStrip } from './components/ElectricBlueBrandingStrip';
import { SinglePagePassApp } from './pages/SinglePagePassApp';
import { IntroLoader } from './components/IntroLoader';
import { FloatingBackground } from './components/FloatingBackground';

export const App: React.FC = () => {
  const [showIntro, setShowIntro] = useState<boolean>(true);
  const [isIntroTransitioning, setIsIntroTransitioning] = useState<boolean>(false);

  const handleTransitionStart = useCallback(() => {
    setIsIntroTransitioning(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsIntroTransitioning(true);
    setShowIntro(false);
  }, []);

  // Smooth scroll progress tracking
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ErrorBoundary>
      <PassProvider>
        {/* Electric-Blue Scroll Progress Indicator (Pinned to top edge) */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-[3.5px] bg-[#40B4F5] origin-left z-50 pointer-events-none shadow-[0_0_14px_#40B4F5]"
          style={{ scaleX }}
          aria-hidden="true"
        />

        {/* Global Continuous Environment: Grid (Layers 1 & 2) + Floating Microchips (Layer 3) */}
        <div
          className="fixed inset-0 bg-[#161C25] aws-reference-grid pointer-events-none z-0"
          aria-hidden="true"
        />
        <FloatingBackground />

        {/* Cinematic AWS SBG Logo Reveal Intro Loader (Layer 4, active during intro) */}
        {showIntro && (
          <IntroLoader
            onTransitionStart={handleTransitionStart}
            onComplete={handleComplete}
          />
        )}

        {/* Main Website Application Content (Layer 4, reveals smoothly on transition) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{
            opacity: !showIntro || isIntroTransitioning ? 1 : 0,
            y: !showIntro || isIntroTransitioning ? 0 : 16,
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={`relative min-h-screen text-white selection:bg-[#40B4F5] selection:text-[#15212C] overflow-x-hidden font-sans flex flex-col justify-between z-10 ${
            showIntro && !isIntroTransitioning ? 'pointer-events-none' : ''
          }`}
        >
          {/* Minimal Brand Header */}
          <MinimalHeader />

          {/* Central Pass Generator Application */}
          <main className="relative z-10 flex-grow">
            <SinglePagePassApp />
          </main>

          {/* Docked Electric Blue Branding Strip */}
          <ElectricBlueBrandingStrip />
        </motion.div>
      </PassProvider>
    </ErrorBoundary>
  );
};

export default App;
