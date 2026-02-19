import { TouchableOpacity, View, Text } from 'react-native';
import type { Match } from '../types';

interface Props {
  match: Match;
  onPress: () => void;
  onToggleNotification?: () => void;
  notificationEnabled?: boolean;
}

function kickoffLabel(startTime: string): { label: string; isToday: boolean } {
  const d = new Date(startTime);
  const now = new Date();
  const isToday =
    d.getUTCFullYear() === now.getUTCFullYear() &&
    d.getUTCMonth()    === now.getUTCMonth() &&
    d.getUTCDate()     === now.getUTCDate();
  const hh = String(d.getUTCHours()).padStart(2, '0');
  const mm = String(d.getUTCMinutes()).padStart(2, '0');
  return { label: `${hh}:${mm}`, isToday };
}

export function FixtureItem({
  match, onPress, onToggleNotification, notificationEnabled,
}: Props) {
  const { label, isToday } = kickoffLabel(match.startTime);
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={{
        backgroundColor: '#161B22',
        paddingHorizontal: 16,
        paddingVertical: 14,
        minHeight: 52,
        marginBottom: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
      }}
    >
      {/* Kickoff time */}
      <Text style={{ color: isToday ? '#2196F3' : '#8B949E', fontSize: 13, fontWeight: '600', width: 40, textAlign: 'center' }}>
        {label}
      </Text>

      {/* Teams */}
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 14 }} numberOfLines={1}>
          {match.homeTeam.name}
        </Text>
        <Text style={{ color: '#8B949E', fontSize: 11, marginVertical: 1 }}>vs</Text>
        <Text style={{ color: '#E6EDF3', fontSize: 14 }} numberOfLines={1}>
          {match.awayTeam.name}
        </Text>
      </View>

      {/* Notification bell */}
      {onToggleNotification && (
        <TouchableOpacity onPress={onToggleNotification} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={{ fontSize: 18, opacity: notificationEnabled ? 1 : 0.4 }}>🔔</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
