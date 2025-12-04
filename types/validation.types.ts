/**
 * Validation workflow types and interfaces
 */

import { NoteStatus } from './note.types';

export interface ValidationAction {
  noteId: string;
  action: 'APPROVE' | 'RETURN' | 'ARCHIVE';
  comment?: string;
}

export interface ValidationHistory {
  id: string;
  noteId: string;
  validatorId: string;
  validatorName: string;
  validatorRole: string;
  action: string;
  comment?: string;
  previousStatus: NoteStatus;
  newStatus: NoteStatus;
  createdAt: string;
}

export interface ValidationStats {
  totalPending: number;
  totalApproved: number;
  totalReturned: number;
  averageValidationTime: number; // in hours
  validationRate: number; // percentage
}

