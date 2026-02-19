import type { Match } from '../types';
import { MOCK_MATCHES } from './mock-matches';

// Fixtures = upcoming scheduled matches from mock-matches + extra upcoming
const EXTRA_FIXTURES: Match[] = [
  {
    id: 'pl-ars-tot', leagueId: 'pl', leagueName: 'Premier League', round: 'GW27',
    homeTeam: { id: 'arsenal', name: 'Arsenal', shortName: 'ARS', crest: '' },
    awayTeam: { id: 'tottenham', name: 'Tottenham', shortName: 'TOT', crest: '' },
    score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-26T20:00:00Z', events: [],
  },
  {
    id: 'll-rma-atm', leagueId: 'laliga', leagueName: 'La Liga', round: 'GW28',
    homeTeam: { id: 'realmadrid', name: 'Real Madrid', shortName: 'RMA', crest: '' },
    awayTeam: { id: 'atletico', name: 'Atlético Madrid', shortName: 'ATM', crest: '' },
    score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-25T20:00:00Z', events: [],
  },
  {
    id: 'bl-bay-bvb2', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW25',
    homeTeam: { id: 'bayernmunich', name: 'Bayern Munich', shortName: 'BAY', crest: '' },
    awayTeam: { id: 'dortmund', name: 'Borussia Dortmund', shortName: 'BVB', crest: '' },
    score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-28T15:30:00Z', events: [],
  },
  {
    id: 'sa-int-rom', leagueId: 'seriea', leagueName: 'Serie A', round: 'GW27',
    homeTeam: { id: 'inter', name: 'Inter Milan', shortName: 'INT', crest: '' },
    awayTeam: { id: 'roma', name: 'AS Roma', shortName: 'ROM', crest: '' },
    score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-24T20:00:00Z', events: [],
  },
  {
    id: 'l1-mon-psg', leagueId: 'ligue1', leagueName: 'Ligue 1', round: 'GW27',
    homeTeam: { id: 'monaco', name: 'AS Monaco', shortName: 'MON', crest: '' },
    awayTeam: { id: 'psg', name: 'Paris Saint-Germain', shortName: 'PSG', crest: '' },
    score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-27T20:45:00Z', events: [],
  },
];

// Combine scheduled from main mock + extra
export const MOCK_FIXTURES: Match[] = [
  ...MOCK_MATCHES.filter((m) => m.status === 'scheduled'),
  ...EXTRA_FIXTURES,
].sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
