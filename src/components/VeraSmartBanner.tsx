"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const VeraSmartBanner = () => {
    const [currentAction, setCurrentAction] = useState(0);
    const actions = [
        "RE-ROUTING TRAFFIC: RIYADH NODE-04 STRESSED",
        "OPTIMIZING GRID: JEDDAH ENERGY CLUSTER 12",
        "ZAIN SAUDI SIGNAL: LATENCY REDUCED BY 45ms",
        "VERA AI: SCANNING GLOBAL TELEMETRY...",
        "ORANGE FLUX: SEAMLESS HANDOVER COMPLETE",
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentAction((prev) => (prev + 1) % actions.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [actions.length]);

    return (
        <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 1 }}
            className="fixed top-0 left-0 right-0 z-[100] px-4 py-3"
        >
            <div className="max-w-7xl mx-auto bg-background/40 backdrop-blur-2xl border border-primary/20 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-between px-6 py-2">
                
                {/* 1. STATUS PULSE */}
                <div className="flex items-center gap-3 shrink-0">
                    <div className="relative flex items-center justify-center">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping absolute opacity-75" />
                        <div className="w-2 h-2 bg-primary rounded-full" />
                    </div>
                    <span className="text-[10px] font-mono font-black text-primary tracking-[0.3em] uppercase hidden sm:block">LIVE_AI_STREAM</span>
                </div>

                {/* 2. DYNAMIC TEXT (SLIDER) */}
                <div className="flex-1 px-8 overflow-hidden flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.p 
                            key={currentAction}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            className="text-[11px] font-mono text-on-surface-variant tracking-wider font-medium text-center truncate"
                        >
                            {actions[currentAction]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* 3. METRIC BUBBLE */}
                <div className="flex items-center gap-6 shrink-0">
                    <div className="hidden md:flex items-center gap-2">
                        <span className="text-[9px] text-outline-variant font-mono uppercase">Global Efficiency:</span>
                        <span className="text-primary font-mono font-bold text-xs">+14.2%</span>
                    </div>
                    
                    <div className="w-px h-4 bg-outline-variant/20 hidden md:block" />

                    <div className="flex items-center gap-2">
                        <span className="text-[9px] text-outline-variant font-mono uppercase hidden sm:block">Health:</span>
                        <div className="flex gap-1">
                            {[1,1,1,1,1].map((_, i) => (
                                <div key={i} className="w-1.5 h-1.5 bg-secondary rounded-[1px] opacity-80" />
                            ))}
                        </div>
                    </div>
                </div>

            </div>
            
            {/* Ambient Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </motion.div>
    );
};
