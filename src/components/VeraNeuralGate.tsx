"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export const VeraNeuralGate = () => {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

    const handleOpen = () => {
        setIsOpen(true);
        // Navigate after the animation finishes
        setTimeout(() => {
            router.push('/dashboard/energy');
        }, 1800);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-background">
            
            {/* 0. NEURAL WORLD MAP BACKGROUND (TEASER) */}
            <div className="absolute inset-0 z-0 pointer-events-none opacity-20 filter blur-[1px]">
               <svg width="100%" height="100%" viewBox="0 0 1200 800" className="scale-125">
                  <defs>
                     <filter id="lazer-glow">
                        <feGaussianBlur stdDeviation="3.5" result="coloredBlur"/>
                        <feMerge>
                           <feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/>
                        </feMerge>
                     </filter>
                  </defs>
                  
                  {/* ... (World map paths) ... */}
                  <motion.circle 
                     cx="560" cy="220" r="10" 
                     fill="var(--color-primary)" 
                     className="animate-ping opacity-60" 
                     filter="url(#lazer-glow)"
                  />
                  <circle cx="560" cy="220" r="5" fill="white" />

                  {/* Nodes around the world */}
                  {[
                    [150, 180], [300, 250], [900, 150], [850, 450], [450, 500], [200, 450], [700, 600], [1000, 300]
                  ].map(([x, y], i) => (
                    <g key={i}>
                       <circle cx={x} cy={y} r="2" fill="var(--color-primary)" opacity="0.6" />
                       <motion.path 
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 4, delay: i * 0.5, repeat: Infinity }}
                          d={`M 560,220 L ${x},${y}`} 
                          fill="none" stroke="var(--color-primary)" 
                          strokeWidth="1.2" 
                          strokeDasharray="4,8"
                          filter="url(#lazer-glow)"
                          opacity="0.4"
                       />
                    </g>
                  ))}
               </svg>
            </div>

            {/* 1. LEFT GLASS PANEL (THE INTERACTIVE HUB) */}
            <motion.div 
                initial={{ x: 0 }}
                animate={{ x: isOpen ? '-100%' : 0 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute left-0 top-0 bottom-0 w-1/2 bg-surface-container-low/80 backdrop-blur-3xl border-r border-primary/30 z-20 flex flex-col items-start justify-center pl-24 shadow-[20px_0_100px_rgba(0,0,0,0.8)] overflow-hidden"
            >
                <div className="relative z-30 space-y-12">
                   <div className="pointer-events-none select-none">
                        <h2 className="text-[10rem] font-manrope font-black text-white/5 uppercase leading-none tracking-tighter mix-blend-overlay">HUB</h2>
                        <p className="text-primary/40 font-mono text-[12px] tracking-[1em] mt-2 uppercase font-bold">Neural Interactions</p>
                    </div>

                    {/* TWO INTERACTIVE VIDEO STREAMS (AI AVATAR) */}
                    <div className="grid grid-cols-1 gap-8 max-w-sm relative px-4">
                       
                       {/* Video 1: Energie (Active Stream Interface) */}
                       <motion.div 
                          whileHover={{ scale: 1.1, x: 20 }}
                          onClick={() => setSelectedVideo("ÉNERGIE (Réseau Ohm)")}
                          className="relative h-44 w-72 rounded-3xl border-2 border-primary/30 bg-black/40 overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(0,229,255,0.2)]"
                       >
                          {/* Animated Scanlines for 'Video' effect */}
                          <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scan" />
                          
                          <Image src="/energy.png" alt="Vera Energie Presentation" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale-[30%] group-hover:grayscale-0" />
                          
                          {/* Active Stream Indicators */}
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                             <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase font-bold">LIVE . VERA_HUB/FR</span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent flex items-end p-6">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">STREAM: ENERGY_MODULE_01</span>
                                <span className="text-xl font-manrope font-black text-white italic tracking-tighter uppercase">Vera Énergie</span>
                             </div>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-primary/20 backdrop-blur-sm">
                             <i className="pi pi-play-circle text-6xl text-white drop-shadow-lg"></i>
                          </div>
                       </motion.div>

                       {/* Video 2: Connect (Active Stream Interface) */}
                       <motion.div 
                          whileHover={{ scale: 1.1, x: 20 }}
                          onClick={() => setSelectedVideo("CONNECT (Infrastructure GS)")}
                          className="relative h-44 w-72 rounded-3xl border-2 border-secondary/30 bg-black/40 overflow-hidden group cursor-pointer shadow-[0_0_50px_rgba(43,255,160,0.2)]"
                       >
                          <div className="absolute inset-0 z-10 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] animate-scan" />
                          
                          <Image src="/telecom.png" alt="Vera Connect Presentation" fill className="object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale-[30%] group-hover:grayscale-0" />
                          
                          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                             <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase font-bold">LIVE . VERA_NETWORK</span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent flex items-end p-6">
                             <div className="flex flex-col">
                                <span className="text-[10px] font-mono text-white/70 tracking-widest uppercase">STREAM: CONNECT_INFRA_02</span>
                                <span className="text-xl font-manrope font-black text-white italic tracking-tighter uppercase">Vera Connect</span>
                             </div>
                          </div>

                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-secondary/20 backdrop-blur-sm">
                             <i className="pi pi-play-circle text-6xl text-white drop-shadow-lg"></i>
                          </div>
                       </motion.div>

                       {/* ROBOTIC HAND VISUAL (Improved positioning to look like it's clicking) */}
                       <motion.div 
                          initial={{ x: 200, y: 100, rotate: 135 }}
                          animate={{ 
                             x: [200, 50, 200], 
                             y: [100, 150, 100],
                             rotate: [135, 125, 135] 
                          }}
                          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                          className="absolute top-1/2 -right-32 pointer-events-none z-40"
                       >
                          <i className="pi pi-hand-pointing-up text-[14rem] text-primary/30 filter drop-shadow-[0_0_30px_rgba(0,229,255,0.2)]"></i>
                       </motion.div>
                    </div>

                </div>

                {/* Left Panel Lazer Path */}
                <svg className="absolute inset-0 w-full h-full opacity-30 pointer-events-none z-10" viewBox="0 0 400 800">
                    <motion.path 
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
                       d="M 0,200 L 100,250 L 100,550 L 0,600" 
                       fill="none" stroke="var(--color-primary)" strokeWidth="2" filter="url(#glow)" 
                    />
                </svg>
            </motion.div>

            {/* 2. RIGHT GLASS PANEL (PROTOCOL TERMINAL) */}
            <motion.div 
                initial={{ x: 0 }}
                animate={{ x: isOpen ? '100%' : 0 }}
                transition={{ duration: 1.5, ease: [0.65, 0, 0.35, 1] }}
                className="absolute right-0 top-0 bottom-0 w-1/2 bg-surface-container-low/80 backdrop-blur-3xl border-l border-primary/30 z-20 flex flex-col items-end justify-center pr-0 shadow-[-20px_0_100px_rgba(0,0,0,0.8)]"
            >
                {/* Lazer Neural Pattern on Right Panel */}
                <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 400 800">
                    <motion.path 
                       initial={{ pathLength: 0 }}
                       animate={{ pathLength: 1 }}
                       transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
                       d="M 0,100 L 150,150 L 150,350 L 50,400 L 150,450 L 150,650 L 0,700" 
                       fill="none" stroke="var(--color-primary)" strokeWidth="2" filter="url(#glow)" 
                    />
                </svg>

                <div className="flex flex-col items-end gap-12 relative z-30 mr-12 text-right">
                    <div className="pointer-events-none select-none">
                        <h2 className="text-[12rem] font-manrope font-black text-white/5 uppercase leading-none tracking-tighter mix-blend-overlay">ACCESS</h2>
                        <p className="text-primary/40 font-mono text-[12px] tracking-[1em] mt-2 uppercase font-bold">Protocol Validated</p>
                    </div>

                    {/* EXTENDED MATRIX TERMINAL TEXT (Right Aligned) */}
                    <div className="font-mono text-[11px] text-primary/70 max-w-lg space-y-3 opacity-90">
                        {[
                          "LOG: CRÉATION_INSTANCE_VERA_NEURAL... [OK]",
                          "NODE: PARIS_FRANCE_DATACENTER_01... [SCANNING]",
                          "INTEL: ANALYSE_RÉSEAU_ÉNERGÉTIQUE_OHM... [COMPLETED]",
                          "INTEL: OPTIMISATION_TÉLÉCOM_GS_AUTO... [ACTIVE]",
                          "SECURITY: FIREWALL_NEURAL_GRADIENT_V8... [SECURE]",
                          "LATENCY: < 0.2ms_PROXIMITY_SYNC... [STABLE]",
                          "AI_ENGINE: LLM_MODALITY_RECOGNITION... [READY]",
                          "AUTH: USER_BIOMETRICS_VERIFIED_CORE... [GRANTED]"
                        ].map((line, lineIndex) => (
                           <div key={lineIndex} className="flex flex-wrap justify-end">
                              {line.split("").map((char, charIndex) => (
                                <motion.span
                                   key={charIndex}
                                   initial={{ opacity: 0 }}
                                   animate={{ opacity: 1 }}
                                   transition={{ 
                                      duration: 0.04, 
                                      delay: lineIndex * 0.4 + charIndex * 0.02 
                                   }}
                                >
                                   {char}
                                </motion.span>
                              ))}
                           </div>
                        ))}
                        <motion.span 
                           animate={{ opacity: [1, 0] }}
                           transition={{ duration: 0.8, repeat: Infinity }}
                           className="inline-block w-2 h-4 bg-primary ml-1"
                        />
                    </div>
                </div>
            </motion.div>



            {/* 3. CENTRAL LOGO BUTTON (THE TRIGGER) */}
            <motion.div 
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                    scale: isOpen ? 0.5 : 1, 
                    opacity: isOpen ? 0 : 1,
                    rotate: isOpen ? 180 : 0
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.1 }}
                className="relative z-40 cursor-pointer group"
                onClick={handleOpen}
            >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full scale-150 group-hover:bg-primary/50 transition-all duration-500" />
                
                {/* The Core Button */}
                <div className="relative w-48 h-48 rounded-[3rem] bg-surface-container-high border-2 border-primary/40 flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_120px_rgba(0,229,255,0.6)] transition-all duration-500">
                    <Image src="/agent.png" alt="Vera AI" fill className="object-cover scale-150 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                    <div className="absolute inset-x-0 bottom-6 text-center">
                        <span className="text-[12px] font-mono font-black text-primary tracking-[0.3em] animate-pulse">INITIATE CORE</span>
                    </div>
                </div>

                {/* Satellite Neural Nodes around the button */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                    <motion.div
                        key={i}
                        animate={{ 
                            rotate: [0, 360],
                            scale: [1, 1.4, 1]
                        }}
                        transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 pointer-events-none"
                        style={{ transform: `rotate(${deg}deg)` }}
                    >
                        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-[0_0_20px_var(--color-primary)]" />
                    </motion.div>
                ))}
            </motion.div>

            {/* 4. BACKGROUND REVEAL CONTENT (The Dashboard Preview) */}
            <div className="absolute inset-0 z-10 flex items-center justify-center backdrop-blur-sm pointer-events-none">
                <div className="text-center">
                    <p className="text-primary font-mono text-sm tracking-[1em] animate-pulse opacity-40">SYSTEM STANDBY . SYNCING NODES</p>
                </div>
            </div>

            {/* 5. VIDEO POPUP WINDOW */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8, backdropFilter: "blur(0px)" }}
                        animate={{ opacity: 1, scale: 1, backdropFilter: "blur(40px)" }}
                        exit={{ opacity: 0, scale: 0.8, backdropFilter: "blur(0px)" }}
                        className="fixed inset-0 z-[110] flex items-center justify-center p-8 bg-background/60"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div 
                            onClick={(e) => e.stopPropagation()}
                            className="relative w-full max-w-5xl aspect-video bg-surface-container rounded-[4rem] border-2 border-primary/30 overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)] flex flex-col items-center justify-center"
                        >
                            {/* Simulated Video Player / Avatar Speech */}
                            <div className="w-full h-full relative">
                                {selectedVideo?.includes("ÉNERGIE") ? (
                                    <div className="relative w-full h-full bg-black flex items-center justify-center">
                                        <video 
                                            src="/energie.mp4" 
                                            autoPlay 
                                            controls 
                                            className="w-full h-full object-contain"
                                        />
                                        {/* UI Overlay on Video */}
                                        <div className="absolute top-8 left-8 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-primary/30 pointer-events-none">
                                            <div className="flex items-center gap-3">
                                                <div className="w-3 h-3 bg-primary rounded-full animate-pulse" />
                                                <span className="text-primary font-mono text-xs tracking-widest uppercase">Streaming: Secure_Vera_Ohm_Protocol</span>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center flex flex-col items-center justify-center h-full">
                                        <div className="relative w-64 h-64 mx-auto rounded-[3rem] border-4 border-primary/50 overflow-hidden mb-8 shadow-[0_0_40px_var(--color-primary)]">
                                            <Image src="/agent.png" alt="Vera Avatar" fill className="object-cover scale-150" />
                                            <motion.div 
                                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                                className="absolute inset-0 bg-primary/20" 
                                            />
                                        </div>
                                        <h3 className="text-4xl font-manrope font-black text-white italic tracking-tighter uppercase">PRÉSENTATION {selectedVideo}</h3>
                                        <p className="text-primary font-mono text-sm tracking-[0.5em] mt-4 uppercase animate-pulse">LANCEMENT PROTOCOLE AUDIO...</p>
                                    </div>
                                )}

                                {/* Close Button */}
                                <button 
                                    onClick={() => setSelectedVideo(null)}
                                    className="absolute top-10 right-10 z-50 w-16 h-16 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-colors group shadow-2xl"
                                >
                                    <i className="pi pi-times text-2xl text-white group-hover:rotate-90 transition-transform"></i>
                                </button>
                            </div>
                            
                            {/* Neural lines in the window footer */}
                            <svg className="absolute inset-x-0 bottom-0 w-full h-32 opacity-20 pointer-events-none" viewBox="0 0 1000 100">
                                <motion.path 
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    d="M 0,50 Q 250,0 500,50 T 1000,50" 
                                    fill="none" stroke="var(--color-primary)" strokeWidth="4" 
                                />
                            </svg>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
};

