"use client";
import React from 'react';

export interface VeraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function VeraCard({ glass, className, children, ...props }: VeraCardProps) {
  const baseClass = [
    'p-6 overflow-hidden relative vera-ambient-shadow transition-colors duration-300',
    glass ? 'vera-glass-panel' : 'bg-surface-container rounded-[1rem] hover:bg-surface-container-low',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={baseClass} {...props}>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
