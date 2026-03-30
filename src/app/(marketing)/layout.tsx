"use client";
import React from 'react';
import { VeraNavbar } from "@/components/VeraNavbar";
import { VeraFooter } from "@/components/VeraFooter";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <VeraNavbar />
      <main className="flex-1 flex flex-col mt-20">
        {children}
      </main>
      <VeraFooter />
    </>
  );
}
