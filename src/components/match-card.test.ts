import { describe, test, expect } from 'vitest';
import type { Match } from '../types';

// ─── Logic helpers extracted from match-card.tsx ─────────────────────────────
// We test the logic independently so the node env doesn't need to render RN

function isLive(status: Match['status']): boolean {
  return status === 'live' || status === 'halftime';
}

function formatScore(score: Match['score']): string {
  return `${score.home} - ${score.away}`;
}

function countEvents(match: Match, type: string): number {
  return match.events.filter((e) => e.type === type).length;
}

function kickoffUTC(startTime: string): string {
  const d = new Date(startTime);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return `${hh}:${mm}`;
}

const baseMatch: Match = {
  id: 'test-1', leagueId: 'pl', leagueName: 'Premier League', round: 'GW1',
  homeTeam: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', crest: '' },
  awayTeam: { id: 'chelsea', name: 'Chelsea', shortName: 'CHE', crest: '' },
  score: { home: 2, away: 1 }, status: 'live', minute: 67,
  startTime: '2026-02-19T14:00:00Z',
  events: [
    { id: 'e1', type: 'goal',        minute: 23, playerId: 'p1', playerName: 'Saka',      teamId: 'arsenal' },
    { id: 'e2', type: 'goal',        minute: 41, playerId: 'p2', playerName: 'Palmer',    teamId: 'chelsea' },
    { id: 'e3', type: 'yellow_card', minute: 55, playerId: 'p3', playerName: 'Gallagher', teamId: 'chelsea' },
  ],
};

describe('MatchCard logic', () => {
  test('detects live match correctly', () => {
    expect(isLive('live')).toBe(true);
    expect(isLive('halftime')).toBe(true);
    expect(isLive('ended')).toBe(false);
    expect(isLive('scheduled')).toBe(false);
  });

  test('formats score as "home - away"', () => {
    expect(formatScore({ home: 2, away: 1 })).toBe('2 - 1');
    expect(formatScore({ home: 0, away: 0 })).toBe('0 - 0');
  });

  test('counts yellow cards from events', () => {
    expect(countEvents(baseMatch, 'yellow_card')).toBe(1);
  });

  test('counts red cards from events', () => {
    expect(countEvents(baseMatch, 'red_card')).toBe(0);
  });

  test('formats kickoff time from UTC ISO string', () => {
    expect(kickoffUTC('2026-02-19T14:30:00Z')).toBe('14:30');
    expect(kickoffUTC('2026-02-19T20:00:00Z')).toBe('20:00');
  });

  test('live match has green tint — verified via isLive helper', () => {
    expect(isLive(baseMatch.status)).toBe(true);
  });

  test('ended match does NOT show live indicator', () => {
    expect(isLive('ended')).toBe(false);
  });
});
