"use client";
import React from "react";
import { PrimeReactProvider } from "primereact/api";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PrimeReactProvider>
      {children}
    </PrimeReactProvider>
  );
}
