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
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#08090c]/80 backdrop-blur-2xl border-b border-white/[0.06] shadow-[0_1px_3px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex justify-between items-center h-[60px]">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0 group">
          <span className="text-[16px] font-display font-bold text-white tracking-[-0.03em] group-hover:text-[#8b5cf6] transition-colors duration-200">
            Ascent-ly
          </span>
        </Link>

        {/* Center nav links */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "How It Works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] font-body text-white/35 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[1px] after:bg-[#8b5cf6] hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right actions */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button className="h-8 px-5 text-[12px] font-medium bg-[#8b5cf6] text-white hover:bg-[#7c3aed] border-0 rounded-full transition-all duration-200 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]">
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="text-[13px] font-body text-white/40 hover:text-white transition-colors duration-200"
              >
                Sign in
              </Link>
              <Link
                href="/sign-up"
                className="h-8 px-5 text-[12px] font-medium bg-[#8b5cf6] text-white hover:bg-[#7c3aed] rounded-full transition-all duration-200 inline-flex items-center hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(139,92,246,0.25)]"
              >
                Get started
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
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
        <div className="md:hidden border-t border-white/[0.05] bg-[#08090c]/95 backdrop-blur-2xl">
          <div className="max-w-[1200px] mx-auto px-6 py-5 flex flex-col gap-1">
            {[
              { label: "Features", href: "#features" },
              { label: "How It Works", href: "#how-it-works" },
              { label: "Pricing", href: "#pricing" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-3 py-3 text-[14px] font-body text-white/40 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 mt-3 border-t border-white/[0.05] flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-[#8b5cf6] text-white hover:bg-[#7c3aed] border-0 text-[13px] font-medium rounded-full py-3">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-3 text-[14px] font-body text-white/40 hover:text-white hover:bg-white/[0.03] rounded-xl transition-all duration-200 text-center"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="px-5 py-3 text-[13px] font-medium text-center text-white bg-[#8b5cf6] rounded-full hover:bg-[#7c3aed] transition-all duration-200"
                  >
                    Get started
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
