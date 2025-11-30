'use client';
import { useState } from 'react';
import { ValidationCard } from '@/components/forms/validation-form';
import { FileText } from 'lucide-react';

// Données mockées
const mockNotes = [
  {
    id: '1',
    title: 'Convocation réunion technique',
    content: 'Convocation pour la réunion technique du 20 janvier 2024...',
    type: 'CONVOCATION',
    status: 'PENDING_VALIDATION',
    author: {
      id: '1',
      name: 'Jean Dupont',
      email: 'jean@youthcomputing.org',
      role: 'REDACTOR',
      department: 'Technique'
    },
    recipients: [],
    attachments: [],
    createdAt: '2024-01-15T10:30:00Z',
    updatedAt: '2024-01-15T10:30:00Z',
    comments: [],
    history: []
  },
  {
    id: '2',
    title: 'Rapport activité janvier',
    content: 'Rapport des activités du département communication pour le mois de janvier...',
    type: 'REPORT',
    status: 'PENDING_VALIDATION', 
    author: {
      id: '2',
      name: 'Marie Martin',
      email: 'marie@youthcomputing.org',
      role: 'REDACTOR',
      department: 'Communication'
    },
    recipients: [],
    attachments: [],
    createdAt: '2024-01-14T15:45:00Z',
    updatedAt: '2024-01-14T15:45:00Z',
    comments: [],
    history: []
  }
];

export default function ValidationPage() {
  const [notes] = useState(mockNotes);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Validation des notes</h1>
        <p className="text-gray-600">
          {notes.length} note(s) en attente de validation
        </p>
      </div>

      <div className="space-y-4">
        {notes.map((note) => (
          <ValidationCard key={note.id} note={note} />
        ))}
        
        {notes.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Aucune note en attente de validation</p>
          </div>
        )}
      </div>
    </div>
  );
}