/**
 * Theme store (Zustand) - Dark/Light mode
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  initialized: boolean;
  setInitialized: (value: boolean) => void;
}

// Apply theme to document helper
function applyTheme(theme: Theme) {
  if (typeof window !== 'undefined') {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set) => ({
      theme: 'light',
      initialized: false,
      setInitialized: (value) => set({ initialized: value }),
      setTheme: (theme) => {
        set({ theme });
        applyTheme(theme);
      },
      toggleTheme: () => {
        set((state) => {
          const newTheme = state.theme === 'light' ? 'dark' : 'light';
          applyTheme(newTheme);
          return { theme: newTheme };
        });
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: () => (state) => {
        // Apply theme immediately on rehydration to prevent flash
        if (state) {
          applyTheme(state.theme);
          state.setInitialized(true);
        }
      },
    }
  )
);

