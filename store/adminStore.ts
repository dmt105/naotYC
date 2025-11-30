import { create } from 'zustand';
import { User, Template, CreateUserData, UpdateUserData, CreateTemplateData, UpdateTemplateData } from '@/lib/types';

interface AdminState {
  // Users state
  users: User[];
  selectedUser: User | null;
  isUserFormOpen: boolean;
  isDeleteUserDialogOpen: boolean;
  
  // Templates state
  templates: Template[];
  selectedTemplate: Template | null;
  isTemplateFormOpen: boolean;
  isDeleteTemplateDialogOpen: boolean;
  
  // Loading states
  isLoading: boolean;
  
  // Actions
  setUsers: (users: User[]) => void;
  setSelectedUser: (user: User | null) => void;
  setUserFormOpen: (open: boolean) => void;
  setDeleteUserDialogOpen: (open: boolean) => void;
  
  setTemplates: (templates: Template[]) => void;
  setSelectedTemplate: (template: Template | null) => void;
  setTemplateFormOpen: (open: boolean) => void;
  setDeleteTemplateDialogOpen: (open: boolean) => void;
  
  setIsLoading: (loading: boolean) => void;
  
  // CRUD operations
  addUser: (user: User) => void;
  updateUser: (id: string, userData: Partial<User>) => void;
  deleteUser: (id: string) => void;
  
  addTemplate: (template: Template) => void;
  updateTemplate: (id: string, templateData: Partial<Template>) => void;
  deleteTemplate: (id: string) => void;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  // Initial state
  users: [],
  selectedUser: null,
  isUserFormOpen: false,
  isDeleteUserDialogOpen: false,
  
  templates: [],
  selectedTemplate: null,
  isTemplateFormOpen: false,
  isDeleteTemplateDialogOpen: false,
  
  isLoading: false,
  
  // Setters
  setUsers: (users) => set({ users }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),
  setUserFormOpen: (isUserFormOpen) => set({ isUserFormOpen }),
  setDeleteUserDialogOpen: (isDeleteUserDialogOpen) => set({ isDeleteUserDialogOpen }),
  
  setTemplates: (templates) => set({ templates }),
  setSelectedTemplate: (selectedTemplate) => set({ selectedTemplate }),
  setTemplateFormOpen: (isTemplateFormOpen) => set({ isTemplateFormOpen }),
  setDeleteTemplateDialogOpen: (isDeleteTemplateDialogOpen) => set({ isDeleteTemplateDialogOpen }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  // User CRUD operations
  addUser: (user) => {
    const { users } = get();
    set({ users: [...users, user] });
  },
  
  updateUser: (id, userData) => {
    const { users } = get();
    set({
      users: users.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    });
  },
  
  deleteUser: (id) => {
    const { users } = get();
    set({ users: users.filter(user => user.id !== id) });
  },
  
  // Template CRUD operations
  addTemplate: (template) => {
    const { templates } = get();
    set({ templates: [...templates, template] });
  },
  
  updateTemplate: (id, templateData) => {
    const { templates } = get();
    set({
      templates: templates.map(template =>
        template.id === id ? { ...template, ...templateData } : template
      )
    });
  },
  
  deleteTemplate: (id) => {
    const { templates } = get();
    set({ templates: templates.filter(template => template.id !== id) });
  },
}));