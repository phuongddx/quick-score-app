import React from 'react';
import { View, Text, FlatList } from 'react-native';
import type { StandingsEntry } from '../types';

interface Props {
  entries: StandingsEntry[];
  highlightTeamId?: string;
}

const ROW_HEIGHT = 44;

const ZONE_COLORS: Record<string, string> = {
  cl:         '#00C853',
  el:         '#FF9800',
  ecl:        '#9C27B0',
  relegation: '#FF3D3D',
};

function FormDot({ result }: { result: 'W' | 'D' | 'L' }) {
  const colors = { W: '#00C853', D: '#8B949E', L: '#FF3D3D' };
  return (
    <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: colors[result], marginHorizontal: 1 }} />
  );
}

function TableHeader() {
  return (
    <View style={{
      flexDirection: 'row', backgroundColor: '#161B22',
      paddingHorizontal: 12, paddingVertical: 8,
      borderBottomWidth: 1, borderBottomColor: '#30363D',
    }}>
      <Text style={[col.pos, label]}>#</Text>
      <Text style={[col.team, label]}>Team</Text>
      <Text style={[col.num, label]}>P</Text>
      <Text style={[col.num, label]}>W</Text>
      <Text style={[col.num, label]}>D</Text>
      <Text style={[col.num, label]}>L</Text>
      <Text style={[col.num, label]}>GD</Text>
      <Text style={[col.pts, label]}>Pts</Text>
      <Text style={[col.form, label]}>Form</Text>
    </View>
  );
}

function TableRow({ entry, isHighlighted, isAlt }: { entry: StandingsEntry; isHighlighted: boolean; isAlt: boolean }) {
  const zoneColor = entry.zone ? ZONE_COLORS[entry.zone] : 'transparent';
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      height: ROW_HEIGHT,
      paddingHorizontal: 12,
      backgroundColor: isHighlighted ? 'rgba(33,150,243,0.12)' : isAlt ? '#1C2128' : '#161B22',
      borderBottomWidth: 1, borderBottomColor: '#21262D',
    }}>
      {/* Position with zone indicator */}
      <View style={[col.pos, { flexDirection: 'row', alignItems: 'center' }]}>
        <View style={{ width: 3, height: 22, backgroundColor: zoneColor, borderRadius: 2, marginRight: 4 }} />
        <Text style={cell}>{entry.position}</Text>
      </View>

      <Text style={[col.team, cell]} numberOfLines={1}>{entry.team.shortName}</Text>
      <Text style={[col.num, cell]}>{entry.played}</Text>
      <Text style={[col.num, cell]}>{entry.won}</Text>
      <Text style={[col.num, cell]}>{entry.drawn}</Text>
      <Text style={[col.num, cell]}>{entry.lost}</Text>
      <Text style={[col.num, cell, { color: entry.goalDiff >= 0 ? '#E6EDF3' : '#FF3D3D' }]}>
        {entry.goalDiff > 0 ? `+${entry.goalDiff}` : entry.goalDiff}
      </Text>
      <Text style={[col.pts, cell, { fontWeight: '700', color: '#E6EDF3' }]}>{entry.points}</Text>

      {/* Form dots */}
      <View style={[col.form, { flexDirection: 'row', alignItems: 'center' }]}>
        {entry.form.slice(-5).map((r, i) => <FormDot key={i} result={r} />)}
      </View>
    </View>
  );
}

const col = {
  pos:  { width: 32 } as const,
  team: { flex: 1 } as const,
  num:  { width: 28, alignItems: 'center' as const } as const,
  pts:  { width: 32, alignItems: 'center' as const } as const,
  form: { width: 60, justifyContent: 'flex-end' as const } as const,
};
const label: object = { color: '#484F58', fontSize: 11, fontWeight: '600', textTransform: 'uppercase' };
const cell:  object = { color: '#8B949E', fontSize: 13 };

export function StandingsTable({ entries, highlightTeamId }: Props) {
  return (
    <FlatList
      data={entries}
      keyExtractor={(e) => e.team.id}
      ListHeaderComponent={<TableHeader />}
      stickyHeaderIndices={[0]}
      getItemLayout={(_, index) => ({ length: ROW_HEIGHT, offset: ROW_HEIGHT * index, index })}
      renderItem={({ item, index }) => (
        <TableRow
          entry={item}
          isHighlighted={item.team.id === highlightTeamId}
          isAlt={index % 2 === 1}
        />
      )}
    />
  );
}
