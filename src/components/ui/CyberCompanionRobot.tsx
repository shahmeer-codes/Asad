'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Bot, Sparkles, Navigation, ChevronRight, Eye } from 'lucide-react';

interface CyberCompanionRobotProps {
    scrollProgress: number;
    currentSection: number;
    onNavigate: (section: number) => void;
}

const SECTION_GUIDANCE = [
    {
        title: 'PRISM CORE',
        status: 'SYSTEM ONLINE',
        message: 'Welcome! Scroll to explore Asad Aziz AI Engineer Portfolio.',
        nextLabel: 'Who I Am',
        nextSection: 1,
    },
    {
        title: 'WHO I AM',
        status: 'SCANNING AI GRADUATE PROFILE',
        message: 'Asad Aziz — AI graduate focused on ML, NLP, and RAG pipelines.',
        nextLabel: 'View Skills',
        nextSection: 2,
    },
    {
        title: 'TECH STACK MATRIX',
        status: 'ANALYZING SKILLS',
        message: 'Python (Expert), ML, PyTorch, RAG, Streamlit, and FastAPI.',
        nextLabel: 'View Projects',
        nextSection: 3,
    },
    {
        title: 'SELECTED PROJECTS',
        status: 'INSPECTING REPOSITORIES',
        message: 'Sentellect, AI Scholar Hunt, Brain Tumor Detection & Smart Image Vision.',
        nextLabel: 'View Education',
        nextSection: 4,
    },
    {
        title: 'ACADEMIC BACKGROUND',
        status: 'DEGREE & ACADEMICS',
        message: 'BS in Artificial Intelligence @ KFUEIT (Rahim Yar Khan, PK).',
        nextLabel: 'View Experience',
        nextSection: 5,
    },
    {
        title: 'WORK EXPERIENCE',
        status: 'INDUSTRY INTERNSHIPS',
        message: 'Virtual Soft (AI Engineer), Code Celix & SkillifyZone Internships.',
        nextLabel: 'View Credentials',
        nextSection: 6,
    },
    {
        title: 'CREDENTIALS & CERTS',
        status: 'VERIFYING CERTIFICATES',
        message: 'Stanford ML Specialization, Microsoft Azure, DeepLearning.AI & JHU.',
        nextLabel: 'Contact Asad',
        nextSection: 7,
    },
    {
        title: 'LET\'S WORK TOGETHER',
        status: 'COMMUNICATION READY',
        message: 'Send a message or connect via LinkedIn, GitHub, WhatsApp & Kaggle.',
        nextLabel: 'Back to Top',
        nextSection: 0,
    },
];

export default function CyberCompanionRobot({
    scrollProgress,
    currentSection,
    onNavigate,
}: CyberCompanionRobotProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isExpanded, setIsExpanded] = useState(true);

    useEffect(() => {
        setIsExpanded(true);
    }, [currentSection]);

    const activeGuidance = SECTION_GUIDANCE[currentSection] || SECTION_GUIDANCE[0];
    const isVisible = scrollProgress > 0.02;

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.8 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 120 }}
                    className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto select-none"
                >
                    {/* Dynamic Interactive Holographic HUD Speech Bubble */}
                    <AnimatePresence mode="wait">
                        {isExpanded && (
                            <motion.div
                                key={currentSection}
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                transition={{ duration: 0.3 }}
                                className="mb-3 max-w-xs sm:max-w-sm rounded-2xl border border-cyan-500/40 bg-slate-950/90 p-4 shadow-2xl backdrop-blur-2xl shadow-cyan-500/20 text-left relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(6,182,212,0.05)_50%,transparent_100%)] animate-pulse pointer-events-none" />

                                <div className="flex items-center justify-between border-b border-cyan-500/20 pb-2 mb-2">
                                    <div className="flex items-center gap-2">
                                        <span className="relative flex h-2 w-2">
                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                                        </span>
                                        <span className="text-[10px] font-mono tracking-wider text-cyan-400 uppercase font-bold">
                                            {activeGuidance.status}
                                        </span>
                                    </div>
                                    <button
                                        onClick={() => setIsExpanded(false)}
                                        className="text-slate-500 hover:text-cyan-400 text-xs font-mono transition-colors"
                                    >
                                        [HIDE]
                                    </button>
                                </div>

                                <h4 className="text-xs font-mono font-extrabold text-cyan-300 tracking-wider flex items-center gap-1.5 mb-1">
                                    <Sparkles className="h-3 w-3 text-cyan-400" />
                                    {activeGuidance.title}
                                </h4>
                                <p className="text-xs leading-relaxed text-slate-300 font-sans">
                                    {activeGuidance.message}
                                </p>

                                <button
                                    onClick={() => onNavigate(activeGuidance.nextSection)}
                                    className="mt-3 flex items-center justify-between w-full rounded-lg border border-cyan-500/30 bg-cyan-950/40 px-3 py-1.5 text-[11px] font-mono font-semibold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 group"
                                >
                                    <span className="flex items-center gap-1.5">
                                        <Navigation className="h-3 w-3 text-cyan-400 group-hover:rotate-45 transition-transform" />
                                        {activeGuidance.nextLabel}
                                    </span>
                                    <ChevronRight className="h-3 w-3 text-cyan-400 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Cyberpunk Companion Avatar Card */}
                    <motion.div
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsExpanded(!isExpanded)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative cursor-pointer flex items-center gap-3 rounded-full border border-cyan-500/50 bg-slate-950/90 p-2 pr-4 shadow-xl backdrop-blur-2xl shadow-cyan-500/25 transition-all duration-300 hover:border-cyan-400 hover:shadow-cyan-500/40"
                    >
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border border-cyan-400/60 shadow-inner bg-slate-900 flex-shrink-0">
                            <Image
                                src="/assets/robot-avatar.png"
                                alt="Cyberpunk AI Robot Mascot with VR Visor"
                                fill
                                className="object-cover object-top filter brightness-110 contrast-125"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 via-transparent to-transparent animate-pulse pointer-events-none" />
                        </div>

                        <div className="flex flex-col text-left">
                            <div className="flex items-center gap-1.5">
                                <Bot className="h-3.5 w-3.5 text-cyan-400" />
                                <span className="text-xs font-mono font-bold tracking-wider text-slate-100 group-hover:text-cyan-300">
                                    ASAD AI GUIDE
                                </span>
                            </div>
                            <span className="text-[10px] font-mono text-cyan-400/80 flex items-center gap-1">
                                <Eye className="h-2.5 w-2.5 text-cyan-400" />
                                VR VISOR ACTIVE
                            </span>
                        </div>

                        <span className="relative flex h-2 w-2 ml-1">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400"></span>
                        </span>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
