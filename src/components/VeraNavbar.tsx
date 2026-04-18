"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const navLinks = [
  { name: 'Home', path: '/', color: '#00e5ff' },
  { name: 'Features', path: '/features', color: '#00ffaa' },
  { name: 'Pricing', path: '/pricing', color: '#FF7900' },
  { name: 'Avatar', path: '/avatar', color: '#b300ff' },
  { name: 'Contact', path: '/contact', color: '#ff3366' },
];

export function VeraNavbar() {
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Close on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
        className="fixed top-0 left-0 right-0 z-[100] px-4 sm:px-8 py-4 bg-background/60 backdrop-blur-2xl border-b border-outline-variant/20 flex justify-between items-center"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 md:gap-4 group">
          <motion.div
            animate={{
              borderColor: ["rgba(0,229,255,0.3)", "rgba(0,229,255,1)", "rgba(0,229,255,0.3)"],
              boxShadow: ["0 0 10px rgba(0,229,255,0.2)", "0 0 25px rgba(0,229,255,0.6)", "0 0 10px rgba(0,229,255,0.2)"],
            }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
            className="w-9 h-9 md:w-10 md:h-10 border-t-2 border-r-2 rounded-tr-2xl rounded-bl-2xl flex items-center justify-center relative transition-all"
          >
            <div className="absolute w-2 h-2 bg-primary blur-[2px] rounded-full animate-pulse-glow" />
          </motion.div>
          <span className="text-lg md:text-xl font-manrope font-bold tracking-widest uppercase text-on-surface">Vera</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex gap-4 text-xs font-mono tracking-widest uppercase items-center">
          {navLinks.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link key={item.path} href={item.path} className="relative group px-5 py-3 rounded-xl transition-all">
                <motion.div
                  whileHover={{ opacity: 1, scale: 1.05 }}
                  initial={{ opacity: 0 }}
                  className="absolute inset-0 border-2 rounded-xl transition-all duration-300 pointer-events-none z-0"
                  style={{ borderColor: item.color, boxShadow: `0 0 20px ${item.color}44, inset 0 0 10px ${item.color}22` }}
                />
                <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-on-surface-variant group-hover:text-white font-black'}`}>
                  {item.name}
                </span>
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

        {/* Right side: auth button + hamburger */}
        <div className="flex items-center gap-3">
          {/* Auth button */}
          {authLoading ? (
            <div className="w-24 h-9 bg-white/5 rounded-full animate-pulse border border-white/10" />
          ) : !user ? (
            <Link href="/login">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-surface-container-high border border-outline-variant hover:bg-surface-container-highest hover:border-primary-container px-4 md:px-6 py-2 rounded-full text-xs font-mono tracking-widest text-primary flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.1)]"
              >
                <span className="hidden sm:inline">SECURE PORTAL</span>
                <i className="pi pi-lock" />
              </motion.button>
            </Link>
          ) : (
            <Link href="/dashboard/ai-hub">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-primary/10 border-2 border-primary hover:bg-primary/20 px-4 md:px-6 h-9 md:h-11 rounded-full text-[10px] font-mono tracking-[0.3em] text-primary flex items-center gap-2 group relative overflow-visible"
                style={{ boxShadow: '0 0 15px rgba(0, 229, 255, 0.2)' }}
              >
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[60%] h-[3px] blur-[4px] rounded-full bg-primary shadow-[0_0_20px_#00e5ff]" />
                <span className="hidden sm:inline">CMD CENTER</span>
                <i className="pi pi-external-link group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          )}

          {/* Mobile hamburger */}
          <button
            className="md:hidden w-9 h-9 bg-surface-container-high/60 border border-outline-variant/20 rounded-xl flex items-center justify-center text-primary"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <i className={`pi ${mobileOpen ? 'pi-times' : 'pi-bars'} text-sm`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/60 z-[98]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="md:hidden fixed top-[68px] left-4 right-4 z-[99] bg-surface-container-high/95 backdrop-blur-2xl border border-outline-variant/30 rounded-2xl p-4 flex flex-col gap-2 shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
            >
              {navLinks.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link key={item.path} href={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs tracking-widest uppercase transition-all ${isActive ? 'bg-primary/10 text-primary border border-primary/30' : 'text-on-surface-variant hover:text-white hover:bg-white/5'
                      }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.color, boxShadow: `0 0 8px ${item.color}` }} />
                    {item.name}
                  </Link>
                );
              })}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
