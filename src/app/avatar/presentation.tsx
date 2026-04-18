"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// ─── TYPES ──────────────────────────────────────────────────────────────────

interface StatData {
  type: 'donut' | 'bar' | 'pulse';
  value?: number;
  values?: number[];
  label: string;
  color: string;
  max?: number;
  unit?: string;
}

interface Point {
  id: string;
  label: string;
  detail: string;
  script: string;
  stats?: StatData;
  icon: string;
  accentColor: string;
}

interface Slide {
  id: string;
  title: string;
  subtitle: string;
  chapter: string;
  introScript: string;
  points: Point[];
  gradient: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────

export const PRESENTATION_SLIDES: Slide[] = [
  {
    id: "intro",
    title: "Project Vera",
    subtitle: "The Kinetic Intelligence",
    chapter: "SEQUENCE // 01",
    gradient: "from-[#00e5ff]/10 via-transparent to-[#7000ff]/5",
    introScript: "Welcome to Project Vera. I am a kinetic intelligence, built to be your digital command center.",
    points: [
      {
        id: "p1",
        label: "Autonomous AI Interface",
        detail: "Fully self-directed neural processing — no manual input required.",
        script: "I am a fully autonomous AI interface, designed to operate without manual intervention.",
        icon: "pi-microchip",
        accentColor: "#00e5ff",
        stats: { type: 'donut', value: 95, label: "Autonomy", color: "#00e5ff", unit: "%" }
      },
      {
        id: "p2",
        label: "Dynamic Streaming Core",
        detail: "High-throughput data pipelines with sub-millisecond sync latency.",
        script: "My core is built on high-performance streaming technology for zero-latency interactions.",
        icon: "pi-wave-pulse",
        accentColor: "#ff00ff",
        stats: { type: 'bar', values: [40, 60, 85, 95], label: "Latency_ms", color: "#ff00ff" }
      },
      {
        id: "p3",
        label: "Unified Command Center",
        detail: "Cross-platform system integration with real-time telemetry feeds.",
        script: "I integrate directly with your systems to serve as a unified command center for all your data.",
        icon: "pi-sliders-h",
        accentColor: "#00ffaa",
        stats: { type: 'pulse', value: 99.7, label: "Uptime", color: "#00ffaa", unit: "%" }
      }
    ]
  },
  {
    id: "tech",
    title: "Core Infrastructure",
    subtitle: "Quantum Encrypted Telemetry",
    chapter: "SEQUENCE // 02",
    gradient: "from-[#00ffaa]/10 via-transparent to-[#00e5ff]/5",
    introScript: "My core infrastructure is powered by a secure global grid. Security is at the heart of everything I do.",
    points: [
      {
        id: "p4",
        label: "Military-Grade Encryption",
        detail: "Every byte sealed with AES-256 quantum-resistant ciphers.",
        script: "Every byte of data sent through my neural link is protected by military-grade encryption.",
        icon: "pi-shield",
        accentColor: "#00ffaa",
        stats: { type: 'donut', value: 100, label: "Security", color: "#00ffaa", unit: "%" }
      },
      {
        id: "p5",
        label: "Neural Link Privacy",
        detail: "Isolated session sandboxes per user — zero data leakage.",
        script: "I maintain a secure, private session for every authorized user, ensuring total privacy.",
        icon: "pi-lock",
        accentColor: "#00e5ff",
        stats: { type: 'pulse', value: 0, label: "Breaches", color: "#00e5ff", unit: "" }
      },
      {
        id: "p6",
        label: "Global Edge Compute",
        detail: "Distributed across 47 edge nodes spanning 6 continents.",
        script: "I run across a global network of edge servers to provide the fastest response times possible.",
        icon: "pi-globe",
        accentColor: "#ffcc00",
        stats: { type: 'bar', values: [90, 95, 98, 99], label: "Edge_Uptime", color: "#ffcc00" }
      }
    ]
  },
  {
    id: "impact",
    title: "Strategic Impact",
    subtitle: "Real-time Tactical Decisions",
    chapter: "SEQUENCE // 03",
    gradient: "from-[#ff3366]/10 via-transparent to-[#ff00ff]/5",
    introScript: "By mapping vast arrays of data into coherent intelligence, I enable you to make immediate, tactical decisions.",
    points: [
      {
        id: "p7",
        label: "Tactical Visualization",
        detail: "Complex datasets rendered as clear, actionable visual intelligence.",
        script: "I turn complex datasets into clear, actionable visual representations in real-time.",
        icon: "pi-chart-bar",
        accentColor: "#00e5ff",
        stats: { type: 'bar', values: [30, 45, 75, 90], label: "Decision_IQ", color: "#00e5ff" }
      },
      {
        id: "p8",
        label: "Neural Logic Execution",
        detail: "Surgical-precision command routing across your operational stack.",
        script: "I don't just analyze; I execute commands with surgical precision across your operational stack.",
        icon: "pi-bolt",
        accentColor: "#ff00ff",
        stats: { type: 'pulse', value: 1.2, label: "Exec_ms", color: "#ff00ff", unit: "ms" }
      },
      {
        id: "p9",
        label: "Efficiency Surge",
        detail: "Average 420% operational uplift measured across all deployments.",
        script: "On average, my deployment increases operational efficiency by over four hundred percent.",
        icon: "pi-arrow-up-right",
        accentColor: "#ff3366",
        stats: { type: 'donut', value: 420, label: "ROI_Boost", color: "#ff3366", max: 500, unit: "%" }
      }
    ]
  },
  {
    id: "sesp",
    title: "SESP Process",
    subtitle: "Service Energie Solution Pipeline",
    chapter: "SEQUENCE // 04",
    gradient: "from-[#f59e0b]/10 via-transparent to-[#ff3366]/5",
    introScript: "Let me walk you through the complete SESP process — from first contact to full activation, each step is handled with precision and speed.",
    points: [
      {
        id: "s1",
        label: "Initial Contact",
        detail: "Neural scan of client profile — needs captured in under 30 seconds.",
        script: "The process begins with initial contact. I capture the client's full energy profile through voice or text in under thirty seconds.",
        icon: "pi-phone",
        accentColor: "#f59e0b",
        stats: { type: 'pulse', value: 28, label: "Contact_s", color: "#f59e0b", unit: "s" }
      },
      {
        id: "s2",
        label: "Data Analysis",
        detail: "AI scans prior invoices and consumption history in 0.4 seconds.",
        script: "Next, I perform a deep data analysis — scanning invoices, consumption patterns, and market rates in under half a second.",
        icon: "pi-chart-line",
        accentColor: "#00e5ff",
        stats: { type: 'donut', value: 98, label: "Accuracy", color: "#00e5ff", unit: "%" }
      },
      {
        id: "s3",
        label: "Tailored Proposal",
        detail: "Personalized offer generated — exclusive discounts applied automatically.",
        script: "Based on the analysis, I generate a tailored energy proposal with exclusive discounts, matched precisely to the client's profile.",
        icon: "pi-file-edit",
        accentColor: "#a855f7",
        stats: { type: 'bar', values: [20, 45, 78, 95], label: "Match_Score", color: "#a855f7" }
      },
      {
        id: "s4",
        label: "Contract & Activation",
        detail: "Digital signature + full service activation — complete in under 2 minutes.",
        script: "Finally, the client signs digitally and the contract is activated — the entire process, from contact to activation, completed in under two minutes.",
        icon: "pi-verified",
        accentColor: "#00ffaa",
        stats: { type: 'donut', value: 2, label: "Total_min", color: "#00ffaa", max: 5, unit: "m" }
      }
    ]
  }
];

const OUTRO_SLIDE = {
  title: "Transmission Complete",
  subtitle: "End of Neural Protocol",
  script: "Thank you for your attention. I hope this presentation provided clear insight into my capabilities. I am now standing by for further instructions.",
  content: "Neural link session standby. Thank you for your time."
};

// ─── MINI-CHARTS ─────────────────────────────────────────────────────────────

const DonutChart = ({ value, color, max = 100, unit = "%" }: { value: number; color: string; max?: number; unit?: string }) => {
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(value / (max || 100), 1);
  const offset = circumference - pct * circumference;

  return (
    <div className="relative w-24 h-24 flex items-center justify-center">
      <svg className="w-full h-full" style={{ transform: 'rotate(-90deg)' }} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} stroke="rgba(255,255,255,0.07)" strokeWidth="8" fill="transparent" />
        <motion.circle
          cx="50" cy="50" r={radius}
          stroke={color} strokeWidth="8" fill="transparent"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.8, ease: "circOut" }}
          strokeLinecap="round"
          style={{ filter: `drop-shadow(0 0 8px ${color})` }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm font-black text-white leading-none"
          style={{ textShadow: `0 0 12px ${color}` }}
        >
          {value}{unit}
        </motion.span>
      </div>
    </div>
  );
};

