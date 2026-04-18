"use client";
import React, { useState } from 'react';
import { VeraStreamingAvatar, VeraStreamingAvatarHandle } from '@/components/VeraStreamingAvatar';
import { AiHubInputBar } from '@/components/AiHubInputBar';
import { motion, AnimatePresence } from 'framer-motion';

interface AvatarMarketingPageProps {
    avatarRef: React.RefObject<VeraStreamingAvatarHandle | null>;
    onAvatarSpeakEnd?: () => void;
}

export default function AvatarMarketingPage({ avatarRef, onAvatarSpeakEnd }: AvatarMarketingPageProps) {
    const [inputText, setInputText] = useState("");
    const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');

    const handleSend = async () => {
        if (!inputText.trim()) return;
        const text = inputText;
        setInputText("");
        await avatarRef.current?.sendMessage(text);
    };

    return (
        <div className="w-full h-full flex flex-col relative z-20 border-r border-white/5 bg-black/20 backdrop-blur-xl shadow-[20px_0_50px_rgba(0,0,0,0.5)]">

            {/* Header inside Sidebar */}
            <div className="p-6 border-b border-white/5 shrink-0 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary animate-pulse rounded-full shadow-[0_0_10px_#00e5ff]" />
                    <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-primary">Neural_Link</span>
                </div>
                <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Active</span>
            </div>

            {/* Avatar Container (Full Height) */}
            <div className="flex-1 w-full relative z-10 pointer-events-auto overflow-hidden">
                {/* Abstract Rings Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 60, repeat: Infinity, ease: "linear" }} className="w-[800px] h-[800px] rounded-full border border-dashed border-primary" />
                </div>

                <VeraStreamingAvatar 
                    ref={avatarRef as React.RefObject<VeraStreamingAvatarHandle>} 
                    onSpeakEnd={onAvatarSpeakEnd}
                    stayInContainer={true}
                >
                    {/* Persistent Controls for Sidebar/Full-Open Mode */}
                    {/* Simplified Exit Control for Sidebar */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[5000]">
                        <motion.button 
                            whileHover={{ scale: 1.1, backgroundColor: 'rgba(239, 68, 68, 0.8)' }} 
                            whileTap={{ scale: 0.9 }} 
                            onClick={() => avatarRef.current?.terminateSession()} 
                            className="w-16 h-16 rounded-full flex items-center justify-center bg-error/10 border border-error/35 text-error hover:text-white transition-all shadow-[0_0_30px_rgba(239,68,68,0.2)]"
                            title="Terminate Neural Link"
                        >
                            <i className="pi pi-power-off text-xl"></i>
                        </motion.button>
                    </div>
                </VeraStreamingAvatar>
            </div>
        </div>
    );
}
