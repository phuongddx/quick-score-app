import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMatchDetail } from '@/hooks/use-match-detail';
import { useFavoritesStore } from '@/stores/favorites-store';
import { ScoreBoard } from '@/components/score-board';
import { EventTimeline } from '@/components/event-timeline';
import { LineupPitch } from '@/components/lineup-pitch';
import { StatBar } from '@/components/stat-bar';
import type { MatchStats, Team } from '@/types';

type Tab = 'events' | 'lineups' | 'stats' | 'h2h';

// ─── Inline helpers ───────────────────────────────────────────────────────────

function TabStrip({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: Tab[] = ['events', 'lineups', 'stats', 'h2h'];
  return (
    <View style={{ flexDirection: 'row', backgroundColor: '#161B22', borderBottomWidth: 1, borderBottomColor: '#30363D' }}>
      {tabs.map((t) => (
        <TouchableOpacity key={t} onPress={() => onChange(t)} style={{
          flex: 1, paddingVertical: 12, alignItems: 'center',
          borderBottomWidth: 2, borderBottomColor: active === t ? '#2196F3' : 'transparent',
        }}>
          <Text style={{ color: active === t ? '#2196F3' : '#8B949E', fontSize: 12, fontWeight: '600', textTransform: 'capitalize' }}>
            {t === 'h2h' ? 'H2H' : t.charAt(0).toUpperCase() + t.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const STAT_LABELS: [keyof MatchStats, string, boolean][] = [
  ['possession',     'Possession',      true],
  ['shots',          'Shots',           false],
  ['shotsOnTarget',  'Shots on Target', false],
  ['corners',        'Corners',         false],
  ['fouls',          'Fouls',           false],
  ['yellowCards',    'Yellow Cards',    false],
  ['redCards',       'Red Cards',       false],
];

function StatsPanel({ stats }: { stats: MatchStats }) {
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {STAT_LABELS.map(([key, label, isPct]) => (
        <StatBar key={key} label={label} homeValue={stats[key][0]} awayValue={stats[key][1]} isPercentage={isPct} />
      ))}
    </ScrollView>
  );
}

// Hardcoded H2H for known matchups
const H2H_DATA: Record<string, { date: string; home: string; score: string; away: string }[]> = {
  'arsenal-chelsea': [
    { date: 'Nov 2025', home: 'Arsenal', score: '3 - 1', away: 'Chelsea' },
    { date: 'Apr 2025', home: 'Chelsea', score: '0 - 2', away: 'Arsenal' },
    { date: 'Dec 2024', home: 'Arsenal', score: '2 - 2', away: 'Chelsea' },
    { date: 'May 2024', home: 'Chelsea', score: '2 - 5', away: 'Arsenal' },
    { date: 'Oct 2023', home: 'Arsenal', score: '1 - 0', away: 'Chelsea' },
  ],
  'bayernmunich-dortmund': [
    { date: 'Nov 2025', home: 'Bayern', score: '4 - 0', away: 'Dortmund' },
    { date: 'Apr 2025', home: 'Dortmund', score: '2 - 1', away: 'Bayern' },
    { date: 'Nov 2024', home: 'Bayern', score: '1 - 0', away: 'Dortmund' },
    { date: 'Mar 2024', home: 'Dortmund', score: '0 - 0', away: 'Bayern' },
    { date: 'Nov 2023', home: 'Bayern', score: '4 - 0', away: 'Dortmund' },
  ],
  'barcelona-realmadrid': [
    { date: 'Oct 2025', home: 'Barcelona', score: '4 - 0', away: 'Real Madrid' },
    { date: 'Apr 2025', home: 'Real Madrid', score: '3 - 2', away: 'Barcelona' },
    { date: 'Oct 2024', home: 'Barcelona', score: '1 - 2', away: 'Real Madrid' },
    { date: 'Apr 2024', home: 'Real Madrid', score: '3 - 2', away: 'Barcelona' },
    { date: 'Oct 2023', home: 'Barcelona', score: '2 - 1', away: 'Real Madrid' },
  ],
};

function H2HPanel({ homeTeam, awayTeam }: { homeTeam: Team; awayTeam: Team }) {
  const key1 = `${homeTeam.id}-${awayTeam.id}`;
  const key2 = `${awayTeam.id}-${homeTeam.id}`;
  const results = H2H_DATA[key1] ?? H2H_DATA[key2] ?? [];
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ color: '#8B949E', fontSize: 12, fontWeight: '600', textTransform: 'uppercase', marginBottom: 12 }}>Last 5 Meetings</Text>
      {results.length === 0 ? (
        <Text style={{ color: '#484F58', textAlign: 'center', paddingTop: 16 }}>No H2H data available</Text>
      ) : results.map((r, i) => (
        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#21262D' }}>
          <Text style={{ color: '#8B949E', fontSize: 12, width: 64 }}>{r.date}</Text>
          <Text style={{ color: '#E6EDF3', fontSize: 13, flex: 1, textAlign: 'right' }}>{r.home}</Text>
          <Text style={{ color: '#2196F3', fontSize: 14, fontWeight: '700', marginHorizontal: 12 }}>{r.score}</Text>
          <Text style={{ color: '#E6EDF3', fontSize: 13, flex: 1 }}>{r.away}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

// ─── Main screen ──────────────────────────────────────────────────────────────
export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: match, isPending } = useMatchDetail(id ?? '');
  const { isFavoriteTeam, addTeam, removeTeam } = useFavoritesStore();
  const [activeTab, setActiveTab] = useState<Tab>('events');

  if (isPending) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117', justifyContent: 'center', alignItems: 'center' }} edges={['top']}>
        <ActivityIndicator color="#2196F3" size="large" />
      </SafeAreaView>
    );
  }

  if (!match) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117', justifyContent: 'center', alignItems: 'center' }} edges={['top']}>
        <Text style={{ color: '#8B949E', fontSize: 16 }}>Match not found</Text>
        <TouchableOpacity onPress={() => router.back()} style={{ marginTop: 12 }}>
          <Text style={{ color: '#2196F3' }}>← Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const isFav = isFavoriteTeam(match.homeTeam.id) || isFavoriteTeam(match.awayTeam.id);
  const toggleFav = () => {
    if (isFavoriteTeam(match.homeTeam.id)) removeTeam(match.homeTeam.id);
    else addTeam(match.homeTeam.id);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 8 }}>
        <TouchableOpacity onPress={() => router.back()} style={{ marginRight: 12 }}>
          <Text style={{ color: '#2196F3', fontSize: 16 }}>←</Text>
        </TouchableOpacity>
        <Text style={{ color: '#8B949E', fontSize: 12, flex: 1 }}>{match.leagueName} · {match.round}</Text>
        <TouchableOpacity onPress={toggleFav} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={{ fontSize: 20 }}>{isFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      </View>

      {/* Score hero */}
      <ScoreBoard
        homeTeam={match.homeTeam} awayTeam={match.awayTeam}
        score={match.score} status={match.status} minute={match.minute}
      />

      {/* Tab strip */}
      <TabStrip active={activeTab} onChange={setActiveTab} />

      {/* Tab content */}
      <View style={{ flex: 1 }}>
        {activeTab === 'events' && (
          <EventTimeline events={match.events} homeTeamId={match.homeTeam.id} currentMinute={match.minute} />
        )}
        {activeTab === 'lineups' && match.homeLineup && match.awayLineup && (
          <LineupPitch homeLineup={match.homeLineup} awayLineup={match.awayLineup} />
        )}
        {activeTab === 'lineups' && (!match.homeLineup || !match.awayLineup) && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#484F58' }}>Lineups not available</Text>
          </View>
        )}
        {activeTab === 'stats' && match.stats && <StatsPanel stats={match.stats} />}
        {activeTab === 'stats' && !match.stats && (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: '#484F58' }}>Stats not available</Text>
          </View>
        )}
        {activeTab === 'h2h' && <H2HPanel homeTeam={match.homeTeam} awayTeam={match.awayTeam} />}
      </View>
    </SafeAreaView>
  );
}
