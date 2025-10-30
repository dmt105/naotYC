import { create } from 'zustand';
import { Note, ValidationAction } from '@/types/index';

interface NotesState {
  notes: Note[];
  pendingValidation: Note[];
  validatedNotes: Note[];
  loading: boolean;
  setNotes: (notes: Note[]) => void;
  validateNote: (noteId: string, action: ValidationAction) => Promise<void>;
  addComment: (noteId: string, content: string) => Promise<void>;
  fetchPendingValidation: () => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  pendingValidation: [],
  validatedNotes: [],
  loading: false,
  setNotes: (notes) => set({ notes }),
  validateNote: async (noteId: string, action: ValidationAction) => {
    set({ loading: true });
    try {
      // API call simulation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const { pendingValidation } = get();
      const updatedNotes = pendingValidation.filter(note => note.id !== noteId);
      
      set({ 
        pendingValidation: updatedNotes,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
      throw error;
    }
  },
  addComment: async (noteId: string, content: string) => {
    // Implementation for adding comments
  },
  fetchPendingValidation: async () => {
    set({ loading: true });
    try {
      // Mock data for demonstration
      const mockNotes: Note[] = [
        {
          id: '1',
          title: 'Convocation réunion département',
          content: 'Convocation pour la réunion mensuelle du département...',
          type: 'CONVOCATION',
          status: 'PENDING_VALIDATION',
          author: {
            id: '2',
            email: 'redactor@youthcomputing.org',
            firstName: 'Marie',
            lastName: 'Dubois',
            role: 'REDACTOR'
          },
          recipients: [],
          attachments: [],
          comments: [],
          history: [],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-15T10:00:00Z'
        }
      ];
      
      set({ 
        pendingValidation: mockNotes,
        loading: false 
      });
    } catch (error) {
      set({ loading: false });
    }
  }
}));