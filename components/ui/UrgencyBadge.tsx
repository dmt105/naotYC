interface UrgencyBadgeProps {
  urgency: 'LOW' | 'MEDIUM' | 'HIGH'
  className?: string
}

const urgencyConfig = {
  LOW: {
    label: 'Faible',
    color: 'bg-green-100 text-green-800'
  },
  MEDIUM: {
    label: 'Moyenne',
    color: 'bg-yellow-100 text-yellow-800'
  },
  HIGH: {
    label: 'Élevée',
    color: 'bg-red-100 text-red-800'
  }
}

export function UrgencyBadge({ urgency, className = '' }: UrgencyBadgeProps) {
  const config = urgencyConfig[urgency]
  
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${config.color} ${className}`}>
      {config.label}
    </span>
  )
}