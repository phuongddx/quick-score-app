import type { StandingsEntry, Team } from '../types';

const t = (id: string, name: string, s: string): Team => ({ id, name, shortName: s, crest: '' });
const e = (
  pos: number, team: Team, p: number, w: number, d: number, l: number,
  gf: number, ga: number, pts: number, form: StandingsEntry['form'],
  zone: StandingsEntry['zone'],
): StandingsEntry => ({ position: pos, team, played: p, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: pts, form, zone });

export const LALIGA_STANDINGS: StandingsEntry[] = [
  e(1,  t('realmadrid',  'Real Madrid',       'RMA'), 27,19,5,3,  65,27,62, ['W','W','W','D','W'], 'cl'),
  e(2,  t('barcelona',   'Barcelona',         'BAR'), 27,19,4,4,  72,38,61, ['W','W','L','W','W'], 'cl'),
  e(3,  t('atletico',    'Atlético Madrid',   'ATM'), 27,17,5,5,  54,30,56, ['W','D','W','W','D'], 'cl'),
  e(4,  t('girona',      'Girona',            'GIR'), 27,16,3,8,  60,44,51, ['L','W','W','L','W'], 'cl'),
  e(5,  t('athletic',    'Athletic Club',     'ATH'), 27,14,5,8,  47,34,47, ['W','W','D','L','W'], 'el'),
  e(6,  t('realbetis',   'Real Betis',        'BET'), 27,12,7,8,  46,38,43, ['D','W','D','W','L'], 'ecl'),
  e(7,  t('realsociedad','Real Sociedad',     'SOC'), 27,11,8,8,  42,38,41, ['D','D','W','L','D'], null),
  e(8,  t('valencia',    'Valencia',          'VAL'), 27,10,7,10, 40,47,37, ['L','W','D','W','L'], null),
  e(9,  t('villarreal',  'Villarreal',        'VIL'), 27,9,8,10,  39,41,35, ['D','L','W','D','W'], null),
  e(10, t('rayo',        'Rayo Vallecano',    'RAY'), 27,9,6,12,  36,46,33, ['L','W','D','L','W'], null),
  e(11, t('getafe',      'Getafe',            'GET'), 27,8,6,13,  29,41,30, ['D','L','D','W','L'], null),
  e(12, t('laspalmas',   'Las Palmas',        'LPA'), 27,7,8,12,  35,48,29, ['W','D','L','D','D'], null),
  e(13, t('osasuna',     'Osasuna',           'OSA'), 27,7,7,13,  33,49,28, ['L','W','D','L','D'], null),
  e(14, t('celta',       'Celta Vigo',        'CEL'), 27,7,5,15,  38,52,26, ['W','L','W','L','L'], null),
  e(15, t('alaves',      'Deportivo Alavés',  'ALA'), 27,6,7,14,  30,52,25, ['D','L','W','L','D'], null),
  e(16, t('sevilla',     'Sevilla',           'SEV'), 27,5,9,13,  32,48,24, ['D','D','L','W','D'], null),
  e(17, t('mallorca',    'Mallorca',          'MLL'), 27,5,8,14,  26,44,23, ['D','L','D','D','L'], null),
  e(18, t('granada',     'Granada',           'GRA'), 27,4,7,16,  28,56,19, ['L','D','L','D','L'], 'relegation'),
  e(19, t('cadiz',       'Cádiz',             'CAD'), 27,3,6,18,  22,61,15, ['L','L','D','L','L'], 'relegation'),
  e(20, t('almeria',     'Almería',           'ALM'), 27,2,5,20,  18,68,11, ['L','L','L','L','D'], 'relegation'),
];
