/**
 * Dashboard layout with Sidebar and Header
 */

'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { DemoBadge } from '@/components/common/DemoBadge';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
          <Header />
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-950 p-4 md:p-6">
            {children}
          </main>
        </div>
        <DemoBadge />
      </div>
    </ProtectedRoute>
  );
}

