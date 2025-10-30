import { 
  GeneralSettings, 
  SecuritySettings, 
  NotificationSettings, 
  WorkflowSettings,
  IntegrationSettings 
} from 
'@/types/settings'

export class SettingsService {
  static async saveGeneralSettings(settings: GeneralSettings): Promise<void> {
    // Simulation d'appel API
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saving general settings:', settings)
  }

  static async saveSecuritySettings(settings: SecuritySettings): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saving security settings:', settings)
  }

  static async saveNotificationSettings(settings: NotificationSettings): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saving notification settings:', settings)
  }

  static async saveWorkflowSettings(settings: WorkflowSettings): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saving workflow settings:', settings)
  }

  static async saveIntegrationSettings(settings: IntegrationSettings): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Saving integration settings:', settings)
  }
}

// lib/validations.ts
export class SettingsValidations {
  static validateOrganizationName(name: string): string | null {
    if (!name || name.length < 2) {
      return 'Le nom de l\'organisation doit contenir au moins 2 caractères'
    }
    if (name.length > 50) {
      return 'Le nom de l\'organisation ne peut pas dépasser 50 caractères'
    }
    return null
  }

  static validateRetentionPeriod(days: number): string | null {
    if (days < 30) {
      return 'La période de rétention doit être d\'au moins 30 jours'
    }
    if (days > 3650) {
      return 'La période de rétention ne peut pas dépasser 10 ans'
    }
    return null
  }

  static validateSessionTimeout(minutes: number): string | null {
    if (minutes < 5) {
      return 'Le délai de session doit être d\'au moins 5 minutes'
    }
    if (minutes > 480) {
      return 'Le délai de session ne peut pas dépasser 8 heures'
    }
    return null
  }

  static validateWebhookUrl(url: string): string | null {
    if (!url) return null
    try {
      new URL(url)
      return null
    } catch {
      return 'URL de webhook invalide'
    }
  }
}