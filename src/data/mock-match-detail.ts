import type { Match, Player, Lineup } from '../types';

const pl = (id: string, name: string, number: number, position: string): Player =>
  ({ id, name, number, position });

const lineup = (formation: string, xi: Player[], bench: Player[]): Lineup =>
  ({ formation, startingXI: xi, bench });

// Arsenal 4-3-3
const arsLineup = lineup('4-3-3', [
  pl('ars-1',  'David Raya',       1,  'GK'),
  pl('ars-2',  'Ben White',        4,  'DEF'),
  pl('ars-3',  'William Saliba',   12, 'DEF'),
  pl('ars-4',  'Gabriel',          6,  'DEF'),
  pl('ars-5',  'Oleksandr Zinchenko', 35, 'DEF'),
  pl('ars-6',  'Thomas Partey',    5,  'MID'),
  pl('ars-7',  'Declan Rice',      41, 'MID'),
  pl('ars-8',  'Martin Ødegaard',  8,  'MID'),
  pl('ars-9',  'Bukayo Saka',      7,  'FWD'),
  pl('ars-10', 'Gabriel Martinelli',11,'FWD'),
  pl('ars-11', 'Kai Havertz',      29, 'FWD'),
], [
  pl('ars-12', 'Aaron Ramsdale',   32, 'GK'),
  pl('ars-13', 'Takehiro Tomiyasu',18, 'DEF'),
  pl('ars-14', 'Fabio Vieira',     21, 'MID'),
  pl('ars-15', 'Emile Smith Rowe', 10, 'MID'),
  pl('ars-16', 'Gabriel Jesus',    9,  'FWD'),
]);

// Chelsea 4-2-3-1
const cheLineup = lineup('4-2-3-1', [
  pl('che-1',  'Robert Sánchez',   1,  'GK'),
  pl('che-2',  'Reece James',      24, 'DEF'),
  pl('che-3',  'Thiago Silva',     6,  'DEF'),
  pl('che-4',  'Levi Colwill',     26, 'DEF'),
  pl('che-5',  'Ben Chilwell',     21, 'DEF'),
  pl('che-6',  'Enzo Fernández',   8,  'MID'),
  pl('che-7',  'Moisés Caicedo',   25, 'MID'),
  pl('che-8',  'Cole Palmer',      20, 'MID'),
  pl('che-9',  'Raheem Sterling',  17, 'FWD'),
  pl('che-10', 'Noni Madueke',     11, 'FWD'),
  pl('che-11', 'Nicolas Jackson',  15, 'FWD'),
], [
  pl('che-12', 'Djordje Petrovic', 30, 'GK'),
  pl('che-13', 'Axel Disasi',      2,  'DEF'),
  pl('che-14', 'Conor Gallagher',  23, 'MID'),
  pl('che-15', 'Malo Gusto',       27, 'DEF'),
  pl('che-16', 'Armando Broja',    19, 'FWD'),
]);

// Bayern 4-2-3-1
const bayLineup = lineup('4-2-3-1', [
  pl('bay-1',  'Manuel Neuer',     1,  'GK'),
  pl('bay-2',  'Noussair Mazraoui',40, 'DEF'),
  pl('bay-3',  'Dayot Upamecano', 5,  'DEF'),
  pl('bay-4',  'Kim Min-jae',      3,  'DEF'),
  pl('bay-5',  'Alphonso Davies',  19, 'DEF'),
  pl('bay-6',  'Joshua Kimmich',   6,  'MID'),
  pl('bay-7',  'Leon Goretzka',    8,  'MID'),
  pl('bay-8',  'Leroy Sané',       10, 'FWD'),
  pl('bay-9',  'Jamal Musiala',    42, 'FWD'),
  pl('bay-10', 'Thomas Müller',    25, 'FWD'),
  pl('bay-11', 'Harry Kane',       9,  'FWD'),
], [
  pl('bay-12', 'Sven Ulreich',     26, 'GK'),
  pl('bay-13', 'Konrad Laimer',    27, 'MID'),
  pl('bay-14', 'Serge Gnabry',     7,  'FWD'),
  pl('bay-15', 'Eric Maxim Choupo-Moting', 13, 'FWD'),
  pl('bay-16', 'Mathys Tel',       39, 'FWD'),
]);

// BVB 4-3-3
const bvbLineup = lineup('4-3-3', [
  pl('bvb-1',  'Gregor Kobel',     1,  'GK'),
  pl('bvb-2',  'Julian Ryerson',   24, 'DEF'),
  pl('bvb-3',  'Mats Hummels',     15, 'DEF'),
  pl('bvb-4',  'Nico Schlotterbeck',4, 'DEF'),
  pl('bvb-5',  'Ramy Bensebaini',  14, 'DEF'),
  pl('bvb-6',  'Salih Özcan',      10, 'MID'),
  pl('bvb-7',  'Marcel Sabitzer',   20,'MID'),
  pl('bvb-8',  'Felix Nmecha',      8, 'MID'),
  pl('bvb-9',  'Karim Adeyemi',    27, 'FWD'),
  pl('bvb-10', 'Marco Reus',        11,'FWD'),
  pl('bvb-11', 'Donyell Malen',    21, 'FWD'),
], [
  pl('bvb-12', 'Alexander Meyer',  35, 'GK'),
  pl('bvb-13', 'Emre Can',         23, 'MID'),
  pl('bvb-14', 'Julian Brandt',    19, 'MID'),
  pl('bvb-15', 'Sébastien Haller', 9,  'FWD'),
  pl('bvb-16', 'Youssoufa Moukoko',18, 'FWD'),
]);

