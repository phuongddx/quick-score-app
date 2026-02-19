import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  label: string;
  homeValue: number;
  awayValue: number;
  isPercentage?: boolean;
}

export const StatBar = React.memo(function StatBar({ label, homeValue, awayValue, isPercentage }: Props) {
  const total = homeValue + awayValue;
  const homeFlex = total === 0 ? 1 : homeValue / total;
  const awayFlex = total === 0 ? 1 : awayValue / total;
  const fmt = (v: number) => (isPercentage ? `${v}%` : String(v));

  return (
    <View style={{ marginBottom: 12 }}>
      {/* Values row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 13, fontWeight: '600' }}>{fmt(homeValue)}</Text>
        <Text style={{ color: '#8B949E', fontSize: 11 }}>{label}</Text>
        <Text style={{ color: '#E6EDF3', fontSize: 13, fontWeight: '600' }}>{fmt(awayValue)}</Text>
      </View>

      {/* Bar */}
      <View style={{ flexDirection: 'row', height: 4, borderRadius: 2, overflow: 'hidden', backgroundColor: '#30363D' }}>
        <View style={{ flex: homeFlex, backgroundColor: '#2196F3' }} />
        <View style={{ flex: awayFlex, backgroundColor: '#484F58' }} />
      </View>
    </View>
  );
});
