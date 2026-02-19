import { describe, test, expect, beforeEach } from 'vitest';
import { useFiltersStore } from './filters-store';

const TODAY = new Date().toISOString().split('T')[0]!;

beforeEach(() => {
  useFiltersStore.setState({ selectedDate: TODAY, selectedLeagueIds: [] });
});

describe('filters-store', () => {
  test('setDate updates selectedDate', () => {
    useFiltersStore.getState().setDate('2026-03-01');
    expect(useFiltersStore.getState().selectedDate).toBe('2026-03-01');
  });

  test('toggleLeague adds league when not present', () => {
    useFiltersStore.getState().toggleLeague('pl');
    expect(useFiltersStore.getState().selectedLeagueIds).toContain('pl');
  });

  test('toggleLeague removes league when already present', () => {
    useFiltersStore.setState({ selectedLeagueIds: ['pl', 'laliga'], selectedDate: TODAY });
    useFiltersStore.getState().toggleLeague('pl');
    expect(useFiltersStore.getState().selectedLeagueIds).not.toContain('pl');
    expect(useFiltersStore.getState().selectedLeagueIds).toContain('laliga');
  });

  test('resetFilters restores defaults', () => {
    useFiltersStore.setState({ selectedDate: '2026-01-01', selectedLeagueIds: ['pl', 'laliga'] });
    useFiltersStore.getState().resetFilters();
    expect(useFiltersStore.getState().selectedLeagueIds).toHaveLength(0);
    // Date should be today's ISO date
    expect(useFiltersStore.getState().selectedDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
