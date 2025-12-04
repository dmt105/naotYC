/**
 * Note status constants and labels
 */

import { NoteStatus } from '@/types/note.types';

export const STATUS_LABELS: Record<NoteStatus, string> = {
  [NoteStatus.DRAFT]: 'Brouillon',
  [NoteStatus.PENDING_VALIDATION]: 'En attente de validation',
  [NoteStatus.RETURNED]: 'Retourné',
  [NoteStatus.APPROVED]: 'Approuvé',
  [NoteStatus.SCHEDULED]: 'Planifié',
  [NoteStatus.SENT]: 'Envoyé',
  [NoteStatus.ARCHIVED]: 'Archivé',
};

export const STATUS_COLORS: Record<NoteStatus, string> = {
  [NoteStatus.DRAFT]: 'bg-gray-500',
  [NoteStatus.PENDING_VALIDATION]: 'bg-yellow-500',
  [NoteStatus.RETURNED]: 'bg-red-500',
  [NoteStatus.APPROVED]: 'bg-green-500',
  [NoteStatus.SCHEDULED]: 'bg-blue-500',
  [NoteStatus.SENT]: 'bg-purple-500',
  [NoteStatus.ARCHIVED]: 'bg-gray-400',
};

export const STATUS_ICONS: Record<NoteStatus, string> = {
  [NoteStatus.DRAFT]: 'FileText',
  [NoteStatus.PENDING_VALIDATION]: 'Clock',
  [NoteStatus.RETURNED]: 'XCircle',
  [NoteStatus.APPROVED]: 'CheckCircle',
  [NoteStatus.SCHEDULED]: 'Calendar',
  [NoteStatus.SENT]: 'Send',
  [NoteStatus.ARCHIVED]: 'Archive',
};

