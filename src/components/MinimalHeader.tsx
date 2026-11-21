import React from 'react';

export const MinimalHeader: React.FC = () => {
  return (
    <header className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center">
      <div className="w-full flex items-center justify-between pb-2.5 border-b border-[#515963]/40">
        
        {/* Left: AWS Logo & AWS SBG Branding matching reference top-left */}
        <div className="flex items-center gap-4">
          {/* AWS White Smile Wordmark */}
          <div className="flex items-center">
            <svg
              className="h-7 w-auto text-white fill-current"
              viewBox="0 0 100 60"
              aria-label="AWS"
            >
              <path d="M34.7 32.8c-1.3 1.2-2.9 1.8-4.8 1.8-4.2 0-6.6-2.5-6.6-6.8 0-4.6 2.8-7.1 7.2-7.1 1.6 0 3 .4 4.2 1.1v-2.3c0-2.8-1.7-4.4-4.8-4.4-2 0-3.9.7-5.5 2l-1.6-3c2.2-1.7 4.9-2.6 7.9-2.6 5.3 0 8.3 2.9 8.3 8v13.5h-4.3v-2.2zm0-4.8c-.9-.6-2.1-1-3.4-1-2.4 0-3.8 1.2-3.8 3.5 0 2.2 1.2 3.4 3.4 3.4 1.4 0 2.6-.5 3.8-1.5v-4.4zM49.9 34.2h-4.4l-5.6-21.7h4.8l3.6 15.6 3.6-15.6h4.5l3.6 15.6 3.7-15.6h4.7l-5.7 21.7h-4.5l-3.8-15.8-3.9 15.8zM80.7 34.6c-4.4 0-7.8-1.8-9.8-5l3.6-2.3c1.4 2.2 3.6 3.5 6.3 3.5 3 0 4.8-1.4 4.8-3.4 0-1.8-1.3-2.8-4.6-3.7-4.4-1.2-7.2-2.8-7.2-6.5 0-4.1 3.5-7 8.3-7 3.6 0 6.6 1.4 8.4 3.9l-3.3 2.4c-1.3-1.7-3.1-2.6-5.1-2.6-2.5 0-4.1 1.3-4.1 3.1 0 1.6 1.1 2.5 4.3 3.4 4.8 1.3 7.6 2.9 7.6 6.8 0 4.4-3.7 7.4-9.2 7.4z" />
              <path d="M83.4 48.7c-13.6 7.9-33.1 9.4-49.8 4.2-2.1-.6-4.2-1.4-6.2-2.3-.9-.4-1.3-1.4-.9-2.3.4-.9 1.4-1.3 2.3-.9 1.9.9 3.9 1.6 5.9 2.2 15.8 4.9 34.4 3.5 47.4-4 1-.6 2.3-.3 2.9.7.6 1 .3 2.4-.6 3z" />
              <path d="M86.8 43.1c-1.4 1.8-3.9 4.3-5.8 5.7-.7.5-1.5.2-1.7-.5-.2-.7.1-1.5.8-1.9 1.5-1.1 3.6-3.1 4.7-4.5.3-.4.8-.4 1.1-.1.4.3.4.9.1 1.3z" />
            </svg>
          </div>

          <div className="h-6 w-px bg-[#515963]/50 hidden sm:block" />

          {/* AWS Student Builder Group at KCC ITM */}
          <div className="flex flex-col text-left">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-black font-mono tracking-wider text-white uppercase">
                AWS STUDENT BUILDER GROUP
              </span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-none bg-[#40B4F5]/15 border border-[#40B4F5]/40 text-[#40B4F5]">
                KCC ITM
              </span>
            </div>
            <span className="text-[11px] text-[#C4CBD3] font-mono tracking-tight hidden sm:block">
              KCC Institute of Technology &amp; Management
            </span>
          </div>
        </div>

        {/* Right: Technical Identification Badge */}
        <div className="flex items-center gap-2 font-mono">
          <div className="px-3 py-1.5 bg-[#1B222C] border border-[#515963]/60 flex items-center gap-2 text-xs">
            <span className="w-2 h-2 bg-[#40B4F5] animate-pulse" />
            <span className="font-extrabold text-[#40B4F5] tracking-widest uppercase">
              GENESIS 2026
            </span>
          </div>
        </div>

      </div>
    </header>
  );
};
