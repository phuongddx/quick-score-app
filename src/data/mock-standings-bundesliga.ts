import type { StandingsEntry, Team } from '../types';

const t = (id: string, name: string, s: string): Team => ({ id, name, shortName: s, crest: '' });
const e = (
  pos: number, team: Team, p: number, w: number, d: number, l: number,
  gf: number, ga: number, pts: number, form: StandingsEntry['form'],
  zone: StandingsEntry['zone'],
): StandingsEntry => ({ position: pos, team, played: p, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: pts, form, zone });

export const BUNDESLIGA_STANDINGS: StandingsEntry[] = [
  e(1,  t('leverkusen',  'Bayer Leverkusen',  'B04'), 23,18,3,2,  58,22,57, ['W','W','W','D','W'], 'cl'),
  e(2,  t('bayernmunich','Bayern Munich',     'BAY'), 23,17,2,4,  63,28,53, ['W','W','W','L','W'], 'cl'),
  e(3,  t('stuttgart',   'VfB Stuttgart',     'STU'), 23,15,4,4,  56,30,49, ['W','D','W','W','L'], 'cl'),
  e(4,  t('dortmund',    'Borussia Dortmund', 'BVB'), 23,14,3,6,  50,36,45, ['W','L','W','D','W'], 'cl'),
  e(5,  t('leipzig',     'RB Leipzig',        'RBL'), 23,12,5,6,  48,34,41, ['D','W','W','L','W'], 'el'),
  e(6,  t('gladbach',    'B. Mönchengladbach','BMG'), 23,11,4,8,  44,40,37, ['W','L','D','W','D'], 'ecl'),
  e(7,  t('frankfurt',   'Eintracht Frankfurt','SGE'), 23,10,5,8,  42,38,35, ['D','W','L','D','W'], null),
  e(8,  t('freiburg',    'SC Freiburg',       'SCF'), 23,10,4,9,  38,37,34, ['L','D','W','W','L'], null),
  e(9,  t('augsburg',    'FC Augsburg',       'FCA'), 23,9,4,10,  38,42,31, ['W','D','L','W','D'], null),
  e(10, t('werder',      'Werder Bremen',     'SVW'), 23,8,6,9,   38,43,30, ['D','W','L','D','W'], null),
  e(11, t('bochum',      'VfL Bochum',        'BOC'), 23,7,5,11,  32,46,26, ['L','W','D','L','W'], null),
  e(12, t('wolfsburg',   'VfL Wolfsburg',     'WOB'), 23,6,7,10,  30,42,25, ['D','D','L','W','D'], null),
  e(13, t('unionberlin', 'Union Berlin',      'FCU'), 23,6,5,12,  28,44,23, ['L','W','L','D','L'], null),
  e(14, t('mainz',       '1. FSV Mainz 05',   'M05'), 23,5,8,10,  27,40,23, ['D','L','D','D','W'], null),
  e(15, t('hoffenheim',  'TSG Hoffenheim',    'TSG'), 23,5,6,12,  30,50,21, ['L','W','D','L','D'], null),
  e(16, t('darmstadt',   'SV Darmstadt 98',   'SVD'), 23,4,6,13,  24,50,18, ['L','D','L','D','L'], 'relegation'),
  e(17, t('koln',        '1. FC Köln',        'KOE'), 23,3,7,13,  24,51,16, ['D','L','D','L','D'], 'relegation'),
  e(18, t('heidenheim',  '1. FC Heidenheim',  'HEI'), 23,3,5,15,  22,55,14, ['L','L','D','L','L'], 'relegation'),
];
