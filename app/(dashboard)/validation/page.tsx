/**
 * Validation page - for validators (Chef de Département, Directeur Exécutif)
 */

'use client';

import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ValidationPanel } from '@/components/validation/ValidationPanel';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';

export default function ValidationPage() {
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Check if user can validate
  const canValidate = user?.roles.some(
    (role) => role === UserRole.CHEF_DEPARTEMENT || 
              role === UserRole.DIRECTEUR_EXECUTIF || 
              role === UserRole.ADMIN
  );

  if (!canValidate) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Accès non autorisé
          </h2>
          <p className="text-gray-600">
            Vous n'avez pas les permissions nécessaires pour valider des documents.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
  <h1 className="text-3xl font-bold text-[#010b40]">Validation des Documents</h1>
  <p className="text-gray-600 mt-1">Validez ou retournez les documents en attente</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="search"
            placeholder="Rechercher un document..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filtres
        </Button>
      </div>

      {/* Validation Panel */}
      <ValidationPanel searchQuery={searchQuery} filterStatus={filterStatus} />
    </div>
  );
}





