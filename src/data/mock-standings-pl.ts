import type { StandingsEntry, Team } from '../types';

const t = (id: string, name: string, s: string): Team => ({ id, name, shortName: s, crest: '' });
const e = (
  pos: number, team: Team, p: number, w: number, d: number, l: number,
  gf: number, ga: number, pts: number, form: StandingsEntry['form'],
  zone: StandingsEntry['zone'],
): StandingsEntry => ({ position: pos, team, played: p, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: pts, form, zone });

export const PL_STANDINGS: StandingsEntry[] = [
  e(1,  t('arsenal',      'Arsenal',           'ARS'), 26,19,4,3,  58,28,61, ['W','W','D','W','W'], 'cl'),
  e(2,  t('mancity',      'Manchester City',   'MCI'), 26,18,5,3,  57,30,59, ['W','W','W','D','W'], 'cl'),
  e(3,  t('liverpool',    'Liverpool',         'LIV'), 25,18,4,3,  62,29,58, ['W','W','W','W','W'], 'cl'),
  e(4,  t('astonvilla',   'Aston Villa',       'AVL'), 26,16,4,6,  66,45,52, ['W','D','W','W','L'], 'cl'),
  e(5,  t('tottenham',    'Tottenham',         'TOT'), 26,14,3,9,  53,47,45, ['D','W','W','L','W'], 'el'),
  e(6,  t('chelsea',      'Chelsea',           'CHE'), 26,12,6,8,  54,47,42, ['D','W','W','W','L'], 'ecl'),
  e(7,  t('newcastle',    'Newcastle',         'NEW'), 26,12,4,10, 54,42,40, ['W','W','L','D','W'], null),
  e(8,  t('manutd',       'Manchester Utd',    'MUN'), 26,10,7,9,  22,40,37, ['L','W','L','D','W'], null),
  e(9,  t('westham',      'West Ham',          'WHU'), 26,11,4,11, 36,53,37, ['L','W','W','D','L'], null),
  e(10, t('brighton',     'Brighton',          'BHA'), 26,10,6,10, 48,43,36, ['W','W','L','L','D'], null),
  e(11, t('wolves',       'Wolverhampton',     'WOL'), 26,9,6,11,  37,52,33, ['D','L','L','D','W'], null),
  e(12, t('fulham',       'Fulham',            'FUL'), 26,10,3,13, 37,49,33, ['L','L','L','W','W'], null),
  e(13, t('bournemouth',  'Bournemouth',       'BOU'), 26,8,6,12,  34,46,30, ['W','L','D','L','W'], null),
  e(14, t('palace',       'Crystal Palace',    'CRY'), 25,6,9,10,  24,39,27, ['D','W','W','L','L'], null),
  e(15, t('brentford',    'Brentford',         'BRE'), 26,7,5,14,  31,50,26, ['L','W','W','L','L'], null),
  e(16, t('everton',      'Everton',           'EVE'), 25,8,2,15,  27,51,24, ['L','L','L','W','W'], null),
  e(17, t('nforest',      'Nottingham Forest', 'NFO'), 26,6,5,15,  28,55,21, ['L','L','D','W','L'], 'relegation'),
  e(18, t('luton',        'Luton Town',        'LUT'), 26,4,6,16,  29,61,18, ['L','L','L','L','W'], 'relegation'),
  e(19, t('burnley',      'Burnley',           'BUR'), 26,4,4,18,  20,56,16, ['L','L','L','D','L'], 'relegation'),
  e(20, t('sheffutd',     'Sheffield United',  'SHU'), 26,3,4,19,  21,69,13, ['L','L','L','L','L'], 'relegation'),
];
