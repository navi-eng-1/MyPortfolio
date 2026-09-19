import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Experience from './three/Experience';
import Navigation from './components/Navigation';
import CustomCursor from './components/CustomCursor';
import LoadingScreen from './components/LoadingScreen';
import AudioAmbience from './components/AudioAmbience';
import ScrollProgressHUD from './components/ScrollProgressHUD';
import HeroSection from './sections/HeroSection';
import IBISProjectSection from './sections/IBISProjectSection';
import ExperienceSection from './sections/ExperienceSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import CertLangSection from './sections/CertLangSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef(null);
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const tickerCallback = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Master ScrollTrigger timeline
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2,
      onUpdate: (self) => {
        setScrollProgress(self.progress);
      },
    });

    return () => {
      st.kill();
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
    };
  }, []);

  const handleNavigate = (section) => {
    const targets = {
      hero: 0.22,
      project: 0.58,
      experience: 0.78,
      skills: 0.86,
      education: 0.91,
      contact: 0.98,
    };
    const targetProgress = targets[section] ?? 0;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * totalHeight;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, { duration: 1.8 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="relative min-h-[1000vh] bg-void-950 text-neutral-200">
      {/* Cinematic Non-blocking Loading Sequence */}
      <LoadingScreen />

      {/* Modern Compact Invert-Color Precision Cursor */}
      <CustomCursor />

      {/* Atmospheric Audio Ambience Control (YouTube BGM) */}
      <AudioAmbience />

      {/* Persistent 3D WebGL Canvas Layer */}
      <Experience scrollProgress={scrollProgress} />

      {/* Atmospheric Overlays */}
      <div className="fixed inset-0 pointer-events-none z-10 scanlines opacity-40" />
      <div className="fixed inset-0 pointer-events-none z-10 vignette" />

      {/* Global Navigation HUD */}
      <Navigation onNavigate={handleNavigate} />

      {/* Telemetry Progress Indicator */}
      <ScrollProgressHUD progress={scrollProgress} />

      {/* Editorial Content Layers */}
      <HeroSection
        scrollProgress={scrollProgress}
        onExplore={() => handleNavigate('project')}
      />

      <IBISProjectSection
        scrollProgress={scrollProgress}
      />

      <ExperienceSection
        scrollProgress={scrollProgress}
      />

      <SkillsSection
        scrollProgress={scrollProgress}
      />

      <EducationSection
        scrollProgress={scrollProgress}
      />

      <CertLangSection
        scrollProgress={scrollProgress}
      />

      <ContactSection
        scrollProgress={scrollProgress}
        onBackToTop={() => handleNavigate('hero')}
      />

      {/* Virtual Scroll Height Spacer */}
      <div className="relative z-0 pointer-events-none w-full h-[1000vh]" />
    </div>
  );
}
