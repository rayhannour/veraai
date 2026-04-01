"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

interface AiHubInputBarProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
  onTerminate: () => void;
  placeholder?: string;
}

export function AiHubInputBar({
  value,
  onChange,
  onSend,
  onTerminate,
  placeholder = "Initialize terminal command...",
}: AiHubInputBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") onSend();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
      className="flex items-center gap-2 w-full"
    >
      {/* ── PILL ── */}
      <div
        onClick={() => inputRef.current?.focus()}
        className="
          flex-1 flex items-center gap-3
          h-14 pl-5 pr-1.5
          rounded-full
          bg-white/[0.06] backdrop-blur-2xl
          border border-white/10
          shadow-[0_8px_32px_rgba(0,0,0,0.45)]
          focus-within:border-primary/50
          focus-within:shadow-[0_0_28px_rgba(0,229,255,0.18)]
          transition-all duration-300
          cursor-text
        "
      >
        {/* Chevron hint */}
        <span className="text-primary/40 font-mono text-sm select-none flex-shrink-0">&gt;_</span>

        {/* Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          className="
            flex-1 min-w-0 w-full
            bg-transparent text-white text-base
            border-none outline-none
            placeholder:text-white/25
            font-mono tracking-wide
          "
        />

        {/* Send button — inside pill, right edge */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onSend}
          title="Send"
          className="
            !w-10 !h-10 !min-w-[40px] !min-h-[40px] aspect-square flex-shrink-0
            rounded-full
            bg-primary
            flex items-center justify-center
            shadow-[0_0_14px_rgba(0,229,255,0.45)]
            hover:shadow-[0_0_22px_rgba(0,229,255,0.7)]
            transition-all border-none outline-none
          "
        >
          <i className="pi pi-send text-[12px] text-black font-black" />
        </motion.button>
      </div>

      {/* ── EMERGENCY BUTTON — outside pill ── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onTerminate}
        title="Terminate Neural Link"
        className="
          !w-12 !h-12 !min-w-[48px] !min-h-[48px] aspect-square flex-shrink-0
          rounded-full
          flex items-center justify-center
          bg-error/10 hover:bg-error/80
          border border-error/35 hover:border-error
          text-error hover:text-white
          shadow-[0_0_10px_rgba(255,51,102,0.15)]
          hover:shadow-[0_0_20px_rgba(255,51,102,0.55)]
          transition-all outline-none
        "
      >
        <i className="pi pi-power-off text-[14px]" />
      </motion.button>
    </motion.div>
  );
}
