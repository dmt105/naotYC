import { useState, useEffect } from 'react';
import { adminService } from '@/services/admin.service';
import { AdminStats, User, Template, UserManagement,SystemStats } from '@/types/admin';

// Hook principal
export const useAdmin = () => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState({ stats: true, users: true, templates: true });
  const [error, setError] = useState<string | null>(null);

  const fetchStats = async () => {
    try {
      setLoading(prev => ({ ...prev, stats: true }));
      const data = await adminService.getStats();
      setStats(data);
    } catch (err) {
      setError('Erreur lors du chargement des statistiques');
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(prev => ({ ...prev, users: true }));
      const data = await adminService.getUsers();
      setUsers(data);
    } catch (err) {
      setError('Erreur lors du chargement des utilisateurs');
    } finally {
      setLoading(prev => ({ ...prev, users: false }));
    }
  };

  const fetchTemplates = async () => {
    try {
      setLoading(prev => ({ ...prev, templates: true }));
      const data = await adminService.getTemplates();
      setTemplates(data);
    } catch (err) {
      setError('Erreur lors du chargement des modèles');
    } finally {
      setLoading(prev => ({ ...prev, templates: false }));
    }
  };

  const updateUserRoles = async (userId: string, roles: string[]) => {
    try {
      const updatedUser = await adminService.updateUserRoles(userId, roles);
      setUsers(prev => prev.map(user => 
        user.id === userId ? updatedUser : user
      ));
      return updatedUser;
    } catch (err) {
      setError('Erreur lors de la mise à jour des rôles');
      throw err;
    }
  };

  const createTemplate = async (template: Omit<Template, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newTemplate = await adminService.createTemplate(template);
      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    } catch (err) {
      setError('Erreur lors de la création du modèle');
      throw err;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      await adminService.deleteTemplate(id);
      setTemplates(prev => prev.filter(template => template.id !== id));
    } catch (err) {
      setError('Erreur lors de la suppression du modèle');
      throw err;
    }
  };

  useEffect(() => {
    fetchStats();
    fetchUsers();
    fetchTemplates();
  }, []);

  return {
    stats,
    users,
    templates,
    loading,
    error,
    updateUserRoles,
    createTemplate,
    deleteTemplate,
    refetch: {
      stats: fetchStats,
      users: fetchUsers,
      templates: fetchTemplates
    }
  };
};

// Hook dédié pour les statistiques système
// Dans hooks/useAdmin.ts - Mettre à jour useSystemStats
export const useSystemStats = () => {
  const { stats, loading, refetch, error } = useAdmin();
  
  // Adapter AdminStats vers SystemStats
  const systemStats: SystemStats | null = stats ? {
    // Propriétés de base
    totalUsers: stats.totalUsers,
    totalNotes: stats.totalNotes,
    pendingValidations: stats.pendingValidations,
    scheduledNotes: stats.scheduledNotes,
    archivedNotes: stats.archivedNotes,
    averageValidationTime: stats.averageValidationTime,
    readRate: stats.readRate,
    monthlyGrowth: stats.monthlyGrowth,
    
    // Propriétés manquantes avec valeurs par défaut
    activeUsers: (stats as any).activeUsers || stats.totalUsers, // Utiliser totalUsers comme fallback
    notesThisMonth: (stats as any).notesThisMonth || Math.round(stats.totalNotes * 0.3), // Estimation
    storageUsed: (stats as any).storageUsed || 0,
    storageLimit: (stats as any).storageLimit || 1073741824 // 1GB par défaut
  } : null;

  return {
    stats: systemStats,
    loading: loading.stats,
    refetch: refetch.stats,
    error
  };
};

