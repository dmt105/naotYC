/**
 * User list component
 */

'use client';

import { UserProfile } from '@/types/user.types';
import { UserRole } from '@/types/auth.types';
import { ROLE_LABELS } from '@/constants/roles';
import { UserCard } from './UserCard';
import { EmptyState } from '@/components/common/EmptyState';
import { Users, Loader2 } from 'lucide-react';

interface UserListProps {
  users: UserProfile[];
  isLoading: boolean;
  onEdit: (user: UserProfile) => void;
  onDelete: (userId: string) => void;
}

export function UserList({ users, isLoading, onEdit, onDelete }: UserListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-[#010b40] dark:text-[#f13544]" />
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="Aucun utilisateur"
        description="Commencez par créer un nouvel utilisateur"
      />
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {users.map((user) => (
        <UserCard
          key={user.id}
          user={user}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}



