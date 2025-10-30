'use client'
import { SystemStats } from '@/types/admin'
import { KpiCard } from '@/components/ui/kpiCard'

interface StatsOverviewProps {
  stats: SystemStats | null
  loading?: boolean
}

export function StatsOverview({ stats, loading = false }: StatsOverviewProps) {
  const formatStorage = (bytes: number) => {
    const mb = bytes / (1024 * 1024)
    return `${mb.toFixed(2)} MB`
  }

  // Gestion sécurisée des valeurs null
  const storageUsed = stats?.storageUsed || 0
  const storageLimit = stats?.storageLimit || 1 // Évite la division par zéro
  const storagePercentage = (storageUsed / storageLimit) * 100

  // Si les stats sont null et pas en loading, on retourne null ou un message
  if (!stats && !loading) {
    return <div className="text-center p-8">Aucune donnée disponible</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KpiCard
        title="Utilisateurs Totaux"
        value={stats?.totalUsers || 0}
        subtitle={`${stats?.activeUsers || 0} actifs`}
        icon="👥"
        loading={loading}
      />
      <KpiCard
        title="Notes Total"
        value={stats?.totalNotes || 0}
        subtitle={`${stats?.notesThisMonth || 0} ce mois`}
        icon="📝"
        loading={loading}
      />
      <KpiCard
        title="Validations en Attente"
        value={stats?.pendingValidations || 0}
        subtitle="En attente de validation"
        icon="⏳"
        loading={loading}
      />
      <KpiCard
        title="Stockage Utilisé"
        value={formatStorage(storageUsed)}
        subtitle={`${storagePercentage.toFixed(1)}% de ${formatStorage(storageLimit)}`}
        icon="💾"
        loading={loading}
        trend={{
          value: storagePercentage,
          isPositive: storagePercentage < 80
        }}
      />
    </div>
  )
}