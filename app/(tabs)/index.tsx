import React, { useState, useCallback } from 'react';
import { SectionList, View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { Match } from '@/types';
import { useMatchesByDate } from '@/hooks/use-matches-by-date';
import { useFiltersStore } from '@/stores/filters-store';
import { LEAGUE_MAP } from '@/data/mock-leagues';
import { MatchCard } from '@/components/match-card';
import { CompetitionHeader } from '@/components/competition-header';
import { DateFilterStrip } from '@/components/date-filter-strip';
import { LoadingSkeleton } from '@/components/loading-skeleton';
import { EmptyState } from '@/components/empty-state';

interface Section {
  title: string;
  leagueId: string;
  data: Match[];
}

function groupByLeague(matches: Match[]): Section[] {
  const map = new Map<string, Section>();
  for (const m of matches) {
    if (!map.has(m.leagueId)) {
      map.set(m.leagueId, { title: m.leagueName, leagueId: m.leagueId, data: [] });
    }
    map.get(m.leagueId)!.data.push(m);
  }
  return Array.from(map.values());
}

export default function ScoresScreen() {
  const { selectedDate, setDate } = useFiltersStore();
  const { data: matches, isPending } = useMatchesByDate(selectedDate);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());

  const toggleSection = useCallback((leagueId: string) => {
    setCollapsed((prev) => {
      const next = new Set(prev);
      next.has(leagueId) ? next.delete(leagueId) : next.add(leagueId);
      return next;
    });
  }, []);

  const sections = groupByLeague(matches ?? []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      {/* Date strip */}
      <DateFilterStrip selectedDate={selectedDate} onDateChange={setDate} />

      {isPending ? (
        <LoadingSkeleton count={8} />
      ) : sections.length === 0 ? (
        <EmptyState title="No matches" subtitle={`No matches on ${selectedDate}`} />
      ) : (
        <SectionList<Match, Section>
          sections={sections.map((s) => ({
            ...s,
            data: collapsed.has(s.leagueId) ? [] : s.data,
          }))}
          keyExtractor={(item) => item.id}
          stickySectionHeadersEnabled
          renderSectionHeader={({ section }) => {
            const league = LEAGUE_MAP[section.leagueId];
            const liveCount = section.data.filter(
              (m) => m.status === 'live' || m.status === 'halftime',
            ).length;
            return league ? (
              <CompetitionHeader
                league={league}
                liveCount={liveCount}
                isExpanded={!collapsed.has(section.leagueId)}
                onToggle={() => toggleSection(section.leagueId)}
              />
            ) : null;
          }}
          renderItem={({ item }) => (
            <MatchCard
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
