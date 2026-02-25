import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  // Space Grotesk doesn't ship with weight 800 in next/font/google
  // Available: 300, 400, 500, 600, 700, variable
  weight: ["700"],
  variable: "--font-display",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-data",
  display: "swap"
});

const manrope = Manrope({ 
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Job Application Tracker",
  description: "Track your job applications with real-time metrics and visual progress tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${manrope.variable}`}>
        {children}
        <Toaster />
        <TempoInit />
      </body>
    </html>
  );
}
