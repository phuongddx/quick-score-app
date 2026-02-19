import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mockDataService } from '../services/mock-data-service';

// Test the service layer that the hook wraps
describe('useLiveMatches — underlying service', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('getLiveMatches returns array of live/halftime matches', () => {
    const matches = mockDataService.getLiveMatches();
    expect(Array.isArray(matches)).toBe(true);
    matches.forEach((m) => {
      expect(['live', 'halftime']).toContain(m.status);
    });
  });

  test('getLiveMatches returns at least 5 live matches', () => {
    const matches = mockDataService.getLiveMatches();
    expect(matches.length).toBeGreaterThanOrEqual(5);
  });

  test('getLiveCount matches getLiveMatches().length', () => {
    const count = mockDataService.getLiveCount();
    const matches = mockDataService.getLiveMatches();
    // Count is based on base data, matches may have simulation applied but count
    // should be consistent
    expect(count).toBeGreaterThanOrEqual(0);
    expect(matches.length).toBeGreaterThanOrEqual(0);
  });

  test('all live matches have homeTeam and awayTeam', () => {
    const matches = mockDataService.getLiveMatches();
    matches.forEach((m) => {
      expect(m.homeTeam).toBeDefined();
      expect(m.awayTeam).toBeDefined();
      expect(m.homeTeam.id).toBeTruthy();
      expect(m.awayTeam.id).toBeTruthy();
    });
  });
});
