/**
 * Dashboard statistics cards component
 */

'use client';

import { FileText, Clock, CheckCircle, Archive } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';

// Mock data - replace with actual API calls
type StatsByRole = {
  [UserRole.REDACTEUR]: { drafts: number; pending: number; approved: number; archived: number };
  [UserRole.CHEF_DEPARTEMENT]: { pending: number; approved: number; returned: number; archived: number };
  [UserRole.DIRECTEUR_EXECUTIF]: { pending: number; approved: number; scheduled: number; archived: number };
  [UserRole.DESTINATAIRE]: { unread: number; read: number; archived: number };
  [UserRole.ADMIN]: { totalNotes: number; totalUsers: number; pendingValidation: number; archived: number };
};

const mockStats: StatsByRole = {
  [UserRole.REDACTEUR]: {
    drafts: 3,
    pending: 2,
    approved: 12,
    archived: 45,
  },
  [UserRole.CHEF_DEPARTEMENT]: {
    pending: 8,
    approved: 24,
    returned: 2,
    archived: 120,
  },
  [UserRole.DIRECTEUR_EXECUTIF]: {
    pending: 5,
    approved: 18,
    scheduled: 3,
    archived: 200,
  },
  [UserRole.DESTINATAIRE]: {
    unread: 7,
    read: 23,
    archived: 56,
  },
  [UserRole.ADMIN]: {
    totalNotes: 450,
    totalUsers: 25,
    pendingValidation: 13,
    archived: 320,
  },
};

export function DashboardStats() {
  const { user } = useAuthStore();

  if (!user) return null;

  const primaryRole = user.roles[0] || UserRole.REDACTEUR;
  const stats = mockStats[primaryRole as keyof StatsByRole] || mockStats[UserRole.REDACTEUR];

  // Define stats cards based on role
  const getStatsCards = () => {
    switch (primaryRole) {
      case UserRole.REDACTEUR: {
        const redacteurStats = stats as StatsByRole[UserRole.REDACTEUR];
        return [
          { label: 'Brouillons', value: redacteurStats.drafts, icon: FileText, color: 'bg-gray-500' },
          { label: 'En attente', value: redacteurStats.pending, icon: Clock, color: 'bg-yellow-500' },
          { label: 'Approuvées', value: redacteurStats.approved, icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Archivées', value: redacteurStats.archived, icon: Archive, color: 'bg-gray-400' },
        ];
      }
      case UserRole.CHEF_DEPARTEMENT:
      case UserRole.DIRECTEUR_EXECUTIF: {
        const validatorStats = stats as StatsByRole[UserRole.CHEF_DEPARTEMENT];
        return [
          { label: 'À valider', value: validatorStats.pending, icon: Clock, color: 'bg-yellow-500' },
          { label: 'Approuvées', value: validatorStats.approved, icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Retournées', value: validatorStats.returned, icon: FileText, color: 'bg-red-500' },
          { label: 'Archivées', value: validatorStats.archived, icon: Archive, color: 'bg-gray-400' },
        ];
      }
      case UserRole.DESTINATAIRE: {
        const destinataireStats = stats as StatsByRole[UserRole.DESTINATAIRE];
        return [
          { label: 'Non lues', value: destinataireStats.unread, icon: FileText, color: 'bg-blue-500' },
          { label: 'Lues', value: destinataireStats.read, icon: CheckCircle, color: 'bg-green-500' },
          { label: 'Archivées', value: destinataireStats.archived, icon: Archive, color: 'bg-gray-400' },
        ];
      }
      case UserRole.ADMIN: {
        const adminStats = stats as StatsByRole[UserRole.ADMIN];
        return [
          { label: 'Total Notes', value: adminStats.totalNotes, icon: FileText, color: 'bg-[#010b40]' },
          { label: 'Utilisateurs', value: adminStats.totalUsers, icon: FileText, color: 'bg-[#f13544]' },
          { label: 'En validation', value: adminStats.pendingValidation, icon: Clock, color: 'bg-yellow-500' },
          { label: 'Archivées', value: adminStats.archived, icon: Archive, color: 'bg-gray-400' },
        ];
      }
      default:
        return [];
    }
  };

  const statsCards = getStatsCards();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
                <p className="text-3xl font-bold text-[#010b40] dark:text-white mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}

