import type { Metadata } from "next";
import { Manrope, Inter, Space_Grotesk } from "next/font/google";
import Image from "next/image";
import { Providers } from "./providers";
import { VeraNavbar } from "@/components/VeraNavbar";
import { VeraFooter } from "@/components/VeraFooter";
import "primereact/resources/themes/lara-dark-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Vera - AI Hub",
  description: "The Kinetic Intelligence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-inter bg-background text-on-surface relative">
        {/* Global AI Presence */}
        <div className="fixed inset-0 pointer-events-none z-[0] select-none">
          <Image 
            src="/agent.png" 
            alt="Vera Omnipresent AI" 
            fill 
            className="object-cover opacity-[0.04] mix-blend-screen"
            priority
          />
        </div>
        
        <div className="relative z-10 flex-1 flex flex-col w-full h-full">
          <Providers>
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
