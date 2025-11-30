import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validateYouthComputingEmail(email: string): boolean {
  return email.endsWith('@youthcomputing.org')
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

export function getStatusColor(status: string): string {
  const statusColors: { [key: string]: string } = {
    DRAFT: 'bg-gray-100 text-gray-800',
    PENDING_VALIDATION: 'bg-yellow-100 text-yellow-800',
    RETURNED: 'bg-orange-100 text-orange-800',
    APPROVED: 'bg-green-100 text-green-800',
    SCHEDULED: 'bg-blue-100 text-blue-800',
    SENT: 'bg-purple-100 text-purple-800',
    ARCHIVED: 'bg-gray-100 text-gray-800'
  }
  return statusColors[status] || 'bg-gray-100 text-gray-800'
}

export function getUserRoleLabel(role: string): string {
  const roleLabels: { [key: string]: string } = {
    REDACTOR: 'Rédacteur',
    DEPARTMENT_HEAD: 'Chef de Département',
    EXECUTIVE_DIRECTOR: 'Directeur Exécutif',
    RECIPIENT: 'Destinataire',
    ADMIN: 'Administrateur'
  }
  return roleLabels[role] || role
}