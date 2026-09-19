import React from 'react';
import { Terminal, ExternalLink, Linkedin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function Navigation({ onNavigate }) {
  const linkedinUrl = PORTFOLIO_DATA.identity.contact.linkedin;

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 sm:px-8 md:px-12 py-3.5 sm:py-4 flex items-center justify-between pointer-events-auto backdrop-blur-md bg-void-950/60 border-b border-white/[0.05]">
      {/* Brand Identity */}
      <button
        onClick={() => onNavigate?.('hero')}
        className="flex items-center gap-2 sm:gap-3 text-left focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none rounded"
        aria-label="Navigate to top identity"
      >
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
        <span className="font-tech text-xs tracking-widest uppercase text-white font-semibold">
          NAVEEN KUMAR
        </span>
        <span className="hidden sm:inline-block font-tech text-[10px] tracking-wider text-neutral-500 border-l border-white/10 pl-3">
          AI_AUTO // BLR
        </span>
      </button>

      {/* Navigation Links */}
      <nav className="flex items-center gap-4 sm:gap-6 md:gap-8 font-tech text-xs tracking-wider text-neutral-400">
        <button
          onClick={() => onNavigate?.('hero')}
          className="hover:text-cyan-400 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none rounded px-1"
        >
          01.<span className="hidden md:inline"> IDENTITY</span>
        </button>
        <button
          onClick={() => onNavigate?.('project')}
          className="hover:text-cyan-400 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none rounded px-1"
        >
          02.<span className="hidden md:inline"> IBIS_GEN</span>
        </button>
        <button
          onClick={() => onNavigate?.('experience')}
          className="hover:text-cyan-400 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none rounded px-1"
        >
          03.<span className="hidden md:inline"> WORK</span>
        </button>
        <button
          onClick={() => onNavigate?.('skills')}
          className="hover:text-cyan-400 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none rounded px-1"
        >
          04.<span className="hidden md:inline"> SKILLS</span>
        </button>
        <button
          onClick={() => onNavigate?.('contact')}
          className="hover:text-cyan-400 transition-colors duration-200 focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none rounded px-1"
        >
          05.<span className="hidden md:inline"> COMMS</span>
        </button>

        {/* Quick LinkedIn Link in Nav */}
        <a
          href={linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 text-neutral-400 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/40 px-2.5 py-1 rounded transition-all duration-200 focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none"
          title="Naveen Kumar LinkedIn"
        >
          <Linkedin size={11} className="text-cyan-400" />
          <span className="text-[10px]">LINKEDIN</span>
        </a>
      </nav>
    </header>
  );
}
