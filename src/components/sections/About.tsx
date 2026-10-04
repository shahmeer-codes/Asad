'use client';

import { motion } from 'framer-motion';
import { siteConfig } from '@/data/site';
import { UserCheck, Sparkles } from 'lucide-react';

interface AboutProps {
    visible: boolean;
}

const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
};

export default function About({ visible }: AboutProps) {
    return (
        <section
            id="about"
            className={`pointer-events-none absolute inset-0 flex h-screen items-center justify-center px-4 sm:px-8 transition-opacity duration-700 overflow-y-auto py-12 ${visible ? 'opacity-100 pointer-events-auto' : 'opacity-0'
                }`}
        >
            <div className="max-w-4xl w-full mx-auto max-h-[85vh] overflow-y-auto py-2 px-1">
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-2 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest text-cyan-400"
                >
                    <UserCheck className="h-3.5 w-3.5" />
                    <span>BIOGRAPHY &amp; CORE FOCUS</span>
                </motion.div>

                <motion.h2
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-4 text-2xl font-black text-center text-white sm:text-4xl uppercase tracking-tight"
                >
                    WHO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">I AM</span>
                </motion.h2>

                {/* Bio Box */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="mb-6 text-xs sm:text-sm leading-relaxed text-slate-200 glass-card p-5 sm:p-7 rounded-2xl border border-cyan-500/20 bg-slate-950/80 backdrop-blur-2xl shadow-2xl space-y-3"
                >
                    <p>
                        I'm an <strong className="text-cyan-300 font-semibold">Artificial Intelligence graduate</strong> focused on building practical AI systems that bridge research and real-world applications. My work spans machine learning, NLP, and LLM-based solutions, with hands-on experience in predictive modeling and Retrieval-Augmented Generation (RAG) pipelines.
                    </p>
                    <p>
                        Through academic projects and industry internships, I've developed end-to-end ML workflows — from data preprocessing and feature engineering to model training, evaluation, and deployment using Python and modern AI tools.
                    </p>
                    <p className="border-l-2 border-cyan-400 pl-3 py-1 italic text-cyan-200/90 font-mono text-xs">
                        "I care about engineering clarity as much as model performance. Effective ML isn't just about accuracy — it's about clean implementation, reproducibility, and systems that deliver measurable value."
                    </p>
                </motion.div>

                {/* Core Keywords Tags */}
                <motion.div
                    variants={fadeInUp}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <h3 className="text-[11px] font-mono font-bold uppercase tracking-widest text-cyan-400 mb-2.5 text-center">
                        CORE DOMAINS &amp; KEYWORDS
                    </h3>
                    <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                        {siteConfig.about.keywords.map((keyword) => (
                            <span
                                key={keyword}
                                className="inline-flex items-center gap-1 rounded-xl border border-cyan-500/30 bg-slate-950/80 px-2.5 sm:px-3.5 py-1 text-[10px] sm:text-xs font-mono font-semibold text-cyan-300 backdrop-blur-md shadow-md hover:border-cyan-400 transition-all"
                            >
                                <Sparkles className="h-3 w-3 text-cyan-400" />
                                {keyword}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
