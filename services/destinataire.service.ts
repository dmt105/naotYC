import { ReceivedNote, Notification } from '@/types/destinataire'

class DestinataireService {
  private baseURL = process.env.NEXT_PUBLIC_API_URL

  private async fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('naoty_auth_token')
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        ...options.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return response.json()
  }

  // Get received notes with filters
  async getReceivedNotes(filters?: {
    status?: 'UNREAD' | 'READ' | 'ARCHIVED'
    type?: string
    search?: string
  }): Promise<ReceivedNote[]> {
    const queryParams = new URLSearchParams()
    if (filters?.status) queryParams.append('status', filters.status)
    if (filters?.type) queryParams.append('type', filters.type)
    if (filters?.search) queryParams.append('search', filters.search)

    const queryString = queryParams.toString()
    const endpoint = `/destinataire/notes${queryString ? `?${queryString}` : ''}`

    return this.fetchWithAuth(endpoint)
  }

  // Mark note as read
  async markAsRead(noteId: string): Promise<void> {
    await this.fetchWithAuth(`/destinataire/notes/${noteId}/read`, {
      method: 'POST',
    })
  }

  // Archive note
  async archiveNote(noteId: string): Promise<void> {
    await this.fetchWithAuth(`/destinataire/notes/${noteId}/archive`, {
      method: 'POST',
    })
  }

  // Unarchive note
  async unarchiveNote(noteId: string): Promise<void> {
    await this.fetchWithAuth(`/destinataire/notes/${noteId}/unarchive`, {
      method: 'POST',
    })
  }

  // Add note to calendar
  async addToCalendar(noteId: string): Promise<{ success: boolean; calendarUrl?: string }> {
    return this.fetchWithAuth(`/destinataire/notes/${noteId}/add-to-calendar`, {
      method: 'POST',
    })
  }

  // Get notifications
  async getNotifications(): Promise<Notification[]> {
    return this.fetchWithAuth('/destinataire/notifications')
  }

  // Mark notification as read
  async markNotificationAsRead(notificationId: string): Promise<void> {
    await this.fetchWithAuth(`/destinataire/notifications/${notificationId}/read`, {
      method: 'POST',
    })
  }

  // Get stats for dashboard
  async getStats(): Promise<{
    unreadCount: number
    totalReceived: number
    archivedCount: number
    urgentCount: number
  }> {
    return this.fetchWithAuth('/destinataire/stats')
  }
}

export const destinataireService = new DestinataireService()