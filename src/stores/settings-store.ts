import { create } from 'zustand';

interface SettingsState {
  notifyGoals: boolean;
  notifyRedCards: boolean;
  notifyMatchStart: boolean;
  notifyFavoritesOnly: boolean;
  setNotifyGoals: (v: boolean) => void;
  setNotifyRedCards: (v: boolean) => void;
  setNotifyMatchStart: (v: boolean) => void;
  setNotifyFavoritesOnly: (v: boolean) => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  notifyGoals: true,
  notifyRedCards: true,
  notifyMatchStart: true,
  notifyFavoritesOnly: false,
  setNotifyGoals: (v) => set({ notifyGoals: v }),
  setNotifyRedCards: (v) => set({ notifyRedCards: v }),
  setNotifyMatchStart: (v) => set({ notifyMatchStart: v }),
  setNotifyFavoritesOnly: (v) => set({ notifyFavoritesOnly: v }),
}));
