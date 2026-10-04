'use client';

import { useState, useEffect } from 'react';

type DeviceTier = 'high' | 'medium' | 'low';

interface ResponsiveConfig {
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
    deviceTier: DeviceTier;
    pixelRatio: number;
    particleCount: number;
    enablePostProcessing: boolean;
    enableShadows: boolean;
    enableFloating: boolean;
    isTouch: boolean;
    prefersReducedMotion: boolean;
}

export function useResponsive3D(): ResponsiveConfig {
    const [config, setConfig] = useState<ResponsiveConfig>({
        isMobile: false,
        isTablet: false,
        isDesktop: true,
        deviceTier: 'high',
        pixelRatio: 1.5,
        particleCount: 100,
        enablePostProcessing: true,
        enableShadows: true,
        enableFloating: true,
        isTouch: false,
        prefersReducedMotion: false,
    });

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            const isMobile = w < 768;
            const isTablet = w >= 768 && w < 1024;
            const isDesktop = w >= 1024;
            const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

            const cores = navigator.hardwareConcurrency || 4;
            const dpr = window.devicePixelRatio || 1;

            let deviceTier: DeviceTier = 'high';
            if (isMobile || cores <= 2) deviceTier = 'low';
            else if (isTablet || cores <= 4) deviceTier = 'medium';

            const tierConfig = {
                high: { pixelRatio: Math.min(dpr, 2), particles: 120, post: true, shadows: true, floating: true },
                medium: { pixelRatio: Math.min(dpr, 1.5), particles: 60, post: false, shadows: true, floating: true },
                low: { pixelRatio: Math.min(dpr, 1), particles: 30, post: false, shadows: false, floating: false },
            };

            const tc = tierConfig[deviceTier];
            setConfig({
                isMobile, isTablet, isDesktop, deviceTier,
                pixelRatio: tc.pixelRatio,
                particleCount: tc.particles,
                enablePostProcessing: !prefersReducedMotion && tc.post,
                enableShadows: tc.shadows,
                enableFloating: !prefersReducedMotion && tc.floating,
                isTouch,
                prefersReducedMotion,
            });
        };

        update();
        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, []);

    return config;
}
