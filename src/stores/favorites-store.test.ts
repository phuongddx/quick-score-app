import { describe, test, expect, beforeEach } from 'vitest';
import { useFavoritesStore } from './favorites-store';

// Reset store state before each test
beforeEach(() => {
  useFavoritesStore.setState({ favoriteTeamIds: [], favoriteLeagueIds: [] });
});

describe('favorites-store — teams', () => {
  test('addTeam adds team ID to array', () => {
    useFavoritesStore.getState().addTeam('arsenal');
    expect(useFavoritesStore.getState().favoriteTeamIds).toContain('arsenal');
  });

  test('addTeam is idempotent — no duplicates', () => {
    useFavoritesStore.getState().addTeam('arsenal');
    useFavoritesStore.getState().addTeam('arsenal');
    expect(useFavoritesStore.getState().favoriteTeamIds).toHaveLength(1);
  });

  test('removeTeam removes the correct ID', () => {
    useFavoritesStore.setState({ favoriteTeamIds: ['arsenal', 'chelsea'] });
    useFavoritesStore.getState().removeTeam('arsenal');
    expect(useFavoritesStore.getState().favoriteTeamIds).not.toContain('arsenal');
    expect(useFavoritesStore.getState().favoriteTeamIds).toContain('chelsea');
  });

  test('isFavoriteTeam returns true for saved team', () => {
    useFavoritesStore.setState({ favoriteTeamIds: ['liverpool'] });
    expect(useFavoritesStore.getState().isFavoriteTeam('liverpool')).toBe(true);
  });

  test('isFavoriteTeam returns false for unknown team', () => {
    expect(useFavoritesStore.getState().isFavoriteTeam('unknown')).toBe(false);
  });
});

describe('favorites-store — leagues', () => {
  test('addLeague adds league ID', () => {
    useFavoritesStore.getState().addLeague('pl');
    expect(useFavoritesStore.getState().favoriteLeagueIds).toContain('pl');
  });

  test('removeLeague removes the correct ID', () => {
    useFavoritesStore.setState({ favoriteLeagueIds: ['pl', 'laliga'] });
    useFavoritesStore.getState().removeLeague('pl');
    expect(useFavoritesStore.getState().favoriteLeagueIds).not.toContain('pl');
    expect(useFavoritesStore.getState().favoriteLeagueIds).toContain('laliga');
  });

  test('clearAll empties both arrays', () => {
    useFavoritesStore.setState({ favoriteTeamIds: ['arsenal'], favoriteLeagueIds: ['pl'] });
    useFavoritesStore.getState().clearAll();
    expect(useFavoritesStore.getState().favoriteTeamIds).toHaveLength(0);
    expect(useFavoritesStore.getState().favoriteLeagueIds).toHaveLength(0);
  });
});
