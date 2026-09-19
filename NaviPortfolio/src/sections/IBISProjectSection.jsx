import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Cpu, Terminal, FileCode, CheckCircle2, Layers, Sliders, ShieldCheck } from 'lucide-react';
import IBISSimulationVideo from '../components/IBISSimulationVideo';

export default function IBISProjectSection({ scrollProgress = 0 }) {
  const project = PORTFOLIO_DATA.heroProject;

  // Shot 05: Engineering World Entrance (0.38 - 0.48)
  let s05Opacity = 0;
  if (scrollProgress >= 0.38 && scrollProgress <= 0.48) {
    if (scrollProgress < 0.42) {
      s05Opacity = (scrollProgress - 0.38) / 0.04;
    } else if (scrollProgress > 0.45) {
      s05Opacity = Math.max(0, 1 - (scrollProgress - 0.45) / 0.03);
    } else {
      s05Opacity = 1;
    }
  }

  // Shot 06: Active IBIS Pipeline Showcase (0.48 - 0.68)
  let s06Opacity = 0;
  if (scrollProgress >= 0.48 && scrollProgress <= 0.68) {
    if (scrollProgress < 0.52) {
      s06Opacity = (scrollProgress - 0.48) / 0.04;
    } else if (scrollProgress > 0.64) {
      s06Opacity = Math.max(0, 1 - (scrollProgress - 0.64) / 0.04);
    } else {
      s06Opacity = 1;
    }
  }

  // Shot 07: Project Deep Dive & Simulation Video (0.68 - 0.76)
  let s07Opacity = 0;
  if (scrollProgress >= 0.68 && scrollProgress <= 0.76) {
    if (scrollProgress < 0.70) {
      s07Opacity = (scrollProgress - 0.68) / 0.02;
    } else if (scrollProgress > 0.74) {
      s07Opacity = Math.max(0, 1 - (scrollProgress - 0.74) / 0.02);
    } else {
      s07Opacity = 1;
    }
  }

  // Calculate current active pipeline stage (0 to 8) based on progress (0.50 -> 0.68)
  const activeStageIndex = Math.min(
    Math.max(Math.floor(((scrollProgress - 0.50) / 0.18) * project.pipelineStages.length), 0),
    project.pipelineStages.length - 1
  );

  return (
    <>
      {/* ─────────────────────────────────────────────────────────────
          SHOT 05: TRANSITION INTO SEMICONDUCTOR ENGINEERING VOID
          ───────────────────────────────────────────────────────────── */}
      <section
        style={{ opacity: s05Opacity }}
        className={`fixed inset-0 z-20 flex flex-col justify-center items-start px-8 md:px-20 transition-opacity duration-300 ${
          s05Opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="max-w-xl">
          <div className="flex items-center gap-2 mb-3 font-tech text-xs text-cyan-400 tracking-widest uppercase">
            <Cpu size={14} className="text-cyan-400 animate-pulse" />
            <span>[ SYSTEM TRANSITION // SEMICONDUCTOR WORKFLOW ]</span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">
            Digital Engineering Environment
          </h2>

          <p className="font-tech text-xs md:text-sm text-neutral-400 tracking-wider leading-relaxed mb-6">
            Entering the automated simulation results extraction, processing, and IBIS model generation pipeline.
          </p>

          <div className="flex flex-wrap gap-2 font-tech text-[10px] text-cyan-300">
            {['SIMULATION DATA', 'DATA EXTRACTION', 'PROCESSING', 'VALIDATION', 'MODEL GENERATION'].map((label, i) => (
              <span key={i} className="px-2 py-1 rounded bg-white/[0.04] border border-white/[0.08]">
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SHOT 06: HERO PROJECT PIPELINE SHOWCASE
          ───────────────────────────────────────────────────────────── */}
      <section
        style={{ opacity: s06Opacity }}
        className={`fixed inset-0 z-20 flex items-center justify-between px-6 md:px-14 lg:px-20 transition-opacity duration-300 ${
          s06Opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        {/* Left HUD: Title & Verified Role */}
        <div className="max-w-md hidden lg:block">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-tech text-[10px] tracking-widest mb-3">
            <Terminal size={11} />
            <span>HERO PROJECT // RATING 5</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2 leading-tight">
            {project.title}
          </h2>

          <p className="font-tech text-xs text-cyan-300 font-medium tracking-wider mb-4">
            ROLE: {project.role}
          </p>

          <div className="p-4 rounded tech-card text-xs text-neutral-300 leading-relaxed font-sans mb-4">
            {project.summary}
          </div>

          <div className="flex flex-wrap gap-1.5 font-tech text-[10px]">
            {project.tools.map((t, i) => (
              <span key={i} className="px-2 py-0.5 rounded bg-white/[0.05] text-neutral-300 border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right HUD: Real-time 9-Stage Pipeline Telemetry */}
        <div className="w-full lg:max-w-md p-5 rounded tech-card border border-white/10 ml-auto">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
            <span className="font-tech text-xs text-cyan-400 font-semibold tracking-wider">
              AUTOMATION PIPELINE [{activeStageIndex + 1}/9]
            </span>
            <span className="font-tech text-[10px] text-neutral-400">
              ACTIVE STAGE
            </span>
          </div>

          <div className="space-y-3">
            {project.pipelineStages.map((stage, idx) => {
              const isActive = idx === activeStageIndex;
              const isPast = idx < activeStageIndex;

              return (
                <div
                  key={stage.id}
                  className={`p-2.5 rounded transition-all duration-200 border ${
                    isActive
                      ? 'bg-cyan-500/10 border-cyan-400 text-white shadow-[0_0_12px_rgba(0,229,255,0.15)]'
                      : isPast
                      ? 'bg-white/[0.02] border-white/[0.06] text-neutral-400'
                      : 'bg-transparent border-transparent text-neutral-600'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-tech font-medium">
                    <span className="flex items-center gap-2">
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-cyan-400 animate-pulse' : isPast ? 'bg-cyan-700' : 'bg-neutral-700'}`} />
                      {stage.label}
                    </span>
                    {isPast && <CheckCircle2 size={12} className="text-cyan-400" />}
                  </div>
                  {isActive && (
                    <p className="mt-1 text-[11px] text-neutral-300 font-sans pl-3.5">
                      {stage.desc}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SHOT 07: PROJECT DEEP DIVE & ANIMATION VIDEO SIMULATION
          ───────────────────────────────────────────────────────────── */}
      <section
        style={{ opacity: s07Opacity }}
        className={`fixed inset-0 z-20 flex items-center justify-center px-4 sm:px-12 md:px-16 transition-opacity duration-300 ${
          s07Opacity > 0.05 ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
      >
        <div className="max-w-4xl w-full max-h-[92vh] overflow-y-auto p-4 sm:p-6 rounded tech-card border border-cyan-500/25 shadow-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 font-tech text-xs text-cyan-400 tracking-widest uppercase mb-1">
                <Sliders size={13} />
                <span>IBIS MODEL VALIDATION & SIMULATION FEED</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Signal Integrity & Characteristic Waveforms
              </h3>
            </div>
            <span className="font-tech text-[10px] text-cyan-300 bg-cyan-950/40 border border-cyan-500/30 px-2.5 py-1 rounded self-start sm:self-center">
              CUSTOMTKINTER / PYSIDE6 / EDA
            </span>
          </div>

          {/* Dedicated Procedural IBIS Simulation Video Player */}
          <IBISSimulationVideo />

          {/* Verified Engineering Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-tech text-center">
            <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.06]">
              <div className="text-cyan-400 font-bold text-sm">6 INPUTS</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">.list .csv .log +</div>
            </div>
            <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.06]">
              <div className="text-cyan-400 font-bold text-sm">4 CURVES</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">PU / PD / PWR / GND</div>
            </div>
            <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.06]">
              <div className="text-cyan-400 font-bold text-sm">3 CORNERS</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Typ / Min / Max</div>
            </div>
            <div className="p-2.5 rounded bg-white/[0.03] border border-white/[0.06]">
              <div className="text-cyan-400 font-bold text-sm">100% IBIS</div>
              <div className="text-[10px] text-neutral-400 mt-0.5">Verified .ibs Output</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
