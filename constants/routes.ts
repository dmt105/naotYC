/**
 * Application routes constants
 */

export const ROUTES = {
  // Public routes
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  
  // Dashboard routes
  DASHBOARD: '/dashboard',
  
  // Notes routes
  NOTES: '/notes',
  NOTES_CREATE: '/notes/create',
  NOTES_EDIT: (id: string) => `/notes/${id}`,
  NOTES_DETAIL: (id: string) => `/notes/${id}`,
  
  // Validation routes
  VALIDATION: '/validation',
  VALIDATION_PENDING: '/validation/pending',
  
  // Archive routes
  ARCHIVE: '/archive',
  
  // Templates routes (Admin)
  TEMPLATES: '/templates',
  TEMPLATES_CREATE: '/templates/create',
  TEMPLATES_EDIT: (id: string) => `/templates/${id}`,
  
  // Users routes (Admin)
  USERS: '/users',
  USERS_CREATE: '/users/create',
  USERS_EDIT: (id: string) => `/users/${id}`,
  
  // Notifications
  NOTIFICATIONS: '/notifications',
  
  // Settings (Admin)
  SETTINGS: '/settings',
  
  // Profile
  PROFILE: '/profile',
} as const;

