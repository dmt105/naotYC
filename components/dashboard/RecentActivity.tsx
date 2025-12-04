/**
 * Recent activity component
 */

'use client';

import { Card } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock, User } from 'lucide-react';
import { formatRelativeTime } from '@/lib/utils';

// Mock data
const recentActivities = [
  {
    id: '1',
    type: 'validation',
    action: 'Approuvée',
    noteTitle: 'Convention annuelle 2025',
    user: 'Jean Dupont',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    icon: CheckCircle,
    color: 'text-green-500',
  },
  {
    id: '2',
    type: 'return',
    action: 'Retournée',
    noteTitle: 'Rapport mensuel',
    user: 'Marie Martin',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
    icon: XCircle,
    color: 'text-red-500',
  },
  {
    id: '3',
    type: 'creation',
    action: 'Créée',
    noteTitle: 'Annonce réunion',
    user: 'Pierre Durand',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    icon: Clock,
    color: 'text-blue-500',
  },
];

export function RecentActivity() {
  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-[#010b40] dark:text-white mb-4">Activité Récente</h2>

      <div className="space-y-4">
        {recentActivities.map((activity) => {
          const Icon = activity.icon;
          return (
            <div key={activity.id} className="flex items-start space-x-3">
              <div className={`${activity.color} p-2 rounded-lg`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900 dark:text-gray-100">
                  <span className="font-medium">{activity.noteTitle}</span> {activity.action.toLowerCase()}
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <User className="h-3 w-3 text-gray-400 dark:text-gray-500" />
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.user}</p>
                  <span className="text-xs text-gray-400 dark:text-gray-600">•</span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

