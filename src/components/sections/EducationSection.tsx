'use client';

import { motion } from 'framer-motion';
import { educationList } from '@/data/education';
import { GraduationCap, MapPin, Calendar, BookOpen, Award } from 'lucide-react';

interface EducationSectionProps {
    visible: boolean;
}

export default function EducationSection({ visible }: EducationSectionProps) {
    return (
        <section
            id="education"
            className={`pointer-events-none absolute inset-0 flex h-screen items-center justify-center px-4 sm:px-8 transition-opacity duration-700 overflow-y-auto py-12 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
        >
            <div className="w-full max-w-5xl mx-auto max-h-[85vh] overflow-y-auto py-2 px-1">
                {/* Section Header */}
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-950/80 px-3.5 py-1 text-[11px] sm:text-xs font-mono text-cyan-400 backdrop-blur-xl mb-2 shadow-lg"
                    >
                        <GraduationCap className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="tracking-widest uppercase font-semibold">
                            ACADEMIC BACKGROUND &amp; DEGREE
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                        EDUCATION &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">ACADEMICS</span>
                    </h2>
                </div>

                {/* Education Timeline */}
                <div className="space-y-4 sm:space-y-5">
                    {educationList.map((edu, idx) => (
                        <motion.div
                            key={edu.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-950/90 p-5 backdrop-blur-2xl shadow-xl hover:border-cyan-500/80 transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                                    0{idx + 1} · ACADEMIC DEGREE
                                </span>
                                <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-400">
                                    <span className="flex items-center gap-1 text-cyan-300 font-semibold">
                                        <Calendar className="h-3 w-3 text-cyan-400" />
                                        {edu.period}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MapPin className="h-3 w-3 text-cyan-400" />
                                        {edu.location}
                                    </span>
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-1">
                                {edu.degree}
                            </h3>
                            <p className="text-xs sm:text-sm font-mono text-violet-300 mb-3 flex items-center gap-1.5">
                                <BookOpen className="h-3.5 w-3.5 text-cyan-400" />
                                {edu.institution}
                            </p>

                            {edu.fyp && (
                                <div className="mb-3 rounded-xl border border-cyan-500/30 bg-cyan-950/40 p-3 font-mono text-xs text-cyan-200">
                                    <div className="font-bold text-cyan-400 uppercase tracking-wider mb-0.5 text-[11px] flex items-center gap-1">
                                        <Award className="h-3.5 w-3.5 text-cyan-400" />
                                        FINAL YEAR PROJECT (FYP)
                                    </div>
                                    <div className="text-[11px] sm:text-xs">{edu.fyp}</div>
                                </div>
                            )}

                            <p className="text-xs text-slate-300 leading-relaxed">
                                {edu.details}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
