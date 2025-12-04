/**
 * Validation actions component - Approve, Return, Archive
 */

'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import toast from 'react-hot-toast';

interface ValidationActionsProps {
  noteId: string;
  onActionComplete?: () => void;
}

export function ValidationActions({ noteId, onActionComplete }: ValidationActionsProps) {
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [comment, setComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleApprove = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Note approuvée avec succès');
      setIsApproveModalOpen(false);
      setComment('');
      onActionComplete?.();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'approbation');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async () => {
    if (!comment.trim()) {
      toast.error('Veuillez ajouter un commentaire');
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Note retournée avec commentaire');
      setIsReturnModalOpen(false);
      setComment('');
      onActionComplete?.();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors du retour');
    } finally {
      setIsLoading(false);
    }
  };

  const handleArchive = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success('Note archivée');
      setIsArchiveModalOpen(false);
      onActionComplete?.();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'archivage');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          onClick={() => setIsApproveModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white"
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          Approuver
        </Button>
        <Button
          onClick={() => setIsReturnModalOpen(true)}
          variant="outline"
          className="border-red-500 text-red-500 hover:bg-red-50"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Retourner
        </Button>
        <Button
          onClick={() => setIsArchiveModalOpen(true)}
          variant="outline"
          className="border-gray-500 text-gray-500 hover:bg-gray-50"
        >
          <Archive className="h-4 w-4 mr-2" />
          Archiver
        </Button>
      </div>

      {/* Approve Modal */}
      <Dialog open={isApproveModalOpen} onOpenChange={setIsApproveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approuver la note</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir approuver cette note ?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={() => setIsApproveModalOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleApprove}
              disabled={isLoading}
              className="bg-green-500 hover:bg-green-600"
            >
              {isLoading ? 'Traitement...' : 'Approuver'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Return Modal */}
      <Dialog open={isReturnModalOpen} onOpenChange={setIsReturnModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Retourner la note</DialogTitle>
            <DialogDescription>
              Ajoutez un commentaire expliquant pourquoi la note est retournée
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4">
            <Textarea
              placeholder="Commentaire..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={4}
            />
          </div>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={() => setIsReturnModalOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleReturn}
              disabled={isLoading || !comment.trim()}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? 'Traitement...' : 'Retourner'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Archive Modal */}
      <Dialog open={isArchiveModalOpen} onOpenChange={setIsArchiveModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Archiver la note</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir archiver cette note ?
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end space-x-3 mt-4">
            <Button variant="outline" onClick={() => setIsArchiveModalOpen(false)}>
              Annuler
            </Button>
            <Button
              onClick={handleArchive}
              disabled={isLoading}
              className="bg-gray-500 hover:bg-gray-600"
            >
              {isLoading ? 'Traitement...' : 'Archiver'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

