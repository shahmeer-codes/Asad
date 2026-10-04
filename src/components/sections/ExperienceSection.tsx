'use client';

import { motion } from 'framer-motion';
import { experiences } from '@/data/experience';
import { Briefcase, Calendar, CheckCircle, Building2 } from 'lucide-react';

interface ExperienceSectionProps {
    visible: boolean;
}

export default function ExperienceSection({ visible }: ExperienceSectionProps) {
    return (
        <section
            id="experience"
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
                        <Briefcase className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="tracking-widest uppercase font-semibold">
                            WORK HISTORY &amp; INDUSTRY INTERNSHIPS
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                        WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">EXPERIENCE</span>
                    </h2>
                </div>

                {/* Work Experience Cards */}
                <div className="space-y-4 sm:space-y-5">
                    {experiences.map((exp, idx) => (
                        <motion.div
                            key={exp.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.15 }}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-950/90 p-5 backdrop-blur-2xl shadow-xl hover:border-cyan-500/80 transition-all duration-300"
                        >
                            <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                                <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2.5 py-0.5 rounded-full">
                                    0{idx + 1} · {exp.locationType}
                                </span>
                                <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                                    <Calendar className="h-3 w-3 text-cyan-400" />
                                    <span className="text-cyan-300 font-semibold">{exp.period}</span>
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-0.5">
                                {exp.role}
                            </h3>
                            <p className="text-xs sm:text-sm font-mono text-violet-300 mb-3 flex items-center gap-1.5">
                                <Building2 className="h-3.5 w-3.5 text-cyan-400" />
                                {exp.company}
                            </p>

                            <p className="text-xs text-slate-300 leading-relaxed mb-3">
                                {exp.description}
                            </p>

                            <div className="space-y-1.5 mb-3 pt-2.5 border-t border-slate-900">
                                {exp.achievements.map((item, i) => (
                                    <div key={i} className="flex items-start gap-1.5 text-xs text-slate-300 font-sans">
                                        <CheckCircle className="h-3.5 w-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex flex-wrap gap-1 pt-1">
                                {exp.technologies.map((tech) => (
                                    <span
                                        key={tech}
                                        className="rounded border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono text-cyan-300"
                                    >
                                        #{tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
