export type MatchStatus = 'scheduled' | 'live' | 'halftime' | 'ended' | 'postponed';
export type EventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty' | 'var';

export interface Team {
  id: string;
  name: string;
  shortName: string;
  crest: string;
}

export interface MatchEvent {
  id: string;
  type: EventType;
  minute: number;
  playerId: string;
  playerName: string;
  teamId: string;
  detail?: string;
}

export interface MatchScore {
  home: number;
  away: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: string;
}

export interface Lineup {
  formation: string;
  startingXI: Player[];
  bench: Player[];
}

export interface MatchStats {
  possession: [number, number];
  shots: [number, number];
  shotsOnTarget: [number, number];
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
}

export interface Match {
  id: string;
  leagueId: string;
  leagueName: string;
  round: string;
  homeTeam: Team;
  awayTeam: Team;
  score: MatchScore;
  status: MatchStatus;
  minute?: number;
  startTime: string;
  events: MatchEvent[];
  homeLineup?: Lineup;
  awayLineup?: Lineup;
  stats?: MatchStats;
}
