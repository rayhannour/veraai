"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VeraCard } from '@/components/VeraCard';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { signInWithPopup, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider, facebookProvider, githubProvider } from '@/lib/firebase';

export default function NeuralLogin() {
  const router = useRouter();
  const [errorToast, setErrorToast] = useState<{ summary: string; detail: string } | null>(null);
  const [scanning, setScanning] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const showError = (code: string, message: string) => {
    let detailMsg = message;
    if (code === 'auth/weak-password') detailMsg = "Le code d'accès est trop faible (minimum 6 caractères obligatoires).";
    if (code === 'auth/invalid-email') detailMsg = "Le format de l'ID d'accès (e-mail) est invalide.";
    if (code === 'auth/email-already-in-use') detailMsg = "Cette identité est déjà enregistrée dans le réseau.";
    if (code === 'auth/invalid-credential' || message === 'Mot de passe incorrect.') detailMsg = "Accès refusé. Identifiants neuronaux incorrects.";

    setErrorToast({ summary: 'SÉCURITÉ SYSTÈME', detail: detailMsg });
    setTimeout(() => setErrorToast(null), 5000);
  };
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    // Neural Check: Redirection automatique si déjà authentifié
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthenticated(true);
        setTimeout(() => {
          router.push('/dashboard/gate');
        }, 800);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSocialLogin = async (provider: any) => {
    setScanning(true);
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        setScanning(false);
        setAuthenticated(true);
        setTimeout(() => {
          router.push('/dashboard/gate');
        }, 1500);
      }
    } catch (error: any) {
      console.error("Login failed:", error);
      setScanning(false);
      showError(error.code, error.message);
    }
  };

  const handleBiometricLogin = () => {
    setScanning(true);
    // Simulate biometric scan delay for aesthetic purposes
    setTimeout(() => {
      setScanning(false);
      setAuthenticated(true);
      setTimeout(() => {
        router.push('/dashboard/gate');
      }, 1500);
    }, 3000);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setScanning(true);
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        try {
          await signInWithEmailAndPassword(auth, email, password);
        } catch (signInError: any) {
          if (
            signInError.code === 'auth/invalid-credential' ||
            signInError.code === 'auth/user-not-found' ||
            signInError.code === 'auth/wrong-password'
          ) {
            try {
              // Si la connexion échoue (ex: compte inexistant), on tente l'inscription automatique
              await createUserWithEmailAndPassword(auth, email, password);
            } catch (createError: any) {
              if (createError.code === 'auth/email-already-in-use') {
                // Le compte existe bien, l'erreur initiale était donc un mauvais mot de passe
                throw new Error("Mot de passe incorrect.");
              }
              throw createError; // Propager l'erreur de création d'authentification s'il y a lieu (ex: mot de passe trop court)
            }
          } else {
            throw signInError; // Propager les autres erreurs de connexion (comme operation-not-allowed)
          }
        }
      }
      setScanning(false);
      setAuthenticated(true);
      setTimeout(() => {
        router.push('/dashboard/gate');
      }, 1500);
    } catch (error: any) {
      console.error("Auth failed:", error);
      setScanning(false);
      showError(error.code || 'unknown', error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden items-center justify-center">

      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md z-50 px-4 pointer-events-none">
        <AnimatePresence>
          {errorToast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-surface-container-high/90 backdrop-blur-xl border border-error/50 text-on-surface shadow-[0_0_30px_rgba(255,180,171,0.15)] font-mono rounded-xl p-4 flex items-start gap-4 pointer-events-auto"
            >
              <i className="pi pi-exclamation-circle text-error text-2xl drop-shadow-[0_0_10px_rgba(255,180,171,0.8)] mt-1"></i>
              <div className="flex-1">
                <span className="tracking-[0.2em] uppercase text-xs font-bold text-error mb-1 block">{errorToast.summary}</span>
                <span className="text-xs text-on-surface-variant opacity-90">{errorToast.detail}</span>
              </div>
              <button type="button" onClick={() => setErrorToast(null)} className="text-on-surface-variant flex-shrink-0 hover:text-error transition-colors p-1">
                <i className="pi pi-times"></i>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Ambient background glows */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/10 blur-[120px] rounded-full pointer-events-none"
      />

      {/* Main Glass Login Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 w-full max-w-md"
      >
        <VeraCard glass className="flex flex-col items-center pt-8 pb-10 px-10 gap-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-primary/20">

          <div className="text-center">
            <h1 className="text-3xl font-manrope font-bold text-on-surface tracking-wide">Secure Access</h1>
            <p className="text-xs font-mono text-primary-fixed-dim tracking-widest uppercase mt-2">Neural ID Required</p>
          </div>

          <div className="relative w-full flex justify-center py-6 perspective-[1000px]">
            {/* Holographic 3D Scanner Wrapper */}
            <motion.div
              animate={{
                rotateX: scanning ? [0, 15, -15, 0] : 0,
                rotateY: scanning ? [0, -15, 15, 0] : 0
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`w-40 h-40 rounded-full border-[3px] flex items-center justify-center relative overflow-hidden transition-all duration-700 shadow-[0_0_30px_rgba(0,0,0,0.5)] ${authenticated ? 'border-primary shadow-[0_0_80px_rgba(0,229,255,0.6)]' : 'border-outline-variant/30'}`}
            >
              {/* 1. Underlying Vera Image (Revealed on success) */}
              <Image
                src="/agent.png"
                alt="Vera Core"
                fill
                className={`object-cover transition-all duration-1000 ${authenticated ? 'scale-100 brightness-110' : 'scale-125 brightness-50'}`}
              />

              {/* Glowing Core behind doors */}
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-0" />

              {/* 2. Glass Cyber Doors */}
              {/* Left Door */}
              <motion.div
                initial={false}
                animate={{ x: authenticated ? '-100%' : '0%' }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="absolute inset-y-0 left-0 w-1/2 bg-surface backdrop-blur-2xl border-r-2 border-primary/50 shadow-[10px_0_20px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-center"
              >
                {/* Digital circuit lines */}
                <div className="absolute right-0 w-4 h-[2px] bg-primary/80 mb-6 translate-y-[-20px]" />
                <div className="absolute right-0 w-8 h-[2px] bg-primary/80 translate-y-[20px]" />
              </motion.div>

              {/* Right Door */}
              <motion.div
                initial={false}
                animate={{ x: authenticated ? '100%' : '0%' }}
                transition={{ duration: 1.2, ease: [0.77, 0, 0.175, 1], delay: 0.2 }}
                className="absolute inset-y-0 right-0 w-1/2 bg-surface backdrop-blur-2xl border-l-2 border-primary/50 shadow-[-10px_0_20px_rgba(0,0,0,0.8)] z-10 flex flex-col justify-center"
              >
                <div className="absolute left-0 w-6 h-[2px] bg-primary/80 mb-6 translate-y-[10px]" />
                <div className="absolute left-0 w-3 h-[2px] bg-primary/80 translate-y-[30px]" />
              </motion.div>

              {/* 3. Central Encrypted Lock */}
              <AnimatePresence>
                {!authenticated && (
                  <motion.div
                    exit={{ scale: 0, opacity: 0, rotate: 180 }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                    className="absolute z-20 w-14 h-14 rounded-full border-2 border-primary/60 bg-background/90 backdrop-blur-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.3)]"
                  >
                    {scanning ? (
                      <i className="pi pi-spin pi-cog text-primary text-2xl drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"></i>
                    ) : (
                      <i className="pi pi-lock text-outline-variant text-xl"></i>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 4. The Scanning Laser (while scanning) */}
              {scanning && (
                <motion.div
                  initial={{ top: '-10%' }}
                  animate={{ top: '110%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute w-full h-[3px] bg-primary shadow-[0_0_30px_5px_var(--color-primary)] left-0 z-30 pointer-events-none"
                />
              )}

              {/* 5. Success Holographic Ring */}
              <AnimatePresence>
                {authenticated && (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    className="absolute inset-0 rounded-full border-[3px] border-primary bg-primary/10 flex items-center justify-center z-20 pointer-events-none overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--color-primary)_120%)] opacity-30 animate-pulse" />
                    <div className="absolute inset-x-0 bottom-5 text-center">
                      <span className="text-[8px] font-mono font-black text-white bg-primary/80 px-3 py-1 rounded-sm backdrop-blur-xl tracking-[0.3em] uppercase shadow-[0_0_15px_rgba(0,229,255,1)] border border-white/40">Access Granted</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {!scanning && !authenticated && (
              <div className="w-full flex flex-col gap-4">
                <form onSubmit={handleEmailLogin} className="w-full flex flex-col gap-4">
                  <div className="relative group w-full">
                    {/* Animated background glow on focus */}
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-md pointer-events-none"></div>

                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                      <i className="pi pi-at text-outline-variant text-sm group-focus-within:text-primary transition-colors duration-300"></i>
                    </div>
                    <input
                      type="email"
                      placeholder="IDENTIFICATION_ID"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full relative z-0 bg-surface-container-lowest/50 backdrop-blur-xl border border-outline-variant/20 text-on-surface font-mono text-xs tracking-widest py-4 pl-11 pr-10 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/30 transition-all duration-300 placeholder:text-outline-variant/40 shadow-inner"
                    />
                    {email && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-10 pointer-events-none">
                        <i className="pi pi-check-circle text-primary text-xs drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]"></i>
                      </div>
                    )}
                  </div>

                  <div className="relative group w-full">
                    {/* Animated background glow on focus */}
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-md pointer-events-none"></div>

                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none z-10">
                      <i className="pi pi-lock text-outline-variant text-sm group-focus-within:text-primary transition-colors duration-300"></i>
                    </div>
                    <input
                      type="password"
                      placeholder="ACCESS_CODE"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full relative z-0 bg-surface-container-lowest/50 backdrop-blur-xl border border-outline-variant/20 text-on-surface font-mono text-xs tracking-widest py-4 pl-11 pr-10 rounded-xl focus:outline-none focus:border-primary/50 focus:bg-surface-container-lowest focus:ring-1 focus:ring-primary/30 transition-all duration-300 placeholder:text-outline-variant/40 shadow-inner"
                    />
                    {password.length > 0 && (
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 z-10 pointer-events-none">
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${password.length >= 6 ? 'bg-primary shadow-[0_0_8px_var(--color-primary)] scale-110' : 'bg-outline-variant/50'}`}></div>
                      </div>
                    )}
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-surface-container-high relative overflow-hidden text-primary font-mono tracking-widest text-[10px] py-4 mt-2 rounded-xl hover:bg-primary/10 border border-primary/20 hover:border-primary/60 transition-all uppercase flex items-center justify-center gap-3 shadow-[0_4px_20px_rgba(0,0,0,0.5)] group"
                  >
                    {/* Shimmer effect inside button */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-primary/10 to-transparent group-hover:animate-[shimmer_1.5s_infinite]"></div>
                    <i className="pi pi-bolt text-primary drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]"></i> {isSignUp ? 'Initialize Profile' : 'Execute Login'}
                  </motion.button>

                  <button
                    type="button"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-[9px] font-mono text-outline-variant hover:text-primary transition-colors mt-1 mb-2 uppercase tracking-widest flex items-center justify-center gap-2 group"
                  >
                    <i className="pi pi-sync group-hover:rotate-180 transition-transform duration-500"></i>
                    {isSignUp ? 'Already registered? System Login' : 'No ID? Request Clearance'}
                  </button>
                </form>

                <div className="flex items-center gap-4 my-1">
                  <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                  <span className="text-[9px] font-mono text-outline-variant uppercase tracking-[0.3em]">Social Gate</span>
                  <div className="h-[1px] flex-1 bg-outline-variant/20"></div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialLogin(googleProvider)}
                    className="aspect-square bg-surface-container-high rounded-xl border border-white/5 hover:border-primary/50 flex items-center justify-center transition-all group shadow-lg"
                  >
                    <i className="pi pi-google text-xl text-on-surface-variant group-hover:text-primary"></i>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialLogin(facebookProvider)}
                    className="aspect-square bg-surface-container-high rounded-xl border border-white/5 hover:border-[#1877F2]/50 flex items-center justify-center transition-all group shadow-lg"
                  >
                    <i className="pi pi-facebook text-xl text-on-surface-variant group-hover:text-[#1877F2]"></i>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSocialLogin(githubProvider)}
                    className="aspect-square bg-surface-container-high rounded-xl border border-white/5 hover:border-white/50 flex items-center justify-center transition-all group shadow-lg"
                  >
                    <i className="pi pi-github text-xl text-on-surface-variant group-hover:text-white"></i>
                  </motion.button>
                </div>
              </div>
            )}

            {scanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center w-full"
              >
                <p className="text-secondary text-sm font-mono animate-pulse tracking-widest uppercase">Analyzing Neural Patterns...</p>
              </motion.div>
            )}

            {authenticated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 bg-surface-container-low p-4 rounded-xl border border-primary/30 w-full"
              >
                <div className="w-10 h-10 rounded-full bg-surface text-primary border border-primary/50 flex flex-shrink-0 items-center justify-center">
                  <i className="pi pi-user"></i>
                </div>
                <div className="flex flex-col text-left">
                  <span className="text-[10px] text-primary font-mono tracking-widest uppercase">Agent Vera</span>
                  <span className="text-sm font-inter text-on-surface">Identity confirmed. Welcome back to the command center.</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </VeraCard>
      </motion.div>

    </div>
  );
}
