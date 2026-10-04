'use client';

import { motion } from 'framer-motion';
import { certificates } from '@/data/certificates';
import { Award, ShieldCheck, CheckCircle2, Calendar } from 'lucide-react';

interface CredentialsSectionProps {
    visible: boolean;
}

export default function CredentialsSection({ visible }: CredentialsSectionProps) {
    return (
        <section
            id="credentials"
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
                        <Award className="h-3.5 w-3.5 text-cyan-400" />
                        <span className="tracking-widest uppercase font-semibold">
                            VERIFIED CERTIFICATIONS &amp; CREDENTIALS
                        </span>
                    </motion.div>
                    <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight uppercase drop-shadow-lg">
                        CREDENTIALS &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">ACHIEVEMENTS</span>
                    </h2>
                </div>

                {/* 6 Credentials Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {certificates.map((cert, idx) => (
                        <motion.div
                            key={cert.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.08 }}
                            className="group relative rounded-2xl border border-slate-800 bg-slate-950/90 p-4.5 backdrop-blur-xl shadow-xl hover:border-cyan-500/80 transition-all duration-300 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5 mb-2.5">
                                    <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-widest bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded-full">
                                        {cert.badge || 'VERIFIED'}
                                    </span>
                                    <div className="flex items-center gap-1 text-[9px] font-mono text-slate-400">
                                        <Calendar className="h-3 w-3 text-cyan-400" />
                                        <span>{cert.date}</span>
                                    </div>
                                </div>

                                <h3 className="text-sm font-extrabold text-white group-hover:text-cyan-300 transition-colors mb-1.5 flex items-start gap-1.5">
                                    <ShieldCheck className="h-4 w-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                    <span>{cert.title}</span>
                                </h3>
                                <p className="text-[11px] font-mono text-violet-300 mb-2 pl-5">
                                    Issuer: {cert.issuer}
                                </p>
                            </div>

                            <div className="pt-2 border-t border-slate-900 flex items-center justify-between text-[10px] font-mono text-cyan-400/80">
                                <span className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                                    Verified Credential
                                </span>
                                <span>2025</span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
