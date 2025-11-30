import React from 'react';

interface UserRoleBadgeProps {
  role: string;
  onRemove?: () => void;
  editable?: boolean;
}

const roleColors: Record<string, string> = {
  admin: 'bg-red-100 text-red-800',
  redacteur: 'bg-blue-100 text-blue-800',
  'chef-departement': 'bg-green-100 text-green-800',
  de: 'bg-purple-100 text-purple-800',
  destinataire: 'bg-gray-100 text-gray-800',
};

export const UserRoleBadge: React.FC<UserRoleBadgeProps> = ({ 
  role, 
  onRemove,
  editable = false 
}) => {
  const getRoleLabel = (role: string) => {
    const labels: Record<string, string> = {
      admin: 'Admin',
      redacteur: 'Rédacteur',
      'chef-departement': 'Chef Département',
      de: 'Directeur Exécutif',
      destinataire: 'Destinataire',
    };
    return labels[role] || role;
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        roleColors[role] || 'bg-gray-100 text-gray-800'
      }`}
    >
      {getRoleLabel(role)}
      {editable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 hover:text-gray-700 focus:outline-none"
        >
          ×
        </button>
      )}
    </span>
  );
};