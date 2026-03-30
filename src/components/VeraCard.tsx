"use client";
import React from 'react';
import { classNames } from 'primereact/utils';

export interface VeraCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
}

export function VeraCard({ glass, className, children, ...props }: VeraCardProps) {
  const baseClass = classNames(
    'p-6 overflow-hidden relative vera-ambient-shadow transition-colors duration-300',
    {
      'vera-glass-panel': glass,
      'bg-surface-container rounded-[1rem] hover:bg-surface-container-low': !glass,
    },
    className
  );

  return (
    <div className={baseClass} {...props}>
      <div className="relative z-10 w-full">{children}</div>
    </div>
  );
}
