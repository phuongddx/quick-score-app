import React, { useRef, useEffect } from 'react';
import { View, Text, Animated } from 'react-native';
import type { Team, MatchScore, MatchStatus } from '../types';
import { TeamCrest } from './team-crest';
import { LiveIndicator } from './live-indicator';

interface Props {
  homeTeam: Team;
  awayTeam: Team;
  score: MatchScore;
  status: MatchStatus;
  minute?: number;
}

function StatusPill({ status, minute }: { status: MatchStatus; minute?: number }) {
  if (status === 'live')      return <LiveIndicator minute={minute ?? 0} />;
  if (status === 'halftime')  return <LiveIndicator minute={45} isHalftime />;
  if (status === 'ended')     return <Text style={{ color: '#8B949E', fontSize: 13, fontWeight: '600' }}>Full Time</Text>;
  if (status === 'postponed') return <Text style={{ color: '#FFB300', fontSize: 13, fontWeight: '600' }}>Postponed</Text>;
  return <Text style={{ color: '#8B949E', fontSize: 13, fontWeight: '600' }}>Scheduled</Text>;
}

export const ScoreBoard = React.memo(function ScoreBoard({
  homeTeam, awayTeam, score, status, minute,
}: Props) {
  // Flash animation on score change
  const flash = useRef(new Animated.Value(1)).current;
  const prevScore = useRef(score);

  useEffect(() => {
    const changed = score.home !== prevScore.current.home || score.away !== prevScore.current.away;
    prevScore.current = score;
    if (!changed) return;
    Animated.sequence([
      Animated.timing(flash, { toValue: 0.3, duration: 150, useNativeDriver: true }),
      Animated.timing(flash, { toValue: 1,   duration: 300, useNativeDriver: true }),
    ]).start();
  }, [score, flash]);

  return (
    <View style={{ backgroundColor: '#161B22', paddingVertical: 24, paddingHorizontal: 16, alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, width: '100%' }}>
        {/* Home team */}
        <View style={{ flex: 1, alignItems: 'center', gap: 8 }}>
          <TeamCrest team={homeTeam} size={56} />
          <Text style={{ color: '#E6EDF3', fontSize: 13, fontWeight: '600', textAlign: 'center' }} numberOfLines={2}>
            {homeTeam.name}
          </Text>
        </View>

        {/* Score */}
        <View style={{ alignItems: 'center', gap: 8 }}>
          <Animated.Text
            style={{ color: '#E6EDF3', fontSize: 48, fontWeight: '700', fontVariant: ['tabular-nums'], opacity: flash }}
          >
            {score.home} - {score.away}
          </Animated.Text>
          <StatusPill status={status} minute={minute} />
        </View>

        {/* Away team */}
        <View style={{ flex: 1, alignItems: 'center', gap: 8 }}>
          <TeamCrest team={awayTeam} size={56} />
          <Text style={{ color: '#E6EDF3', fontSize: 13, fontWeight: '600', textAlign: 'center' }} numberOfLines={2}>
            {awayTeam.name}
          </Text>
        </View>
      </View>
    </View>
  );
});
