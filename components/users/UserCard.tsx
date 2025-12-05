/**
 * User card component
 */

'use client';

import { UserProfile } from '@/types/user.types';
import { UserRole } from '@/types/auth.types';
import { ROLE_LABELS } from '@/constants/roles';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Edit, Trash2, MoreVertical } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { formatDate } from '@/lib/utils';
import { cn } from '@/lib/utils';

interface UserCardProps {
  user: UserProfile;
  onEdit: (user: UserProfile) => void;
  onDelete: (userId: string) => void;
}

export function UserCard({ user, onEdit, onDelete }: UserCardProps) {
  const initials = `${user.firstName[0]}${user.lastName[0]}`.toUpperCase();
  const primaryRole = user.roles[0] || UserRole.REDACTEUR;
  const roleLabel = ROLE_LABELS[primaryRole as keyof typeof ROLE_LABELS];

  return (
    <Card className="p-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3 flex-1">
          <Avatar className="h-12 w-12 border-2 border-[#010b40] dark:border-[#f13544]">
            <AvatarImage src={user.avatar} alt={`${user.firstName} ${user.lastName}`} />
            <AvatarFallback className="bg-[#010b40] dark:bg-[#f13544] text-white font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 dark:text-white truncate">
              {user.firstName} {user.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
            {user.department && (
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                {user.department}
              </p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 text-xs font-medium bg-[#010b40] dark:bg-[#f13544] text-white rounded">
                {roleLabel}
              </span>
              {user.roles.length > 1 && (
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  +{user.roles.length - 1}
                </span>
              )}
              <span
                className={cn(
                  'px-2 py-1 text-xs font-medium rounded',
                  user.isActive
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                )}
              >
                {user.isActive ? 'Actif' : 'Inactif'}
              </span>
            </div>
          </div>
        </div>

        {/* Actions dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="icon" className="flex-shrink-0">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[150px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-50"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                onSelect={() => onEdit(user)}
              >
                <Edit className="h-4 w-4" />
                <span>Modifier</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
                onSelect={() => onDelete(user.id)}
              >
                <Trash2 className="h-4 w-4" />
                <span>Supprimer</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </Card>
  );
}



