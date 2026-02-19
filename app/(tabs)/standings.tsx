import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStandings } from '@/hooks/use-standings';
import { useFavoritesStore } from '@/stores/favorites-store';
import { MOCK_LEAGUES } from '@/data/mock-leagues';
import { StandingsTable } from '@/components/standings-table';
import { LoadingSkeleton } from '@/components/loading-skeleton';

function LeagueTabStrip({
  leagues,
  activeId,
  onChange,
}: {
  leagues: typeof MOCK_LEAGUES;
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#161B22', maxHeight: 48 }}
      contentContainerStyle={{ paddingHorizontal: 8, alignItems: 'center' }}
    >
      {leagues.map((l) => {
        const active = l.id === activeId;
        return (
          <TouchableOpacity
            key={l.id}
            onPress={() => onChange(l.id)}
            style={{
              paddingHorizontal: 14,
              paddingVertical: 10,
              marginHorizontal: 2,
              borderBottomWidth: 2,
              borderBottomColor: active ? '#2196F3' : 'transparent',
            }}
          >
            <Text style={{ color: active ? '#2196F3' : '#8B949E', fontSize: 13, fontWeight: '600' }}>
              {l.flag} {l.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

// Zone legend
function ZoneLegend() {
  const zones = [
    { color: '#00C853', label: 'Champions League' },
    { color: '#FF9800', label: 'Europa League' },
    { color: '#9C27B0', label: 'Conf. League' },
    { color: '#FF3D3D', label: 'Relegation' },
  ];
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, padding: 10, backgroundColor: '#161B22', borderTopWidth: 1, borderTopColor: '#21262D' }}>
      {zones.map((z) => (
        <View key={z.label} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: z.color }} />
          <Text style={{ color: '#8B949E', fontSize: 10 }}>{z.label}</Text>
        </View>
      ))}
    </View>
  );
}

export default function StandingsScreen() {
  const [activeLeagueId, setActiveLeagueId] = useState(MOCK_LEAGUES[0]!.id);
  const { data: entries, isPending } = useStandings(activeLeagueId);
  const { favoriteTeamIds } = useFavoritesStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <LeagueTabStrip
        leagues={MOCK_LEAGUES}
        activeId={activeLeagueId}
        onChange={setActiveLeagueId}
      />

      {isPending ? (
        <LoadingSkeleton count={10} />
      ) : (
        <View style={{ flex: 1 }}>
          <StandingsTable
            entries={entries ?? []}
            highlightTeamId={favoriteTeamIds[0]}
          />
        </View>
      )}

      <ZoneLegend />
    </SafeAreaView>
  );
}
