'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useResponsive3D } from '@/hooks/useResponsive3D';

// UI Components
import Navbar from '@/components/ui/Navbar';
import LoadingScreen from '@/components/ui/LoadingScreen';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollProgressIndicator from '@/components/ui/ScrollProgressIndicator';
import SmoothScrollProvider from '@/components/ui/SmoothScrollProvider';

// Sections
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import EducationSection from '@/components/sections/EducationSection';
import ExperienceSection from '@/components/sections/ExperienceSection';
import CredentialsSection from '@/components/sections/CredentialsSection';
import Contact from '@/components/sections/Contact';

// Dynamically import 3D Experience (no ssr) to prevent hydration errors and improve initial load
const Experience = dynamic(() => import('@/components/3d/Experience'), {
  ssr: false,
});

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  const { progress, section, totalSections, scrollToSection } = useScrollProgress();
  const mousePos = useMousePosition();
  const responsiveConfig = useResponsive3D();

  useEffect(() => {
    // Check for webgl support before initializing
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch {
      setHasWebGL(false);
    }
  }, []);

  return (
    <SmoothScrollProvider>
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {isLoaded && hasWebGL && (
        <Experience
          scrollProgress={progress}
          mouseX={mousePos.normalizedX}
          mouseY={mousePos.normalizedY}
          {...responsiveConfig}
        />
      )}

      {isLoaded && !hasWebGL && (
        <div className="fixed inset-0 -z-10 flex items-center justify-center bg-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 opacity-50" />
        </div>
      )}

      {isLoaded && (
        <>
          {!responsiveConfig.isTouch && <CustomCursor />}

          <Navbar currentSection={section} onNavigate={scrollToSection} />

          <ScrollProgressIndicator
            progress={progress}
            currentSection={section}
            totalSections={totalSections}
          />

          {/* Fixed UI Layer for 8 Portfolio Sections */}
          <main className="fixed inset-0 z-10 pointer-events-none">
            <Hero visible={section === 0} onNavigate={scrollToSection} />
            <About visible={section === 1} />
            <Skills visible={section === 2} />
            <Projects visible={section === 3} />
            <EducationSection visible={section === 4} />
            <ExperienceSection visible={section === 5} />
            <CredentialsSection visible={section === 6} />
            <Contact visible={section === 7} />
          </main>

          {/* Physical scroll space for Lenis momentum scroll (800vh for 8 sections) */}
          <div className="h-[800vh] w-full" />
        </>
      )}
    </SmoothScrollProvider>
  );
}
