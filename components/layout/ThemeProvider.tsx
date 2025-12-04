/**
 * Theme provider component - Initializes theme on mount
 */

'use client';

import { useEffect, useState } from 'react';
import { useThemeStore } from '@/store/theme.store';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme, initialized, setInitialized } = useThemeStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Apply theme immediately on mount
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    
    if (!initialized) {
      setInitialized(true);
    }
  }, [theme, initialized, setInitialized]);

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return <>{children}</>;
}

