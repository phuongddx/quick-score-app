import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import type { MatchEvent } from '../types';

interface Props {
  events: MatchEvent[];
  homeTeamId: string;
  currentMinute?: number;
}

const EVENT_ICONS: Record<MatchEvent['type'], string> = {
  goal:         '⚽',
  yellow_card:  '🟨',
  red_card:     '🟥',
  substitution: '🔄',
  penalty:      '🎯',
  var:          '📺',
};

function EventRow({ event, isHome }: { event: MatchEvent; isHome: boolean }) {
  const icon = EVENT_ICONS[event.type] ?? '•';
  const detail = event.type === 'goal' && event.detail ? ` (${event.detail})` : '';

  if (isHome) {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
        {/* Home side: content on left */}
        <View style={{ flex: 1, alignItems: 'flex-end', paddingRight: 12 }}>
          <Text style={{ color: '#E6EDF3', fontSize: 13, textAlign: 'right' }}>
            {event.playerName}{detail}
          </Text>
          <Text style={{ color: '#8B949E', fontSize: 11 }}>{event.minute}'</Text>
        </View>
        <Text style={{ fontSize: 16 }}>{icon}</Text>
        {/* Centre divider area */}
        <View style={{ flex: 1 }} />
      </View>
    );
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
      {/* Away side: content on right */}
      <View style={{ flex: 1 }} />
      <Text style={{ fontSize: 16 }}>{icon}</Text>
      <View style={{ flex: 1, alignItems: 'flex-start', paddingLeft: 12 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 13 }}>
          {event.playerName}{detail}
        </Text>
        <Text style={{ color: '#8B949E', fontSize: 11 }}>{event.minute}'</Text>
      </View>
    </View>
  );
}

function MinuteMarker({ minute }: { minute: number }) {
  return (
    <View style={{ alignItems: 'center', marginVertical: 8 }}>
      <View style={{ backgroundColor: '#00C853', borderRadius: 12, paddingHorizontal: 10, paddingVertical: 3, flexDirection: 'row', gap: 4, alignItems: 'center' }}>
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#0D1117' }} />
        <Text style={{ color: '#0D1117', fontSize: 11, fontWeight: '700' }}>LIVE — {minute}'</Text>
      </View>
    </View>
  );
}

export function EventTimeline({ events, homeTeamId, currentMinute }: Props) {
  if (events.length === 0) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
        <Text style={{ color: '#484F58', fontSize: 14 }}>No events yet</Text>
      </View>
    );
  }

  const sorted = [...events].sort((a, b) => a.minute - b.minute);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: '#0D1117' }}
      contentContainerStyle={{ padding: 16 }}
    >
      {/* Centre divider line */}
      <View style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 1, backgroundColor: '#21262D' }} />

      {sorted.map((event) => (
        <EventRow key={event.id} event={event} isHome={event.teamId === homeTeamId} />
      ))}

      {currentMinute !== undefined && (
        <MinuteMarker minute={currentMinute} />
      )}
    </ScrollView>
  );
}
