'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { Cpu, MapPin, ExternalLink } from 'lucide-react';

interface NavbarProps {
    currentSection: number;
    onNavigate: (section: number) => void;
}

export default function Navbar({ currentSection, onNavigate }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 py-4">
                {/* Branding & Location Pill */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => onNavigate(0)}
                        className="flex items-center gap-2 text-sm sm:text-base font-mono font-black tracking-widest text-slate-100 transition-colors hover:text-cyan-400"
                    >
                        <Cpu className="h-5 w-5 text-cyan-400 animate-pulse" />
                        <span className="uppercase">{siteConfig.name}</span>
                    </button>
                    <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-slate-950/70 px-2.5 py-0.5 text-[10px] font-mono text-cyan-300 backdrop-blur-md">
                        <MapPin className="h-3 w-3 text-cyan-400" />
                        <span>{siteConfig.location}</span>
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-1 rounded-full border border-slate-800/80 bg-slate-950/80 px-3 py-1.5 shadow-xl backdrop-blur-2xl lg:flex">
                    {siteConfig.nav.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => onNavigate(item.section)}
                            className={`relative rounded-full px-3.5 py-1.5 text-xs font-mono font-semibold transition-all ${currentSection === item.section
                                    ? 'text-cyan-300'
                                    : 'text-slate-400 hover:text-slate-100'
                                }`}
                        >
                            {currentSection === item.section && (
                                <motion.span
                                    layoutId="nav-indicator"
                                    className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-500/30"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                            <span className="relative z-10">{item.label}</span>
                        </button>
                    ))}
                    {/* Resume ↗ CTA Link */}
                    <a
                        href={siteConfig.social.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 inline-flex items-center gap-1 rounded-full border border-cyan-500/40 bg-cyan-950/60 px-3 py-1 text-xs font-mono font-bold text-cyan-300 transition-colors hover:bg-cyan-500/30 hover:border-cyan-400"
                    >
                        <span>Resume</span>
                        <ExternalLink className="h-3 w-3 text-cyan-400" />
                    </a>
                </div>

                {/* Mobile Hamburger Button */}
                <button
                    className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle navigation"
                >
                    <span
                        className={`h-0.5 w-5 bg-cyan-400 transition-transform ${mobileOpen ? 'translate-y-2 rotate-45' : ''
                            }`}
                    />
                    <span
                        className={`h-0.5 w-5 bg-cyan-400 transition-opacity ${mobileOpen ? 'opacity-0' : ''
                            }`}
                    />
                    <span
                        className={`h-0.5 w-5 bg-cyan-400 transition-transform ${mobileOpen ? '-translate-y-2 -rotate-45' : ''
                            }`}
                    />
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute inset-x-0 top-0 z-40 flex min-h-screen flex-col items-center justify-center gap-5 bg-slate-950/95 backdrop-blur-2xl lg:hidden font-mono"
                    >
                        <div className="flex items-center gap-2 mb-4 text-xs text-cyan-400 border border-cyan-500/30 px-3 py-1 rounded-full">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{siteConfig.location}</span>
                        </div>
                        {siteConfig.nav.map((item) => (
                            <button
                                key={item.label}
                                onClick={() => {
                                    onNavigate(item.section);
                                    setMobileOpen(false);
                                }}
                                className={`text-lg font-bold transition-colors ${currentSection === item.section ? 'text-cyan-400' : 'text-slate-300'
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <a
                            href={siteConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 flex items-center gap-2 rounded-full border border-cyan-500/50 bg-cyan-950/80 px-6 py-2.5 text-sm font-bold text-cyan-300"
                        >
                            <span>Resume ↗</span>
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
