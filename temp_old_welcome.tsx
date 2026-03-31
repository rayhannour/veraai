"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { VeraSmartBanner } from '@/components/VeraSmartBanner';

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

export default function HomePage() {
  return (
    <div className="flex flex-col text-on-surface w-full overflow-hidden relative z-10 bg-background">
      <VeraSmartBanner />

      {/* 1. MASSIVE FRONT PAGE HERO (100VH FULL IMAGE) */}
      <section className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Full Screen Cinematic BG Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/agent.png"
            alt="Vera AI Agent"
            fill
            className="object-cover opacity-60 mix-blend-screen scale-105"
            priority
          />
          {/* Gradients to blend image into the dark theme */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10"></div>
        </div>

        {/* Ambient Overlay Floating Animations */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary-container/20 blur-[150px] rounded-full pointer-events-none z-20"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-30 flex flex-col items-center justify-center text-center px-4 w-full mt-16 md:mt-24"
        >
          <motion.div variants={fadeUpScroll} className="w-14 h-14 md:w-24 md:h-24 border-t-[3px] border-r-[3px] border-primary-container rounded-tr-[2rem] rounded-bl-[2rem] flex items-center justify-center relative shadow-[0_0_30px_rgba(0,229,255,0.4)] mb-6 md:mb-8">
            <motion.div
              animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="absolute w-4 h-4 bg-primary blur-[3px] rounded-full"
            />
          </motion.div>

          <motion.span variants={fadeUpScroll} className="inline-block px-4 md:px-6 py-2 rounded-full border border-primary/40 bg-primary/10 text-primary-fixed-dim text-xs md:text-sm font-mono tracking-widest mb-5 md:mb-6 uppercase shadow-[0_0_20px_rgba(0,229,255,0.1)] backdrop-blur-md">
            The Digital Monolith v1.0
          </motion.span>

          <motion.h1 variants={fadeUpScroll} className="text-[3.5rem] sm:text-[5rem] lg:text-[8rem] leading-[0.8] tracking-tighter font-manrope font-extrabold drop-shadow-[0_10px_30px_rgba(0,0,0,0.8)] uppercase flex flex-col items-center">
            {/* LINE 1: VERA AI */}
            {/* LINE 1: VERA AI (LAMPE TORCHE INITIALIZATION - ZERO MARGIN) */}
            <div className="relative group flex items-center justify-center">
              {/* THE SCANNING BEAM (FLASHLIGHT EFFECT - HIGH INTENSITY) */}
              <motion.div
                initial={{ left: '-20%', opacity: 0 }}
                animate={{ left: ['-20%', '120%'], opacity: [0, 0.8, 0] }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="absolute inset-y-0 w-64 bg-gradient-to-r from-transparent via-white/60 to-transparent blur-[80px] z-20 pointer-events-none"
              />

              <motion.div
                className="relative flex items-end gap-1"
                initial="hidden"
                animate="visible"
              >
                {/* VERA AI LETTER BY LETTER (INTENSIFIED) */}
                   {["V", "E", "R", "A", " ", "A", "I"].map((char, index) => (
                  <motion.div
                    key={index}
                    variants={{
                      hidden: { opacity: 0, scale: 0.8, filter: "brightness(0)" },
                      visible: {
                        opacity: 1,
                        scale: 1,
                        filter: ["brightness(12)", "brightness(1)"],
                        transition: { duration: 1.2, delay: index * 0.12, filter: { duration: 0.4 } }
                      }
                    }}
                    className="relative"
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], scale: [0, 4, 1] }}
                      transition={{ delay: index * 0.15, duration: 0.6 }}
                      className="absolute inset-0 bg-white rounded-full blur-[20px] pointer-events-none z-10"
                    />
                    <span className={`font-black tracking-tighter select-none leading-none block
                         ${index === 0 ? "text-[80px] sm:text-[140px] -mb-2" : "text-[60px] sm:text-[100px]"}
                         ${char === " " ? "w-6 sm:w-10" : "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]"}
                      `}>
                      {char}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* LINE 2: NEURAL CONSOLE - hidden on mobile, shown on md+ */}
            <motion.div
              initial={{ opacity: 0, scale: 1, y: 0 }}
              animate={{
                opacity: 1,
                scale: [1, 1, 0.4],
                y: [0, 0, -420],
                x: 0
              }}
              transition={{ delay: 1, duration: 6, times: [0, 0.7, 1] }}
              className="relative hidden md:flex w-full max-w-7xl h-32 items-center justify-between px-12 z-[100]"
            >

              {/* CONNECT NODE (LEFT - ORIGINAL STYLE) */}
              <div className="flex flex-col items-center gap-2 group/node">
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(43,255,160,0.2)]">
                  <i className="pi pi-wifi text-2xl text-secondary animate-pulse"></i>
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent opacity-40" />
                </div>
                <span className="text-[10px] font-mono font-black text-secondary/60 tracking-widest uppercase">CONN_NEURAL</span>
              </div>

              {/* DATA FLUX BRIDGE 1 */}
              <div className="flex-1 h-px bg-gradient-to-r from-white/5 via-white/40 to-white/5 relative mx-8">
                <motion.div
                  animate={{ left: ['0%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-[2px] w-8 h-[5px] bg-white blur-[2px] rounded-full shadow-[0_0_15px_#fff]"
                />
              </div>

              {/* THE SUPERMARKET AUTOMATIC DOORS (DUAL-PANE REVEAL) */}
              <div className="relative group/core h-40 w-full flex items-center justify-center overflow-visible mt-8 px-4">
                
                {/* THE LEFT SLIDING DOOR */}
                <motion.div
                  initial={{ x: 0, opacity: 0.85 }}
                  animate={{ x: '-100%', opacity: 0 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-[0%] w-1/2 h-full bg-background/50 backdrop-blur-3xl border-y border-l border-white/20 rounded-l-3xl shadow-[-20px_0_50px_rgba(0,0,0,0.6)] z-20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
                  {/* Dynamic Specular Sweep (Opening Direction) */}
                  <motion.div
                    animate={{ left: ['100%', '-100%'] }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-32 bg-white/20 blur-xl -skew-x-[45deg]"
                  />
                </motion.div>

                {/* THE RIGHT SLIDING DOOR */}
                <motion.div
                  initial={{ x: 0, opacity: 0.85 }}
                  animate={{ x: '100%', opacity: 0 }}
                  transition={{ delay: 1, duration: 1.5, ease: "easeInOut" }}
                  className="absolute right-[0%] w-1/2 h-full bg-background/50 backdrop-blur-3xl border-y border-r border-white/20 rounded-r-3xl shadow-[20px_0_50px_rgba(0,0,0,0.6)] z-20 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-l from-white/10 to-transparent" />
                  {/* Dynamic Specular Sweep (Opening Direction) */}
                  <motion.div
                    animate={{ left: ['-100%', '100%'] }}
                    transition={{ duration: 1.5, delay: 1, ease: "easeInOut" }}
                    className="absolute inset-y-0 w-32 bg-white/20 blur-xl skew-x-[45deg]"
                  />
                </motion.div>

                {/* THE SINGULARITY CORE LIGHT (CENTRAL REVEAL) */}
                <motion.div
                  initial={{ scaleY: 0, opacity: 0 }}
                  animate={{ scaleY: 1, opacity: [0, 1, 0.4] }}
                  transition={{ delay: 0.5, duration: 1 }}
                  className="absolute w-1.5 h-full bg-gradient-to-b from-transparent via-white to-transparent z-10 shadow-[0_0_40px_rgba(255,255,255,0.8),0_0_15px_var(--color-secondary)]"
                />

                {/* CENTRAL REVEAL PULSE */}
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 4], opacity: [0, 0.4, 0] }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="absolute w-32 h-32 bg-white rounded-full blur-[60px] z-5 pointer-events-none"
                />
              </div>

              {/* DATA FLUX BRIDGE 2 */}
              <div className="flex-1 h-px bg-gradient-to-r from-white/5 via-white/40 to-white/5 relative mx-8">
                <motion.div
                  animate={{ left: ['100%', '0%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-[2px] w-8 h-[5px] bg-secondary blur-[2px] rounded-full shadow-[0_0_15px_var(--color-secondary)]"
                />
              </div>

              {/* ENERGIE NODE (RIGHT - ORIGINAL STYLE) */}
              <div className="flex flex-col items-center gap-2 group/node">
                <div className="w-16 h-16 rounded-full border border-white/20 bg-white/5 backdrop-blur-xl flex items-center justify-center relative overflow-hidden shadow-[0_0_30px_rgba(255,121,0,0.2)]">
                  <i className="pi pi-bolt text-2xl text-[#FF7900] animate-pulse"></i>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#FF7900]/20 to-transparent opacity-40" />
                </div>
                <span className="text-[10px] font-mono font-black text-[#FF7900]/60 tracking-widest uppercase">ENRG_GRID</span>
              </div>
            </motion.div>
          </motion.h1>

          <div className="relative mt-8 max-w-3xl overflow-visible">
            {/* THE SCANNING BEAM (FLASHLIGHT EFFECT - PARAGRAPH INTENSE) */}
            <motion.div
              initial={{ left: '-20%', opacity: 0 }}
              animate={{ left: ['-20%', '120%'], opacity: [0, 0.7, 0] }}
              transition={{ duration: 3, ease: "easeInOut", delay: 2.5 }}
              className="absolute inset-y-0 w-80 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-[60px] z-20 pointer-events-none"
            />

            <motion.p className="text-xl md:text-2xl text-on-surface-variant font-inter leading-relaxed drop-shadow-lg font-light flex flex-wrap gap-x-[0.2em]">
              {"Vera merges global telecommunications throughput with proactive energy grid optimization. Directed by your dedicated Autonomous AI Agent.".split(" ").map((word, wIndex) => (
                <span key={wIndex} className="relative flex whitespace-nowrap overflow-visible">
                  {word.split("").map((char, cIndex) => (
                    <motion.span
                      key={cIndex}
                      initial={{ opacity: 0, filter: "brightness(0)" }}
                      animate={{
                        opacity: 1,
                        filter: ["brightness(12)", "brightness(1)"]
                      }}
                      transition={{
                        duration: 1.2,
                        delay: 2.5 + (wIndex * 0.08) + (cIndex * 0.015)
                      }}
                      className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.p>
          </div>

          <motion.div variants={fadeUpScroll} className="flex flex-col sm:flex-row gap-4 md:gap-8 mt-8 md:mt-12 w-full max-w-2xl justify-center px-4">
            <Link href="/login" className="flex-1">
              <button className="bg-gradient-to-br from-primary to-primary-container hover:from-primary-fixed-dim hover:to-primary text-surface px-8 py-5 rounded-2xl font-bold font-inter transform transition-all shadow-[0_0_30px_rgba(0,229,255,0.3)] hover:shadow-[0_0_60px_rgba(0,229,255,0.6)] hover:scale-105 flex items-center justify-center gap-4 w-full text-base tracking-widest uppercase">
                Secure Portal <i className="pi pi-bolt text-lg"></i>
              </button>
            </Link>
          </motion.div>

          {/* Scroll Down Indicator */}
          <motion.div
            variants={fadeUpScroll}
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="mt-24 flex flex-col items-center text-primary-fixed-dim font-mono text-xs uppercase tracking-widest gap-3 opacity-60"
          >
            System Telemetry Below
            <i className="pi pi-chevron-down text-2xl"></i>
          </motion.div>
        </motion.div>
      </section>

      {/* 1.5 ANIMATED LOGO TICKER (NEWS STYLE) */}
      <section className="py-10 md:py-20 bg-surface-container-low border-b border-outline-variant/10 relative overflow-hidden group">
        {/* Abstract Energy Background Image */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-1000 grayscale pointer-events-none">
          <Image
            src="/energy-grid-bg.png"
            alt="Energy Grid Abstract"
            fill
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background z-10" />

        <div className="max-w-7xl mx-auto relative z-20">
          <p className="text-center text-[10px] font-mono tracking-[0.2em] md:tracking-[0.4em] text-primary uppercase mb-6 md:mb-12 animate-pulse font-bold">Flux de Donn├®es R├®seaux Partenaires</p>

          <div className="flex overflow-hidden w-full select-none">
            {/* Infinite Horizontal Scroll with Framer Motion */}
            <motion.div
              animate={{ x: [0, -1000] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="flex flex-none gap-24 items-center whitespace-nowrap px-12"
            >
              {[
                "EDF G├ëN├ëRATION", "TOTAL ├ëNERGIES", "ENGIE SOLUTIONS", "OHM ├ëNERGIE", "GS ├ëLECTRICIT├ë", "ENI PRO", "VATTENFALL", "IBERDROLA"
              ].map((partner, i) => (
                <div key={i} className="flex items-center gap-6 group/logo">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover/logo:scale-150 transition-transform shadow-[0_0_10px_var(--color-primary)]"></div>
                  <span className="text-3xl font-manrope font-black tracking-tighter text-white opacity-40 group-hover/logo:opacity-100 group-hover/logo:text-primary transition-all duration-300">
                    {partner}
                  </span>
                  <span className="text-xs font-mono text-outline-variant opacity-20 font-light">CORE.STREAM</span>
                </div>
              ))}
              {/* Repeat for seamless loop */}
              {[
                "EDF G├ëN├ëRATION", "TOTAL ├ëNERGIES", "ENGIE SOLUTIONS", "OHM ├ëNERGIE", "GS ├ëLECTRICIT├ë", "ENI PRO", "VATTENFALL", "IBERDROLA"
              ].map((partner, i) => (
                <div key={i + 10} className="flex items-center gap-6 group/logo">
                  <div className="w-2 h-2 bg-primary rounded-full group-hover/logo:scale-150 transition-transform shadow-[0_0_10px_var(--color-primary)]"></div>
                  <span className="text-lg md:text-3xl font-manrope font-black tracking-tighter text-white opacity-40 group-hover/logo:opacity-100 group-hover/logo:text-primary transition-all duration-300">
                    {partner}
                  </span>
                  <span className="text-xs font-mono text-outline-variant opacity-20 font-light">CORE.STREAM</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 1.55 FULL-WIDTH CINEMATIC DYNAMIC SLIDER (AUTO) */}
      <section className="w-full h-[280px] md:h-[500px] lg:h-[600px] bg-background relative overflow-hidden flex flex-col justify-center">
        <div className="absolute top-0 left-0 w-full h-px bg-primary/20" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-primary/20" />

        <motion.div
          animate={{ x: [0, -2800] }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="flex flex-none gap-20 items-center whitespace-nowrap px-12 h-full"
        >
          {[
            { img: '/agent.png', title: 'Intelligence Autonome', subtitle: 'Global Orchestration' },
            { img: '/energy.png', title: 'R├®seaux de Verre', subtitle: 'Luminescence ├ënerg├®tique' },
            { img: '/energy-grid-bg.png', title: 'Grille Proactive', subtitle: 'Dynamic Power Flow' },
            { img: '/telecom.png', title: 'Hyper Connectivit├®', subtitle: 'Neural Data Stream' },
          ].map((slide, i) => (
            <div key={i} className="flex-none w-[260px] md:w-[500px] lg:w-[800px] h-[200px] md:h-[340px] lg:h-[450px] relative rounded-2xl md:rounded-[3rem] overflow-hidden group border border-outline-variant/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <Image src={slide.img} alt={slide.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10" />
              <div className="absolute bottom-4 md:bottom-12 left-4 md:left-12 z-20">
                <p className="text-primary font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] md:tracking-[0.4em] mb-1 md:mb-2">{slide.subtitle}</p>
                <h3 className="text-lg md:text-3xl lg:text-5xl font-manrope font-black text-white uppercase tracking-tighter drop-shadow-2xl">{slide.title}</h3>
              </div>
              {/* Decorative Neon Element */}
              <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
          {/* Repeat for seamless loop */}
          {[
            { img: '/agent.png', title: 'Intelligence Autonome', subtitle: 'Global Orchestration' },
            { img: '/energy.png', title: 'R├®seaux de Verre', subtitle: 'Luminescence ├ënerg├®tique' },
            { img: '/energy-grid-bg.png', title: 'Grille Proactive', subtitle: 'Dynamic Power Flow' },
            { img: '/telecom.png', title: 'Hyper Connectivit├®', subtitle: 'Neural Data Stream' },
          ].map((slide, i) => (
            <div key={i + 10} className="flex-none w-[260px] md:w-[500px] lg:w-[800px] h-[200px] md:h-[340px] lg:h-[450px] relative rounded-2xl md:rounded-[3rem] overflow-hidden group border border-outline-variant/30 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
              <Image src={slide.img} alt={slide.title} fill className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-70 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-transparent z-10" />
              <div className="absolute bottom-4 md:bottom-12 left-4 md:left-12 z-20">
                <p className="text-primary font-mono text-[9px] md:text-xs uppercase tracking-[0.3em] mb-1 md:mb-2">{slide.subtitle}</p>
                <h3 className="text-lg md:text-3xl lg:text-5xl font-manrope font-black text-white uppercase tracking-tighter drop-shadow-2xl">{slide.title}</h3>
              </div>
              {/* Decorative Neon Element */}
              <div className="absolute top-8 right-8 w-24 h-24 border-t-2 border-r-2 border-primary/40 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </section>

      {/* 1.6 B2B & B2C ENERGY OFFERS (ORBITAL INTERACTIVE UI) */}
      <section className="py-16 md:py-32 px-5 sm:px-8 lg:px-24 bg-background relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1000px] h-[600px] md:h-[1000px] bg-primary/5 blur-[180px] rounded-full pointer-events-none" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto relative z-10 w-full flex flex-col items-center"
        >
          <motion.div variants={fadeUpScroll} className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-manrope font-black text-white mb-4 md:mb-6 uppercase tracking-tight">Nos Offres ├ënergie</h2>
            <p className="text-base md:text-xl text-on-surface-variant font-inter max-w-3xl mx-auto font-light leading-relaxed">
              Interagissez avec Vera pour explorer les solutions ├®nerg├®tiques de demain.
            </p>
          </motion.div>

          {/* OFFER CARDS - Stacked on mobile, side by side on desktop */}
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">

            {/* B2B OFFER CARD */}
            <motion.div
              variants={fadeUpScroll}
              whileHover={{ scale: 1.02 }}
              className="w-full bg-surface-container-low/90 backdrop-blur-3xl p-7 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-primary/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all"
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex justify-between items-start">
                  <span className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-mono px-3 py-1.5 rounded-full uppercase tracking-widest font-black">B2B ┬À GS ├ëLECTRICIT├ë PRO</span>
                  <i className="pi pi-building text-xl md:text-2xl text-primary/40"></i>
                </div>
                <h3 className="text-2xl md:text-4xl font-manrope font-black text-white italic tracking-tight">Expansion Industrielle</h3>
                <p className="text-sm md:text-base text-on-surface-variant font-inter leading-relaxed font-light">
                  Optimisation multi-sites massive avec une r├®duction garantie de <span className="text-primary font-bold">25%</span> de vos d├®penses ├®nerg├®tiques via l'IA.
                </p>
                <button className="w-full py-4 md:py-5 bg-gradient-to-r from-primary to-primary-container text-surface font-manrope font-black text-sm uppercase tracking-widest rounded-xl md:rounded-2xl hover:shadow-[0_20px_40px_rgba(0,229,255,0.3)] transition-all">Consulter Devis Pro</button>
              </div>
            </motion.div>

            {/* B2C OFFER CARD */}
            <motion.div
              variants={fadeUpScroll}
              whileHover={{ scale: 1.02 }}
              className="w-full bg-surface-container-low/90 backdrop-blur-3xl p-7 md:p-10 rounded-2xl md:rounded-[2.5rem] border border-secondary/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all"
            >
              <div className="flex flex-col gap-4 md:gap-6">
                <div className="flex justify-between items-start">
                  <span className="bg-secondary/20 text-secondary border border-secondary/30 text-[10px] font-mono px-3 py-1.5 rounded-full uppercase tracking-widest font-black">B2C ┬À OHM ├ëNERGIE SMART</span>
                  <i className="pi pi-home text-xl md:text-2xl text-secondary/40"></i>
                </div>
                <h3 className="text-2xl md:text-4xl font-manrope font-black text-white italic tracking-tight">Maison Connect├®e</h3>
                <p className="text-sm md:text-base text-on-surface-variant font-inter leading-relaxed font-light">
                  ├ënergie <span className="text-secondary font-bold">100% Verte</span> pour votre foyer. Suivi live via Vera et facturation transparente instantan├®e.
                </p>
                <button className="w-full py-4 md:py-5 bg-gradient-to-r from-secondary to-[#00f28e] text-surface font-manrope font-black text-sm uppercase tracking-widest rounded-xl md:rounded-2xl hover:shadow-[0_20px_40px_rgba(43,255,160,0.3)] transition-all">Souscription Imm├®diate</button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 1.7 VERA CONTRACT CYCLE (AI ONBOARDING FLOW) - FULL WIDTH */}
      <section className="py-12 md:py-24 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="relative z-10 w-full"
        >
          <motion.div variants={fadeUpScroll} className="text-center mb-8 md:mb-16 max-w-7xl mx-auto px-5 sm:px-8">
            <span className="text-primary font-mono text-xs uppercase tracking-[0.3em] md:tracking-[0.5em] mb-3 md:mb-4 inline-block font-bold">Z├®ro Lenteur ┬À Z├®ro Papier</span>
            <h2 className="text-3xl md:text-5xl lg:text-7xl font-manrope font-black text-white mb-4 md:mb-8 uppercase tracking-tighter">Cycle Contractuel <span className="text-primary italic">Vera</span></h2>
            <p className="text-sm md:text-xl text-on-surface-variant font-inter max-w-3xl mx-auto font-light leading-relaxed">
              Dites adieu aux formulaires classiques. Vera automatise votre transition ├®nerg├®tique en temps r├®el, du premier mot ├á la signature finale.
            </p>
          </motion.div>

          {/* 6-STEP CYCLE CAROUSEL */}
          <div className="relative w-full overflow-hidden pb-12">
            <motion.div
              animate={{ x: [0, -2000] }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="flex flex-none gap-10 items-stretch h-full cursor-grab active:cursor-grabbing"
            >
              {[
                { step: "01", title: "Contact & Dialogue Voice", desc: "Parlez directement ├á Vera. Elle comprend vos besoins instantan├®ment via reconnaissance vocale neuronale.", img: "/step-voice.png", color: "border-primary/20 hover:border-primary" },
                { step: "02", title: "Scan de Facture IA", desc: "T├®l├®versez votre ancienne facture. Vera extrait les donn├®es de consommation en 0.4 seconde avec pr├®cision laser.", img: "/step-bill.png", color: "border-secondary/20 hover:border-secondary shadow-[0_0_20px_rgba(43,255,160,0.05)]" },
                { step: "03", title: "Comparatif & Remises", desc: "Vera g├®n├¿re une liste d'offres exclusives Ohm et GS avec des remises appliqu├®es selon votre profil.", img: "/energy.png", color: "border-primary/20 hover:border-primary" },
                { step: "04", title: "G├®n├®ration de Devis", desc: "Obtenez un devis contractuel complet, sans frais cach├®s, pr├¬t pour validation en un clic.", img: "/telecom.png", color: "border-secondary/20 hover:border-secondary" },
                { step: "05", title: "Signature Biom├®trique", desc: "Signez votre contrat num├®riquement avec une s├®curit├® de grade militaire (FaceID/Fingerprint).", img: "/agent.png", color: "border-primary/20 hover:border-primary" },
                { step: "06", title: "Paiement & Activation", desc: "R├®glez en ligne et activez votre nouveau contrat. Transition termin├®e en moins de 2 minutes.", img: "/energy-grid-bg.png", color: "border-tertiary-fixed-dim/20 hover:border-tertiary-fixed-dim" }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  variants={fadeUpScroll}
                  className={`flex-none w-[400px] bg-surface-container p-8 rounded-[2.5rem] border transition-all duration-500 group flex flex-col gap-6 relative overflow-hidden ${item.color}`}
                >
                  <div className="absolute top-0 right-0 p-6 text-6xl font-manrope font-black opacity-5 text-white pointer-events-none group-hover:opacity-10 transition-opacity">
                    {item.step}
                  </div>

                  <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-outline-variant/10 shadow-inner">
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-container to-transparent" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-manrope font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant font-inter leading-relaxed font-light whitespace-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-outline-variant">
                    <span>Temps r├®el</span>
                    <span className="flex items-center gap-2">
                      Processus AI <i className="pi pi-bolt text-primary animate-pulse"></i>
                    </span>
                  </div>
                </motion.div>
              ))}
              {/* Duplicate for seamlessness */}
              {[
                { step: "01", title: "Contact & Dialogue Voice", desc: "Parlez directement ├á Vera. Elle comprend vos besoins instantan├®ment via reconnaissance vocale neuronale.", img: "/step-voice.png", color: "border-primary/20 hover:border-primary" },
                { step: "02", title: "Scan de Facture IA", desc: "T├®l├®versez votre ancienne facture. Vera extrait les donn├®es de consommation en 0.4 seconde avec pr├®cision laser.", img: "/step-bill.png", color: "border-secondary/20 hover:border-secondary shadow-[0_0_20px_rgba(43,255,160,0.05)]" },
                { step: "03", title: "Comparatif & Remises", desc: "Vera g├®n├¿re une liste d'offres exclusives Ohm et GS avec des remises appliqu├®es selon votre profil.", img: "/energy.png", color: "border-primary/20 hover:border-primary" },
                { step: "04", title: "G├®n├®ration de Devis", desc: "Obtenez un devis contractuel complet, sans frais cach├®s, pr├¬t pour validation en un clic.", img: "/telecom.png", color: "border-secondary/20 hover:border-secondary" },
                { step: "05", title: "Signature Biom├®trique", desc: "Signez votre contrat num├®riquement avec une s├®curit├® de grade militaire (FaceID/Fingerprint).", img: "/agent.png", color: "border-primary/20 hover:border-primary" },
                { step: "06", title: "Paiement & Activation", desc: "R├®glez en ligne et activez votre nouveau contrat. Transition termin├®e en moins de 2 minutes.", img: "/energy-grid-bg.png", color: "border-tertiary-fixed-dim/20 hover:border-tertiary-fixed-dim" }
              ].map((item, i) => (
                <motion.div
                  key={i + 10}
                  variants={fadeUpScroll}
                  className={`flex-none w-[400px] bg-surface-container p-8 rounded-[2.5rem] border transition-all duration-500 group flex flex-col gap-6 relative overflow-hidden ${item.color}`}
                >
                  <div className="absolute top-0 right-0 p-6 text-6xl font-manrope font-black opacity-5 text-white pointer-events-none group-hover:opacity-10 transition-opacity">
                    {item.step}
                  </div>

                  <div className="w-full h-48 rounded-2xl overflow-hidden relative border border-outline-variant/10 shadow-inner">
                    <Image src={item.img} alt={item.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-60 group-hover:opacity-100" />
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-surface-container to-transparent" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-manrope font-bold text-white mb-3 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-on-surface-variant font-inter leading-relaxed font-light whitespace-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-auto pt-6 flex justify-between items-center text-[10px] font-mono tracking-widest uppercase text-outline-variant">
                    <span>Temps r├®el</span>
                    <span className="flex items-center gap-2">
                      Processus AI <i className="pi pi-bolt text-primary animate-pulse"></i>
                    </span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 2. DATA STATISTIC TABLEAU & GRAPHICS (SCROLL ANIMATED) */}
      <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 bg-surface-container-lowest border-y border-outline-variant/10 relative overflow-hidden">
        {/* Abstract Background Vectors */}
        <svg className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 1000 500" preserveAspectRatio="none">
          <path d="M0,250 C200,400 300,100 500,250 C700,400 800,100 1000,250 L1000,500 L0,500 Z" fill="url(#grad1)" />
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10"
        >
          <motion.div variants={fadeUpScroll} className="flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mb-8 md:mb-12 border-b border-primary/20 pb-6 md:pb-8">
            <div>
              <h2 className="text-3xl md:text-5xl lg:text-7xl font-manrope font-extrabold text-on-surface mb-3 md:mb-4">Live Telemetry</h2>
              <p className="text-sm md:text-base lg:text-2xl text-on-surface-variant font-inter max-w-3xl font-light">
                Real-time graphics engine monitoring global energy and telecom throughput.
              </p>
            </div>
            <div className="flex gap-3 md:gap-6">
              <span className="bg-primary/10 border border-primary/20 text-primary px-3 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-mono tracking-widest flex items-center gap-2 md:gap-3">
                <i className="pi pi-bolt" /> ENERGY
              </span>
              <span className="bg-secondary/10 border border-secondary/20 text-secondary px-3 md:px-6 py-2 md:py-3 rounded-xl text-xs md:text-sm font-mono tracking-widest flex items-center gap-2 md:gap-3">
                <i className="pi pi-wifi" /> TELECOM
              </span>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left Col: Main Interactive Graphic / Map */}
            <motion.div variants={fadeUpScroll} className="lg:col-span-8 bg-surface-container p-5 md:p-10 rounded-xl md:rounded-[2rem] border border-outline-variant/20 shadow-2xl relative overflow-hidden group min-h-[280px] md:min-h-[500px] flex flex-col">
              <div className="flex flex-wrap justify-between items-center mb-5 md:mb-8 border-b border-outline-variant/20 pb-4 md:pb-6 gap-2">
                <h3 className="text-lg md:text-3xl font-manrope font-bold text-white">Global Neural Topology</h3>
                <span className="text-xs md:text-sm font-mono text-outline-variant tracking-widest uppercase">Nodes: 4,092</span>
              </div>

              {/* Graphic Representation (SVG Network) */}
              <div className="w-full flex-1 relative flex items-center justify-center min-h-[300px]">
                <svg width="100%" height="100%" viewBox="0 0 800 400" className="opacity-80 scale-110">
                  <path d="M 100,200 Q 250,50 400,200 T 700,200" fill="none" stroke="var(--color-primary-container)" strokeWidth="1.5" strokeDasharray="6 6" className="animate-[dash_20s_linear_infinite]" />
                  <path d="M 200,300 Q 400,100 600,300" fill="none" stroke="var(--color-secondary)" strokeWidth="2.5" opacity="0.6" />

                  {/* Glowing Nodes */}
                  <circle cx="100" cy="200" r="8" fill="var(--color-primary-fixed-dim)" className="animate-pulse" />
                  <circle cx="400" cy="200" r="16" fill="var(--color-primary-container)" className="animate-ping" style={{ animationDuration: '3s' }} />
                  <circle cx="400" cy="200" r="8" fill="var(--color-surface)" stroke="var(--color-primary)" strokeWidth="3" />
                  <circle cx="700" cy="200" r="10" fill="var(--color-primary-fixed-dim)" className="animate-pulse" />
                  <circle cx="200" cy="300" r="6" fill="var(--color-secondary)" />
                  <circle cx="600" cy="300" r="6" fill="var(--color-secondary)" />

                  {/* Fake UI Data floating in SVG */}
                  <rect x="360" y="130" width="100" height="30" rx="6" fill="var(--color-surface-container-highest)" stroke="var(--color-primary/40)" strokeWidth="2" />
                  <text x="410" y="150" fill="white" fontSize="12" fontFamily="monospace" textAnchor="middle">CORE-A1</text>
                </svg>

                {/* Floating Metric Card inside Graphic */}
                <div className="absolute bottom-6 left-6 bg-background/90 backdrop-blur-xl border border-primary/30 p-6 rounded-2xl shadow-[0_0_30px_rgba(0,229,255,0.15)]">
                  <p className="text-xs text-primary-fixed-dim font-mono tracking-widest mb-2">NETWORK STRESS</p>
                  <div className="flex items-end gap-3">
                    <span className="text-4xl font-manrope font-bold text-white">12.4</span>
                    <span className="text-sm text-on-surface-variant font-mono mb-1">Terabytes/s</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Col: Stat Blocks */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4 md:gap-8">
              <motion.div variants={fadeUpScroll} className="bg-gradient-to-br from-primary/10 to-surface-container p-5 md:p-10 rounded-xl md:rounded-[2rem] border border-primary/30 shadow-[0_0_40px_rgba(0,229,255,0.1)] flex flex-col justify-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 md:w-48 md:h-48 bg-primary/20 blur-[60px] rounded-full" />
                <i className="pi pi-chart-line text-2xl md:text-4xl text-primary mb-3 md:mb-6 drop-shadow-[0_0_10px_var(--color-primary)]" />
                <h4 className="text-xs md:text-base font-inter text-on-surface-variant mb-1 md:mb-2">AI Predictability</h4>
                <p className="text-3xl md:text-5xl lg:text-6xl font-manrope font-black text-white">99.8%</p>
                <div className="w-full h-1 md:h-1.5 bg-surface-container-highest mt-3 md:mt-6 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[99.8%] shadow-[0_0_15px_var(--color-primary)]" />
                </div>
              </motion.div>
              <motion.div variants={fadeUpScroll} className="bg-surface-container p-5 md:p-10 rounded-xl md:rounded-[2rem] border border-outline-variant/20 flex flex-col justify-center shadow-lg">
                <i className="pi pi-server text-2xl md:text-4xl text-secondary mb-3 md:mb-6" />
                <h4 className="text-xs md:text-base font-inter text-on-surface-variant mb-1 md:mb-2">Grid Reroutes</h4>
                <p className="text-3xl md:text-5xl lg:text-6xl font-manrope font-black text-white">14,092<span className="text-sm md:text-xl text-secondary ml-2 font-normal">/hr</span></p>
              </motion.div>
            </div>

            {/* Bottom Row: Data Table (Tableau) */}
            <motion.div variants={fadeUpScroll} className="lg:col-span-12 bg-surface-container-low p-5 md:p-10 lg:p-12 rounded-xl md:rounded-[2rem] border border-outline-variant/30 overflow-hidden shadow-2xl mt-4 md:mt-8">
              <h3 className="text-lg md:text-2xl font-manrope font-bold text-white mb-5 md:mb-8 flex items-center gap-3 md:gap-4">
                <i className="pi pi-list text-primary text-lg md:text-2xl" /> Live Node Matrix
              </h3>
              <div className="w-full overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[1000px]">
                  <thead>
                    <tr className="border-b-2 border-outline-variant/30 text-sm font-mono tracking-widest text-outline-variant uppercase">
                      <th className="pb-5 px-6 font-semibold">Node ID</th>
                      <th className="pb-5 px-6 font-semibold">Region</th>
                      <th className="pb-5 px-6 font-semibold">Status</th>
                      <th className="pb-5 px-6 font-semibold">Throughput</th>
                      <th className="pb-5 px-6 font-semibold">AI Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-base font-inter text-on-surface">
                    {[
                      { id: 'ND-E01', region: 'Europe Central', statusTag: 'Optimal', statusColor: 'bg-primary', tp: '4.2 Tbps', action: 'Monitoring load balance', aColor: 'text-on-surface-variant', spin: false },
                      { id: 'ND-A12', region: 'Asia Pacific', statusTag: 'Stressed', statusColor: 'bg-tertiary-fixed-dim', tp: '9.8 Tbps', action: 'Rerouting 12% to ND-A14', aColor: 'text-primary', spin: true },
                      { id: 'ND-N05', region: 'North America', statusTag: 'Optimal', statusColor: 'bg-primary', tp: '6.1 Tbps', action: 'Energy scaling confirmed', aColor: 'text-on-surface-variant', spin: false },
                      { id: 'ND-ME8', region: 'Middle East Hub', statusTag: 'Warning', statusColor: 'bg-error', tp: '8.4 Tbps', action: 'Isolating packet loss', aColor: 'text-error', spin: true },
                      { id: 'ND-S02', region: 'South America', statusTag: 'Optimal', statusColor: 'bg-primary', tp: '3.3 Tbps', action: 'Nominal operations', aColor: 'text-on-surface-variant', spin: false },
                    ].map((row, i) => (
                      <tr key={i} className="border-b border-surface-container-highest hover:bg-surface-container/50 transition-colors">
                        <td className="py-6 px-6 font-mono text-primary-fixed-dim font-bold">{row.id}</td>
                        <td className="py-6 px-6">{row.region}</td>
                        <td className="py-6 px-6 flex items-center mt-1">
                          <span className={`w-3 h-3 rounded-full ${row.statusColor} inline-block mr-3 shadow-[0_0_10px_var(--color-${row.statusColor.split('-')[1]})]`}></span>
                          {row.statusTag}
                        </td>
                        <td className="py-6 px-6 font-mono">{row.tp}</td>
                        <td className={`py-6 px-6 font-semibold ${row.aColor}`}>
                          {row.action} {row.spin && <i className="pi pi-sync ml-2 animate-spin text-sm"></i>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* 3. LIVE DASHBOARD BARS (SCROLL ANIMATED) */}
      <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] md:w-[1200px] h-[400px] md:h-[600px] bg-secondary/5 blur-[200px] rounded-[100%] pointer-events-none" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-20 relative z-10"
        >

          <motion.div variants={fadeUpScroll} className="flex-1 w-full bg-surface-container/50 backdrop-blur-3xl p-6 md:p-10 lg:p-16 rounded-2xl md:rounded-[3rem] border border-outline-variant/30 shadow-[0_20px_60px_rgba(0,0,0,0.5)] flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6 md:mb-12 border-b border-outline-variant/30 pb-4 md:pb-6">
              <div>
                <h3 className="text-xl md:text-3xl font-manrope font-bold text-on-surface">Data Saturation</h3>
                <p className="text-xs md:text-sm font-mono text-outline uppercase tracking-widest mt-1 md:mt-2">Live Feed - Sector Alpha</p>
              </div>
              <span className="text-primary-container bg-primary/10 p-2 md:p-3 rounded-full border border-primary/30"><i className="pi pi-spin pi-cog text-xl md:text-3xl" /></span>
            </div>

            <div className="flex flex-col gap-10">
              {[
                { label: 'Europe Node', max: '80%', color: 'var(--color-primary)' },
                { label: 'NA East Trunk', max: '45%', color: 'var(--color-secondary)' },
                { label: 'Asia Relay', max: '92%', color: 'var(--color-error)' },
              ].map((bar, i) => (
                <div key={i} className="flex flex-col gap-4">
                  <div className="flex justify-between text-sm font-mono uppercase text-on-surface-variant font-bold">
                    <span>{bar.label}</span>
                    <span style={{ color: bar.color }}>{bar.max}</span>
                  </div>
                  <div className="w-full h-4 bg-surface-container-highest rounded-full overflow-hidden border border-outline-variant/10">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: bar.max }}
                      transition={{ duration: 2, ease: "easeOut", delay: i * 0.3 }}
                      viewport={{ once: true }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: bar.color }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-10 border-t border-outline-variant/30 grid grid-cols-2 gap-8">
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-inner">
                <p className="text-xs uppercase font-mono text-on-surface-variant tracking-widest mb-2">Active Packets</p>
                <p className="text-4xl font-manrope font-black text-white">3.2B</p>
              </div>
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/20 shadow-inner">
                <p className="text-xs uppercase font-mono text-on-surface-variant tracking-widest mb-2">Load Stress</p>
                <p className="text-4xl font-manrope font-black text-primary-fixed-dim">Nominal</p>
              </div>
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col gap-5 md:gap-8 w-full">
            <motion.h2 variants={fadeUpScroll} className="text-3xl md:text-5xl lg:text-7xl font-manrope font-extrabold text-on-surface leading-tight">Interactive <br /> Telemetry</motion.h2>
            <motion.p variants={fadeUpScroll} className="text-sm md:text-xl lg:text-2xl text-on-surface-variant font-inter leading-relaxed font-light">
              Don't just watch your infrastructureÔÇöorchestrate it. The Smart Vue command center renders millions of gigabytes into actionable alerts.
            </motion.p>
            <motion.ul variants={staggerContainer} className="flex flex-col gap-3 md:gap-6 mt-4 md:mt-6 font-inter text-on-surface text-sm md:text-lg">
              <motion.li variants={fadeUpScroll} className="flex items-center gap-3 md:gap-5 bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline-variant/10"><i className="pi pi-check-circle text-primary text-lg md:text-2xl" /> Millisecond reaction times.</motion.li>
              <motion.li variants={fadeUpScroll} className="flex items-center gap-3 md:gap-5 bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline-variant/10"><i className="pi pi-check-circle text-primary text-lg md:text-2xl" /> Visual Network Topology graphs.</motion.li>
              <motion.li variants={fadeUpScroll} className="flex items-center gap-3 md:gap-5 bg-surface-container-low p-3 md:p-4 rounded-xl border border-outline-variant/10"><i className="pi pi-check-circle text-primary text-lg md:text-2xl" /> Proactive bandwidth healing.</motion.li>
            </motion.ul>
            <motion.div variants={fadeUpScroll} className="mt-8">
              <Link href="/smart-vue">
                <button className="border-b-2 border-primary text-primary hover:text-primary-fixed-dim hover:border-primary-fixed-dim transition-colors pb-2 w-fit font-mono text-base tracking-widest uppercase flex items-center gap-3 font-semibold">
                  Explore Smart Vue <i className="pi pi-arrow-right text-sm"></i>
                </button>
              </Link>
            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* 4. HARDWARE NODES: ENERGY & TELECOM (GLASS STYLE) */}
      <section className="py-12 md:py-24 px-5 sm:px-8 lg:px-24 bg-surface-container-lowest relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_right,_var(--color-primary)_0%,_transparent_30%)] opacity-5 pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-full h-full bg-[radial-gradient(circle_at_left,_var(--color-secondary)_0%,_transparent_30%)] opacity-5 pointer-events-none"></div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto flex flex-col gap-12 md:gap-32 relative z-10"
        >
          {/* Component 1: Energy Grid (AI Energy Word) */}
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 group">
            <motion.div variants={fadeUpScroll} className="flex-1 w-full order-2 lg:order-1 relative min-h-[260px] md:min-h-[500px] h-[300px] md:h-[500px] lg:h-[600px] rounded-2xl md:rounded-[3rem] overflow-hidden border border-primary/20 shadow-[0_20px_60px_rgba(0,229,255,0.1)] flex items-center justify-center bg-surface-container-low">
              {/* Translucent Glass Image Mask overlay */}
              <div className="absolute inset-0 z-20 bg-gradient-to-tr from-background/80 via-transparent to-background/20 mix-blend-overlay"></div>
              {/* 3D Glass Image representing AI Energy Statistics */}
              <Image
                src="/energy.png"
                alt="Vera AI Energy Grid Glass Style"
                fill
                className="object-cover z-10 transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 z-30 pointer-events-none">
                <div className="bg-background/80 backdrop-blur-2xl border border-primary/30 p-4 md:p-6 rounded-xl md:rounded-3xl shadow-2xl flex items-center justify-between">
                  <div>
                    <p className="text-[10px] md:text-xs font-mono uppercase text-primary-fixed-dim tracking-widest mb-1">Grid Saturation</p>
                    <p className="text-xl md:text-3xl font-manrope font-bold text-white">412.5 Terawatts</p>
                  </div>
                  <div className="w-10 h-10 md:w-16 md:h-16 rounded-full border border-primary/40 flex items-center justify-center bg-primary/10">
                    <i className="pi pi-bolt text-lg md:text-2xl text-primary animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div variants={fadeUpScroll} className="flex-1 w-full flex flex-col gap-6 order-1 lg:order-2 px-4 lg:px-0">
              <span className="text-primary-container font-mono tracking-widest uppercase text-sm border-l-2 border-primary-container pl-4">Energy Node Telemetry</span>
              <h2 className="text-5xl lg:text-7xl font-manrope font-black text-on-surface leading-tight">Proactive <br />Grid AI</h2>
              <p className="text-xl text-on-surface-variant font-inter font-light leading-relaxed max-w-xl">
                Our deep learning architecture actively anticipates power drops and seamlessly redistributes global energy capacity across multi-regional nodes.
              </p>
              <ul className="flex flex-col gap-4 mt-4 font-inter text-lg text-white">
                <li className="flex items-center gap-4"><i className="pi pi-angle-right text-primary"></i> 48x faster failure resolution.</li>
                <li className="flex items-center gap-4"><i className="pi pi-angle-right text-primary"></i> Advanced glass-style visualization layer.</li>
              </ul>
            </motion.div>
          </div>

          {/* FULL WIDTH SMART CONNECT BANNER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full bg-surface-container-low border-y border-secondary/20 overflow-hidden py-6 md:py-10 my-10 md:my-24 group rounded-2xl md:rounded-none">
            {/* Animated Grid Background for the Banner */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%">
                <pattern id="bannerGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="var(--color-secondary)" strokeWidth="0.5" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#bannerGrid)" />
              </svg>
            </div>

            <div className="max-w-[1800px] mx-auto flex flex-col md:flex-row items-center justify-between px-5 md:px-12 gap-6 md:gap-12 relative z-10">
              <div className="flex flex-col gap-1 md:gap-2">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-secondary rounded-full animate-ping" />
                  <span className="text-secondary font-mono text-[10px] font-black tracking-[0.2em] md:tracking-[0.4em] uppercase">VERA_NEURAL_LINK_STABLE</span>
                </div>
                <h4 className="text-xl md:text-3xl font-manrope font-black text-white italic tracking-tighter uppercase">Riyadh-Dammam Core Backbone</h4>
              </div>

              <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-4 md:gap-12 w-full md:w-auto">
                {[
                  { label: 'Latency', value: '8ms', icon: 'pi-bolt', color: 'text-secondary' },
                  { label: 'Throughput', value: '420 Gbps', icon: 'pi-cloud-download', color: 'text-white' },
                  { label: 'Zain Nodes', value: 'ACTIVE', icon: 'pi-server', color: 'text-[#FF7900]' },
                  { label: 'Orange Flux', value: 'NOMINAL', icon: 'pi-wifi', color: 'text-primary' },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col gap-1 border-l-2 border-outline-variant/10 pl-3 md:pl-6 h-full group/stat">
                    <p className="text-[9px] md:text-[10px] font-mono font-bold text-outline-variant uppercase tracking-widest flex items-center gap-1 md:gap-2 group-hover/stat:text-white transition-colors">
                      <i className={`pi ${stat.icon} text-[8px]`} /> {stat.label}
                    </p>
                    <p className={`text-sm md:text-xl font-mono font-black ${stat.color}`}>{stat.value}</p>
                  </div>
                ))}
              </div>

              <div className="hidden md:flex flex-1 justify-center overflow-hidden h-12 relative">
                <motion.div
                  animate={{ x: [1000, -1000] }}
                  transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                  className="flex items-center gap-10 whitespace-nowrap text-[10px] font-mono text-outline-variant/40"
                >
                  {Array(10).fill(0).map((_, i) => (
                    <span key={i}>AI_OPTIMIZING: SECTOR_DAMMAM_BACKBONE_07 // VERA_CORE_LOAD: 12% // PACKET_LOSS: 0.000%</span>
                  ))}
                </motion.div>
              </div>
            </div>

            {/* Glowing Accent */}
            <div className="absolute top-0 right-1/4 w-96 h-full bg-secondary/5 blur-[100px] pointer-events-none" />
          </motion.div>

          {/* Component 2: Vera Neural Support (Connect Section) */}
          <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 group">
            <motion.div variants={fadeUpScroll} className="flex-1 w-full flex flex-col gap-4 md:gap-6">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="w-8 md:w-12 h-[2px] bg-gradient-to-r from-[#FF7900] to-transparent" />
                <span className="text-[#FF7900] font-mono tracking-[0.2em] md:tracking-[0.3em] uppercase text-xs font-black">Orange & Zain Hybrid Support</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-8xl font-manrope font-black text-on-surface leading-[0.9] tracking-tighter">
                Zero Human. <br /> <span className="text-secondary">Vera</span> Support.
              </h2>
              <p className="text-sm md:text-xl text-on-surface-variant font-inter font-light leading-relaxed max-w-xl">
                Vera eliminates the need for calls or technicians. Using advanced Computer Vision, she sees what you see, diagnoses hardware faults in milliseconds, and guides you to a 100% resolution.
              </p>

              {/* Step-by-Step AI Resolution Flow */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {[
                  { icon: 'pi-camera', label: 'Capture', color: 'hover:border-[#FF7900]/40' },
                  { icon: 'pi-search-plus', label: 'Analyze', color: 'hover:border-secondary/40' },
                  { icon: 'pi-check-circle', label: 'Resolve', color: 'hover:border-primary/40' }
                ].map((step, idx) => (
                  <div key={idx} className={`bg-surface-container-low p-6 rounded-3xl border border-outline-variant/10 transition-all duration-500 ${step.color} group/step text-center`}>
                    <i className={`pi ${step.icon} text-2xl mb-3 block opacity-40 group-hover/step:opacity-100 group-hover/step:scale-110 transition-all`}></i>
                    <p className="text-[10px] font-mono uppercase tracking-widest font-bold text-outline-variant group-hover/step:text-white transition-colors">{step.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-6 bg-secondary/5 border-l-4 border-secondary rounded-r-2xl">
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full border border-secondary/40 overflow-hidden bg-surface-container flex-none">
                    <Image src="/agent.png" alt="Vera" width={40} height={40} className="object-cover scale-150" />
                  </div>
                  <p className="text-sm italic text-secondary-fixed-dim/80 font-inter leading-snug">
                    "Votre routeur Zain affiche une LED rouge ? Pointez votre cam├®ra vers les c├óbles. Je vais synchroniser votre Monolith box instantan├®ment."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeUpScroll} className="flex-1 w-full relative min-h-[280px] md:min-h-[500px] h-[320px] md:h-[600px] lg:h-[700px] rounded-2xl md:rounded-[4rem] overflow-hidden border border-secondary/20 shadow-[0_20px_80px_rgba(0,0,0,0.4)] flex items-center justify-center bg-surface-container-low">
              {/* Translucent Glass Image Mask overlay */}
              <div className="absolute inset-0 z-30 bg-gradient-to-tr from-background/90 via-transparent to-black/10 mix-blend-overlay"></div>

              {/* THE SCANNING HARDWARE (TELECOM BOX) */}
              <div className="absolute inset-0 z-10 transition-transform duration-1000 group-hover:scale-105">
                <Image
                  src="/telecom.png"
                  alt="Vera AI Telecom Hardware"
                  fill
                  className="object-cover opacity-80"
                />
                {/* Glowing Neural Overlays */}
                <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-[#FF7900]/20 blur-[60px] animate-pulse" />
                <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-secondary/20 blur-[80px] animate-pulse" style={{ animationDelay: '1s' }} />
              </div>

              {/* INTERACTIVE SCANNING LINE EFFECT */}
              <motion.div
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-secondary to-transparent z-40 opacity-50 shadow-[0_0_20px_var(--color-secondary)]"
              />

              {/* REAL-TIME DIAGNOSTIC POPUPS */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute top-4 md:top-12 right-4 md:right-12 z-50 bg-black/60 backdrop-blur-3xl border border-secondary/30 p-3 md:p-6 rounded-2xl md:rounded-3xl shadow-2xl max-w-[180px] md:max-w-[280px]">
                <p className="text-[10px] font-mono text-secondary mb-2 animate-pulse font-black uppercase">Analyse de Flux Orange.sa</p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-outline-variant">Signal:</span>
                    <span className="text-white font-mono">98% OPTIME</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-outline-variant">Hardware:</span>
                    <span className="text-white font-mono text-error">CAB_ERR_04</span>
                  </div>
                  <div className="h-1 bg-surface-container-highest rounded-full overflow-hidden mt-2">
                    <motion.div
                      animate={{ width: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="h-full bg-secondary"
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute bottom-4 md:bottom-12 left-4 md:left-12 z-50 bg-[#FF7900]/90 backdrop-blur-xl border border-white/20 px-4 md:px-8 py-3 md:py-5 rounded-full shadow-[0_20px_50px_rgba(255,121,0,0.3)] flex items-center gap-2 md:gap-4"
              >
                <i className="pi pi-shield text-sm md:text-xl text-white" />
                <p className="text-[10px] md:text-xs font-manrope font-black text-white uppercase tracking-widest">Guide Activ├®</p>
              </motion.div>
            </motion.div>
          </div>

        </motion.div>
      </section>

      {/* 5. FINAL CTA (SCROLL ANIMATED) */}
      <section className="py-16 md:py-40 px-5 sm:px-8 lg:px-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUpScroll}
          className="max-w-7xl mx-auto bg-gradient-to-r from-surface-container-high to-surface-container border-2 border-primary/30 rounded-2xl md:rounded-[4rem] p-8 md:p-16 lg:p-24 text-center relative overflow-hidden shadow-[0_0_60px_rgba(0,229,255,0.1)]"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--color-primary-container)_0%,_transparent_50%)] opacity-20"
          />

          <h2 className="text-3xl md:text-5xl lg:text-7xl font-manrope font-black text-white mb-4 md:mb-8 relative z-10 drop-shadow-lg">Are you ready to initialize?</h2>
          <p className="text-sm md:text-xl lg:text-2xl text-on-surface-variant font-inter max-w-3xl mx-auto mb-8 md:mb-16 relative z-10 font-light leading-relaxed">
            Join tier-1 organizations streamlining their infrastructure with Vera's intelligent routing. Deploy the Monolith structure to your private cloud today.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 md:gap-8 relative z-10">
            <Link href="/contact">
              <button className="bg-primary text-background px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold font-inter transform transition-all shadow-[0_0_40px_rgba(0,229,255,0.4)] hover:shadow-[0_0_80px_rgba(0,229,255,0.8)] hover:-translate-y-2 flex items-center justify-center gap-3 md:gap-4 w-full sm:w-auto uppercase tracking-widest text-sm md:text-base">
                Initialize Contact <i className="pi pi-send" />
              </button>
            </Link>
            <Link href="/pricing">
              <button className="bg-transparent border-2 border-outline-variant hover:border-primary/60 text-white px-8 md:px-12 py-4 md:py-6 rounded-xl md:rounded-2xl font-bold font-inter transition-all hover:bg-surface-container w-full sm:w-auto uppercase tracking-widest text-sm md:text-base text-center hover:-translate-y-2">
                View Licensing
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
