import type { Match, MatchEvent, Team } from '../types';

// Helper to build a Team object
const t = (id: string, name: string, shortName: string): Team => ({ id, name, shortName, crest: '' });

// Helper to build a MatchEvent
const ev = (
  id: string,
  type: MatchEvent['type'],
  minute: number,
  playerName: string,
  teamId: string,
  detail?: string,
): MatchEvent => ({ id, type, minute, playerId: `p-${id}`, playerName, teamId, detail });

const D = '2026-02-19';
const time = (h: number, m = 0) =>
  `${D}T${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:00Z`;

// ─── Teams ───────────────────────────────────────────────────────────────────
const ARS = t('arsenal',       'Arsenal',           'ARS');
const CHE = t('chelsea',       'Chelsea',           'CHE');
const LIV = t('liverpool',     'Liverpool',         'LIV');
const MCI = t('mancity',       'Manchester City',   'MCI');
const MUN = t('manutd',        'Manchester Utd',    'MUN');
const TOT = t('tottenham',     'Tottenham',         'TOT');
const NEW = t('newcastle',     'Newcastle',         'NEW');
const AVL = t('astonvilla',    'Aston Villa',       'AVL');
const BHA = t('brighton',      'Brighton',          'BHA');
const WHU = t('westham',       'West Ham',          'WHU');
const WOL = t('wolves',        'Wolverhampton',     'WOL');
const FUL = t('fulham',        'Fulham',            'FUL');

const RMA = t('realmadrid',    'Real Madrid',       'RMA');
const BAR = t('barcelona',     'Barcelona',         'BAR');
const ATM = t('atletico',      'Atlético Madrid',   'ATM');
const GIR = t('girona',        'Girona',            'GIR');
const ATH = t('athletic',      'Athletic Club',     'ATH');

const BAY = t('bayernmunich',  'Bayern Munich',     'BAY');
const BVB = t('dortmund',      'Borussia Dortmund', 'BVB');
const B04 = t('leverkusen',    'Bayer Leverkusen',  'B04');
const STU = t('stuttgart',     'VfB Stuttgart',     'STU');
const RBL = t('leipzig',       'RB Leipzig',        'RBL');

const INT = t('inter',         'Inter Milan',       'INT');
const JUV = t('juventus',      'Juventus',          'JUV');
const ACM = t('acmilan',       'AC Milan',          'ACM');
const NAP = t('napoli',        'Napoli',            'NAP');
const ROM = t('roma',          'AS Roma',           'ROM');
const ATA = t('atalanta',      'Atalanta',          'ATA');

const PSG = t('psg',           'Paris Saint-Germain','PSG');
const MON = t('monaco',        'AS Monaco',         'MON');
const NIC = t('nice',          'OGC Nice',          'NIC');
const LYO = t('lyon',          'Olympique Lyon',    'LYO');
const MAR = t('marseille',     'Olympique Marseille','MAR');
const LIL = t('lille',         'Lille OSC',         'LIL');

