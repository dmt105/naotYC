export const COLORS = {
  primary: '#010b40',
  secondary: '#f13544',
  gray: '#999999',
  background: '#ffffff',
  text: '#333333'
} as const;

export const NOTE_STATUS = {
  DRAFT: { label: 'Brouillon', color: 'gray' },
  PENDING_VALIDATION: { label: 'En attente de validation', color: 'orange' },
  RETURNED: { label: 'Retournée', color: 'red' },
  APPROVED: { label: 'Approuvée', color: 'green' },
  SCHEDULED: { label: 'Planifiée', color: 'blue' },
  SENT: { label: 'Envoyée', color: 'purple' },
  ARCHIVED: { label: 'Archivée', color: 'gray' }
} as const;

export const NOTE_TYPES = {
  CONVOCATION: 'Convocation',
  REPORT: 'Rapport',
  ANNOUNCEMENT: 'Annonce',
  MEMORANDUM: 'Mémorandum'
} as const;