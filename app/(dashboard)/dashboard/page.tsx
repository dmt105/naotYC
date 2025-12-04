/**
 * Dashboard page - personalized by role
 */

'use client';

import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { NotesOverview } from '@/components/dashboard/NotesOverview';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { useAuthStore } from '@/store/auth.store';
import { ROLE_LABELS } from '@/constants/roles';

export default function DashboardPage() {
  const { user } = useAuthStore();

  if (!user) return null;

  const primaryRole = user.roles[0] || 'USER';
  const roleLabel = ROLE_LABELS[primaryRole as keyof typeof ROLE_LABELS];

  return (
    <div className="space-y-6">
      {/* Welcome section */}
      <div>
        <h1 className="text-3xl font-bold text-[#010b40] dark:text-white">
          Bienvenue, {user.firstName} !
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          {roleLabel} • Dashboard NaotY
        </p>
      </div>

      {/* Statistics cards */}
      <DashboardStats />

      {/* Notes overview and recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <NotesOverview />
        <RecentActivity />
      </div>
    </div>
  );
}

