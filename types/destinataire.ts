
export interface ReceivedNote {
  id: string
  title: string
  content: string
  type: 'annonce' | 'convocation' | 'rapport' | 'compte-rendu'
  status: 'UNREAD' | 'READ' | 'ARCHIVED'
  sender: {
    name: string
    email: string
    department: string
  }
  sentAt: string
  scheduledDate?: string
  attachments: string[]
  urgency: 'LOW' | 'MEDIUM' | 'HIGH'
  canAddToCalendar: boolean
}

export interface Notification {
  id: string
  type: 'NEW_NOTE' | 'REMINDER' | 'SYSTEM'
  title: string
  message: string
  isRead: boolean
  createdAt: string
  noteId?: string
}