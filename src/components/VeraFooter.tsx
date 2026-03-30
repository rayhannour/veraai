import React from 'react';
import Link from 'next/link';

export function VeraFooter() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-outline-variant/20 pt-16 pb-8 px-12 md:px-24 mt-auto z-10 relative overflow-hidden">
      {/* Decorative Glow */}
      <div className="absolute top-0 left-1/2 -top-32 w-[600px] h-[300px] bg-primary/5 blur-[100px] rounded-full pointer-events-none -translate-x-1/2"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 max-w-7xl mx-auto mb-16 relative z-10">
        <div className="col-span-1 md:col-span-2 flex flex-col gap-6">
          <div className="flex items-center gap-4 group">
            <div className="w-8 h-8 border-t-2 border-r-2 border-primary-container rounded-tr-xl rounded-bl-xl flex items-center justify-center relative shadow-[0_0_10px_rgba(0,229,255,0.4)]"></div>
            <span className="text-xl font-manrope font-bold tracking-widest uppercase text-on-surface">Vera</span>
          </div>
          <p className="text-sm font-inter text-on-surface-variant max-w-md leading-relaxed">
            The Digital Monolith for Energy & Connectivity. Merge proactive kinetic telemetry with
            global telecommunications throughput, orchestrated by intelligent algorithms.
          </p>
          <div className="flex gap-4 mt-2">
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary-container hover:text-primary transition-all text-on-surface-variant"><i className="pi pi-twitter"></i></a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary-container hover:text-primary transition-all text-on-surface-variant"><i className="pi pi-linkedin"></i></a>
            <a href="#" className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center border border-outline-variant/30 hover:border-primary-container hover:text-primary transition-all text-on-surface-variant"><i className="pi pi-github"></i></a>
          </div>
        </div>
        
        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-mono tracking-widest uppercase text-primary-fixed-dim border-b border-primary/20 pb-2 mb-2 inline-block w-fit">Platform</h4>
          <Link href="/features" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Neural Features</Link>
          <Link href="/pricing" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Enterprise Pricing</Link>
          <Link href="/smart-vue" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Smart Vue Command</Link>
          <Link href="/ai-hub" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">AI Hub Live</Link>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-xs font-mono tracking-widest uppercase text-primary-fixed-dim border-b border-primary/20 pb-2 mb-2 inline-block w-fit">Company</h4>
          <Link href="/about" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">The Digital Monolith</Link>
          <Link href="/contact" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Secure Contact</Link>
          <a href="#" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Privacy Neural Ethics</a>
          <a href="#" className="text-sm font-inter text-on-surface-variant hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
      
      <div className="border-t border-outline-variant/20 pt-8 flex flex-col md:flex-row justify-between items-center text-xs font-mono tracking-widest text-outline-variant uppercase relative z-10 max-w-7xl mx-auto">
        <span>© 2026 Vera Neural Infrastructure. All rights reserved.</span>
        <span className="flex items-center gap-2 mt-4 md:mt-0"><i className="pi pi-circle-fill text-[8px] text-primary-container animate-ping"></i> Core System Online</span>
      </div>
    </footer>
  );
}
