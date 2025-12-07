/**
 * Document form modal component (Create/Edit)
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
import { NoteType, NoteStatus, Note } from '@/types/note.types';
import { notesService } from '@/services/notes.service';
import { RecipientSelector } from './RecipientSelector';
import toast from 'react-hot-toast';
import { Loader2 } from 'lucide-react';
import { useAuthStore } from '@/store/auth.store';

// Validation schema
const noteFormSchema = z.object({
  title: z.string().min(1, 'Le titre est requis'),
  content: z.string().min(1, 'Le contenu est requis'),
  type: z.nativeEnum(NoteType),
  // allow optional for initial testing; UI will set array from CSV input
  recipientIds: z.array(z.string()).optional(),
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
    setValue,
    setError,
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
    const authUser = useAuthStore.getState().user;

    // Build optimistic temp note
    const tempId = `temp-${Date.now()}`;
    const tempNote: Partial<Note> = {
      id: tempId,
      title: data.title,
      content: data.content,
      type: data.type,
      status: NoteStatus.DRAFT,
      authorId: authUser?.id || 'me',
      author: authUser || { id: 'me', firstName: 'Vous', lastName: '', email: '' },
  recipients: ((data.recipientIds as string[]) || []).map((id) => ({ id, firstName: '', lastName: '', email: '' })),
      attachments: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Dispatch creating event for optimistic UI
    window.dispatchEvent(new CustomEvent('note:creating', { detail: tempNote }));

    try {
      const createDto: any = {
        title: data.title,
        content: data.content,
        type: data.type,
        recipientIds: data.recipientIds || [],
      };

      // attachments from file input
      const attachmentsInput = document.getElementById('attachments') as HTMLInputElement | null;
      if (attachmentsInput && attachmentsInput.files && attachmentsInput.files.length > 0) {
        createDto.attachments = Array.from(attachmentsInput.files);
      }

  const created = await notesService.createNote(createDto);

  toast.success(noteId ? 'Document modifié avec succès' : 'Document créé avec succès');
  reset();
  onClose();
  // notify parent components to refresh list and provide the created note for optimistic update
  window.dispatchEvent(new CustomEvent('note:created', { detail: created }));
    } catch (error: any) {
      // Map server validation errors (ApiError.errors) to form fields if present
      const apiErrors = error?.response?.data?.errors;
      if (apiErrors && typeof apiErrors === 'object') {
        Object.keys(apiErrors).forEach((field) => {
          const messages = apiErrors[field];
          const message = Array.isArray(messages) ? messages.join(', ') : String(messages);
          try {
            setError(field as any, { type: 'server', message });
          } catch (e) {
            // ignore
          }
        });
      }

      // notify parent to rollback optimistic note
      window.dispatchEvent(new CustomEvent('note:create_failed', { detail: { tempId, error } }));
      toast.error(error?.response?.data?.message || error.message || 'Une erreur est survenue');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {noteId ? 'Modifier le document' : 'Créer un nouveau document'}
          </DialogTitle>
          <DialogDescription>
            Remplissez les informations du document
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
              placeholder="Titre du document"
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              placeholder="Contenu du document"
              rows={8}
              disabled={isSubmitting}
            />
          </div>

          {/* Recipients */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Destinataires *
            </label>
              <p className="text-sm text-gray-500 mb-2">Sélectionnez des destinataires</p>
              {/* RecipientSelector will call setValue via onChange */}
              <RecipientSelector
                value={[]}
                onChange={(ids: string[]) => setValue('recipientIds' as any, ids)}
                disabled={isSubmitting}
              />
            {errors.recipientIds && (
              <p className="text-xs text-red-500">{(errors.recipientIds as any)?.message}</p>
            )}
          </div>

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pièces jointes</label>
            <input id="attachments" type="file" multiple className="text-sm" disabled={isSubmitting} />
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-[#010b40] hover:bg-[#010b40]/90 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="animate-spin h-4 w-4" />}
              {isSubmitting ? 'Enregistrement...' : noteId ? 'Modifier' : 'Créer'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

