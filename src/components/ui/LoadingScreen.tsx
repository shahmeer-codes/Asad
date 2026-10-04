'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    onComplete: () => void;
}

const steps = [
    'Loading assets...',
    'Initializing WebGL...',
    'Building neural environment...',
    'Preparing workspace...',
    'Portfolio ready.',
];

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const [stepIndex, setStepIndex] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        let frame: number;
        let start: number | null = null;
        const duration = 2200;

        const animate = (ts: number) => {
            if (!start) start = ts;
            const elapsed = ts - start;
            const p = Math.min(1, elapsed / duration);

            // Ease out
            const eased = 1 - Math.pow(1 - p, 3);
            setProgress(Math.round(eased * 100));
            setStepIndex(Math.min(steps.length - 1, Math.floor(eased * steps.length)));

            if (p < 1) {
                frame = requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    setVisible(false);
                    setTimeout(onComplete, 500);
                }, 400);
            }
        };

        frame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frame);
    }, [onComplete]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-br from-white via-slate-50 to-blue-50"
                >
                    <motion.h2
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-4 text-sm font-semibold tracking-[0.3em] text-slate-400"
                    >
                        INITIALIZING AI SYSTEM
                    </motion.h2>

                    <motion.p
                        key={stepIndex}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="mb-8 text-sm text-slate-500"
                    >
                        {steps[stepIndex]}
                    </motion.p>

                    {/* Progress bar */}
                    <div className="h-1 w-64 overflow-hidden rounded-full bg-slate-100">
                        <motion.div
                            className="h-full rounded-full bg-gradient-to-r from-blue-400 to-cyan-400"
                            style={{ width: `${progress}%` }}
                            transition={{ ease: 'easeOut' }}
                        />
                    </div>

                    <p className="mt-3 text-xs font-medium text-slate-400">{progress}%</p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
