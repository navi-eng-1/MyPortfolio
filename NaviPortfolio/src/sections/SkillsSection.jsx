import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Terminal, Sparkles } from 'lucide-react';

export default function SkillsSection({ scrollProgress = 0 }) {
  // Shot 09: Skills Matrix (0.82 - 0.89)
  let opacity = 0;
  if (scrollProgress >= 0.82 && scrollProgress <= 0.89) {
    if (scrollProgress < 0.84) {
      opacity = (scrollProgress - 0.82) / 0.02;
    } else if (scrollProgress > 0.87) {
      opacity = Math.max(0, 1 - (scrollProgress - 0.87) / 0.02);
    } else {
      opacity = 1;
    }
  }

  const skills = PORTFOLIO_DATA.technicalCompetencies;
  const tools = PORTFOLIO_DATA.toolsAndFrameworks;

  return (
    <section
      style={{ opacity }}
      className={`fixed inset-0 z-20 flex flex-col justify-center px-6 md:px-14 lg:px-20 transition-opacity duration-300 ${
        opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div>
            <div className="flex items-center gap-2 font-tech text-xs text-cyan-400 tracking-widest uppercase mb-1">
              <Cpu size={13} />
              <span>TECHNICAL COMPETENCY MATRIX</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Spatial Technology Graph
            </h2>
          </div>
          <div className="font-tech text-[10px] text-neutral-400">
            [ PYTHON-CENTRIC ARCHITECTURE ]
          </div>
        </div>

        {/* Spatial Grid Layout with Python Core Highlight */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className={`p-3.5 rounded tech-card transition-all duration-200 ${
                skill.primary
                  ? 'border-cyan-500/40 bg-cyan-950/20 shadow-[0_0_12px_rgba(0,229,255,0.08)]'
                  : 'border-white/[0.06] bg-void-900/60'
              }`}
            >
              <div className="flex items-center justify-between text-[10px] font-tech text-neutral-400 mb-1">
                <span>{skill.category}</span>
                <span className="text-cyan-400">{skill.exp}</span>
              </div>
              <h3 className={`font-semibold text-xs sm:text-sm ${skill.primary ? 'text-cyan-300' : 'text-neutral-200'}`}>
                {skill.name}
              </h3>
              <div className="font-tech text-[9px] text-neutral-500 mt-2">
                LAST USED: {skill.lastUsed}
              </div>
            </div>
          ))}
        </div>

        {/* Tools and Libraries Ribbon */}
        <div className="p-4 rounded tech-card border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-tech text-xs text-neutral-400 flex items-center gap-2">
            <Terminal size={12} className="text-cyan-400" />
            ENGINEERING TOOLCHAIN:
          </span>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool, idx) => (
              <span
                key={idx}
                className="font-tech text-xs px-3 py-1 rounded bg-white/[0.04] border border-white/[0.1] text-cyan-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
