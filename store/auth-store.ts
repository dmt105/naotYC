import { create } from 'zustand';
import { AuthState, User } from '@/lib/types';
import { mockUsers } from '@/lib/mock-data';

interface AuthStore extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
  setToken: (token: string) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,

  login: async (email: string, password: string) => {
    set({ isLoading: true });
    try {
      // Simulation d'appel API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = mockUsers.find(u => u.email === email);
      if (user) {
        set({
          user,
          token: 'mock-jwt-token',
          isAuthenticated: true,
          isLoading: false
        });
      } else {
        throw new Error('Identifiants invalides');
      }
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  loginWithGoogle: async () => {
    set({ isLoading: true });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const user = mockUsers[0]; // Admin par défaut pour Google OAuth
      set({
        user,
        token: 'mock-google-token',
        isAuthenticated: true,
        isLoading: false
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },

  logout: () => {
    set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  },

  setUser: (user: User) => set({ user }),
  setToken: (token: string) => set({ token })
}));