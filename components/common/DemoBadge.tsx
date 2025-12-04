/**
 * Demo badge component - shows when user is using demo account
 */

'use client';

import { useEffect, useState } from 'react';
import { Info } from 'lucide-react';

export function DemoBadge() {
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isDemoAccount = localStorage.getItem('isDemoAccount') === 'true';
      setIsDemo(isDemoAccount);
    }
  }, []);

  if (!isDemo) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-yellow-500 dark:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
      <Info className="h-4 w-4" />
      <span className="text-sm font-medium">Mode Démo</span>
    </div>
  );
}

