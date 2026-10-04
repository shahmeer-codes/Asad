'use client';

import { useRef, useCallback, RefObject } from 'react';

interface MagneticOptions {
    strength?: number;
    radius?: number;
}

export function useMagnetic<T extends HTMLElement>(
    options: MagneticOptions = {}
): {
    ref: RefObject<T | null>;
    onMouseMove: (e: React.MouseEvent) => void;
    onMouseLeave: () => void;
} {
    const { strength = 0.3, radius = 100 } = options;
    const ref = useRef<T>(null);

    const onMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current) return;
            const rect = ref.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distX = e.clientX - centerX;
            const distY = e.clientY - centerY;
            const dist = Math.sqrt(distX * distX + distY * distY);

            if (dist < radius) {
                const translateX = distX * strength;
                const translateY = distY * strength;
                ref.current.style.transform = `translate(${translateX}px, ${translateY}px)`;
            }
        },
        [strength, radius]
    );

    const onMouseLeave = useCallback(() => {
        if (!ref.current) return;
        ref.current.style.transform = 'translate(0px, 0px)';
        ref.current.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
        setTimeout(() => {
            if (ref.current) ref.current.style.transition = '';
        }, 400);
    }, []);

    return { ref, onMouseMove, onMouseLeave };
}