const BarChart = ({ values, color }: { values: number[]; color: string }) => (
  <div className="flex items-end gap-1 h-16">
    {values.map((v, i) => (
      <div key={i} className="flex-1 flex flex-col items-center gap-1 h-full">
        <div className="w-full flex-1 relative overflow-hidden rounded-t-sm" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: `${v}%` }}
            transition={{ duration: 1, delay: i * 0.12, ease: "easeOut" }}
            className="absolute bottom-0 left-0 right-0 rounded-t-sm"
            style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}88` }}
          />
        </div>
        <span className="text-[8px] font-mono opacity-30 text-white">{v}</span>
      </div>
    ))}
  </div>
);

const PulseMetric = ({ value, color, unit = "" }: { value: number; color: string; unit?: string }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-24 h-24 flex items-center justify-center">
      {[0, 1, 2].map(i => (
        <motion.div
          key={i}
          className="absolute w-full h-full rounded-full border"
          style={{ borderColor: color }}
          animate={{ scale: [1, 1.8 + i * 0.3], opacity: [0.6, 0] }}
          transition={{ duration: 2, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
        />
      ))}
      <motion.div
        className="w-10 h-10 rounded-full flex items-center justify-center"
        style={{ backgroundColor: `${color}22`, boxShadow: `0 0 20px ${color}88`, border: `2px solid ${color}` }}
        animate={{ boxShadow: [`0 0 20px ${color}44`, `0 0 40px ${color}88`, `0 0 20px ${color}44`] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-xs font-black"
          style={{ color }}
        >
          {value}{unit}
        </motion.span>
      </motion.div>
    </div>
  </div>
);

// ─── PROGRESS TIMELINE ────────────────────────────────────────────────────────

const ProgressTimeline = ({
  slides, currentSlide, currentPoint, isOutro
}: {
  slides: Slide[];
  currentSlide: number;
  currentPoint: number;
  isOutro: boolean;
}) => {
  const total = slides.reduce((a, s) => a + s.points.length, 0) + slides.length;
  let done = 0;
  for (let s = 0; s < currentSlide; s++) done += 1 + slides[s].points.length;
  done += 1 + Math.max(0, currentPoint + 1);
  const pct = isOutro ? 100 : Math.round((done / total) * 100);

  return (
    <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col items-center gap-4 z-50 hidden lg:flex">
      <div className="h-48 w-0.5 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-primary to-secondary rounded-full"
          style={{ boxShadow: '0 0 10px #00e5ff' }}
          animate={{ height: `${pct}%` }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        />
      </div>
      <span className="text-[8px] font-mono text-white/30 rotate-90 tracking-widest">{pct}%</span>
      <div className="flex flex-col items-center gap-3">
        {slides.map((s, i) => (
          <motion.div
            key={s.id}
            className="w-2 h-2 rounded-full border"
            animate={{
              borderColor: i < currentSlide ? '#00e5ff' : i === currentSlide ? '#fff' : 'rgba(255,255,255,0.1)',
              backgroundColor: i < currentSlide ? '#00e5ff' : i === currentSlide ? 'rgba(255,255,255,0.3)' : 'transparent',
              scale: i === currentSlide ? 1.5 : 1,
            }}
            transition={{ duration: 0.4 }}
          />
        ))}
        <motion.div
          className="w-2 h-2 rounded-full border"
          animate={{
            borderColor: isOutro ? '#00e5ff' : 'rgba(255,255,255,0.1)',
            backgroundColor: isOutro ? '#00e5ff' : 'transparent',
          }}
        />
      </div>
    </div>
  );
};

// ─── STAT HUD CARD ────────────────────────────────────────────────────────────

const StatHudCard = ({ point }: { point: Point }) => {
  const { stats } = point;
  if (!stats) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-3xl border p-6"
      style={{
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(30px)',
        borderColor: `${stats.color}44`,
        boxShadow: `0 0 60px ${stats.color}22, inset 0 0 30px ${stats.color}08`,
        minWidth: 240,
      }}
    >
      {/* Glow corner */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-20" style={{ background: `radial-gradient(circle, ${stats.color}, transparent 70%)` }} />

      <div className="flex items-center justify-between mb-5">
        <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-white/30">Telemetry_v1</span>
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: stats.color, boxShadow: `0 0 8px ${stats.color}` }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
      </div>

      <div className="flex items-center gap-5">
        {stats.type === 'donut' && <DonutChart value={stats.value ?? 0} color={stats.color} max={stats.max} unit={stats.unit} />}
        {stats.type === 'bar' && (
          <div className="w-32">
            <BarChart values={stats.values ?? []} color={stats.color} />
          </div>
        )}
        {stats.type === 'pulse' && <PulseMetric value={stats.value ?? 0} color={stats.color} unit={stats.unit} />}

        <div className="flex flex-col gap-1">
          <span className="text-[8px] font-mono text-white/25 uppercase tracking-widest">Neural_Metric</span>
          <span className="text-lg font-black uppercase tracking-tight" style={{ color: stats.color, textShadow: `0 0 15px ${stats.color}88` }}>
            {stats.label}
          </span>
          <div className="h-px w-10 mt-1" style={{ background: `linear-gradient(to right, ${stats.color}, transparent)` }} />
          <span className="text-[9px] font-mono text-white/30 mt-1">{point.label}</span>
        </div>
      </div>
    </motion.div>
  );
};

// ─── POINT CARD ───────────────────────────────────────────────────────────────

const PointCard = ({ point, isCurrent, idx }: { point: Point; isCurrent: boolean; idx: number }) => (
  <motion.div
    layout
    key={point.id}
    initial={{ opacity: 0, y: 60, scale: 0.85 }}
    animate={{
      opacity: isCurrent ? 1 : Math.max(0, 0.35 - idx * 0.12),
      y: 0,
      scale: isCurrent ? 1 : 0.94 - idx * 0.03,
      filter: isCurrent ? 'blur(0px)' : `blur(${idx * 3}px)`,
      zIndex: isCurrent ? 10 : 10 - idx,
    }}
    exit={{ opacity: 0, y: -30, scale: 0.9 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    className="relative w-full rounded-[2.5rem] overflow-hidden"
    style={{
      background: isCurrent
        ? `linear-gradient(135deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))`
        : 'transparent',
      border: isCurrent ? `1px solid ${point.accentColor}44` : '1px solid rgba(255,255,255,0.04)',
      boxShadow: isCurrent ? `0 40px 80px rgba(0,0,0,0.7), 0 0 0 1px ${point.accentColor}22` : 'none',
    }}
  >
    {/* Shimmer sweep */}
    {isCurrent && (
      <motion.div
        className="absolute inset-y-0 w-1/2 skew-x-[-15deg] z-0 pointer-events-none"
        style={{ background: `linear-gradient(to right, transparent, ${point.accentColor}12, transparent)` }}
        initial={{ x: '-80%' }}
        animate={{ x: '280%' }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
      />
    )}

    <div className="relative z-10 flex items-center gap-6 p-6 lg:p-8">
      {/* Icon */}
      <motion.div
        className="shrink-0 w-16 h-16 rounded-2xl flex items-center justify-center"
        animate={{
          background: isCurrent ? `${point.accentColor}22` : 'rgba(255,255,255,0.03)',
          borderColor: isCurrent ? `${point.accentColor}88` : 'rgba(255,255,255,0.06)',
          boxShadow: isCurrent ? `0 0 30px ${point.accentColor}44` : 'none',
        }}
        style={{ border: '1px solid' }}
      >
        <i className={`pi ${point.icon} text-xl`} style={{ color: isCurrent ? point.accentColor : 'rgba(255,255,255,0.15)' }} />
      </motion.div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <AnimatePresence mode="wait">
          {isCurrent && (
            <motion.span
              key="label"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[9px] font-mono uppercase tracking-[0.5em] block mb-1"
              style={{ color: point.accentColor }}
            >
              ACTIVE_TELEMETRY
            </motion.span>
          )}
        </AnimatePresence>
        <h4
          className="text-xl lg:text-3xl font-black tracking-tight leading-tight"
          style={{
            color: isCurrent ? '#fff' : 'rgba(255,255,255,0.15)',
            textShadow: isCurrent ? `0 0 30px ${point.accentColor}44` : 'none',
          }}
        >
          {point.label}
        </h4>
        {isCurrent && (
          <motion.p
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm font-mono text-white/40 mt-1 leading-relaxed"
          >
            {point.detail}
          </motion.p>
        )}
      </div>

      {/* Live badge */}
      {isCurrent && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-full"
          style={{ background: `${point.accentColor}15`, border: `1px solid ${point.accentColor}44` }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ backgroundColor: point.accentColor }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-[8px] font-mono font-black uppercase tracking-widest" style={{ color: point.accentColor }}>
            LIVE
          </span>
        </motion.div>
      )}
    </div>
  </motion.div>
);

// ─── SLIDE HEADER ─────────────────────────────────────────────────────────────

const SlideHeader = ({ slide, slideIndex }: { slide: Slide; slideIndex: number }) => {
  const chars = slide.title.split('');
  return (
    <motion.div
      key={slide.id}
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="text-center mb-10 lg:mb-14"
    >
      <motion.span
        initial={{ opacity: 0, letterSpacing: '0.2em' }}
        animate={{ opacity: 1, letterSpacing: '0.6em' }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="text-[10px] font-mono font-black uppercase text-primary block mb-4"
      >
        {slide.chapter}
      </motion.span>
      <h2 className="text-2xl lg:text-4xl font-sans font-black uppercase tracking-tight leading-none mb-3 whitespace-nowrap overflow-hidden py-1">
        {chars.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block text-white"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.03, ease: [0.22, 1, 0.36, 1] }}
          >
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </h2>
      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 0.7 }}
        className="text-sm lg:text-base font-mono uppercase tracking-[0.4em] text-secondary"
      >
        {slide.subtitle}
      </motion.h3>
    </motion.div>
  );
};

// ─── BACKGROUND GRID ─────────────────────────────────────────────────────────

const BackgroundGrid = () => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Perspective grid */}
    <div
      className="absolute inset-0 opacity-[0.03]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0,229,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)
        `,
        backgroundSize: '48px 48px',
      }}
    />
    {/* Scanlines */}
    <div
      className="absolute inset-0 opacity-[0.015]"
      style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,255,0.5) 2px, rgba(0,229,255,0.5) 3px)',
      }}
    />
    {/* Gradient blobs */}
    <motion.div
      className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full opacity-10"
      style={{ background: 'radial-gradient(circle, #00e5ff, transparent 70%)' }}
      animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.15, 0.1] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    />
    <motion.div
      className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full opacity-8"
      style={{ background: 'radial-gradient(circle, #ff00ff, transparent 70%)' }}
      animate={{ scale: [1, 1.15, 1], opacity: [0.08, 0.12, 0.08] }}
      transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
    />
  </div>
);

