import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  User,
  GraduationCap,
  Download,
  Loader2,
  CheckCircle2,
  RotateCcw,
  Smartphone,
  X,
  AlertCircle,
  ArrowRight,
  ArrowDown,
  Edit3,
  Cpu,
  ShieldCheck,
  Share2,
  Sparkles,
} from 'lucide-react';
import { usePass } from '../context/PassContext';
import { GenesisPass } from '../components/GenesisPass';
import { PhotoUploadArea } from '../components/PhotoUploadArea';
import { SocialSharingSection, SocialSharingHandle } from '../components/SocialSharingSection';
import { CinematicPassAssembly } from '../components/CinematicPassAssembly';
import { downloadGenesisPass } from '../utils/downloadPass';
import { eventConfig } from '../data/eventConfig';

export type PassGenState = 'form' | 'validating' | 'generating' | 'revealing' | 'generated';

const HIGHLIGHT_OPTIONS = [
  'Explored the world of AWS.',
  'Discovered cloud computing opportunities.',
  'Connected with fellow tech enthusiasts.',
  'Started my cloud journey.',
  'Inspired to build something new.',
];

export const SinglePagePassApp: React.FC = () => {
  const { passData, updatePassData, resetPassData, errors, setErrors } = usePass();
  const passRef = useRef<HTMLDivElement>(null);
  const successSectionRef = useRef<HTMLDivElement>(null);
  const generatorRef = useRef<HTMLDivElement>(null);
  const socialSharingRef = useRef<SocialSharingHandle>(null);

  // State Machine for the cinematic generation experience:
  // 'form' -> 'validating' -> 'generating' -> 'revealing' -> 'generated'
  const [genState, setGenState] = useState<PassGenState>('form');
  const [downloadState, setDownloadState] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [downloadErrorMessage, setDownloadErrorMessage] = useState<string>('');
  const [downloadedDataUrl, setDownloadedDataUrl] = useState<string | null>(null);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);

  // Scroll tracking for gentle hero depth & parallax
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 450], [0, -35]);
  const heroOpacity = useTransform(scrollY, [0, 400], [1, 0.55]);

  // Smooth scroll to the pass generator section
  const scrollToGenerator = () => {
    if (generatorRef.current) {
      generatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Student display info
  const studentName = passData.fullName.trim() ? passData.fullName.trim() : 'AYUSH KUMAR';
  const studentPhoto = passData.croppedPhotoUrl || null;

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val.length <= 40) {
      updatePassData({ fullName: val });
      if (val.trim().length > 0) {
        setErrors((prev) => {
          const rest = { ...prev };
          delete rest.fullName;
          return rest;
        });
      }
    }
  };

  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePassData({ collegeName: e.target.value });
  };

  // Submit handler: validates and starts the cinematic animation sequence
  const handleGeneratePass = (e: React.FormEvent) => {
    e.preventDefault();

    if (genState === 'generating' || genState === 'revealing') return;

    setGenState('validating');
    const newErrors: Record<string, string> = {};

    if (!passData.fullName.trim()) {
      newErrors.fullName = 'Please enter your Full Name.';
    }
    if (!passData.croppedPhotoUrl) {
      newErrors.photo = 'Please upload your photograph to generate your Experience Card.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setGenState('form');
      return;
    }

    updatePassData({ fullName: passData.fullName.trim() });

    // Scene 1: Start 'generating' (circuit lines & converging nodes, 750ms)
    setGenState('generating');
    scrollToGenerator();

    setTimeout(() => {
      // Scene 2 & 3: Digital card assembly & light sweep (~1750ms)
      setGenState('revealing');
    }, 750);
  };

  // Transition back to form preserving previously entered name, college and cropped photo
  const handleEditDetails = () => {
    setGenState('form');
    setTimeout(() => {
      if (generatorRef.current) {
        generatorRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  // High-Resolution PNG Export (1080 x 1440)
  const handleDownload = async (): Promise<string | null> => {
    if (downloadState === 'generating') return null;
    if (!passRef.current) {
      setDownloadState('error');
      setDownloadErrorMessage('Experience Card visual component not found.');
      return null;
    }

    try {
      setDownloadState('generating');
      setDownloadErrorMessage('');

      const result = await downloadGenesisPass({
        passElement: passRef.current,
        studentName: passData.fullName.trim() || 'ATTENDEE',
        targetWidth: 1080,
        targetHeight: 1440,
      });

      if (result.success && result.dataUrl) {
        setDownloadState('success');
        setDownloadedDataUrl(result.dataUrl);

        if (result.isMobileSaveRequired) {
          setShowMobileModal(true);
        }

        setTimeout(() => {
          setDownloadState((prev) => (prev === 'success' ? 'idle' : prev));
        }, 6000);

        return result.dataUrl;
      } else {
        setDownloadState('error');
        setDownloadErrorMessage(result.error || 'Failed to generate PNG image. Please try again.');
        return null;
      }
    } catch (err) {
      setDownloadState('error');
      setDownloadErrorMessage(
        err instanceof Error ? err.message : 'An error occurred during Experience Card export.'
      );
      return null;
    }
  };

  // Full reset
  const handleReset = () => {
    resetPassData();
    setGenState('form');
    setDownloadedDataUrl(null);
    setDownloadState('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="px-4 sm:px-8 max-w-7xl mx-auto">

      {/* ==============================================================
          1. CAMPAIGN HERO SCREEN (Unified Architectural Presentation)
          ============================================================== */}
      <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center py-2 sm:py-3 lg:py-4">
        <motion.section
          style={{ y: heroY, opacity: heroOpacity }}
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="w-full bg-[#1B222C] border border-[#515963] shadow-2xl relative overflow-hidden"
        >
          {/* Subtle Background Glow Trace */}
          <div className="absolute -right-24 -top-24 w-96 h-96 bg-[#40B4F5]/10 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-[#40B4F5]/8 rounded-full blur-[80px] pointer-events-none" />

          {/* Top Technical Metadata Bar */}
          <div className="flex items-center justify-between px-6 sm:px-8 py-2.5 sm:py-3 border-b border-[#515963]/50 bg-[#161C25]/90 font-mono text-[11px] text-[#8A95A3] relative z-10">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#40B4F5] animate-pulse shadow-[0_0_8px_#40B4F5]" />
              <span className="text-white font-bold tracking-wider">GENESIS 2026 // GENESIS EXPERIENCE CARD</span>
            </div>
            <div className="hidden sm:flex items-center gap-3">
              <span className="text-[#C4CBD3]">OFFICIAL IDENTITY ENGINE</span>
              <span className="h-3 w-px bg-[#515963]" />
              <span className="text-[#40B4F5] font-semibold">1080×1440 HD</span>
            </div>
          </div>

          {/* Architectural Split: Left Campaign Typography & Right Emblem Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch relative z-10">

            {/* Left Column (7 cols): Campaign Messaging & Primary CTA */}
            <div className="lg:col-span-7 p-5 sm:p-8 lg:p-10 flex flex-col justify-center space-y-4">

              {/* Main Heading: GET YOUR EXPERIENCE CARD. */}
              <div className="space-y-1">
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-mono font-black tracking-tight text-white leading-[1.08]">
                  GET YOUR<br />
                  <span className="text-[#40B4F5] drop-shadow-[0_0_24px_rgba(64,180,245,0.4)]">
                    EXPERIENCE CARD.
                  </span>
                </h1>
              </div>

              {/* Supporting Heading */}
              <p className="text-sm sm:text-lg lg:text-xl font-mono font-bold text-white tracking-tight">
                Your card. Your identity. Your GENESIS moment.
              </p>

              {/* Description */}
              <p className="text-xs sm:text-sm font-mono text-[#C4CBD3] leading-relaxed max-w-xl">
                Create your personalized GENESIS EXPERIENCE CARD, share it on LinkedIn and social media, and let everyone know you&apos;re part of the celebration!
              </p>

              {/* Primary Call to Action Button */}
              <div className="pt-1 flex flex-col items-start space-y-2">
                <button
                  type="button"
                  onClick={scrollToGenerator}
                  className="px-7 py-3.5 sm:px-8 sm:py-4 bg-[#40B4F5] text-[#15212C] font-mono font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center gap-3 hover:bg-[#55C5FF] hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(64,180,245,0.5)] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                >
                  <span>CREATE MY EXPERIENCE CARD</span>
                  <ArrowDown className="w-4 h-4 text-[#15212C]" />
                </button>
                <span className="font-mono text-[11px] text-[#8A95A3] tracking-wide">
                  Personalize it. Download it. Share the excitement.
                </span>
              </div>

            </div>

            {/* Right Column (5 cols): Authentic AWS SBG Emblem Showcase */}
            <div className="lg:col-span-5 p-5 sm:p-8 lg:p-10 flex items-center justify-center bg-[#161C25]/60 border-t lg:border-t-0 lg:border-l border-[#515963]/50 relative">
              <div className="relative w-full max-w-[320px] aspect-square bg-[#161C25] border border-[#515963] p-5 sm:p-6 flex flex-col items-center justify-between shadow-[0_0_30px_rgba(64,180,245,0.12)]">
                <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#40B4F5]" />
                <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#40B4F5]" />
                <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#40B4F5]" />
                <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#40B4F5]" />

                <div className="w-full flex items-center justify-between text-[10px] font-mono text-[#8A95A3] border-b border-[#515963]/40 pb-2">
                  <span className="text-[#40B4F5] font-bold">AWS SBG // VERIFIED</span>
                  <span>1080×1440</span>
                </div>

                <div className="my-auto py-3 sm:py-4 flex flex-col items-center justify-center">
                  <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center">
                    <div className="absolute inset-0 bg-[#40B4F5]/10 rounded-full blur-xl animate-pulse" />
                    <img
                      src="/assets/aws-sbg-logo-transparent.png"
                      alt="AWS Student Builder Group Logo"
                      className="w-full h-full object-contain relative z-10 drop-shadow-[0_0_18px_rgba(64,180,245,0.45)]"
                    />
                  </div>
                </div>

                <div className="w-full pt-2 border-t border-[#515963]/40 text-center font-mono text-[10px] text-[#8A95A3]">
                  <div className="text-white font-bold">AWS STUDENT BUILDER GROUP</div>
                  <div className="text-[#40B4F5] text-[9px]">KCC INSTITUTE OF TECHNOLOGY &amp; MANAGEMENT</div>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Docked Scroll Beacon Bar */}
          <div className="border-t border-[#515963]/50 bg-[#161C25]/80 py-3 px-6 flex items-center justify-center relative z-10">
            <button
              type="button"
              onClick={scrollToGenerator}
              className="group/scroll flex items-center gap-3 text-center cursor-pointer transition-all hover:-translate-y-0.5"
            >
              <div className="relative w-5 h-8 rounded-full border-2 border-[#40B4F5]/80 bg-[#161C25] flex items-start justify-center p-1 shadow-[0_0_12px_rgba(64,180,245,0.35)] group-hover/scroll:border-[#40B4F5] group-hover/scroll:shadow-[0_0_18px_rgba(64,180,245,0.6)] transition-all">
                <motion.div
                  animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="w-1 h-2 bg-[#40B4F5] rounded-full shadow-[0_0_6px_#40B4F5]"
                />
              </div>

              <span className="font-mono text-xs font-bold text-[#C4CBD3] group-hover/scroll:text-[#40B4F5] tracking-[0.22em] uppercase transition-colors">
                SCROLL TO CREATE YOUR EXPERIENCE CARD
              </span>

              <motion.div
                animate={{ y: [0, 4, 0], opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                className="text-[#40B4F5]"
              >
                <ArrowDown className="w-4 h-4 text-[#40B4F5] drop-shadow-[0_0_6px_#40B4F5]" />
              </motion.div>
            </button>
          </div>

        </motion.section>
      </div>

      {/* ==============================================================
          2. PASS GENERATOR SECTION WORKSPACE
          ============================================================== */}
      <div ref={generatorRef} className="min-h-screen pt-8 pb-16 space-y-8 scroll-mt-6 font-mono flex flex-col justify-start">

        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="border-b border-[#515963]/50 pb-4 flex flex-col sm:flex-row sm:items-end justify-between gap-3"
        >
          <div>
            <span className="text-xs font-bold text-[#40B4F5] tracking-[0.2em] uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-[#40B4F5]" />
              01 // PERSONALIZE YOUR EXPERIENCE CARD
            </span>
            <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight uppercase mt-1">
              YOUR GENESIS MOMENT STARTS HERE.
            </h2>
            <p className="text-xs sm:text-sm text-[#C4CBD3] mt-1 max-w-2xl">
              Add your details, upload your photo, and create your personalized Experience Card in seconds.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[11px] text-[#8A95A3] pb-1">
            <span className="w-2 h-2 rounded-full bg-[#40B4F5] animate-pulse" />
            <span>LIVE 1080×1440 ENGINE</span>
          </div>
        </motion.div>

        {/* ==============================================================
            STATE A: BEFORE GENERATION ('form' STATE)
            Two-Column Workspace: Left Form & Right Blueprint Console
            ============================================================== */}
        {genState === 'form' && (
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* LEFT COLUMN: Personalization Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <form
                onSubmit={handleGeneratePass}
                className="p-6 sm:p-8 bg-[#1B222C] border border-[#515963] space-y-6 hover:border-[#40B4F5]/40 transition-colors duration-300 shadow-2xl"
              >
                {/* Form Header */}
                <div className="flex items-center justify-between border-b border-[#515963]/50 pb-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-wider uppercase flex items-center gap-2">
                      <span className="w-2 h-2 bg-[#40B4F5]" />
                      <span>ATTENDEE DETAILS</span>
                    </h3>
                    <p className="text-xs text-[#8A95A3] mt-0.5">
                      No Login Required • Direct Image Generation
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-2.5 py-1 bg-[#161C25] border border-[#515963] text-xs text-[#C4CBD3] hover:text-white hover:border-[#40B4F5] transition-all flex items-center gap-1.5 cursor-pointer hover:-translate-y-0.5 active:scale-95"
                    title="Reset form"
                  >
                    <RotateCcw className="w-3 h-3 text-[#40B4F5]" />
                    <span>Reset</span>
                  </button>
                </div>

                {/* Field 1: Full Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="fullName"
                      className="text-xs font-bold tracking-wider text-[#C4CBD3] uppercase flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#40B4F5]" />
                      <span>Full Name <span className="text-[#40B4F5]">*</span></span>
                    </label>
                    <span className="text-[10px] text-[#8A95A3]">
                      {passData.fullName.length}/40
                    </span>
                  </div>

                  <input
                    id="fullName"
                    type="text"
                    value={passData.fullName}
                    onChange={handleNameChange}
                    placeholder="e.g. AYUSH KUMAR"
                    maxLength={40}
                    className={`w-full px-4 py-3 bg-[#161C25] border text-white placeholder-[#515963] text-sm font-bold uppercase tracking-wider focus:outline-none transition-colors ${
                      errors.fullName
                        ? 'border-red-500 focus:border-red-400'
                        : 'border-[#515963] focus:border-[#40B4F5]'
                    }`}
                  />

                  {errors.fullName ? (
                    <div className="flex items-center gap-1.5 text-xs text-red-400">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </div>
                  ) : (
                    <p className="text-[10px] text-[#8A95A3]">
                      Rendered boldly across the center of your official Experience Card
                    </p>
                  )}
                </div>

                {/* Field 2: College / Institution Name */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="collegeName"
                      className="text-xs font-bold tracking-wider text-[#C4CBD3] uppercase flex items-center gap-1.5"
                    >
                      <GraduationCap className="w-3.5 h-3.5 text-[#40B4F5]" />
                      <span>College / Institution Name</span>
                    </label>
                    <span className="text-[10px] text-[#40B4F5] flex items-center gap-1 font-semibold">
                      <span>Host: KCC ITM</span>
                    </span>
                  </div>

                  <input
                    id="collegeName"
                    type="text"
                    value={passData.collegeName}
                    onChange={handleCollegeChange}
                    placeholder="e.g. KCC Institute of Technology & Management"
                    maxLength={60}
                    className="w-full px-4 py-3 bg-[#161C25] border border-[#515963] focus:border-[#40B4F5] text-white placeholder-[#515963] text-sm font-medium focus:outline-none transition-colors"
                  />
                  <p className="text-[10px] text-[#8A95A3]">
                    Official host institution: KCC Institute of Technology &amp; Management, Greater Noida
                  </p>
                </div>

                {/* Field 3: My GENESIS Highlight (Selectable + Custom) */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="highlightInput"
                      className="text-xs font-bold tracking-wider text-[#C4CBD3] uppercase flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#40B4F5]" />
                      <span>My GENESIS Highlight</span>
                    </label>
                    <span className="text-[10px] text-[#8A95A3]">
                      {(passData.highlight || '').length}/75
                    </span>
                  </div>

                  {/* Quick-Select Preset Pills */}
                  <div className="flex flex-wrap gap-1.5">
                    {HIGHLIGHT_OPTIONS.map((option) => {
                      const isSelected = passData.highlight === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updatePassData({ highlight: option })}
                          className={`px-2.5 py-1 text-[10px] font-medium border transition-all cursor-pointer text-left ${
                            isSelected
                              ? 'bg-[#40B4F5]/15 border-[#40B4F5] text-[#40B4F5] font-bold shadow-[0_0_10px_rgba(64,180,245,0.2)]'
                              : 'bg-[#161C25] border-[#515963]/70 text-[#A0AEC0] hover:border-[#40B4F5]/60 hover:text-white'
                          }`}
                        >
                          {option}
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Short Message Input */}
                  <input
                    id="highlightInput"
                    type="text"
                    value={passData.highlight}
                    onChange={(e) => {
                      if (e.target.value.length <= 75) {
                        updatePassData({ highlight: e.target.value });
                      }
                    }}
                    placeholder="Or write your own short GENESIS highlight..."
                    maxLength={75}
                    className="w-full px-3.5 py-2.5 bg-[#161C25] border border-[#515963] focus:border-[#40B4F5] text-white placeholder-[#515963] text-xs font-medium focus:outline-none transition-colors"
                  />
                </div>

                {/* Field 4: Photo Upload & Crop Area */}
                <div>
                  <PhotoUploadArea />
                </div>

                {/* Prominent Action Button: GENERATE EXPERIENCE CARD → */}
                <div className="pt-2 border-t border-[#515963]/50">
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#40B4F5] text-[#15212C] font-extrabold text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 hover:bg-[#55C5FF] hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(64,180,245,0.45)] active:scale-[0.98] transition-all cursor-pointer shadow-lg"
                  >
                    <span>GENERATE EXPERIENCE CARD</span>
                    <ArrowRight className="w-5 h-5 text-[#15212C]" />
                  </button>

                  <p className="text-[11px] text-center text-[#8A95A3] mt-2.5">
                    Click to assemble your official 1080 × 1440 GENESIS Experience Card
                  </p>
                </div>
              </form>
            </motion.div>

            {/* RIGHT COLUMN: Technical Blueprint Specification Console */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col items-center relative"
            >
              <div className="w-full max-w-[460px] p-5 sm:p-6 bg-[#1B222C] border border-[#515963] relative overflow-hidden group hover:border-[#40B4F5]/60 hover:shadow-[0_0_30px_rgba(64,180,245,0.2)] transition-all duration-300">
                
                {/* Console Top Header */}
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#515963]/50 text-xs">
                  <span className="text-[#40B4F5] font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#40B4F5] animate-pulse" />
                    EXPERIENCE CARD SPECIFICATION PORTAL
                  </span>
                  <span className="text-[#8A95A3] text-[10px] px-2 py-0.5 bg-[#161C25] border border-[#515963]">
                    3:4 • 1080×1440 HD
                  </span>
                </div>

                {/* Blueprint Card Frame (Exact 3:4 Aspect Ratio) */}
                <div className="relative w-full aspect-[3/4] bg-[#161C25] border-2 border-dashed border-[#515963] p-6 flex flex-col justify-between items-center text-center">
                  
                  {/* Subtle Blueprint Grid Background */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(81,89,99,0.2)_1px,transparent_1px),linear-gradient(to_bottom,rgba(81,89,99,0.2)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

                  {/* Corner Target Marks */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-[#40B4F5]" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-[#40B4F5]" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-[#40B4F5]" />
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-[#40B4F5]" />

                  {/* Top Bar Spec */}
                  <div className="w-full flex items-center justify-between text-[10px] text-[#8A95A3] relative z-10">
                    <span className="text-[#40B4F5] font-bold">AWS STUDENT BUILDER GROUP</span>
                    <span>GENESIS 2026</span>
                  </div>

                  {/* Center Blueprint Icon & Readiness Checklist */}
                  <div className="my-auto space-y-4 relative z-10 w-full max-w-xs">
                    {passData.croppedPhotoUrl ? (
                      <div className="w-24 h-24 mx-auto border-2 border-[#40B4F5] overflow-hidden bg-black shadow-[0_0_15px_rgba(64,180,245,0.3)]">
                        <img src={passData.croppedPhotoUrl} alt="Portrait" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-20 h-20 mx-auto bg-[#1B222C] border border-[#515963] flex flex-col items-center justify-center text-[#40B4F5]">
                        <Cpu className="w-8 h-8 text-[#40B4F5] animate-pulse" />
                        <span className="text-[9px] text-[#8A95A3] mt-1">PORTRAIT SLOT</span>
                      </div>
                    )}

                    <div className="space-y-1">
                      <div className="text-white font-bold text-sm tracking-wide truncate">
                        {passData.fullName.trim() ? passData.fullName.toUpperCase() : 'ATTENDEE NAME'}
                      </div>
                      <div className="text-[11px] text-[#8A95A3] truncate">
                        {passData.collegeName || 'KCC Institute of Technology & Management'}
                      </div>
                      <div className="text-[10px] text-[#40B4F5] italic truncate px-2">
                        &ldquo;{passData.highlight?.trim() || 'Explored the world of AWS.'}&rdquo;
                      </div>
                    </div>

                    {/* Readiness Checklist */}
                    <div className="p-3 bg-[#161C25]/90 border border-[#515963]/60 text-left space-y-1.5 text-[10px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#C4CBD3]">1. Full Name:</span>
                        <span className={passData.fullName.trim() ? 'text-[#40B4F5] font-bold' : 'text-amber-400'}>
                          {passData.fullName.trim() ? '✓ READY' : 'WAITING'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#C4CBD3]">2. Portrait Photo:</span>
                        <span className={passData.croppedPhotoUrl ? 'text-[#40B4F5] font-bold' : 'text-amber-400'}>
                          {passData.croppedPhotoUrl ? '✓ VERIFIED' : 'WAITING'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#C4CBD3]">3. Layout Resolution:</span>
                        <span className="text-[#40B4F5] font-bold">1080×1440 HD</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Console Note */}
                  <div className="w-full pt-2 border-t border-[#515963]/40 text-[10px] text-[#8A95A3] relative z-10 flex items-center justify-between">
                    <span>STATUS: STANDBY</span>
                    <span className="text-[#40B4F5] font-bold">READY TO ASSEMBLE</span>
                  </div>

                </div>

                <div className="mt-3 text-[11px] text-center text-[#8A95A3]">
                  Fill details and click <strong className="text-white">&quot;GENERATE EXPERIENCE CARD&quot;</strong> to trigger the cinematic reveal
                </div>

              </div>
            </motion.div>

          </section>
        )}

        {/* ==============================================================
            STATE B: CINEMATIC PASS GENERATION ANIMATION
            Scene 1 ('generating') & Scene 2/3 ('revealing')
            ============================================================== */}
        {(genState === 'generating' || genState === 'revealing') && (
          <div className="w-full py-6">
            <CinematicPassAssembly
              stage={genState}
              studentName={studentName}
              studentPhoto={studentPhoto}
              collegeName={passData.collegeName || eventConfig.brand.institution}
              onComplete={() => setGenState('generated')}
            />
          </div>
        )}

        {/* ==============================================================
            STATE C: FINAL PASS DISPLAY & ACTIONS ('generated' STATE)
            ============================================================== */}
        {genState === 'generated' && (
          <motion.div
            ref={successSectionRef}
            initial={{ opacity: 0, y: 25, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            {/* Header: EXPERIENCE CARD GENERATED SUCCESSFULLY! */}
            <div className="p-6 sm:p-8 bg-[#1B222C] border border-[#40B4F5] text-center space-y-3 shadow-[0_0_30px_rgba(64,180,245,0.25)] relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-[#40B4F5]/15 rounded-full blur-[60px] pointer-events-none" />

              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#161C25] border border-[#40B4F5] text-[#40B4F5] text-xs font-bold tracking-widest uppercase shadow-[0_0_12px_rgba(64,180,245,0.2)]">
                <CheckCircle2 className="w-4 h-4 text-[#40B4F5]" />
                <span>GENESIS 2026 // EXPERIENCE CARD READY</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase">
                EXPERIENCE CARD GENERATED SUCCESSFULLY!
              </h3>

              <p className="text-xs sm:text-sm text-[#C4CBD3] max-w-xl mx-auto">
                Your GENESIS Experience Card. Your identity. Your GENESIS moment.
              </p>
            </div>

            {/* Center Generated Experience Card Component */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-full max-w-[480px] p-4 sm:p-6 pass-preview-glassmorphic relative overflow-hidden group hover:border-[#40B4F5]/60 hover:shadow-[0_0_35px_rgba(64,180,245,0.3)] transition-all duration-500">
                
                {/* Header Badge */}
                <div className="w-full flex items-center justify-between pb-3 mb-3 border-b border-[#515963]/50 text-xs relative z-20">
                  <span className="text-[#40B4F5] font-bold flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#161C25]/80 border border-[#40B4F5]/35 shadow-[0_0_12px_rgba(64,180,245,0.2)]">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#40B4F5]" />
                    VERIFIED EXPERIENCE CARD
                  </span>
                  <span className="text-[#8A95A3] px-2 py-0.5 rounded bg-[#161C25]/60 border border-[#515963]/50 text-[10px]">
                    1080×1440 HD
                  </span>
                </div>

                {/* Master GenesisPass Component */}
                <div className="relative z-20">
                  <GenesisPass
                    ref={passRef}
                    studentName={studentName}
                    studentPhoto={studentPhoto}
                    collegeName={passData.collegeName || eventConfig.brand.institution}
                    highlight={passData.highlight}
                  />
                </div>

                {/* Footer Metadata */}
                <div className="mt-4 pt-3 border-t border-[#515963]/40 flex items-center justify-between text-[11px] text-[#8A95A3] relative z-20">
                  <span className="px-2 py-0.5 rounded bg-[#161C25]/60 border border-[#515963]/40">
                    GENESIS 2026 RECAP
                  </span>
                  <span className="text-[#40B4F5] px-2 py-0.5 rounded bg-[#40B4F5]/10 border border-[#40B4F5]/35 font-semibold">
                    MY EVENT EXPERIENCE
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Directly Below the Experience Card */}
            <div className="p-6 bg-[#1B222C] border border-[#515963] space-y-4 shadow-xl">
              <div className="text-center text-xs font-bold text-[#8A95A3] uppercase tracking-wider">
                Experience Card Actions &amp; Controls:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                
                {/* Button 1: Download Experience Card */}
                <button
                  onClick={handleDownload}
                  disabled={downloadState === 'generating'}
                  className={`w-full py-3.5 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] ${
                    downloadState === 'success'
                      ? 'bg-emerald-400 text-[#15212C] shadow-[0_0_20px_rgba(52,211,153,0.4)]'
                      : downloadState === 'generating'
                      ? 'bg-[#161C25] border border-[#515963] text-[#8A95A3] cursor-wait'
                      : 'bg-[#40B4F5] text-[#15212C] hover:bg-[#55C5FF] hover:shadow-[0_0_20px_rgba(64,180,245,0.45)]'
                  }`}
                >
                  {downloadState === 'generating' ? (
                    <>
                      <Loader2 className="w-4 h-4 text-[#40B4F5] animate-spin" />
                      <span>GENERATING PNG...</span>
                    </>
                  ) : downloadState === 'success' ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-[#15212C]" />
                      <span>DOWNLOAD COMPLETE!</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4 text-[#15212C]" />
                      <span>DOWNLOAD EXPERIENCE CARD</span>
                    </>
                  )}
                </button>

                {/* Button 2: Merged Share on Social Media */}
                <button
                  type="button"
                  onClick={() => {
                    const el = document.getElementById('social-sharing-hub');
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="w-full py-3.5 px-4 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-white hover:text-[#40B4F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Share2 className="w-4 h-4 text-[#40B4F5]" />
                  <span>SHARE ON SOCIAL MEDIA</span>
                </button>

                {/* Button 3: Edit My Details */}
                <button
                  type="button"
                  onClick={handleEditDetails}
                  className="w-full py-3.5 px-4 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-[#C4CBD3] hover:text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98]"
                >
                  <Edit3 className="w-4 h-4 text-[#40B4F5]" />
                  <span>EDIT MY DETAILS</span>
                </button>
              </div>

              {/* Generate Another Pass Button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-xs text-[#8A95A3] hover:text-white uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#40B4F5]" />
                  <span>GENERATE ANOTHER CARD</span>
                </button>
              </div>

              {downloadErrorMessage && (
                <p className="text-xs text-red-400 text-center pt-2">
                  {downloadErrorMessage}
                </p>
              )}
            </div>

            {/* Social Sharing Section with Full Caption Control & Platform Actions */}
            <div id="social-sharing-hub">
              <SocialSharingSection
                ref={socialSharingRef}
                studentName={studentName}
                collegeName={passData.collegeName || eventConfig.brand.institution}
                downloadedDataUrl={downloadedDataUrl}
                onTriggerDownload={handleDownload}
                passElementRef={passRef}
              />
            </div>

          </motion.div>
        )}

      </div>

      {/* Mobile Long-Press Modal */}
      {showMobileModal && downloadedDataUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85">
          <div className="bg-[#1B222C] border border-[#515963] max-w-sm w-full p-5 text-center space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[#515963]/40 pb-2">
              <span className="text-xs font-bold text-[#40B4F5] flex items-center gap-1.5 uppercase">
                <Smartphone className="w-3.5 h-3.5" />
                Mobile Device Save
              </span>
              <button
                onClick={() => setShowMobileModal(false)}
                className="text-[#8A95A3] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[#C4CBD3] leading-relaxed">
              On iOS/Android browsers, press and hold the image below and select <strong className="text-white">&quot;Save to Photos&quot;</strong>.
            </p>

            <div className="border border-[#515963] max-h-72 overflow-hidden flex items-center justify-center bg-black">
              <img
                src={downloadedDataUrl}
                alt="Your GENESIS Experience Card"
                className="max-h-72 w-auto object-contain"
              />
            </div>

            <button
              onClick={() => setShowMobileModal(false)}
              className="w-full py-2.5 bg-[#40B4F5] text-[#15212C] font-bold text-xs uppercase cursor-pointer"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default SinglePagePassApp;
