import { useState, useEffect } from 'react'
import { SystemStats, UserManagement, SystemLog, Template, SystemSettings } from '@/types/admin'
import { adminService } from '@/services/admin.service'

// System Stats Hook
export const useSystemStats = () => {
  const [stats, setStats] = useState<SystemStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true)
        const data = await adminService.getSystemStats()
        setStats(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch system stats')
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const refetch = async () => {
    setLoading(true)
    try {
      const data = await adminService.getSystemStats()
      setStats(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch system stats')
    } finally {
      setLoading(false)
    }
  }

  return { stats, loading, error, refetch }
}

// Users Management Hook
export const useUsersManagement = () => {
  const [users, setUsers] = useState<UserManagement[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true)
        const data = await adminService.getUsers()
        setUsers(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const createUser = async (userData: Partial<UserManagement>) => {
    try {
      const newUser = await adminService.createUser(userData)
      setUsers(prev => [...prev, newUser])
      return newUser
    } catch (err) {
      throw err
    }
  }

  const updateUser = async (userId: string, userData: Partial<UserManagement>) => {
    try {
      const updatedUser = await adminService.updateUser(userId, userData)
      setUsers(prev => prev.map(user => user.id === userId ? updatedUser : user))
      return updatedUser
    } catch (err) {
      throw err
    }
  }

  const deleteUser = async (userId: string) => {
    try {
      await adminService.deleteUser(userId)
      setUsers(prev => prev.filter(user => user.id !== userId))
    } catch (err) {
      throw err
    }
  }

  const resetPassword = async (userId: string) => {
    try {
      return await adminService.resetUserPassword(userId)
    } catch (err) {
      throw err
    }
  }

  const refetch = async () => {
    setLoading(true)
    try {
      const data = await adminService.getUsers()
      setUsers(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch users')
    } finally {
      setLoading(false)
    }
  }

  return {
    users,
    loading,
    error,
    createUser,
    updateUser,
    deleteUser,
    resetPassword,
    refetch,
  }
}

// System Logs Hook
export const useSystemLogs = (filters?: {
  type?: string
  startDate?: string
  endDate?: string
}) => {
  const [logs, setLogs] = useState<SystemLog[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        setLoading(true)
        const data = await adminService.getSystemLogs(filters)
        setLogs(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch system logs')
      } finally {
        setLoading(false)
      }
    }

    fetchLogs()
  }, [filters?.type, filters?.startDate, filters?.endDate])

  return { logs, loading, error }
}

// Templates Management Hook
export const useTemplatesManagement = () => {
  const [templates, setTemplates] = useState<Template[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        setLoading(true)
        const data = await adminService.getTemplates()
        setTemplates(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch templates')
      } finally {
        setLoading(false)
      }
    }

    fetchTemplates()
  }, [])

  const createTemplate = async (templateData: Partial<Template>) => {
    try {
      const newTemplate = await adminService.createTemplate(templateData)
      setTemplates(prev => [...prev, newTemplate])
      return newTemplate
    } catch (err) {
      throw err
    }
  }

  const updateTemplate = async (templateId: string, templateData: Partial<Template>) => {
    try {
      const updatedTemplate = await adminService.updateTemplate(templateId, templateData)
      setTemplates(prev => prev.map(template => template.id === templateId ? updatedTemplate : template))
      return updatedTemplate
    } catch (err) {
      throw err
    }
  }

  const deleteTemplate = async (templateId: string) => {
    try {
      await adminService.deleteTemplate(templateId)
      setTemplates(prev => prev.filter(template => template.id !== templateId))
    } catch (err) {
      throw err
    }
  }

  return {
    templates,
    loading,
    error,
    createTemplate,
    updateTemplate,
    deleteTemplate,
  }
}

// System Settings Hook
export const useSystemSettings = () => {
  const [settings, setSettings] = useState<SystemSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const data = await adminService.getSystemSettings()
        setSettings(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch system settings')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const updateSettings = async (newSettings: Partial<SystemSettings>) => {
    try {
      const updatedSettings = await adminService.updateSystemSettings(newSettings)
      setSettings(updatedSettings)
      return updatedSettings
    } catch (err) {
      throw err
    }
  }

  return { settings, loading, error, updateSettings }
}