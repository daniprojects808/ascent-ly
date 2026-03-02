"use client";

import Link from 'next/link'
import { createClient } from '@/../supabase/client'
import { Button } from './ui/button'
import UserProfile from './user-profile'
import { Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import type { User } from '@supabase/supabase-js'

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#1a1d24]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.4)] transition-shadow">
            <span className="text-white font-display text-sm font-bold">A</span>
          </div>
          <span className="font-display text-lg font-bold text-[#f5f1e8] tracking-tight">
            Ascent-ly
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-sm font-medium text-[#f5f1e8]/50 hover:text-[#f5f1e8]/80 transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-[#f5f1e8]/50 hover:text-[#f5f1e8]/80 transition-colors">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-[#f5f1e8]/50 hover:text-[#f5f1e8]/80 transition-colors">
            Pricing
          </Link>
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex gap-3 items-center">
          {user ? (
            <>
              <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white hover:from-cyan-400 hover:to-cyan-500 border-0 shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.35)] transition-all">
                  Dashboard
                </Button>
              </Link>
              <UserProfile />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-[#f5f1e8]/60 hover:text-[#f5f1e8] transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-[#1a1d24] bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg hover:from-cyan-300 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)]"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile: avatar + hamburger */}
        <div className="flex md:hidden items-center gap-3">
          {user && <UserProfile />}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[#f5f1e8]/60 hover:text-[#f5f1e8] transition-colors p-1"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#1a1d24]/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-1">
            <Link
              href="#features"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#f5f1e8]/60 hover:text-[#f5f1e8] hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#f5f1e8]/60 hover:text-[#f5f1e8] hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2.5 text-sm font-medium text-[#f5f1e8]/60 hover:text-[#f5f1e8] hover:bg-white/[0.04] rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <div className="pt-3 mt-2 border-t border-white/[0.06] flex flex-col gap-2">
              {user ? (
                <Link href="/dashboard" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white border-0">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link
                    href="/sign-in"
                    onClick={() => setMenuOpen(false)}
                    className="px-3 py-2.5 text-sm font-medium text-[#f5f1e8]/60 hover:text-[#f5f1e8] hover:bg-white/[0.04] rounded-lg transition-colors text-center"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="px-4 py-3 text-sm font-semibold text-center text-[#1a1d24] bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-lg hover:from-cyan-300 hover:to-cyan-400 transition-all shadow-[0_0_20px_rgba(6,182,212,0.25)]"
                  >
                    Get Started Free
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
