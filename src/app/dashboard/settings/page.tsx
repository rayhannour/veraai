"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const settingsGroups = [
  { id: 'general', name: 'Global Engine', icon: 'pi-cog' },
  { id: 'biometric', name: 'Zero-Trust Auth', icon: 'pi-shield' },
  { id: 'neural', name: 'Neural Network', icon: 'pi-bolt' },
  { id: 'hardware', name: 'IoT Devices', icon: 'pi-android' },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');

  return (
    <div className="flex flex-col gap-10 pb-24">
      
      {/* 1. HORIZONTAL TABS - scrollable on mobile */}
      <div className="flex gap-2 md:gap-4 border-b border-outline-variant/10 pb-4 md:pb-8 overflow-x-auto">
        {settingsGroups.map((tab) => (
          <motion.button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 md:px-8 py-3 md:py-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-4 transition-all border whitespace-nowrap flex-shrink-0 ${
              activeTab === tab.id 
              ? 'bg-primary/20 border-primary shadow-[0_0_20px_rgba(0,229,255,0.2)] text-white' 
              : 'bg-surface-container-low border-outline-variant/10 text-on-surface-variant hover:border-primary/40'
            }`}>
            <i className={`pi ${tab.icon} text-sm md:text-lg ${activeTab === tab.id ? 'text-primary' : ''}`} />
            <span className="text-xs md:text-sm font-manrope font-bold uppercase tracking-widest">{tab.name}</span>
          </motion.button>
        ))}
      </div>

      {/* 2. SETTINGS CONTENT TABLEAU */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Form / Controls */}
        <div className="lg:col-span-12 flex flex-col gap-8">
           <div className="bg-surface-container-low p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-outline-variant/20 shadow-2xl relative overflow-hidden flex flex-col gap-6 md:gap-10">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-12 relative z-10">
                 
                 {/* Parameter Card 1 */}
                 <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 bg-surface-container rounded-xl md:rounded-[2rem] border border-outline-variant/10 shadow-lg">
                    <h3 className="text-xl font-manrope font-bold text-white uppercase tracking-widest border-l-4 border-primary pl-6">Neural Optimization</h3>
                    <p className="text-sm font-inter text-on-surface-variant font-light mb-4">Set the threshold for autonomous cross-regional reroutes.</p>
                    <div className="flex flex-col gap-6">
                       <div className="flex justify-between items-center bg-background/50 px-6 py-4 rounded-xl border border-outline-variant/5">
                          <span className="text-xs font-mono text-outline uppercase tracking-widest">Aggression Rank</span>
                          <span className="text-primary font-black font-manrope">ALPHA-MAX</span>
                       </div>
                       <div className="w-full h-1 bg-surface-container-highest rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[80%]" />
                       </div>
                    </div>
                 </div>

                 {/* Parameter Card 2 */}
                 <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 bg-surface-container rounded-xl md:rounded-[2rem] border border-outline-variant/10 shadow-lg relative group overflow-hidden">
                    <h3 className="text-xl font-manrope font-bold text-white uppercase tracking-widest border-l-4 border-secondary pl-6">Hardware Sync</h3>
                    <p className="text-sm font-inter text-on-surface-variant font-light mb-4 text-secondary">Manage global ping levels for connected Android Nodes.</p>
                    <div className="flex flex-col gap-4">
                       {[
                         { label: 'Cloud Sync State', state: 'Active Hub' },
                         { label: 'Regional Mesh', state: 'Enabled' },
                         { label: 'Auto-Update Hub', state: 'Disabled' },
                       ].map((item, i) => (
                         <div key={i} className="flex justify-between items-center bg-background/50 px-6 py-3 rounded-xl border border-outline-variant/5">
                           <span className="text-[10px] font-mono text-outline uppercase tracking-widest">{item.label}</span>
                           <i className={`pi pi-check-circle text-secondary text-sm`}></i>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Parameter Card 3 */}
                 <div className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 bg-surface-container rounded-xl md:rounded-[2rem] border border-outline-variant/10 shadow-lg">
                    <h3 className="text-xl font-manrope font-bold text-white uppercase tracking-widest border-l-4 border-tertiary-fixed-dim pl-6">Biometric Level</h3>
                    <p className="text-sm font-inter text-on-surface-variant font-light mb-4">Verify identity using military grade Zero-Trust Retina scans.</p>
                    <div className="flex flex-col gap-4">
                       <button className="py-4 bg-tertiary/20 text-tertiary border border-tertiary/40 rounded-xl font-mono text-[10px] uppercase tracking-widest font-bold shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:bg-tertiary hover:text-surface transition-all">Enable Level 4 Access</button>
                       <p className="text-[9px] font-mono text-outline-variant leading-relaxed text-center opacity-50">Authorized IDs only. Subject to immediate lockout on mismatch.</p>
                    </div>
                 </div>

              </div>

               <div className="mt-6 md:mt-12 pt-6 md:pt-10 border-t border-outline-variant/10 relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0">
                 <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-3">
                       <span className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--color-primary)]" />
                       <p className="text-xs md:text-sm font-manrope font-bold text-white uppercase tracking-widest">Protocol Version: 9.4.1</p>
                    </div>
                    <p className="text-[10px] font-mono text-outline-variant ml-6">Last sync processed at 22:31:05 GMT</p>
                 </div>
                 <div className="flex items-center gap-3 md:gap-6 w-full md:w-auto">
                    <button className="text-xs font-mono tracking-widest text-outline-variant uppercase font-bold hover:text-white transition-colors">Default Reset</button>
                    <button className="flex-1 md:flex-none px-6 md:px-10 py-4 md:py-5 bg-gradient-to-br from-primary to-primary-container rounded-xl md:rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_60px_rgba(0,229,255,0.6)] hover:scale-105 transition-all text-surface font-manrope font-black text-xs md:text-sm uppercase tracking-widest">Update Monolith</button>
                 </div>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
