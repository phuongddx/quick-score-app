import { create } from 'zustand';

interface SettingsState {
  pushNotifications: boolean;
  liveMatchUpdates: boolean;
  theme: 'dark' | 'light';
  setPushNotifications: (v: boolean) => void;
  setLiveMatchUpdates: (v: boolean) => void;
  toggleTheme: () => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  pushNotifications: true,
  liveMatchUpdates: true,
  theme: 'dark',
  setPushNotifications: (v) => set({ pushNotifications: v }),
  setLiveMatchUpdates: (v) => set({ liveMatchUpdates: v }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
}));
