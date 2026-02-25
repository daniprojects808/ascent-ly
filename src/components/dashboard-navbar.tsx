'use client'

import Link from 'next/link'
import { createClient } from '../../supabase/client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Button } from './ui/button'
import { UserCircle, Home, LogOut, Briefcase, Moon, Sun } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function DashboardNavbar() {
  const supabase = createClient()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <nav className="w-full border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#1a1d24]/80 backdrop-blur-xl py-3 sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Link href="/" prefetch className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-500/20 flex items-center justify-center group-hover:bg-blue-100 dark:group-hover:bg-blue-500/30 transition-colors">
              <Briefcase className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm font-bold text-gray-900 dark:text-[#f5f1e8] tracking-tight">
              JobTracker
            </span>
          </Link>
        </div>
        <div className="flex gap-3 items-center">
          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#f5f1e8] hover:bg-gray-100 dark:hover:bg-white/10"
              title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-[#f5f1e8] hover:bg-gray-100 dark:hover:bg-white/10">
                <UserCircle className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white dark:bg-[#1a1d24] border-gray-200 dark:border-white/10 text-gray-900 dark:text-[#f5f1e8] rounded-lg">
              <DropdownMenuItem
                className="text-sm cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 rounded-lg"
                onClick={async () => {
                  await supabase.auth.signOut()
                  router.push("/")
                }}
              >
                <LogOut className="w-4 h-4 mr-2 text-gray-600 dark:text-gray-400" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
