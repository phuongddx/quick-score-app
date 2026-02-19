import type { StandingsEntry } from '../types';
import { PL_STANDINGS } from './mock-standings-pl';
import { LALIGA_STANDINGS } from './mock-standings-laliga';
import { BUNDESLIGA_STANDINGS } from './mock-standings-bundesliga';
import { SERIEA_STANDINGS } from './mock-standings-seriea';
import { LIGUE1_STANDINGS } from './mock-standings-ligue1';

export { PL_STANDINGS, LALIGA_STANDINGS, BUNDESLIGA_STANDINGS, SERIEA_STANDINGS, LIGUE1_STANDINGS };

const STANDINGS_BY_LEAGUE: Record<string, StandingsEntry[]> = {
  pl:          PL_STANDINGS,
  laliga:      LALIGA_STANDINGS,
  bundesliga:  BUNDESLIGA_STANDINGS,
  seriea:      SERIEA_STANDINGS,
  ligue1:      LIGUE1_STANDINGS,
};

export function getStandingsByLeagueId(leagueId: string): StandingsEntry[] {
  return STANDINGS_BY_LEAGUE[leagueId] ?? [];
}
