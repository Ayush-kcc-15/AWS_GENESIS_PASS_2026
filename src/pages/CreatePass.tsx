import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  GraduationCap,
  ArrowRight,
  RotateCcw,
  Sparkles,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
import { usePass } from '../context/PassContext';
import { PhotoUploadArea } from '../components/PhotoUploadArea';

export const CreatePass: React.FC = () => {
  const navigate = useNavigate();
  const { passData, updatePassData, resetPassData, isFormValid, errors, setErrors } = usePass();

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

  const handleLinkedinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updatePassData({ linkedinUrl: val });
    if (val.trim()) {
      try {
        const url = new URL(val.startsWith('http') ? val : `https://${val}`);
        if (!url.hostname.includes('linkedin.com')) {
          setErrors((prev) => ({
            ...prev,
            linkedin: 'Please enter a valid LinkedIn URL (e.g., https://linkedin.com/in/username)',
          }));
        } else {
          setErrors((prev) => {
            const rest = { ...prev };
            delete rest.linkedin;
            return rest;
          });
        }
      } catch {
        setErrors((prev) => ({
          ...prev,
          linkedin: 'Please enter a valid LinkedIn URL',
        }));
      }
    } else {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest.linkedin;
        return rest;
      });
    }
  };

  const handleInstagramChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    updatePassData({ instagramHandle: val });
    if (val.trim()) {
      const handle = val.trim().replace(/^@/, '');
      if (!/^[a-zA-Z0-9._]{1,30}$/.test(handle)) {
        setErrors((prev) => ({
          ...prev,
          instagram: 'Username may only contain letters, numbers, periods, and underscores (max 30 chars)',
        }));
      } else {
        setErrors((prev) => {
          const rest = { ...prev };
          delete rest.instagram;
          return rest;
        });
      }
    } else {
      setErrors((prev) => {
        const rest = { ...prev };
        delete rest.instagram;
        return rest;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Final validation checks
    const newErrors: Record<string, string> = {};
    if (!passData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }
    if (!passData.croppedPhotoUrl) {
      newErrors.photo = 'Profile Photograph is required.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Auto trim name
    updatePassData({ fullName: passData.fullName.trim() });

    // Navigate to preview route
    navigate('/preview');
  };

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-genesis-electric/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-genesis-cyan/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Back Link & Header */}
        <div className="mb-10 text-center lg:text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-genesis-muted hover:text-genesis-electric transition-colors mb-4"
          >
            <span>←</span>
            <span>Back to Genesis 2026 Home</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-3"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel border border-genesis-electric/40 text-genesis-electric font-mono text-xs font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-genesis-electric" />
              <span>OFFICIAL ATTENDEE CUSTOMIZATION</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
              MAKE IT{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric to-genesis-cyan drop-shadow-[0_0_30px_rgba(74,191,255,0.5)]">
                YOURS.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-genesis-muted max-w-2xl leading-relaxed">
              Your Genesis journey deserves your identity. Personalize your attendee pass and get ready to share it.
            </p>
          </motion.div>
        </div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT COLUMN: Personalization Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <form
              onSubmit={handleSubmit}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-genesis-electric/30 bg-genesis-dark/85 shadow-glow-electric/15 space-y-7"
            >
              
              {/* Header inside card */}
              <div className="border-b border-white/5 pb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-bold text-white tracking-wide">
                    Attendee Credentials
                  </h2>
                  <p className="text-xs text-genesis-muted mt-0.5">
                    No login required • Public promotional badge
                  </p>
                </div>
                <button
                  type="button"
                  onClick={resetPassData}
                  className="px-3 py-1.5 rounded-lg text-xs font-mono text-genesis-muted hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Reset all form fields"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Form</span>
                </button>
              </div>

              {/* A. Full Name Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="fullName"
                    className="text-xs font-mono font-bold tracking-wider text-genesis-cyan uppercase flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>Full Name <span className="text-genesis-electric">*</span></span>
                  </label>
                  <span className="text-[10px] font-mono text-genesis-muted">
                    {passData.fullName.length}/40 characters
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="fullName"
                    type="text"
                    value={passData.fullName}
                    onChange={handleNameChange}
                    placeholder="e.g. AYUSH KUMAR"
                    maxLength={40}
                    className={`w-full px-4 py-3.5 rounded-xl bg-genesis-midnight/90 border text-white placeholder-slate-500 text-sm font-medium focus:outline-none transition-all uppercase tracking-wide ${
                      errors.fullName
                        ? 'border-red-500/80 focus:border-red-400 focus:ring-1 focus:ring-red-400'
                        : 'border-genesis-electric/30 focus:border-genesis-electric focus:ring-1 focus:ring-genesis-electric/50 focus:shadow-glow-electric'
                    }`}
                  />
                </div>

                {errors.fullName ? (
                  <div className="flex items-center gap-2 text-xs text-red-400 font-medium">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>{errors.fullName}</span>
                  </div>
                ) : (
                  <p className="text-[11px] text-genesis-muted/80">
                    Will appear in uppercase bold letters across the center banner of your pass.
                  </p>
                )}
              </div>

              {/* B. College Name Field */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="collegeName"
                    className="text-xs font-mono font-bold tracking-wider text-genesis-cyan uppercase flex items-center gap-1.5"
                  >
                    <GraduationCap className="w-3.5 h-3.5" />
                    <span>College / Institution</span>
                  </label>
                  <span className="text-[10px] font-mono text-genesis-electric/80">
                    Default: KCC ITM
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="collegeName"
                    type="text"
                    value={passData.collegeName}
                    onChange={handleCollegeChange}
                    placeholder="KCC Institute of Technology & Management"
                    maxLength={70}
                    className="w-full px-4 py-3.5 rounded-xl bg-genesis-midnight/90 border border-genesis-electric/30 text-white placeholder-slate-500 text-sm font-medium focus:outline-none focus:border-genesis-electric focus:ring-1 focus:ring-genesis-electric/50 focus:shadow-glow-electric transition-all"
                  />
                </div>
              </div>

              {/* C. Profile Photograph Upload Area */}
              <PhotoUploadArea />

              {/* Social Profiles Sub-section */}
              <div className="pt-2 border-t border-white/5 space-y-4">
                <div className="text-xs font-mono text-genesis-muted uppercase tracking-wider">
                  Optional Social Handles
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* D. LinkedIn Profile */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="linkedinUrl"
                      className="text-xs font-mono text-slate-300 flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-genesis-cyan fill-current" viewBox="0 0 24 24">
                        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74 0-.96-.78-1.74-1.74-1.74Z" />
                      </svg>
                      <span>LinkedIn Profile</span>
                    </label>
                    <input
                      id="linkedinUrl"
                      type="text"
                      value={passData.linkedinUrl}
                      onChange={handleLinkedinChange}
                      placeholder="linkedin.com/in/username"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-genesis-midnight/90 border text-white placeholder-slate-500 text-xs focus:outline-none transition-all ${
                        errors.linkedin
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-genesis-electric/25 focus:border-genesis-electric focus:shadow-glow-electric'
                      }`}
                    />
                    {errors.linkedin && (
                      <p className="text-[10px] text-red-400">{errors.linkedin}</p>
                    )}
                  </div>

                  {/* E. Instagram Username */}
                  <div className="space-y-1.5">
                    <label
                      htmlFor="instagramHandle"
                      className="text-xs font-mono text-slate-300 flex items-center gap-1.5"
                    >
                      <svg className="w-3.5 h-3.5 text-genesis-cyan fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                      </svg>
                      <span>Instagram Username</span>
                    </label>
                    <input
                      id="instagramHandle"
                      type="text"
                      value={passData.instagramHandle}
                      onChange={handleInstagramChange}
                      placeholder="@yourusername"
                      className={`w-full px-3.5 py-2.5 rounded-xl bg-genesis-midnight/90 border text-white placeholder-slate-500 text-xs focus:outline-none transition-all ${
                        errors.instagram
                          ? 'border-red-500/80 focus:border-red-400'
                          : 'border-genesis-electric/25 focus:border-genesis-electric focus:shadow-glow-electric'
                      }`}
                    />
                    {errors.instagram && (
                      <p className="text-[10px] text-red-400">{errors.instagram}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Primary Form CTA */}
              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  disabled={!isFormValid}
                  className={`w-full py-4 rounded-2xl font-black text-sm sm:text-base tracking-wider uppercase flex items-center justify-center gap-3 transition-all cursor-pointer ${
                    isFormValid
                      ? 'glow-btn bg-gradient-to-r from-genesis-electric via-genesis-cyan to-genesis-electric bg-[length:200%_auto] text-genesis-midnight shadow-glow-electric active:scale-[0.99]'
                      : 'bg-genesis-surface/80 border border-white/10 text-slate-500 cursor-not-allowed opacity-60'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>CONTINUE TO PREVIEW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {!isFormValid && (
                  <div className="mt-3 text-center text-xs font-mono text-genesis-muted">
                    {!passData.fullName.trim() && !passData.croppedPhotoUrl ? (
                      <span>Enter your Full Name and upload a Photo to proceed.</span>
                    ) : !passData.fullName.trim() ? (
                      <span>Please enter your Full Name.</span>
                    ) : !passData.croppedPhotoUrl ? (
                      <span>Please upload your photograph.</span>
                    ) : (
                      <span>Please check the fields marked in red.</span>
                    )}
                  </div>
                )}
              </div>

            </form>
          </motion.div>

          {/* RIGHT COLUMN: Live Photograph Preview & Design Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-6 lg:sticky lg:top-28"
          >
            
            {/* Live Pass Mockup Preview */}
            <div className="rounded-3xl glass-panel p-6 border-2 border-genesis-electric/40 bg-gradient-to-b from-genesis-dark/95 via-genesis-midnight/90 to-genesis-dark/95 shadow-glow-electric flex flex-col items-center">
              
              <div className="w-full flex items-center justify-between pb-4 border-b border-white/10 text-xs font-mono text-genesis-muted">
                <span className="text-genesis-cyan font-bold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE PREVIEW
                </span>
                <span>GENESIS 2026</span>
              </div>

              {/* Master Pass Representation with Live Overlay */}
              <div className="relative mt-5 w-full max-w-[300px] aspect-[3/4] rounded-2xl overflow-hidden border border-genesis-electric/50 shadow-2xl bg-black">
                {/* Master Template Background */}
                <img
                  src="/assets/master-pass-reference.jpg"
                  alt="Genesis Pass Master Reference"
                  className="w-full h-full object-cover"
                />

                {/* Dynamic Live Photo Overlay (positioned exactly over avatar frame: centered at ~50% x, ~50.5% y) */}
                {passData.croppedPhotoUrl && (
                  <div className="absolute top-[36.5%] left-[30.5%] w-[39%] h-[29.5%] overflow-hidden rounded-xl border border-genesis-cyan/80 shadow-glow-cyan z-20 bg-genesis-dark">
                    <img
                      src={passData.croppedPhotoUrl}
                      alt="Live Attendee Photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                {/* Dynamic Live Name Overlay (positioned over name bar: centered at ~50% x, ~71% y) */}
                {passData.fullName.trim() && (
                  <div className="absolute top-[68.5%] left-[12%] right-[12%] z-20 text-center pointer-events-none">
                    <div className="bg-genesis-dark/90 backdrop-blur-sm border border-genesis-electric/40 rounded-lg py-1 px-2 shadow-lg">
                      <div className="text-xs sm:text-sm font-black text-white tracking-wider truncate uppercase font-sans drop-shadow-md">
                        {passData.fullName.trim()}
                      </div>
                      <div className="text-[8px] font-mono font-bold text-genesis-cyan tracking-widest uppercase">
                        GENESIS ATTENDEE
                      </div>
                    </div>
                  </div>
                )}

                {/* Indicator watermark */}
                <div className="absolute top-2 right-2 z-30 px-2 py-0.5 rounded bg-black/75 border border-genesis-electric/40 text-[9px] font-mono text-genesis-electric uppercase">
                  {passData.croppedPhotoUrl ? 'Photo Loaded' : 'Awaiting Photo'}
                </div>
              </div>

              {/* Live Status Summary */}
              <div className="w-full mt-6 space-y-3 pt-4 border-t border-white/10 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono text-genesis-muted">Attendee Name:</span>
                  <span className="font-bold text-white uppercase">
                    {passData.fullName.trim() || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono text-genesis-muted">Institution:</span>
                  <span className="font-semibold text-genesis-cyan text-right truncate max-w-[180px]">
                    {passData.collegeName || '—'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span className="font-mono text-genesis-muted">Photograph:</span>
                  <span className={`font-mono font-bold ${passData.croppedPhotoUrl ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {passData.croppedPhotoUrl ? '✓ Ready' : 'Pending upload'}
                  </span>
                </div>
              </div>

            </div>

            {/* Design & Privacy Specification Card */}
            <div className="rounded-2xl glass-panel p-5 border border-genesis-electric/20 space-y-3 text-xs text-genesis-muted">
              <div className="flex items-center gap-2 text-white font-bold">
                <ShieldCheck className="w-4 h-4 text-genesis-electric" />
                <span>Client-Side Security & Privacy</span>
              </div>
              <p className="leading-relaxed text-[11px]">
                Your photograph and personal details are processed 100% locally in your browser memory. No photos are transmitted to or stored on external servers.
              </p>
              <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-mono text-slate-400">
                <span className="px-2 py-1 rounded bg-genesis-midnight border border-white/5">
                  768 × 1024 px PNG
                </span>
                <span className="px-2 py-1 rounded bg-genesis-midnight border border-white/5">
                  Official AWS SBG Layout
                </span>
                <span className="px-2 py-1 rounded bg-genesis-midnight border border-white/5">
                  No RSVP Verification
                </span>
              </div>
            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
};
