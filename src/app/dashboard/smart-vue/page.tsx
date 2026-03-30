import React from 'react';
import { VeraCard } from '@/components/VeraCard';
import { VeraButton } from '@/components/VeraButton';

export default function SmartVuePage() {
  return (
    <div className="flex flex-col min-h-screen p-8 lg:p-12 gap-8 max-w-[1600px] mx-auto w-full animate-fadein">
      <header className="flex justify-between items-end pb-8 border-b border-outline-variant/30">
        <div>
          <p className="text-secondary font-semibold font-inter tracking-widest text-xs uppercase mb-2">Command Center</p>
          <h1 className="text-4xl font-bold font-manrope text-primary-fixed-dim">Smart Vue Topology</h1>
        </div>
        <div className="flex gap-4">
          <VeraButton variant="ghost" icon="pi pi-filter" label="Filter Nodes" />
          <VeraButton variant="primary" icon="pi pi-sync" label="Run Diagnostics" />
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[calc(100vh-200px)]">
        {/* Main Network Topology Map */}
        <VeraCard className="lg:col-span-2 relative flex flex-col h-full bg-surface-container-low border border-outline-variant/20 rounded-2xl overflow-hidden shadow-none">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-primary-container)_0%,_transparent_15%)] opacity-5 animate-pulse"></div>
          
          <div className="p-6 relative z-10 flex justify-between items-center">
            <h2 className="text-xl font-manrope font-semibold text-on-surface">Global Node Interconnect</h2>
            <span className="bg-primary/10 text-primary-container px-3 py-1 rounded-full text-xs tracking-wider border border-primary/20">
              <i className="pi pi-circle-fill text-[8px] mr-2 animate-pulse"></i> LIVE
            </span>
          </div>

          <div className="flex-1 relative w-full h-full flex items-center justify-center">
            {/* SVG Abstract Topology Network Map */}
            <svg width="100%" height="100%" viewBox="0 0 800 500" className="opacity-60 max-h-[400px]">
              <path d="M100 250 L300 150 L500 200 L700 100" stroke="var(--color-primary-container)" strokeWidth="2" fill="none" strokeDasharray="5,5" className="animate-pulse" />
              <path d="M300 150 L400 350 L500 200 L600 400" stroke="var(--color-secondary)" strokeWidth="1" fill="none" />
              <circle cx="100" cy="250" r="8" fill="var(--color-primary)" />
              <circle cx="300" cy="150" r="12" fill="var(--color-primary-container)" className="animate-ping" style={{animationDuration: '3s'}}/>
              <circle cx="500" cy="200" r="10" fill="var(--color-primary)" />
              <circle cx="400" cy="350" r="6" fill="var(--color-secondary)" />
              <circle cx="600" cy="400" r="8" fill="var(--color-secondary)" />
              <circle cx="700" cy="100" r="14" fill="var(--color-primary-fixed-dim)" />
            </svg>
          </div>
        </VeraCard>

        {/* Right Side Telemetry & Logs */}
        <div className="flex flex-col gap-8 h-full">
          {/* Telemetry Widgets */}
          <div className="grid grid-cols-2 gap-4">
            <VeraCard glass className="p-5">
              <p className="text-on-surface-variant text-xs mb-1 font-inter uppercase">Grid Stability</p>
              <p className="text-2xl font-manrope text-primary-container">99.98%</p>
            </VeraCard>
            <VeraCard glass className="p-5">
              <p className="text-on-surface-variant text-xs mb-1 font-inter uppercase">Uplink Latency</p>
              <p className="text-2xl font-manrope text-secondary">14ms</p>
            </VeraCard>
          </div>

          {/* AI Optimization Log */}
          <VeraCard className="flex-1 flex flex-col bg-surface-container overflow-hidden p-6 rounded-2xl">
            <h3 className="text-sm font-manrope text-on-surface tracking-widest uppercase mb-6 flex items-center gap-2">
              <i className="pi pi-sparkles text-primary-container"></i> Proactive AI Optimization Log
            </h3>
            
            <div className="flex flex-col gap-5 overflow-y-auto pr-2">
              {[
                { time: '10:42:01', msg: 'Rerouting telecom node alpha to reduce packet drop.', status: 'text-primary-container' },
                { time: '10:38:15', msg: 'Energy load balancing initiated for Sector 7.', status: 'text-secondary' },
                { time: '10:15:00', msg: 'Minor grid anomaly detected. Auto-corrected.', status: 'text-outline' },
                { time: '09:59:22', msg: 'System diagnostics complete. All nominal.', status: 'text-outline' },
              ].map((log, i) => (
                <div key={i} className="flex gap-4 items-start border-l border-outline-variant/30 pl-4 py-1 relative">
                  <div className={`absolute -left-[5px] top-2 w-[9px] h-[9px] rounded-full bg-surface border-2 border-[var(--color-primary-container)] ${log.status === 'text-primary-container' ? 'animate-pulse' : ''}`}></div>
                  <span className="text-xs text-on-surface-variant font-mono mt-0.5">{log.time}</span>
                  <p className={`text-sm font-inter leading-relaxed ${log.status === 'text-outline' ? 'text-on-surface-variant' : 'text-on-surface'}`}>{log.msg}</p>
                </div>
              ))}
            </div>
          </VeraCard>
        </div>
      </div>
    </div>
  );
}
