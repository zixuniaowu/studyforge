import { create } from 'zustand';
import { Flashcard, FlashcardDeck } from '../types';
import { deckDB, flashcardDB } from '../lib/db';
import { calculateSM2, ratingToQuality, SimpleRating } from '../lib/spacedRepetition';

interface FlashcardStore {
  decks: FlashcardDeck[];
  currentDeck: FlashcardDeck | null;
  cards: Flashcard[];
  dueCards: Flashcard[];
  currentCard: Flashcard | null;
  currentCardIndex: number;
  isFlipped: boolean;
  isLoading: boolean;

  // Actions
  loadDecks: () => Promise<void>;
  createDeck: (deck: Omit<FlashcardDeck, 'id' | 'cardCount' | 'createdAt' | 'updatedAt'>) => Promise<string>;
  updateDeck: (id: string, updates: Partial<FlashcardDeck>) => Promise<void>;
  deleteDeck: (id: string) => Promise<void>;
  selectDeck: (deck: FlashcardDeck | null) => void;

  loadCards: (deckId: string) => Promise<void>;
  createCard: (card: Omit<Flashcard, 'id' | 'createdAt'>) => Promise<string>;
  updateCard: (id: string, updates: Partial<Flashcard>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;

  loadDueCards: (deckId?: string) => Promise<void>;
  startReview: () => void;
  flipCard: () => void;
  rateCard: (rating: SimpleRating) => Promise<void>;
  nextCard: () => void;
}

export const useFlashcardStore = create<FlashcardStore>((set, get) => ({
  decks: [],
  currentDeck: null,
  cards: [],
  dueCards: [],
  currentCard: null,
  currentCardIndex: 0,
  isFlipped: false,
  isLoading: false,

  loadDecks: async () => {
    set({ isLoading: true });
    try {
      const decks = await deckDB.getAllDecks();
      set({ decks, isLoading: false });
    } catch (error) {
      console.error('Failed to load decks:', error);
      set({ isLoading: false });
    }
  },

  createDeck: async (deckData) => {
    const now = new Date().toISOString();
    const deck: FlashcardDeck = {
      ...deckData,
      id: `deck-${Date.now()}`,
      cardCount: 0,
      createdAt: now,
      updatedAt: now
    };

    await deckDB.createDeck(deck);
    const decks = await deckDB.getAllDecks();
    set({ decks, currentDeck: deck });
    return deck.id;
  },

  updateDeck: async (id, updates) => {
    await deckDB.updateDeck(id, updates);
    const decks = await deckDB.getAllDecks();
    const currentDeck = get().currentDeck;
    if (currentDeck?.id === id) {
      const updatedDeck = decks.find(d => d.id === id);
      set({ decks, currentDeck: updatedDeck || null });
    } else {
      set({ decks });
    }
  },

  deleteDeck: async (id) => {
    await deckDB.deleteDeck(id);
    const decks = await deckDB.getAllDecks();
    const currentDeck = get().currentDeck;
    if (currentDeck?.id === id) {
      set({ decks, currentDeck: null, cards: [] });
    } else {
      set({ decks });
    }
  },

  selectDeck: (deck) => {
    set({ currentDeck: deck, cards: [], currentCard: null });
    if (deck) {
      get().loadCards(deck.id);
    }
  },

  loadCards: async (deckId) => {
    set({ isLoading: true });
    try {
      const cards = await flashcardDB.getCardsByDeck(deckId);
      set({ cards, isLoading: false });
    } catch (error) {
      console.error('Failed to load cards:', error);
      set({ isLoading: false });
    }
  },

  createCard: async (cardData) => {
    const card: Flashcard = {
      ...cardData,
      id: `card-${Date.now()}`,
      createdAt: new Date().toISOString()
    };

    await flashcardDB.createCard(card);
    const cards = await flashcardDB.getCardsByDeck(card.deckId);
    const decks = await deckDB.getAllDecks();
    set({ cards, decks });
    return card.id;
  },

  updateCard: async (id, updates) => {
    await flashcardDB.updateCard(id, updates);
    const card = await flashcardDB.getCard(id);
    if (card) {
      const cards = await flashcardDB.getCardsByDeck(card.deckId);
      set({ cards });
    }
  },

  deleteCard: async (id) => {
    const card = await flashcardDB.getCard(id);
    await flashcardDB.deleteCard(id);
    if (card) {
      const cards = await flashcardDB.getCardsByDeck(card.deckId);
      const decks = await deckDB.getAllDecks();
      set({ cards, decks });
    }
  },

  loadDueCards: async (deckId) => {
    set({ isLoading: true });
    try {
      const dueCards = await flashcardDB.getDueCards(deckId);
      set({ dueCards, isLoading: false });
    } catch (error) {
      console.error('Failed to load due cards:', error);
      set({ isLoading: false });
    }
  },

  startReview: () => {
    const { dueCards } = get();
    if (dueCards.length > 0) {
      set({
        currentCardIndex: 0,
        currentCard: dueCards[0],
        isFlipped: false
      });
    }
  },

  flipCard: () => {
    set({ isFlipped: true });
  },

  rateCard: async (rating) => {
    const { currentCard, dueCards, currentCardIndex } = get();
    if (!currentCard) return;

    // Get current review state
    const review = await flashcardDB.getReview(currentCard.id);
    if (!review) return;

    // Calculate new review parameters using SM-2
    const quality = ratingToQuality(rating);
    const result = calculateSM2(quality, {
      easeFactor: review.easeFactor,
      interval: review.interval,
      repetitions: review.repetitions
    });

    // Update review in database
    await flashcardDB.updateReview(currentCard.id, {
      easeFactor: result.easeFactor,
      interval: result.interval,
      repetitions: result.repetitions,
      nextReview: result.nextReview.toISOString(),
      lastReview: new Date().toISOString()
    });

    // Move to next card or finish
    if (currentCardIndex < dueCards.length - 1) {
      const nextIndex = currentCardIndex + 1;
      set({
        currentCardIndex: nextIndex,
        currentCard: dueCards[nextIndex],
        isFlipped: false
      });
    } else {
      // Review complete
      set({
        currentCard: null,
        isFlipped: false
      });
    }
  },

  nextCard: () => {
    const { dueCards, currentCardIndex } = get();
    if (currentCardIndex < dueCards.length - 1) {
      const nextIndex = currentCardIndex + 1;
      set({
        currentCardIndex: nextIndex,
        currentCard: dueCards[nextIndex],
        isFlipped: false
      });
    }
  }
}));
