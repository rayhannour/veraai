"use client";
import React, { useState } from 'react';
import { VeraStreamingAvatar, VeraStreamingAvatarHandle } from '@/components/VeraStreamingAvatar';
import { AiHubInputBar } from '@/components/AiHubInputBar';
import { motion, AnimatePresence } from 'framer-motion';

export default function AvatarMarketingRealTime({ avatarRef }: { avatarRef: React.RefObject<any> }) {
    const [inputText, setInputText] = useState("");
    const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

    const handleSend = async () => {
        if (!inputText.trim()) return;
        const text = inputText;
        setInputText("");
        await avatarRef.current?.sendMessage(text);
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative z-20 bg-black/60 backdrop-blur-[60px]">

            {/* Premium Neural Gradients */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-primary/20 blur-[180px] rounded-full mix-blend-screen" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-secondary/20 blur-[180px] rounded-full mix-blend-screen" />
            </div>

            {/* Abstract Background for Full Page */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.1]">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="w-[800px] h-[800px] rounded-full border border-dashed border-primary" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute w-[1200px] h-[1200px] rounded-full border border-white/5" />
            </div>

            {/* Full Page Header HUD */}
            <div className="absolute top-12 left-12 flex items-center gap-6 z-50">
                <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-[#00ffaa] rounded-full animate-pulse shadow-[0_0_20px_#00ffaa]" />
                    <span className="text-[10px] font-mono font-black text-white tracking-[0.6em] uppercase">Neural_Interlink_Active</span>
                </div>
                <div className="h-px w-24 bg-gradient-to-r from-white/20 to-transparent" />
            </div>

            {/* Central Avatar Focus */}
            <div className="relative w-full max-w-2xl aspect-[4/5] flex items-center justify-center z-10 pointer-events-auto">
                <VeraStreamingAvatar ref={avatarRef as React.RefObject<VeraStreamingAvatarHandle>}>
                    {/* Floating Input Controls - IMPROVED GLASS STYLE */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xl px-10 z-[5000]">
                        <div className="p-10 rounded-[3.5rem] bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.8)] flex flex-col gap-6">
                            
                            {/* Mode Switcher */}
                            <div className="bg-background/40 rounded-full p-1.5 flex items-center border border-white/10 relative mx-auto w-fit backdrop-blur-md">
                                <motion.div
                                    className="absolute inset-y-1 bg-primary/20 border border-primary/50 shadow-[0_0_15px_rgba(0,229,255,0.3)] rounded-full z-0"
                                    initial={false}
                                    animate={{ left: inputMode === 'text' ? '6px' : '50%', width: 'calc(50% - 6px)' }}
                                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                />
                                <button
                                    onClick={() => setInputMode('text')}
                                    className={`relative z-10 px-8 py-2.5 text-[10px] font-mono font-black uppercase tracking-[0.2em] rounded-full transition-colors flex items-center gap-3 ${inputMode === 'text' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    <i className="pi pi-keyboard"></i> TEXT
                                </button>
                                <button
                                    onClick={() => setInputMode('voice')}
                                    className={`relative z-10 px-8 py-2.5 text-[10px] font-mono font-black uppercase tracking-[0.2em] rounded-full transition-colors flex items-center gap-3 ${inputMode === 'voice' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
                                >
                                    <i className="pi pi-microphone"></i> VOICE
                                </button>
                            </div>

                            {/* Input Form */}
                            <div className="w-full relative min-h-[56px] flex items-center justify-center">
                                <AnimatePresence mode="wait">
                                    {inputMode === 'text' ? (
                                        <motion.div key="text-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full relative z-[3001] pointer-events-auto">
                                            <AiHubInputBar value={inputText} onChange={setInputText} onSend={handleSend} onTerminate={() => avatarRef.current?.terminateSession()} />
                                        </motion.div>
                                    ) : (
                                        <motion.div key="voice-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex items-center gap-4 w-full pointer-events-auto">
                                            <div className="flex-1 h-16 flex items-center justify-center gap-5 bg-background/40 rounded-full border border-white/10">
                                                <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-container shadow-[0_0_30px_rgba(0,229,255,0.6)] flex items-center justify-center relative z-10 border-none outline-none">
                                                    <i className="pi pi-microphone text-background text-sm" />
                                                </motion.button>
                                                <div className="flex flex-col justify-center">
                                                    <span className="text-primary font-mono text-[10px] uppercase tracking-[0.3em] font-black">Secure Line</span>
                                                    <span className="text-white/20 text-[9px] font-mono leading-none mt-1 uppercase">Syncing...</span>
                                                </div>
                                            </div>
                                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => avatarRef.current?.terminateSession()} className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center bg-error/10 hover:bg-error/80 border border-error/20 hover:border-error text-error hover:text-white transition-all outline-none shadow-[0_0_30px_rgba(239,68,68,0.1)]" title="Terminate Neural Link">
                                                <i className="pi pi-power-off text-lg"></i>
                                            </motion.button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </VeraStreamingAvatar>

                {/* HUD Surrounding Focus */}
                <div className="absolute -inset-10 border border-white/5 rounded-[4rem] pointer-events-none hidden md:block" />
            </div>
        </div>
    );
}
