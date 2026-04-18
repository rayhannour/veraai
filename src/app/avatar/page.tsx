"use client";
import React, { useRef, useState } from 'react';
import { VeraStreamingAvatarHandle } from '@/components/VeraStreamingAvatar';
import AvatarMarketingPage from './AvatarMarketingPage';
import AvatarMarketingRealTime from './AvatarMarketingRealTime';
import Presentation, { PresentationHandle } from './presentation';
import { motion, AnimatePresence } from 'framer-motion';

export default function AvatarParentPage() {
  const avatarRef = useRef<VeraStreamingAvatarHandle>(null);
  const presentationRef = useRef<PresentationHandle>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<'repeat' | 'interactive'>('repeat');

  const handleRepeatScript = (script: string) => {
    avatarRef.current?.repeat(script);
  };

  const handleAvatarSpeakEnd = () => {
    presentationRef.current?.handleAvatarFinished();
  };

  const handleInitiate = () => {
    avatarRef.current?.startSession();
  };

  const toggleMode = (newMode: 'repeat' | 'interactive') => {
    setMode(newMode);
  };

  return (
    <div ref={containerRef} className="flex flex-col h-[100svh] w-full overflow-hidden bg-[radial-gradient(circle_at_center,_var(--color-surface-container)_0%,_var(--color-background)_100%)]">

      {/* ── TOP INTERFACE HUD (Switcher) ── */}
      <div className="absolute top-6 left-6 z-[5000] flex items-center gap-6 px-8 py-3 bg-surface-container/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] portrait:max-lg:top-4 portrait:max-lg:left-4 portrait:max-lg:gap-4 portrait:max-lg:px-4 portrait:max-lg:py-2">
        <h2 className="text-[10px] font-mono font-black text-white/40 uppercase tracking-[0.4em] hidden sm:block">Link_Protocol</h2>

        <div className="flex items-center gap-1 bg-background/50 p-1 rounded-full border border-white/5 relative">
          <motion.div
            className="absolute inset-y-1 bg-primary/20 border border-primary/50 shadow-[0_0_15px_rgba(0,229,255,0.3)] rounded-full z-0"
            initial={false}
            animate={{ left: mode === 'repeat' ? '4px' : '50%', width: 'calc(50% - 4px)' }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          />
          <button
            onClick={() => toggleMode('repeat')}
            className={`relative z-10 px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 ${mode === 'repeat' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
          >
            <i className="pi pi-sync"></i> Replay
          </button>
          <button
            onClick={() => toggleMode('interactive')}
            className={`relative z-10 px-6 py-2 text-[10px] font-mono font-bold uppercase tracking-wider rounded-full transition-all flex items-center gap-2 ${mode === 'interactive' ? 'text-primary' : 'text-white/40 hover:text-white/70'}`}
          >
            <i className="pi pi-bolt"></i> Neural
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'repeat' ? (
          <motion.div
            key="repeat-mode"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="flex flex-col lg:flex-row landscape:flex-row h-full w-full"
          >
            {/* 30% Width Container - Avatar */}
            <div className="w-full lg:w-[30%] lg:h-full landscape:w-[30%] landscape:h-full portrait:max-lg:shrink-0 portrait:max-lg:h-[40svh] relative z-20">
              <AvatarMarketingPage avatarRef={avatarRef} onAvatarSpeakEnd={handleAvatarSpeakEnd} />
            </div>

            {/* 70% Width Container - Presentation */}
            <div className="w-full lg:w-[70%] lg:h-full landscape:w-[70%] landscape:h-full flex flex-col relative z-10 portrait:max-lg:flex-1 portrait:max-lg:overflow-hidden">
              <Presentation ref={presentationRef} onRepeatScript={handleRepeatScript} onInitiate={handleInitiate} />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="interactive-mode"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="h-full w-full"
          >
            <AvatarMarketingRealTime avatarRef={avatarRef} />
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
