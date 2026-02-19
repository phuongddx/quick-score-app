import { describe, test, expect } from 'vitest';
import { PL_STANDINGS } from '../data/mock-standings-pl';
import type { StandingsEntry } from '../types';

// ─── Zone color logic from standings-table.tsx ───────────────────────────────

const ZONE_COLORS: Record<string, string> = {
  cl:         '#00C853',
  el:         '#FF9800',
  ecl:        '#9C27B0',
  relegation: '#FF3D3D',
};

function getZoneColor(zone: StandingsEntry['zone']): string {
  return zone ? (ZONE_COLORS[zone] ?? 'transparent') : 'transparent';
}

function getTopN(entries: StandingsEntry[], n: number): StandingsEntry[] {
  return [...entries].sort((a, b) => a.position - b.position).slice(0, n);
}

function getBottomN(entries: StandingsEntry[], n: number): StandingsEntry[] {
  return [...entries].sort((a, b) => b.position - a.position).slice(0, n);
}

describe('StandingsTable — PL data', () => {
  test('PL standings has 20 teams', () => {
    expect(PL_STANDINGS).toHaveLength(20);
  });

  test('position 1 has CL zone', () => {
    const first = getTopN(PL_STANDINGS, 1)[0]!;
    expect(first.zone).toBe('cl');
    expect(getZoneColor(first.zone)).toBe('#00C853');
  });

  test('top 4 are all in CL zone', () => {
    const top4 = getTopN(PL_STANDINGS, 4);
    top4.forEach((e) => expect(e.zone).toBe('cl'));
  });

  test('bottom 3 are in relegation zone', () => {
    const bottom3 = getBottomN(PL_STANDINGS, 3);
    bottom3.forEach((e) => expect(e.zone).toBe('relegation'));
  });

  test('zone color for relegation is red', () => {
    expect(getZoneColor('relegation')).toBe('#FF3D3D');
  });

  test('zone color for null is transparent', () => {
    expect(getZoneColor(null)).toBe('transparent');
  });

  test('every entry has a form array of length ≤ 5', () => {
    PL_STANDINGS.forEach((e) => {
      expect(e.form.length).toBeLessThanOrEqual(5);
      e.form.forEach((r) => expect(['W', 'D', 'L']).toContain(r));
    });
  });

  test('goal difference matches goalsFor - goalsAgainst', () => {
    PL_STANDINGS.forEach((e) => {
      expect(e.goalDiff).toBe(e.goalsFor - e.goalsAgainst);
    });
  });

  test('5th place has EL zone', () => {
    const fifth = PL_STANDINGS.find((e) => e.position === 5)!;
    expect(fifth.zone).toBe('el');
  });

  test('6th place has ECL zone', () => {
    const sixth = PL_STANDINGS.find((e) => e.position === 6)!;
    expect(sixth.zone).toBe('ecl');
  });
});
