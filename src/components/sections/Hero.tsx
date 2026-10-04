'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { siteConfig } from '@/data/site';
import { Terminal, Cpu, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

interface HeroProps {
    visible: boolean;
    onNavigate: (section: number) => void;
}

export default function Hero({ visible, onNavigate }: HeroProps) {
    return (
        <section
            id="hero"
            className={`pointer-events-none absolute inset-0 flex h-screen items-center justify-center px-4 sm:px-6 transition-opacity duration-1000 overflow-y-auto py-12 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
        >
            {/* Background Image Layer */}
            <div className="absolute inset-0 -z-20 overflow-hidden select-none">
                <Image
                    src="/assets/hero-hand-prism.png"
                    alt="Dark cinematic hand holding glowing glass prism background"
                    fill
                    priority
                    className="object-cover object-center opacity-40 scale-105 filter brightness-90 contrast-125 transition-transform duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/40 to-slate-950" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/15 via-purple-600/10 to-transparent blur-3xl pointer-events-none" />
            </div>

            <div className="relative z-10 max-w-4xl text-center w-full max-h-[85vh] overflow-y-auto py-2 px-1">
                {/* Status Pill */}
                <motion.div
                    initial={{ y: -15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/40 bg-slate-950/80 px-3.5 py-1 text-[10px] sm:text-xs font-mono text-cyan-400 backdrop-blur-2xl shadow-xl"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
                    </span>
                    <span className="tracking-widest uppercase font-bold text-[10px] sm:text-[11px]">
                        {siteConfig.location} | AI ENGINEER
                    </span>
                    <ShieldCheck className="h-3.5 w-3.5 text-cyan-400 ml-1" />
                </motion.div>

                {/* Headline */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.7, delay: 0.1 }}
                    className="mb-3"
                >
                    <h2 className="text-[10px] sm:text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-1 font-bold">
                        ARTIFICIAL INTELLIGENCE ENGINEER
                    </h2>
                    <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase drop-shadow-md">
                        ASAD <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">AZIZ</span>
                    </h1>
                </motion.div>

                {/* Sub-heading */}
                <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.25 }}
                    className="mb-3 flex items-center justify-center gap-2 text-base font-mono tracking-wider text-cyan-300 sm:text-lg md:text-xl font-bold"
                >
                    <Cpu className="h-4 w-4 text-cyan-400 animate-pulse" />
                    <span>{siteConfig.subHeading}</span>
                </motion.p>

                {/* Tagline Bio */}
                <motion.p
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.35 }}
                    className="mx-auto mb-6 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-200 glass-card p-3.5 sm:p-4 rounded-xl border border-cyan-500/20 bg-slate-950/70 backdrop-blur-xl shadow-xl"
                >
                    {siteConfig.tagline}
                </motion.p>

                {/* Key Metrics Cards */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.45 }}
                    className="grid grid-cols-3 gap-2 sm:gap-3 max-w-xl mx-auto mb-6 text-center"
                >
                    {siteConfig.metrics.map((metric, idx) => (
                        <div
                            key={idx}
                            className="rounded-xl border border-slate-800 bg-slate-950/80 p-2.5 backdrop-blur-md shadow-lg"
                        >
                            <div className="text-xl sm:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 font-mono">
                                {metric.value}
                            </div>
                            <div className="text-[10px] font-mono font-bold text-slate-200 uppercase tracking-wider mt-0.5">
                                {metric.label}
                            </div>
                        </div>
                    ))}
                </motion.div>

                {/* Buttons */}
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.55 }}
                    className="flex flex-wrap items-center justify-center gap-3"
                >
                    <MagneticButton
                        onClick={() => onNavigate(3)}
                        className="group relative flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-violet-600 px-6 py-2.5 text-xs font-bold text-slate-950 shadow-lg shadow-cyan-500/30 transition-all hover:scale-105"
                    >
                        <Sparkles className="h-3.5 w-3.5 text-slate-950" />
                        <span className="tracking-wider uppercase">View My Work</span>
                        <ArrowRight className="h-3.5 w-3.5 text-slate-950 transition-transform group-hover:translate-x-1" />
                    </MagneticButton>

                    <MagneticButton
                        onClick={() => onNavigate(7)}
                        className="flex items-center gap-2 rounded-full border border-slate-700/80 bg-slate-950/80 px-6 py-2.5 text-xs font-semibold text-slate-200 backdrop-blur-xl transition-all hover:border-cyan-400 hover:text-cyan-300 shadow-lg"
                    >
                        <Terminal className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="tracking-wider uppercase">Get In Touch</span>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
}
