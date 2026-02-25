'use client';

import { useState, useEffect } from 'react';
import { X, Menu, LayoutDashboard, User, LogOut, Moon, Sun } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { createClient } from '../../../supabase/client';
import { useRouter } from 'next/navigation';

interface CollapsibleSidebarProps {
  userEmail?: string;
  userName?: string;
}

export default function CollapsibleSidebar({ userEmail, userName }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = savedTheme === 'dark';
    setIsDarkMode(prefersDark);
    
    if (prefersDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/sign-in');
    router.refresh();
  };

  const getInitials = (name?: string, email?: string) => {
    if (name) {
      return name
        .split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    }
    return email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <>
      {/* Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed top-6 left-6 z-40 p-2.5 bg-white dark:bg-[#1e2028] rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 border border-gray-200 dark:border-white/[0.08]"
        >
          <Menu className="w-5 h-5 text-gray-900 dark:text-[#f5f1e8]" />
        </button>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 transition-all"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-72 bg-white dark:bg-[#1a1d24] border-r border-gray-200 dark:border-white/[0.08] z-50 transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Content */}
        <div className="flex flex-col h-full pt-20 px-6">
          {/* Dashboard Section */}
          <div className="mb-4">
            <button
              onClick={() => {
                router.push('/dashboard');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-800 dark:bg-white/5 dark:hover:bg-white/10 text-white dark:text-[#f5f1e8] rounded-xl transition-all"
            >
              <LayoutDashboard className="w-5 h-5" />
              <h2 className="text-lg font-bold">Dashboard</h2>
            </button>
          </div>

          {/* Profile Section */}
          <div className="mb-8">
            <button
              onClick={() => {
                router.push('/profile');
                setIsOpen(false);
              }}
              className="w-full flex items-center gap-3 p-4 bg-gray-900 hover:bg-gray-800 dark:bg-white/5 dark:hover:bg-white/10 text-white dark:text-[#f5f1e8] rounded-xl transition-all"
            >
              <User className="w-5 h-5" />
              <h2 className="text-lg font-bold">Profile</h2>
            </button>
          </div>

          {/* Theme Toggle */}
          <div className="mb-8">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 dark:bg-white/5 dark:hover:bg-white/10 text-gray-900 dark:text-[#f5f1e8] rounded-xl transition-all"
            >
              {isDarkMode ? (
                <>
                  <Sun className="w-5 h-5" />
                  <span className="text-lg font-bold">Light Mode</span>
                </>
              ) : (
                <>
                  <Moon className="w-5 h-5" />
                  <span className="text-lg font-bold">Dark Mode</span>
                </>
              )}
            </button>
          </div>

          {/* User Info Card */}
          <div className="flex-1">
            <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl mb-6">
              <Avatar className="w-14 h-14">
                <AvatarFallback className="bg-gray-900 dark:bg-white/10 text-white dark:text-[#f5f1e8] text-lg font-bold">
                  {getInitials(userName, userEmail)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                {userName && (
                  <p className="text-sm font-bold text-gray-900 dark:text-[#f5f1e8] truncate">{userName}</p>
                )}
                {userEmail && (
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate mt-0.5">{userEmail}</p>
                )}
              </div>
            </div>

            {/* Sign Out Button */}
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-red-50 hover:bg-red-100 dark:bg-red-500/10 dark:hover:bg-red-500/20 text-red-600 dark:text-red-400 font-semibold rounded-xl transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
