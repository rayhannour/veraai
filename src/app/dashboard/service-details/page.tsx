import React from 'react';
import { VeraCard } from '@/components/VeraCard';

export default function ServiceDetailsPage() {
  return (
    <div className="flex flex-col min-h-screen p-8 lg:p-12 gap-8 max-w-[1400px] mx-auto w-full">
      {/* AI Insight Banner */}
      <VeraCard className="bg-primary-container/[0.05] border border-primary/20 flex flex-col md:flex-row gap-6 items-center shadow-[0_0_40px_rgba(0,229,255,0.05)] rounded-[1.5rem]">
        <div className="w-16 h-16 rounded-full bg-surface-container-high border-2 border-primary-fixed-dim flex items-center justify-center relative flex-shrink-0 animate-pulse">
           <i className="pi pi-user text-primary text-2xl"></i>
           <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-tertiary-fixed-dim rounded-full border-2 border-surface"></div>
        </div>
        <div className="flex-1">
          <h2 className="text-sm font-mono tracking-widest text-primary-fixed-dim mb-1 uppercase">AI Optimization Complete</h2>
          <p className="text-on-surface font-inter text-lg leading-relaxed">
            I've applied real-time predictive caching to Node Gamma. Throughput is currently +12.4% above median. No critical packet loss detected on primary telecom trunks.
          </p>
        </div>
      </VeraCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Data Chart Simulation 1 */}
        <VeraCard glass className="flex flex-col gap-6 p-8 min-h-[400px]">
           <div className="flex justify-between items-end">
             <h3 className="text-xl font-manrope font-semibold text-on-surface">Energy Draw Array</h3>
             <span className="text-secondary font-mono text-sm border-b border-secondary pb-1">LAST 24H</span>
           </div>
           
           <div className="flex-1 border-l border-b border-outline-variant/30 flex items-end justify-between p-4 relative h-full">
             {/* Fake Bars representing graph */}
             {[40, 60, 30, 80, 50, 90, 45, 70, 85].map((val, i) => (
                <div key={i} className="w-8 rounded-t border-t border-x border-primary/20 bg-gradient-to-t from-transparent to-primary/30 hover:to-primary/50 transition-all cursor-crosshair group relative" style={{ height: `${val}%`}}>
                  <div className="hidden group-hover:block absolute -top-8 left-1/2 -translate-x-1/2 bg-surface-container-high px-2 py-1 rounded text-xs text-primary shadow-lg border border-primary-container font-mono">{val}%</div>
                </div>
             ))}
           </div>
        </VeraCard>

        {/* Data Chart Simulation 2 */}
        <VeraCard className="flex flex-col gap-6 p-8 min-h-[400px] border border-outline-variant/10">
           <div className="flex justify-between items-end">
             <h3 className="text-xl font-manrope font-semibold text-on-surface">Telecom Saturation</h3>
             <span className="text-primary-fixed-dim font-mono text-sm border-b border-primary-fixed-dim pb-1">LIVE</span>
           </div>
           
           <div className="flex-1 flex flex-col justify-center gap-6">
             <div className="flex items-center gap-4">
               <span className="text-xs font-mono text-outline-variant w-12 text-right">BAND A</span>
               <div className="flex-1 h-3 bg-surface-container-low rounded-full overflow-hidden">
                 <div className="w-[85%] h-full bg-primary loading-bar"></div>
               </div>
               <span className="text-sm font-manrope text-on-surface w-12 text-right">85%</span>
             </div>
             
             <div className="flex items-center gap-4">
               <span className="text-xs font-mono text-outline-variant w-12 text-right">BAND B</span>
               <div className="flex-1 h-3 bg-surface-container-low rounded-full overflow-hidden">
                 <div className="w-[45%] h-full bg-secondary loading-bar"></div>
               </div>
               <span className="text-sm font-manrope text-on-surface w-12 text-right">45%</span>
             </div>
             
             <div className="flex items-center gap-4">
               <span className="text-xs font-mono text-outline-variant w-12 text-right">BAND C</span>
               <div className="flex-1 h-3 bg-surface-container-low rounded-full overflow-hidden">
                 <div className="w-[20%] h-full bg-tertiary-fixed-dim loading-bar"></div>
               </div>
               <span className="text-sm font-manrope text-tertiary w-12 text-right">20%</span>
             </div>
           </div>
        </VeraCard>
      </div>
    </div>
  );
}
