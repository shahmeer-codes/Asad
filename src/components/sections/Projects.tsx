'use client';

import { motion } from 'framer-motion';
import { projects } from '@/data/projects';
import { Sparkles, FolderGit2, ArrowUpRight, Code2 } from 'lucide-react';

interface ProjectsProps {
    visible: boolean;
}

export default function Projects({ visible }: ProjectsProps) {
    return (
        <section
            id="projects"
            className={`pointer-events-none absolute inset-0 flex h-screen items-center justify-center px-4 sm:px-8 transition-opacity duration-700 overflow-y-auto py-12 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
        >
            <div className="w-full max-w-6xl mx-auto max-h-[85vh] overflow-y-auto py-2 px-1">
                {/* Section Header */}
                <div className="text-center mb-6">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-slate-950/80 px-3.5 py-1 text-[11px] sm:text-xs font-mono text-cyan-400 backdrop-blur-xl mb-2 shadow-lg"
                    >
                        <FolderGit2 className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="tracking-widest uppercase font-semibold">
                            FEATURED PORTFOLIO REPOSITORIES
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                        SELECTED <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">WORK &amp; PROJECTS</span>
                    </h2>
                </div>

                {/* 4 Selected Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-950/90 p-5 backdrop-blur-2xl shadow-xl hover:border-cyan-500/80 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex flex-wrap items-center justify-between gap-1.5 mb-2.5">
                                    <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                                        {project.codeNumber} · {project.category}
                                    </span>
                                    {project.metrics && (
                                        <span className="text-[9px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                                            {project.metrics}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-lg font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-2">
                                    {project.title}
                                </h3>

                                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                                    {project.description}
                                </p>
                            </div>

                            <div>
                                <div className="flex flex-wrap gap-1.5 mb-4 pt-2.5 border-t border-slate-900">
                                    {project.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded border border-slate-800 bg-slate-900/80 px-2 py-0.5 text-[9px] font-mono font-medium text-slate-300"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2.5">
                                    <a
                                        href={project.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-xl border border-cyan-500/50 bg-cyan-950/60 px-3.5 py-2 text-xs font-mono font-bold text-cyan-300 transition-all hover:bg-cyan-500/20 hover:border-cyan-400 hover:text-white"
                                    >
                                        <span>Live App</span>
                                        <ArrowUpRight className="h-3.5 w-3.5 text-cyan-400" />
                                    </a>

                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-700 bg-slate-900/80 px-3.5 py-2 text-xs font-mono font-semibold text-slate-300 transition-all hover:border-cyan-400 hover:text-cyan-300"
                                        title="View GitHub Repository"
                                    >
                                        <Code2 className="h-3.5 w-3.5 text-cyan-400" />
                                        <span>GitHub</span>
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
