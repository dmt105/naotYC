/**
 * Notes overview component
 */

'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

// Mock data
const recentNotes = [
  { id: '1', title: 'Convention annuelle 2025', status: 'APPROVED', date: '2025-01-15' },
  { id: '2', title: 'Rapport mensuel - Décembre', status: 'PENDING_VALIDATION', date: '2025-01-14' },
  { id: '3', title: 'Annonce réunion équipe', status: 'DRAFT', date: '2025-01-13' },
];

export function NotesOverview() {
  const router = useRouter();

  return (
    <Card className="p-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
  <h2 className="text-xl font-semibold text-[#010b40] dark:text-white">Mes Documents Récents</h2>
        <Button
          onClick={() => router.push(ROUTES.NOTES_CREATE)}
          className="bg-[#010b40] hover:bg-[#010b40]/90 dark:bg-[#f13544] dark:hover:bg-[#f13544]/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Nouveau document
        </Button>
      </div>

      <div className="space-y-3">
        {recentNotes.length > 0 ? (
          recentNotes.map((note) => (
            <div
              key={note.id}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
              onClick={() => router.push(ROUTES.NOTES_DETAIL(note.id))}
            >
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{note.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{note.date}</p>
                </div>
              </div>
              <span className="px-2 py-1 text-xs font-medium bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded">
                {note.status}
              </span>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300 dark:text-gray-600" />
            <p>Aucun document récent</p>
          </div>
        )}
      </div>
    </Card>
  );
}

