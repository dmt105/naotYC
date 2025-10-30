import { SystemStats, UserManagement, SystemLog, Template, SystemSettings } from '@/types/admin'

class AdminService {
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

  // System Statistics
  async getSystemStats(): Promise<SystemStats> {
    return this.fetchWithAuth('/admin/stats')
  }

  // User Management
  async getUsers(): Promise<UserManagement[]> {
    return this.fetchWithAuth('/admin/users')
  }

  async createUser(userData: Partial<UserManagement>): Promise<UserManagement> {
    return this.fetchWithAuth('/admin/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    })
  }

  async updateUser(userId: string, userData: Partial<UserManagement>): Promise<UserManagement> {
    return this.fetchWithAuth(`/admin/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    })
  }

  async deleteUser(userId: string): Promise<void> {
    await this.fetchWithAuth(`/admin/users/${userId}`, {
      method: 'DELETE',
    })
  }

  async resetUserPassword(userId: string): Promise<{ temporaryPassword: string }> {
    return this.fetchWithAuth(`/admin/users/${userId}/reset-password`, {
      method: 'POST',
    })
  }

  // System Logs
  async getSystemLogs(filters?: {
    type?: string
    startDate?: string
    endDate?: string
  }): Promise<SystemLog[]> {
    const queryParams = new URLSearchParams()
    if (filters?.type) queryParams.append('type', filters.type)
    if (filters?.startDate) queryParams.append('startDate', filters.startDate)
    if (filters?.endDate) queryParams.append('endDate', filters.endDate)

    const queryString = queryParams.toString()
    const endpoint = `/admin/logs${queryString ? `?${queryString}` : ''}`

    return this.fetchWithAuth(endpoint)
  }

  // Template Management
  async getTemplates(): Promise<Template[]> {
    return this.fetchWithAuth('/admin/templates')
  }

  async createTemplate(templateData: Partial<Template>): Promise<Template> {
    return this.fetchWithAuth('/admin/templates', {
      method: 'POST',
      body: JSON.stringify(templateData),
    })
  }

  async updateTemplate(templateId: string, templateData: Partial<Template>): Promise<Template> {
    return this.fetchWithAuth(`/admin/templates/${templateId}`, {
      method: 'PUT',
      body: JSON.stringify(templateData),
    })
  }

  async deleteTemplate(templateId: string): Promise<void> {
    await this.fetchWithAuth(`/admin/templates/${templateId}`, {
      method: 'DELETE',
    })
  }

  // System Settings
  async getSystemSettings(): Promise<SystemSettings> {
    return this.fetchWithAuth('/admin/settings')
  }

  async updateSystemSettings(settings: Partial<SystemSettings>): Promise<SystemSettings> {
    return this.fetchWithAuth('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    })
  }

  // Backup and Maintenance
  async createBackup(): Promise<{ backupId: string; downloadUrl: string }> {
    return this.fetchWithAuth('/admin/backup', {
      method: 'POST',
    })
  }

  async clearCache(): Promise<void> {
    await this.fetchWithAuth('/admin/clear-cache', {
      method: 'POST',
    })
  }

  // Reports
  async generateReport(type: string, params: any): Promise<{ reportId: string; downloadUrl: string }> {
    return this.fetchWithAuth('/admin/reports', {
      method: 'POST',
      body: JSON.stringify({ type, ...params }),
    })
  }
}

export const adminService = new AdminService()