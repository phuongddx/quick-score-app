import React, { useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFixtures } from '@/hooks/use-fixtures';
import { useFiltersStore } from '@/stores/filters-store';
import { MOCK_LEAGUES } from '@/data/mock-leagues';
import { FixtureItem } from '@/components/fixture-item';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/empty-state';
import { DateFilterStrip } from '@/components/date-filter-strip';

function todayISO(): string {
  return new Date().toISOString().split('T')[0]!;
}

function CompetitionChips() {
  const { selectedLeagueIds, toggleLeague } = useFiltersStore();
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#161B22', maxHeight: 44 }}
      contentContainerStyle={{ paddingHorizontal: 12, alignItems: 'center', gap: 8 }}
    >
      {MOCK_LEAGUES.map((league) => {
        const active = selectedLeagueIds.includes(league.id);
        return (
          <TouchableOpacity
            key={league.id}
            onPress={() => toggleLeague(league.id)}
            style={{
              paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
              backgroundColor: active ? '#2196F3' : '#21262D',
            }}
          >
            <Text style={{ color: active ? '#fff' : '#8B949E', fontSize: 12, fontWeight: '600' }}>
              {league.flag} {league.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default function FixturesScreen() {
  const [selectedDate, setSelectedDate] = useState(todayISO);
  const { selectedLeagueIds } = useFiltersStore();
  const activeLeague = selectedLeagueIds.length === 1 ? selectedLeagueIds[0] : undefined;
  const { data: fixtures, isPending } = useFixtures(activeLeague, 14);

  // Filter by selected date first, then apply league filter on top
  const dayMatches = (fixtures ?? []).filter(
    (m) => m.startTime.split('T')[0] === selectedDate,
  );
  const filtered = dayMatches.filter(
    (m) => selectedLeagueIds.length === 0 || selectedLeagueIds.includes(m.leagueId),
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <CompetitionChips />
      <DateFilterStrip selectedDate={selectedDate} onDateChange={setSelectedDate} daysRange={7} />

      {isPending ? (
        <LoadingSkeleton count={6} />
      ) : filtered.length === 0 ? (
        <EmptyState title="No fixtures" subtitle="No matches for this date" />
      ) : (
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FixtureItem
              match={item}
              onPress={() => router.push(`/match/${item.id}` as never)}
            />
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </SafeAreaView>
  );
}
