import { create } from 'zustand';

interface SettingsState {
  pushNotifications: boolean;
  liveMatchUpdates: boolean;
  theme: 'dark' | 'light';
  language: string;
  isLoggedIn: boolean;
  setPushNotifications: (v: boolean) => void;
  setLiveMatchUpdates: (v: boolean) => void;
  toggleTheme: () => void;
  setLanguage: (lang: string) => void;
  login: () => void;
  logout: () => void;
}

export const useSettingsStore = create<SettingsState>()((set) => ({
  pushNotifications: true,
  liveMatchUpdates: true,
  theme: 'dark',
  language: 'English',
  isLoggedIn: false,
  setPushNotifications: (v) => set({ pushNotifications: v }),
  setLiveMatchUpdates: (v) => set({ liveMatchUpdates: v }),
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  setLanguage: (lang) => set({ language: lang }),
  login: () => set({ isLoggedIn: true }),
  logout: () => set({ isLoggedIn: false }),
}));
