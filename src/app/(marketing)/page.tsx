"use client";
import React from 'react';
import { VeraLandingGate } from '@/components/VeraLandingGate';

/**
 * ROOT INTRO PAGE (/)
 * This page only shows the cinematic Vera Landing Gate (Broken Glass effect).
 * Once the animation is complete, it redirects the user to /welcome.
 */
export default function IntroPage() {
  return (
    <main className="fixed inset-0 bg-black z-[1000] overflow-hidden">
      <VeraLandingGate />
      
      {/* Background hint for SEO / No-JS fallback */}
      <div className="absolute inset-x-0 bottom-24 text-center opacity-10 pointer-events-none">
        <p className="text-white font-mono text-[10px] tracking-[2em] uppercase">Initializing Neural Monolith</p>
      </div>
    </main>
  );
}
