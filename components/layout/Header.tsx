/**
 * Header component with user profile dropdown
 */

'use client';

import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { UserProfileDropdown } from './UserProfileDropdown';
import { ThemeToggle } from './ThemeToggle';
import { NotificationBell } from './NotificationBell';
import { useAuthStore } from '@/store/auth.store';

export function Header() {
  const { user } = useAuthStore();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        {/* Search bar */}
        <div className="hidden md:flex flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <Input
              type="search"
              placeholder="Rechercher un document, un utilisateur..."
              className="pl-10 w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100"
            />
          </div>
        </div>

        {/* Right side - Theme Toggle, Notifications and Profile */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Notifications */}
          <NotificationBell />

          {/* User Profile Dropdown */}
          {user && <UserProfileDropdown user={user} />}
        </div>
      </div>
    </header>
  );
}

