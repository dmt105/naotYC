/**
 * User profile dropdown component
 */

'use client';

import { useRouter } from 'next/navigation';
import {
  User,
  Settings,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthStore } from '@/store/auth.store';
import { authService } from '@/services/auth.service';
import { ROLE_LABELS } from '@/constants/roles';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

interface UserProfileDropdownProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    avatar?: string;
    roles: string[];
  };
}

export function UserProfileDropdown({ user }: UserProfileDropdownProps) {
  const router = useRouter();
  const { logout } = useAuthStore();

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
      toast.success('Déconnexion réussie');
      router.push('/login');
    } catch (error) {
      // Even if API call fails, logout locally
      logout();
      router.push('/login');
    }
  };

  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const primaryRole = user.roles[0] || 'USER';

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#010b40] dark:focus:ring-[#f13544] focus:ring-offset-2"
          aria-label="Menu utilisateur"
        >
          <Avatar className="h-10 w-10 border-2 border-[#010b40] dark:border-[#f13544]">
            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-[#010b40] dark:bg-[#f13544] text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="hidden md:block text-left">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{ROLE_LABELS[primaryRole as keyof typeof ROLE_LABELS]}</p>
          </div>
          <ChevronDown className="hidden md:block h-4 w-4 text-gray-400 dark:text-gray-500" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className="min-w-[200px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-50"
          sideOffset={5}
          align="end"
        >
          {/* User info */}
          <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
          </div>

          {/* Menu items */}
          <DropdownMenu.Item
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer focus:outline-none"
            onSelect={() => router.push('/profile')}
          >
            <User className="h-4 w-4" />
            <span>Mon profil</span>
          </DropdownMenu.Item>

          <DropdownMenu.Item
            className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer focus:outline-none"
            onSelect={() => router.push('/settings')}
          >
            <Settings className="h-4 w-4" />
            <span>Paramètres</span>
          </DropdownMenu.Item>

          <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />

          <DropdownMenu.Item
            className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer focus:outline-none"
            onSelect={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span>Déconnexion</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

