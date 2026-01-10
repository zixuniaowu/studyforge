import { create } from 'zustand';
import { Note } from '../types';
import { noteDB } from '../lib/db';

interface NoteStore {
  notes: Note[];
  currentNote: Note | null;
  isLoading: boolean;
  searchQuery: string;
  selectedTags: string[];

  // Actions
  loadNotes: () => Promise<void>;
  createNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateNote: (id: string, updates: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  selectNote: (note: Note | null) => void;
  setSearchQuery: (query: string) => void;
  setSelectedTags: (tags: string[]) => void;
  searchNotes: (query: string) => Promise<void>;
}

export const useNoteStore = create<NoteStore>((set, get) => ({
  notes: [],
  currentNote: null,
  isLoading: false,
  searchQuery: '',
  selectedTags: [],

  loadNotes: async () => {
    set({ isLoading: true });
    try {
      const notes = await noteDB.getAllNotes();
      set({ notes, isLoading: false });
    } catch (error) {
      console.error('Failed to load notes:', error);
      set({ isLoading: false });
    }
  },

  createNote: async (noteData) => {
    const now = new Date().toISOString();
    const note: Note = {
      ...noteData,
      id: `note-${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };

    await noteDB.createNote(note);
    const notes = await noteDB.getAllNotes();
    set({ notes, currentNote: note });
    return note.id;
  },

  updateNote: async (id, updates) => {
    await noteDB.updateNote(id, updates);
    const notes = await noteDB.getAllNotes();
    const currentNote = get().currentNote;
    if (currentNote?.id === id) {
      const updatedNote = notes.find(n => n.id === id);
      set({ notes, currentNote: updatedNote || null });
    } else {
      set({ notes });
    }
  },

  deleteNote: async (id) => {
    await noteDB.deleteNote(id);
    const notes = await noteDB.getAllNotes();
    const currentNote = get().currentNote;
    if (currentNote?.id === id) {
      set({ notes, currentNote: null });
    } else {
      set({ notes });
    }
  },

  selectNote: (note) => {
    set({ currentNote: note });
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedTags: (tags) => {
    set({ selectedTags: tags });
  },

  searchNotes: async (query) => {
    set({ isLoading: true, searchQuery: query });
    try {
      const notes = query
        ? await noteDB.searchNotes(query)
        : await noteDB.getAllNotes();
      set({ notes, isLoading: false });
    } catch (error) {
      console.error('Failed to search notes:', error);
      set({ isLoading: false });
    }
  }
}));
