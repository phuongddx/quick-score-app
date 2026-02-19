import { describe, test, expect } from 'vitest';
import { mockDataService } from './mock-data-service';

describe('mockDataService.getLiveMatches', () => {
  test('returns only live and halftime matches', () => {
    const results = mockDataService.getLiveMatches();
    expect(results.length).toBeGreaterThan(0);
    results.forEach((m) => {
      expect(['live', 'halftime']).toContain(m.status);
    });
  });

  test('live matches have a minute value', () => {
    const results = mockDataService.getLiveMatches();
    results.filter((m) => m.status === 'live').forEach((m) => {
      expect(m.minute).toBeDefined();
      expect(typeof m.minute).toBe('number');
    });
  });
});

describe('mockDataService.getMatchesByDate', () => {
  test('returns matches for 2026-02-19', () => {
    const results = mockDataService.getMatchesByDate('2026-02-19');
    expect(results.length).toBeGreaterThan(0);
    results.forEach((m) => {
      expect(m.startTime).toContain('2026-02-19');
    });
  });

  test('returns empty array for date with no matches', () => {
    const results = mockDataService.getMatchesByDate('2000-01-01');
    expect(results).toHaveLength(0);
  });
});

describe('mockDataService.getMatchById', () => {
  test('returns a match for known ID', () => {
    const match = mockDataService.getMatchById('pl-ars-che');
    expect(match).not.toBeNull();
    expect(match!.id).toBe('pl-ars-che');
  });

  test('returns null for unknown ID', () => {
    const match = mockDataService.getMatchById('nonexistent-id');
    expect(match).toBeNull();
  });
});

describe('mockDataService.getStandings', () => {
  test('returns 20 entries for Premier League', () => {
    const entries = mockDataService.getStandings('pl');
    expect(entries).toHaveLength(20);
  });

  test('entries are sorted by points descending', () => {
    const entries = mockDataService.getStandings('pl');
    for (let i = 0; i < entries.length - 1; i++) {
      expect(entries[i]!.points).toBeGreaterThanOrEqual(entries[i + 1]!.points);
    }
  });

  test('returns empty array for unknown league', () => {
    expect(mockDataService.getStandings('unknown')).toHaveLength(0);
  });
});

describe('mockDataService.getFixtures', () => {
  test('returns only scheduled matches', () => {
    const fixtures = mockDataService.getFixtures();
    fixtures.forEach((m) => {
      expect(m.status).toBe('scheduled');
    });
  });

  test('filters by leagueId when provided', () => {
    const fixtures = mockDataService.getFixtures('pl');
    fixtures.forEach((m) => {
      expect(m.leagueId).toBe('pl');
    });
  });
});

describe('mockDataService.getLiveCount', () => {
  test('returns a non-negative number', () => {
    const count = mockDataService.getLiveCount();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
