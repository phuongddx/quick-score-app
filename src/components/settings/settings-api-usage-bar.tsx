import React from 'react';
import { View, Text } from 'react-native';
import { Cpu } from 'lucide-react-native';

interface SettingsApiUsageBarProps {
  used: number;
  total: number;
  resetDate: string;
}

export function SettingsApiUsageBar({ used, total, resetDate }: SettingsApiUsageBarProps) {
  const pct = Math.min(used / total, 1);
  // Color shifts green → orange → red as usage climbs
  const barColor = pct < 0.6 ? '#22C55E' : pct < 0.85 ? '#F97316' : '#EF4444';

  return (
    <View style={{ paddingHorizontal: 16, paddingVertical: 14 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <View style={{ marginRight: 12 }}>
          <Cpu size={18} color="#8B949E" />
        </View>
        <Text style={{ flex: 1, color: '#E6EDF3', fontSize: 15 }}>API Requests</Text>
        <Text style={{ color: '#8B949E', fontSize: 13, fontWeight: '600' }}>
          {used}/{total} Used
        </Text>
      </View>

      {/* Progress track */}
      <View style={{ height: 6, backgroundColor: '#21262D', borderRadius: 3, marginLeft: 30, overflow: 'hidden' }}>
        <View style={{ height: '100%', width: `${pct * 100}%`, backgroundColor: barColor, borderRadius: 3 }} />
      </View>

      <Text style={{ color: '#8B949E', fontSize: 12, marginTop: 6, marginLeft: 30 }}>
        Your usage resets on {resetDate}
      </Text>
    </View>
  );
}
