import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Award, Globe2, ExternalLink, CheckCircle } from 'lucide-react';

export default function CertLangSection({ scrollProgress = 0 }) {
  // Shot 11: Certification & Languages Matrix (0.92 - 0.965)
  let opacity = 0;
  if (scrollProgress >= 0.92 && scrollProgress <= 0.965) {
    if (scrollProgress < 0.935) {
      opacity = (scrollProgress - 0.92) / 0.015;
    } else if (scrollProgress > 0.955) {
      opacity = Math.max(0, 1 - (scrollProgress - 0.955) / 0.01);
    } else {
      opacity = 1;
    }
  }

  const certs = PORTFOLIO_DATA.certifications;
  const langs = PORTFOLIO_DATA.languages;

  return (
    <section
      style={{ opacity }}
      className={`fixed inset-0 z-20 flex flex-col justify-center items-center px-6 text-center transition-opacity duration-300 ${
        opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="max-w-2xl w-full mx-auto space-y-6 text-left">
        {/* Certification Module */}
        <div className="p-5 rounded tech-card border border-cyan-500/40 bg-void-900/80 shadow-[0_0_16px_rgba(0,229,255,0.08)]">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <div className="flex items-center gap-2 font-tech text-[11px] text-cyan-400 tracking-widest uppercase">
              <Award size={14} className="text-cyan-400" />
              <span>OFFICIAL CERTIFICATION // GOOGLE</span>
            </div>
            <span className="inline-flex items-center gap-1 font-tech text-[10px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-2 py-0.5 rounded">
              <CheckCircle size={10} />
              VERIFIED
            </span>
          </div>

          {certs.map((cert, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {cert.title}
                </h3>
                <span className="font-tech text-xs text-neutral-400">
                  {cert.issuer}
                </span>
              </div>

              {cert.verificationUrl && (
                <a
                  href={cert.verificationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 hover:border-cyan-400 font-tech text-xs text-cyan-300 transition-all duration-200 self-start sm:self-center"
                >
                  <span>VERIFY CREDENTIAL</span>
                  <ExternalLink size={12} />
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Languages Matrix */}
        <div className="p-5 rounded tech-card border border-white/[0.08]">
          <div className="flex items-center gap-2 font-tech text-[11px] text-neutral-400 tracking-widest uppercase mb-3">
            <Globe2 size={13} className="text-cyan-400" />
            <span>LANGUAGE FLUENCY MATRIX</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-tech">
            {langs.map((lang, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded bg-white/[0.02] border border-white/[0.05] text-center"
              >
                <div className="font-semibold text-xs text-white">
                  {lang.name}
                </div>
                <div className="text-[10px] text-cyan-400/80 mt-0.5">
                  {lang.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
