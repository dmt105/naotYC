/**
 * Notes list component (div-based, not table)
 */

'use client';

import { useState } from 'react';
import { NoteCard } from './NoteCard';
import { EmptyState } from '@/components/common/EmptyState';
import { FileText } from 'lucide-react';
import { Note, NoteStatus } from '@/types/note.types';

// Mock data - replace with API call
const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Convention annuelle 2025',
    content: 'Organisation de la convention annuelle...',
    type: 'CONVOCATION',
    status: NoteStatus.APPROVED,
    authorId: '1',
    author: {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@youthcomputing.org',
    },
    recipients: [],
    attachments: [],
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Rapport mensuel - Décembre',
    content: 'Rapport des activités du mois de décembre...',
    type: 'RAPPORT',
    status: NoteStatus.PENDING_VALIDATION,
    authorId: '1',
    author: {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
      email: 'jean.dupont@youthcomputing.org',
    },
    recipients: [],
    attachments: [],
    createdAt: '2025-01-14T14:30:00Z',
    updatedAt: '2025-01-14T14:30:00Z',
  },
];

interface NoteListProps {
  searchQuery?: string;
}

export function NoteList({ searchQuery = '' }: NoteListProps) {
  const [notes] = useState<Note[]>(mockNotes);

  // Filter notes by search query
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredNotes.length === 0) {
    return (
      <EmptyState
        icon={FileText}
        title="Aucune note trouvée"
        description={
          searchQuery
            ? 'Aucune note ne correspond à votre recherche'
            : 'Commencez par créer votre première note'
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredNotes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

