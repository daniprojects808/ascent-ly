import { TempoInit } from "@/components/tempo-init";
import type { Metadata } from "next";
import { DM_Sans, Fira_Code, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono-data",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ascent-ly — Job Application Tracker",
  description:
    "The fastest way to land your next role. Track every application, interview, and offer in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${firaCode.variable} ${inter.variable} font-body antialiased`}
      >
        {children}
        <Toaster />
        <TempoInit />
      </body>
    </html>
  );
}
