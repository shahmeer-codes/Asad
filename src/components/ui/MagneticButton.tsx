'use client';

import { useRef, type ReactNode } from 'react';
import { useMagnetic } from '@/hooks/useMagnetic';

interface MagneticButtonProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    href?: string;
    target?: string;
    rel?: string;
}

export default function MagneticButton({
    children,
    className = '',
    onClick,
    href,
    target,
    rel,
}: MagneticButtonProps) {
    const { ref, onMouseMove, onMouseLeave } = useMagnetic<HTMLElement>({ strength: 0.25, radius: 80 });
    const innerRef = useRef<HTMLElement>(null);

    if (href) {
        return (
            <a
                ref={ref as React.RefObject<HTMLAnchorElement | null>}
                href={href}
                target={target}
                rel={rel}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className={className}
            >
                {children}
            </a>
        );
    }

    return (
        <button
            ref={ref as React.RefObject<HTMLButtonElement | null>}
            onClick={onClick}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={className}
        >
            {children}
        </button>
    );
}
