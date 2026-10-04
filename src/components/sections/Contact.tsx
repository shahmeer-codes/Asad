'use client';

import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';
import { siteConfig } from '@/data/site';
import { Terminal, Send, CheckCircle2, Code2, Globe, MessageSquare, Database } from 'lucide-react';

interface ContactProps {
    visible: boolean;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Contact({ visible }: ContactProps) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState<FormStatus>('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (!name.trim() || !email.trim() || !message.trim()) {
            setErrorMsg('Please fill in all fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setErrorMsg('Please enter a valid email address.');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                throw new Error(data.error || 'Failed to send message.');
            }

            setStatus('success');
            setName('');
            setEmail('');
            setMessage('');
        } catch (err) {
            setStatus('error');
            setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
        }
    };

    return (
        <section
            id="contact"
            className={`pointer-events-none absolute inset-0 flex h-screen items-center justify-center px-4 sm:px-6 transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'
                }`}
        >
            <div
                className={`w-full max-w-2xl overflow-y-auto max-h-[85vh] py-4 px-2 ${visible ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
            >
                <motion.div
                    initial={{ y: 15, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    className="mb-1 flex items-center justify-center gap-2 text-[11px] sm:text-xs font-mono tracking-widest text-cyan-400"
                >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>DIRECT TRANSMISSION PORTAL</span>
                </motion.div>

                <motion.h2
                    initial={{ y: 15, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="mb-2 text-center text-2xl sm:text-4xl font-black text-white uppercase tracking-tight"
                >
                    LET'S <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-300 to-fuchsia-400">WORK TOGETHER.</span>
                </motion.h2>

                <p className="text-center text-xs sm:text-sm text-slate-300 mb-6 max-w-md mx-auto font-sans leading-relaxed">
                    I'm actively looking to grow in AI/ML and contribute to exciting projects. Send a message or reach out on social channels.
                </p>

                {/* Streamlined Contact Form */}
                <motion.form
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="glass-card rounded-2xl border border-slate-800/80 bg-slate-950/90 p-5 sm:p-6 shadow-2xl backdrop-blur-2xl mb-6"
                >
                    <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
                        <h3 className="text-xs sm:text-sm font-mono font-bold text-slate-100 flex items-center gap-2">
                            <Send className="h-3.5 w-3.5 text-cyan-400" />
                            <span>Direct Signal Transmission</span>
                        </h3>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                            </span>
                            <span>Online</span>
                        </div>
                    </div>

                    {status === 'success' ? (
                        <div className="py-6 text-center">
                            <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-2 animate-bounce" />
                            <h3 className="mb-1 text-lg font-extrabold text-slate-100">Handshake Received!</h3>
                            <p className="text-xs text-slate-400">Message successfully delivered to Asad Aziz.</p>
                            <button
                                type="button"
                                onClick={() => setStatus('idle')}
                                className="mt-4 text-xs font-mono text-cyan-400 hover:underline"
                            >
                                Transmit another signal →
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="contact-name" className="mb-1 block text-[11px] font-mono text-slate-300">
                                        CALLSIGN / NAME
                                    </label>
                                    <input
                                        id="contact-name"
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                                        placeholder="Your Name"
                                        disabled={status === 'loading'}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="contact-email" className="mb-1 block text-[11px] font-mono text-slate-300">
                                        COMMUNICATOR EMAIL
                                    </label>
                                    <input
                                        id="contact-email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                                        placeholder="your.email@domain.com"
                                        disabled={status === 'loading'}
                                    />
                                </div>
                            </div>

                            <div className="mb-4">
                                <label htmlFor="contact-message" className="mb-1 block text-[11px] font-mono text-slate-300">
                                    TRANSMISSION PAYLOAD
                                </label>
                                <textarea
                                    id="contact-message"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows={3}
                                    className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs text-slate-100 outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-mono"
                                    placeholder="Type your message payload..."
                                    disabled={status === 'loading'}
                                />
                            </div>

                            {errorMsg && (
                                <p className="mb-3 rounded-xl bg-rose-500/10 border border-rose-500/30 px-3 py-1.5 text-xs font-mono text-rose-400">{errorMsg}</p>
                            )}

                            <MagneticButton
                                className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 py-2.5 text-xs font-mono font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01] disabled:opacity-50"
                            >
                                {status === 'loading' ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-slate-950 border-t-transparent" />
                                        Encrypting &amp; Transmitting...
                                    </span>
                                ) : (
                                    'Transmit Message'
                                )}
                            </MagneticButton>
                        </>
                    )}
                </motion.form>

                {/* Footer Socials */}
                <footer className="text-center border-t border-slate-800/60 pt-4">
                    <p className="mb-0.5 text-xs font-black tracking-widest text-white font-mono uppercase">
                        {siteConfig.name}
                    </p>
                    <p className="mb-3 text-[11px] text-cyan-400 font-mono">{siteConfig.profession} · {siteConfig.location}</p>
                    <div className="mb-3 flex justify-center flex-wrap gap-4 text-xs font-mono">
                        <a
                            href={siteConfig.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                            <Code2 className="h-3.5 w-3.5" /> GitHub
                        </a>
                        <a
                            href={siteConfig.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                            <Globe className="h-3.5 w-3.5" /> LinkedIn
                        </a>
                        <a
                            href={siteConfig.social.whatsapp}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                            <MessageSquare className="h-3.5 w-3.5" /> WhatsApp
                        </a>
                        <a
                            href={siteConfig.social.kaggle}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors"
                        >
                            <Database className="h-3.5 w-3.5" /> Kaggle
                        </a>
                    </div>
                    <p className="text-[10px] text-slate-500 font-mono">
                        © 2026 Asad Aziz — AI Engineer
                    </p>
                </footer>
            </div>
        </section>
    );
}
