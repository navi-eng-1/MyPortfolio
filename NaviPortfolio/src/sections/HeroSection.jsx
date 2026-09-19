import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, ArrowDown, MapPin, ArrowRight } from 'lucide-react';

export default function HeroSection({ scrollProgress = 0, onExplore }) {
  // Shot 01: System Initializing & Establishing Title (0.00 - 0.10)
  let initOpacity = 0;
  if (scrollProgress < 0.10) {
    initOpacity = Math.max(0, 1 - scrollProgress * 10);
  }

  // Shot 03: Hero Reveal & Photo Section (0.14 - 0.36)
  let heroOpacity = 0;
  if (scrollProgress >= 0.14 && scrollProgress <= 0.36) {
    if (scrollProgress < 0.20) {
      heroOpacity = (scrollProgress - 0.14) / 0.06;
    } else if (scrollProgress > 0.30) {
      heroOpacity = Math.max(0, 1 - (scrollProgress - 0.30) / 0.06);
    } else {
      heroOpacity = 1;
    }
  }

  // Smooth scroll-driven parallax movement for the photo
  // Creates the dynamic physical motion the user loved
  const photoParallaxY = (scrollProgress - 0.22) * 140;

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          SHOT 01: OPENING INTERFACE (0 - 10%)
          Clean, expansive, high-end establishing screen.
          ───────────────────────────────────────────────────────────── */}
      <section
        style={{ opacity: initOpacity }}
        className={`fixed inset-0 z-20 flex flex-col justify-between items-center px-6 py-20 text-center transition-opacity duration-300 ${
          initOpacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Top Diagnostic Identifier */}
        <div className="pt-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 font-tech text-[11px] tracking-widest uppercase shadow-[0_0_15px_rgba(0,229,255,0.1)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
            <span>SYSTEM ONLINE // AUTOMATION ENGINE ACTIVE</span>
          </div>
        </div>

        {/* Center Editorial Title */}
        <div className="my-auto max-w-3xl">
          <div className="font-tech text-xs tracking-ultra text-cyan-400 uppercase mb-3">
            BANGALORE // KARNATAKA // INDIA
          </div>
          
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight text-white mb-4 leading-none">
            {PORTFOLIO_DATA.identity.name}
          </h1>

          <p className="font-tech text-base sm:text-xl text-cyan-300 font-medium tracking-wider mb-6">
            {PORTFOLIO_DATA.identity.title}
          </p>

          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {PORTFOLIO_DATA.identity.secondaryTitles.map((item, idx) => (
              <span
                key={idx}
                className="font-tech text-[10px] tracking-wider px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-neutral-300"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Prompter */}
        <div className="pb-4 font-tech text-xs text-neutral-400 tracking-widest flex flex-col items-center gap-2">
          <span className="animate-pulse">[ SCROLL TO ENTER DIGITAL ENVIRONMENT ]</span>
          <ArrowDown size={14} className="text-cyan-400 animate-bounce" />
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SHOT 03: HERO REVEAL (14 - 36%)
          Photo placed on the left side of the name with scroll motion!
          ───────────────────────────────────────────────────────────── */}
      <section
        style={{ opacity: heroOpacity }}
        className={`fixed inset-0 z-20 flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 transition-opacity duration-300 ${
          heroOpacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* ── LEFT COLUMN: USER'S PHOTO WITH SCROLL MOTION ── */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div
              style={{
                transform: `translateY(${photoParallaxY}px)`,
                transition: 'transform 0.1s ease-out'
              }}
              className="relative w-56 sm:w-64 md:w-72 lg:w-80 rounded-lg overflow-hidden tech-card border border-cyan-500/40 shadow-[0_0_35px_rgba(0,229,255,0.18)]"
            >
              {/* Corner Cyan Brackets */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none" />

              {/* Top Image Telemetry Bar */}
              <div className="absolute top-0 inset-x-0 bg-void-950/80 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between z-20 border-b border-white/10 font-tech text-[9px] text-cyan-300">
                <span>AVATAR // IDENT_01</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ONLINE
                </span>
              </div>

              {/* The Photo Asset */}
              <img
                src="/assets/ascii-avatar.png"
                alt="Naveen Kumar"
                className="w-full h-auto object-cover filter contrast-125 brightness-105 block pt-5"
              />

              {/* Holographic Scanline Overlay */}
              <div className="absolute inset-0 scanlines opacity-50 pointer-events-none" />

              {/* Bottom Image Sub-bar */}
              <div className="absolute bottom-0 inset-x-0 bg-void-950/85 backdrop-blur-sm px-3 py-1 flex items-center justify-between z-20 border-t border-white/10 font-tech text-[9px] text-neutral-400">
                <span>NAVEEN KUMAR</span>
                <span className="text-cyan-400">BLR // IN</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT COLUMN: NAME & EDITORIAL CONTENT ── */}
          <div className="lg:col-span-7 text-left">
            {/* Spatial Telemetry Tag */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00e5ff]" />
              <span className="font-tech text-xs uppercase tracking-widest text-cyan-400 font-medium">
                ENGINEERING IDENTITY // CORE
              </span>
            </div>

            {/* Name & Title */}
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-2 leading-none">
              {PORTFOLIO_DATA.identity.name}
            </h2>

            <h3 className="font-tech text-base sm:text-xl text-cyan-300 font-semibold tracking-wider mb-5">
              {PORTFOLIO_DATA.identity.title}
            </h3>

            {/* Verified Personal Statement Quote */}
            <blockquote className="p-4 sm:p-5 rounded border-l-2 border-cyan-400 bg-void-900/85 backdrop-blur-md mb-6 text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans shadow-xl">
              "{PORTFOLIO_DATA.identity.statement}"
            </blockquote>

            {/* Location & Explore Action Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-3 border-t border-white/[0.08]">
              <div className="flex items-center gap-2 font-tech text-xs text-neutral-400">
                <MapPin size={13} className="text-cyan-400" />
                <span>{PORTFOLIO_DATA.identity.contact.location}</span>
              </div>

              <button
                onClick={onExplore}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 hover:border-cyan-300 font-tech text-xs text-cyan-300 transition-all duration-200 shadow-[0_0_15px_rgba(0,229,255,0.12)]"
              >
                <span>EXPLORE WORKFLOW</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