// ─── Live Matches ─────────────────────────────────────────────────────────────
export const MOCK_MATCHES: Match[] = [
  {
    id: 'pl-ars-che', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: ARS, awayTeam: CHE, score: { home: 2, away: 1 }, status: 'live', minute: 67,
    startTime: time(14), events: [
      ev('e1', 'goal',        23, 'Saka',      'arsenal'),
      ev('e2', 'goal',        41, 'Palmer',    'chelsea'),
      ev('e3', 'yellow_card', 55, 'Gallagher', 'chelsea'),
      ev('e4', 'goal',        62, 'Martinelli','arsenal'),
    ],
  },
  {
    id: 'pl-liv-mci', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: LIV, awayTeam: MCI, score: { home: 1, away: 1 }, status: 'halftime', minute: 45,
    startTime: time(14), events: [
      ev('e5', 'goal', 12, 'Haaland',  'mancity'),
      ev('e6', 'goal', 38, 'Salah',    'liverpool'),
    ],
  },
  {
    id: 'll-rma-bar', leagueId: 'laliga', leagueName: 'La Liga', round: 'GW27',
    homeTeam: RMA, awayTeam: BAR, score: { home: 1, away: 2 }, status: 'live', minute: 78,
    startTime: time(13, 30), events: [
      ev('e7',  'goal',      34, 'Yamal',     'barcelona'),
      ev('e8',  'goal',      56, 'Bellingham','realmadrid'),
      ev('e9',  'red_card',  71, 'Carvajal',  'realmadrid'),
      ev('e10', 'goal',      75, 'Lewandowski','barcelona'),
    ],
  },
  {
    id: 'bl-bay-bvb', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW23',
    homeTeam: BAY, awayTeam: BVB, score: { home: 2, away: 0 }, status: 'live', minute: 52,
    startTime: time(14, 30), events: [
      ev('e11', 'goal', 18, 'Kane',   'bayernmunich'),
      ev('e12', 'goal', 44, 'Müller', 'bayernmunich'),
    ],
  },
  {
    id: 'sa-int-juv', leagueId: 'seriea', leagueName: 'Serie A', round: 'GW26',
    homeTeam: INT, awayTeam: JUV, score: { home: 1, away: 0 }, status: 'live', minute: 38,
    startTime: time(15), events: [
      ev('e13', 'goal', 27, 'Lautaro', 'inter'),
    ],
  },
  {
    id: 'l1-psg-lyo', leagueId: 'ligue1', leagueName: 'Ligue 1', round: 'GW25',
    homeTeam: PSG, awayTeam: LYO, score: { home: 3, away: 0 }, status: 'live', minute: 83,
    startTime: time(13), events: [
      ev('e14', 'goal', 8,  'Mbappé',  'psg'),
      ev('e15', 'goal', 31, 'Dembélé', 'psg'),
      ev('e16', 'goal', 68, 'Mbappé',  'psg'),
    ],
  },
  {
    id: 'pl-new-avl', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: NEW, awayTeam: AVL, score: { home: 0, away: 1 }, status: 'live', minute: 44,
    startTime: time(14, 30), events: [
      ev('e17', 'goal', 33, 'Watkins', 'astonvilla'),
    ],
  },
  {
    id: 'll-atm-gir', leagueId: 'laliga', leagueName: 'La Liga', round: 'GW27',
    homeTeam: ATM, awayTeam: GIR, score: { home: 0, away: 0 }, status: 'live', minute: 21,
    startTime: time(15, 30), events: [],
  },

  // ─── Scheduled (today) ──────────────────────────────────────────────────────
  {
    id: 'pl-tot-bha', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: TOT, awayTeam: BHA, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: time(17, 30), events: [],
  },
  {
    id: 'bl-b04-rbl', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW23',
    homeTeam: B04, awayTeam: RBL, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: time(17), events: [],
  },
  {
    id: 'sa-nap-rom', leagueId: 'seriea', leagueName: 'Serie A', round: 'GW26',
    homeTeam: NAP, awayTeam: ROM, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: time(19), events: [],
  },
  {
    id: 'l1-mon-lil', leagueId: 'ligue1', leagueName: 'Ligue 1', round: 'GW25',
    homeTeam: MON, awayTeam: LIL, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: time(19, 5), events: [],
  },
  {
    id: 'll-ath-bar2', leagueId: 'laliga', leagueName: 'La Liga', round: 'GW27',
    homeTeam: ATH, awayTeam: GIR, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: time(20), events: [],
  },

  // ─── Ended (today) ──────────────────────────────────────────────────────────
  {
    id: 'pl-mun-wol', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: MUN, awayTeam: WOL, score: { home: 1, away: 1 }, status: 'ended',
    startTime: time(11, 30), events: [
      ev('e18', 'goal', 54, 'Rashford', 'manutd'),
      ev('e19', 'goal', 78, 'Cunha',   'wolves'),
    ],
  },
  {
    id: 'pl-whu-ful', leagueId: 'pl', leagueName: 'Premier League', round: 'GW26',
    homeTeam: WHU, awayTeam: FUL, score: { home: 2, away: 0 }, status: 'ended',
    startTime: time(11, 30), events: [
      ev('e20', 'goal', 22, 'Antonio', 'westham'),
      ev('e21', 'goal', 89, 'Bowen',   'westham'),
    ],
  },
  {
    id: 'bl-stu-bay2', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW23',
    homeTeam: STU, awayTeam: BAY, score: { home: 0, away: 3 }, status: 'ended',
    startTime: time(11), events: [
      ev('e22', 'goal', 11, 'Kane',  'bayernmunich'),
      ev('e23', 'goal', 55, 'Kane',  'bayernmunich'),
      ev('e24', 'goal', 81, 'Müller','bayernmunich'),
    ],
  },
  {
    id: 'sa-ata-acm', leagueId: 'seriea', leagueName: 'Serie A', round: 'GW26',
    homeTeam: ATA, awayTeam: ACM, score: { home: 2, away: 2 }, status: 'ended',
    startTime: time(12), events: [],
  },
  {
    id: 'l1-mar-nic', leagueId: 'ligue1', leagueName: 'Ligue 1', round: 'GW25',
    homeTeam: MAR, awayTeam: NIC, score: { home: 1, away: 0 }, status: 'ended',
    startTime: time(12), events: [],
  },

  // ─── Upcoming (next 7 days) ──────────────────────────────────────────────────
  {
    id: 'pl-mci-ars', leagueId: 'pl', leagueName: 'Premier League', round: 'GW27',
    homeTeam: MCI, awayTeam: ARS, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-22T16:30:00Z', events: [],
  },
  {
    id: 'll-bar-atm', leagueId: 'laliga', leagueName: 'La Liga', round: 'GW28',
    homeTeam: BAR, awayTeam: ATM, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-21T20:00:00Z', events: [],
  },
  {
    id: 'sa-juv-int', leagueId: 'seriea', leagueName: 'Serie A', round: 'GW27',
    homeTeam: JUV, awayTeam: INT, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-23T20:00:00Z', events: [],
  },
  {
    id: 'bl-bvb-b04', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW24',
    homeTeam: BVB, awayTeam: B04, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-22T17:30:00Z', events: [],
  },
  {
    id: 'l1-psg-nic', leagueId: 'ligue1', leagueName: 'Ligue 1', round: 'GW26',
    homeTeam: PSG, awayTeam: NIC, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-22T19:05:00Z', events: [],
  },
  {
    id: 'pl-che-liv', leagueId: 'pl', leagueName: 'Premier League', round: 'GW27',
    homeTeam: CHE, awayTeam: LIV, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-23T20:00:00Z', events: [],
  },
  {
    id: 'bl-b04-bay', leagueId: 'bundesliga', leagueName: 'Bundesliga', round: 'GW24',
    homeTeam: B04, awayTeam: BAY, score: { home: 0, away: 0 }, status: 'scheduled',
    startTime: '2026-02-20T17:30:00Z', events: [],
  },
];
