/**
 * Users management page (Admin only)
 */

'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useAuthStore } from '@/store/auth.store';
import { UserRole } from '@/types/auth.types';
import { usersService } from '@/services/users.service';
import { UserProfile } from '@/types/user.types';
import { UserList } from '@/components/users/UserList';
import { UserFormModal } from '@/components/users/UserFormModal';
import toast from 'react-hot-toast';

// Mock data - replace with actual API call
const mockUsers: UserProfile[] = [
  {
    id: '1',
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@youthcomputing.org',
    department: 'IT',
    roles: [UserRole.REDACTEUR],
    avatar: '',
    isActive: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    firstName: 'Marie',
    lastName: 'Martin',
    email: 'marie.martin@youthcomputing.org',
    department: 'Communication',
    roles: [UserRole.CHEF_DEPARTEMENT],
    avatar: '',
    isActive: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z',
  },
  {
    id: '3',
    firstName: 'Pierre',
    lastName: 'Durand',
    email: 'pierre.durand@youthcomputing.org',
    department: 'Direction',
    roles: [UserRole.DIRECTEUR_EXECUTIF],
    avatar: '',
    isActive: true,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z',
  },
];

export default function UsersPage() {
  const { user } = useAuthStore();
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserProfile | null>(null);

  // Check if user is admin
  const isAdmin = user?.roles.includes(UserRole.ADMIN);

  useEffect(() => {
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await usersService.getUsers();
      // setUsers(data.items);
      
      // Using mock data for now
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error loading users:', error);
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingUser(null);
    setIsCreateModalOpen(true);
  };

  const handleEdit = (user: UserProfile) => {
    setEditingUser(user);
    setIsCreateModalOpen(true);
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    try {
      await usersService.deleteUser(userId);
      setUsers(users.filter((u) => u.id !== userId));
      toast.success('Utilisateur supprimé avec succès');
    } catch (error) {
      toast.error('Erreur lors de la suppression');
    }
  };

  const handleSave = async (userData: any) => {
    try {
      if (editingUser) {
        await usersService.updateUser({ ...userData, id: editingUser.id });
        toast.success('Utilisateur modifié avec succès');
      } else {
        // TODO: Add create user service method
        toast.success('Utilisateur créé avec succès');
      }
      setIsCreateModalOpen(false);
      setEditingUser(null);
      loadUsers();
    } catch (error) {
      toast.error('Erreur lors de la sauvegarde');
    }
  };

  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.department?.toLowerCase().includes(searchLower)
    );
  });

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Accès non autorisé
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Seuls les administrateurs peuvent gérer les utilisateurs.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#010b40] dark:text-white">Gestion des Utilisateurs</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Gérez les utilisateurs et leurs rôles
          </p>
        </div>
        <Button
          onClick={handleCreate}
          className="bg-[#010b40] hover:bg-[#010b40]/90 dark:bg-[#f13544] dark:hover:bg-[#f13544]/90"
        >
          <UserPlus className="h-4 w-4 mr-2" />
          Nouvel utilisateur
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
          <Input
            type="search"
            placeholder="Rechercher un utilisateur..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-white dark:bg-gray-800"
          />
        </div>
      </Card>

      {/* Users List */}
      <UserList
        users={filteredUsers}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* Create/Edit Modal */}
      <UserFormModal
        user={editingUser}
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingUser(null);
        }}
        onSave={handleSave}
      />
    </div>
  );
}

