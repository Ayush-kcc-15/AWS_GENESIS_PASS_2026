import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowLeft, Image, ShieldCheck } from 'lucide-react';
import { usePass } from '../context/PassContext';

export const PreviewPlaceholder: React.FC = () => {
  const { passData } = usePass();
  const navigate = useNavigate();

  // If visitor hits /preview directly without entering details, allow them to return
  const hasDetails = Boolean(passData.fullName || passData.croppedPhotoUrl);

  return (
    <div className="min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-20 left-1/3 w-[500px] h-[500px] bg-genesis-electric/15 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-panel p-8 sm:p-12 rounded-3xl border-2 border-genesis-electric/40 bg-genesis-dark/95 shadow-glow-electric-lg space-y-8"
        >
          
          {/* Phase 02 Success Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 font-mono text-xs font-bold tracking-wider uppercase">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>PHASE 02 COMPLETE // CREDENTIALS CAPTURED</span>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              ATTENDEE IDENTITY{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-genesis-electric to-genesis-cyan">
                LOCKED IN.
              </span>
            </h1>
            <p className="text-base text-genesis-muted max-w-xl mx-auto">
              Your details and photo have been validated and saved in application state. They are primed for Phase 03 canvas pass generation.
            </p>
          </div>

          {/* Captured Data Card */}
          {hasDetails ? (
            <div className="p-6 rounded-2xl bg-genesis-midnight/90 border border-genesis-electric/30 max-w-lg mx-auto text-left space-y-4">
              
              <div className="flex items-center gap-4 pb-4 border-b border-white/10">
                {passData.croppedPhotoUrl ? (
                  <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-genesis-electric shadow-glow-electric shrink-0">
                    <img
                      src={passData.croppedPhotoUrl}
                      alt="Cropped Attendee"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-xl bg-genesis-surface border border-dashed border-genesis-electric/40 flex items-center justify-center text-genesis-muted">
                    <Image className="w-6 h-6" />
                  </div>
                )}

                <div className="overflow-hidden">
                  <div className="text-lg font-black text-white uppercase tracking-wider truncate">
                    {passData.fullName || 'NO NAME PROVIDED'}
                  </div>
                  <div className="text-xs font-mono text-genesis-cyan font-bold tracking-wider uppercase">
                    GENESIS ATTENDEE // 2026
                  </div>
                  <div className="text-xs text-genesis-muted truncate mt-0.5">
                    {passData.collegeName}
                  </div>
                </div>
              </div>

              {/* Data Checklist */}
              <div className="grid grid-cols-2 gap-3 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Name: Validated</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Photo: Cropped</span>
                </div>
                {passData.linkedinUrl && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>LinkedIn: Linked</span>
                  </div>
                )}
                {passData.instagramHandle && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Instagram: Saved</span>
                  </div>
                )}
              </div>

            </div>
          ) : (
            <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
              No form data found in session. Please start from the customization form.
            </div>
          )}

          {/* Phase 03 Next Steps Notice */}
          <div className="p-4 rounded-2xl glass-panel border border-genesis-cyan/30 text-xs text-genesis-muted max-w-lg mx-auto flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-genesis-cyan shrink-0" />
            <p className="text-left">
              <strong className="text-white">Awaiting Phase 03:</strong> The high-resolution HTML5 canvas rendering engine, dynamic pass generation, PNG download, and social media sharing will be implemented next.
            </p>
          </div>

          {/* Action Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/create-pass')}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel text-white hover:text-genesis-cyan hover:border-genesis-electric font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Edit Details</span>
            </button>

            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl glass-panel text-genesis-muted hover:text-white font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
            >
              <span>Genesis Home</span>
            </Link>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
