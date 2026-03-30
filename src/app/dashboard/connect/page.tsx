"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { VeraCard } from '@/components/VeraCard';

const connectStats = [
  { label: 'Global Ping Avg', val: '18.4 ms', trend: '-72% Optimised', icon: 'pi-bolt' },
  { label: 'Node Throughput', val: '1.2 Tbps', trend: 'Peak Capacity', icon: 'pi-wifi' },
  { label: 'Encryption Strength', val: 'AES-512', trend: 'Military Grade', icon: 'pi-lock' },
  { label: 'Hardware Sync', val: '100%', trend: 'Android v14', icon: 'pi-android' },
];

export default function ConnectDashboard() {
  return (
    <div className="flex flex-col gap-10 pb-24">
      
      {/* 1. TOP STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {connectStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container/50 border border-outline-variant/10 p-8 rounded-[2.5rem] flex flex-col justify-between h-48 relative overflow-hidden group hover:border-secondary transition-colors cursor-pointer"
          >
            <div className="absolute -top-4 -right-4 bg-secondary/10 w-24 h-24 rounded-full blur-3xl group-hover:bg-secondary/20 transition-all opacity-0 group-hover:opacity-100" />
            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono tracking-widest text-outline-variant uppercase">{stat.label}</span>
              <i className={`pi ${stat.icon} text-secondary text-xl`}></i>
            </div>
            <h3 className="text-4xl font-manrope font-black text-white">{stat.val}</h3>
            <p className="text-[10px] font-mono text-secondary mt-2 uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-secondary rounded-full animate-pulse" />
              {stat.trend}
            </p>
          </motion.div>
        ))}
      </div>

      {/* 2. THE TOPOLOGY TABLEAU (REAL-TIME DATA) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
        
        {/* Left: Interactive Node Map / Table */}
        <div className="lg:col-span-8 bg-surface-container-low p-12 rounded-[3.5rem] border border-outline-variant/30 flex flex-col shadow-2xl relative overflow-hidden group">
           <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="flex justify-between items-center mb-10 border-b border-outline-variant/10 pb-6 relative z-10">
              <div>
                <h2 className="text-2xl font-manrope font-bold text-white mb-2 uppercase tracking-wide">Dynamic Node Topology</h2>
                <p className="text-sm font-inter text-outline-variant font-light">Orchestrate regional internet throughput across the Monolith cloud.</p>
              </div>
              <div className="bg-background/80 backdrop-blur-xl border border-secondary/30 p-4 rounded-2xl flex items-center gap-4">
                <span className="text-[10px] font-mono uppercase text-secondary">Traffic Load:</span>
                <span className="text-xl font-manrope font-black text-white">LOW</span>
              </div>
           </div>
           
           <div className="w-full flex-1 overflow-x-auto relative z-10">
             <table className="w-full text-left border-collapse min-w-[800px]">
               <thead>
                 <tr className="border-b-2 border-outline-variant/5 text-[10px] font-mono tracking-widest text-outline-variant uppercase">
                   <th className="pb-6 px-4">Node System</th>
                   <th className="pb-6 px-4">Region Proxy</th>
                   <th className="pb-6 px-4">Encryption Ping</th>
                   <th className="pb-6 px-4">Load Vector</th>
                   <th className="pb-6 px-4">Action</th>
                 </tr>
               </thead>
               <tbody className="text-sm font-inter text-on-surface">
                 {[
                   { name: 'Core Alpha-9', region: 'NA East (New York)', ping: '12ms', load: '14%', status: 'Nominal', color: 'bg-primary' },
                   { name: 'Node Byte-4', region: 'EU West (Paris)', ping: '42ms', load: '88%', status: 'Scaling Up', color: 'bg-warning' },
                   { name: 'Delta Helix-1', region: 'Asia Pacific (Tokyo)', ping: '24ms', load: '32%', status: 'Active Scan', color: 'bg-primary' },
                   { name: 'Gamma Relay-X', region: 'SA South (São Paulo)', ping: '118ms', load: '95%', status: 'Rerouting', color: 'bg-error' },
                   { name: 'Sigma Hub-02', region: 'AU East (Sydney)', ping: '8ms', load: '5%', status: 'Standby', color: 'bg-secondary' },
                 ].map((row, i) => (
                   <tr key={i} className="border-b border-outline-variant/10 group/row hover:bg-surface-container-high transition-colors">
                     <td className="py-6 px-4 font-manrope font-bold text-white uppercase text-xs tracking-wider">{row.name}</td>
                     <td className="py-6 px-4 text-on-surface-variant">{row.region}</td>
                     <td className="py-6 px-4 font-mono text-xs">{row.ping}</td>
                     <td className="py-6 px-4">
                        <div className="flex items-center gap-3">
                           <div className="w-24 h-1.5 bg-background rounded-full overflow-hidden border border-outline-variant/10">
                              <motion.div initial={{width:0}} animate={{width:row.load}} transition={{duration:1, delay: i*0.2}} className={`h-full ${row.color}`} />
                           </div>
                           <span className="text-[10px] font-mono text-outline-variant">{row.load}</span>
                        </div>
                     </td>
                     <td className="py-6 px-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-mono bg-surface-container-highest border border-outline-variant/10 text-white uppercase`}>{row.status}</span>
                     </td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>

           <div className="mt-12 flex justify-between items-center relative z-10 pt-10 border-t border-outline-variant/10">
              <span className="text-[10px] font-mono tracking-widest text-outline-variant uppercase">Network Uptime: 99.999%</span>
              <button className="flex items-center gap-3 text-secondary text-xs font-mono uppercase tracking-[0.2em] font-bold hover:gap-6 transition-all">
                Expand Network Mesh <i className="pi pi-arrow-right"></i>
              </button>
           </div>
        </div>

        {/* Right: Hardware / Android Ecosystem */}
        <div className="lg:col-span-4 bg-surface-container hover:bg-surface-container-high transition-colors p-10 rounded-[3rem] border border-outline-variant/20 flex flex-col shadow-2xl overflow-hidden group h-full">
           <div className="flex items-center gap-6 mb-12 border-b border-outline-variant/10 pb-8">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl border border-secondary/30 flex items-center justify-center text-secondary shadow-[0_0_20px_rgba(43,255,160,0.1)]">
                <i className="pi pi-android text-4xl group-hover:scale-110 transition-transform"></i>
              </div>
              <div>
                <h3 className="text-xl font-manrope font-bold text-white uppercase tracking-tight">Droid Console</h3>
                <span className="text-[10px] font-mono text-secondary uppercase tracking-widest">Active Hardware: 12</span>
              </div>
           </div>

           <div className="flex-1 flex flex-col gap-6">
              {[
                { name: 'Internet Hub Box Gen 4', type: 'Primary Android', battery: 'ON LINE', status: 'Sync 1.4s' },
                { name: 'Energy Meter v2', type: 'IoT Edge Node', battery: 'ON LINE', status: 'Sync 0.2s' },
                { name: 'Security Pad Pro', type: 'Biometric Android', battery: 'LOW SIGNAL', status: 'Reconnecting' },
                { name: 'Relay Satellite Z3', type: 'Cloud Core Hub', battery: 'ON LINE', status: 'Sync 0.5s' },
              ].map((device, i) => (
                <div key={i} className="p-6 bg-surface-container-low rounded-2xl border border-outline-variant/10 hover:border-secondary/30 transition-all flex justify-between items-center group/device cursor-pointer">
                   <div className="flex flex-col gap-1">
                      <p className="text-sm font-manrope font-bold text-white group-hover/device:text-secondary transition-colors underline-offset-4 decoration-secondary">{device.name}</p>
                      <p className="text-[10px] font-mono text-outline-variant uppercase">{device.type}</p>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded ${device.status === 'Reconnecting' ? 'bg-error/20 text-error' : 'bg-secondary/10 text-secondary'} border border-outline-variant/10`}>{device.status}</span>
                      <span className="text-[8px] font-mono text-outline uppercase">{device.battery}</span>
                   </div>
                </div>
              ))}
           </div>

           <div className="mt-12 bg-background/50 border border-outline-variant/10 p-6 rounded-2xl">
              <p className="text-[10px] font-mono text-outline uppercase mb-4 tracking-widest text-center">Global Sync Signal Strength</p>
              <div className="flex items-end justify-center gap-1.5 h-12">
                 {[15, 30, 45, 60, 40, 80, 50, 90, 70, 100, 85].map((val, i) => (
                   <motion.div 
                     key={i} 
                     initial={{ height: 0 }}
                     animate={{ height: `${val}%` }}
                     transition={{ duration: 1.5, delay: i * 0.1 }}
                     className="w-2.5 bg-secondary/30 rounded-full" 
                   />
                 ))}
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
