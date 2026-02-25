'use client';

import { useState, useEffect } from 'react';
import { LayoutDashboard, User, LogOut, Moon, Sun, ChevronRight, Briefcase, PanelLeftOpen, PanelLeftClose } from 'lucide-react';
import { createClient } from '../../../supabase/client';
import { useRouter, usePathname } from 'next/navigation';

interface CollapsibleSidebarProps {
  userEmail?: string;
  userName?: string;
}

export default function CollapsibleSidebar({ userEmail, userName }: CollapsibleSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const supabase = createClient();

  useEffect(() => {
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
      return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    }
    return email?.charAt(0).toUpperCase() || 'U';
  };

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
    { icon: User, label: 'Profile', href: '/profile' },
  ];

  return (
    <>
      {/* Toggle Button — always visible */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed top-5 left-5 z-50 p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
        title={isOpen ? 'Close sidebar' : 'Open sidebar'}
      >
        {isOpen
          ? <PanelLeftClose className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          : <PanelLeftOpen className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        }
      </button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-full w-60 z-50 flex flex-col
          bg-white dark:bg-[#13151a]
          border-r border-gray-100 dark:border-white/[0.06]
          transform transition-transform duration-200 ease-out
          ${isOpen ? 'translate-x-0 shadow-xl shadow-black/[0.08]' : '-translate-x-full'}
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-gray-100 dark:border-white/[0.06] flex-shrink-0">
          <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-3 h-3 text-white" />
          </div>
          <span className="font-semibold text-sm text-gray-900 dark:text-white tracking-tight">Ascent-ly</span>
          <button
            onClick={() => setIsOpen(false)}
            className="ml-auto p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-white/[0.06] transition-colors"
          >
            <PanelLeftClose className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
            Workspace
          </p>
          {navItems.map(({ icon: Icon, label, href }) => {
            const isActive = pathname === href;
            return (
              <button
                key={href}
                onClick={() => { router.push(href); setIsOpen(false); }}
                className={`w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm font-medium transition-all group
                  ${isActive
                    ? 'bg-gray-100 dark:bg-white/[0.08] text-gray-900 dark:text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-colors ${isActive ? 'text-violet-500' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300'}`} />
                <span>{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-gray-300 dark:text-gray-600" />}
              </button>
            );
          })}

          <div className="pt-3 pb-1">
            <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-600">
              Preferences
            </p>
            <button
              onClick={toggleTheme}
              className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/[0.04] hover:text-gray-900 dark:hover:text-white transition-all group"
            >
              {isDarkMode
                ? <Sun className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-amber-400 transition-colors" />
                : <Moon className="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-indigo-400 transition-colors" />
              }
              <span>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
          </div>
        </nav>

        {/* Footer */}
        <div className="px-2 py-2 border-t border-gray-100 dark:border-white/[0.06] flex-shrink-0">
          <div className="flex items-center gap-2.5 px-2.5 py-2 rounded-md bg-gray-50 dark:bg-white/[0.03] mb-0.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[10px] font-bold leading-none">
                {getInitials(userName, userEmail)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              {userName && (
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate leading-tight">{userName}</p>
              )}
              {userEmail && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate leading-tight">{userEmail}</p>
              )}
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-red-50 dark:hover:bg-red-500/[0.08] hover:text-red-600 dark:hover:text-red-400 transition-all group"
          >
            <LogOut className="w-4 h-4 flex-shrink-0 group-hover:text-red-500 dark:group-hover:text-red-400 transition-colors" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </>
  );
}
