"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { VeraCard } from '@/components/VeraCard';

export default function EnergyDashboard() {
  return (
    <div className="flex flex-col gap-8 pb-20">
      {/* 1. TOP STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Real-time Output', val: '412.5 MW', trend: '+12%', color: 'text-primary' },
          { label: 'Grid Efficiency', val: '99.8%', trend: 'Optimal', color: 'text-secondary' },
          { label: 'Active Reroutes', val: '14,092', trend: 'Auto-Balancing', color: 'text-primary-container' },
          { label: 'Cost Savings (MTD)', val: '€12,490', trend: '-18% OpEx', color: 'text-tertiary-fixed-dim' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-xl"
          >
            <p className="text-xs font-mono text-outline-variant uppercase tracking-widest mb-2">{stat.label}</p>
            <h3 className={`text-3xl font-manrope font-black ${stat.color}`}>{stat.val}</h3>
            <p className="text-[10px] font-mono text-outline mt-2 uppercase">{stat.trend}</p>
          </motion.div>
        ))}
      </div>

      {/* 2. MAIN TABLEAU (GRID DEVIS / TELEMETRY) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Energy Graphic */}
        <div className="lg:col-span-8 bg-surface-container p-8 rounded-[2rem] border border-outline-variant/20 shadow-inner flex flex-col gap-6">
           <div className="flex justify-between items-center mb-4">
             <h3 className="text-xl font-manrope font-bold text-white uppercase tracking-tight">Regional Energy Distribution</h3>
             <span className="text-[10px] font-mono text-primary animate-pulse">LIVE DATA STREAM</span>
           </div>
           
           <div className="w-full flex-1 min-h-[400px] relative bg-surface-container-highest/30 rounded-2xl border border-outline-variant/10 overflow-hidden flex items-center justify-center">
             {/* Fake Graph SVG */}
             <svg width="100%" height="100%" viewBox="0 0 800 300" className="opacity-60">
                <path d="M0,250 Q100,200 200,250 T400,100 T600,200 T800,50" fill="none" stroke="var(--color-primary)" strokeWidth="3" className="drop-shadow-[0_0_10px_var(--color-primary)]" />
                <path d="M0,300 L0,250 Q100,200 200,250 T400,100 T600,200 T800,50 L800,300 Z" fill="url(#energyGrad)" opacity="0.1" />
                <defs>
                  <linearGradient id="energyGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" />
                    <stop offset="100%" stopColor="transparent" />
                  </linearGradient>
                </defs>
             </svg>
             
             {/* Dynamic Floating Tooltips */}
             <div className="absolute top-[20%] left-[45%] bg-background/80 backdrop-blur-md border border-primary/30 p-4 rounded-xl shadow-2xl">
                <p className="text-xs font-mono text-primary mb-1">Peak Node: Alpha-1</p>
                <p className="text-sm font-bold text-white">Load: 92% (Normal)</p>
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                <h4 className="text-sm font-manrope font-bold text-white mb-4">Current Usage Breakdown</h4>
                <div className="flex flex-col gap-4">
                   {[
                     { label: 'Industrial', val: '65%', color: 'bg-primary' },
                     { label: 'Residential', val: '22%', color: 'bg-secondary' },
                     { label: 'Commercial', val: '13%', color: 'bg-primary-container' },
                   ].map((item, i) => (
                     <div key={i} className="flex flex-col gap-1">
                        <div className="flex justify-between text-[10px] font-mono uppercase">
                          <span>{item.label}</span>
                          <span className="text-white">{item.val}</span>
                        </div>
                        <div className="w-full h-1.5 bg-background rounded-full overflow-hidden">
                           <div className={`h-full ${item.color}`} style={{ width: item.val }} />
                        </div>
                     </div>
                   ))}
                </div>
              </div>
              <div className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                <h4 className="text-sm font-manrope font-bold text-white mb-4">Cost Variance Matrix</h4>
                <p className="text-xs text-on-surface-variant font-inter mb-4">AI optimization has successfully bypassed the following surge costs this hour.</p>
                <div className="flex flex-col gap-2 font-mono text-[10px]">
                   <p className="flex justify-between border-b border-outline-variant/5 pb-2"><span>EU_NORTH_SURGE:</span> <span className="text-error">-€1,200</span></p>
                   <p className="flex justify-between border-b border-outline-variant/5 pb-2"><span>ASIA_RELAY_FEE:</span> <span className="text-error">-€840</span></p>
                   <p className="flex justify-between"><span>TOTAL AVOIDED:</span> <span className="text-primary font-bold">€2,040</span></p>
                </div>
              </div>
           </div>
        </div>

        {/* Right: Devis / Active Quotes Table */}
        <div className="lg:col-span-4 bg-surface-container-low p-8 rounded-[2rem] border border-outline-variant/20 shadow-lg flex flex-col">
           <h3 className="text-xl font-manrope font-bold text-white mb-8">Active Devis & Quotes</h3>
           <div className="flex flex-col gap-4">
              {[
                { id: 'DV-9012', client: 'Global Dynamics', amount: '€142,000', status: 'Pending AI Scan', color: 'bg-primary-container' },
                { id: 'DV-9013', client: 'Neural Systems', amount: '€18,500', status: 'Contract Ready', color: 'bg-primary' },
                { id: 'DV-9014', client: 'Energy Corp', amount: '€450,200', status: 'Risk Check', color: 'bg-warning' },
                { id: 'DV-9015', client: 'Connect Inc', amount: '€9,000', status: 'Deployed', color: 'bg-secondary' },
              ].map((devis, i) => (
                <div key={i} className="p-5 bg-surface-container rounded-2xl border border-outline-variant/10 hover:border-primary/30 transition-all group cursor-pointer relative overflow-hidden">
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-[10px] font-mono text-outline-variant font-bold">{devis.id}</span>
                     <span className={`px-2 py-0.5 rounded text-[8px] font-mono text-surface font-black uppercase ${devis.color}`}>{devis.status}</span>
                   </div>
                   <p className="text-sm font-manrope font-bold text-white mb-1">{devis.client}</p>
                   <p className="text-xl font-manrope font-black text-white">{devis.amount}</p>
                   <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <i className="pi pi-chevron-right text-primary text-xs"></i>
                   </div>
                </div>
              ))}
           </div>
           <button className="mt-8 w-full py-4 bg-primary text-surface font-bold text-xs font-mono uppercase tracking-widest rounded-xl shadow-[0_0_20px_rgba(0,229,255,0.2)] hover:shadow-[0_0_40px_rgba(0,229,255,0.4)] transition-all">
             Generate New Quote
           </button>
        </div>
      </div>

    </div>
  );
}
