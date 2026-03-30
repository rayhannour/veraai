"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';

export function VeraNavbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    // Watch auth state with loading indicator
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
      className="fixed top-0 left-0 right-0 z-[100] px-8 py-4 bg-background/60 backdrop-blur-2xl border-b border-outline-variant/20 flex justify-between items-center"
    >
      <Link href="/" className="flex items-center gap-4 group">
        <motion.div
          animate={{
            borderColor: [
              "rgba(0,229,255,0.3)",
              "rgba(0,229,255,1)",
              "rgba(0,229,255,0.3)",
            ],
            boxShadow: [
              "0 0 10px rgba(0,229,255,0.2)",
              "0 0 25px rgba(0,229,255,0.6)",
              "0 0 10px rgba(0,229,255,0.2)",
            ]
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatDelay: 1,
            times: [0, 0.1, 0.2, 0.3, 1]
          }}
          className="w-10 h-10 border-t-2 border-r-2 rounded-tr-2xl rounded-bl-2xl flex items-center justify-center relative transition-all"
        >
          <div className="absolute w-2 h-2 bg-primary blur-[2px] rounded-full animate-pulse-glow" />
        </motion.div>
        <span className="text-xl font-manrope font-bold tracking-widest uppercase text-on-surface">Vera</span>
      </Link>

      <div className="hidden md:flex gap-4 text-xs font-mono tracking-widest uppercase items-center">
        {[
          { name: 'Home', path: '/', color: '#00e5ff' },    // Cyan Tech
          { name: 'Features', path: '/features', color: '#00ffaa' }, // Kinetic Green
          { name: 'Pricing', path: '/pricing', color: '#FF7900' }, // Telecom Orange
          { name: 'Contact', path: '/contact', color: '#ff3366' }, // Alert Pink
        ].map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="relative group px-5 py-3 rounded-xl transition-all">
              {/* THE CONTOUR LAMP (BOUBOU STYLE) */}
              <motion.div
                whileHover={{ opacity: 1, scale: 1.05 }}
                initial={{ opacity: 0 }}
                className="absolute inset-0 border-2 rounded-xl transition-all duration-300 pointer-events-none z-0"
                style={{
                  borderColor: item.color,
                  boxShadow: `0 0 20px ${item.color}44, inset 0 0 10px ${item.color}22`
                }}
              />

              <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-on-surface-variant group-hover:text-white font-black'}`}>
                {item.name}
              </span>

              {/* SMARTPHONE LAMP EFFECT (UNDERGLOW) */}
              <div
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[4px] blur-[6px] group-hover:w-[80%] transition-all duration-500 rounded-full"
                style={{ backgroundColor: item.color, boxShadow: `0 0 25px ${item.color}` }}
              />

              {isActive && (
                <motion.div
                  layoutId="activeGlowUnder"
                  className="absolute inset-0 bg-white/5 rounded-xl border-b-2"
                  style={{ borderColor: item.color }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {authLoading ? (
        <div className="w-32 h-10 bg-white/5 rounded-full animate-pulse border border-white/10" />
      ) : !user ? (
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-surface-container-high border border-outline-variant hover:bg-surface-container-highest hover:border-primary-container px-6 py-2 rounded-full text-xs font-mono tracking-widest text-primary flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
          >
            SECURE PORTAL <i className="pi pi-lock"></i>
          </motion.button>
        </Link>
      ) : (
        <Link href="/dashboard/ai-hub">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary/10 border-2 border-primary hover:bg-primary/20 px-6 h-11 rounded-full text-[10px] font-mono tracking-[0.3em] text-primary flex items-center gap-2 group relative overflow-visible"
            style={{ boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)' }}
          >
            {/* UNDERGLOW FOR CMD CENTER */}
            <div
              className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-[3px] blur-[4px] rounded-full bg-primary shadow-[0_0_20px_#00e5ff]"
            />
            CMD CENTER <i className="pi pi-external-link group-hover:translate-x-1 transition-transform"></i>
          </motion.button>
        </Link>
      )}
    </motion.nav>
  );
}