// Hook dédié pour la gestion des utilisateurs
export const useUsersManagement = () => {
  const { 
    users, 
    loading, 
    updateUserRoles, 
    refetch,
    error 
  } = useAdmin();

  // Fonction pour supprimer un utilisateur
  const deleteUser = async (userId: string): Promise<void> => {
    try {
      // Note: Vous devrez implémenter adminService.deleteUser() dans votre service
      // await adminService.deleteUser(userId);
      console.log('Supprimer utilisateur:', userId);
      // Pour l'instant, on simule la suppression
      refetch.users(); // Recharger la liste
    } catch (err) {
      throw new Error('Erreur lors de la suppression de l\'utilisateur');
    }
  };

  // Fonction pour réinitialiser le mot de passe
  const resetPassword = async (userId: string): Promise<{ temporaryPassword: string }> => {
    try {
      // Note: Vous devrez implémenter adminService.resetPassword() dans votre service
      // const result = await adminService.resetPassword(userId);
      // return result;
      
      // Pour l'instant, on simule la réinitialisation
      const temporaryPassword = Math.random().toString(36).slice(-8);
      return { temporaryPassword };
    } catch (err) {
      throw new Error('Erreur lors de la réinitialisation du mot de passe');
    }
  };

  // Fonction pour créer un utilisateur
  const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'notesCount'>): Promise<User> => {
    try {
      // Note: Vous devrez implémenter adminService.createUser() dans votre service
      // const newUser = await adminService.createUser(userData);
      // return newUser;
      
      // Pour l'instant, on simule la création
      const newUser: User = {
        ...userData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        notesCount: 0
      };
      refetch.users(); // Recharger la liste
      return newUser;
    } catch (err) {
      throw new Error('Erreur lors de la création de l\'utilisateur');
    }
  };

  // Fonction pour mettre à jour un utilisateur
  const updateUser = async (userId: string, userData: Partial<User>): Promise<User> => {
    try {
      // Note: Vous devrez implémenter adminService.updateUser() dans votre service
      // const updatedUser = await adminService.updateUser(userId, userData);
      // return updatedUser;
      
      // Pour l'instant, on simule la mise à jour
      const updatedUser: User = {
        ...users.find(u => u.id === userId)!,
        ...userData
      } as User;
      refetch.users(); // Recharger la liste
      return updatedUser;
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
    }
  };

  // Fonction pour désactiver un utilisateur
  const deactivateUser = async (userId: string): Promise<void> => {
    try {
      // Note: Vous devrez implémenter adminService.deactivateUser() dans votre service
      // await adminService.deactivateUser(userId);
      console.log('Désactiver utilisateur:', userId);
      refetch.users(); // Recharger la liste
    } catch (err) {
      throw new Error('Erreur lors de la désactivation de l\'utilisateur');
    }
  };

  // Fonction pour activer un utilisateur
  const activateUser = async (userId: string): Promise<void> => {
    try {
      // Note: Vous devrez implémenter adminService.activateUser() dans votre service
      // await adminService.activateUser(userId);
      console.log('Activer utilisateur:', userId);
      refetch.users(); // Recharger la liste
    } catch (err) {
      throw new Error('Erreur lors de l\'activation de l\'utilisateur');
    }
  };

  // Convertir les User en UserManagement pour la compatibilité
  const userManagementList: UserManagement[] = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.roles[0] as any, // Prendre le premier rôle
    roles: user.roles,
    department: user.department,
    notesCount: user.notesCount,
    lastActivity: user.lastLogin,
    isActive: user.status === 'active',
    avatar: user.avatar,
    createdAt: (user as any).createdAt || new Date().toISOString(),
    lastLogin: user.lastLogin,
    status: user.status
  }));

  return {
    users: userManagementList,
    loading: loading.users,
    deleteUser,
    resetPassword,
    createUser,
    updateUser,
    updateUserRoles,
    deactivateUser,
    activateUser,
    refetch: refetch.users,
    error
  };
};

// Hook dédié pour la gestion des modèles
export const useTemplatesManagement = () => {
  const { 
    templates, 
    loading, 
    createTemplate, 
    deleteTemplate,
    refetch,
    error 
  } = useAdmin();

  const updateTemplate = async (id: string, template: Partial<Template>): Promise<Template> => {
    try {
      // Note: Vous devrez implémenter adminService.updateTemplate() dans votre service
      // const updatedTemplate = await adminService.updateTemplate(id, template);
      // return updatedTemplate;
      
      // Pour l'instant, on simule la mise à jour
      const updatedTemplate: Template = {
        ...templates.find(t => t.id === id)!,
        ...template
      } as Template;
      refetch.templates(); // Recharger la liste
      return updatedTemplate;
    } catch (err) {
      throw new Error('Erreur lors de la mise à jour du modèle');
    }
  };

  return {
    templates,
    loading: loading.templates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    refetch: refetch.templates,
    error
  };
};