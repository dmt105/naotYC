import { create } from 'zustand';
import { Note, Comment, ValidationAction } from '@/lib/types';

interface NotesState {
  notes: Note[];
  currentNote: Note | null;
  validationQueue: Note[];
  isLoading: boolean;
  
  // Actions
  setNotes: (notes: Note[]) => void;
  setCurrentNote: (note: Note | null) => void;
  addNote: (note: Note) => void;
  updateNote: (id: string, updates: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  addComment: (noteId: string, comment: Omit<Comment, 'id' | 'createdAt' | 'noteId'>) => void;
  validateNote: (noteId: string, action: ValidationAction) => void;
  setLoading: (loading: boolean) => void;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  currentNote: null,
  validationQueue: [],
  isLoading: false,

  setNotes: (notes) => set({ notes }),
  
  setCurrentNote: (currentNote) => set({ currentNote }),
  
  addNote: (note) => set((state) => ({ 
    notes: [...state.notes, note] 
  })),
  
  updateNote: (id, updates) => set((state) => ({
    notes: state.notes.map(note => 
      note.id === id ? { ...note, ...updates, updatedAt: new Date().toISOString() } : note
    ),
    currentNote: state.currentNote?.id === id 
      ? { ...state.currentNote, ...updates, updatedAt: new Date().toISOString() }
      : state.currentNote
  })),
  
  deleteNote: (id) => set((state) => ({
    notes: state.notes.filter(note => note.id !== id),
    currentNote: state.currentNote?.id === id ? null : state.currentNote
  })),
  
  addComment: (noteId, commentData) => set((state) => {
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      ...commentData,
      createdAt: new Date().toISOString(),
      noteId: noteId
    };

    return {
      notes: state.notes.map(note =>
        note.id === noteId
          ? { 
              ...note, 
              comments: [...note.comments, newComment],
              updatedAt: new Date().toISOString()
            }
          : note
      ),
      currentNote: state.currentNote?.id === noteId
        ? {
            ...state.currentNote,
            comments: [...state.currentNote.comments, newComment],
            updatedAt: new Date().toISOString()
          }
        : state.currentNote
    };
  }),
  
  validateNote: (noteId, action) => set((state) => {
    const currentNote = state.notes.find(note => note.id === noteId);
    if (!currentNote) return state;

    let newStatus: Note['status'] = currentNote.status;
    
    switch (action.type) {
      case 'APPROVE':
        if (currentNote.status === 'PENDING_VALIDATION') {
          newStatus = 'APPROVED';
        }
        break;
      case 'RETURN':
        newStatus = 'RETURNED';
        break;
      case 'REJECT':
        newStatus = 'DRAFT';
        break;
      default:
        newStatus = currentNote.status;
    }

    // Préparer les mises à jour
    const updates: Partial<Note> = {
      status: newStatus,
      updatedAt: new Date().toISOString(),
      history: [
        ...currentNote.history,
        {
          id: `history-${Date.now()}`,
          action: action.type,
          fromStatus: currentNote.status,
          toStatus: newStatus,
          performedBy: action.validatedBy,
          performedAt: action.validatedAt,
          comment: action.comment
        }
      ]
    };

    // Ajouter un commentaire si fourni
    if (action.comment) {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        content: action.comment,
        author: action.validatedBy,
        createdAt: new Date().toISOString(),
        noteId: noteId,
        mentions: []
      };
      updates.comments = [...currentNote.comments, comment];
    }

    const updatedNotes = state.notes.map(note =>
      note.id === noteId ? { ...note, ...updates } : note
    );

    const updatedCurrentNote = state.currentNote?.id === noteId 
      ? { ...state.currentNote, ...updates }
      : state.currentNote;

    return {
      notes: updatedNotes,
      currentNote: updatedCurrentNote
    };
  }),
  
  setLoading: (isLoading) => set({ isLoading })
}));