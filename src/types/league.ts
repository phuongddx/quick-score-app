import type { Team } from './match';

export interface League {
  id: string;
  name: string;
  country: string;
  flag: string;
  season: number;
}

export type StandingsZone = 'cl' | 'el' | 'ecl' | 'relegation' | null;

export interface StandingsEntry {
  position: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDiff: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  zone: StandingsZone;
}
