import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import type { Match } from '../types';
import { TeamCrest } from './team-crest';
import { LiveIndicator } from './live-indicator';

interface Props {
  match: Match;
  onPress: () => void;
  showLeague?: boolean;
}

function ScorePill({ score }: { score: string }) {
  return (
    <Text style={{ color: '#E6EDF3', fontSize: 22, fontWeight: '700', fontVariant: ['tabular-nums'], minWidth: 52, textAlign: 'center' }}>
      {score}
    </Text>
  );
}

function StatusLabel({ match }: { match: Match }) {
  if (match.status === 'live')      return <LiveIndicator minute={match.minute ?? 0} />;
  if (match.status === 'halftime')  return <LiveIndicator minute={45} isHalftime />;
  if (match.status === 'ended')     return <Text style={{ color: '#8B949E', fontSize: 11 }}>FT</Text>;
  // scheduled — show kickoff time
  const d = new Date(match.startTime);
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return <Text style={{ color: '#8B949E', fontSize: 11 }}>{hh}:{mm}</Text>;
}

function EventPills({ match }: { match: Match }) {
  const yc = match.events.filter((e) => e.type === 'yellow_card').length;
  const rc = match.events.filter((e) => e.type === 'red_card').length;
  if (yc === 0 && rc === 0) return null;
  return (
    <View style={{ flexDirection: 'row', gap: 4, marginTop: 2 }}>
      {yc > 0 && (
        <View style={{ backgroundColor: '#FFB300', borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1 }}>
          <Text style={{ color: '#0D1117', fontSize: 10, fontWeight: '700' }}>{yc}</Text>
        </View>
      )}
      {rc > 0 && (
        <View style={{ backgroundColor: '#FF3D3D', borderRadius: 3, paddingHorizontal: 5, paddingVertical: 1 }}>
          <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>{rc}</Text>
        </View>
      )}
    </View>
  );
}

export const MatchCard = React.memo(function MatchCard({ match, onPress }: Props) {
  const isLive = match.status === 'live' || match.status === 'halftime';
  const scoreStr = `${match.score.home} - ${match.score.away}`;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{
        backgroundColor: isLive ? 'rgba(0,200,83,0.07)' : '#161B22',
        paddingHorizontal: 16,
        paddingVertical: 12,
        minHeight: 64,
        marginBottom: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      {/* Home team */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <TeamCrest team={match.homeTeam} size={28} />
        <Text style={{ color: '#E6EDF3', fontSize: 14, fontWeight: '500', flexShrink: 1 }} numberOfLines={1}>
          {match.homeTeam.name}
        </Text>
      </View>

      {/* Centre: score + status */}
      <View style={{ alignItems: 'center', minWidth: 72 }}>
        <ScorePill score={scoreStr} />
        <StatusLabel match={match} />
        <EventPills match={match} />
      </View>

      {/* Away team */}
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
        <Text style={{ color: '#E6EDF3', fontSize: 14, fontWeight: '500', flexShrink: 1, textAlign: 'right' }} numberOfLines={1}>
          {match.awayTeam.name}
        </Text>
        <TeamCrest team={match.awayTeam} size={28} />
      </View>
    </TouchableOpacity>
  );
});
