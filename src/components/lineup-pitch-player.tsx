import React from 'react';
import { View, Text } from 'react-native';
import type { Player } from '../types';

interface Props {
  player: Player;
  isHome: boolean;
  x: number; // 0–1 normalized
  y: number; // 0–1 normalized
  pitchWidth: number;
  pitchHeight: number;
}

const DOT_SIZE = 32;

export function LineupPitchPlayer({ player, isHome, x, y, pitchWidth, pitchHeight }: Props) {
  const left = x * pitchWidth - DOT_SIZE / 2;
  const top  = y * pitchHeight - DOT_SIZE / 2;

  return (
    <View
      style={{
        position: 'absolute',
        left, top,
        width: DOT_SIZE, height: DOT_SIZE,
        borderRadius: DOT_SIZE / 2,
        backgroundColor: isHome ? '#2196F3' : '#484F58',
        borderWidth: 2, borderColor: isHome ? '#64B5F6' : '#8B949E',
        alignItems: 'center', justifyContent: 'center',
      }}
    >
      <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{player.number}</Text>
    </View>
  );
}
