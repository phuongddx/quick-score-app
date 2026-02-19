import React from 'react';
import { SectionList, ScrollView, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Match } from '@/types';
import { useFixtures } from '@/hooks/use-fixtures';
import { useFiltersStore } from '@/stores/filters-store';
import { MOCK_LEAGUES } from '@/data/mock-leagues';
import { FixtureItem } from '@/components/fixture-item';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/empty-state';

interface FixtureSection { title: string; data: Match[] }

function groupByDate(matches: Match[]): FixtureSection[] {
  const map = new Map<string, Match[]>();
  for (const m of matches) {
    const date = m.startTime.split('T')[0]!;
    if (!map.has(date)) map.set(date, []);
    map.get(date)!.push(m);
  }
  return Array.from(map.entries()).map(([date, data]) => ({
    title: formatDateHeader(date),
    data,
  }));
}

function formatDateHeader(iso: string): string {
  const d = new Date(iso + 'T00:00:00Z');
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const diff = Math.round((d.getTime() - today.getTime()) / 86_400_000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return d.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

function CompetitionChips() {
  const { selectedLeagueIds, toggleLeague } = useFiltersStore();
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
      style={{ backgroundColor: '#161B22', maxHeight: 44 }}
      contentContainerStyle={{ paddingHorizontal: 12, alignItems: 'center', gap: 8 }}
    >
      {MOCK_LEAGUES.map((league) => {
        const active = selectedLeagueIds.includes(league.id);
        return (
          <TouchableOpacity key={league.id} onPress={() => toggleLeague(league.id)}
            style={{
              paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16,
              backgroundColor: active ? '#2196F3' : '#21262D',
              marginRight: 8,
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
  const { selectedLeagueIds } = useFiltersStore();
  const activeLeague = selectedLeagueIds.length === 1 ? selectedLeagueIds[0] : undefined;
  const { data: fixtures, isPending } = useFixtures(activeLeague, 14);

  // Apply multi-league filter client-side
  const filtered = (fixtures ?? []).filter((m) =>
    selectedLeagueIds.length === 0 || selectedLeagueIds.includes(m.leagueId),
  );
  const sections = groupByDate(filtered);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <CompetitionChips />

      {isPending ? (
        <LoadingSkeleton count={6} />
      ) : sections.length === 0 ? (
        <EmptyState title="No fixtures" subtitle="No upcoming matches for selected competitions" />
      ) : (
        <SectionList<Match, FixtureSection>
          sections={sections}
          keyExtractor={(item) => item.id}
          renderSectionHeader={({ section }) => (
            <View style={{ backgroundColor: '#0D1117', paddingHorizontal: 16, paddingVertical: 8 }}>
              <Text style={{ color: '#8B949E', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {section.title}
              </Text>
            </View>
          )}
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