export const MOCK_MATCH_DETAIL: Match[] = [
  {
    id: 'pl-ars-che', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: { id: 'arsenal',   name: 'Arsenal',  shortName: 'ARS', crest: '' },
    awayTeam: { id: 'chelsea',   name: 'Chelsea',  shortName: 'CHE', crest: '' },
    score: { home: 2, away: 1 }, status: 'live', minute: 67,
    startTime: '2026-02-19T14:00:00Z',
    homeLineup: arsLineup, awayLineup: cheLineup,
    stats: {
      possession:    [58, 42], shots: [12, 7], shotsOnTarget: [5, 3],
      corners:       [6,  3],  fouls: [9, 13], yellowCards: [1, 2], redCards: [0, 0],
    },
    events: [
      { id: 'e1', type: 'goal',        minute: 23, playerId: 'ars-9',  playerName: 'Saka',      teamId: 'arsenal', detail: 'Right foot shot' },
      { id: 'e2', type: 'goal',        minute: 41, playerId: 'che-8',  playerName: 'Palmer',    teamId: 'chelsea', detail: 'Free kick' },
      { id: 'e3', type: 'yellow_card', minute: 55, playerId: 'che-14', playerName: 'Gallagher', teamId: 'chelsea' },
      { id: 'e4', type: 'goal',        minute: 62, playerId: 'ars-10', playerName: 'Martinelli',teamId: 'arsenal', detail: 'Left foot shot' },
    ],
  },
  {
    id: 'bl-bay-bvb', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW23',
    homeTeam: { id: 'bayernmunich', name: 'Bayern Munich',     shortName: 'BAY', crest: '' },
    awayTeam: { id: 'dortmund',     name: 'Borussia Dortmund', shortName: 'BVB', crest: '' },
    score: { home: 2, away: 0 }, status: 'live', minute: 52,
    startTime: '2026-02-19T14:30:00Z',
    homeLineup: bayLineup, awayLineup: bvbLineup,
    stats: {
      possession:    [63, 37], shots: [15, 6], shotsOnTarget: [7, 2],
      corners:       [8,  2],  fouls: [7, 11], yellowCards: [0, 1], redCards: [0, 0],
    },
    events: [
      { id: 'e11', type: 'goal', minute: 18, playerId: 'bay-11', playerName: 'Kane',  teamId: 'bayernmunich', detail: 'Penalty' },
      { id: 'e12', type: 'goal', minute: 44, playerId: 'bay-10', playerName: 'Müller',teamId: 'bayernmunich', detail: 'Header' },
      { id: 'e13', type: 'yellow_card', minute: 49, playerId: 'bvb-6', playerName: 'Özcan', teamId: 'dortmund' },
    ],
  },
  {
    id: 'll-rma-bar', leagueId: 'laliga', leagueName: 'La Liga', round: 'GW27',
    homeTeam: { id: 'realmadrid', name: 'Real Madrid', shortName: 'RMA', crest: '' },
    awayTeam: { id: 'barcelona',  name: 'Barcelona',   shortName: 'BAR', crest: '' },
    score: { home: 1, away: 2 }, status: 'live', minute: 78,
    startTime: '2026-02-19T13:30:00Z',
    stats: {
      possession:    [45, 55], shots: [9, 14], shotsOnTarget: [4, 6],
      corners:       [4,  7],  fouls: [14, 10], yellowCards: [2, 1], redCards: [1, 0],
    },
    events: [
      { id: 'e7',  type: 'goal',      minute: 34, playerId: 'bar-1', playerName: 'Yamal',      teamId: 'barcelona',  detail: 'Left foot' },
      { id: 'e8',  type: 'goal',      minute: 56, playerId: 'rma-1', playerName: 'Bellingham', teamId: 'realmadrid', detail: 'Header' },
      { id: 'e9',  type: 'red_card',  minute: 71, playerId: 'rma-2', playerName: 'Carvajal',   teamId: 'realmadrid' },
      { id: 'e10', type: 'goal',      minute: 75, playerId: 'bar-2', playerName: 'Lewandowski',teamId: 'barcelona',  detail: 'Penalty' },
    ],
  },
];

/** Map for O(1) detail lookup */
export const MATCH_DETAIL_MAP = Object.fromEntries(MOCK_MATCH_DETAIL.map((m) => [m.id, m]));
