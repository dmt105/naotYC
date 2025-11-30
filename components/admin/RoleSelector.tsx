import React from 'react';

interface RoleSelectorProps {
  selectedRoles: string[];
  onChange: (roles: string[]) => void;
}

const availableRoles = [
  { value: 'redacteur', label: 'Rédacteur' },
  { value: 'chef-departement', label: 'Chef Département' },
  { value: 'de', label: 'Directeur Exécutif' },
  { value: 'destinataire', label: 'Destinataire' },
  { value: 'admin', label: 'Administrateur' },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({
  selectedRoles,
  onChange
}) => {
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      onChange(selectedRoles.filter(r => r !== role));
    } else {
      onChange([...selectedRoles, role]);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {availableRoles.map((role) => (
        <label key={role.value} className="inline-flex items-center">
          <input
            type="checkbox"
            checked={selectedRoles.includes(role.value)}
            onChange={() => toggleRole(role.value)}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <span className="ml-2 text-sm text-gray-700">{role.label}</span>
        </label>
      ))}
    </div>
  );
};