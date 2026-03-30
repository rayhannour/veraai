"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const VeraLandingGate = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Auto-trigger the supermarket open after initial load sequence
        const timer = setTimeout(() => {
            setIsOpen(true);

            // Redirect to welcome after animation completes
            setTimeout(() => {
                router.push('/welcome');
            }, 2500);
        }, 2000);
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center overflow-hidden bg-black">

            {/* THE SINGULARITY CORE LIGHT (REVEALED BEHIND DOORS) */}
            <motion.div
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute w-1.5 h-full bg-gradient-to-b from-transparent via-white to-transparent z-10 shadow-[0_0_80px_rgba(255,255,255,0.8),0_0_30px_#00E5FF]"
            />

            {/* THE CENTRAL LOGO (BEHIND THE DOORS) */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, duration: 1.5 }}
                className="relative z-20 flex flex-col items-center"
            >
                <div className="relative group">
                    <div className="absolute inset-x-0 -inset-y-32 bg-primary/20 blur-[120px] rounded-full scale-150 animate-pulse" />
                    <div className="relative w-72 h-72 rounded-full border-2 border-white/20 flex items-center justify-center bg-black/40 backdrop-blur-3xl overflow-hidden shadow-[0_0_120px_rgba(255,255,255,0.15)]">
                        <Image src="/agent.png" alt="Vera AI" fill className="object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-1000" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-white/10 rounded-full animate-[spin_25s_linear_infinite]" />
                    </div>
                </div>
                <motion.span
                    initial={{ opacity: 0, letterSpacing: "1em" }}
                    animate={{ opacity: 1, letterSpacing: "2.5em" }}
                    transition={{ delay: 2, duration: 2 }}
                    className="mt-16 text-white font-mono text-sm tracking-[2.5em] uppercase font-black text-center"
                >
                    INITIALISATION
                </motion.span>
            </motion.div>

            {/* THE SUPERMARKET DOORS (OVERLAY) */}
            <div className="absolute inset-0 z-50 pointer-events-none flex">

                {/* LEFT DOOR PANE */}
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: isOpen ? '-100%' : 0 }}
                    transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
                    className="relative w-1/2 h-full bg-background/50 backdrop-blur-3xl border-r border-white/30 shadow-[40px_0_100px_rgba(0,0,0,0.8)] flex items-center justify-end overflow-hidden"
                >
                    {/* Industrial speculative light sweep */}
                    <motion.div
                        animate={{ left: ['100%', '-100%'] }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[45deg] blur-2xl"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 h-32 w-px bg-white/20" />
                </motion.div>

                {/* RIGHT DOOR PANE */}
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: isOpen ? '100%' : 0 }}
                    transition={{ duration: 1.8, ease: [0.77, 0, 0.175, 1], delay: 0.5 }}
                    className="relative w-1/2 h-full bg-background/50 backdrop-blur-3xl border-l border-white/30 shadow-[-40px_0_100px_rgba(0,0,0,0.8)] flex items-center justify-start overflow-hidden"
                >
                    {/* Industrial speculative light sweep */}
                    <motion.div
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                        className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[45deg] blur-2xl"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 h-32 w-px bg-white/20" />
                </motion.div>

                {/* CENTRAL ACTIVATION STROBE */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: [0, 1, 0.5] }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-white/5 z-[60]"
                        />
                    )}
                </AnimatePresence>
            </div>

            {/* NEURAL HUD DATA */}
            <div className="absolute bottom-12 right-12 z-[100] font-mono text-[10px] space-y-1 text-white/30 uppercase tracking-[0.3em]">
                <p>Status: {isOpen ? "DOORS_OPEN" : "SYSTEM_LOCKED"}</p>
                <div className="h-[2px] w-48 bg-white/10 relative overflow-hidden">
                    <motion.div
                        animate={{ left: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-y-0 w-12 bg-white/40 shadow-[0_0_10px_#fff]"
                    />
                </div>
                <p>Telemetry: 192.168.160.64:3000</p>
                <p>Awaiting_Neural_Handshake...</p>
            </div>
        </div>
    );
};
