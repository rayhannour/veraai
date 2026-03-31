"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 70 } }
};

export default function ContactPage() {
  return (
    <div className="min-h-screen py-6 md:py-10 px-4 sm:px-8 lg:px-24 flex flex-col pt-20 md:pt-32 overflow-hidden relative">
      <motion.div
        initial="hidden" animate="show" variants={staggerContainer}
        className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-10"
      >
        {/* Left: Info */}
        <motion.div variants={fadeInUp} className="flex flex-col justify-center">
          <span className="text-primary-container font-mono tracking-widest uppercase text-[10px] md:text-xs border border-primary/30 bg-primary/10 px-3 py-1 md:px-4 md:py-1 rounded-full mb-3 md:mb-4 w-fit">Inquiries</span>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-manrope font-bold text-on-surface mb-3 md:mb-6">Initialize Contact</h1>
          <p className="text-on-surface-variant font-inter leading-relaxed mb-6 md:mb-8 text-xs sm:text-sm md:text-base">
            Deploy your message through our secure neural network. An agent will intercept and process your request globally.
          </p>
          <div className="flex flex-col gap-4 md:gap-6 font-mono text-sm">
            {[
              { icon: 'phone', label: 'SECURE LINE', value: '+1 (800) VERA-NET', delay: '0s' },
              { icon: 'envelope', label: 'ENCRYPTED DATA', value: 'signals@veramonolith.ai', delay: '0.2s' },
              { icon: 'map-marker', label: 'GLOBAL HQ', value: 'Sector 4, Core Data Center, Geneva', delay: '0.4s' },
            ].map((item) => (
              <div key={item.icon} className="flex items-center gap-3 md:gap-4 text-on-surface">
                <div
                  className="w-9 h-9 md:w-10 md:h-10 bg-surface-container rounded-full flex items-center justify-center border border-primary/20 text-primary animate-pulse flex-shrink-0"
                  style={{ animationDelay: item.delay }}
                >
                  <i className={`pi pi-${item.icon} text-sm`} />
                </div>
                <div>
                  <p className="text-primary-fixed-dim text-[10px] tracking-widest mb-0.5">{item.label}</p>
                  <p className="text-sm md:text-base">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div variants={fadeInUp} className="bg-surface-container-low p-5 md:p-8 rounded-xl md:rounded-3xl border border-outline-variant/20 shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative mt-4 md:mt-0">
          <div className="absolute top-0 right-10 w-24 h-24 md:w-32 md:h-32 bg-primary/10 blur-[40px] rounded-full pointer-events-none" />
          <form className="flex flex-col gap-4 md:gap-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-[10px] font-mono tracking-widest text-primary-fixed-dim uppercase">Designation (Name)</label>
              <input type="text" className="bg-surface-container border-b border-outline-variant/40 px-3 md:px-4 py-2.5 md:py-3 text-on-surface font-inter focus:outline-none focus:border-primary-container transition-colors rounded-t-lg text-sm md:text-base" placeholder="John Doe" />
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-[10px] font-mono tracking-widest text-primary-fixed-dim uppercase">Return Signal (Email)</label>
              <input type="email" className="bg-surface-container border-b border-outline-variant/40 px-3 md:px-4 py-2.5 md:py-3 text-on-surface font-inter focus:outline-none focus:border-primary-container transition-colors rounded-t-lg text-sm md:text-base" placeholder="jdoe@company.com" />
            </div>
            <div className="flex flex-col gap-1 md:gap-2">
              <label className="text-[10px] font-mono tracking-widest text-primary-fixed-dim uppercase">Encrypted Packet (Message)</label>
              <textarea rows={4} className="bg-surface-container border-b border-outline-variant/40 px-3 md:px-4 py-2.5 md:py-3 text-on-surface font-inter focus:outline-none focus:border-primary-container transition-colors rounded-t-lg resize-none text-sm md:text-base" placeholder="We require a 40% uplink increase in sector 7..." />
            </div>
            <button className="w-full py-3 md:py-4 mt-2 md:mt-1 rounded-lg md:rounded-xl bg-gradient-to-r from-primary to-primary-container hover:shadow-[0_0_20px_var(--color-primary-container)] transition-all text-surface text-xs md:text-sm font-mono tracking-widest uppercase font-bold flex items-center justify-center gap-2 md:gap-3">
              Transmit Sequence <i className="pi pi-send text-base md:text-lg" />
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
