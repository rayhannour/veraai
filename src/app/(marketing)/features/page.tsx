"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};

const fadeUpScroll: Variants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
};

export default function FeaturesPage() {
  return (
    <div className="min-h-screen text-on-surface overflow-hidden relative z-10">

      {/* 1. HERO */}
      <section className="relative pt-28 md:pt-40 pb-12 md:pb-20 px-5 sm:px-8 lg:px-24 flex flex-col items-center justify-center text-center">
        <div className="absolute top-[-20%] left-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-primary/20 blur-[150px] rounded-full pointer-events-none" />
        <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-5xl mx-auto w-full relative z-10">
          <motion.span variants={fadeUpScroll} className="text-primary-container font-mono tracking-widest uppercase text-xs md:text-sm border border-primary/30 bg-primary/10 px-4 md:px-6 py-2 rounded-full mb-6 md:mb-8 inline-block shadow-[0_0_20px_rgba(0,229,255,0.2)]">
            Core Architecture
          </motion.span>
          <motion.h1 variants={fadeUpScroll} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-manrope font-extrabold text-on-surface mb-5 md:mb-8 leading-tight">
            Neural Infrastructure <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Re-engineered.</span>
          </motion.h1>
          <motion.p variants={fadeUpScroll} className="text-base md:text-xl lg:text-2xl text-on-surface-variant font-inter max-w-3xl mx-auto leading-relaxed font-light">
            Every module in the Digital Monolith is built around proactive algorithmic intervention. We don't monitor; we orchestrate data in real-time.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. KINETIC ENGINE */}
      <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 border-y border-outline-variant/10 bg-surface-container-lowest">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="max-w-7xl mx-auto">
          <motion.div variants={fadeUpScroll} className="mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-manrope font-bold text-white mb-4 md:mb-6 border-l-4 border-primary pl-4 md:pl-6">The Kinetic Engine</h2>
            <p className="text-base md:text-xl text-on-surface-variant max-w-2xl font-light">
              Proprietary machine learning models route your energy grid requests fractions of a second before they occur.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            {/* Graph */}
            <motion.div variants={fadeUpScroll} className="lg:col-span-8 bg-surface-container p-5 md:p-10 rounded-2xl md:rounded-[2rem] border border-outline-variant/20 shadow-2xl relative min-h-[300px] md:min-h-[500px]">
              <div className="flex flex-wrap justify-between items-center mb-6 md:mb-8 pb-4 md:pb-6 border-b border-outline-variant/20 gap-3">
                <h3 className="text-lg md:text-2xl font-manrope font-bold text-white">Algorithmic Predictive Spikes</h3>
                <div className="flex gap-3 md:gap-4">
                  <span className="flex items-center gap-2 text-xs font-mono text-outline-variant"><span className="w-2 h-2 md:w-3 md:h-3 bg-primary rounded-full" /> VERA AI</span>
                  <span className="flex items-center gap-2 text-xs font-mono text-outline-variant"><span className="w-2 h-2 md:w-3 md:h-3 bg-secondary rounded-full" /> LEGACY</span>
                </div>
              </div>
              <div className="w-full h-[200px] md:h-[300px] flex items-end gap-1 md:gap-2 px-2 md:px-4 border-l border-b border-outline-variant/30 relative">
                <div className="absolute inset-x-0 bottom-[25%] border-t border-outline-variant/10 border-dashed" />
                <div className="absolute inset-x-0 bottom-[50%] border-t border-outline-variant/10 border-dashed" />
                <div className="absolute inset-x-0 bottom-[75%] border-t border-outline-variant/10 border-dashed" />
                {[40, 65, 30, 85, 45, 95, 20, 55, 75, 50, 90, 35].map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 group relative h-full">
                    <div className="absolute -top-8 opacity-0 group-hover:opacity-100 transition-opacity bg-surface-container-highest px-2 py-1 rounded-lg text-[10px] font-mono text-primary z-20 shadow-lg border border-primary/20 whitespace-nowrap">
                      {val * 12.3}ms
                    </div>
                    <motion.div initial={{ height: 0 }} whileInView={{ height: `${val}%` }} transition={{ duration: 1.5, delay: i * 0.1 }} className="w-full bg-secondary/50 rounded-t-sm" />
                    <motion.div initial={{ height: 0 }} whileInView={{ height: `${val * 0.15}%` }} transition={{ duration: 1.5, delay: (i * 0.1) + 0.3 }} className="w-full bg-primary rounded-t-sm shadow-[0_0_10px_var(--color-primary)] absolute bottom-0" />
                    <span className="text-[8px] md:text-[10px] font-mono text-outline-variant absolute -bottom-5">T+{i}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Metric cards */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
              <motion.div variants={fadeUpScroll} className="bg-surface-container p-5 md:p-10 rounded-2xl md:rounded-[2rem] border border-outline-variant/20 flex flex-col justify-center">
                <i className="pi pi-bolt text-2xl md:text-4xl text-primary mb-3 md:mb-6 animate-pulse" />
                <h4 className="text-sm md:text-lg font-inter text-on-surface-variant mb-1 md:mb-2">Latency Reduction</h4>
                <p className="text-4xl md:text-6xl font-manrope font-black text-white">-85<span className="text-lg md:text-2xl text-primary font-normal">%</span></p>
                <p className="text-xs md:text-sm font-inter text-on-surface-variant mt-2 md:mt-4">Average ping drops from 120ms to 18ms under peak load.</p>
              </motion.div>
              <motion.div variants={fadeUpScroll} className="bg-gradient-to-tr from-surface-container to-surface-container-high p-5 md:p-10 rounded-2xl md:rounded-[2rem] border border-primary/20 shadow-[0_0_30px_rgba(0,229,255,0.05)] flex flex-col justify-center">
                <i className="pi pi-database text-2xl md:text-4xl text-secondary mb-3 md:mb-6" />
                <h4 className="text-sm md:text-lg font-inter text-on-surface-variant mb-1 md:mb-2">Edge Caching Efficiency</h4>
                <p className="text-4xl md:text-6xl font-manrope font-black text-white">99.2<span className="text-lg md:text-2xl text-secondary font-normal">%</span></p>
                <div className="w-full h-1.5 md:h-2 bg-surface-container-highest mt-3 md:mt-6 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: '99.2%' }} transition={{ duration: 2 }} className="h-full bg-secondary" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. SECURITY */}
      <section className="py-16 md:py-32 px-5 sm:px-8 lg:px-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="max-w-7xl mx-auto">
          <motion.div variants={fadeUpScroll} className="mb-10 md:mb-16 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-manrope font-bold text-white mb-4 md:mb-6">Zero-Trust Backbone</h2>
            <p className="text-base md:text-xl text-on-surface-variant max-w-3xl mx-auto font-light">
              Biometric verification streams are continuously cross-referenced against global threat topology mapped in real-time.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
            {[
              { val: "2.4M", label: "Threats Neutralized", icon: "shield" },
              { val: "0.01ms", label: "Verification Speed", icon: "eye" },
              { val: "AES-512", label: "Encryption Grade", icon: "lock" },
              { val: "Level 4", label: "Compliance Rank", icon: "verified" },
            ].map((stat, idx) => (
              <motion.div key={idx} variants={fadeUpScroll} className="bg-surface-container p-5 md:p-8 rounded-xl md:rounded-2xl border-l-4 border-primary/50 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-2 md:p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                  <i className={`pi pi-${stat.icon} text-4xl md:text-6xl text-primary`} />
                </div>
                <h4 className="text-2xl md:text-5xl font-manrope font-bold text-white mb-1 md:mb-2 relative z-10">{stat.val}</h4>
                <p className="text-[10px] md:text-sm font-mono tracking-widest text-outline-variant uppercase relative z-10">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          <motion.div variants={fadeUpScroll} className="bg-surface-container-lowest p-6 md:p-10 lg:p-14 rounded-2xl md:rounded-[2.5rem] border border-outline-variant/30 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap justify-between items-center border-b border-primary/20 pb-4 md:pb-6 mb-6 md:mb-8 gap-3">
              <h3 className="text-lg md:text-2xl font-mono text-primary font-bold"><i className="pi pi-server mr-2 md:mr-3" />LIVE ACCESS LOGS</h3>
              <span className="animate-pulse bg-tertiary/20 text-tertiary px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest border border-tertiary/40">Securing</span>
            </div>
            <div className="font-mono text-xs md:text-sm lg:text-base text-on-surface-variant flex flex-col gap-3 md:gap-4">
              <p><span className="text-primary">[VERA-SYS]</span> Checking biometric retina signature against DB_ALPHA... <span className="text-primary-fixed-dim">Match 99.98%</span></p>
              <p><span className="text-primary">[VERA-SYS]</span> Re-routing packet stream to Private Sector 4...</p>
              <p className="text-outline"><span className="text-error">[WARNING]</span> Anomalous ping from Region 8. Auto-shunting traffic to proxy.</p>
              <p><span className="text-primary">[VERA-SYS]</span> Establishing Deep Navy Obsidian UI Protocol...</p>
              <div className="mt-3 md:mt-4 flex gap-2 items-center">
                <span className="w-2 h-5 md:w-3 md:h-6 bg-primary animate-pulse inline-block" />
                <span className="text-primary uppercase tracking-widest text-xs md:text-base">Awaiting Command...</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
