import { NoteStatus } from '@/types/notes'

interface StatsGridProps {
  stats?: {
    drafts: number
    pending: number
    approved: number
    archived: number
  }
}

export default function StatsGrid({ stats = { drafts: 0, pending: 0, approved: 0, archived: 0 } }: StatsGridProps) {
  const statItems = [
    {
      label: 'Brouillons',
      value: stats.drafts,
      color: 'bg-yellow-100 text-yellow-800',
      icon: '📝'
    },
    {
      label: 'En Attente',
      value: stats.pending,
      color: 'bg-blue-100 text-blue-800',
      icon: '⏳'
    },
    {
      label: 'Approuvées',
      value: stats.approved,
      color: 'bg-green-100 text-green-800',
      icon: '✅'
    },
    {
      label: 'Archivées',
      value: stats.archived,
      color: 'bg-gray-100 text-gray-800',
      icon: '📁'
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems.map((item, index) => (
        <StatCard key={index} {...item} />
      ))}
    </div>
  )
}

interface StatCardProps {
  label: string
  value: number
  color: string
  icon: string
}

function StatCard({ label, value, color, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <span className="text-xl">{icon}</span>
        </div>
      </div>
    </div>
  )
}