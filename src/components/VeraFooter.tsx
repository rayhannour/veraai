import React from 'react';
import Link from 'next/link';

export function VeraFooter() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/20 pt-10 md:pt-16 pb-8 px-6 sm:px-8 md:px-16 mt-auto z-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -top-32 w-[400px] md:w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl mx-auto mb-10 md:mb-16 relative z-10">
        {/* Brand block - full width on mobile */}
        <div className="col-span-2 flex flex-col gap-4 md:gap-6">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-7 h-7 md:w-8 md:h-8 border-t-2 border-r-2 border-primary-container rounded-tr-xl rounded-bl-xl flex items-center justify-center relative shadow-[0_0_10px_rgba(0,229,255,0.4)]" />
            <span className="text-lg md:text-xl font-manrope font-bold tracking-widest uppercase text-on-surface">Vera</span>
          </div>
          <p className="text-sm font-inter text-on-surface-variant max-w-xs md:max-w-md leading-relaxed">
            The Digital Monolith for Energy & Connectivity. Merge proactive kinetic telemetry with
            global telecommunications throughput, orchestrated by intelligent algorithms.
          </p>
          <div className="flex gap-3 md:gap-4 mt-1 md:mt-2">
            {['twitter', 'linkedin', 'github'].map((icon) => (
              <a key={icon} href="#" className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary-container hover:text-primary transition-all text-on-surface-variant">
                <i className={`pi pi-${icon} text-sm`} />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <h4 className="text-xs font-mono tracking-widest uppercase text-primary-fixed-dim border-b border-primary/20 pb-2 mb-1 inline-block w-fit">Platform</h4>
          <Link href="/features" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Neural Features</Link>
          <Link href="/pricing" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Enterprise Pricing</Link>
          <Link href="/smart-vue" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Smart Vue Command</Link>
          <Link href="/ai-hub" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">AI Hub Live</Link>
        </div>

        <div className="flex flex-col gap-3 md:gap-4">
          <h4 className="text-xs font-mono tracking-widest uppercase text-primary-fixed-dim border-b border-primary/20 pb-2 mb-1 inline-block w-fit">Company</h4>
          <Link href="/about" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">The Digital Monolith</Link>
          <Link href="/contact" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Secure Contact</Link>
          <a href="#" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Privacy Neural Ethics</a>
          <a href="#" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>

      <div className="border-t border-outline-variant/20 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-0 text-[10px] md:text-xs font-mono tracking-widest text-outline-variant uppercase relative z-10 max-w-7xl mx-auto text-center md:text-left">
        <span>© 2026 Vera Neural Infrastructure. All rights reserved.</span>
        <span className="flex items-center gap-2">
          <i className="pi pi-circle-fill text-[8px] text-primary-container animate-ping" /> Core System Online
        </span>
      </div>
    </footer>
  );
}
