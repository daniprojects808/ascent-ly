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
    <nav className="w-full border-b border-gray-200 bg-white py-2">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" prefetch className="text-xl font-bold">
          Logo
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <Button>
                  Dashboard
                </Button>
              </Link>
              <UserProfile  />
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 text-sm font-medium text-white bg-black rounded-md hover:bg-gray-800"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
