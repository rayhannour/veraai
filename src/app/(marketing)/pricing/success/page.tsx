"use client";
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    // Optional: Verify session with backend or trigger a confetti effect
    console.log("Payment Confirmed for Session:", sessionId);
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8 relative overflow-hidden font-inter">
      
      {/* BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 blur-[150px] rounded-full animate-pulse-glow" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-xl w-full bg-surface-container-high/60 backdrop-blur-3xl p-12 rounded-[3.5rem] border border-primary/30 shadow-[0_40px_120px_rgba(0,0,0,0.6)] text-center relative z-10"
      >
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-10 border border-primary/40 shadow-[0_0_40px_rgba(0,229,255,0.4)]">
          <i className="pi pi-check text-4xl text-primary font-black"></i>
        </div>

        <span className="text-[10px] font-mono tracking-[0.4em] text-primary uppercase font-bold mb-4 block opacity-60">Authentication Successful</span>
        
        <h1 className="text-4xl md:text-5xl font-manrope font-black text-white mb-6 uppercase tracking-tight">
          Neural Core <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-container">Activated.</span>
        </h1>

        <p className="text-on-surface-variant text-lg leading-relaxed mb-12 font-light">
          Your credentials have been verified. The Vera Kinetic Hub is now syncing with your global nodes. 
          Deployment of your core intelligence is underway.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/dashboard/ai-hub">
            <button className="w-full py-5 rounded-2xl bg-gradient-to-br from-primary to-primary-container text-surface font-mono tracking-widest uppercase font-black shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.7)] transition-all flex items-center justify-center gap-3">
              Enter UI Command Center <i className="pi pi-arrow-right"></i>
            </button>
          </Link>
          
          <Link href="/dashboard/settings">
            <button className="w-full py-5 rounded-2xl border border-white/10 text-white hover:bg-white/5 transition-colors text-xs font-mono tracking-widest uppercase">
              Manage Subscription Logs
            </button>
          </Link>
        </div>

        {/* TELEMETRY FOOT note */}
        <div className="mt-12 pt-8 border-t border-white/10 text-[9px] font-mono text-white/30 tracking-widest uppercase">
          Neural_Session_ID: {sessionId?.slice(0, 20)}...
        </div>
      </motion.div>
    </div>
  );
}
