import { NoteStatus } from '@/types/note.types'
import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  status: NoteStatus
  className?: string
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const statusConfig: Record<NoteStatus, { label: string; color: string }> = {
    DRAFT: {
      label: 'Brouillon',
      color: 'bg-yellow-100 text-yellow-800'
    },
    PENDING_VALIDATION: {
      label: 'En validation',
      color: 'bg-blue-100 text-blue-800'
    },
    RETURNED: {
      label: 'Retourné',
      color: 'bg-orange-100 text-orange-800'
    },
    APPROVED: {
      label: 'Approuvé',
      color: 'bg-green-100 text-green-800'
    },
    SCHEDULED: {
      label: 'Planifié',
      color: 'bg-purple-100 text-purple-800'
    },
    SENT: {
      label: 'Envoyé',
      color: 'bg-gray-100 text-gray-800'
    },
    ARCHIVED: {
      label: 'Archivé',
      color: 'bg-gray-200 text-gray-800'
    }
  }

  const config = statusConfig[status]

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.color,
        className
      )}
    >
      {config.label}
    </span>
  )
}