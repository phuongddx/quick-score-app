import React from 'react';
import { View, Text } from 'react-native';
import type { Lineup } from '../types';
import { LineupPitchPlayer } from './lineup-pitch-player';

interface Props {
  homeLineup: Lineup;
  awayLineup: Lineup;
}

const PITCH_W = 340;
const PITCH_H = 480;

// Parse formation string like "4-3-3" into row sizes [4, 3, 3]
function parseFormation(f: string): number[] {
  return f.split('-').map(Number).filter(Boolean);
}

// Assign (x, y) positions for a team's players
// side: 'home' = bottom half (y 0.55–0.95), 'away' = top half (y 0.05–0.45)
function calcPositions(
  lineup: Lineup,
  side: 'home' | 'away',
): { player: (typeof lineup.startingXI)[number]; x: number; y: number }[] {
  const rows = parseFormation(lineup.formation);
  const isHome = side === 'home';

  // GK is always row 0 (bottom for home, top for away)
  const gkY = isHome ? 0.93 : 0.07;
  const positions: { player: (typeof lineup.startingXI)[number]; x: number; y: number }[] = [
    { player: lineup.startingXI[0]!, x: 0.5, y: gkY },
  ];

  // Field rows
  const totalRows = rows.length;
  let playerIdx = 1;
  rows.forEach((count, rowIdx) => {
    // Spread rows between 0.55–0.85 (home) or 0.15–0.45 (away)
    const fraction = (rowIdx + 1) / (totalRows + 1);
    const y = isHome
      ? 0.93 - fraction * 0.38
      : 0.07 + fraction * 0.38;

    for (let col = 0; col < count; col++) {
      const x = (col + 1) / (count + 1);
      const player = lineup.startingXI[playerIdx];
      if (player) positions.push({ player, x, y });
      playerIdx++;
    }
  });

  return positions;
}

function FormationLabel({ formation, isHome }: { formation: string; isHome: boolean }) {
  return (
    <Text style={{
      position: 'absolute', [isHome ? 'bottom' : 'top']: 4,
      left: 0, right: 0, textAlign: 'center',
      color: 'rgba(255,255,255,0.5)', fontSize: 11,
    }}>
      {isHome ? '▲' : '▼'} {formation}
    </Text>
  );
}

export function LineupPitch({ homeLineup, awayLineup }: Props) {
  const homePositions = calcPositions(homeLineup, 'home');
  const awayPositions = calcPositions(awayLineup, 'away');

  return (
    <View style={{ flex: 1, backgroundColor: '#0D1117', alignItems: 'center', paddingTop: 16 }}>
      <View
        style={{
          width: PITCH_W, height: PITCH_H,
          backgroundColor: '#1A3A1A',
          borderRadius: 8, overflow: 'hidden', position: 'relative',
          borderWidth: 2, borderColor: 'rgba(255,255,255,0.15)',
        }}
      >
        {/* Pitch markings */}
        <View style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.2)' }} />
        <View style={{ position: 'absolute', top: '50%', left: '25%', right: '25%', height: 40, marginTop: -20, borderRadius: 50, borderWidth: 1, borderColor: 'rgba(255,255,255,0.15)' }} />

        <FormationLabel formation={awayLineup.formation} isHome={false} />
        <FormationLabel formation={homeLineup.formation} isHome />

        {/* Away players (top) */}
        {awayPositions.map(({ player, x, y }) => (
          <LineupPitchPlayer
            key={player.id} player={player} isHome={false}
            x={x} y={y} pitchWidth={PITCH_W} pitchHeight={PITCH_H}
          />
        ))}

        {/* Home players (bottom) */}
        {homePositions.map(({ player, x, y }) => (
          <LineupPitchPlayer
            key={player.id} player={player} isHome
            x={x} y={y} pitchWidth={PITCH_W} pitchHeight={PITCH_H}
          />
        ))}
      </View>

      {/* Legend */}
      <View style={{ flexDirection: 'row', gap: 24, marginTop: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#2196F3' }} />
          <Text style={{ color: '#8B949E', fontSize: 12 }}>Home</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#484F58' }} />
          <Text style={{ color: '#8B949E', fontSize: 12 }}>Away</Text>
        </View>
      </View>
    </View>
  );
}
