'use client';
import Link from 'next/link';
import { FileText, Clock, User, ArrowRight } from 'lucide-react';

interface ValidationNote {
  id: string;
  title: string;
  author: {
    name: string;
    department: string;
  };
  createdAt: string;
  type: string;
  priority?: 'low' | 'medium' | 'high';
}

interface ValidationQueueProps {
  notes: ValidationNote[];
}

export function ValidationQueue({ notes }: ValidationQueueProps) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'CONVOCATION':
        return 'bg-blue-100 text-blue-800';
      case 'REPORT':
        return 'bg-green-100 text-green-800';
      case 'ANNOUNCEMENT':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'CONVOCATION':
        return 'Convocation';
      case 'REPORT':
        return 'Rapport';
      case 'ANNOUNCEMENT':
        return 'Annonce';
      case 'MEMORANDUM':
        return 'Mémorandum';
      default:
        return type;
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) {
      return 'Hier';
    } else if (diffDays === 0) {
      return "Aujourd'hui";
    } else if (diffDays < 7) {
      return `Il y a ${diffDays} jours`;
    } else {
      return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'short'
      });
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      {/* En-tête */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Clock className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                File d'attente de validation
              </h3>
              <p className="text-sm text-gray-600">
                {notes.length} note(s) en attente
              </p>
            </div>
          </div>
          <Link
            href="/validation"
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
            <Link href={`/validation/${note.id}`}>
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(
                        note.type
                      )}`}
                    >
                      {getTypeLabel(note.type)}
                    </span>
                    {note.priority && (
                      <span
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
                          note.priority
                        )}`}
                      >
                        {note.priority === 'high' && 'Priorité haute'}
                        {note.priority === 'medium' && 'Priorité moyenne'}
                        {note.priority === 'low' && 'Priorité basse'}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-medium text-gray-900 truncate mb-1">
                    {note.title}
                  </h4>

                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User className="w-3 h-3" />
                      <span>{note.author.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <FileText className="w-3 h-3" />
                      <span>{note.author.department}</span>
                    </div>
                    <span>{formatDate(note.createdAt)}</span>
                  </div>
                </div>

                <div className="ml-4 flex-shrink-0">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></div>
                </div>
              </div>
            </Link>
          </div>
        ))}

        {notes.length === 0 && (
          <div className="px-6 py-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">
              Aucune note en attente de validation
            </p>
            <p className="text-gray-400 text-xs mt-1">
              Les nouvelles notes apparaîtront ici
            </p>
          </div>
        )}
      </div>

      {/* Pied de page */}
      {notes.length > 5 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <Link
            href="/validation"
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