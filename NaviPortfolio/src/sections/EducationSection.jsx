import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { GraduationCap } from 'lucide-react';

export default function EducationSection({ scrollProgress = 0 }) {
  // Shot 10: Education Quiet Space (0.88 - 0.93)
  let opacity = 0;
  if (scrollProgress >= 0.88 && scrollProgress <= 0.93) {
    if (scrollProgress < 0.90) {
      opacity = (scrollProgress - 0.88) / 0.02;
    } else if (scrollProgress > 0.92) {
      opacity = Math.max(0, 1 - (scrollProgress - 0.92) / 0.01);
    } else {
      opacity = 1;
    }
  }

  const edus = PORTFOLIO_DATA.education;

  return (
    <section
      style={{ opacity }}
      className={`fixed inset-0 z-20 flex flex-col justify-center items-center px-6 text-center transition-opacity duration-300 ${
        opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
    >
      <div className="max-w-2xl w-full mx-auto">
        <div className="inline-flex items-center gap-2 font-tech text-xs text-cyan-400 tracking-widest uppercase mb-4">
          <GraduationCap size={13} />
          <span>ACADEMIC FOUNDATION // COMPUTER SCIENCE</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-8">
          Education
        </h2>

        <div className="space-y-4 text-left">
          {edus.map((edu, idx) => (
            <div
              key={idx}
              className="p-5 rounded tech-card border border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-1">
                  {edu.degree}
                </h3>
                <p className="font-tech text-xs text-neutral-400">
                  {edu.institution}
                </p>
              </div>

              <div className="font-tech text-xs text-cyan-300 px-3 py-1 rounded bg-white/[0.03] border border-white/[0.08] self-start sm:self-center">
                {edu.period}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
