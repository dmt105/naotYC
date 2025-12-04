/**
 * Sidebar component - adaptable by user role
 */

'use client';

import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  CheckCircle,
  Archive,
  Users,
  FileCode,
  Settings,
  Menu,
  X,
} from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';
import { ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  roles: UserRole[];
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: [
      UserRole.REDACTEUR,
      UserRole.CHEF_DEPARTEMENT,
      UserRole.DIRECTEUR_EXECUTIF,
      UserRole.DESTINATAIRE,
      UserRole.ADMIN,
    ],
  },
  {
    label: 'Mes Notes',
    href: ROUTES.NOTES,
    icon: FileText,
    roles: [
      UserRole.REDACTEUR,
      UserRole.CHEF_DEPARTEMENT,
      UserRole.DIRECTEUR_EXECUTIF,
      UserRole.ADMIN,
    ],
  },
  {
    label: 'Validation',
    href: ROUTES.VALIDATION,
    icon: CheckCircle,
    roles: [
      UserRole.CHEF_DEPARTEMENT,
      UserRole.DIRECTEUR_EXECUTIF,
      UserRole.ADMIN,
    ],
  },
  {
    label: 'Archive',
    href: ROUTES.ARCHIVE,
    icon: Archive,
    roles: [
      UserRole.REDACTEUR,
      UserRole.CHEF_DEPARTEMENT,
      UserRole.DIRECTEUR_EXECUTIF,
      UserRole.DESTINATAIRE,
      UserRole.ADMIN,
    ],
  },
  {
    label: 'Modèles',
    href: ROUTES.TEMPLATES,
    icon: FileCode,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Utilisateurs',
    href: ROUTES.USERS,
    icon: Users,
    roles: [UserRole.ADMIN],
  },
  {
    label: 'Paramètres',
    href: ROUTES.SETTINGS,
    icon: Settings,
    roles: [UserRole.ADMIN], // Only admin can access system settings
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAuthStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  if (!user) return null;

  // Filter nav items by user roles
  const visibleNavItems = navItems.filter((item) =>
    item.roles.some((role) => user.roles.includes(role))
  );

  const handleNavClick = (href: string) => {
    router.push(href);
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-[#010b40] dark:bg-gray-900 text-white transform transition-transform duration-300 z-40',
          'lg:translate-x-0',
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-[#f13544]/20 dark:border-gray-700">
            <h1 className="text-2xl font-bold text-white">NaotY</h1>
            <p className="text-sm text-gray-300 dark:text-gray-400 mt-1">Youth Computing</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {visibleNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <button
                  key={item.href}
                  onClick={() => handleNavClick(item.href)}
                  className={cn(
                    'w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                    isActive
                      ? 'bg-[#f13544] text-white'
                      : 'text-gray-300 dark:text-gray-400 hover:bg-[#f13544]/20 hover:text-white'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-[#f13544]/20 dark:border-gray-700">
            <p className="text-xs text-gray-400 dark:text-gray-500 text-center">
              © 2025 Youth Computing
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

