"use client";
import { VeraNeuralGate } from '@/components/VeraNeuralGate';

export default function GatePage() {
    return (
        <div className="relative min-h-screen bg-background flex items-center justify-center overflow-hidden">
            {/* The Cinematic Door/Gate (High Priority Z-Index) */}
            <VeraNeuralGate />
            
            {/* Background Private Space (Heavily Blurred Teaser) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none filter blur-[80px] opacity-40 select-none">
                <div className="w-[80%] h-[60%] border-2 border-primary/20 rounded-[5rem] bg-surface-container-low shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col items-center justify-center gap-12">
                   <div className="w-24 h-24 rounded-full bg-primary/20 animate-pulse" />
                   <div className="w-[60%] h-4 bg-primary/10 rounded-full" />
                   <div className="w-[40%] h-4 bg-primary/10 rounded-full" />
                   <div className="grid grid-cols-3 gap-8 w-full px-20">
                      <div className="h-32 bg-primary/5 rounded-3xl" />
                      <div className="h-32 bg-primary/5 rounded-3xl" />
                      <div className="h-32 bg-primary/5 rounded-3xl" />
                   </div>
                </div>
                <h1 className="mt-20 text-9xl font-manrope font-black text-white/5 lowercase tracking-tighter">vera command center</h1>
            </div>

            {/* Ambient Background Glows that remain visible but soft */}
            <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-primary/5 blur-[150px] rounded-full" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full" />
        </div>
    );
}
