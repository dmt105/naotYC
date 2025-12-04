/**
 * Templates list component (div-based)
 */

'use client';

import { useState } from 'react';
import { MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { Button } from '@/components/ui/button';
import { Template } from '@/types/template.types';
import { formatDate } from '@/lib/utils';
import { EmptyState } from '@/components/common/EmptyState';
import { FileCode } from 'lucide-react';

// Mock data
const mockTemplates: Template[] = [
  {
    id: '1',
    name: 'Modèle Convocation',
    description: 'Modèle standard pour les convocations',
    type: 'CONVOCATION',
    content: 'Convoquation pour...',
    variables: ['{author}', '{date}', '{recipient}'],
    isActive: true,
    createdBy: '1',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '2',
    name: 'Modèle Rapport',
    description: 'Modèle standard pour les rapports',
    type: 'RAPPORT',
    content: 'Rapport du...',
    variables: ['{author}', '{date}'],
    isActive: true,
    createdBy: '1',
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-01-10T10:00:00Z',
  },
];

interface TemplateListProps {
  searchQuery?: string;
}

export function TemplateList({ searchQuery = '' }: TemplateListProps) {
  const [templates] = useState<Template[]>(mockTemplates);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);

  // Filter templates
  const filteredTemplates = templates.filter((template) =>
    template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    template.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filteredTemplates.length === 0) {
    return (
      <EmptyState
        icon={FileCode}
        title="Aucun modèle trouvé"
        description={
          searchQuery
            ? 'Aucun modèle ne correspond à votre recherche'
            : 'Commencez par créer votre premier modèle'
        }
      />
    );
  }

  return (
    <div className="space-y-4">
      {filteredTemplates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          onEdit={() => setEditingTemplate(template)}
        />
      ))}
    </div>
  );
}

interface TemplateCardProps {
  template: Template;
  onEdit: () => void;
}

function TemplateCard({ template, onEdit }: TemplateCardProps) {
  const handleDelete = async () => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce modèle ?')) return;
    // TODO: Replace with actual API call
    console.log('Delete template:', template.id);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold text-[#010b40]">{template.name}</h3>
            {template.isActive ? (
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Actif
              </span>
            ) : (
              <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                Inactif
              </span>
            )}
          </div>
          
          {template.description && (
            <p className="text-gray-600 text-sm mb-2">{template.description}</p>
          )}
          
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Type: {template.type}</span>
            <span>•</span>
            <span>Variables: {template.variables.length}</span>
            <span>•</span>
            <span>Créé le {formatDate(template.createdAt)}</span>
          </div>
        </div>

        {/* Actions dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="ghost" size="icon" className="ml-4">
              <MoreVertical className="h-5 w-5" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content
              className="min-w-[150px] bg-white rounded-lg shadow-lg border border-gray-200 p-1 z-50"
              sideOffset={5}
              align="end"
            >
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onSelect={() => {
                  // TODO: Show preview
                }}
              >
                <Eye className="h-4 w-4" />
                <span>Aperçu</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer"
                onSelect={onEdit}
              >
                <Edit className="h-4 w-4" />
                <span>Modifier</span>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="h-px bg-gray-200 my-1" />
              <DropdownMenu.Item
                className="flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded cursor-pointer"
                onSelect={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
                <span>Supprimer</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>
    </div>
  );
}

