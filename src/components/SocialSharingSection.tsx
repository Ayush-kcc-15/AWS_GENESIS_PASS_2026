import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Copy,
  Check,
  ExternalLink,
  Loader2,
  Share2,
  X,
  AlertCircle,
} from 'lucide-react';
import {
  getLinkedInCaption,
  getInstagramCaption,
  copyToClipboard,
  LINKEDIN_FEED_URL,
  INSTAGRAM_WEB_URL,
  canShareFiles,
  shareNativeDevice,
} from '../utils/sharePass';
import {
  renderPassToDataUrl,
  dataUrlToFile,
  triggerFileDownload,
  sanitizeFileName,
} from '../utils/downloadPass';

export interface SocialSharingHandle {
  shareLinkedIn: () => Promise<void>;
  shareInstagram: () => Promise<void>;
}

interface SocialSharingSectionProps {
  studentName: string;
  collegeName?: string;
  downloadedDataUrl: string | null;
  onTriggerDownload: () => Promise<string | null>;
  passElementRef?: React.RefObject<HTMLDivElement>;
}

export const SocialSharingSection = forwardRef<SocialSharingHandle, SocialSharingSectionProps>(
  ({ studentName, downloadedDataUrl, passElementRef }, ref) => {
    // Platform tabs for the editable caption area
    const [selectedTab, setSelectedTab] = useState<'linkedin' | 'instagram'>('linkedin');

    // Distinct editable captions for each platform
    const [linkedinCaption, setLinkedinCaption] = useState<string>(() =>
      getLinkedInCaption(studentName)
    );
    const [instagramCaption, setInstagramCaption] = useState<string>(() =>
      getInstagramCaption(studentName)
    );
    const [hasEditedLinkedIn, setHasEditedLinkedIn] = useState<boolean>(false);
    const [hasEditedInstagram, setHasEditedInstagram] = useState<boolean>(false);

    // Toast / operational status messages
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [copiedFeedback, setCopiedFeedback] = useState<boolean>(false);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [activeActionPlatform, setActiveActionPlatform] = useState<'linkedin' | 'instagram' | null>(null);

    // The dedicated instruction modal platform
    const [activeModalPlatform, setActiveModalPlatform] = useState<'linkedin' | 'instagram' | null>(null);
    const [clipboardFailed, setClipboardFailed] = useState<boolean>(false);

    // Asset cache to prevent duplicate render & duplicate download
    const [cachedDataUrl, setCachedDataUrl] = useState<string | null>(downloadedDataUrl);
    const [cachedFile, setCachedFile] = useState<File | null>(null);
    const [hasDownloadedLocally, setHasDownloadedLocally] = useState<boolean>(Boolean(downloadedDataUrl));

    // Dynamic sync when student name changes
    useEffect(() => {
      if (!hasEditedLinkedIn) {
        setLinkedinCaption(getLinkedInCaption(studentName));
      }
      if (!hasEditedInstagram) {
        setInstagramCaption(getInstagramCaption(studentName));
      }
    }, [studentName, hasEditedLinkedIn, hasEditedInstagram]);

    // Sync if parent component already downloaded pass
    useEffect(() => {
      if (downloadedDataUrl) {
        setCachedDataUrl(downloadedDataUrl);
        setHasDownloadedLocally(true);
      }
    }, [downloadedDataUrl]);

    /**
     * Helper to ensure the 1080x1440 PNG File & DataURL are fully rendered.
     */
    const getRenderedPassFile = async (): Promise<{
      file: File;
      dataUrl: string;
      fileName: string;
    } | null> => {
      const safeName = sanitizeFileName(studentName || 'ATTENDEE');
      const fileName = `GENESIS_2026_${safeName}_PASS.png`;

      try {
        if (cachedFile && cachedDataUrl) {
          return { file: cachedFile, dataUrl: cachedDataUrl, fileName };
        }

        let currentDataUrl = cachedDataUrl;
        if (!currentDataUrl) {
          if (!passElementRef?.current) {
            throw new Error('Pass visual element not found.');
          }
          currentDataUrl = await renderPassToDataUrl(passElementRef.current, 1080, 1440);
          setCachedDataUrl(currentDataUrl);
        }

        const file = await dataUrlToFile(currentDataUrl, fileName);
        setCachedFile(file);
        return { file, dataUrl: currentDataUrl, fileName };
      } catch (err) {
        console.error('Pass rendering failed before sharing:', err);
        return null;
      }
    };

    /**
     * Core automated sharing workflow for a selected platform
     */
    const executeShareWorkflow = async (platform: 'linkedin' | 'instagram') => {
      if (isProcessing) return;

      setIsProcessing(true);
      setActiveActionPlatform(platform);
      setClipboardFailed(false);

      const currentCaption = platform === 'linkedin' ? linkedinCaption : instagramCaption;
      const targetUrl = platform === 'linkedin' ? LINKEDIN_FEED_URL : INSTAGRAM_WEB_URL;
      const canAttemptNative = canShareFiles();

      // Open new tab synchronously during click event on desktop to avoid popup blockers
      let popupWindow: Window | null = null;
      if (!canAttemptNative && typeof window !== 'undefined') {
        try {
          popupWindow = window.open('about:blank', '_blank');
        } catch {
          popupWindow = null;
        }
      }

      try {
        // STEP 1 — PREPARE PASS
        setStatusMessage('Preparing your GENESIS pass...');
        const rendered = await getRenderedPassFile();

        if (!rendered) {
          if (popupWindow) popupWindow.close();
          setStatusMessage('Could not render pass image. Please try again.');
          setIsProcessing(false);
          setActiveActionPlatform(null);
          return;
        }

        const { file, dataUrl, fileName } = rendered;

        // Mobile Native File Sharing (where supported)
        if (canAttemptNative) {
          const canSharePass = canShareFiles(file);
          if (canSharePass) {
            setStatusMessage('Opening share sheet...');
            const didShare = await shareNativeDevice({
              file,
              title: 'GENESIS 2026',
              text: currentCaption,
            });

            if (didShare) {
              setStatusMessage('Pass ready to share.');
              setTimeout(() => setStatusMessage(null), 3500);
              setIsProcessing(false);
              setActiveActionPlatform(null);
              return;
            }
          }
        }

        // STEP 2 — DOWNLOAD IMAGE AUTOMATICALLY (Avoid duplicate downloads)
        if (!hasDownloadedLocally) {
          triggerFileDownload(dataUrl, fileName);
          setHasDownloadedLocally(true);
          setStatusMessage('Your pass has been downloaded.');
        }

        // STEP 3 — COPY CAPTION TO CLIPBOARD
        const copySuccess = await copyToClipboard(currentCaption);
        if (copySuccess) {
          setStatusMessage('Caption copied successfully!');
        } else {
          setClipboardFailed(true);
        }

        // STEP 4 — OPEN SOCIAL PLATFORM TAB
        setStatusMessage(platform === 'linkedin' ? 'Opening LinkedIn...' : 'Opening Instagram...');
        let opened = false;
        if (popupWindow && !popupWindow.closed) {
          try {
            popupWindow.location.href = targetUrl;
            opened = true;
          } catch {
            opened = false;
          }
        }
        if (!opened) {
          try {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
          } catch {
            // Popup blocked: handled gracefully by instruction modal's "OPEN AGAIN" button
          }
        }

        // STEP 5 — SHOW INSTRUCTION PANEL
        setActiveModalPlatform(platform);
        setStatusMessage('Complete your post by attaching your pass.');
      } catch (err) {
        console.error('Sharing workflow error:', err);
        setStatusMessage('An error occurred. Please try again.');
      } finally {
        setIsProcessing(false);
        setActiveActionPlatform(null);
      }
    };

    // Expose handlers to parent component (SinglePagePassApp)
    useImperativeHandle(ref, () => ({
      shareLinkedIn: async () => {
        await executeShareWorkflow('linkedin');
      },
      shareInstagram: async () => {
        await executeShareWorkflow('instagram');
      },
    }));

    /**
     * Copy caption again from modal or preview area
     */
    const handleCopyCaptionAgain = async (platform: 'linkedin' | 'instagram') => {
      const textToCopy = platform === 'linkedin' ? linkedinCaption : instagramCaption;
      const success = await copyToClipboard(textToCopy);
      if (success) {
        setCopiedFeedback(true);
        setStatusMessage('Caption copied successfully!');
        setTimeout(() => {
          setCopiedFeedback(false);
          setStatusMessage(null);
        }, 3000);
      } else {
        setClipboardFailed(true);
      }
    };

    /**
     * Open platform again
     */
    const handleOpenPlatformAgain = (platform: 'linkedin' | 'instagram') => {
      const url = platform === 'linkedin' ? LINKEDIN_FEED_URL : INSTAGRAM_WEB_URL;
      window.open(url, '_blank', 'noopener,noreferrer');
    };

    const activeCaption = selectedTab === 'linkedin' ? linkedinCaption : instagramCaption;

    return (
      <section className="pt-4 pb-8 max-w-4xl mx-auto space-y-6 relative font-mono">

        {/* Floating Status / Operational Feedback Toast */}
        <AnimatePresence>
          {statusMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[#1B222C] border border-[#40B4F5] text-xs font-mono font-bold text-white flex items-center gap-2.5 shadow-[0_0_24px_rgba(64,180,245,0.3)]"
            >
              {isProcessing ? (
                <Loader2 className="w-4 h-4 text-[#40B4F5] animate-spin shrink-0" />
              ) : (
                <Check className="w-4 h-4 text-[#40B4F5] shrink-0" />
              )}
              <span>{statusMessage}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Sharing Console Card */}
        <div className="bg-[#1B222C] border border-[#515963] p-6 sm:p-8 space-y-6 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Ambient Refraction Lighting */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#40B4F5]/5 rounded-full blur-[60px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#40B4F5]/5 rounded-full blur-[50px] pointer-events-none" />

          {/* Section Header */}
          <div className="text-center space-y-2 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#161C25] border border-[#515963] text-[#40B4F5] text-xs font-bold tracking-widest uppercase">
              <Share2 className="w-3.5 h-3.5 text-[#40B4F5]" />
              <span>SHARE WITH THE COMMUNITY</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
              YOUR GENESIS PASS IS READY!
            </h3>

            <p className="text-xs sm:text-sm text-[#C4CBD3] max-w-xl mx-auto">
              Your GENESIS identity is ready. Share your pass with the world and celebrate with the community!
            </p>
          </div>

          {/* 1. Personalized & Editable Caption Console */}
          <div className="space-y-3 relative z-10">
            {/* Tabs for LinkedIn and Instagram Captions */}
            <div className="flex items-center justify-between border-b border-[#515963]/50 pb-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedTab('linkedin')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    selectedTab === 'linkedin'
                      ? 'bg-[#40B4F5] text-[#15212C] shadow-[0_0_12px_rgba(64,180,245,0.3)]'
                      : 'bg-[#161C25] text-[#8A95A3] hover:text-white border border-[#515963]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74Z" />
                  </svg>
                  <span>LinkedIn Caption</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedTab('instagram')}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                    selectedTab === 'instagram'
                      ? 'bg-[#40B4F5] text-[#15212C] shadow-[0_0_12px_rgba(64,180,245,0.3)]'
                      : 'bg-[#161C25] text-[#8A95A3] hover:text-white border border-[#515963]'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                  </svg>
                  <span>Instagram Caption</span>
                </button>
              </div>

              <span className="text-[10px] text-[#8A95A3]">
                {activeCaption.length} characters
              </span>
            </div>

            {/* Editable Textarea */}
            <div className="relative">
              <textarea
                value={activeCaption}
                onChange={(e) => {
                  const val = e.target.value;
                  if (selectedTab === 'linkedin') {
                    setLinkedinCaption(val);
                    setHasEditedLinkedIn(true);
                  } else {
                    setInstagramCaption(val);
                    setHasEditedInstagram(true);
                  }
                }}
                rows={6}
                className="w-full bg-[#161C25] border border-[#515963] focus:border-[#40B4F5] focus:outline-none p-3.5 text-xs text-[#E1E7EE] font-mono leading-relaxed resize-none transition-colors selection:bg-[#40B4F5] selection:text-[#15212C]"
                placeholder="Edit your personalized caption before sharing..."
              />
            </div>

            {/* Sub-bar with Handle References & Manual Copy */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1">
              <div className="text-[10px] text-[#8A95A3] space-y-0.5">
                {selectedTab === 'linkedin' ? (
                  <div>Official LinkedIn: <span className="text-[#40B4F5]">AWS Student Builder Group – KCC ITM</span></div>
                ) : (
                  <div>Official Instagram: <span className="text-[#40B4F5]">@aws.sbg.kccitm</span></div>
                )}
              </div>

              <button
                type="button"
                onClick={() => handleCopyCaptionAgain(selectedTab)}
                className="px-4 py-2 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-[#C4CBD3] hover:text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer active:scale-[0.98] shrink-0"
              >
                {copiedFeedback ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#40B4F5]" />
                    <span className="text-[#40B4F5]">CAPTION COPIED!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#40B4F5]" />
                    <span>COPY CAPTION</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 2. Platform Action Buttons: LinkedIn & Instagram ONLY */}
          <div className="pt-3 border-t border-[#515963]/50 space-y-3 relative z-10">
            <div className="text-[11px] font-bold text-[#8A95A3] uppercase tracking-wider">
              One-Click Automated Desktop &amp; Mobile Sharing:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* PLATFORM 1: LINKEDIN */}
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => executeShareWorkflow('linkedin')}
                disabled={isProcessing}
                className="w-full py-4 px-5 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-white hover:text-[#40B4F5] group transition-all duration-200 flex items-center justify-between shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(64,180,245,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1B222C] border border-[#515963] group-hover:border-[#40B4F5] flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 fill-current text-[#40B4F5]" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74Z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-black text-sm text-white group-hover:text-[#40B4F5] tracking-wide">
                      SHARE ON LINKEDIN
                    </div>
                    <div className="text-[10px] text-[#8A95A3] group-hover:text-[#C4CBD3]">
                      Auto-Download Pass + Copy Caption + Open Feed
                    </div>
                  </div>
                </div>

                {isProcessing && activeActionPlatform === 'linkedin' ? (
                  <Loader2 className="w-4 h-4 text-[#40B4F5] animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4 text-[#8A95A3] group-hover:text-[#40B4F5] transition-colors" />
                )}
              </motion.button>

              {/* PLATFORM 2: INSTAGRAM */}
              <motion.button
                type="button"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => executeShareWorkflow('instagram')}
                disabled={isProcessing}
                className="w-full py-4 px-5 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-white hover:text-[#40B4F5] group transition-all duration-200 flex items-center justify-between shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(64,180,245,0.2)]"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded bg-[#1B222C] border border-[#515963] group-hover:border-[#40B4F5] flex items-center justify-center transition-colors">
                    <svg className="w-5 h-5 fill-current text-[#40B4F5]" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-black text-sm text-white group-hover:text-[#40B4F5] tracking-wide">
                      SHARE ON INSTAGRAM
                    </div>
                    <div className="text-[10px] text-[#8A95A3] group-hover:text-[#C4CBD3]">
                      Auto-Download Pass + Copy Caption + Open App
                    </div>
                  </div>
                </div>

                {isProcessing && activeActionPlatform === 'instagram' ? (
                  <Loader2 className="w-4 h-4 text-[#40B4F5] animate-spin" />
                ) : (
                  <ExternalLink className="w-4 h-4 text-[#8A95A3] group-hover:text-[#40B4F5] transition-colors" />
                )}
              </motion.button>

            </div>
          </div>

        </div>

        {/* 3. Dedicated Instruction Modals (LinkedIn & Instagram) */}
        <AnimatePresence>
          {activeModalPlatform && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: 15 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#1B222C] border-2 border-[#40B4F5] max-w-lg w-full p-6 sm:p-7 space-y-5 shadow-[0_0_40px_rgba(64,180,245,0.3)] relative font-mono text-left"
              >
                {/* Modal Top Header Bar with Platform Icon */}
                <div className="flex items-center justify-between border-b border-[#515963]/50 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded bg-[#161C25] border border-[#40B4F5] flex items-center justify-center">
                      {activeModalPlatform === 'linkedin' ? (
                        <svg className="w-3.5 h-3.5 fill-current text-[#40B4F5]" viewBox="0 0 24 24">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.96 0-1.74.78-1.74 1.74 0 .96.78 1.74 1.74 1.74.96 0 1.74-.78 1.74-1.74Z" />
                        </svg>
                      ) : (
                        <svg className="w-3.5 h-3.5 fill-current text-[#40B4F5]" viewBox="0 0 24 24">
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069M12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                        </svg>
                      )}
                    </div>
                    <span className="text-xs font-bold text-[#40B4F5] uppercase tracking-wider">
                      {activeModalPlatform === 'linkedin' ? 'LINKEDIN SHARING GUIDE' : 'INSTAGRAM SHARING GUIDE'}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setActiveModalPlatform(null)}
                    className="text-[#8A95A3] hover:text-white transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* MODAL VARIANT 1: LINKEDIN */}
                {activeModalPlatform === 'linkedin' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                        YOUR GENESIS PASS IS READY!
                      </h4>
                      <p className="text-xs text-[#40B4F5] mt-1 font-semibold">
                        &quot;Just one more step to share your GENESIS moment.&quot;
                      </p>
                    </div>

                    {/* Three Numbered Steps */}
                    <div className="space-y-3 bg-[#161C25] p-4 border border-[#515963]/60 text-xs">
                      
                      {/* Step 01 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          01
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            YOUR PASS IS DOWNLOADED
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            Your personalized GENESIS attendee pass has been saved to your Downloads folder.
                          </div>
                        </div>
                      </div>

                      {/* Step 02 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          02
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            YOUR CAPTION IS COPIED
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            Your personalized LinkedIn caption has been copied. Paste it into your post.
                          </div>
                        </div>
                      </div>

                      {/* Step 03 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          03
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            ADD YOUR PASS &amp; PUBLISH
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            On LinkedIn, click Start a post, attach your downloaded GENESIS pass, paste your caption and publish!
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* MODAL VARIANT 2: INSTAGRAM */}
                {activeModalPlatform === 'instagram' && (
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-tight">
                        YOUR GENESIS PASS IS READY!
                      </h4>
                      <p className="text-xs text-[#40B4F5] mt-1 font-semibold">
                        &quot;Your pass is downloaded and your Instagram caption is copied.&quot;
                      </p>
                    </div>

                    {/* Four Numbered Steps */}
                    <div className="space-y-3 bg-[#161C25] p-4 border border-[#515963]/60 text-xs">
                      
                      {/* Step 01 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          01
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            OPEN INSTAGRAM
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            Instagram has been opened in a new tab.
                          </div>
                        </div>
                      </div>

                      {/* Step 02 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          02
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            CREATE YOUR POST
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            Click Create (+) and select Post.
                          </div>
                        </div>
                      </div>

                      {/* Step 03 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          03
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            UPLOAD YOUR PASS
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            Choose the GENESIS attendee pass from your Downloads folder.
                          </div>
                        </div>
                      </div>

                      {/* Step 04 */}
                      <div className="flex items-start gap-3">
                        <span className="px-2 py-0.5 bg-[#1B222C] border border-[#40B4F5] text-[#40B4F5] text-[11px] font-bold shrink-0 mt-0.5">
                          04
                        </span>
                        <div>
                          <div className="text-white font-bold uppercase tracking-wide">
                            ADD YOUR CAPTION
                          </div>
                          <div className="text-[#A0AEC0] text-[11px] mt-0.5 leading-relaxed">
                            Paste your copied caption, check your post and share it!
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

                {/* Clipboard Fallback: If clipboard write was blocked */}
                {clipboardFailed && (
                  <div className="p-3 bg-amber-950/40 border border-amber-500/50 text-[11px] text-amber-200 space-y-2">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <AlertCircle className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>Select &amp; Copy Caption Below:</span>
                    </div>
                    <textarea
                      readOnly
                      rows={3}
                      value={activeModalPlatform === 'linkedin' ? linkedinCaption : instagramCaption}
                      className="w-full bg-[#161C25] border border-[#515963] p-2 text-[10px] text-white font-mono select-all focus:outline-none"
                    />
                  </div>
                )}

                {/* Modal Action Buttons: OPEN AGAIN + COPY AGAIN */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="button"
                    onClick={() => handleOpenPlatformAgain(activeModalPlatform)}
                    className="flex-1 py-3 px-4 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-white hover:text-[#40B4F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4 text-[#40B4F5]" />
                    <span>
                      {activeModalPlatform === 'linkedin' ? 'OPEN LINKEDIN AGAIN' : 'OPEN INSTAGRAM AGAIN'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleCopyCaptionAgain(activeModalPlatform)}
                    className="flex-1 py-3 px-4 bg-[#161C25] border border-[#515963] hover:border-[#40B4F5] text-white hover:text-[#40B4F5] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
                  >
                    <Copy className="w-4 h-4 text-[#40B4F5]" />
                    <span>{copiedFeedback ? 'COPIED!' : 'COPY CAPTION AGAIN'}</span>
                  </button>
                </div>

                {/* Primary Action Button: DONE */}
                <button
                  type="button"
                  onClick={() => setActiveModalPlatform(null)}
                  className="w-full py-3.5 bg-[#40B4F5] hover:bg-[#55C5FF] text-[#15212C] font-black text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-[0_0_20px_rgba(64,180,245,0.35)]"
                >
                  DONE
                </button>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </section>
    );
  }
);

SocialSharingSection.displayName = 'SocialSharingSection';

export default SocialSharingSection;
