/**
 * Note detail page
 */

'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { NoteStatus } from '@/types/note.types';
import { STATUS_LABELS, STATUS_COLORS } from '@/constants/note-status';
import { formatDateTime } from '@/lib/utils';
import { CommentThread } from '@/components/validation/CommentThread';
import { StatusHistory } from '@/components/validation/StatusHistory';
import { ROUTES } from '@/constants/routes';

// Mock data - replace with API call
const mockNote = {
  id: '1',
  title: 'Convention annuelle 2025',
  content: 'Nous avons le plaisir de vous convier à la convention annuelle 2025 qui se tiendra le 15 mars 2025 à Antananarivo. Cette convention réunira tous les membres de l\'association pour discuter des projets à venir et célébrer nos réalisations.',
  type: 'CONVOCATION',
  status: NoteStatus.APPROVED,
  author: {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@youthcomputing.org',
  },
  recipients: [
    { id: '2', firstName: 'Marie', lastName: 'Martin', email: 'marie@example.com' },
    { id: '3', firstName: 'Pierre', lastName: 'Durand', email: 'pierre@example.com' },
  ],
  attachments: [
    { id: '1', fileName: 'convention-2025.pdf', fileSize: 1024000 },
  ],
  createdAt: '2025-01-15T10:00:00Z',
  updatedAt: '2025-01-15T10:00:00Z',
  scheduledAt: '2025-01-20T09:00:00Z',
  sentAt: '2025-01-20T09:00:00Z',
};

export default function NoteDetailPage() {
  const params = useParams();
  const router = useRouter();
  const noteId = params.id as string;

  const statusColor = STATUS_COLORS[mockNote.status];
  const statusLabel = STATUS_LABELS[mockNote.status];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Retour</span>
        </Button>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() => router.push(ROUTES.NOTES_EDIT(noteId))}
          >
            <Edit className="h-4 w-4 mr-2" />
            Modifier
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Exporter PDF
          </Button>
        </div>
      </div>

      {/* Note Content */}
      <Card className="p-6">
        <div className="space-y-4">
          {/* Title and Status */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#010b40] mb-2">
                {mockNote.title}
              </h1>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Type: {mockNote.type}</span>
                <span>•</span>
                <span>Créé le {formatDateTime(mockNote.createdAt)}</span>
              </div>
            </div>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${statusColor} text-white`}
            >
              {statusLabel}
            </span>
          </div>

          {/* Author */}
          <div className="border-t pt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Auteur:</span> {mockNote.author.firstName}{' '}
              {mockNote.author.lastName} ({mockNote.author.email})
            </p>
          </div>

          {/* Content */}
          <div className="border-t pt-4">
            <h2 className="text-lg font-semibold text-[#010b40] mb-2">Contenu</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-wrap">{mockNote.content}</p>
            </div>
          </div>

          {/* Recipients */}
          {mockNote.recipients.length > 0 && (
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-[#010b40] mb-2">
                Destinataires ({mockNote.recipients.length})
              </h2>
              <div className="flex flex-wrap gap-2">
                {mockNote.recipients.map((recipient) => (
                  <span
                    key={recipient.id}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {recipient.firstName} {recipient.lastName}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Attachments */}
          {mockNote.attachments.length > 0 && (
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold text-[#010b40] mb-2">
                Pièces jointes ({mockNote.attachments.length})
              </h2>
              <div className="space-y-2">
                {mockNote.attachments.map((attachment) => (
                  <a
                    key={attachment.id}
                    href="#"
                    className="flex items-center space-x-2 text-blue-600 hover:underline"
                  >
                    <span>{attachment.fileName}</span>
                    <span className="text-sm text-gray-500">
                      ({(attachment.fileSize / 1024).toFixed(2)} KB)
                    </span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Schedule info */}
          {mockNote.scheduledAt && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Planifié pour:</span>{' '}
                {formatDateTime(mockNote.scheduledAt)}
              </p>
            </div>
          )}

          {mockNote.sentAt && (
            <div className="border-t pt-4">
              <p className="text-sm text-gray-600">
                <span className="font-medium">Envoyé le:</span>{' '}
                {formatDateTime(mockNote.sentAt)}
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Comments and History */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <CommentThread noteId={noteId} />
        </Card>
        <Card className="p-6">
          <StatusHistory noteId={noteId} />
        </Card>
      </div>
    </div>
  );
}





