import { vi } from 'vitest';

// Mock AsyncStorage for Zustand persist middleware
vi.mock('@react-native-async-storage/async-storage', () => ({
  default: {
    getItem:     vi.fn().mockResolvedValue(null),
    setItem:     vi.fn().mockResolvedValue(undefined),
    removeItem:  vi.fn().mockResolvedValue(undefined),
    clear:       vi.fn().mockResolvedValue(undefined),
    getAllKeys:   vi.fn().mockResolvedValue([]),
    multiGet:    vi.fn().mockResolvedValue([]),
    multiSet:    vi.fn().mockResolvedValue(undefined),
    multiRemove: vi.fn().mockResolvedValue(undefined),
  },
}));

// Mock expo-constants
vi.mock('expo-constants', () => ({
  default: { expoConfig: { version: '1.0.0' } },
}));
