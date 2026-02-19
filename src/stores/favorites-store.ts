import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesState {
  favoriteTeamIds: string[];
  favoriteLeagueIds: string[];
  addTeam: (id: string) => void;
  removeTeam: (id: string) => void;
  addLeague: (id: string) => void;
  removeLeague: (id: string) => void;
  isFavoriteTeam: (id: string) => boolean;
  isFavoriteLeague: (id: string) => boolean;
  clearAll: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteTeamIds: [],
      favoriteLeagueIds: [],

      addTeam: (id) =>
        set((s) => ({ favoriteTeamIds: s.favoriteTeamIds.includes(id) ? s.favoriteTeamIds : [...s.favoriteTeamIds, id] })),

      removeTeam: (id) =>
        set((s) => ({ favoriteTeamIds: s.favoriteTeamIds.filter((t) => t !== id) })),

      addLeague: (id) =>
        set((s) => ({ favoriteLeagueIds: s.favoriteLeagueIds.includes(id) ? s.favoriteLeagueIds : [...s.favoriteLeagueIds, id] })),

      removeLeague: (id) =>
        set((s) => ({ favoriteLeagueIds: s.favoriteLeagueIds.filter((l) => l !== id) })),

      isFavoriteTeam: (id) => get().favoriteTeamIds.includes(id),
      isFavoriteLeague: (id) => get().favoriteLeagueIds.includes(id),

      clearAll: () => set({ favoriteTeamIds: [], favoriteLeagueIds: [] }),
    }),
    {
      name: 'quick-score-favorites',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