// ─── OUTRO SCREEN ─────────────────────────────────────────────────────────────

const OutroScreen = () => (
  <motion.div
    key="outro"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="flex-1 flex items-center justify-center"
  >
    <div className="text-center flex flex-col items-center">
      {/* Expanding rings */}
      <div className="relative w-36 h-36 flex items-center justify-center mb-10">
        {[0, 1, 2, 3].map(i => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-primary/30"
            initial={{ width: 56, height: 56, opacity: 0 }}
            animate={{ width: 56 + i * 28, height: 56 + i * 28, opacity: [0, 0.5, 0] }}
            transition={{ duration: 3, delay: i * 0.6, repeat: Infinity, ease: 'easeOut' }}
          />
        ))}
        <motion.div
          className="w-14 h-14 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center"
          animate={{ boxShadow: ['0 0 20px #00e5ff44', '0 0 60px #00e5ff88', '0 0 20px #00e5ff44'] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <i className="pi pi-check text-2xl text-primary" />
        </motion.div>
      </div>

      <h2 className="text-3xl lg:text-5xl font-black uppercase tracking-tighter text-white mb-4 py-2 whitespace-nowrap">
        {OUTRO_SLIDE.title}
      </h2>
      <p className="text-base font-mono text-white/40 uppercase tracking-[0.5em] mb-8">
        {OUTRO_SLIDE.subtitle}
      </p>
      <div className="flex items-center gap-3 px-6 py-3 rounded-full border border-primary/20 bg-primary/5">
        <motion.div
          className="w-2 h-2 rounded-full bg-primary"
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
        <span className="text-[10px] font-mono text-primary uppercase tracking-widest">Standby // Awaiting Instructions</span>
      </div>
    </div>
  </motion.div>
);

// ─── CONTROL BAR ─────────────────────────────────────────────────────────────

const ControlBar = ({
  isAutoplaying, isOutroActive, onBack, onToggle, onAdvance
}: {
  isAutoplaying: boolean;
  isOutroActive: boolean;
  onBack: () => void;
  onToggle: () => void;
  onAdvance: () => void;
}) => (
  <div className="shrink-0 h-28 flex items-center justify-center relative z-40">
    <motion.div
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
      className="flex items-center gap-4 px-6 py-4 rounded-full border border-white/10"
      style={{
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(40px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      <motion.button
        whileHover={{ scale: 1.1, x: -3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onBack}
        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/30 hover:text-white transition-colors"
      >
        <i className="pi pi-chevron-left text-sm" />
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onToggle}
        className="h-14 px-10 rounded-full font-mono font-black uppercase tracking-[0.35em] text-[11px] flex items-center gap-3 border transition-all"
        style={isAutoplaying
          ? { background: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.5)', color: '#ef4444', boxShadow: '0 0 30px rgba(239,68,68,0.2)' }
          : { background: 'rgba(0,229,255,0.12)', borderColor: 'rgba(0,229,255,0.5)', color: '#00e5ff', boxShadow: '0 0 30px rgba(0,229,255,0.2)' }
        }
      >
        <motion.i
          className={`pi ${isAutoplaying ? 'pi-power-off' : 'pi-play'}`}
          animate={isAutoplaying ? { rotate: [0, 5, -5, 0] } : {}}
          transition={{ duration: 0.5, repeat: isAutoplaying ? Infinity : 0, repeatDelay: 2 }}
        />
        <span>{isAutoplaying ? 'Kill_Protocol' : (isOutroActive ? 'Restart' : 'Initiate')}</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.1, x: 3 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAdvance}
        className="w-12 h-12 rounded-full flex items-center justify-center border border-white/10 bg-white/5 text-white/30 hover:text-white transition-colors"
      >
        <i className="pi pi-chevron-right text-sm" />
      </motion.button>
    </motion.div>
  </div>
);

// ─── SPEECH TICKER ──────────────────────────────────────────────────────────

const SpeechTicker = ({ text, active }: { text: string; active: boolean }) => {
  const [displayed, setDisplayed] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    setDisplayed('');
    setWordIdx(0);
  }, [text]);

  useEffect(() => {
    if (!active || wordIdx >= words.length) return;
    const t = setTimeout(() => {
      setDisplayed(prev => (prev ? prev + ' ' : '') + words[wordIdx]);
      setWordIdx(i => i + 1);
    }, 95);
    return () => clearTimeout(t);
  }, [active, wordIdx, words]);

  return (
    <AnimatePresence>
      {active && text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 6 }}
          transition={{ duration: 0.35 }}
          className="relative overflow-hidden mx-4 mb-2 rounded-2xl border border-white/10 flex items-stretch"
          style={{
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(40px)',
            boxShadow: '0 0 0 1px rgba(0,229,255,0.08), 0 8px 32px rgba(0,0,0,0.6)',
          }}
        >
          {/* Animated scan line */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(0,229,255,0.04), transparent)' }}
            animate={{ x: ['-100%', '200%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.5 }}
          />

          {/* Left badge */}
          <div className="shrink-0 flex items-center gap-2.5 px-4 border-r border-white/10"
            style={{ background: 'rgba(0,229,255,0.07)' }}>
            <motion.div
              className="w-1.5 h-1.5 rounded-full bg-primary"
              style={{ boxShadow: '0 0 6px #00e5ff' }}
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 0.9, repeat: Infinity }}
            />
            <span className="text-[8px] font-mono font-black uppercase tracking-[0.4em] text-primary whitespace-nowrap">VERA LIVE</span>
          </div>

          {/* Scrolling text */}
          <div className="flex-1 overflow-hidden py-2.5 px-5 relative">
            <p className="text-[11px] font-mono text-white/70 leading-relaxed tracking-widest">
              {displayed}
              {wordIdx < words.length && (
                <motion.span
                  className="inline-block w-1 h-3 ml-1 align-middle bg-primary rounded-sm"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </p>
          </div>

          {/* Right chapter tag */}
          <div className="shrink-0 flex items-center px-4 border-l border-white/10">
            <span className="text-[7px] font-mono text-white/20 uppercase tracking-widest whitespace-nowrap">Neural_Speech</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── PROCESS GRAPH ───────────────────────────────────────────────────────────

const SESP_STEPS = [
  { label: "Contact",    icon: "pi-phone",      color: "#f59e0b" },
  { label: "Analyse",    icon: "pi-chart-line",  color: "#00e5ff" },
  { label: "Proposition",icon: "pi-file-edit",   color: "#a855f7" },
  { label: "Activation", icon: "pi-verified",    color: "#00ffaa" },
];

const ProcessGraph = ({ revealedCount }: { revealedCount: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="w-full mt-4 mb-2"
  >
    <div className="flex items-center justify-between px-2 relative">
      {SESP_STEPS.map((step, i) => {
        const active = i < revealedCount;
        const isCurrent = i === revealedCount - 1;
        return (
          <React.Fragment key={i}>
            {/* Node */}
            <div className="flex flex-col items-center gap-2 z-10">
              <motion.div
                animate={{
                  background: active ? `${step.color}22` : 'rgba(255,255,255,0.03)',
                  borderColor: active ? step.color : 'rgba(255,255,255,0.08)',
                  boxShadow: isCurrent ? `0 0 25px ${step.color}66` : active ? `0 0 10px ${step.color}33` : 'none',
                  scale: isCurrent ? 1.2 : 1,
                }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center border"
              >
                <i className={`pi ${step.icon} text-base`} style={{ color: active ? step.color : 'rgba(255,255,255,0.15)' }} />
              </motion.div>
              <motion.span
                animate={{ opacity: active ? 1 : 0.2, color: active ? step.color : '#fff' }}
                className="text-[8px] font-mono uppercase tracking-widest whitespace-nowrap"
              >
                {step.label}
              </motion.span>
              {/* Step number badge */}
              <motion.div
                animate={{
                  opacity: active ? 1 : 0.15,
                  backgroundColor: active ? step.color : 'transparent',
                }}
                className="w-4 h-4 rounded-full flex items-center justify-center"
              >
                <span className="text-[7px] font-black" style={{ color: active ? '#000' : 'rgba(255,255,255,0.3)' }}>{i + 1}</span>
              </motion.div>
            </div>

            {/* Connector line between nodes */}
            {i < SESP_STEPS.length - 1 && (
              <div className="flex-1 h-px mx-2 relative overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full"
                  animate={{ width: i < revealedCount - 1 ? '100%' : '0%' }}
                  transition={{ duration: 0.8, ease: 'easeInOut' }}
                  style={{ background: `linear-gradient(to right, ${step.color}, ${SESP_STEPS[i + 1].color})`, boxShadow: `0 0 8px ${step.color}` }}
                />
                {/* Animated pulse along active connector */}
                {i < revealedCount - 1 && (
                  <motion.div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: step.color, boxShadow: `0 0 10px ${step.color}` }}
                    animate={{ left: ['0%', '100%'], opacity: [0.8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                )}
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>

    {/* Completion banner */}
    {revealedCount >= SESP_STEPS.length && (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex items-center justify-center gap-3 px-6 py-3 rounded-2xl border border-[#00ffaa]/30 bg-[#00ffaa]/05"
      >
        <motion.div className="w-1.5 h-1.5 rounded-full bg-[#00ffaa]" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }} />
        <span className="text-[9px] font-mono uppercase tracking-widest text-[#00ffaa]">Pipeline_Complete // Avg. 1m 52s</span>
      </motion.div>
    )}
  </motion.div>
);

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

interface PresentationProps {
  onRepeatScript: (script: string) => void;
  onInitiate?: () => void;
}

export interface PresentationHandle {
  handleAvatarFinished: () => void;
}

const Presentation = React.forwardRef<PresentationHandle, PresentationProps>(({ onRepeatScript, onInitiate }, ref) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentPointIndex, setCurrentPointIndex] = useState(-1);
  const [isAutoplaying, setIsAutoplaying] = useState(false);
  const [isOutroActive, setIsOutroActive] = useState(false);
  const [speakingText, setSpeakingText] = useState('');

  // Intercept script to capture for ticker
  const handleRepeatScript = (script: string) => {
    setSpeakingText(script);
    onRepeatScript(script);
  };

  React.useImperativeHandle(ref, () => ({
    handleAvatarFinished: () => {
      if (isAutoplaying) handleAdvance();
    }
  }));

  const handleAdvance = () => {
    if (isOutroActive) { setIsAutoplaying(false); return; }
    const slide = PRESENTATION_SLIDES[currentSlideIndex];
    if (currentPointIndex < slide.points.length - 1) {
      setCurrentPointIndex(p => p + 1);
    } else if (currentSlideIndex < PRESENTATION_SLIDES.length - 1) {
      setCurrentSlideIndex(s => s + 1);
      setCurrentPointIndex(-1);
    } else {
      setIsOutroActive(true);
    }
  };

  const handleBack = () => {
    if (isOutroActive) {
      setIsOutroActive(false);
      setCurrentSlideIndex(PRESENTATION_SLIDES.length - 1);
      setCurrentPointIndex(PRESENTATION_SLIDES[PRESENTATION_SLIDES.length - 1].points.length - 1);
      return;
    }
    if (currentPointIndex > -1) {
      setCurrentPointIndex(p => p - 1);
    } else if (currentSlideIndex > 0) {
      const prev = currentSlideIndex - 1;
      setCurrentSlideIndex(prev);
      setCurrentPointIndex(PRESENTATION_SLIDES[prev].points.length - 1);
    }
  };

  const handleToggle = () => {
    if (isOutroActive) {
      setIsOutroActive(false);
      setCurrentSlideIndex(0);
      setCurrentPointIndex(-1);
    }
    // Trigger avatar session start on first Initiate click
    if (!isAutoplaying) {
      onInitiate?.();
    }
    setIsAutoplaying(v => !v);
  };

  useEffect(() => {
    if (!isAutoplaying) return;
    const script = isOutroActive
      ? OUTRO_SLIDE.script
      : currentPointIndex === -1
        ? PRESENTATION_SLIDES[currentSlideIndex].introScript
        : PRESENTATION_SLIDES[currentSlideIndex].points[currentPointIndex].script;
    const t = setTimeout(() => handleRepeatScript(script), 500);
    return () => clearTimeout(t);
  }, [currentSlideIndex, currentPointIndex, isAutoplaying, isOutroActive, onRepeatScript]);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];
  const activePoint = currentPointIndex > -1 ? currentSlide.points[currentPointIndex] : null;
  const revealedPoints = isOutroActive
    ? []
    : currentSlide.points.filter((_, i) => currentPointIndex >= i);
  const sortedPoints = [...revealedPoints].reverse();

  return (
    <div className="flex-1 w-full h-full flex flex-col relative overflow-hidden" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <BackgroundGrid />

      {/* Slide gradient wash */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          className={`absolute inset-0 pointer-events-none bg-gradient-to-br ${currentSlide.gradient} opacity-60`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
      </AnimatePresence>

      {/* Progress timeline (left edge) */}
      <ProgressTimeline
        slides={PRESENTATION_SLIDES}
        currentSlide={currentSlideIndex}
        currentPoint={currentPointIndex}
        isOutro={isOutroActive}
      />

      {/* Stat HUD — fixed bottom-right */}
      <div className="absolute bottom-52 right-6 lg:right-10 z-50 pointer-events-none">
        <AnimatePresence>
          {activePoint && activePoint.stats && (
            <StatHudCard key={activePoint.id} point={activePoint} />
          )}
        </AnimatePresence>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-start px-6 lg:px-20 pt-20 lg:pt-24 relative z-20 overflow-hidden">
        <div className="w-full max-w-3xl flex flex-col items-stretch">

          {/* Slide header */}
          <AnimatePresence mode="wait">
            {!isOutroActive ? (
              <SlideHeader key={currentSlide.id} slide={currentSlide} slideIndex={currentSlideIndex} />
            ) : (
              <OutroScreen key="outro" />
            )}
          </AnimatePresence>

          {/* Process Graph (only for SESP slide) */}
          {!isOutroActive && currentSlide.id === "sesp" && (
            <ProcessGraph revealedCount={currentPointIndex + 1} />
          )}

          {/* Points list */}
          {!isOutroActive && (
            <div className="flex flex-col gap-4 mt-2">
              <AnimatePresence mode="popLayout">
                {sortedPoints.map((point, idx) => (
                  <PointCard
                    key={`${currentSlideIndex}-${point.id}`}
                    point={point}
                    isCurrent={idx === 0}
                    idx={idx}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>

      {/* Speech ticker — above control bar */}
      <SpeechTicker text={speakingText} active={isAutoplaying} />

      {/* Control bar */}
      <ControlBar
        isAutoplaying={isAutoplaying}
        isOutroActive={isOutroActive}
        onBack={handleBack}
        onToggle={handleToggle}
        onAdvance={handleAdvance}
      />
    </div>
  );
});

Presentation.displayName = "Presentation";
export default Presentation;
