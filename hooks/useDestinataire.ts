import { useState, useEffect } from 'react'
import { ReceivedNote, Notification } from '@/types/destinataire'
import { destinataireService } from '@/services/destinataire.service'

export const useDestinataireNotes = (filters?: {
  status?: 'UNREAD' | 'READ' | 'ARCHIVED'
  type?: string
  search?: string
}) => {
  const [notes, setNotes] = useState<ReceivedNote[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true)
        const data = await destinataireService.getReceivedNotes(filters)
        setNotes(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notes')
      } finally {
        setLoading(false)
      }
    }

    fetchNotes()
  }, [filters?.status, filters?.type, filters?.search])

  const refetch = async () => {
    setLoading(true)
    try {
      const data = await destinataireService.getReceivedNotes(filters)
      setNotes(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch notes')
    } finally {
      setLoading(false)
    }
  }

  return { notes, loading, error, refetch }
}

export const useDestinataireStats = () => {
  const [stats, setStats] = useState({
    unreadCount: 0,
    totalReceived: 0,
    archivedCount: 0,
    urgentCount: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await destinataireService.getStats()
        setStats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  return { stats, loading, error }
}

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true)
        const data = await destinataireService.getNotifications()
        setNotifications(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch notifications')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const markAsRead = async (notificationId: string) => {
    try {
      await destinataireService.markNotificationAsRead(notificationId)
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, isRead: true } : notif
        )
      )
    } catch (err) {
      console.error('Failed to mark notification as read:', err)
    }
  }

  return { notifications, loading, error, markAsRead }
}