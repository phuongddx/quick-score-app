import type { StandingsEntry, Team } from '../types';

const t = (id: string, name: string, s: string): Team => ({ id, name, shortName: s, crest: '' });
const e = (
  pos: number, team: Team, p: number, w: number, d: number, l: number,
  gf: number, ga: number, pts: number, form: StandingsEntry['form'],
  zone: StandingsEntry['zone'],
): StandingsEntry => ({ position: pos, team, played: p, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: pts, form, zone });

export const LIGUE1_STANDINGS: StandingsEntry[] = [
  e(1,  t('psg',          'Paris Saint-Germain', 'PSG'), 25,21,2,2,  72,20,65, ['W','W','W','W','W'], 'cl'),
  e(2,  t('monaco',       'AS Monaco',           'MON'), 25,17,3,5,  60,34,54, ['W','W','D','W','W'], 'cl'),
  e(3,  t('nice',         'OGC Nice',            'NIC'), 25,15,5,5,  48,27,50, ['D','W','W','W','L'], 'cl'),
  e(4,  t('brest',        'Stade Brestois',      'SB2'), 25,14,5,6,  46,35,47, ['W','L','W','D','W'], 'cl'),
  e(5,  t('lille',        'Lille OSC',           'LIL'), 25,13,6,6,  44,29,45, ['W','D','D','W','L'], 'el'),
  e(6,  t('lens',         'RC Lens',             'RCL'), 25,12,5,8,  40,34,41, ['D','W','D','L','W'], 'ecl'),
  e(7,  t('lyon',         'Olympique Lyon',      'OL' ), 25,11,6,8,  44,40,39, ['L','W','D','W','D'], null),
  e(8,  t('marseille',    'Olympique Marseille', 'OM' ), 25,10,7,8,  41,39,37, ['W','D','L','D','W'], null),
  e(9,  t('rennes',       'Stade Rennais',       'REN'), 25,10,5,10, 37,38,35, ['W','L','W','D','L'], null),
  e(10, t('reims',        'Stade de Reims',      'SDR'), 25,8,8,9,   32,36,32, ['D','D','W','L','D'], null),
  e(11, t('toulouse',     'Toulouse FC',         'TFC'), 25,8,6,11,  33,40,30, ['L','W','D','L','W'], null),
  e(12, t('montpellier',  'Montpellier',         'MTP'), 25,7,6,12,  28,44,27, ['L','D','W','L','D'], null),
  e(13, t('lorient',      'FC Lorient',          'FCL'), 25,6,7,12,  28,46,25, ['D','L','D','W','L'], null),
  e(14, t('nantes',       'FC Nantes',           'FCN'), 25,6,6,13,  26,44,24, ['L','D','D','L','W'], null),
  e(15, t('strasbourg',   'RC Strasbourg',       'RCS'), 25,5,8,12,  29,47,23, ['D','L','D','D','L'], null),
  e(16, t('clermont',     'Clermont Foot',       'CF6'), 25,5,5,15,  26,54,20, ['L','W','L','D','L'], null),
  e(17, t('metz',         'FC Metz',             'FCM'), 25,4,6,15,  22,51,18, ['L','L','D','L','W'], 'relegation'),
  e(18, t('lehavre',      'Le Havre AC',         'HAC'), 25,3,7,15,  21,52,16, ['D','L','L','D','D'], 'relegation'),
  e(19, t('auxerre',      'AJ Auxerre',          'AJA'), 25,3,5,17,  20,56,14, ['L','L','D','L','L'], 'relegation'),
  e(20, t('laval',        'Stade Lavallois',     'LAV'), 25,2,4,19,  18,65,10, ['L','L','L','D','L'], 'relegation'),
];
