import { ReceivedNote, Notification } from '@/types/destinataire'

export const mockReceivedNotes: ReceivedNote[] = [
  {
    id: '1',
    title: 'Réunion du département technique',
    content: 'Convocation à la réunion mensuelle du département technique qui se tiendra le 15 janvier 2024.',
    type: 'convocation',
    status: 'UNREAD',
    sender: {
      name: 'Marie Chef',
      email: 'chef@youthcomputing.org',
      department: 'technique'
    },
    sentAt: '2024-01-10T09:00:00Z',
    scheduledDate: '2024-01-15T14:00:00Z',
    attachments: ['agenda.pdf'],
    urgency: 'HIGH',
    canAddToCalendar: true
  },
  {
    id: '2',
    title: 'Rapport d\'activités décembre',
    content: 'Veuillez trouver ci-joint le rapport d\'activités du mois de décembre 2023.',
    type: 'rapport',
    status: 'READ',
    sender: {
      name: 'Jean Rédacteur',
      email: 'redacteur@youthcomputing.org',
      department: 'communication'
    },
    sentAt: '2024-01-05T14:30:00Z',
    attachments: ['rapport-decembre.pdf', 'annexes.zip'],
    urgency: 'MEDIUM',
    canAddToCalendar: false
  },
  {
    id: '3',
    title: 'Annonce maintenance système',
    content: 'Une maintenance planifiée du système aura lieu ce weekend. Le service sera interrompu de 22h à 2h.',
    type: 'annonce',
    status: 'ARCHIVED',
    sender: {
      name: 'Admin System',
      email: 'admin@youthcomputing.org',
      department: 'technique'
    },
    sentAt: '2024-01-08T16:45:00Z',
    urgency: 'HIGH',
    attachments: [],
    canAddToCalendar: false
  }
]

export const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'NEW_NOTE',
    title: 'Nouvelle note reçue',
    message: 'Vous avez reçu une nouvelle convocation de Marie Chef',
    isRead: false,
    createdAt: '2024-01-10T09:05:00Z',
    noteId: '1'
  },
  {
    id: '2',
    type: 'REMINDER',
    title: 'Rappel de réunion',
    message: 'Réunion du département technique dans 2 heures',
    isRead: false,
    createdAt: '2024-01-15T12:00:00Z',
    noteId: '1'
  }
]