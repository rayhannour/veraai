"use client";
import React from 'react';

export interface VeraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  label?: string;
  icon?: string;
}

export function VeraButton({ variant = 'primary', className, label, icon, children, ...props }: VeraButtonProps) {
  const baseClass = [
    'font-inter font-medium transition-all duration-200 uppercase tracking-widest text-sm inline-flex items-center justify-center gap-2',
    variant === 'primary' ? 'vera-hero-cta px-6 py-3' : '',
    variant === 'secondary' ? 'bg-surface-container-high text-on-surface hover:bg-surface-container-highest px-6 py-3 rounded-[0.75rem] border-none' : '',
    variant === 'ghost' ? 'bg-transparent text-primary-fixed-dim hover:text-primary px-4 py-2 border-none shadow-none' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={baseClass} {...props}>
      {icon && <i className={`pi ${icon}`}></i>}
      {label && <span>{label}</span>}
      {children}
    </button>
  );
}
