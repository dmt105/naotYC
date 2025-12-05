/**
 * Template form modal component (Create/Edit)
 */

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Template } from '@/types/template.types';
import toast from 'react-hot-toast';

// Validation schema
const templateFormSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  type: z.string().min(1, 'Le type est requis'),
  content: z.string().min(1, 'Le contenu est requis'),
  variables: z.array(z.string()).optional(),
});

type TemplateFormData = z.infer<typeof templateFormSchema>;

interface TemplateFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  template?: Template;
}

export function TemplateFormModal({ isOpen, onClose, template }: TemplateFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateFormSchema),
    defaultValues: template
      ? {
          name: template.name,
          description: template.description,
          type: template.type,
          content: template.content,
          variables: template.variables,
        }
      : {
          variables: [],
        },
  });

  const onSubmit = async (data: TemplateFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log('Template data:', data);
      
      toast.success(template ? 'Modèle modifié avec succès' : 'Modèle créé avec succès');
      reset();
      onClose();
    } catch (error: any) {
      toast.error(error.message || 'Une erreur est survenue');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {template ? 'Modifier le modèle' : 'Créer un nouveau modèle'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du modèle
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <Input
              id="name"
              {...register('name')}
              error={errors.name?.message}
              placeholder="Nom du modèle"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <Input
              id="description"
              {...register('description')}
              error={errors.description?.message}
              placeholder="Description du modèle"
            />
          </div>

          {/* Type */}
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
              Type *
            </label>
            <select
              id="type"
              {...register('type')}
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
            >
              <option value="CONVOCATION">Convocation</option>
              <option value="RAPPORT">Rapport</option>
              <option value="ANNONCE">Annonce</option>
              <option value="COMPTE_RENDU">Compte rendu</option>
              <option value="AUTRE">Autre</option>
            </select>
          </div>

          {/* Content */}
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Contenu *
            </label>
            <Textarea
              id="content"
              {...register('content')}
              error={errors.content?.message}
              placeholder="Contenu du modèle (utilisez {variable} pour les variables)"
              rows={10}
            />
            <p className="text-xs text-gray-500 mt-1">
              Variables disponibles: {'{author}'}, {'{date}'}, {'{recipient}'}
            </p>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-[#010b40] hover:bg-[#010b40]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enregistrement...' : template ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}





