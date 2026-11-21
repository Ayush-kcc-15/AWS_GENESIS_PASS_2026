import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Edit3,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  X,
  Smartphone,
  RotateCcw,
} from 'lucide-react';
import { usePass } from '../context/PassContext';
import { GenesisPass } from '../components/GenesisPass';
import { downloadGenesisPass } from '../utils/downloadPass';
import { SocialSharingSection } from '../components/SocialSharingSection';

export const Preview: React.FC = () => {
  const { passData } = usePass();
  const navigate = useNavigate();
  const passRef = useRef<HTMLDivElement>(null);

  const [downloadState, setDownloadState] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [downloadedImageUrl, setDownloadedImageUrl] = useState<string | null>(null);
  const [showMobileModal, setShowMobileModal] = useState<boolean>(false);

  // If visitor arrives directly without filling form, provide friendly default demo
  const hasCustomData = Boolean(passData.fullName.trim() || passData.croppedPhotoUrl);
  const studentName = hasCustomData && passData.fullName.trim() ? passData.fullName : 'AYUSH KUMAR';
  const studentPhoto = passData.croppedPhotoUrl || null;

  const handleDownload = async (): Promise<string | null> => {
    if (downloadState === 'generating') return null;
    if (!passRef.current) {
      setDownloadState('error');
      setErrorMessage('Pass display element could not be found.');
      return null;
    }

    try {
      setDownloadState('generating');
      setErrorMessage('');

      const result = await downloadGenesisPass({
        passElement: passRef.current,
        studentName,
        targetWidth: 1080,
        targetHeight: 1440,
      });

      if (result.success && result.dataUrl) {
        setDownloadState('success');
        setDownloadedImageUrl(result.dataUrl);

        if (result.isMobileSaveRequired) {
          setShowMobileModal(true);
        }

        // Return to idle after 6 seconds
        setTimeout(() => {
          setDownloadState((prev) => (prev === 'success' ? 'idle' : prev));
        }, 6000);

        return result.dataUrl;
      } else {
        setDownloadState('error');
        setErrorMessage(result.error || 'Failed to generate PNG image. Please try again.');
        return null;
      }
    } catch (err) {
      setDownloadState('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'An error occurred during pass export.'
      );
      return null;
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-genesis-electric/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-genesis-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10">
        
        {/* Navigation & Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-4 text-xs font-mono">
            <Link
              to="/create-pass"
              className="inline-flex items-center gap-1.5 text-genesis-muted hover:text-genesis-electric transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Edit Credentials</span>
            </Link>
            <span className="text-white/20">•</span>
            <Link
              to="/"
              className="text-genesis-muted hover:text-genesis-cyan transition-colors"
            >
              Genesis Home
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-genesis-electric/40 text-genesis-electric font-mono text-xs font-semibold tracking-wider uppercase shadow-glow-electric/20">
              <Sparkles className="w-3.5 h-3.5 text-genesis-electric animate-spin" style={{ animationDuration: '6s' }} />
              <span>OFFICIAL ATTENDEE BADGE READY</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight uppercase">
              YOUR GENESIS PASS{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric via-genesis-cyan to-white drop-shadow-[0_0_30px_rgba(74,191,255,0.6)]">
                IS READY.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-genesis-muted max-w-xl mx-auto leading-relaxed">
              Your personalized Genesis attendee identity.
            </p>
          </motion.div>

          {/* Missing data notification banner if user opened /preview directly */}
          {!hasCustomData && (
            <div className="inline-block p-3 px-5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              Displaying reference sample attendee pass. Click "Edit Credentials" to personalize with your own name & photo!
            </div>
          )}
        </div>

        {/* Central Pass Showcase Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-xl mx-auto"
        >
          {/* Subtle Outer Neon Aura */}
          <div className="absolute -inset-4 bg-gradient-to-r from-genesis-electric/30 via-genesis-cyan/20 to-genesis-electric/30 rounded-[36px] blur-2xl opacity-75 pointer-events-none" />

          {/* Master Glassmorphic Frame Wrapper */}
          <div className="relative rounded-[32px] glass-panel p-4 sm:p-7 border-2 border-genesis-electric/50 bg-genesis-dark/90 shadow-glow-electric-lg">
            
            {/* The Dynamic Genesis Pass Component with Ref for Export */}
            <GenesisPass
              ref={passRef}
              studentName={studentName}
              studentPhoto={studentPhoto}
            />

          </div>
        </motion.div>

        {/* ===================================================================
            PHASE 05: DOWNLOAD SYSTEM SECTION
            =================================================================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="max-w-xl mx-auto space-y-4 text-center"
        >
          {/* Description */}
          <p className="text-xs sm:text-sm text-genesis-muted font-medium">
            Your personalized GENESIS 2026 attendee pass is ready. Download it and share your excitement!
          </p>

          {/* Prominent High-Resolution Download CTA Button */}
          <div className="relative flex justify-center">
            <button
              onClick={handleDownload}
              disabled={downloadState === 'generating'}
              className={`glow-btn w-full sm:w-auto min-w-[320px] px-8 py-5 rounded-2xl font-black text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 cursor-pointer transition-all duration-300 ${
                downloadState === 'success'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-[0_0_30px_rgba(52,211,153,0.5)] border border-emerald-300'
                  : downloadState === 'generating'
                  ? 'bg-genesis-surface border border-genesis-electric/40 text-slate-400 cursor-wait'
                  : 'bg-gradient-to-r from-genesis-electric via-genesis-cyan to-genesis-electric bg-[length:200%_auto] text-genesis-midnight shadow-glow-electric-lg hover:shadow-glow-cyan active:scale-[0.98]'
              }`}
            >
              {downloadState === 'generating' ? (
                <>
                  <Loader2 className="w-5 h-5 text-genesis-cyan animate-spin" />
                  <span>GENERATING YOUR PASS...</span>
                </>
              ) : downloadState === 'success' ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-950" />
                  <span>YOUR GENESIS PASS IS DOWNLOADED!</span>
                </>
              ) : (
                <>
                  <Download className="w-5 h-5 text-genesis-midnight" />
                  <span>DOWNLOAD MY GENESIS PASS</span>
                </>
              )}
            </button>
          </div>

          {/* Export Specification Tags */}
          <div className="flex items-center justify-center gap-3 text-[11px] font-mono text-slate-400">
            <span className="px-2.5 py-1 rounded bg-genesis-midnight border border-white/5">
              1080 × 1440 PNG
            </span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded bg-genesis-midnight border border-white/5">
              3:4 Social Ready
            </span>
            <span>•</span>
            <span className="px-2.5 py-1 rounded bg-genesis-midnight border border-white/5">
              Lossless Quality
            </span>
          </div>

          {/* Success Notification Banner & Download Again Action */}
          <AnimatePresence>
            {downloadState === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl glass-panel border border-emerald-500/50 bg-emerald-500/10 text-emerald-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 max-w-md mx-auto"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>Pass downloaded! Check your downloads folder.</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-[11px] font-bold text-white uppercase transition-colors flex items-center gap-1.5 shrink-0"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Download Again</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error Message & Retry */}
          <AnimatePresence>
            {downloadState === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 rounded-xl glass-panel border border-red-500/50 bg-red-500/10 text-red-300 text-xs flex flex-col sm:flex-row items-center justify-between gap-3 max-w-md mx-auto text-left"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                  <span>{errorMessage || 'Failed to download pass. Please try again.'}</span>
                </div>
                <button
                  onClick={handleDownload}
                  className="px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-[11px] font-bold uppercase transition-colors shrink-0"
                >
                  Retry
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ===================================================================
            PHASE 06: SOCIAL MEDIA SHARING SECTION
            =================================================================== */}
        <SocialSharingSection
          studentName={studentName}
          collegeName={passData.collegeName}
          downloadedDataUrl={downloadedImageUrl}
          onTriggerDownload={handleDownload}
        />

        {/* Secondary Navigation & Metadata Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="max-w-xl mx-auto rounded-2xl glass-panel p-6 border border-genesis-electric/30 bg-genesis-dark/80 space-y-4 text-center"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-genesis-muted">Registered Name:</span>
            <span className="text-white font-bold tracking-wider uppercase">
              {studentName}
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10 text-xs font-mono">
            <span className="text-genesis-muted">Institution:</span>
            <span className="text-genesis-cyan font-semibold">
              {passData.collegeName || 'KCC Institute of Technology & Management'}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigate('/create-pass')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl glass-panel text-white hover:text-genesis-cyan hover:border-genesis-electric font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Edit3 className="w-4 h-4 text-genesis-electric" />
              <span>Edit Details & Photo</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 rounded-xl glass-panel text-genesis-muted hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="pt-2 flex items-center justify-center gap-2 text-[11px] font-mono text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-genesis-cyan" />
            <span>Client-Side High-Res Generation • 100% Private Browser Render</span>
          </div>
        </motion.div>

      </div>

      {/* Mobile Safari / Direct Save Modal (Opens when browser requires manual tap-to-save) */}
      <AnimatePresence>
        {showMobileModal && downloadedImageUrl && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="relative w-full max-w-sm rounded-2xl glass-panel bg-genesis-dark p-6 border-2 border-genesis-electric/50 text-center space-y-4"
            >
              <button
                onClick={() => setShowMobileModal(false)}
                className="absolute top-3 right-3 p-1.5 rounded-lg text-genesis-muted hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-xl bg-genesis-electric/20 border border-genesis-electric/40 text-genesis-cyan flex items-center justify-center mx-auto">
                <Smartphone className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-bold text-white text-base">Save Pass to Photos</h3>
                <p className="text-xs text-genesis-muted mt-1 leading-relaxed">
                  Tap and hold (long press) the pass below and choose <strong>"Save Image"</strong> or <strong>"Add to Photos"</strong>.
                </p>
              </div>

              <div className="rounded-xl overflow-hidden border border-genesis-electric/40 shadow-glow-electric">
                <img
                  src={downloadedImageUrl}
                  alt="Genesis Pass Mobile Export"
                  className="w-full h-auto object-cover"
                />
              </div>

              <button
                onClick={() => setShowMobileModal(false)}
                className="w-full py-2.5 rounded-xl bg-genesis-midnight border border-genesis-electric/30 text-white font-bold text-xs uppercase"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
