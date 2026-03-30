"use client";
import React from 'react';
import { VeraSidebar } from '@/components/VeraSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isGate = pathname === '/dashboard/gate';

  if (isGate) {
    return (
      <div className="bg-background min-h-screen relative overflow-hidden font-inter">
        {children}
      </div>
    );
  }

  return (
    <div className="flex bg-background min-h-screen relative overflow-hidden font-inter">
      {/* Background AI Presence */}
      <div className="fixed inset-0 pointer-events-none z-[1] select-none">
        <img
          src="/agent.png"
          alt="Vera AI Background"
          className="w-full h-full object-cover opacity-[0.06] mix-blend-screen scale-110 blur-[2px]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-transparent to-background/20" />
      </div>

      {/* Sidebar */}
      <VeraSidebar />

      {/* Main Content Area — responsive margin */}
      <main className="flex-1 md:ml-72 p-4 sm:p-6 md:p-10 lg:p-12 relative z-10 flex flex-col min-h-screen pt-16 md:pt-10">
        {/* Dashboard Header Bar */}
        <header className="flex flex-wrap justify-between items-center mb-6 md:mb-12 border-b border-outline-variant/10 pb-4 md:pb-8 gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono tracking-widest text-primary-fixed-dim uppercase">Secure Domain: 192.168.1.1</span>
            <h1 className="text-xl md:text-3xl font-manrope font-bold text-white tracking-tight uppercase">
              {pathname.split('/').pop()?.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-[10px] font-mono text-outline-variant tracking-widest uppercase mb-1">Compute Load</span>
              <div className="w-24 md:w-32 h-1 bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary-container w-[65%]" />
              </div>
            </div>
            <div className="w-10 h-10 md:w-12 md:h-12 bg-surface-container-high rounded-full border border-outline-variant/30 flex items-center justify-center text-primary cursor-pointer hover:border-primary transition-all shadow-[0_0_20px_rgba(0,0,0,0.4)] relative">
              <i className="pi pi-bell text-base md:text-xl animate-pulse" />
              <span className="absolute top-1 right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-error rounded-full border-2 border-surface" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
