import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X, ArrowUpRight } from 'lucide-react';
import { eventConfig } from '../data/eventConfig';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (location.pathname === '/') {
        const sections = ['hero', 'about', 'experience', 'pass-cta'];
        const scrollPos = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPos >= top && scrollPos < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#' + id);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const goToCreatePass = () => {
    setMobileMenuOpen(false);
    navigate('/create-pass');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 transition-all duration-300">
      <nav
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-300 ${
          isScrolled
            ? 'glass-panel bg-genesis-dark/80 backdrop-blur-xl border border-genesis-electric/30 shadow-glow-electric/20 py-3 px-4 sm:px-6'
            : 'glass-panel bg-genesis-dark/50 backdrop-blur-md border border-genesis-electric/15 py-4 px-4 sm:px-6'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Left: AWS SBG Logo + KCC ITM */}
          <div
            onClick={() => handleNavClick('hero')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
          >
            <div className="relative">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-genesis-dark border border-genesis-electric/40 p-1.5 flex items-center justify-center transition-all duration-300 group-hover:border-genesis-electric group-hover:shadow-glow-electric">
                <img
                  src="/assets/aws-sbg-logo.png"
                  alt="AWS SBG Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-genesis-electric animate-ping" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-genesis-electric" />
            </div>

            <div className="flex flex-col text-left">
              <span className="text-xs sm:text-sm font-bold tracking-wider text-white flex items-center gap-1 group-hover:text-genesis-cyan transition-colors">
                AWS SBG
                <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-genesis-electric/10 border border-genesis-electric/30 text-genesis-electric font-mono">
                  KCC ITM
                </span>
              </span>
              <span className="text-[10px] text-genesis-muted font-medium tracking-tight hidden sm:block">
                GENESIS 2026
              </span>
            </div>
          </div>

          {/* Centre: Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-xl bg-genesis-midnight/40 border border-white/5">
            {eventConfig.navigation.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = location.pathname === '/' && activeSection === targetId;

              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(targetId)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-genesis-electric bg-genesis-electric/10 border border-genesis-electric/30 shadow-sm'
                      : 'text-genesis-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right: CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={goToCreatePass}
              className="glow-btn relative group px-5 py-2.5 rounded-xl bg-gradient-to-r from-genesis-electric to-genesis-cyan text-genesis-midnight font-bold text-xs sm:text-sm tracking-wide flex items-center gap-2 cursor-pointer shadow-glow-electric transition-all"
            >
              <Sparkles className="w-4 h-4 text-genesis-midnight transition-transform group-hover:rotate-12" />
              <span>CREATE YOUR PASS</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-genesis-midnight/60 border border-genesis-electric/20 text-genesis-muted hover:text-white focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-genesis-electric" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-genesis-electric/15 flex flex-col gap-2">
            {eventConfig.navigation.map((item) => {
              const targetId = item.href.replace('#', '');
              const isActive = location.pathname === '/' && activeSection === targetId;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(targetId)}
                  className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-genesis-electric bg-genesis-electric/10 border border-genesis-electric/30'
                      : 'text-genesis-muted hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
            <div className="pt-2">
              <button
                onClick={goToCreatePass}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-genesis-electric to-genesis-cyan text-genesis-midnight font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-glow-electric cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>CREATE YOUR PASS</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
