import { create } from 'zustand';

const todayISO = () => new Date().toISOString().split('T')[0]!;

interface FiltersState {
  selectedDate: string; // ISO date string e.g. "2026-02-19"
  selectedLeagueIds: string[]; // empty = show all leagues
  setDate: (date: string) => void;
  toggleLeague: (id: string) => void;
  resetFilters: () => void;
}

export const useFiltersStore = create<FiltersState>()((set) => ({
  selectedDate: todayISO(),
  selectedLeagueIds: [],

  setDate: (date) => set({ selectedDate: date }),

  toggleLeague: (id) =>
    set((s) => ({
      selectedLeagueIds: s.selectedLeagueIds.includes(id)
        ? s.selectedLeagueIds.filter((l) => l !== id)
        : [...s.selectedLeagueIds, id],
    })),

  resetFilters: () => set({ selectedDate: todayISO(), selectedLeagueIds: [] }),
}));
