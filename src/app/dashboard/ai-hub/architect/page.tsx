"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VeraStreamingAvatar, VeraStreamingAvatarHandle } from '@/components/VeraStreamingAvatar';
import { VeraInput } from '@/components/VeraInput';
import { VeraButton } from '@/components/VeraButton';
import { VeraCard } from '@/components/VeraCard';

export default function ArchitectHubPage() {
  const avatarRef = useRef<VeraStreamingAvatarHandle>(null);
  const [inputText, setInputText] = useState("");
  const [logs, setLogs] = useState<{ id: string; text: string; type: 'system' | 'ai' | 'user' }[]>([
    { id: '1', text: 'NEURAL_LINK_PROTOCOL_v0.92_INITIALIZED', type: 'system' },
    { id: '2', text: 'AWAITING_COGNITIVE_HANDSHAKE...', type: 'system' },
  ]);

  const addLog = (text: string, type: 'system' | 'ai' | 'user') => {
    setLogs(prev => [{ id: Math.random().toString(36).substr(2, 9), text, type }, ...prev].slice(0, 50));
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const text = inputText;
    addLog(`USER_INPUT: "${text}"`, 'user');
    setInputText("");
    addLog('GEN_RESPONSE_PENDING...', 'system');
    await avatarRef.current?.sendMessage(text);
  };

  return (
    <div className="flex w-full h-[100vh] bg-[#0c0e12] overflow-hidden text-[#f8f9fe] font-manrope">
      
      {/* 1. ARCHITECTURAL SIDEBAR (LEFT) - EDITORIAL STYLE */}
      <div className="w-[45%] h-full p-16 flex flex-col justify-between border-r border-white/5 bg-gradient-to-b from-white/5 to-transparent relative z-20">
        
        <div className="space-y-12">
          {/* HUGE EDITORIAL TITLE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[12px] font-mono tracking-[0.6em] text-primary font-black uppercase block mb-4 opacity-60">System Phase 0.1</span>
            <h1 className="text-[6rem] leading-[0.85] font-black tracking-[-0.05em] uppercase italic bg-gradient-to-br from-white via-white to-white/20 bg-clip-text text-transparent">
              Kinetic<br/>Intell.
            </h1>
          </motion.div>

          {/* SYSTEM DATA LOGS (SPACE GROTESK) */}
          <VeraCard glass className="bg-white/5 backdrop-blur-[40px] border-white/10 rounded-[2.5rem] p-8">
            <h4 className="text-[11px] font-mono font-black text-white/30 tracking-[0.4em] uppercase mb-8">Neural_Thought_Stream</h4>
            <div className="h-[300px] overflow-y-auto space-y-4 font-space-grotesk text-[10px] tracking-wider fitness-scrollbar pr-4">
              <AnimatePresence initial={false}>
                {logs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, scale: 0.9, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    className="flex gap-4 border-l-2 border-primary/20 pl-4 py-1"
                  >
                    <span className={`flex-shrink-0 ${log.type === 'system' ? 'text-white/20' : log.type === 'user' ? 'text-secondary font-bold' : 'text-primary'}`}>
                      [{log.type === 'system' ? 'SYS' : log.type === 'user' ? 'USR' : 'AI'}]
                    </span>
                    <span className={`${log.type === 'system' ? 'text-white/40' : 'text-white/80'}`}>
                      {log.text}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </VeraCard>
        </div>

        {/* BOTTOM METADATA */}
        <div className="flex justify-between items-end border-t border-white/10 pt-8 opacity-40">
          <div className="text-[10px] font-mono leading-relaxed tracking-widest uppercase">
            Telemetry_Node: VERA_PRIME_01<br/>
            Location: REDACTED_SECURE_HUB
          </div>
          <div className="text-right text-[10px] font-mono italic">
            &copy; 2026_VERA_DYNAMICS
          </div>
        </div>
      </div>

      {/* 2. AI AVATAR CORE (RIGHT) - MONOLITH CHASSIS */}
      <div className="flex-1 h-full relative flex items-center justify-center p-12">
        
        {/* Background Depth Layers */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[150px] rounded-full animate-pulse-glow" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/10 blur-[150px] rounded-full animate-float" />
        </div>

        {/* THE MONOLITH CONTAINER */}
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           animate={{ opacity: 1, scale: 1 }}
           className="w-full h-full max-w-4xl aspect-[4/5] relative z-10"
        >
          <VeraStreamingAvatar ref={avatarRef}>
             {/* Interaction Controls - Architectural Overlay */}
             <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-full max-w-xl px-4 z-[4000]">
                <VeraCard glass className="bg-black/60 backdrop-blur-[60px] border-white/10 rounded-[3rem] p-6 shadow-2xl flex items-center gap-6">
                  <VeraInput 
                    aiAssisted
                    className="flex-1 bg-transparent border-none text-[18px] font-manrope font-semibold text-white placeholder-white/20 h-16"
                    placeholder="Command the Architect..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  />
                  <VeraButton 
                    variant="primary" 
                    icon="pi pi-bolt" 
                    className="w-16 h-16 rounded-full flex-shrink-0 shadow-[0_0_30px_rgba(0,229,255,0.4)]" 
                    onClick={handleSend}
                  />
                </VeraCard>
                <div className="text-center mt-6">
                  <span className="text-[9px] font-mono tracking-[0.5em] text-white/20 uppercase">
                    Awaiting_Authorized_Protocol_Instruction
                  </span>
                </div>
             </div>
          </VeraStreamingAvatar>
        </motion.div>

        {/* HUD OVERLAYS (ARCHITECT STYLE) */}
        <div className="absolute top-16 right-16 flex flex-col gap-4 text-right z-30 opacity-30 font-mono text-[9px] tracking-widest uppercase">
          <p>Stream: 2160p_ENCRYPTED</p>
          <p>Latency: 0.04ms</p>
          <p>Encryption: AES_512_QUANTUM</p>
        </div>
      </div>

    </div>
  );
}
