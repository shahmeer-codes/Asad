'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
    User,
    Cpu,
    Boxes,
    Code2,
    Sparkles,
    ExternalLink,
    Layers,
    Terminal,
    Database,
    Globe,
    Radio,
    Share2,
    MapPin,
    MessageSquare,
} from 'lucide-react';
import { siteConfig } from '@/data/site';

interface MediaGridSectionProps {
    visible: boolean;
}

const MEDIA_CARDS = [
    {
        id: 'media-1',
        category: 'EDU-TECH · AI',
        title: 'Sentellect — Learning Through Emotions',
        description:
            'Adaptive learning platform for HSSC Mathematics personalizing content using student performance and mental-state data.',
        icon: Sparkles,
        stats: 'Adaptive AI Engine',
        tags: ['Education Technology', 'Adaptive Learning', 'Chatbot', 'Streamlit'],
    },
    {
        id: 'media-2',
        category: 'LLM · RAG',
        title: 'AI Scholar Hunt Platform',
        description:
            'Intelligent scholarship discovery chatbot helping students track required documents and find international scholarships.',
        icon: Database,
        stats: 'LLM + RAG System',
        tags: ['LLM & RAG', 'AI & NLP', 'Scholarship Guidance', 'LangChain'],
    },
    {
        id: 'media-3',
        category: 'MEDICAL · DEEP LEARNING',
        title: 'Brain Tumor Detection App',
        description:
            'Deep learning web app using MobileNetV2 with 95.7% accuracy, Grad-CAM XAI explainability, and PDF report generation.',
        icon: Cpu,
        stats: '95.7% Accuracy | Grad-CAM',
        tags: ['AI & MobileNetV2', 'GradCAM', 'Deep Learning', 'PyTorch'],
    },
    {
        id: 'media-4',
        category: 'COMPUTER VISION',
        title: 'Smart Image Vision & Tracking',
        description:
            'Real-time object detection and tracking system using YOLOv8 with SORT algorithm across video and camera feeds.',
        icon: Boxes,
        stats: 'YOLOv8 + SORT Tracking',
        tags: ['Computer Vision', 'Object Detection', 'Real-time Tracking'],
    },
];

export default function MediaGridSection({ visible }: MediaGridSectionProps) {
    return (
        <section
            id="media-grid"
            className={`pointer-events-none absolute inset-0 flex h-screen items-center justify-center px-4 sm:px-8 md:px-12 transition-opacity duration-700 overflow-y-auto py-16 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
        >
            <div className="w-full max-w-6xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-950/80 px-4 py-1.5 text-xs font-mono text-cyan-400 backdrop-blur-xl mb-3 shadow-lg"
                    >
                        <Radio className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                        <span className="tracking-widest uppercase font-semibold">
                            AI ENGINEER PROFILE &amp; MEDIA MATRIX
                        </span>
                    </motion.div>
                    <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                        SYSTEM ARCHITECT &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">PROFILE CARD</span>
                    </h2>
                </div>

                {/* Profile Card & Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
                    {/* Futuristic Glassmorphism Profile Border Card for Asad Aziz */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="group relative lg:col-span-1 rounded-3xl border border-cyan-500/40 bg-slate-950/90 p-6 backdrop-blur-2xl shadow-2xl shadow-cyan-500/15 flex flex-col justify-between overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-cyan-500/15 via-purple-600/5 to-transparent pointer-events-none" />
                        <div className="absolute top-0 right-0 p-4 opacity-20 font-mono text-[9px] text-cyan-400 tracking-widest pointer-events-none select-none">
                            [SYSTEM_ID: ASAD_AZIZ_AI]
                        </div>

                        <div>
                            {/* Profile Avatar Container */}
                            <div className="relative mx-auto mb-5 h-36 w-36 sm:h-44 sm:w-44 rounded-2xl p-1 bg-gradient-to-br from-cyan-400 via-violet-500 to-fuchsia-500 shadow-xl shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow duration-500">
                                <div className="relative h-full w-full rounded-xl overflow-hidden bg-slate-900">
                                    <Image
                                        src="/assets/engineer-avatar.jpg"
                                        alt="Asad Aziz — AI Engineer Profile Avatar"
                                        fill
                                        className="object-cover object-center filter brightness-105 contrast-110 group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent pointer-events-none" />
                                </div>
                                <div className="absolute -bottom-2 -right-2 flex items-center gap-1.5 rounded-full border border-cyan-400/60 bg-slate-950 px-3 py-1 text-[10px] font-mono text-cyan-300 shadow-md">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                                    </span>
                                    <span>OPEN FOR AI ROLES</span>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-white tracking-wide">
                                    {siteConfig.name}
                                </h3>
                                <p className="text-xs font-mono text-cyan-400 font-bold tracking-wider uppercase mt-1 mb-2">
                                    {siteConfig.profession}
                                </p>
                                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-300 mb-3 bg-slate-900/80 px-2.5 py-0.5 rounded-full border border-slate-800">
                                    <MapPin className="h-3 w-3 text-cyan-400" />
                                    <span>{siteConfig.location}</span>
                                </div>
                                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800/80">
                                    {siteConfig.subHeading}
                                </p>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 my-5 pt-3 border-t border-slate-800/80 text-center font-mono">
                                <div className="p-2 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <div className="text-base font-bold text-cyan-400">4+</div>
                                    <div className="text-[8px] text-slate-400 uppercase">Years</div>
                                </div>
                                <div className="p-2 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <div className="text-base font-bold text-violet-300">15+</div>
                                    <div className="text-[8px] text-slate-400 uppercase">Projects</div>
                                </div>
                                <div className="p-2 rounded-xl bg-slate-900/50 border border-slate-800">
                                    <div className="text-base font-bold text-emerald-400">25+</div>
                                    <div className="text-[8px] text-slate-400 uppercase">Certs</div>
                                </div>
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                            <a
                                href={siteConfig.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                            >
                                <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                                <span>GitHub</span>
                            </a>
                            <a
                                href={siteConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-1.5 flex-1 rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-xs font-mono font-medium text-slate-200 hover:border-cyan-400 hover:text-cyan-300 transition-all"
                            >
                                <Globe className="h-3.5 w-3.5 text-cyan-400" />
                                <span>LinkedIn</span>
                            </a>
                        </div>
                    </motion.div>

                    {/* Cards Grid */}
                    <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {MEDIA_CARDS.map((card) => {
                            const CardIcon = card.icon;
                            return (
                                <div
                                    key={card.id}
                                    className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:border-cyan-500/80 hover:shadow-xl hover:shadow-cyan-500/15"
                                >
                                    <div>
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-[10px] font-mono tracking-widest text-cyan-400 font-bold uppercase">
                                                {card.category}
                                            </span>
                                            <div className="flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                                <CardIcon className="h-3 w-3 text-cyan-400" />
                                                <span>{card.stats}</span>
                                            </div>
                                        </div>

                                        <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                                            {card.title}
                                        </h4>

                                        <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                            {card.description}
                                        </p>
                                    </div>

                                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-900">
                                        {card.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded border border-slate-800 bg-slate-900 px-2 py-0.5 text-[10px] font-mono text-slate-300 group-hover:border-cyan-500/30 group-hover:text-cyan-300 transition-colors"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
