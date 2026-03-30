"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { getStripe } from '@/lib/stripe-client';
import { useState } from 'react';

const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpScroll: Variants = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50, damping: 20 } }
};

const PRICING_CONFIG = {
  ALPHA: 'price_1TFWyqF8MHfRFXV3n9R3FY5f', // price_...
  CORE: 'price_1TFXDeF8MHfRFXV3XBolxbdE',   // price_...
};

export default function PricingPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, tierName: string) => {
    if (priceId.includes('votre_id_prix')) {
      alert("⚠️ Vous devez d'abord créer vos produits sur Stripe et remplacer les IDs dans le fichier pricing/page.tsx !");
      return;
    }
    try {
      setLoading(tierName);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });

      const { url, error } = await res.json();
      if (error) throw new Error(error);

      if (url) {
        window.location.assign(url);
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Une erreur est survenue lors de la redirection vers le paiement.');
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen text-on-surface overflow-hidden relative z-10">

      {/* 1. PRICING HERO */}
      <section className="relative pt-40 pb-20 px-8 lg:px-24 flex flex-col items-center justify-center text-center">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-secondary/10 blur-[150px] rounded-[100%] pointer-events-none"></div>
        <motion.div initial="hidden" animate="show" variants={staggerContainer} className="max-w-5xl mx-auto w-full relative z-10">
          <motion.span variants={fadeUpScroll} className="text-secondary font-mono tracking-widest uppercase text-sm border border-secondary/30 bg-secondary/10 px-6 py-2 rounded-full mb-8 inline-block shadow-[0_0_20px_rgba(43,255,160,0.1)]">
            Scalable Licensing
          </motion.span>
          <motion.h1 variants={fadeUpScroll} className="text-5xl md:text-7xl lg:text-8xl font-manrope font-extrabold text-white mb-8 leading-tight">
            Enterprise <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary drop-shadow-lg">Tiers.</span>
          </motion.h1>
          <motion.p variants={fadeUpScroll} className="text-xl md:text-2xl text-on-surface-variant font-inter max-w-3xl mx-auto leading-relaxed font-light">
            Neural subscriptions for vast energy routing and global telecom optimization. Cancel anytime. Scale infinitely.
          </motion.p>
        </motion.div>
      </section>

      {/* 2. THE MASSIVE PRICING TIERS */}
      <section className="py-24 px-8 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center"
        >
          {/* Tier 1 */}
          <motion.div variants={fadeUpScroll} className="bg-surface-container hover:bg-surface-container-high transition-colors p-12 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl relative">
            <h3 className="text-3xl font-manrope font-bold text-white mb-2">Alpha Access</h3>
            <p className="text-sm font-mono tracking-widest text-outline-variant uppercase mb-8">Base Bandwidth</p>
            <p className="text-5xl font-manrope font-black text-primary mb-8">$4,900<span className="text-xl font-inter font-light text-on-surface-variant">/mo</span></p>
            <ul className="mb-12 flex flex-col gap-6 text-lg font-inter text-on-surface flex-1">
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary text-xl"></i> Basic Energy Route</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary text-xl"></i> Data Dashboard</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary text-xl"></i> Up to 5 Nodes</li>
              <li className="flex items-center gap-4 text-outline-variant"><i className="pi pi-times text-xl"></i> No AI Avatar</li>
            </ul>
            <button
              onClick={() => handleCheckout(PRICING_CONFIG.ALPHA, 'Alpha')}
              disabled={!!loading}
              className="w-full py-5 rounded-2xl border-2 border-outline-variant hover:border-primary-container hover:text-primary transition-all text-sm font-mono tracking-widest uppercase text-white font-bold disabled:opacity-50"
            >
              {loading === 'Alpha' ? <i className="pi pi-spin pi-spinner"></i> : 'Deploy Alpha'}
            </button>
          </motion.div>

          {/* Tier 2 (Highlighted) */}
          <motion.div variants={fadeUpScroll} className="bg-gradient-to-b from-surface-container-high to-surface-container p-14 rounded-[2.5rem] border-2 border-primary-container shadow-[0_30px_80px_rgba(0,229,255,0.15)] relative scale-105 z-20 overflow-hidden transform transition-all hover:-translate-y-2">
            <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-primary to-primary-container"></div>
            <span className="absolute top-8 right-8 bg-primary/20 border border-primary/40 text-primary-fixed-dim text-xs font-mono tracking-widest uppercase px-4 py-2 rounded-full animate-pulse">Recommended</span>

            <h3 className="text-4xl font-manrope font-bold text-white mb-2 mt-6">Vera Core Hub</h3>
            <p className="text-sm font-mono tracking-widest text-primary-container uppercase mb-8 group">Live Optimization</p>
            <p className="text-6xl font-manrope font-black text-primary-container mb-10 drop-shadow-[0_0_15px_var(--color-primary)]">$12,900<span className="text-xl font-inter font-light text-on-surface-variant">/mo</span></p>

            <ul className="mb-14 flex flex-col gap-6 text-xl font-inter text-white flex-1">
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary-fixed-dim text-2xl"></i> Live Audio Avatar</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary-fixed-dim text-2xl"></i> Neural Topology Scan</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary-fixed-dim text-2xl"></i> Unlimited Global Nodes</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-primary-fixed-dim text-2xl"></i> Zero-Trust Retina Scan</li>
            </ul>
            <button
              onClick={() => handleCheckout(PRICING_CONFIG.CORE, 'Core')}
              disabled={!!loading}
              className="w-full py-6 rounded-2xl bg-gradient-to-br from-primary to-primary-container shadow-[0_0_30px_rgba(0,229,255,0.4)] hover:shadow-[0_0_60px_rgba(0,229,255,0.8)] transition-shadow text-surface text-base font-mono tracking-widest uppercase font-black flex justify-center items-center gap-3 disabled:opacity-50"
            >
              {loading === 'Core' ? <i className="pi pi-spin pi-spinner"></i> : (
                <>Authenticate Core <i className="pi pi-lock"></i></>
              )}
            </button>
          </motion.div>

          {/* Tier 3 */}
          <motion.div variants={fadeUpScroll} className="bg-surface-container hover:bg-surface-container-high transition-colors p-12 rounded-[2.5rem] border border-outline-variant/10 shadow-2xl relative">
            <h3 className="text-3xl font-manrope font-bold text-white mb-2">Monolith Enterprise</h3>
            <p className="text-sm font-mono tracking-widest text-outline-variant uppercase mb-8">Bespoke SLA</p>
            <p className="text-4xl lg:text-5xl font-manrope font-black text-secondary mb-10">Contract</p>
            <ul className="mb-12 flex flex-col gap-6 text-lg font-inter text-on-surface flex-1">
              <li className="flex items-center gap-4"><i className="pi pi-check text-secondary text-xl"></i> Global Cloud Synergy</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-secondary text-xl"></i> Dedicated ML Model</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-secondary text-xl"></i> On-Premise Install</li>
              <li className="flex items-center gap-4"><i className="pi pi-check text-secondary text-xl"></i> 24/7 Priority Agent</li>
            </ul>
            <button className="w-full py-5 rounded-2xl border-2 border-outline-variant hover:border-secondary hover:text-secondary transition-colors text-sm font-mono tracking-widest uppercase text-white font-bold">Contact Monolith</button>
          </motion.div>

        </motion.div>
      </section>

      {/* 3. COST BREAKDOWN MATRIX (TABLEAU) */}
      <section className="py-32 px-8 lg:px-24 bg-surface-container-lowest border-y border-outline-variant/10">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto"
        >
          <motion.div variants={fadeUpScroll} className="text-center mb-16">
            <h2 className="text-4xl lg:text-6xl font-manrope font-bold text-white mb-6">Deep Data Comparison</h2>
            <p className="text-xl text-on-surface-variant font-light max-w-3xl mx-auto">
              Analyze bandwidth allocations, predictive compute limits, and storage quotas across each Neural Tier.
            </p>
          </motion.div>

          <motion.div variants={fadeUpScroll} className="bg-surface-container p-10 lg:p-14 rounded-[3rem] border border-outline-variant/20 shadow-2xl overflow-hidden">

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="border-b-2 border-primary/20 text-sm font-mono tracking-widest text-primary-fixed-dim uppercase">
                    <th className="pb-6 px-6 font-semibold w-1/3">Data Parameter</th>
                    <th className="pb-6 px-6 font-semibold">Alpha</th>
                    <th className="pb-6 px-6 font-semibold bg-primary/5 rounded-t-xl">Core Hub</th>
                    <th className="pb-6 px-6 font-semibold">Enterprise</th>
                  </tr>
                </thead>
                <tbody className="text-lg font-inter text-on-surface">
                  {[
                    { p: "Concurrent Node Limits", a: "5 Datacenters", c: "Unlimited", e: "Unlimited + Private" },
                    { p: "Telecom Throughput Max", a: "10 Gbps", c: "1.2 Tbps", e: "10 Tbps+" },
                    { p: "AI Audio Avatar Requests", a: "None", c: "10M Tokens/mo", e: "Dedicated GPU Compute" },
                    { p: "Predictive Energy Re-routes", a: "100 / hour", c: "20,000 / hour", e: "Limitless" },
                    { p: "Biometric Retina Scan", a: "Basic 2FA", c: "Zero-Trust Active", e: "Military Grade (Level 4)" },
                  ].map((row, i) => (
                    <tr key={i} className="border-b border-surface-container-highest hover:bg-surface-container/80 transition-colors">
                      <td className="py-6 px-6 font-semibold text-white">{row.p}</td>
                      <td className="py-6 px-6 text-on-surface-variant font-mono text-sm">{row.a}</td>
                      <td className="py-6 px-6 text-primary-container font-mono text-sm bg-primary/5">{row.c}</td>
                      <td className="py-6 px-6 text-secondary font-mono text-sm">{row.e}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </motion.div>
        </motion.div>
      </section>

      {/* 4. ROI DATA CHART (ANIMATED SVG) */}
      <section className="py-32 px-8 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-16 items-center"
        >

          <motion.div variants={fadeUpScroll} className="flex-1 w-full bg-surface-container-high p-12 rounded-[3rem] border border-outline-variant/10 shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <h3 className="text-3xl font-manrope font-bold text-white mb-2">Server Cost Reduction</h3>
            <p className="text-sm font-mono tracking-widest text-outline-variant uppercase mb-12">Simulated Project Trajectory</p>

            {/* Simulated Bar Chart Graphic */}
            <div className="flex items-end h-[350px] gap-6 border-l-2 border-b-2 border-outline-variant/30 px-6 pb-2 relative">
              <div className="absolute inset-x-0 bottom-[33%] border-t border-outline-variant/10 border-dashed"></div>
              <div className="absolute inset-x-0 bottom-[66%] border-t border-outline-variant/10 border-dashed"></div>

              {/* Pre-Vera Columns */}
              <div className="flex-1 flex flex-col justify-end items-center h-full group relative">
                <div className="w-full bg-error/50 rounded-t-md h-[90%] transition-all group-hover:brightness-125"></div>
                <span className="text-xs font-mono text-outline-variant mt-4 absolute -bottom-8">Q1</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center h-full group relative">
                <div className="w-full bg-error/50 rounded-t-md h-[95%] transition-all group-hover:brightness-125"></div>
                <span className="text-xs font-mono text-outline-variant mt-4 absolute -bottom-8">Q2</span>
              </div>

              {/* Vera Deployed */}
              <div className="w-[4px] h-[110%] bg-primary shadow-[0_0_10px_var(--color-primary)] relative">
                <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-mono whitespace-nowrap text-primary bg-primary/20 px-2 py-1 rounded">VERA CORE DEPLOYED</span>
              </div>

              {/* Post-Vera Columns */}
              <div className="flex-1 flex flex-col justify-end items-center h-full group relative">
                <motion.div initial={{ height: "95%" }} whileInView={{ height: "40%" }} transition={{ duration: 2, delay: 0.5 }} className="w-full bg-primary rounded-t-md shadow-[0_0_15px_var(--color-primary)]"></motion.div>
                <span className="text-xs font-mono text-outline-variant mt-4 absolute -bottom-8">Q3</span>
              </div>
              <div className="flex-1 flex flex-col justify-end items-center h-full group relative">
                <motion.div initial={{ height: "95%" }} whileInView={{ height: "25%" }} transition={{ duration: 2, delay: 0.7 }} className="w-full bg-primary rounded-t-md shadow-[0_0_15px_var(--color-primary)]"></motion.div>
                <span className="text-xs font-mono text-outline-variant mt-4 absolute -bottom-8">Q4</span>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col gap-8">
            <motion.h2 variants={fadeUpScroll} className="text-5xl lg:text-6xl font-manrope font-bold text-white">Recoup Costs Instantly.</motion.h2>
            <motion.p variants={fadeUpScroll} className="text-xl font-inter text-on-surface-variant font-light leading-relaxed">
              By proactively terminating inactive packets before they traverse international networks, Vera physically reduces your server footprint. The cost savings typically offset the Core Hub subscription within the first 14 days of activation.
            </motion.p>
            <motion.div variants={fadeUpScroll}>
              <button className="flex items-center gap-3 text-secondary border-b-2 border-secondary pb-2 font-mono tracking-widest w-fit text-lg hover:text-white hover:border-white transition-colors">
                View Full Financial Projection <i className="pi pi-arrow-right"></i>
              </button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
