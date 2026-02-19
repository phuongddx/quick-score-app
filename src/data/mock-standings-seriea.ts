import type { StandingsEntry, Team } from '../types';

const t = (id: string, name: string, s: string): Team => ({ id, name, shortName: s, crest: '' });
const e = (
  pos: number, team: Team, p: number, w: number, d: number, l: number,
  gf: number, ga: number, pts: number, form: StandingsEntry['form'],
  zone: StandingsEntry['zone'],
): StandingsEntry => ({ position: pos, team, played: p, won: w, drawn: d, lost: l, goalsFor: gf, goalsAgainst: ga, goalDiff: gf - ga, points: pts, form, zone });

export const SERIEA_STANDINGS: StandingsEntry[] = [
  e(1,  t('inter',       'Inter Milan',       'INT'), 26,20,5,1,  70,23,65, ['W','W','W','W','D'], 'cl'),
  e(2,  t('juventus',    'Juventus',          'JUV'), 26,18,6,2,  54,25,60, ['W','D','W','D','W'], 'cl'),
  e(3,  t('acmilan',     'AC Milan',          'ACM'), 26,17,4,5,  60,34,55, ['W','W','L','W','D'], 'cl'),
  e(4,  t('napoli',      'Napoli',            'NAP'), 26,16,3,7,  56,36,51, ['W','W','D','L','W'], 'cl'),
  e(5,  t('roma',        'AS Roma',           'ROM'), 26,14,5,7,  52,38,47, ['D','W','W','L','W'], 'el'),
  e(6,  t('lazio',       'Lazio',             'LAZ'), 26,13,5,8,  50,41,44, ['W','L','D','W','W'], 'ecl'),
  e(7,  t('atalanta',    'Atalanta',          'ATA'), 26,12,6,8,  55,42,42, ['D','W','D','W','D'], null),
  e(8,  t('fiorentina',  'Fiorentina',        'FIO'), 26,11,5,10, 40,37,38, ['W','L','W','D','L'], null),
  e(9,  t('bologna',     'Bologna',           'BOL'), 26,10,7,9,  40,38,37, ['D','D','W','W','L'], null),
  e(10, t('torino',      'Torino',            'TOR'), 26,9,8,9,   36,35,35, ['W','D','L','D','W'], null),
  e(11, t('genoa',       'Genoa',             'GEN'), 26,8,6,12,  34,48,30, ['L','W','D','L','W'], null),
  e(12, t('lecce',       'Lecce',             'LEC'), 26,7,7,12,  28,45,28, ['D','L','D','W','D'], null),
  e(13, t('frosinone',   'Frosinone',         'FRO'), 26,6,7,13,  30,54,25, ['L','D','W','L','D'], null),
  e(14, t('cagliari',    'Cagliari',          'CAG'), 26,5,9,12,  30,52,24, ['D','D','L','D','W'], null),
  e(15, t('empoli',      'Empoli',            'EMP'), 26,5,8,13,  25,47,23, ['L','D','D','L','W'], null),
  e(16, t('udinese',     'Udinese',           'UDI'), 26,5,7,14,  26,52,22, ['D','L','D','D','L'], null),
  e(17, t('sassuolo',    'Sassuolo',          'SAS'), 26,4,7,15,  27,55,19, ['L','D','L','D','D'], 'relegation'),
  e(18, t('salernitana', 'Salernitana',       'SAL'), 26,3,5,18,  22,63,14, ['L','L','D','L','L'], 'relegation'),
  e(19, t('verona',      'Hellas Verona',     'VER'), 26,2,8,16,  20,58,14, ['D','L','D','L','D'], 'relegation'),
  e(20, t('monza',       'Monza',             'MON'), 26,2,6,18,  19,61,12, ['L','D','L','L','L'], 'relegation'),
];
