/**
 * Documents list component (div-based, not table)
 */

"use client";

import React, { useEffect, useState, useCallback } from 'react';
import { NoteCard } from './NoteCard';
import { EmptyState } from '@/components/common/EmptyState';
import { FileText } from 'lucide-react';
import { Note, NoteStatus, NoteType } from '@/types/note.types';
import { notesService } from '@/services/notes.service';
import { Button } from '@/components/ui/button';
import { NoteFormModal } from './NoteFormModal';
import toast from 'react-hot-toast';

// Component will fetch from API via notesService

interface NoteListProps {
  searchQuery?: string;
}

export function NoteList({ searchQuery = '' }: NoteListProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 10;

  const fetchNotes = useCallback(
    async (opts?: { page?: number; append?: boolean }) => {
      const requestedPage = opts?.page ?? page;
      const append = opts?.append ?? false;
      if (requestedPage <= 1) setIsLoading(true);
      else setIsLoadingMore(true);
      setError(null);
      try {
        const res = await notesService.getNotes({ page: requestedPage, limit, search: searchQuery });
        // res is PaginatedResponse<Note>
        if (append) {
          setNotes((prev) => [...(prev || []), ...(res.data || [])]);
        } else {
          setNotes(res.data || []);
        }
        setPage(res.pagination?.page || requestedPage);
        setTotalPages(res.pagination?.totalPages || 1);
      } catch (err: any) {
        setError(err?.response?.data?.message || err.message || 'Erreur lors du chargement');
      } finally {
        setIsLoading(false);
        setIsLoadingMore(false);
      }
    },
    [page, searchQuery]
  );

  useEffect(() => {
    // When search query changes, reset to page 1 and refetch
    setPage(1);
    fetchNotes({ page: 1, append: false });

    const onCreating = (e: Event) => {
      const custom = e as CustomEvent & { detail?: Partial<Note> };
      if (custom?.detail) {
        // Prepend optimistic note
        setNotes((prev) => [custom.detail as Note, ...(prev || [])]);
      }
    };

    const onCreated = (e: Event) => {
      const custom = e as CustomEvent | any;
      if (custom?.detail) {
        const { tempId, created } = custom.detail;
        if (tempId && created) {
          setNotes((prev) => {
            const idx = prev.findIndex((n) => n.id === tempId);
            if (idx === -1) return [created, ...(prev || [])];
            const next = [...prev];
            next[idx] = created;
            return next;
          });
        } else {
          setNotes((prev) => [custom.detail, ...(prev || [])]);
        }
      } else {
        fetchNotes();
      }
    };

    const onCreateFailed = (e: Event) => {
      const custom = e as CustomEvent | any;
      const { tempId, error } = custom?.detail || {};
      if (tempId) {
        setNotes((prev) => (prev || []).filter((n) => n.id !== tempId));
      }
      toast.error(error?.response?.data?.message || error?.message || 'Erreur lors de la création');
    };

  window.addEventListener('note:creating', onCreating as EventListener);
    window.addEventListener('note:created', onCreated as EventListener);
    window.addEventListener('note:create_failed', onCreateFailed as EventListener);

    return () => {
      window.removeEventListener('note:creating', onCreating as EventListener);
      window.removeEventListener('note:created', onCreated as EventListener);
      window.removeEventListener('note:create_failed', onCreateFailed as EventListener);
    };
  }, [fetchNotes]);

  // Filter notes by search query locally as a fallback (server already filters when searchQuery provided)
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#010b40]" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Documents</h2>
        <Button onClick={() => setIsModalOpen(true)}>Créer un document</Button>
      </div>

      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={error ? 'Erreur' : 'Aucun document trouvé'}
          description={
            error
              ? error
              : searchQuery
              ? 'Aucun document ne correspond à votre recherche'
              : 'Commencez par créer votre premier document'
          }
        />
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} />
          ))}
        </div>
      )}

      {/* Load more */}
      {totalPages > page && (
        <div className="mt-4 flex justify-center">
          <Button
            variant="outline"
            onClick={async () => {
              const next = page + 1;
              await fetchNotes({ page: next, append: true });
            }}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? 'Chargement...' : 'Charger plus'}
          </Button>
        </div>
      )}

      <NoteFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}





