/**
 * Validation panel component - displays documents pending validation
 */

'use client';

import { useState } from 'react';
import { EmptyState } from '@/components/common/EmptyState';
import { CheckCircle } from 'lucide-react';
import { Note, NoteStatus, NoteType } from '@/types/note.types';

// Mock data - replace with API call
const mockPendingNotes: Note[] = [
  {
    id: '1',
    title: 'Rapport mensuel - Décembre',
    content: 'Rapport des activités du mois de décembre...',
  type: NoteType.RAPPORT,
    status: NoteStatus.PENDING_VALIDATION,
    authorId: '2',
    author: {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
      email: 'marie.martin@youthcomputing.org',
    },
    recipients: [],
    attachments: [],
    createdAt: '2025-01-14T14:30:00Z',
    updatedAt: '2025-01-14T14:30:00Z',
  },
  {
    id: '2',
    title: 'Annonce réunion équipe',
    content: 'Réunion prévue le 20 janvier...',
  type: NoteType.ANNONCE,
    status: NoteStatus.PENDING_VALIDATION,
    authorId: '3',
    author: {
      id: '3',
      firstName: 'Pierre',
      lastName: 'Durand',
      email: 'pierre.durand@youthcomputing.org',
    },
    recipients: [],
    attachments: [],
    createdAt: '2025-01-13T10:00:00Z',
    updatedAt: '2025-01-13T10:00:00Z',
  },
];

interface ValidationPanelProps {
  searchQuery?: string;
  filterStatus?: string;
}

export function ValidationPanel({ searchQuery = '', filterStatus = 'all' }: ValidationPanelProps) {
  const [notes] = useState<Note[]>(mockPendingNotes);

  // Filter notes
  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = filterStatus === 'all' || note.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  if (filteredNotes.length === 0) {
    return (
      <EmptyState
        icon={CheckCircle}
        title="Aucun document en attente"
        description="Tous les documents ont été traités"
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredNotes.map((note) => (
        <ValidationNoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

/**
 * Validation note card with validation actions
 */
function ValidationNoteCard({ note }: { note: Note }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="mb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-[#010b40] mb-2">{note.title}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{note.content}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>Auteur: {note.author.firstName} {note.author.lastName}</span>
              <span>•</span>
              <span>{new Date(note.createdAt).toLocaleDateString('fr-FR')}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <ValidationActions noteId={note.id} />
      </div>
    </div>
  );
}

/**
 * Validation actions component
 */
function ValidationActions({ noteId }: { noteId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Approve note:', noteId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // toast.success('Note approuvée avec succès');
    } catch (error) {
      // toast.error('Erreur lors de l\'approbation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      console.log('Return note:', noteId);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // toast.success('Note retournée');
    } catch (error) {
      // toast.error('Erreur lors du retour');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <button
        onClick={handleApprove}
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Traitement...' : 'Approuver'}
      </button>
      <button
        onClick={handleReturn}
        disabled={isLoading}
        className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50"
      >
        {isLoading ? 'Traitement...' : 'Retourner'}
      </button>
    </div>
  );
}

