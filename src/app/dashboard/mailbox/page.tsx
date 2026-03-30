"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  { id: 1, sender: 'Vera AI', content: 'Neural Optimization Complete. 12% Energy reclaimed from Sector Alpha.', time: '08:42 AM', type: 'system', unread: true },
  { id: 2, sender: 'System Alert', content: 'Anomalous Ping detected in EU-West Node. Shield levels at 92%.', time: '09:12 AM', type: 'warning', unread: true },
  { id: 3, sender: 'Vera AI', content: 'Devis #9012 for Global Dynamics is ready for biometric signature.', time: '11:05 AM', type: 'system', unread: false },
  { id: 4, sender: 'Support Agent', content: 'Hardware Sync confirmed for new Android Hub Box.', time: 'Yesterday', type: 'user', unread: false },
];

export default function MailboxPage() {
  const [selected, setSelected] = useState(messages[0]);

  return (
    <div className="flex flex-1 gap-12 h-[calc(100vh-280px)] overflow-hidden">
      
      {/* 1. MESSAGE LIST (LEFT) */}
      <div className="w-[450px] flex flex-col gap-6 overflow-y-auto pr-4 custom-scrollbar">
        <div className="flex justify-between items-center mb-4 border-b border-outline-variant/10 pb-6 pr-4">
           <h3 className="text-xl font-manrope font-bold text-white uppercase tracking-widest">Neural Inbox</h3>
           <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-mono px-3 py-1 rounded-full uppercase tracking-widest font-bold shadow-[0_0_15px_rgba(0,229,255,0.2)]">2 NEW</span>
        </div>

        <div className="flex flex-col gap-4">
          {messages.map((msg) => (
            <motion.div 
              key={msg.id}
              onClick={() => setSelected(msg)}
              whileHover={{ scale: 1.02 }}
              className={`p-6 rounded-[2rem] border cursor-pointer transition-all relative overflow-hidden group ${
                selected.id === msg.id 
                ? 'bg-surface-container-high border-primary shadow-2xl' 
                : 'bg-surface-container-low border-outline-variant/10 hover:border-primary/40'
              }`}
            >
               {msg.unread && (
                 <div className="absolute top-6 right-6 w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_var(--color-primary)] z-10" />
               )}
               <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <i className={`pi ${msg.type === 'warning' ? 'pi-exclamation-triangle' : 'pi-bolt'} text-5xl text-primary`}></i>
               </div>

               <div className="flex justify-between items-center mb-3">
                  <span className={`text-[10px] font-mono uppercase tracking-widest ${msg.type === 'warning' ? 'text-error font-bold' : 'text-primary'}`}>
                    {msg.sender}
                  </span>
                  <span className="text-[10px] font-mono text-outline-variant">{msg.time}</span>
               </div>
               <p className={`text-sm font-inter leading-relaxed ${selected.id === msg.id ? 'text-white font-medium' : 'text-on-surface-variant'}`}>
                 {msg.content}
               </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 2. MESSAGE PREVIEW (RIGHT) */}
      <div className="flex-1 bg-surface-container p-12 rounded-[3.5rem] border border-outline-variant/20 shadow-2xl flex flex-col relative overflow-hidden">
         <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
         
         <AnimatePresence mode="wait">
           <motion.div 
             key={selected.id}
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             exit={{ opacity: 0, x: -20 }}
             className="flex flex-col flex-1 relative z-10"
           >
              <div className="flex justify-between items-start mb-12 border-b border-outline-variant/10 pb-10">
                 <div>
                    <h2 className="text-4xl font-manrope font-black text-white mb-2 uppercase tracking-wide">{selected.sender}</h2>
                    <p className="text-sm font-mono text-primary uppercase tracking-widest flex items-center gap-3">
                       <i className="pi pi-shield text-lg animate-pulse"></i> Encryption Active: AES-512
                    </p>
                 </div>
                 <div className="flex items-center gap-4 pt-4">
                    <button className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-outline-variant hover:text-white hover:border-primary transition-all shadow-lg"><i className="pi pi-trash"></i></button>
                    <button className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/20 flex items-center justify-center text-outline-variant hover:text-white hover:border-primary transition-all shadow-lg"><i className="pi pi-reply"></i></button>
                    <button className="px-8 py-3 bg-primary text-surface rounded-2xl font-mono text-xs uppercase tracking-widest font-black shadow-[0_0_20px_rgba(0,229,255,0.3)] hover:shadow-[0_0_40px_rgba(0,229,255,0.6)] transition-all">Action Command</button>
                 </div>
              </div>

              <div className="flex-1 bg-background/30 backdrop-blur-xl border border-outline-variant/10 p-12 rounded-[2.5rem] shadow-inner mb-8">
                 <div className="flex flex-col gap-6 text-xl font-inter text-on-surface-variant font-light leading-[1.8]">
                    <p>Subject: <span className="text-white font-bold ml-4">Neural Infrastructure Re-routing Protocol</span></p>
                    <p className="mt-6 border-t border-outline-variant/10 pt-10">
                      Vera AI has detected a significant volatility pattern in the North-East Energy Grid. Following the Monolith Directive, 
                      I have automatically diverted 400MW from the SA Relay to stabilize the connection. 
                    </p>
                    <p className="text-primary font-mono text-sm uppercase tracking-widest mt-8 flex items-center gap-4 bg-primary/5 p-6 rounded-2xl border border-primary/20">
                       <i className="pi pi-check text-2xl"></i> Optimization successful. Latency lowered by 12ms.
                    </p>
                 </div>
              </div>

              {/* REPLY BAR */}
              <div className="mt-auto bg-surface-container-high border border-outline-variant/30 px-10 py-6 rounded-full flex justify-between items-center shadow-2xl relative overflow-hidden group">
                 <div className="flex items-center gap-6 flex-1 pr-10">
                    <i className="pi pi-bolt text-primary text-2xl animate-pulse"></i>
                    <input 
                      type="text" 
                      placeholder="Initialize Neural Command..." 
                      className="bg-transparent border-none outline-none text-white font-mono text-base placeholder:text-outline-variant/60 w-full"
                    />
                 </div>
                 <div className="flex items-center gap-2">
                    <i className="pi pi-camera text-outline-variant text-xl cursor-pointer hover:text-white p-2"></i>
                    <i className="pi pi-mic text-outline-variant text-xl cursor-pointer hover:text-white p-2"></i>
                    <div className="w-px h-8 bg-outline-variant/20 mx-3" />
                    <button className="w-12 h-12 bg-primary text-surface rounded-full flex items-center justify-center text-xl shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:scale-110 active:scale-90 transition-all">
                       <i className="pi pi-send"></i>
                    </button>
                 </div>
              </div>
           </motion.div>
         </AnimatePresence>
      </div>

    </div>
  );
}
