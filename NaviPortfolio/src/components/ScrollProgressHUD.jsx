import React from 'react';

export default function ScrollProgressHUD({ progress = 0 }) {
  const percentage = Math.round(progress * 100);

  return (
    <aside aria-label="System telemetry" className="fixed bottom-6 left-6 md:left-12 z-40 pointer-events-none font-tech text-[10px] text-neutral-500 tracking-wider flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <span className="text-cyan-400 font-semibold">STAGE:</span>
        <span className="text-neutral-300">
          {percentage < 15
            ? 'SYS_INITIALIZE'
            : percentage < 35
            ? 'HERO_DISCOVERY'
            : percentage < 50
            ? 'SEMICONDUCTOR_LAB'
            : percentage < 75
            ? 'IBIS_WORKFLOW'
            : percentage < 85
            ? 'CAREER_TIMELINE'
            : percentage < 94
            ? 'SKILLS_MATRIX'
            : 'TERMINAL_COMMS'}
        </span>
      </div>
      <div className="flex items-center gap-3">
        <span>PROG: {percentage.toString().padStart(3, '0')}%</span>
        <span>|</span>
        <span>LAT: 12.9716° N</span>
        <span>LON: 77.5946° E</span>
      </div>
    </aside>
  );
}
