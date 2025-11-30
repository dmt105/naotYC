'use client';
import Link from 'next/link';
import { FileText, Calendar, User, ArrowRight } from 'lucide-react';

interface Note {
  id: string;
  title: string;
  status: string;
  createdAt: string;
  type: string;
}

interface NotesListProps {
  notes: Note[];
}

export function NotesList({ notes }: NotesListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'bg-gray-100 text-gray-800';
      case 'PENDING_VALIDATION':
        return 'bg-orange-100 text-orange-800';
      case 'APPROVED':
        return 'bg-green-100 text-green-800';
      case 'RETURNED':
        return 'bg-red-100 text-red-800';
      case 'SCHEDULED':
        return 'bg-blue-100 text-blue-800';
      case 'SENT':
        return 'bg-purple-100 text-purple-800';
      case 'ARCHIVED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'DRAFT':
        return 'Brouillon';
      case 'PENDING_VALIDATION':
        return 'En validation';
      case 'APPROVED':
        return 'Approuvée';
      case 'RETURNED':
        return 'Retournée';
      case 'SCHEDULED':
        return 'Planifiée';
      case 'SENT':
        return 'Envoyée';
      case 'ARCHIVED':
        return 'Archivée';
      default:
        return status;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                Notes récentes
              </h3>
              <p className="text-sm text-gray-600">
                Dernières activités sur les notes
              </p>
            </div>
          </div>
          <Link
            href="/notes"
            className="flex items-center space-x-1 text-sm font-medium text-[#010b40] hover:text-[#010b40]/80"
          >
            <span>Voir tout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Liste des notes */}
      <div className="divide-y divide-gray-100">
        {notes.slice(0, 5).map((note) => (
          <div
            key={note.id}
            className="px-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <Link href={`/notes/${note.id}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        note.status
                      )}`}
                    >
                      {getStatusLabel(note.status)}
                    </span>
                  </div>

                  <h4 className="text-sm font-medium text-gray-900 mb-2 line-clamp-2">
                    {note.title}
                  </h4>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-3 h-3" />
                      <span className="capitalize">{note.type.toLowerCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="px-6 py-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Aucune note récente</p>
            <p className="text-gray-400 text-xs mt-1">
              Les notes créées ou modifiées apparaîtront ici
            </p>
          </div>
        )}
      </div>

      {/* Pied de page */}
      {notes.length > 5 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <Link
            href="/notes"
            className="text-sm font-medium text-[#010b40] hover:text-[#010b40]/80 flex items-center justify-center"
          >
            Voir les {notes.length - 5} autres notes
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      )}
    </div>
  );
}