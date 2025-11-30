'use client';
import { useState } from 'react';
import { Note, ValidationAction } from '@/lib/types'
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';

interface ValidationCardProps {
  note: Note;
}

export function ValidationCard({ note }: ValidationCardProps) {
  const [isApproving, setIsApproving] = useState(false);
  const [isReturning, setIsReturning] = useState(false);
  const [comment, setComment] = useState('');

  const handleApprove = async () => {
    setIsApproving(true);
    // Simulation appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Note approuvée:', note.id);
    setIsApproving(false);
  };

  const handleReturn = async () => {
    if (!comment.trim()) {
      alert('Veuillez ajouter un commentaire pour retourner la note');
      return;
    }

    setIsReturning(true);
    // Simulation appel API
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Note retournée:', note.id, comment);
    setIsReturning(false);
    setComment('');
  };

  // Fonction pour obtenir le nom complet de l'auteur
  const getAuthorFullName = () => {
    return `${note.author.firstName} ${note.author.lastName}`;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      {/* En-tête */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{note.title}</h3>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            {/* Correction : Utiliser firstName et lastName */}
            <span>Auteur: {getAuthorFullName()}</span>
            <span>Département: {note.author.department || 'Non spécifié'}</span>
            <span>Type: {note.type.name}</span> {/* Note: type est un objet NoteType */}
            <span className="px-2 py-1 bg-orange-100 text-orange-800 rounded-full text-xs">
              En attente
            </span>
          </div>
        </div>
      </div>

      {/* Contenu */}
      <div className="prose max-w-none">
        <p className="text-gray-700">{note.content}</p>
      </div>

      {/* Actions de validation */}
      <div className="border-t pt-4 space-y-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleApprove}
            disabled={isApproving || isReturning}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <CheckCircle className="w-4 h-4" />
            <span>{isApproving ? 'Validation...' : 'Approuver'}</span>
          </button>

          <button
            onClick={() => {
              const commentSection = document.getElementById(`comment-${note.id}`);
              commentSection?.classList.toggle('hidden');
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Commenter</span>
          </button>
        </div>

        {/* Section commentaire pour retour */}
        <div id={`comment-${note.id}`} className="hidden space-y-3">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ajoutez un commentaire pour expliquer les modifications nécessaires..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#010b40] focus:border-transparent"
            rows={3}
          />
          <div className="flex justify-end">
            <button
              onClick={handleReturn}
              disabled={isReturning || isApproving}
              className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <XCircle className="w-4 h-4" />
              <span>{isReturning ? 'Retour...' : 'Retourner avec commentaire'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}