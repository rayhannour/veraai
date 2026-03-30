"use client";
import React, { useRef, useState } from 'react';
import { VeraCard } from '@/components/VeraCard';
import { VeraInput } from '@/components/VeraInput';
import { VeraButton } from '@/components/VeraButton';
import { Avatar } from 'primereact/avatar';
import { VeraStreamingAvatar, VeraStreamingAvatarHandle } from '@/components/VeraStreamingAvatar';
import { motion } from 'framer-motion';

export default function AiHubPage() {
  const avatarRef = useRef<VeraStreamingAvatarHandle>(null);
  const [inputText, setInputText] = useState("");

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    setInputText("");
    await avatarRef.current?.sendMessage(text);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-surface w-full h-[100svh] overflow-hidden">
      
      {/* ── NEURAL NEWS TICKER (TOP BANNER) ── */}
      <div className="absolute top-0 inset-x-0 h-10 border-b border-white/5 z-50 flex items-center overflow-hidden" style={{ backgroundColor: 'transparent' }}>
        {/* Generative AI Background */}
        <div 
          className="absolute inset-0 z-0 opacity-40 mix-blend-screen scale-105"
          style={{ backgroundImage: 'url(/neural_energy_banner.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />
        
        <div className="flex items-center gap-4 px-6 z-20 w-full h-full relative">
          <div className="flex items-center gap-2 shrink-0 bg-background p-2 pr-4 rounded-r-3xl border-r border-primary/20 shadow-[20px_0_30px_rgba(0,0,0,0.8)] z-30">
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
              <span className="text-white/20">///</span>
              {/* Duplicate for infinite loop illusion */}
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

      {/* Immersive HeyGen Streaming Avatar Core */}
      <div className="absolute inset-0 pt-10 z-10 bg-[radial-gradient(circle_at_center,_var(--color-surface-container)_0%,_var(--color-background)_100%)] flex items-center justify-center pointer-events-none">
        <div className="w-full max-w-7xl opacity-90 scale-90 md:scale-100 flex items-center justify-center gap-12 relative translate-y-[-5%] overflow-visible pointer-events-auto px-4">

          {/* LEFT HUD: NEURAL TELEMETRY SHIELDS */}
          <div className="hidden xl:flex flex-col gap-10 flex-shrink-0 relative">
            {/* CARD 1: BIO-SYSTEM HEALTH */}
            <motion.div 
              initial={{ opacity: 0, x: -100, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="relative p-7 w-72 bg-white/[0.03] backdrop-blur-2xl border-l-2 border-primary shadow-[0_0_40px_rgba(0,0,0,0.5)] group overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 blur-[40px]" />
              {/* ANIMATED SCANLINE */}
              <motion.div 
                animate={{ top: ['-10%', '110%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute inset-x-0 h-[1px] bg-primary/40 z-10"
              />
              
              <h4 className="text-[10px] font-mono font-black text-primary tracking-[0.4em] uppercase mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                System_Vitality
              </h4>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Neural_Sync</span>
                    <span className="text-xs font-manrope font-black text-white">94%</span>
                  </div>
                  <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '94%' }} className="h-full bg-gradient-to-r from-primary/20 to-primary" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-end">
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">Latent_Flux</span>
                    <span className="text-xs font-manrope font-black text-primary italic">0.02ms</span>
                  </div>
                  <div className="h-[3px] bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: '12%' }} className="h-full bg-primary" />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* CARD 2: ENERGY MATRIX */}
            <motion.div 
              initial={{ opacity: 0, x: -100, rotateY: 30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
              className="relative p-7 w-72 bg-white/[0.03] backdrop-blur-2xl border-l border-white/10 group group overflow-hidden"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}
            >
              <h4 className="text-[10px] font-mono font-black text-white/30 tracking-[0.4em] uppercase mb-4">Core_Output</h4>
              <div className="relative">
                <p className="text-5xl font-manrope font-black text-white italic tracking-tighter drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  12.8
                </p>
                <span className="absolute -top-1 -right-4 text-[10px] font-mono text-primary font-bold">PTW/s</span>
              </div>
              <div className="mt-4 flex gap-1">
                {[...Array(12)].map((_, i) => (
                  <motion.div 
                    key={i}
                    animate={{ opacity: [0.2, 1, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="flex-1 h-1 bg-white/10 rounded-sm"
                  />
                ))}
              </div>
            </motion.div>
          </div>

          <VeraStreamingAvatar ref={avatarRef}>
            {/* Interaction Controls (Bottom Center) */}
            <div className="absolute bottom-4 md:bottom-12 left-1/2 transform -translate-x-1/2 z-[3000] w-full max-w-2xl px-3 md:px-4 pointer-events-auto">
              <div className="bg-surface-container-high/80 backdrop-blur-2xl p-3 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-4 border border-outline-variant/20 shadow-2xl shadow-primary/5">
                <VeraButton variant="ghost" icon="pi pi-microphone" className="rounded-full w-9 h-9 md:w-12 md:h-12 p-0 flex items-center justify-center bg-surface-container hover:bg-surface-container-highest border border-outline-variant/30 text-on-surface flex-shrink-0" />
                <VeraInput
                  aiAssisted
                  className="flex-1 bg-surface-container-lowest/50 text-white text-sm"
                  placeholder="Give Vera a command..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <VeraButton
                  variant="primary"
                  icon="pi pi-send"
                  className="rounded-full w-9 h-9 md:w-12 md:h-12 p-0 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] flex-shrink-0"
                  onClick={handleSend}
                />
                {/* EMERGENCY DISCONNECT BUTTON */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => avatarRef.current?.terminateSession()}
                  className="rounded-full w-9 h-9 md:w-12 md:h-12 p-0 flex-shrink-0 flex items-center justify-center bg-error border-2 border-white/20 text-white shadow-[0_0_30px_rgba(255,51,102,0.6)] animate-pulse hover:animate-none"
                  title="Emergency Termination"
                >
                  <i className="pi pi-power-off text-sm md:text-lg"></i>
                </motion.button>
              </div>
              <div className="text-center mt-2">
                <span className="text-[9px] md:text-[10px] font-mono tracking-widest text-outline">Listening: System Optimization Ready...</span>
              </div>
            </div>
          </VeraStreamingAvatar>

          {/* RIGHT HUD: ACTIVE NEURAL PROTOCOLS */}
          <div className="hidden xl:flex flex-col gap-10 flex-shrink-0 relative">
            {/* CARD 3: NETWORK FLUX */}
            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
              className="relative p-7 w-72 bg-white/[0.03] backdrop-blur-2xl border-r-2 border-secondary group overflow-hidden"
              style={{ clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%)' }}
            >
              <h4 className="text-[10px] font-mono font-black text-secondary tracking-[0.4em] uppercase mb-6 opacity-80">Network_Sync</h4>
              <div className="flex items-end gap-2 h-20 px-1">
                {[6, 8, 4, 7, 10, 5, 8, 3, 9].map((h, i) => (
                  <motion.div 
                    key={i} 
                    animate={{ height: [`${h * 8}%`, `${h * 11}%`, `${h * 8}%`] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                    className="flex-1 bg-secondary/30 rounded-t-sm relative group"
                  >
                    <div className="absolute inset-0 bg-secondary blur-md opacity-0 group-hover:opacity-50 transition-opacity" />
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 flex justify-between items-center text-[8px] font-mono text-white/30 uppercase tracking-[0.2em]">
                <span>Trans_Rate</span>
                <span className="text-secondary font-black">9.2 TB/S</span>
              </div>
            </motion.div>

            {/* CARD 4: ACTIVE COMMANDS */}
            <motion.div 
              initial={{ opacity: 0, x: 100, rotateY: -30 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="relative p-7 w-72 bg-white/[0.03] backdrop-blur-2xl border-r border-white/10 group overflow-hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)' }}
            >
              <h4 className="text-[10px] font-mono font-black text-white/30 tracking-[0.4em] uppercase mb-5">Neural_Threads</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:border-primary/40 transition-all cursor-crosshair">
                   <div className="flex items-center gap-3">
                      <i className="pi pi-spin pi-sync text-[8px] text-primary" />
                      <span className="text-[9px] font-mono text-white/80">GRID_LINK</span>
                   </div>
                   <span className="text-[8px] font-mono text-primary animate-pulse">Running</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl hover:border-secondary/40 transition-all cursor-crosshair">
                   <div className="flex items-center gap-3">
                      <i className="pi pi-shield text-[8px] text-secondary" />
                      <span className="text-[9px] font-mono text-white/80">SECURITY</span>
                   </div>
                   <span className="text-[8px] font-mono text-secondary">Secured</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
