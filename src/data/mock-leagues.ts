import type { League } from '../types';

export const MOCK_LEAGUES: League[] = [
  { id: 'pl',          name: 'Premier League', country: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', season: 2025 },
  { id: 'laliga',      name: 'La Liga',         country: 'Spain',   flag: '🇪🇸', season: 2025 },
  { id: 'bundesliga',  name: 'Bundesliga',       country: 'Germany', flag: '🇩🇪', season: 2025 },
  { id: 'seriea',      name: 'Serie A',          country: 'Italy',   flag: '🇮🇹', season: 2025 },
  { id: 'ligue1',      name: 'Ligue 1',          country: 'France',  flag: '🇫🇷', season: 2025 },
];

export const LEAGUE_MAP = Object.fromEntries(MOCK_LEAGUES.map((l) => [l.id, l]));
