import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Briefcase, ArrowRight, CheckCircle, MapPin, Calendar } from 'lucide-react';

export default function ExperienceSection({ scrollProgress = 0 }) {
  // Shot 08: Experience Space (0.74 - 0.83)
  let opacity = 0;
  if (scrollProgress >= 0.74 && scrollProgress <= 0.83) {
    if (scrollProgress < 0.76) {
      opacity = (scrollProgress - 0.74) / 0.02;
    } else if (scrollProgress > 0.81) {
      opacity = Math.max(0, 1 - (scrollProgress - 0.81) / 0.02);
    } else {
      opacity = 1;
    }
  }

  const exps = PORTFOLIO_DATA.experience;

  return (
    <section
      style={{ opacity }}
      className={`fixed inset-0 z-20 flex flex-col justify-center px-6 md:px-14 lg:px-20 transition-opacity duration-300 ${
        opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto">
        {/* Header telemetry */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 font-tech text-xs text-cyan-400 tracking-widest uppercase mb-1">
              <Briefcase size={13} />
              <span>CAREER TIMELINE // VERIFIED CV EXPERIENCE</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Professional Evolution
            </h2>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-tech text-[10px] text-neutral-400 pt-2 sm:pt-0">
            <span>TECH SUPPORT</span>
            <ArrowRight size={12} className="text-cyan-400" />
            <span>AUTOMATION</span>
            <ArrowRight size={12} className="text-cyan-400" />
            <span className="text-cyan-400">SEMICONDUCTOR</span>
          </div>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exps.map((exp, idx) => (
            <div
              key={idx}
              className={`p-5 rounded tech-card border ${
                idx === 0
                  ? 'border-cyan-500/30 bg-void-900/80'
                  : 'border-white/[0.08] bg-void-900/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2 font-tech text-[10px]">
                <span className={`px-2 py-0.5 rounded font-semibold ${
                  idx === 0 ? 'bg-cyan-500/10 text-cyan-300 border border-cyan-500/30' : 'bg-white/[0.05] text-neutral-400'
                }`}>
                  {exp.period}
                </span>
                <span className="flex items-center gap-1 text-neutral-400">
                  <MapPin size={10} />
                  {exp.location}
                </span>
              </div>

              <h3 className="text-base sm:text-lg font-bold text-white mb-0.5">
                {exp.role}
              </h3>
              <h4 className="font-tech text-xs text-cyan-400/90 font-medium mb-3">
                {exp.company}
              </h4>

              <ul className="space-y-1.5 text-xs text-neutral-300 leading-relaxed font-sans mb-4">
                {exp.bullets.map((b, bi) => (
                  <li key={bi} className="flex items-start gap-2">
                    <span className="text-cyan-400 text-sm leading-none mt-0.5">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.05]">
                {exp.tags.map((t, ti) => (
                  <span key={ti} className="font-tech text-[9px] px-2 py-0.5 rounded bg-white/[0.03] text-neutral-400">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
