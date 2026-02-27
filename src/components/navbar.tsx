import Link from 'next/link'
import { createClient } from '@/../supabase/server'
import { Button } from './ui/button'
import UserProfile from './user-profile'
import type { User } from '@supabase/supabase-js'

interface NavbarProps {
  user?: User | null;
}

export default async function Navbar({ user: userProp }: NavbarProps = {}) {
  // Only fetch user if not passed as a prop (avoids duplicate auth calls)
  let user = userProp;
  if (user === undefined) {
    const supabase = await createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#1a1d24]/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 flex justify-between items-center h-16">
        <Link href="/" prefetch className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center shadow-[0_0_16px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_24px_rgba(6,182,212,0.4)] transition-shadow">
            <span className="text-white font-display text-sm font-bold">A</span>
          </div>
          <span className="font-display text-lg font-bold text-[#f5f1e8] tracking-tight">
            Ascent-ly
          </span>
        </Link>

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

        <div className="flex gap-3 items-center">
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
      </div>
    </nav>
  )
}
