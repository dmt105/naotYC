import { NoteStatus } from './enum'

export interface NoteDTO {
  id: string
  title: string
  content: string
  type: string
  status: NoteStatus
  author: {
    id: string
    name: string
    email: string
  }
  department: string
  attachments: string[]
  recipients: string[]
  scheduledDate?: string
  createdAt: string
  updatedAt: string
  comments: CommentDTO[]
  validationHistory: ValidationStepDTO[]
}

export interface CommentDTO {
  id: string
  author: string
  content: string
  createdAt: string
  mentions: string[]
}

export interface ValidationStepDTO {
  id: string
  validator: string
  role: string
  action: 'APPROVED' | 'RETURNED' | 'COMMENTED'
  comment?: string
  timestamp: string
}

export interface NoteCreateDTO {
  title: string
  content: string
  type: string
  department: string
  recipients: string[]
  attachments: File[]
  scheduledDate?: string
}

export interface NoteUpdateDTO {
  title?: string
  content?: string
  type?: string
  recipients?: string[]
  attachments?: File[]
  scheduledDate?: string
}

export type NoteType = 'ANNOUNCEMENT' | 'MEETING' | 'REPORT' | 'OTHER'

export { NoteStatus }
