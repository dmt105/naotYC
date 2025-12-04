/**
 * Status history component - displays status changes timeline
 */

'use client';

import { useState } from 'react';
import { Clock, CheckCircle, XCircle, Archive } from 'lucide-react';
import { NoteStatus } from '@/types/note.types';
import { formatDateTime } from '@/lib/utils';
import { STATUS_LABELS } from '@/constants/note-status';

interface StatusHistoryItem {
  id: string;
  status: NoteStatus;
  validator: string;
  comment?: string;
  timestamp: string;
}

// Mock data
const mockHistory: StatusHistoryItem[] = [
  {
    id: '1',
    status: NoteStatus.DRAFT,
    validator: 'Marie Martin',
    timestamp: '2025-01-13T10:00:00Z',
  },
  {
    id: '2',
    status: NoteStatus.PENDING_VALIDATION,
    validator: 'Marie Martin',
    timestamp: '2025-01-14T14:30:00Z',
  },
];

interface StatusHistoryProps {
  noteId: string;
}

export function StatusHistory({ noteId }: StatusHistoryProps) {
  const [history] = useState<StatusHistoryItem[]>(mockHistory);

  const getStatusIcon = (status: NoteStatus) => {
    switch (status) {
      case NoteStatus.APPROVED:
        return CheckCircle;
      case NoteStatus.RETURNED:
        return XCircle;
      case NoteStatus.ARCHIVED:
        return Archive;
      default:
        return Clock;
    }
  };

  const getStatusColor = (status: NoteStatus) => {
    switch (status) {
      case NoteStatus.APPROVED:
        return 'text-green-500';
      case NoteStatus.RETURNED:
        return 'text-red-500';
      case NoteStatus.ARCHIVED:
        return 'text-gray-500';
      default:
        return 'text-yellow-500';
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Aucun historique disponible</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#010b40]">Historique des statuts</h3>
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gray-200" />

        {/* Timeline items */}
        <div className="space-y-6">
          {history.map((item, index) => {
            const Icon = getStatusIcon(item.status);
            const colorClass = getStatusColor(item.status);

            return (
              <div key={item.id} className="relative flex items-start space-x-4">
                {/* Icon */}
                <div className={`relative z-10 ${colorClass} bg-white p-1 rounded-full`}>
                  <Icon className="h-5 w-5" />
                </div>

                {/* Content */}
                <div className="flex-1 pt-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {STATUS_LABELS[item.status]}
                      </p>
                      <p className="text-sm text-gray-600">
                        par {item.validator}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDateTime(item.timestamp)}
                    </span>
                  </div>
                  {item.comment && (
                    <p className="mt-2 text-sm text-gray-700 bg-gray-50 p-2 rounded">
                      {item.comment}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

