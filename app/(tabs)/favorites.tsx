import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFavoritesStore } from '@/stores/favorites-store';
import { useFavoriteMatches } from '@/hooks/use-favorites';
import { MOCK_LEAGUES } from '@/data/mock-leagues';
import { mockDataService } from '@/services/mock-data-service';
import { EmptyState } from '@/components/empty-state';
import { LiveIndicator } from '@/components/live-indicator';
import { TeamCrest } from '@/components/team-crest';
import type { Match } from '@/types';

type Segment = 'teams' | 'competitions';

function SegmentControl({ value, onChange }: { value: Segment; onChange: (s: Segment) => void }) {
  return (
    <View style={{ flexDirection: 'row', margin: 12, backgroundColor: '#21262D', borderRadius: 8, padding: 2 }}>
      {(['teams', 'competitions'] as Segment[]).map((s) => (
        <TouchableOpacity key={s} onPress={() => onChange(s)} style={{
          flex: 1, paddingVertical: 8, borderRadius: 6, alignItems: 'center',
          backgroundColor: value === s ? '#2196F3' : 'transparent',
        }}>
          <Text style={{ color: value === s ? '#fff' : '#8B949E', fontSize: 13, fontWeight: '600', textTransform: 'capitalize' }}>{s}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

function LiveBanner({ matches }: { matches: Match[] }) {
  if (matches.length === 0) return null;
  const m = matches[0]!;
  return (
    <View style={{ backgroundColor: 'rgba(0,200,83,0.12)', marginHorizontal: 12, marginBottom: 8, padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#00C853', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <LiveIndicator minute={m.minute ?? 45} isHalftime={m.status === 'halftime'} />
      <Text style={{ color: '#E6EDF3', fontSize: 13 }}>
        {m.homeTeam.shortName} {m.score.home}–{m.score.away} {m.awayTeam.shortName}
      </Text>
    </View>
  );
}

function TeamCard({ teamId, onRemove }: { teamId: string; onRemove: () => void }) {
  const allTeams = mockDataService.getAllTeams();
  const team = allTeams.find((t) => t.id === teamId);
  if (!team) return null;
  return (
    <TouchableOpacity
      onLongPress={() => Alert.alert('Remove', `Remove ${team.name} from favorites?`, [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Remove', style: 'destructive', onPress: onRemove },
      ])}
      style={{ backgroundColor: '#161B22', marginHorizontal: 12, marginBottom: 8, padding: 14, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}
    >
      <TeamCrest team={team} size={40} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 15, fontWeight: '600' }}>{team.name}</Text>
        <Text style={{ color: '#8B949E', fontSize: 12, marginTop: 2 }}>Long press to remove</Text>
      </View>
    </TouchableOpacity>
  );
}

function AddTeamSearch({ onAdd }: { onAdd: (id: string) => void }) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const all = mockDataService.getAllTeams();
  const filtered = query.length > 1 ? all.filter((t) => t.name.toLowerCase().includes(query.toLowerCase())) : [];

  return (
    <View style={{ marginHorizontal: 12, marginBottom: 8 }}>
      <TouchableOpacity onPress={() => setOpen((o) => !o)} style={{ backgroundColor: '#21262D', borderRadius: 8, padding: 12, borderWidth: 1, borderColor: '#30363D', borderStyle: 'dashed', alignItems: 'center' }}>
        <Text style={{ color: '#8B949E', fontSize: 13 }}>+ Add Team</Text>
      </TouchableOpacity>
      {open && (
        <View style={{ backgroundColor: '#161B22', borderRadius: 8, marginTop: 4, borderWidth: 1, borderColor: '#30363D' }}>
          <TextInput
            value={query} onChangeText={setQuery} placeholder="Search teams…"
            placeholderTextColor="#484F58"
            style={{ color: '#E6EDF3', paddingHorizontal: 12, paddingVertical: 10, fontSize: 14 }}
            autoFocus
          />
          {filtered.slice(0, 5).map((t) => (
            <TouchableOpacity key={t.id} onPress={() => { onAdd(t.id); setOpen(false); setQuery(''); }}
              style={{ paddingHorizontal: 12, paddingVertical: 10, borderTopWidth: 1, borderTopColor: '#21262D' }}>
              <Text style={{ color: '#E6EDF3', fontSize: 14 }}>{t.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function FavoritesScreen() {
  const [segment, setSegment] = useState<Segment>('teams');
  const { favoriteTeamIds, favoriteLeagueIds, addTeam, removeTeam, addLeague, removeLeague } = useFavoritesStore();
  const { data: liveMatches = [] } = useFavoriteMatches();

  const teamsContent = (
    <>
      <LiveBanner matches={liveMatches} />
      {favoriteTeamIds.length === 0 ? (
        <EmptyState icon="❤️" title="No favorite teams" subtitle="Add teams to track their live scores here" />
      ) : (
        favoriteTeamIds.map((id) => <TeamCard key={id} teamId={id} onRemove={() => removeTeam(id)} />)
      )}
      <AddTeamSearch onAdd={addTeam} />
    </>
  );

  const competitionsContent = (
    <>
      {favoriteLeagueIds.length === 0 ? (
        <EmptyState icon="🏆" title="No favorite competitions" subtitle="Add competitions to follow them" />
      ) : (
        favoriteLeagueIds.map((id) => {
          const l = MOCK_LEAGUES.find((lg) => lg.id === id);
          if (!l) return null;
          return (
            <TouchableOpacity key={id}
              onLongPress={() => Alert.alert('Remove', `Remove ${l.name}?`, [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Remove', style: 'destructive', onPress: () => removeLeague(id) },
              ])}
              style={{ backgroundColor: '#161B22', marginHorizontal: 12, marginBottom: 8, padding: 14, borderRadius: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}
            >
              <Text style={{ fontSize: 28 }}>{l.flag}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ color: '#E6EDF3', fontSize: 15, fontWeight: '600' }}>{l.name}</Text>
                <Text style={{ color: '#8B949E', fontSize: 12 }}>{l.country} · {l.season}/{l.season + 1}</Text>
              </View>
            </TouchableOpacity>
          );
        })
      )}
      <View style={{ marginHorizontal: 12 }}>
        {MOCK_LEAGUES.filter((l) => !favoriteLeagueIds.includes(l.id)).map((l) => (
          <TouchableOpacity key={l.id} onPress={() => addLeague(l.id)}
            style={{ backgroundColor: '#21262D', borderRadius: 8, padding: 12, marginBottom: 6, flexDirection: 'row', alignItems: 'center', gap: 10, borderWidth: 1, borderColor: '#30363D', borderStyle: 'dashed' }}>
            <Text style={{ fontSize: 18 }}>{l.flag}</Text>
            <Text style={{ color: '#8B949E', fontSize: 13 }}>+ {l.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <Text style={{ color: '#E6EDF3', fontSize: 20, fontWeight: '700', paddingHorizontal: 16, paddingTop: 8 }}>Favorites</Text>
      <SegmentControl value={segment} onChange={setSegment} />
      <FlatList
        data={[]} renderItem={null}
        ListHeaderComponent={segment === 'teams' ? teamsContent : competitionsContent}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
    </SafeAreaView>
  );
}
