import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Mail, Copy, Check, Send, ArrowUp, Linkedin, ExternalLink, Heart, Sparkles, MapPin } from 'lucide-react';

export default function ContactSection({ scrollProgress = 0, onBackToTop }) {
  // Shot 12: Final Descent, Contact & Thank You Terminal (0.95 - 1.00)
  let opacity = 0;
  if (scrollProgress >= 0.945) {
    opacity = (scrollProgress - 0.945) / 0.025;
    opacity = Math.min(Math.max(opacity, 0), 1);
  }

  const [copiedField, setCopiedField] = useState(null);
  const contact = PORTFOLIO_DATA.identity.contact;

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section
      style={{ opacity }}
      className={`fixed inset-0 z-20 flex flex-col justify-center items-center px-4 sm:px-10 md:px-16 transition-opacity duration-300 ${
        opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto flex flex-col justify-between max-h-[92vh] overflow-y-auto py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Top Terminal Status */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-400 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_#10b981]" />
            <span className="text-white font-semibold tracking-wider">COMMS CHANNEL OPEN</span>
            <span className="text-neutral-500">// READY</span>
          </div>
          <span className="text-[10px] hidden sm:inline-block text-neutral-400">
            [ BANGALORE // 12.9716° N, 77.5946° E ]
          </span>
        </div>

        {/* Editorial Headline */}
        <div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight uppercase font-sans">
            LET'S<br />
            BUILD<br />
            SOMETHING<br />
            <span className="text-cyan-400">USEFUL.</span>
          </h2>
        </div>

        {/* Two Contact Action Cards: Email & LinkedIn (Phone removed as requested) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* 1. Direct Email Card */}
          <div className="p-4 sm:p-5 rounded tech-card border border-white/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-neutral-400 font-tech text-[10px] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Mail size={12} className="text-cyan-400" />
                  DIRECT EMAIL
                </span>
                <span className="text-cyan-400 font-medium">PRIMARY</span>
              </div>
              <div className="text-xs sm:text-sm font-tech font-semibold text-white truncate" title={contact.email}>
                {contact.email}
              </div>
              <div className="flex items-center gap-1 text-[10px] font-tech text-neutral-400 mt-1">
                <MapPin size={9} className="text-cyan-400" />
                <span>{contact.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
              <a
                href={`mailto:${contact.email}`}
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 hover:border-cyan-400 font-tech text-xs text-cyan-300 transition-all duration-200"
              >
                <Send size={11} />
                <span>EMAIL ME</span>
              </a>
              <button
                onClick={() => handleCopy(contact.email, 'email')}
                className="px-2.5 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-tech text-xs text-neutral-300 transition-all duration-200"
                title="Copy Email Address"
              >
                {copiedField === 'email' ? (
                  <Check size={12} className="text-emerald-400" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          </div>

          {/* 2. Professional LinkedIn Profile Card */}
          <div className="p-4 sm:p-5 rounded tech-card border border-cyan-500/30 bg-cyan-950/10 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-neutral-400 font-tech text-[10px] uppercase mb-2">
                <span className="flex items-center gap-1.5">
                  <Linkedin size={12} className="text-cyan-400" />
                  LINKEDIN PROFILE
                </span>
                <span className="text-emerald-400 font-medium">VERIFIED</span>
              </div>
              <div className="text-xs sm:text-sm font-tech font-semibold text-white truncate" title={contact.linkedin}>
                in/naveen-kalimuthu-77523037b
              </div>
              <div className="text-[10px] font-tech text-neutral-400 mt-1">
                Professional Network & Connect
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 pt-3 border-t border-white/[0.06]">
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/50 hover:border-cyan-300 font-tech text-xs text-white transition-all duration-200 shadow-[0_0_12px_rgba(0,229,255,0.15)]"
              >
                <span>OPEN LINKEDIN</span>
                <ExternalLink size={11} />
              </a>
              <button
                onClick={() => handleCopy(contact.linkedin, 'linkedin')}
                className="px-2.5 py-1.5 rounded bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 font-tech text-xs text-neutral-300 transition-all duration-200"
                title="Copy LinkedIn URL"
              >
                {copiedField === 'linkedin' ? (
                  <Check size={12} className="text-emerald-400" />
                ) : (
                  <Copy size={12} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            THANK YOU CARD (Requested by user)
            ───────────────────────────────────────────────────────────── */}
        <div className="p-5 sm:p-6 rounded tech-card border border-cyan-500/20 bg-gradient-to-r from-void-900 via-void-850 to-void-900 relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-center gap-2 font-tech text-[10px] text-cyan-400 tracking-widest uppercase mb-2">
            <Sparkles size={12} className="text-cyan-400 animate-pulse" />
            <span>TRANSMISSION COMPLETE // APPRECIATION</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-white mb-2 font-sans">
            Thank You for Visiting
          </h3>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-sans max-w-2xl">
            Thank you for exploring my digital engineering world. Whether you are looking to automate semiconductor characterization workflows, accelerate simulation data processing, or engineer robust Python automation tools, I welcome the opportunity to connect and collaborate.
          </p>

          <div className="mt-3 flex items-center justify-between pt-3 border-t border-white/[0.06] font-tech text-[11px] text-neutral-400">
            <span className="text-cyan-300">— Naveen Kumar</span>
            <span className="text-neutral-500">AI Automation Engineer</span>
          </div>
        </div>

        {/* Terminal Footer */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-3 border-t border-white/10 font-tech text-xs text-neutral-500 gap-2">
          <div>
            <span className="text-neutral-300 font-medium">NAVEEN KUMAR</span>
            <span className="mx-2">•</span>
            <span>BANGALORE, INDIA</span>
          </div>

          <button
            onClick={onBackToTop}
            className="inline-flex items-center gap-1.5 text-cyan-400 hover:text-white transition-colors duration-200 self-start sm:self-center"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </section>
  );
}
