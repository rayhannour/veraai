"use client";
import React, { useRef, useState } from 'react';
import { VeraStreamingAvatar, VeraStreamingAvatarHandle } from '@/components/VeraStreamingAvatar';
import { AiHubInputBar } from '@/components/AiHubInputBar';
import { motion, AnimatePresence } from 'framer-motion';

export default function AiHubPage() {
  const avatarRef = useRef<VeraStreamingAvatarHandle>(null);
  const [inputText, setInputText] = useState("");
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [activeObjective, setActiveObjective] = useState(0);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");
    await avatarRef.current?.sendMessage(text);
  };

  const objectives = [
    {
      title: "Core Mission",
      desc: "Providing high-end AI intelligence, streamlining operations, and delivering precision data analysis in real-time.",
      icon: "pi-bolt",
      color: "text-primary",
      borderColor: "hover:border-primary/50",
      bgColor: "bg-primary"
    },
    {
      title: "Security Protocol",
      desc: "Ensuring 100% encrypted telecommunications and data integrity for all neural link sessions.",
      icon: "pi-shield",
      color: "text-secondary",
      borderColor: "hover:border-secondary/50",
      bgColor: "bg-secondary"
    },
    {
      title: "Global Sync",
      desc: "Synchronizing multi-sector operations to maintain optimal grid connectivity and performance.",
      icon: "pi-globe",
      color: "text-[#00ffaa]",
      borderColor: "hover:border-[#00ffaa]/50",
      bgColor: "bg-[#00ffaa]"
    },
    {
      title: "Strategic Analytics",
      desc: "Mapping vast data points into coherent, actionable intelligence for immediate tactical decisions.",
      icon: "pi-chart-line",
      color: "text-[#ff3366]",
      borderColor: "hover:border-[#ff3366]/50",
      bgColor: "bg-[#ff3366]"
    }
  ];

  return (
    <div className="flex h-[100svh] w-full bg-surface overflow-hidden relative">

      {/* ── NEURAL NEWS TICKER (TOP BANNER) ── */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-white/5 z-50 flex items-center overflow-hidden pointer-events-none" style={{ backgroundColor: 'transparent' }}>
        <div
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen scale-105"
          style={{ backgroundImage: 'url(/neural_energy_banner.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />

        <div className="flex items-center gap-4 px-6 z-20 w-full h-full relative">
          <div className="flex items-center gap-2 shrink-0 bg-background p-2 pr-4 rounded-r-3xl border-r border-primary/20 shadow-[20px_0_30px_rgba(0,0,0,0.8)] z-30 pointer-events-auto">
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#00e5ff]" />
            <span className="text-[9px] font-mono font-black text-white tracking-[0.3em] uppercase">Global_Grid</span>
          </div>

          <div className="flex-1 overflow-hidden relative h-full flex items-center mask-image-[linear-gradient(to_right,transparent,black_5%,black_95%,transparent)] xl:ml-0">
            <motion.div
              animate={{ x: [0, -1200] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="flex whitespace-nowrap gap-12 text-[9px] font-mono text-white/50 uppercase tracking-widest pl-10"
            >
              <span>Sector Alpha Sync: <span className="text-primary font-bold">14.2 PTW</span> (Stabilized)</span>
              <span className="text-white/20">///</span>
              <span>Telecom Links: <span className="text-[#00ffaa] font-bold">100% Secure</span></span>
              <span className="text-white/20">///</span>
              <span>Neural Core: <span className="text-secondary font-bold">FIREWALL MAX</span></span>
              <span className="text-white/20">///</span>
              <span>Energy Rate: <span className="text-[#ff3366] font-bold">Peak Demand</span></span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── LEFT SIDEBAR MENU (Vera Directives) ── */}
      <div className="hidden lg:flex w-[320px] xl:w-[380px] h-full pt-10 border-r border-white/5 bg-surface-container/30 backdrop-blur-3xl z-40 flex-col relative shrink-0 shadow-[20px_0_50px_rgba(0,0,0,0.5)]">
        <div className="p-8 h-full flex flex-col pt-12">
            <h2 className="text-xs font-mono font-black text-white/40 tracking-[0.4em] uppercase mb-8 flex items-center gap-3">
                <i className="pi pi-align-left text-primary/50 text-[10px]" />
                Vera_Objectives
            </h2>

            <div className="space-y-4 flex-1 overflow-y-auto fitness-scrollbar pr-2">
                {objectives.map((obj, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        onMouseEnter={() => setActiveObjective(i)}
                        className={`p-5 rounded-2xl border transition-all cursor-pointer backdrop-blur-md relative overflow-hidden group
                            ${activeObjective === i ? 'bg-white/5 border-white/20' : 'bg-transparent border-white/5 ' + obj.borderColor}
                        `}
                    >
                        {/* Selected Indicator Line */}
                        <motion.div 
                            initial={false}
                            animate={{ scaleY: activeObjective === i ? 1 : 0 }}
                            className={`absolute left-0 top-0 bottom-0 w-1 ${obj.bgColor} origin-top`} 
                        />

                        <div className="flex items-center gap-3 mb-3">
                            <i className={`pi ${obj.icon} text-lg ${obj.color} drop-shadow-[0_0_10px_currentColor]`} />
                            <h3 className="text-[11px] font-mono font-bold text-white uppercase tracking-widest">{obj.title}</h3>
                        </div>
                        <p className="text-xs text-white/50 leading-relaxed font-inter">
                            {obj.desc}
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Status */}
            <div className="mt-6 pt-6 border-t border-white/5 space-y-3">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-white/40">Uplink Status</span>
                    <span className="text-primary font-bold animate-pulse">Online</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-widest">
                    <span className="text-white/40">Encrypt Level</span>
                    <span className="text-secondary font-bold">Quantum</span>
                </div>
            </div>
        </div>
      </div>

      {/* ── CENTER: SURROUNDED VERA AVATAR ── */}
      <div className="flex-1 h-full relative flex items-center justify-center pt-8 md:pt-10 overflow-hidden bg-[radial-gradient(circle_at_center,_var(--color-surface-container)_0%,_var(--color-background)_100%)]">
        
        {/* Abstract Surrounding Elements */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 z-0">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 100, repeat: Infinity, ease: "linear" }} className="w-[800px] h-[800px] rounded-full border border-dashed border-primary/30" />
            <motion.div animate={{ rotate: -360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }} className="absolute w-[600px] h-[600px] rounded-full border border-secondary/30" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 80, repeat: Infinity, ease: "linear" }} className="absolute w-[1000px] h-[1000px] rounded-full border-2 border-dotted border-[#00ffaa]/20" />
        </div>

        <div className="w-full max-w-7xl h-full flex items-center justify-center relative z-10 p-4">

            {/* Avatar Centered */}
            <div className="relative w-full max-w-2xl aspect-[4/5] flex items-center justify-center pointer-events-auto">
              <VeraStreamingAvatar ref={avatarRef}>
                  
                  {/* Surrounding Telemetry Rings specific to Avatar */}
                  <div className="absolute -inset-8 -z-10 rounded-[5rem] border border-white/5 flex items-center justify-center pointer-events-none hidden md:flex">
                      <div className="absolute top-4 left-8 text-[9px] font-mono text-white/30 tracking-widest">/CORE_ACTIVE/</div>
                      <div className="absolute bottom-4 right-8 text-[9px] font-mono text-primary/50 tracking-widest">/SYNC_100%/</div>
                  </div>

                  {/* INTERACTION CONTROLS */}
                  <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-[3000] w-[90%] md:w-full max-w-xl pointer-events-auto flex flex-col items-center gap-3">
                      
                      {/* ALWAYS-VISIBLE MODE SWITCHER */}
                      <div className="bg-surface-container/60 backdrop-blur-xl rounded-full p-1 flex items-center border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.4)] relative">
                          <motion.div
                              className="absolute inset-y-1 bg-primary/20 border border-primary/50 shadow-[0_0_15px_rgba(0,229,255,0.3)] rounded-full z-0"
                              initial={false}
                              animate={{ left: inputMode === 'text' ? '4px' : '50%', width: 'calc(50% - 4px)' }}
                              transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          />
                          <button
                              onClick={() => setInputMode('text')}
                              className={`relative z-10 px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 ${inputMode === 'text' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
                          >
                              <i className="pi pi-keyboard"></i> Text
                          </button>
                          <button
                              onClick={() => setInputMode('voice')}
                              className={`relative z-10 px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-colors flex items-center gap-2 ${inputMode === 'voice' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
                          >
                              <i className="pi pi-microphone"></i> Voice
                          </button>
                      </div>

                      {/* TEXT MODE */}
                      <AnimatePresence>
                          {inputMode === 'text' && (
                              <AiHubInputBar
                                  key="text-pill"
                                  value={inputText}
                                  onChange={setInputText}
                                  onSend={handleSend}
                                  onTerminate={() => avatarRef.current?.terminateSession()}
                              />
                          )}
                      </AnimatePresence>

                      {/* VOICE MODE */}
                      <AnimatePresence>
                          {inputMode === 'voice' && (
                              <motion.div
                                  key="voice-pill"
                                  initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={{ opacity: 0, y: 15, scale: 0.9 }}
                                  transition={{ duration: 0.2, ease: "easeOut" }}
                                  className="flex items-center gap-3 w-full"
                              >
                                  <div className="flex-1 h-14 flex items-center justify-center gap-4 bg-surface-container/30 backdrop-blur-md rounded-full border border-white/5">
                                      <div className="relative flex items-center justify-center">
                                          <motion.div animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute w-10 h-10 rounded-full border border-primary/30 pointer-events-none" />
                                          <motion.button
                                              whileHover={{ scale: 1.05 }}
                                              whileTap={{ scale: 0.95 }}
                                              className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-primary-container shadow-[0_0_30px_rgba(0,229,255,0.6)] flex items-center justify-center relative z-10 border-none outline-none"
                                          >
                                              <i className="pi pi-microphone text-background text-sm" />
                                          </motion.button>
                                      </div>
                                      <div className="flex flex-col justify-center">
                                          <span className="text-primary font-mono text-[9px] uppercase tracking-widest font-bold">Secure Line</span>
                                          <span className="text-white/40 text-[10px] leading-none mt-1">Awaiting Sync...</span>
                                      </div>
                                  </div>
                                  <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={() => avatarRef.current?.terminateSession()}
                                      className="w-14 h-14 rounded-full flex items-center justify-center bg-error/10 hover:bg-error/80 border border-error/35 hover:border-error text-error hover:text-white shadow-[0_0_10px_rgba(255,51,102,0.15)] hover:shadow-[0_0_20px_rgba(255,51,102,0.55)] transition-all outline-none"
                                      title="Terminate Neural Link"
                                  >
                                      <i className="pi pi-power-off text-sm"></i>
                                  </motion.button>
                              </motion.div>
                          )}
                      </AnimatePresence>

                  </div>
              </VeraStreamingAvatar>
            </div>

            {/* RIGHT SIDE HUD SURROUNDINGS (Optional telemetry for tech feel) */}
            <div className="hidden 2xl:flex flex-col gap-10 absolute right-8 top-1/2 -translate-y-1/2 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="p-6 w-64 bg-white/[0.02] backdrop-blur-xl border-l-2 border-secondary shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-r-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-secondary/5 to-transparent blur-xl" />
                    <h4 className="text-[9px] font-mono font-black text-secondary tracking-[0.4em] uppercase mb-4">Core_Output</h4>
                    <div className="relative">
                        <p className="text-4xl font-manrope font-black text-white italic tracking-tighter">
                            12.8
                        </p>
                        <span className="absolute bottom-1 right-24 text-[9px] font-mono text-secondary font-bold">PTW/s</span>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="p-6 w-64 bg-white/[0.02] backdrop-blur-xl border-l-2 border-[#00ffaa] shadow-[0_0_30px_rgba(0,0,0,0.3)] rounded-r-2xl relative overflow-hidden"
                >
                    <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#00ffaa]/5 to-transparent blur-xl" />
                    <h4 className="text-[9px] font-mono font-black text-[#00ffaa] tracking-[0.4em] uppercase mb-4">Network_Flux</h4>
                    <div className="flex items-end gap-1 h-12">
                        {[4, 8, 3, 7, 5, 9, 6, 2].map((h, i) => (
                        <motion.div
                            key={i}
                            animate={{ height: [`${h * 8}%`, `${h * 12}%`, `${h * 8}%`] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                            className="flex-1 bg-[#00ffaa]/30 rounded-t-sm"
                        />
                        ))}
                    </div>
                </motion.div>
            </div>

        </div>
      </div>
      
    </div>
  );
}
