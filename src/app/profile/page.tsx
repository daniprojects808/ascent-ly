import { redirect } from 'next/navigation';
import { createClient } from '@/../supabase/server';

import CollapsibleSidebar from '@/components/dashboard/collapsible-sidebar';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Mail, Calendar, Shield } from 'lucide-react';

export default async function ProfilePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/sign-in');
  }

  const userEmail = user.email || '';
  const userName = user.user_metadata?.full_name || user.user_metadata?.name || '';

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#1a1d24] dark:to-[#1a1d24]">
      <CollapsibleSidebar userEmail={userEmail} userName={userName} />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <User className="w-4 h-4 text-blue-600/60 dark:text-cyan-500/60" />
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 font-medium">
                Profile
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-[#f5f1e8]">
              Account Settings
            </h1>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-8 mb-6 shadow-sm hover:shadow-md dark:hover:shadow-lg transition-shadow duration-200 dark:shadow-black/20">
          {/* Avatar Section */}
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-white/10">
            <Avatar className="w-24 h-24 border-4 border-blue-600 dark:border-cyan-500">
              <AvatarFallback className="bg-blue-600 dark:bg-cyan-600 text-white text-3xl font-bold">
                {getInitials(userName, userEmail)}
              </AvatarFallback>
            </Avatar>
            <div>
              {userName && (
                <h2 className="text-3xl font-bold text-gray-900 dark:text-[#f5f1e8] mb-1">
                  {userName}
                </h2>
              )}
              <p className="text-gray-600 dark:text-gray-400">
                {userEmail}
              </p>
            </div>
          </div>

          {/* Account Details */}
          <div className="space-y-6">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
              Account Details
            </h3>

            <div className="grid gap-4">
              {/* Email */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Email Address
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-[#f5f1e8]">
                    {userEmail}
                  </p>
                </div>
              </div>

              {/* User ID */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    User ID
                  </p>
                  <p className="text-base font-mono text-gray-700 dark:text-gray-300 break-all">
                    {user.id}
                  </p>
                </div>
              </div>

              {/* Created Date */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-colors">
                <div className="p-2 bg-blue-100 dark:bg-blue-500/20 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Member Since
                  </p>
                  <p className="text-base font-semibold text-gray-900 dark:text-[#f5f1e8]">
                    {formatDate(user.created_at)}
                  </p>
                </div>
              </div>

              {/* Account Status */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/10 hover:border-gray-200 dark:hover:border-white/20 transition-colors">
                <div className="p-2 bg-green-100 dark:bg-green-500/20 rounded-lg">
                  <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    Account Status
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 text-sm font-medium rounded-lg">
                      Active
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {user.email_confirmed_at ? 'Email Verified' : 'Email Not Verified'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
