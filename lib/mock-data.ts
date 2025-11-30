import { User, Note, Template, Stats, Notification } from './types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@youthcomputing.org',
    name: 'Jean Aimé Raheriniaina',
    role: ['ADMIN'],
    department: 'Direction',
    avatar: '/avatars/admin.jpg',
    createdAt: '2024-01-15',
    isActive: true
  },
  {
    id: '2',
    email: 'chef.tech@youthcomputing.org',
    name: 'Sarah Tech',
    role: ['CHEF_DEPARTEMENT'],
    department: 'Technique',
    avatar: '/avatars/sarah.jpg',
    createdAt: '2024-02-20',
    isActive: true
  },
  {
    id: '3',
    email: 'redacteur@youthcomputing.org',
    name: 'Marc Rédacteur',
    role: ['REDACTEUR'],
    department: 'Communication',
    avatar: '/avatars/marc.jpg',
    createdAt: '2024-03-10',
    isActive: true
  },
  {
    id: '4',
    email: 'de@youthcomputing.org',
    name: 'Directeur Exécutif',
    role: ['DE'],
    department: 'Direction',
    avatar: '/avatars/de.jpg',
    createdAt: '2024-01-01',
    isActive: true
  }
];

export const mockNotes: Note[] = [
  {
    id: '1',
    title: 'Convocation réunion technique',
    content: 'Convocation pour la réunion technique du département...',
    type: 'CONVOCATION',
    status: 'APPROVED',
    author: mockUsers[2],
    recipients: [mockUsers[1], mockUsers[0]],
    attachments: ['/attachments/doc1.pdf'],
    scheduledDate: '2024-07-15T10:00:00Z',
    createdAt: '2024-06-28T09:00:00Z',
    updatedAt: '2024-06-29T14:30:00Z',
    validationHistory: [
      {
        id: '1',
        action: 'SUBMITTED',
        user: mockUsers[2],
        comment: 'Soumis pour validation',
        timestamp: '2024-06-28T09:00:00Z'
      },
      {
        id: '2',
        action: 'APPROVED',
        user: mockUsers[1],
        comment: 'Validé par le chef de département',
        timestamp: '2024-06-29T10:00:00Z'
      }
    ]
  },
  {
    id: '2',
    title: 'Rapport activités trimestrielles',
    content: 'Rapport détaillé des activités du trimestre...',
    type: 'RAPPORT',
    status: 'PENDING_VALIDATION',
    author: mockUsers[2],
    recipients: [mockUsers[3]],
    attachments: [],
    createdAt: '2024-06-29T15:00:00Z',
    updatedAt: '2024-06-29T15:00:00Z',
    validationHistory: [
      {
        id: '1',
        action: 'SUBMITTED',
        user: mockUsers[2],
        comment: 'Soumis pour validation chef de département',
        timestamp: '2024-06-29T15:00:00Z'
      }
    ]
  },
  {
    id: '3',
    title: 'Annonce événement formation',
    content: 'Annonce pour la prochaine session de formation...',
    type: 'ANNONCE',
    status: 'DRAFT',
    author: mockUsers[2],
    recipients: [],
    attachments: [],
    createdAt: '2024-06-28T16:00:00Z',
    updatedAt: '2024-06-29T11:00:00Z'
  }
];

export const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Convocation standard',
    content: 'Convocation pour réunion du département {{department}}...',
    type: 'CONVOCATION',
    variables: ['department', 'date', 'time'],
    createdAt: '2024-01-15',
    updatedAt: '2024-06-20',
    createdBy: mockUsers[0]
  },
  {
    id: '2',
    name: 'Rapport trimestriel',
    content: 'Rapport des activités du trimestre {{trimestre}}...',
    type: 'RAPPORT',
    variables: ['trimestre', 'year'],
    createdAt: '2024-02-10',
    updatedAt: '2024-05-15',
    createdBy: mockUsers[0]
  }
];

export const mockStats: Stats = {
  totalNotes: 45,
  drafts: 3,
  pendingValidation: 5,
  approved: 25,
  scheduled: 8,
  archived: 4,
  averageValidationTime: '2.5',
  readRate: '78%',
  monthlyTrend: [
    { month: 'Jan', notes: 12, read: 9 },
    { month: 'Fév', notes: 15, read: 12 },
    { month: 'Mar', notes: 18, read: 14 },
    { month: 'Avr', notes: 22, read: 17 },
    { month: 'Mai', notes: 28, read: 22 },
    { month: 'Jun', notes: 35, read: 27 }
  ]
};

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'Nouvelle note à valider',
    message: 'Une nouvelle note nécessite votre validation',
    type: 'VALIDATION',
    read: false,
    timestamp: '2024-06-29T14:30:00Z'
  },
  {
    id: '2',
    message: 'Votre note a été approuvée',
    type: 'APPROVAL',
    read: true,
    timestamp: '2024-06-29T10:00:00Z'
  }
];