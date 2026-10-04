'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const dotRef = useRef<HTMLDivElement>(null);
    const ringRef = useRef<HTMLDivElement>(null);
    const [hovering, setHovering] = useState(false);
    const [visible, setVisible] = useState(false);
    const pos = useRef({ x: 0, y: 0 });
    const ringPos = useRef({ x: 0, y: 0 });

    useEffect(() => {
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
        setVisible(true);

        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
        };

        const onOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.closest('a, button, [role="button"], [data-cursor="pointer"]') ||
                target.tagName === 'A' || target.tagName === 'BUTTON'
            ) {
                setHovering(true);
            }
        };

        const onOut = () => setHovering(false);

        let raf: number;
        const loop = () => {
            if (dotRef.current) {
                dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`;
            }
            ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.18;
            ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.18;
            if (ringRef.current) {
                ringRef.current.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
            }
            raf = requestAnimationFrame(loop);
        };

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseover', onOver, { passive: true });
        document.addEventListener('mouseout', onOut, { passive: true });
        raf = requestAnimationFrame(loop);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseover', onOver);
            document.removeEventListener('mouseout', onOut);
            cancelAnimationFrame(raf);
        };
    }, []);

    if (!visible) return null;

    return (
        <>
            <style jsx global>{`
                * { cursor: none !important; }
            `}</style>
            {/* Cyan Dot */}
            <div
                ref={dotRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999]"
                style={{ marginLeft: '-4px', marginTop: '-4px' }}
            >
                <div
                    className={`rounded-full bg-cyan-400 shadow-md shadow-cyan-400/80 transition-all duration-200 ${hovering ? 'h-2.5 w-2.5 opacity-80' : 'h-2 w-2 opacity-100'
                        }`}
                />
            </div>
            {/* Outer Cyan/Violet Ring */}
            <div
                ref={ringRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998]"
                style={{ marginLeft: '-16px', marginTop: '-16px' }}
            >
                <div
                    className={`rounded-full border transition-all duration-300 ${hovering
                            ? 'h-12 w-12 border-cyan-400/80 bg-cyan-400/10 shadow-lg shadow-cyan-400/20'
                            : 'h-8 w-8 border-cyan-500/40 bg-transparent'
                        }`}
                    style={{ marginLeft: hovering ? '-8px' : '0', marginTop: hovering ? '-8px' : '0' }}
                />
            </div>
        </>
    );
}
