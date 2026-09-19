import React, { useState, useEffect } from 'react';
import { Cpu, Terminal, Check } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const steps = [
    "INITIALIZING AUTOMATION ENGINE",
    "LOADING 3D WORLD & SPATIAL MESHES",
    "COMPILING SHADERS & ASCII MATRIX",
    "SYNCHRONIZING SIMULATION PIPELINES",
    "SYSTEM READY"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsDone(true);
            setTimeout(() => onComplete?.(), 500);
          }, 300);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 15 + 8);
        return Math.min(next, 100);
      });
    }, 90);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const stepIdx = Math.min(Math.floor((progress / 100) * steps.length), steps.length - 1);
    setStage(stepIdx);
  }, [progress, steps.length]);

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col justify-center items-center bg-void-950 px-6 transition-opacity duration-500 ${
        progress === 100 ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
      }`}
    >
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 scanlines opacity-30 pointer-events-none" />

      <div className="max-w-md w-full p-6 sm:p-8 rounded tech-card border border-white/10 relative z-10">
        {/* Top Header */}
        <div className="flex items-center justify-between font-tech text-xs text-neutral-400 pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00e5ff]" />
            <span className="text-white font-semibold tracking-wider">NAVEEN KUMAR</span>
          </div>
          <span className="text-[10px] text-cyan-400/90 font-medium tracking-widest">
            AI_AUTO // BLR
          </span>
        </div>

        {/* Diagnostic Progress Bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between font-tech text-xs mb-2">
            <span className="text-neutral-300 tracking-wider">DIAGNOSTIC BOOT</span>
            <span className="text-cyan-400 font-semibold">{progress}%</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-100 ease-out shadow-[0_0_8px_#00e5ff]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Active Stage Indicator */}
        <div className="font-tech text-xs flex items-center gap-2.5 text-neutral-300">
          {progress === 100 ? (
            <Check size={13} className="text-emerald-400" />
          ) : (
            <Terminal size={13} className="text-cyan-400 animate-spin" />
          )}
          <span className="tracking-wider uppercase">{steps[stage]}</span>
        </div>
      </div>
    </div>
  );
}
