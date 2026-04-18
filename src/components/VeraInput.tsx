"use client";
import React from 'react';

export interface VeraInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  aiAssisted?: boolean;
}

export function VeraInput({ aiAssisted, className, ...props }: VeraInputProps) {
  const baseClass = [
    'bg-surface-container-lowest/50 backdrop-blur-md text-on-surface font-inter rounded-full px-6 py-4 outline-none transition-all duration-300 w-full',
    !aiAssisted ? 'border border-transparent focus:border-surface-tint focus:shadow-[0_0_10px_var(--color-surface-tint)]' : '',
    // Simulated AI animated gradient border Focus State
    aiAssisted ? 'border-2 border-transparent border-t-primary border-r-primary-container border-b-secondary border-l-primary-fixed-dim bg-origin-border' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="flex flex-col gap-2 w-full">
      <input className={baseClass} {...props} style={aiAssisted ? { border: 'none' } : undefined} />
      {aiAssisted && <span className="text-primary-fixed-dim text-xs tracking-widest uppercase mt-[-4px] ml-1">AI Assisting</span>}
    </div>
  );
}
