import type { Match, MatchScore, StandingsEntry } from '../types';
import { MOCK_MATCHES } from '../data/mock-matches';
import { MOCK_FIXTURES } from '../data/mock-fixtures';
import { getStandingsByLeagueId } from '../data/mock-standings';
import { MATCH_DETAIL_MAP, MOCK_MATCH_DETAIL } from '../data/mock-match-detail';

// ─── Live Simulation Engine ───────────────────────────────────────────────────
// Maintains mutable state for live matches; ticks every 5s to cycle scores/minutes

interface LiveState {
  minute: number;
  score: MatchScore;
}

const liveStateMap = new Map<string, LiveState>();
let lastSimTick = 0;

// Initialise live state from the base mock data
MOCK_MATCHES
  .filter((m) => m.status === 'live' || m.status === 'halftime')
  .forEach((m) => {
    liveStateMap.set(m.id, {
      minute: m.minute ?? 45,
      score: { ...m.score },
    });
  });
// Also init the detail matches
MOCK_MATCH_DETAIL
  .filter((m) => m.status === 'live')
  .forEach((m) => {
    if (!liveStateMap.has(m.id)) {
      liveStateMap.set(m.id, { minute: m.minute ?? 45, score: { ...m.score } });
    }
  });

function tickLiveSimulation(): void {
  const now = Date.now();
  if (now - lastSimTick < 5000) return; // tick at most every 5s
  lastSimTick = now;

  for (const [, state] of liveStateMap) {
    // Advance match minute toward 90
    if (state.minute < 90) state.minute += 1;

    // ~8% chance of a goal per tick (home or away, random)
    if (Math.random() < 0.08) {
      if (Math.random() < 0.55) state.score.home += 1;
      else state.score.away += 1;
    }
  }
}

function applyLiveState(match: Match): Match {
  const state = liveStateMap.get(match.id);
  if (!state) return match;
  return { ...match, minute: state.minute, score: { ...state.score } };
}

// ─── Service ─────────────────────────────────────────────────────────────────
export const mockDataService = {
  getLiveMatches(): Match[] {
    tickLiveSimulation();
    return MOCK_MATCHES.filter((m) => m.status === 'live' || m.status === 'halftime')
      .map(applyLiveState);
  },

  getMatchesByDate(date: string): Match[] {
    tickLiveSimulation();
    return MOCK_MATCHES.filter((m) => m.startTime.startsWith(date)).map(applyLiveState);
  },

  getMatchById(id: string): Match | null {
    tickLiveSimulation();
    // Check detailed matches first (richer data)
    const detail = MATCH_DETAIL_MAP[id];
    if (detail) return applyLiveState(detail);
    const match = MOCK_MATCHES.find((m) => m.id === id);
    return match ? applyLiveState(match) : null;
  },

  getStandings(leagueId: string): StandingsEntry[] {
    return getStandingsByLeagueId(leagueId);
  },

  getFixtures(leagueId?: string, days = 14): Match[] {
    const cutoff = new Date(Date.now() + days * 86_400_000).toISOString();
    return MOCK_FIXTURES.filter(
      (m) =>
        m.status === 'scheduled' &&
        m.startTime <= cutoff &&
        (leagueId ? m.leagueId === leagueId : true),
    );
  },

  getLiveCount(): number {
    return MOCK_MATCHES.filter((m) => m.status === 'live' || m.status === 'halftime').length;
  },

  getAllTeams() {
    const teams = new Map<string, Match['homeTeam']>();
    MOCK_MATCHES.forEach((m) => {
      teams.set(m.homeTeam.id, m.homeTeam);
      teams.set(m.awayTeam.id, m.awayTeam);
    });
    return Array.from(teams.values());
  },
};
