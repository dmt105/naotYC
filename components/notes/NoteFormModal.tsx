/**
 * Note form modal component (Create/Edit)
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
// Select component not needed - using native select
import { NoteType } from '@/types/note.types';
import toast from 'react-hot-toast';

// Validation schema
const noteFormSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  content: z.string().min(1, 'Le contenu est requis'),
  type: z.nativeEnum(NoteType),
  recipientIds: z.array(z.string()).min(1, 'Au moins un destinataire est requis'),
});

type NoteFormData = z.infer<typeof noteFormSchema>;

interface NoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  noteId?: string;
}

export function NoteFormModal({ isOpen, onClose, noteId }: NoteFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteFormSchema),
    defaultValues: {
      type: NoteType.CONVOCATION,
      recipientIds: [],
    },
  });

  const onSubmit = async (data: NoteFormData) => {
    try {
      // TODO: Replace with actual API call
      console.log('Note data:', data);
      
      toast.success(noteId ? 'Note modifiée avec succès' : 'Note créée avec succès');
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
            {noteId ? 'Modifier la note' : 'Créer une nouvelle note'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations de la note
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
              Titre *
            </label>
            <Input
              id="title"
              {...register('title')}
              error={errors.title?.message}
              placeholder="Titre de la note"
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
              <option value={NoteType.CONVOCATION}>Convocation</option>
              <option value={NoteType.RAPPORT}>Rapport</option>
              <option value={NoteType.ANNONCE}>Annonce</option>
              <option value={NoteType.COMPTE_RENDU}>Compte rendu</option>
              <option value={NoteType.AUTRE}>Autre</option>
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
              placeholder="Contenu de la note"
              rows={8}
            />
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinataires *
            </label>
            <p className="text-sm text-gray-500 mb-2">
              Sélection des destinataires (à implémenter avec API)
            </p>
            {errors.recipientIds && (
              <p className="text-xs text-red-500">{errors.recipientIds.message}</p>
            )}
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
              {isSubmitting ? 'Enregistrement...' : noteId ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

