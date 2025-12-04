/**
 * Authentication store (Zustand)
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, UserRole, AuthState } from '@/types/auth.types';

interface AuthStore extends AuthState {
  // Actions
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  login: (user: User, token: string) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      setUser: (user) =>
        set({
          user,
          isAuthenticated: !!user,
        }),

      setToken: (token) =>
        set({
          token,
        }),

      login: (user, token) => {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', token);
          // Store demo flag if it's a demo account
          if (token.startsWith('demo-token-')) {
            localStorage.setItem('isDemoAccount', 'true');
          } else {
            localStorage.removeItem('isDemoAccount');
          }
        }
        set({
          user,
          token,
          isAuthenticated: true,
        });
      },

      logout: () => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('isDemoAccount');
        }
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        });
      },

      updateUser: (updates) => {
        const currentUser = get().user;
        if (currentUser) {
          set({
            user: { ...currentUser, ...updates },
          });
        }
      },

      hasRole: (role) => {
        const user = get().user;
        return user?.roles.includes(role) ?? false;
      },

      hasAnyRole: (roles) => {
        const user = get().user;
        if (!user) return false;
        return roles.some((role) => user.roles.includes(role));
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

