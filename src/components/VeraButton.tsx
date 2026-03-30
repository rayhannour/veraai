"use client";
import React from 'react';
import { Button, ButtonProps } from 'primereact/button';
import { classNames } from 'primereact/utils';

export interface VeraButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function VeraButton({ variant = 'primary', className, ...props }: VeraButtonProps) {
  const baseClass = classNames(
    'font-inter font-medium transition-all duration-200 uppercase tracking-widest text-sm',
    {
      'vera-hero-cta px-6 py-3': variant === 'primary',
      'bg-surface-container-high text-on-surface hover:bg-surface-container-highest px-6 py-3 rounded-[0.75rem] border-none': variant === 'secondary',
      'bg-transparent text-primary-fixed-dim hover:text-primary px-4 py-2 border-none shadow-none': variant === 'ghost',
    },
    className
  );

  return <Button className={baseClass} {...props} />;
}
