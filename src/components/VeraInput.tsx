"use client";
import React from 'react';
import { InputText, InputTextProps } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';

export interface VeraInputProps extends InputTextProps {
  aiAssisted?: boolean;
}

export function VeraInput({ aiAssisted, className, ...props }: VeraInputProps) {
  const baseClass = classNames(
    'bg-surface-container-lowest/50 backdrop-blur-md text-on-surface font-inter rounded-full px-6 py-4 outline-none transition-all duration-300',
    {
      'border border-transparent focus:border-surface-tint focus:shadow-[0_0_10px_var(--color-surface-tint)]': !aiAssisted,
      // Simulated AI animated gradient border Focus State
      'border-2 border-transparent border-t-primary border-r-primary-container border-b-secondary border-l-primary-fixed-dim bg-origin-border': aiAssisted,
    },
    className
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <InputText className={baseClass} {...props} style={{ border: aiAssisted ? 'none' : undefined }} />
      {aiAssisted && <span className="text-primary-fixed-dim text-xs tracking-widest uppercase mt-[-4px] ml-1">AI Assisting</span>}
    </div>
  );
}
