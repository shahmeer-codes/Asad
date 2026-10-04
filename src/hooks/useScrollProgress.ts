'use client';

import { useState, useEffect, useCallback } from 'react';

export function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [section, setSection] = useState(0);

    // 8 Sections: 0 (Hero), 1 (About), 2 (Skills), 3 (Projects), 4 (Education), 5 (Experience), 6 (Credentials), 7 (Contact)
    const sectionBreakpoints = [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 0.95];
    const totalSections = 8;

    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;
        const scrolled = window.scrollY / scrollHeight;
        const clampedProgress = Math.min(1, Math.max(0, scrolled));
        setProgress(clampedProgress);

        let currentSection = 0;
        for (let i = sectionBreakpoints.length - 1; i >= 0; i--) {
            if (clampedProgress >= sectionBreakpoints[i] - 0.05) {
                currentSection = i;
                break;
            }
        }
        setSection(currentSection);
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const scrollToSection = useCallback((sectionIndex: number) => {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const targetScroll = sectionBreakpoints[sectionIndex] * scrollHeight;
        window.scrollTo({ top: targetScroll, behavior: 'smooth' });
    }, []);

    return { progress, section, totalSections, scrollToSection };
}
