'use client';

import { motion } from 'framer-motion';
import { skillCategories } from '@/data/skills';
import { Cpu, Terminal, MessageSquare, BarChart3, Rocket, Database, CheckCircle2 } from 'lucide-react';

interface SkillsProps {
    visible: boolean;
}

const iconMap: Record<string, any> = {
    Terminal: Terminal,
    Cpu: Cpu,
    MessageSquare: MessageSquare,
    BarChart3: BarChart3,
    Rocket: Rocket,
    Database: Database,
};

const getProficiencyColor = (proficiency: string) => {
    switch (proficiency) {
        case 'Expert':
            return 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60';
        case 'Advanced':
            return 'text-violet-300 border-violet-500/40 bg-violet-950/60';
        case 'Intermediate':
            return 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60';
        default:
            return 'text-slate-300 border-slate-700 bg-slate-900';
    }
};

export default function Skills({ visible }: SkillsProps) {
    return (
        <section
            id="skills"
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
                        <Cpu className="h-3.5 w-3.5 text-cyan-400 animate-pulse" />
                        <span className="tracking-widest uppercase font-semibold">
                            TECHNICAL MATRIX &amp; CAPABILITIES
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                        TECH <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">STACK MATRIX</span>
                    </h2>
                </div>

                {/* 6 Categorized Skill Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {skillCategories.map((category) => {
                        const IconComponent = iconMap[category.icon] || Cpu;
                        return (
                            <motion.div
                                key={category.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                className="group relative rounded-2xl border border-slate-800 bg-slate-950/90 p-4.5 backdrop-blur-xl shadow-xl hover:border-cyan-500/60 transition-all duration-300 flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-3">
                                        <h3 className="text-xs sm:text-sm font-mono font-bold text-slate-100 flex items-center gap-2 tracking-wide">
                                            <IconComponent className="h-4 w-4 text-cyan-400" />
                                            {category.name}
                                        </h3>
                                        <span className="text-[10px] font-mono text-slate-500 font-semibold">
                                            [{category.skills.length}]
                                        </span>
                                    </div>

                                    <div className="space-y-2.5">
                                        {category.skills.map((skill) => (
                                            <div key={skill.name} className="space-y-1">
                                                <div className="flex items-center justify-between text-xs font-mono">
                                                    <span className="font-semibold text-slate-200 flex items-center gap-1.5 text-[11px]">
                                                        <CheckCircle2 className="h-3 w-3 text-cyan-400 opacity-70" />
                                                        {skill.name}
                                                    </span>
                                                    <span
                                                        className={`px-1.5 py-0.5 rounded text-[9px] font-bold border ${getProficiencyColor(
                                                            skill.proficiency
                                                        )}`}
                                                    >
                                                        {skill.proficiency}
                                                    </span>
                                                </div>

                                                <div className="h-1.5 w-full rounded-full bg-slate-900 overflow-hidden border border-slate-800">
                                                    <div
                                                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 transition-all duration-1000"
                                                        style={{ width: `${skill.level}%` }}
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
