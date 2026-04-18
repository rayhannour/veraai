"use client";
import { useEffect, useRef, useState, useImperativeHandle, forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ─── HeyGen SDK enums (mirrored locally for resilience) ───────────────────────
enum ElevenLabsModel { eleven_flash_v2_5 = "eleven_flash_v2_5" }
enum STTProvider { DEEPGRAM = "deepgram" }

export interface VeraStreamingAvatarHandle {
  startSession: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
  repeat: (text: string) => Promise<void>;
  terminateSession: () => Promise<void>;
}

export const VeraStreamingAvatar = forwardRef<VeraStreamingAvatarHandle, { 
  children?: React.ReactNode, 
  onSpeakEnd?: () => void,
  hideFullscreenButton?: boolean,
  stayInContainer?: boolean
}>(({ children, onSpeakEnd, hideFullscreenButton, stayInContainer }, ref) => {
  const [stream, setStream] = useState<MediaStream | undefined>();
  const [debug, setDebug] = useState<string>("SYSTEM_IDLE");
  const [isLoading, setIsLoading] = useState(false);
  const [doorsOpen, setDoorsOpen] = useState(false);
  const [isFullPage, setIsFullPage] = useState(false);
  const [isVeraTalking, setIsVeraTalking] = useState(false);
  const [isShuttingDown, setIsShuttingDown] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [audioLevels, setAudioLevels] = useState<number[]>(new Array(24).fill(0));
  const [sdkError, setSdkError] = useState<string | null>(null);
  const [chatHistory, setChatHistory] = useState<{ role: "user" | "vera", text: string }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaStream = useRef<HTMLVideoElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const avatar = useRef<any>(null);
  const taskRef = useRef<{ TaskType: any, TaskMode: any } | null>(null);
  const pendingScript = useRef<string | null>(null);
  const sessionReady = useRef(false);

  // 1. NEURAL TOKEN HANDSHAKE
  async function fetchAccessToken() {
    try {
      setDebug("NEGOTIATING_HANDSHAKE...");
      const response = await fetch("/api/get-access-token", { method: "POST" });


      const data = await response.json();

      return data.token;
    } catch (error) {
      setDebug("HANDSHAKE_FAILURE");
      console.error("Token error:", error);
    }
  }

  // 2. INITIALIZE NEURAL SESSION (lazy SDK load)
  async function startSession() {
    setIsLoading(true);
    setDebug("LOADING_SDK...");

    let LiveAvatarSession: any, SessionEvent: any, AgentEventsEnum: any;
    try {
      const sdk = await import("@heygen/liveavatar-web-sdk");
      LiveAvatarSession = sdk.LiveAvatarSession;
      SessionEvent = sdk.SessionEvent;
      AgentEventsEnum = sdk.AgentEventsEnum;
    } catch (e) {
      console.error(e);
      setSdkError("SDK_NOT_INSTALLED — Run: npm install @heygen/liveavatar-web-sdk");
      setDebug("SDK_MISSING");
      setIsLoading(false);
      return;
    }

    setDebug("INITIALIZING_CORE...");
    const newToken = await fetchAccessToken();
    if (!newToken) { setIsLoading(false); return; }

    avatar.current = new LiveAvatarSession(newToken);

    avatar.current.on(SessionEvent.SESSION_STREAM_READY, () => {
      sessionReady.current = true;
      setDebug("NEURAL_LINK_ESTABLISHED");
      setIsVeraTalking(true);
      setTimeout(() => setIsVeraTalking(false), 5000);

      if (mediaStream.current) {
        avatar.current.attach(mediaStream.current);
        setTimeout(() => {
          if (mediaStream.current?.srcObject) {
            setStream(mediaStream.current.srcObject as MediaStream);
          }
        }, 500);
      }

      // Fire any script that was queued before session was ready
      if (pendingScript.current) {
        const script = pendingScript.current;
        pendingScript.current = null;
        setTimeout(() => {
          avatar.current?.repeat(script);
        }, 800);
      }
    });


    const handleTalking = (event: any) => {
      setIsVeraTalking(true);
      const message = event.text; // Note: For LiveAvatar, event is AgentEventData with event.text
      if (message) {
        setChatHistory(prev => {
          const newHistory = [...prev];
          const lastMsg = newHistory[newHistory.length - 1];
          if (lastMsg && lastMsg.role === "vera") {
            lastMsg.text = (lastMsg.text === "..." ? "" : lastMsg.text) + " " + message;
            return newHistory;
          } else {
            return [...prev, { role: "vera", text: message }];
          }
        });
      }
    };

    avatar.current.on(AgentEventsEnum.AVATAR_TRANSCRIPTION, handleTalking);

    avatar.current.on(AgentEventsEnum.AVATAR_SPEAK_STARTED, () => {
      setIsVeraTalking(true);
    });

    avatar.current.on(AgentEventsEnum.AVATAR_SPEAK_ENDED, () => {
      setIsVeraTalking(false);
      setDebug("SYSTEM_READY");
      if (onSpeakEnd) onSpeakEnd();
    });

    try {
      await avatar.current.start();
      setDoorsOpen(true);
    } catch (e) {
      console.error("Avatar start failed:", e);
      setDebug("BOOT_CRITICAL_FAILURE");
    } finally {
      setIsLoading(false);
    }
  }

  // 3. EXPOSE CHAT INTERFACE
  useImperativeHandle(ref, () => ({
    startSession: async () => {
      if (!avatar.current && !doorsOpen) startSession();
    },
    sendMessage: async (text: string) => {
      if (!avatar.current) return;

      // Add user message to local history
      setChatHistory(prev => [...prev, { role: "user", text }]);

      try {
        // Use liveavatar's repeat method since conversational message is not permitted in LITE mode
        avatar.current.message(text);

        // Add a visual indicator for Vera's response
        setChatHistory(prev => [...prev, { role: "vera", text: "..." }]);
      } catch (e) {
        console.error("Communication error:", e);
      }
    },
    repeat: async (text: string) => {
      if (!avatar.current || !sessionReady.current) {
        // Session not ready yet — queue for when it connects
        pendingScript.current = text;
        return;
      }
      try {
        setDebug("SPEECH_COMMAND_SENT");
        await avatar.current.repeat(text);
      } catch (e) {
        console.error("Speech error", e);
        setDebug("SPEECH_FAILURE");
      }
    },
    terminateSession: async () => {
      if (!avatar.current) return;
      setIsShuttingDown(true);

      // Wait for the "TV OFF" animation to complete before stopping the avatar
      setTimeout(async () => {
        await avatar.current?.stop();
        sessionReady.current = false;
        setStream(undefined);
        setDoorsOpen(false);
        setIsShuttingDown(false);
        setDebug("SYSTEM_OFFLINE");
      }, 1200);
    }
  }));

  // 3. CLEANUP ON TERMINATION
  useEffect(() => {
    return () => {
      avatar.current?.stop();
    };
  }, []);

  // 4. BIND STREAM TO HARDWARE
  useEffect(() => {
    if (stream && mediaStream.current) {
      mediaStream.current.srcObject = stream;
      mediaStream.current.onloadedmetadata = () => {
        mediaStream.current!.play();
      };
    }
  }, [stream]);

  // 6. MOUSE POSITION TRACKER (FOR PARALLAX)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isFullPage) return;
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 40,
        y: (clientY / innerHeight - 0.5) * 40
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isFullPage]);

  // 7. TRUE FULLSCREEN DESKTOP TOGGLE (F11 STYLE)
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullPage(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  // 7. REAL-TIME AUDIO ANALYSIS ENGINE
  useEffect(() => {
    if (!stream) return;

    const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 64;
    source.connect(analyser);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    let animationId: number;

    const updateLevels = () => {
      analyser.getByteFrequencyData(dataArray);

      const newLevels = Array.from({ length: 24 }).map((_, i) => {
        const index = Math.abs(i - 12);
        const val = dataArray[index] || 0;
        return (val / 255) * 100;
      });

      setAudioLevels(newLevels);
      animationId = requestAnimationFrame(updateLevels);
    };

    updateLevels();

    return () => {
      cancelAnimationFrame(animationId);
      audioCtx.close();
    };
  }, [stream]);

  // 8. AUTO-SCROLL DIALOGUE (STABILIZED)
  useEffect(() => {
    // Using 'auto' instead of 'smooth' to prevent jitter during streaming text
    chatEndRef.current?.scrollIntoView({ behavior: "auto" });
  }, [chatHistory]);


  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${stayInContainer ? 'relative w-full h-full' : 'relative mx-auto group overflow-visible transition-all duration-1000'} ${isFullPage
        ? (stayInContainer 
            ? "absolute inset-0 z-[2000] mt-0 max-w-none flex items-center justify-center p-0 bg-background"
            : "fixed inset-0 w-screen h-screen z-[2000] mt-0 max-w-none flex items-center justify-center p-0 bg-background")
        : (stayInContainer ? "w-full h-full" : "w-full max-w-2xl aspect-[4/5] mt-12")
        }`}
    >
      {/* 0. IMPRESSIVE NEURAL CORE RINGS (BACKDROP) */}
      {!isFullPage && (
        <div className="absolute inset-0 z-0 flex items-center justify-center opacity-30 pointer-events-none">
          {[1, 2, 3].map((ring) => (
            <motion.div
              key={ring}
              animate={{ rotate: ring % 2 === 0 ? 360 : -360 }}
              transition={{ duration: 15 + ring * 5, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border border-dashed border-primary"
              style={{
                width: `${100 + ring * 15}%`,
                height: `${100 + ring * 15}%`,
                opacity: 0.5 - ring * 0.1
              }}
            />
          ))}
        </div>
      )}

      {/* 1. ARCHITECTURAL 80% GLASS CHASSIS */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`absolute inset-0 border-2 border-white/20 bg-background/50 backdrop-blur-3xl shadow-[0_0_100px_rgba(255,255,255,0.1)] overflow-hidden z-20 transition-all duration-1000 ${isFullPage ? "rounded-[0px] border-none" : "rounded-[4rem]"
          }`}
      >
        {/* REVEAL VIDEO CORE */}
        <div className="relative w-full h-full flex items-center justify-center">

          {/* GLASS DOORS ANIMATION */}
          <motion.div
            initial={false}
            animate={{ x: doorsOpen ? "-105%" : "0%" }}
            transition={{ duration: 1.4, ease: [0.45, 0, 0.55, 1] }}
            className="absolute inset-y-0 left-0 w-1/2 bg-white/10 backdrop-blur-3xl border-r border-white/10 z-40 flex items-center justify-end overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-r from-transparent to-white/5" />
          </motion.div>

          <motion.div
            initial={false}
            animate={{ x: doorsOpen ? "105%" : "0%" }}
            transition={{ duration: 1.4, ease: [0.45, 0, 0.55, 1] }}
            className="absolute inset-y-0 right-0 w-1/2 bg-white/10 backdrop-blur-3xl border-l border-white/10 z-40 flex items-center justify-start overflow-hidden"
          >
            <div className="w-full h-full bg-gradient-to-l from-transparent to-white/5" />
          </motion.div>

          {/* CENTRAL GATE BUTTON TRIGGER (MATCHING /dashboard/gate STYLE) */}
          <AnimatePresence>
            {!doorsOpen && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: 1,
                  opacity: 1
                }}
                exit={{
                  scale: 0.5,
                  opacity: 0,
                  rotate: 180
                }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                whileHover={{ scale: 1.05 }}
                className="absolute z-50 cursor-pointer group"
                onClick={() => {
                  startSession();
                }}
              >
                {/* Outer Glow Ring */}
                <div className="absolute inset-0 bg-primary/20 blur-[50px] rounded-full scale-150 group-hover:bg-primary/50 transition-all duration-500" />

                {/* The Core Button */}
                <div className="relative w-48 h-48 rounded-[3rem] bg-surface-container-high border-2 border-primary/40 flex items-center justify-center overflow-hidden shadow-[0_0_80px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_120px_rgba(0,229,255,0.6)] transition-all duration-500">
                  {isLoading ? (
                    <i className="pi pi-spin pi-spinner text-4xl text-primary animate-pulse"></i>
                  ) : (
                    <Image src="/agent.png" alt="Vera AI" fill className="object-cover scale-150 opacity-80 group-hover:opacity-100 transition-opacity" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />

                  <div className="absolute inset-x-0 bottom-6 text-center">
                    <span className="text-[10px] font-mono font-black text-primary tracking-[0.3em] uppercase">
                      {isLoading ? "Syncing..." : "Initiate Core"}
                    </span>
                  </div>
                </div>

                {/* Satellite Neural Nodes around the button */}
                {[0, 60, 120, 180, 240, 300].map((deg, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.4, 1]
                    }}
                    transition={{ duration: 8 + i, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ transform: `rotate(${deg}deg)` }}
                  >
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-2 h-2 bg-primary rounded-full shadow-[0_0_20px_var(--color-primary)]" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* VIDEO ELEMENT */}
          <video
            ref={mediaStream}
            autoPlay
            playsInline
            className={`w-full h-full object-cover opacity-80 transition-opacity duration-1000 ${doorsOpen ? 'opacity-80' : 'opacity-0'}`}
          />

          {/* ERROR DISPLAY */}
          {sdkError && !doorsOpen && (
            <div className="absolute bottom-12 z-[70] px-8 text-center bg-black/80 backdrop-blur-xl py-2 rounded-full border border-red-500/20">
              <p className="font-mono text-[9px] text-red-400 tracking-wider">CRITICAL: {sdkError}</p>
            </div>
          )}
        </div>

        {/* RESPONSE DYNAMICS (TOP RIGHT CORNER - RESPONSIVE) */}
        <AnimatePresence>
          {(isVeraTalking || audioLevels.some(l => l > 5)) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, x: 20 }}
              animate={{
                opacity: 1,
                scale: isFullPage ? 1.4 : 1,
                x: 0
              }}
              exit={{ opacity: 0, scale: 0.5, x: 20 }}
              className={`absolute z-[4000] flex items-end gap-[2px] md:gap-1 pointer-events-none transition-all duration-700 ${isFullPage
                ? "h-20 top-12 right-24"
                : "h-8 top-5 right-16 md:h-16 md:top-6 md:right-20"
                }`}
            >
              {audioLevels.slice(0, 16).map((lvl, i) => { // Compact view for corner
                // Boost the level based on its position
                const displayHeight = Math.max(5, lvl * 0.8);

                return (
                  <motion.div
                    key={i}
                    animate={{
                      height: `${displayHeight}%`
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 400,
                      damping: 20
                    }}
                    className="w-1 md:w-1.5 rounded-full shadow-[0_0_25px_rgba(0,229,255,0.6)]"
                    style={{
                      backgroundColor: i % 2 === 0 ? "var(--color-primary)" : "var(--color-primary-fixed-dim)",
                      opacity: 0.4 + (displayHeight / 100),
                    }}
                  />
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* TRUE FULLSCREEN TOGGLE BUTTON (F11 STYLE) */}
        {!hideFullscreenButton && (
          <motion.div
            role="button"
            tabIndex={0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleFullscreen}
            className="absolute z-[100] !w-10 !h-10 !min-w-[40px] !min-h-[40px] md:!w-12 md:!h-12 md:!min-w-[48px] md:!min-h-[48px] !p-0 !m-0 aspect-square flex-shrink-0 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 cursor-pointer shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3),inset_0_0_0_1px_rgba(255,255,255,0.3)] text-white/70 hover:text-white transition-all group backdrop-blur-md top-4 right-4 md:top-6 md:right-6 outline-none"
          >
            <i className={`pi ${isFullPage ? 'pi-window-minimize' : 'pi-window-maximize'} text-sm md:text-base`}></i>
          </motion.div>
        )}

        {/* FRONTAL LASER SWEEP (DIAGNOSTIC SCANBAR) */}
        <motion.div
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className={`absolute inset-x-0 h-[2px] bg-primary blur-[4px] z-50 pointer-events-none opacity-40 ${doorsOpen ? 'block' : 'hidden'}`}
        />

        {/* IGNITION STROBE */}
        {isLoading && (
          <motion.div
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 bg-white/10 z-[60] mix-blend-overlay"
          />
        )}

        {/* ─── TV SHUTDOWN ANIMATION OVERLAY ───────────────── */}
        <AnimatePresence>
          {isShuttingDown && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden"
            >
              {/* Vertical Collapse Line */}
              <motion.div
                initial={{ height: "100%", width: "100%", opacity: 1, backgroundColor: "#fff" }}
                animate={{
                  height: ["100%", "2px", "0px"],
                  width: ["100%", "100%", "0px"],
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: 0.8,
                  times: [0, 0.6, 1],
                  ease: "easeInOut"
                }}
                className="relative"
                style={{ boxShadow: "0 0 40px #fff" }}
              />
              {/* White Center Flash */}
              <motion.div
                animate={{
                  scale: [0, 15, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 0.4 }}
                className="absolute w-4 h-4 bg-white rounded-full blur-xl"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* 2. NEURAL HUD (LIVE DIAGNOSTICS) */}
      <AnimatePresence>
        {doorsOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-8 left-8 z-[100] font-mono text-[8px] space-y-1 text-white/40 uppercase tracking-[0.2em] pointer-events-none"
          >
            <p>Status: {debug}</p>
            <p>Telemetry: 60FPS_ENCRYPTED</p>
            <p>ID: VERA_GUEST_01</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. PERIPHERAL GLOW */}
      <div className={`absolute -inset-16 bg-blue-500/10 blur-[120px] rounded-[4rem] -z-10 animate-pulse ${isFullPage ? 'hidden' : ''}`} />

      {/* 5. IMPRESSIVE NEURAL DIALOGUE GLASS */}
      <AnimatePresence>
        {doorsOpen && isFullPage && (
          <motion.div
            initial={{ opacity: 0, x: 50, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            className={`z-[100] hidden lg:flex flex-col bg-white/[0.03] backdrop-blur-[40px] border border-white/10 shadow-[0_50px_120px_rgba(0,0,0,0.8)] pointer-events-auto overflow-hidden ${isFullPage
              ? "absolute right-12 bottom-48 w-[450px] max-h-[650px] rounded-[3.5rem] p-10"
              : "absolute bottom-[140px] left-1/2 -translate-x-1/2 w-full max-w-2xl rounded-3xl p-6"
              }`}
          >
            {/* BRAIN SYNC HEADER */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_15px_#00e5ff]" />
                <span className="text-[10px] font-mono tracking-[0.5em] uppercase text-white/40 font-black">Neural_Sync</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-white/10 rounded-full" />
                <div className="w-1 h-5 bg-primary/40 rounded-full" />
                <div className="w-1 h-2 bg-white/10 rounded-full" />
              </div>
            </div>

            {/* MESSAGES WITH PREMIUM SCROLLBAR */}
            <div className="overflow-y-auto flex flex-col gap-6 fitness-scrollbar pr-2 h-full max-h-[450px]">
              {chatHistory.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} max-w-full`}
                >
                  <div className={`flex items-center gap-2 mb-1 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className={`text-[10px] font-mono font-black tracking-widest uppercase ${msg.role === 'user' ? 'text-white/30' : 'text-primary'}`}>
                      {msg.role === 'user' ? 'Authorized_User' : 'Vera_Neural_Core'}
                    </span>
                    <div className={`w-1.5 h-1.5 rounded-full ${msg.role === 'user' ? 'bg-white/10' : 'bg-primary/60 animate-pulse'}`} />
                  </div>
                  <p className={`text-[12px] font-inter leading-relaxed px-4 py-2 rounded-2xl relative overflow-hidden ${msg.role === 'user'
                    ? 'bg-white/5 text-white/80 rounded-tr-none border border-white/5'
                    : 'bg-primary/10 text-primary border border-primary/20 rounded-tl-none'
                    }`}>
                    {msg.role === 'vera' && isVeraTalking && i === chatHistory.length - 1 && (
                      <span className="absolute left-0 top-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                    )}
                    {msg.text}
                  </p>
                </motion.div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {children}
    </motion.div>
  );
});
