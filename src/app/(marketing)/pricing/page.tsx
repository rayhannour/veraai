"use client";
import React, { useState } from 'react';
import { motion, Variants } from 'framer-motion';

const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } }
};
const fadeUpScroll: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
};

const PRICING_CONFIG = {
  ALPHA: 'price_1TFWyqF8MHfRFXV3n9R3FY5f',
  CORE: 'price_1TFXDeF8MHfRFXV3XBolxbdE',
};

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, tierName: string) => {
    try {
      setLoading(tierName);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const { url, error } = await res.json();
      if (error) throw new Error(error);
      if (url) window.location.assign(url);
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Une erreur est survenue lors de la redirection vers le paiement.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen text-on-surface overflow-hidden relative z-10">

      {/* 1. HERO */}
      <section className="relative pt-28 md:pt-40 pb-12 md:pb-20 px-5 sm:px-8 lg:px-24 flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] md:w-[800px] h-[300px] md:h-[500px] bg-secondary/10 blur-[150px] rounded-[100%] pointer-events-none" />
        <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-5xl mx-auto w-full relative z-10">
          <motion.span variants={fadeUpScroll} className="text-secondary font-mono tracking-widest uppercase text-xs md:text-sm border border-secondary/30 bg-secondary/10 px-4 md:px-6 py-2 rounded-full mb-6 md:mb-8 inline-block">
            Scalable Licensing
          </motion.span>
          <motion.h1 variants={fadeUpScroll} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-manrope font-extrabold text-white mb-5 md:mb-8 leading-tight">
            Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary drop-shadow-lg">Tiers.</span>
          </motion.h1>
          <motion.p variants={fadeUpScroll} className="text-base md:text-xl lg:text-2xl text-on-surface-variant font-inter max-w-3xl mx-auto leading-relaxed font-light">
            Neural subscriptions for vast energy routing and global telecom optimization. Cancel anytime. Scale infinitely.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. PRICING CARDS */}
      <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24">
        <motion.div
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 items-center"
        >
          {/* Tier 1 */}
          <motion.div variants={fadeUpScroll} className="bg-surface-container p-7 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-outline-variant/10 shadow-2xl relative">
            <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white mb-1 md:mb-2">Alpha Access</h3>
            <p className="text-xs md:text-sm font-mono tracking-widest text-outline-variant uppercase mb-5 md:mb-8">Base Bandwidth</p>
            <p className="text-4xl md:text-5xl font-manrope font-black text-primary mb-5 md:mb-8">$4,900<span className="text-base md:text-xl font-inter font-light text-on-surface-variant">/mo</span></p>
            <ul className="mb-8 md:mb-12 flex flex-col gap-3 md:gap-6 text-base md:text-lg font-inter text-on-surface">
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary" /> Basic Energy Route</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary" /> Data Dashboard</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary" /> Up to 5 Nodes</li>
              <li className="flex items-center gap-3 md:gap-4 text-outline-variant"><i className="pi pi-times" /> No AI Avatar</li>
            </ul>
            <button
              onClick={() => handleCheckout(PRICING_CONFIG.ALPHA, 'Alpha')}
              disabled={!!loading}
              className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl border-2 border-outline-variant hover:border-primary-container hover:text-primary transition-all text-sm font-mono tracking-widest uppercase text-white font-bold disabled:opacity-50"
            >
              {loading === 'Alpha' ? <i className="pi pi-spin pi-spinner" /> : 'Deploy Alpha'}
            </button>
          </motion.div>

          {/* Tier 2 - Featured */}
          <motion.div variants={fadeUpScroll} className="bg-gradient-to-b from-surface-container-high to-surface-container p-7 md:p-14 rounded-2xl md:rounded-[2.5rem] border-2 border-primary-container shadow-[0_20px_60px_rgba(0,229,255,0.15)] relative z-20 overflow-hidden md:scale-105 transform transition-all hover:-translate-y-2">
            <div className="absolute top-0 inset-x-0 h-1.5 md:h-2 bg-gradient-to-r from-primary to-primary-container" />
            <span className="absolute top-5 md:top-8 right-5 md:right-8 bg-primary/20 border border-primary/40 text-primary-fixed-dim text-[10px] md:text-xs font-mono tracking-widest uppercase px-3 py-1 rounded-full animate-pulse">Recommended</span>
            <h3 className="text-2xl md:text-4xl font-manrope font-bold text-white mb-1 md:mb-2 mt-4 md:mt-6">Vera Core Hub</h3>
            <p className="text-xs md:text-sm font-mono tracking-widest text-primary-container uppercase mb-5 md:mb-8">Live Optimization</p>
            <p className="text-5xl md:text-6xl font-manrope font-black text-primary-container mb-6 md:mb-10 drop-shadow-[0_0_15px_var(--color-primary)]">$12,900<span className="text-base md:text-xl font-inter font-light text-on-surface-variant">/mo</span></p>
            <ul className="mb-8 md:mb-14 flex flex-col gap-3 md:gap-6 text-base md:text-xl font-inter text-white">
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary-fixed-dim text-lg md:text-2xl" /> Live Audio Avatar</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary-fixed-dim text-lg md:text-2xl" /> Neural Topology Scan</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary-fixed-dim text-lg md:text-2xl" /> Unlimited Global Nodes</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-primary-fixed-dim text-lg md:text-2xl" /> Zero-Trust Retina Scan</li>
            </ul>
            <button
              onClick={() => handleCheckout(PRICING_CONFIG.CORE, 'Core')}
              disabled={!!loading}
              className="w-full py-4 md:py-6 rounded-xl md:rounded-2xl bg-gradient-to-br from-primary to-primary-container shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.8)] transition-shadow text-surface text-sm md:text-base font-mono tracking-widest uppercase font-black flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {loading === 'Core' ? <i className="pi pi-spin pi-spinner" /> : <>Authenticate Core <i className="pi pi-lock" /></>}
            </button>
          </motion.div>

          {/* Tier 3 */}
          <motion.div variants={fadeUpScroll} className="bg-surface-container p-7 md:p-12 rounded-2xl md:rounded-[2.5rem] border border-outline-variant/10 shadow-2xl relative">
            <h3 className="text-2xl md:text-3xl font-manrope font-bold text-white mb-1 md:mb-2">Monolith Enterprise</h3>
            <p className="text-xs md:text-sm font-mono tracking-widest text-outline-variant uppercase mb-5 md:mb-8">Bespoke SLA</p>
            <p className="text-3xl md:text-5xl font-manrope font-black text-secondary mb-6 md:mb-10">Contract</p>
            <ul className="mb-8 md:mb-12 flex flex-col gap-3 md:gap-6 text-base md:text-lg font-inter text-on-surface">
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-secondary" /> Global Cloud Synergy</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-secondary" /> Dedicated ML Model</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-secondary" /> On-Premise Install</li>
              <li className="flex items-center gap-3 md:gap-4"><i className="pi pi-check text-secondary" /> 24/7 Priority Agent</li>
            </ul>
            <button className="w-full py-4 md:py-5 rounded-xl md:rounded-2xl border-2 border-outline-variant hover:border-secondary hover:text-secondary transition-colors text-sm font-mono tracking-widest uppercase text-white font-bold">Contact Monolith</button>
          </motion.div>
        </motion.div>
      </section>

      {/* 3. COMPARISON TABLE */}
      <section className="py-12 md:py-32 px-5 sm:px-8 lg:px-24 bg-surface-container-lowest border-y border-outline-variant/10">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer} className="max-w-7xl mx-auto">
          <motion.div variants={fadeUpScroll} className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-manrope font-bold text-white mb-4 md:mb-6">Deep Data Comparison</h2>
            <p className="text-base md:text-xl text-on-surface-variant font-light max-w-3xl mx-auto">
              Analyze bandwidth allocations, predictive compute limits, and storage quotas across each Neural Tier.
            </p>
          </motion.div>
          <motion.div variants={fadeUpScroll} className="bg-surface-container p-5 md:p-10 lg:p-14 rounded-2xl md:rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden">
            <div className="w-full overflow-x-auto -mx-2 px-2">
              <table className="w-full text-left border-collapse min-w-[480px] md:min-w-[900px]">
                <thead>
                  <tr className="border-b-2 border-primary/20 text-[10px] md:text-sm font-mono tracking-widest text-primary-fixed-dim uppercase">
                    <th className="pb-4 md:pb-6 px-3 md:px-6 font-semibold w-1/3">Parameter</th>
                    <th className="pb-4 md:pb-6 px-3 md:px-6 font-semibold">Alpha</th>
                    <th className="pb-4 md:pb-6 px-3 md:px-6 font-semibold bg-primary/5 rounded-t-xl">Core Hub</th>
                    <th className="pb-4 md:pb-6 px-3 md:px-6 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-sm md:text-lg font-inter text-on-surface">
                  {[
                    { p: "Node Limits", a: "5 DC", c: "Unlimited", e: "Unlimited +" },
                    { p: "Throughput Max", a: "10 Gbps", c: "1.2 Tbps", e: "10 Tbps+" },
                    { p: "AI Avatar", a: "None", c: "10M Tokens/mo", e: "Dedicated GPU" },
                    { p: "Energy Re-routes", a: "100/hr", c: "20,000/hr", e: "Limitless" },
                    { p: "Security", a: "Basic 2FA", c: "Zero-Trust", e: "Military L4" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-surface-container-highest hover:bg-surface-container/80 transition-colors">
                      <td className="py-3 md:py-6 px-3 md:px-6 font-semibold text-white text-xs md:text-base">{row.p}</td>
                      <td className="py-3 md:py-6 px-3 md:px-6 text-on-surface-variant font-mono text-xs md:text-sm">{row.a}</td>
                      <td className="py-3 md:py-6 px-3 md:px-6 text-primary-container font-mono text-xs md:text-sm bg-primary/5">{row.c}</td>
                      <td className="py-3 md:py-6 px-3 md:px-6 text-secondary font-mono text-xs md:text-sm">{row.e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. ROI CHART */}
      <section className="py-12 md:py-32 px-5 sm:px-8 lg:px-24">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-80px" }} variants={staggerContainer}
          className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 md:gap-16 items-center"
        >
          <motion.div variants={fadeUpScroll} className="flex-1 w-full bg-surface-container-high p-6 md:p-12 rounded-2xl md:rounded-[3rem] border border-outline-variant/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <h3 className="text-xl md:text-3xl font-manrope font-bold text-white mb-1 md:mb-2">Server Cost Reduction</h3>
            <p className="text-xs md:text-sm font-mono tracking-widest text-outline-variant uppercase mb-6 md:mb-12">Simulated Project Trajectory</p>
            <div className="flex items-end h-[200px] md:h-[350px] gap-3 md:gap-6 border-l-2 border-b-2 border-outline-variant/30 px-3 md:px-6 pb-2 relative">
              <div className="absolute inset-x-0 bottom-[33%] border-t border-outline-variant/10 border-dashed" />
              <div className="absolute inset-x-0 bottom-[66%] border-t border-outline-variant/10 border-dashed" />
              <div className="flex-1 flex flex-col justify-end items-center h-full relative">
                <div className="w-full bg-error/50 rounded-t-md h-[90%]" />
                <span className="text-[10px] font-mono text-outline-variant absolute -bottom-6">Q1</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center h-full relative">
                <div className="w-full bg-error/50 rounded-t-md h-[95%]" />
                <span className="text-[10px] font-mono text-outline-variant absolute -bottom-6">Q2</span>
              </div>
              <div className="w-[3px] h-[110%] bg-primary shadow-[0_0_10px_var(--color-primary)] relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono whitespace-nowrap text-primary bg-primary/20 px-1.5 py-0.5 rounded hidden sm:block">VERA DEPLOYED</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center h-full relative">
                <motion.div initial={{ height: "95%" }} whileInView={{ height: "40%" }} transition={{ duration: 2, delay: 0.5 }} className="w-full bg-primary rounded-t-md shadow-[0_0_15px_var(--color-primary)]" />
                <span className="text-[10px] font-mono text-outline-variant absolute -bottom-6">Q3</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center h-full relative">
                <motion.div initial={{ height: "95%" }} whileInView={{ height: "25%" }} transition={{ duration: 2, delay: 0.7 }} className="w-full bg-primary rounded-t-md shadow-[0_0_15px_var(--color-primary)]" />
                <span className="text-[10px] font-mono text-outline-variant absolute -bottom-6">Q4</span>
              </div>
            </div>
          </motion.div>
          <div className="flex-1 flex flex-col gap-5 md:gap-8">
            <motion.h2 variants={fadeUpScroll} className="text-3xl md:text-5xl lg:text-6xl font-manrope font-bold text-white">Recoup Costs Instantly.</motion.h2>
            <motion.p variants={fadeUpScroll} className="text-base md:text-xl font-inter text-on-surface-variant font-light leading-relaxed">
              By proactively terminating inactive packets before they traverse international networks, Vera physically reduces your server footprint within the first 14 days of activation.
            </motion.p>
            <motion.div variants={fadeUpScroll}>
              <button className="flex items-center gap-3 text-secondary border-b-2 border-secondary pb-2 font-mono tracking-widest w-fit text-sm md:text-lg hover:text-white hover:border-white transition-colors">
                View Full Financial Projection <i className="pi pi-arrow-right" />
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
