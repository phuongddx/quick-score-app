import React from 'react';
import { View, Text } from 'react-native';
import type { Team } from '../types';

interface Props {
  team: Team;
  size?: number;
}

// Consistent color per team based on ID hash
const CREST_COLORS = ['#1E3A5F', '#5C1F1F', '#1F3D1F', '#4A1F5C', '#1F3D4A', '#5C4A1F', '#3D3D1F'];

function getTeamColor(teamId: string): string {
  let hash = 0;
  for (let i = 0; i < teamId.length; i++) hash = teamId.charCodeAt(i) + ((hash << 5) - hash);
  return CREST_COLORS[Math.abs(hash) % CREST_COLORS.length]!;
}

export const TeamCrest = React.memo(function TeamCrest({ team, size = 28 }: Props) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: getTeamColor(team.id),
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color: '#E6EDF3', fontSize: size * 0.34, fontWeight: '700', letterSpacing: -0.5 }}>
        {team.shortName.slice(0, 3)}
      </Text>
    </View>
  );
});
