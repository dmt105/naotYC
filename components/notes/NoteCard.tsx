/**
 * Document card component
 */

'use client';

import { useRouter } from 'next/navigation';
import { MoreVertical, Edit, Trash2, Eye, Loader2 } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Note } from '@/types/note.types';
import { STATUS_LABELS, STATUS_COLORS } from '@/constants/note-status';
import { formatDate } from '@/lib/utils';
import { ROUTES } from '@/constants/routes';
import { Button } from '@/components/ui/button';

interface NoteCardProps {
  note: Note;
}

export function NoteCard({ note }: NoteCardProps) {
  const router = useRouter();
  const statusColor = STATUS_COLORS[note.status];
  const statusLabel = STATUS_LABELS[note.status];
  const isTemp = typeof note.id === 'string' && note.id.startsWith('temp-');

  return (
    <div
      className={
        `bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-all transform duration-150 ${isTemp ? 'opacity-80 scale-100 pointer-events-none' : 'hover:scale-[1.01] cursor-pointer'}`
      }
      onClick={() => !isTemp && router.push(ROUTES.NOTES_DETAIL(note.id))}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-[#010b40] dark:text-white">{note.title}</h3>
              <span
                className={`px-2 py-1 text-xs font-medium rounded-full ${statusColor} text-white`}
              >
                {statusLabel}
              </span>
              {isTemp && (
                <span className="ml-2 inline-flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  <span>En création…</span>
                </span>
              )}
            </div>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">{note.content}</p>
          
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span>Auteur: {note.author.firstName} {note.author.lastName}</span>
            <span>•</span>
            <span>{formatDate(note.createdAt)}</span>
            {note.attachments.length > 0 && (
              <>
                <span>•</span>
                <span>{note.attachments.length} pièce(s) jointe(s)</span>
              </>
            )}
          </div>
        </div>

        {/* Actions dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild onClick={(e) => e.stopPropagation()}>
            <Button
              variant="ghost"
              size="icon"
              className="ml-4"
              disabled={isTemp}
            >
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenu.Trigger>
          {!isTemp && (
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[150px] bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-1 z-50"
                sideOffset={5}
                align="end"
              >
                <DropdownMenu.Item
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    router.push(ROUTES.NOTES_DETAIL(note.id));
                  }}
                >
                  <Eye className="h-4 w-4" />
                  <span>Voir</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    router.push(ROUTES.NOTES_EDIT(note.id));
                  }}
                >
                  <Edit className="h-4 w-4" />
                  <span>Modifier</span>
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-gray-200 dark:bg-gray-700 my-1" />
                <DropdownMenu.Item
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded cursor-pointer"
                  onSelect={(e) => {
                    e.preventDefault();
                    // Handle delete
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Supprimer</span>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          )}
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

