"use client";

import Link from "next/link";
import { createClient } from "@/../supabase/client";
import { Button } from "./ui/button";
import UserProfile from "./user-profile";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import type { User } from "@supabase/supabase-js";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0a0a0b]/80 backdrop-blur-2xl border-b border-white/[0.04]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center h-14">
        <Link href="/" className="flex items-center gap-0 group flex-shrink-0">
          <span className="text-[15px] font-semibold text-white tracking-[-0.02em]">
            Ascent-ly
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#features"
            className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-300"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-300"
          >
            How It Works
          </Link>
          <Link
            href="#pricing"
            className="text-[13px] text-white/35 hover:text-white/80 transition-colors duration-300"
          >
            Pricing
          </Link>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button className="h-8 px-4 text-[13px] font-medium bg-white text-black hover:bg-white/90 border-0 rounded-full transition-all duration-200">
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-[13px] text-white/40 hover:text-white transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="h-8 px-5 text-[13px] font-medium bg-white text-black hover:bg-white/90 rounded-full transition-all duration-200 inline-flex items-center"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        <div className="flex md:hidden items-center gap-3">
          {user && <UserProfile />}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-white/40 hover:text-white transition-colors p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.04] bg-[#0a0a0b]/95 backdrop-blur-2xl">
          <div className="max-w-[1200px] mx-auto px-6 py-4 flex flex-col gap-1">
            <Link
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-[13px] text-white/40 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-[13px] text-white/40 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-[13px] text-white/40 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <div className="pt-3 mt-2 border-t border-white/[0.04] flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-white text-black hover:bg-white/90 border-0 text-[13px] rounded-full">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2.5 text-[13px] text-white/40 hover:text-white hover:bg-white/[0.03] rounded-lg transition-colors text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-[13px] font-medium text-center text-black bg-white rounded-full hover:bg-white/90 transition-all"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
