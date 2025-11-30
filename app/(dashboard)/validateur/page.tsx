'use client';
import { StatsCards } from '@/components/dashboard/stats-cards';
import { ValidationQueue } from '@/components/dashboard/validation-queue';
import { NotesList } from '@/components/dashboard/notes-list';

// Données mockées pour le dashboard
const mockStats = {
  pendingValidation: 5,
  approved: 12,
  returned: 2,
  archived: 45
};

const mockValidationQueue = [
  {
    id: '1',
    title: 'Convocation réunion technique',
    author: { name: 'Jean Dupont', department: 'Technique' },
    createdAt: '2024-01-15T10:30:00Z',
    type: 'CONVOCATION'
  },
  {
    id: '2',
    title: 'Rapport activité janvier',
    author: { name: 'Marie Martin', department: 'Communication' },
    createdAt: '2024-01-14T15:45:00Z',
    type: 'REPORT'
  }
];

const recentNotes = [
  {
    id: '1',
    title: 'Note importante',
    status: 'APPROVED',
    createdAt: '2024-01-15T08:00:00Z',
    type: 'ANNOUNCEMENT'
  },
  {
    id: '2', 
    title: 'Compte rendu réunion',
    status: 'PENDING_VALIDATION',
    createdAt: '2024-01-14T16:30:00Z',
    type: 'REPORT'
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <p className="text-gray-600">Bienvenue dans l'interface Chef de Département</p>
      </div>

      <StatsCards stats={mockStats} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ValidationQueue notes={mockValidationQueue} />
        <NotesList notes={recentNotes} />
      </div>
    </div>
  );
}