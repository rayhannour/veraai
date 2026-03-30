"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useState, useEffect } from 'react';

const menuItems = [
  { name: 'Energy Intelligence', icon: 'pi-bolt', path: '/dashboard/energy' },
  { name: 'Connect & Telecom', icon: 'pi-wifi', path: '/dashboard/connect' },
  { name: 'AI Mailbox', icon: 'pi-envelope', path: '/dashboard/mailbox' },
  { name: 'Smart Vue Hub', icon: 'pi-th-large', path: '/dashboard/smart-vue' },
  { name: 'AI Avatar Live', icon: 'pi-video', path: '/dashboard/ai-hub' },
  { name: 'System Parameters', icon: 'pi-cog', path: '/dashboard/settings' },
];

export function VeraSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    // Neural Shutdown: Sign out from Firebase
    try {
      await signOut(auth);
      // Return to the Marketing Home
      router.push('/');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <aside className="w-72 h-screen fixed left-0 top-0 bg-surface-container-low/40 backdrop-blur-3xl border-r border-outline-variant/20 flex flex-col z-50">
      {/* Sidebar Header */}
      <div className="p-8 flex items-center gap-4">
        <Link href="/" className="flex items-center gap-4">
          <div className="w-10 h-10 border-t-2 border-r-2 border-primary-container rounded-tr-xl rounded-bl-xl flex items-center justify-center relative shadow-[0_0_15px_rgba(0,229,255,0.4)]">
            <div className="w-2 h-2 bg-primary blur-[1px] rounded-full animate-pulse" />
          </div>
          <span className="text-xl font-manrope font-bold tracking-widest uppercase text-white">Vera</span>
        </Link>
      </div>

      {/* Navigation Groups */}
      <nav className="flex-1 px-4 py-4 flex flex-col gap-2">
        <p className="px-4 text-[10px] font-mono tracking-[0.2em] text-outline-variant uppercase mb-4 opacity-50">Neural Navigation</p>

        {menuItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path}>
              <motion.div
                whileHover={{ x: 5, backgroundColor: 'rgba(0, 229, 255, 0.05)' }}
                className={`flex items-center gap-4 px-4 py-4 rounded-xl transition-all cursor-pointer relative group ${isActive ? 'bg-primary/10 border-l-4 border-primary' : 'hover:bg-surface-container-highest/20'
                  }`}
              >
                <i className={`pi ${item.icon} text-lg ${isActive ? 'text-primary' : 'text-on-surface-variant group-hover:text-primary'}`}></i>
                <span className={`text-sm font-inter font-medium tracking-wide ${isActive ? 'text-white' : 'text-on-surface-variant group-hover:text-white'}`}>
                  {item.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-primary/5 blur-xl rounded-xl"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </nav>

      {/* User / Agent Identity Card */}
      <div className="p-6 mt-auto border-t border-outline-variant/10">
        <div className="bg-surface-container-high/40 p-4 rounded-2xl flex items-center gap-4 border border-outline-variant/10 relative group overflow-hidden">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-surface-dim border border-primary/30 flex items-center justify-center text-primary overflow-hidden shadow-[0_0_15px_rgba(0,229,255,0.3)]">
              {user?.photoURL ? (
                <img src={user.photoURL} alt="User" className="w-full h-full object-cover" />
              ) : (
                <div className="text-[10px] font-black font-manrope">
                  {user?.displayName ? user.displayName[0] : 'V'}
                </div>
              )}
            </div>
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-surface shadow-[0_0_10px_rgba(0,229,255,1)] z-10" />
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-[9px] font-mono text-primary leading-none mb-1 tracking-widest uppercase truncate">
              {user ? 'OPERATOR ACTIVE' : 'SYSTEM STANDBY'}
            </p>
            <div className="flex items-center justify-between gap-1">
              <p className="text-sm font-manrope font-extrabold text-white tracking-tight truncate">
                {user?.displayName || 'Neural Operator'}
              </p>
              {/* COMPACT LOGOUT BUTTON */}
              <motion.button
                whileHover={{ scale: 1.1, backgroundColor: 'rgba(255, 51, 102, 0.2)' }}
                onClick={handleLogout}
                className="w-6 h-6 rounded-lg bg-error/5 border border-error/20 flex items-center justify-center text-error transition-all group/logout shadow-lg flex-shrink-0"
                title="Disconnect"
              >
                <i className="pi pi-power-off text-[8px] group-hover/logout:rotate-90 transition-transform"></i>
              </motion.button>
            </div>
            {/* NEURAL ENERGY PARAMETER */}
            <div className="flex flex-col gap-1 mt-1.5">
               <div className="flex justify-between items-center px-0.5">
                  <span className="text-[6px] font-mono text-primary/60 uppercase tracking-widest">Neural_Stable</span>
                  <span className="text-[6px] font-mono text-primary/80 uppercase">98%</span>
               </div>
               <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '98%' }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary/40 to-primary shadow-[0_0_8px_#00e5ff]"
                  />
               </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
