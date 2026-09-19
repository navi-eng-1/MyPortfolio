import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

export default function AudioAmbience() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio('/audio/bgm.mp3');
    audio.loop = true;
    audio.volume = 0.35;
    audioRef.current = audio;

    // Optional autoplay on first user interaction if not yet started
    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // Autoplay policy prevented immediate playback
          });
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
    };
  }, []);

  const toggleAudio = (e) => {
    e.stopPropagation();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(err => console.warn("Playback error:", err));
    }
  };

  return (
    <aside aria-label="Background music controls" className="fixed bottom-6 right-6 md:right-12 z-40">
      <button
        onClick={toggleAudio}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full tech-card border transition-all duration-300 font-tech text-[10px] focus-visible:ring-1 focus-visible:ring-cyan-400 focus:outline-none ${
          isPlaying
            ? 'border-cyan-400/50 bg-cyan-950/40 text-cyan-300 shadow-[0_0_12px_rgba(0,229,255,0.2)]'
            : 'border-white/10 hover:border-white/30 text-neutral-400 hover:text-white'
        }`}
        title={isPlaying ? "Pause Ambient Music" : "Play Ambient Music (Technology Ambient Piano)"}
      >
        {isPlaying ? (
          <>
            <div className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-2 bg-cyan-400 animate-pulse" />
              <span className="w-0.5 h-3 bg-cyan-400 animate-bounce" />
              <span className="w-0.5 h-1.5 bg-cyan-400 animate-pulse" />
            </div>
            <span className="hidden sm:inline tracking-wider">BGM ON</span>
          </>
        ) : (
          <>
            <VolumeX size={12} className="text-neutral-500" />
            <span className="hidden sm:inline tracking-wider">BGM OFF</span>
          </>
        )}
      </button>
    </aside>
  );
}
