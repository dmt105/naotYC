/**
 * Comment thread component - displays comments on a note
 */

'use client';

import { useState } from 'react';
import { Send, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { NoteComment } from '@/types/note.types';
import { formatRelativeTime } from '@/lib/utils';

// Mock data
const mockComments: NoteComment[] = [
  {
    id: '1',
    noteId: '1',
    authorId: '1',
    author: {
      id: '1',
      firstName: 'Jean',
      lastName: 'Dupont',
    },
    content: 'Merci pour ce rapport détaillé. Quelques suggestions à prendre en compte.',
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    noteId: '1',
    authorId: '2',
    author: {
      id: '2',
      firstName: 'Marie',
      lastName: 'Martin',
    },
    content: 'D\'accord, je vais intégrer ces suggestions.',
    createdAt: '2025-01-15T11:00:00Z',
    updatedAt: '2025-01-15T11:00:00Z',
  },
];

interface CommentThreadProps {
  noteId: string;
}

export function CommentThread({ noteId }: CommentThreadProps) {
  const [comments] = useState<NoteComment[]>(mockComments);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNewComment('');
      // toast.success('Commentaire ajouté');
    } catch (error: any) {
      // toast.error('Erreur lors de l\'ajout du commentaire');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#010b40]">Commentaires</h3>

      {/* Comments list */}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="flex space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={comment.author.avatar} />
              <AvatarFallback className="bg-[#010b40] text-white">
                {comment.author.firstName[0]}{comment.author.lastName[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-medium text-gray-900">
                    {comment.author.firstName} {comment.author.lastName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatRelativeTime(comment.createdAt)}
                  </span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add comment form */}
      <form onSubmit={handleSubmit} className="flex space-x-3">
        <Textarea
          placeholder="Ajouter un commentaire..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={2}
          className="flex-1"
        />
        <Button
          type="submit"
          disabled={isLoading || !newComment.trim()}
          className="bg-[#010b40] hover:bg-[#010b40]/90"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}





