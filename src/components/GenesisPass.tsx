import React from 'react';
import { Calendar, MapPin, User } from 'lucide-react';
import '../styles/GenesisPass.css';

export interface GenesisPassProps {
  studentName?: string;
  studentPhoto?: string | null;
  collegeName?: string;
  highlight?: string;
  className?: string;
}

export const GenesisPass = React.forwardRef<HTMLDivElement, GenesisPassProps>(
  (
    {
      studentName = 'AYUSH KUMAR',
      studentPhoto = null,
      collegeName: _collegeName,
      highlight = 'Explored the world of AWS.',
      className = '',
    },
    ref
  ) => {
    const rawName = studentName?.trim() || 'AYUSH KUMAR';
    const displayName = rawName.toUpperCase();
    const displayHighlight = highlight?.trim() || 'Explored the world of AWS.';

    // College name is permanently frozen and cannot be changed
    const displayCollege = 'KCC INSTITUTE OF TECHNOLOGY & MANAGEMENT';

    // Dynamic typography scaling based on name character count
    const getNameClass = (name: string) => {
      const len = name.length;
      if (len > 22) return 'pass-name-long';
      if (len > 14) return 'pass-name-medium';
      return 'pass-name-short';
    };

    return (
      <div ref={ref} className={`genesis-pass-container ${className}`}>
        <div className="genesis-pass-card">

          {/* 1. Subtle Ambient Background Grid */}
          <div className="pass-bg-grid" />

          {/* 2. Authentic Oversized AWS SBG Microchip Logo Watermark */}
          <div className="pass-bg-watermark">
            <img
              src="/assets/aws-sbg-logo-transparent.png"
              alt="AWS SBG Microchip Architecture Watermark"
              className="pass-bg-watermark-img"
              crossOrigin="anonymous"
            />
          </div>

          {/* 3. Vector Microchip Pin Patterns & Circuit Border Traces */}
          <svg
            className="pass-svg-circuit-overlay"
            viewBox="0 0 768 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="chipTraceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#40B4F5" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#515963" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#40B4F5" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {/* Main Outer Technical Border */}
            <rect
              x="16"
              y="16"
              width="736"
              height="992"
              stroke="#515963"
              strokeWidth="1.5"
            />

            {/* Inner Precision Circuit Line */}
            <rect
              x="24"
              y="24"
              width="720"
              height="976"
              stroke="rgba(81, 89, 99, 0.45)"
              strokeWidth="1"
              strokeDasharray="8 4"
            />

            {/* 4 Geometric Corner Brackets */}
            {/* Top-Left */}
            <path d="M 12 40 L 12 12 L 40 12" stroke="#40B4F5" strokeWidth="2.5" />
            <rect x="14" y="14" width="4" height="4" fill="#40B4F5" />
            <path d="M 28 28 L 48 28" stroke="#40B4F5" strokeWidth="1.5" />
            <circle cx="48" cy="28" r="2.5" fill="#40B4F5" />

            {/* Top-Right */}
            <path d="M 728 12 L 756 12 L 756 40" stroke="#40B4F5" strokeWidth="2.5" />
            <rect x="750" y="14" width="4" height="4" fill="#40B4F5" />
            <path d="M 740 28 L 720 28" stroke="#40B4F5" strokeWidth="1.5" />
            <circle cx="720" cy="28" r="2.5" fill="#40B4F5" />

            {/* Bottom-Left */}
            <path d="M 12 984 L 12 1012 L 40 1012" stroke="#40B4F5" strokeWidth="2.5" />
            <rect x="14" y="1006" width="4" height="4" fill="#40B4F5" />
            <path d="M 28 996 L 48 996" stroke="#40B4F5" strokeWidth="1.5" />
            <circle cx="48" cy="996" r="2.5" fill="#40B4F5" />

            {/* Bottom-Right */}
            <path d="M 728 1012 L 756 1012 L 756 984" stroke="#40B4F5" strokeWidth="2.5" />
            <rect x="750" y="1006" width="4" height="4" fill="#40B4F5" />
            <path d="M 740 996 L 720 996" stroke="#40B4F5" strokeWidth="1.5" />
            <circle cx="720" cy="28" r="2.5" fill="#40B4F5" />

            {/* Microchip Pin Patterns Along Left Edge (3 pins per cluster matching AWS SBG geometry) */}
            {/* Upper Cluster */}
            <rect x="6" y="190" width="10" height="6" fill="#40B4F5" />
            <rect x="6" y="206" width="10" height="6" fill="#40B4F5" />
            <rect x="6" y="222" width="10" height="6" fill="#40B4F5" />
            {/* Center Cluster */}
            <rect x="6" y="490" width="10" height="6" fill="#40B4F5" />
            <rect x="6" y="506" width="10" height="6" fill="#40B4F5" />
            <rect x="6" y="522" width="10" height="6" fill="#40B4F5" />
            {/* Lower Cluster */}
            <rect x="6" y="790" width="10" height="6" fill="#40B4F5" />
            <rect x="6" y="806" width="10" height="6" fill="#40B4F5" />
            <rect x="6" y="822" width="10" height="6" fill="#40B4F5" />

            {/* Microchip Pin Patterns Along Right Edge */}
            {/* Upper Cluster */}
            <rect x="752" y="190" width="10" height="6" fill="#40B4F5" />
            <rect x="752" y="206" width="10" height="6" fill="#40B4F5" />
            <rect x="752" y="222" width="10" height="6" fill="#40B4F5" />
            {/* Center Cluster */}
            <rect x="752" y="490" width="10" height="6" fill="#40B4F5" />
            <rect x="752" y="506" width="10" height="6" fill="#40B4F5" />
            <rect x="752" y="522" width="10" height="6" fill="#40B4F5" />
            {/* Lower Cluster */}
            <rect x="752" y="790" width="10" height="6" fill="#40B4F5" />
            <rect x="752" y="806" width="10" height="6" fill="#40B4F5" />
            <rect x="752" y="822" width="10" height="6" fill="#40B4F5" />

            {/* Microchip Pin Patterns Along Top Edge */}
            <rect x="230" y="6" width="6" height="10" fill="#40B4F5" />
            <rect x="246" y="6" width="6" height="10" fill="#40B4F5" />
            <rect x="262" y="6" width="6" height="10" fill="#40B4F5" />

            <rect x="500" y="6" width="6" height="10" fill="#40B4F5" />
            <rect x="516" y="6" width="6" height="10" fill="#40B4F5" />
            <rect x="532" y="6" width="6" height="10" fill="#40B4F5" />

            {/* Microchip Pin Patterns Along Bottom Edge */}
            <rect x="230" y="1008" width="6" height="10" fill="#40B4F5" />
            <rect x="246" y="1008" width="6" height="10" fill="#40B4F5" />
            <rect x="262" y="1008" width="6" height="10" fill="#40B4F5" />

            <rect x="500" y="1008" width="6" height="10" fill="#40B4F5" />
            <rect x="516" y="1008" width="6" height="10" fill="#40B4F5" />
            <rect x="532" y="1008" width="6" height="10" fill="#40B4F5" />

            {/* Circuit Traces running parallel to the border */}
            <path
              d="M 16 350 L 36 350 L 52 366 L 52 440"
              stroke="#40B4F5"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <circle cx="52" cy="440" r="2.5" fill="#40B4F5" fillOpacity="0.7" />

            <path
              d="M 752 350 L 732 350 L 716 366 L 716 440"
              stroke="#40B4F5"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <circle cx="716" cy="440" r="2.5" fill="#40B4F5" fillOpacity="0.7" />

            <path
              d="M 16 670 L 36 670 L 52 654 L 52 610"
              stroke="#40B4F5"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <circle cx="52" cy="610" r="2.5" fill="#40B4F5" fillOpacity="0.7" />

            <path
              d="M 752 670 L 732 670 L 716 654 L 716 610"
              stroke="#40B4F5"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
            <circle cx="716" cy="610" r="2.5" fill="#40B4F5" fillOpacity="0.7" />
          </svg>

          {/* ==============================================================
              SECTION A: TOP BRANDING
              AWS SBG logo, institutional label & KCC ITM institutional logo
              ============================================================== */}
          <header className="pass-section pass-section-header">
            {/* Left: AWS SBG Logo & Label */}
            <div className="pass-brand-left">
              <div className="pass-sbg-logo-wrap">
                <img
                  src="/assets/aws-sbg-logo-transparent.png"
                  alt="AWS SBG"
                  className="pass-sbg-logo-img"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="pass-brand-text">
                <span className="pass-brand-title">
                  AWS STUDENT BUILDER GROUP
                </span>
                <span className="pass-brand-sub">
                  KCC ITM CHAPTER
                </span>
              </div>
            </div>

            {/* Right: KCC ITM Institutional Logo */}
            <div className="pass-brand-right">
              <div className="pass-kcc-logo-wrap">
                <img
                  src="/assets/kcc-logo.png"
                  alt="KCC ITM"
                  className="pass-kcc-logo-img"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </header>

          {/* ==============================================================
              SECTION B: EVENT IDENTITY
              GENESIS 2026 Title & Tagline with Microchip Accents
              ============================================================== */}
          <section className="pass-section pass-section-event">
            <div className="pass-event-badge">
              <span>✦</span>
              <span>GENESIS EXPERIENCE CARD</span>
              <span>✦</span>
            </div>

            <div className="pass-event-title-wrap">
              <span className="pass-event-title-main">GENESIS</span>
              <span className="pass-event-title-year">2026</span>
            </div>

            <div className="pass-event-tagline-wrap">
              <span className="pass-tagline-bracket">[</span>
              <span className="pass-event-tagline">
                DISCOVER AWS. UNLOCK THE CLOUD.
              </span>
              <span className="pass-tagline-bracket">]</span>
            </div>
          </section>

          {/* ==============================================================
              SECTION C: ATTENDEE PHOTOGRAPH
              Microchip-Framed Photo with Pin Leads & Corner Brackets
              ============================================================== */}
          <section className="pass-section pass-section-photo">
            <div className="pass-chip-frame-outer">
              {/* Left Pin Clusters (Inspired by AWS SBG Microchip) */}
              <div className="pass-photo-pin-group-left">
                <div className="pass-photo-pin" />
                <div className="pass-photo-pin" />
                <div className="pass-photo-pin" />
              </div>

              {/* Right Pin Clusters */}
              <div className="pass-photo-pin-group-right">
                <div className="pass-photo-pin" />
                <div className="pass-photo-pin" />
                <div className="pass-photo-pin" />
              </div>

              {/* 4 Corner Tech Accents */}
              <div className="pass-photo-tech-corner pass-photo-tl" />
              <div className="pass-photo-tech-corner pass-photo-tr" />
              <div className="pass-photo-tech-corner pass-photo-bl" />
              <div className="pass-photo-tech-corner pass-photo-br" />

              {/* Inner Photo Display Frame */}
              <div className="pass-chip-frame-inner">
                {studentPhoto ? (
                  <img
                    src={studentPhoto}
                    alt={displayName}
                    className="pass-photo-img"
                    crossOrigin="anonymous"
                  />
                ) : (
                  <div className="pass-photo-placeholder">
                    <User />
                    <span>ATTENDEE PHOTO</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* ==============================================================
              SECTION D: ATTENDEE DETAILS
              [ATTENDEE NAME], Microchip-Notched Role Pill, [COLLEGE / ORG]
              ============================================================== */}
          <section className="pass-section pass-section-attendee">
            <h2 className={`pass-attendee-name ${getNameClass(displayName)}`}>
              {displayName}
            </h2>

            <div className="pass-attendee-role-badge">
              <span className="pass-role-dot" />
              <span className="pass-role-text">I WAS PART OF GENESIS 2026</span>
              <span className="pass-role-dot" />
            </div>

            <p className="pass-attendee-college" title={displayCollege}>
              {displayCollege}
            </p>
          </section>

          {/* ==============================================================
              SECTION D2: MY GENESIS HIGHLIGHT (Compact Personal Recap)
              ============================================================== */}
          <section className="pass-section pass-section-highlight">
            <div className="pass-highlight-box">
              <span className="pass-highlight-label">MY GENESIS HIGHLIGHT</span>
              <p className="pass-highlight-text">&ldquo;{displayHighlight}&rdquo;</p>
            </div>
          </section>

          {/* ==============================================================
              SECTION E: EVENT DETAILS
              Confirmed: DATE (25 NOVEMBER 2026), VENUE (KCC ITM, GREATER NOIDA)
              ============================================================== */}
          <section className="pass-section pass-section-details">
            <div className="pass-details-box">
              {/* Date Column */}
              <div className="pass-detail-col">
                <span className="pass-detail-label">
                  <Calendar className="pass-detail-icon" />
                  EVENT DATE
                </span>
                <span className="pass-detail-value">
                  25 NOVEMBER 2026
                </span>
              </div>

              {/* Venue Column */}
              <div className="pass-detail-col pass-detail-col-border">
                <span className="pass-detail-label">
                  <MapPin className="pass-detail-icon" />
                  VENUE
                </span>
                <span className="pass-detail-value">
                  KCC ITM, GREATER NOIDA
                </span>
              </div>
            </div>
          </section>

          {/* ==============================================================
              SECTION F: FOOTER & EMOTIONAL CLOSING LINE
              ============================================================== */}
          <div className="pass-section pass-closing-wrap">
            <p className="pass-closing-line">
              ONE EVENT. NEW CONNECTIONS. ENDLESS POSSIBILITIES.
            </p>
            <footer className="pass-section-footer">
              <span className="pass-footer-motto">
                BUILD. EXPLORE. INNOVATE.
              </span>

              <div className="pass-footer-chip">
                <img
                  src="/assets/aws-sbg-logo-transparent.png"
                  alt="AWS SBG Chip"
                  className="pass-chip-icon"
                  crossOrigin="anonymous"
                />
                <span className="pass-footer-code">GENESIS // 2026</span>
              </div>
            </footer>
          </div>

        </div>
      </div>
    );
  }
);

GenesisPass.displayName = 'GenesisPass';
