import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface SettingsPremiumBannerProps {
  onUpgrade: () => void;
}

export function SettingsPremiumBanner({ onUpgrade }: SettingsPremiumBannerProps) {
  return (
    <TouchableOpacity
      onPress={onUpgrade}
      activeOpacity={0.85}
      style={{ backgroundColor: '#3730A3', borderRadius: 12, marginHorizontal: 12, padding: 16, flexDirection: 'row', alignItems: 'center', overflow: 'hidden' }}
    >
      {/* Decorative glow circle */}
      <View style={{ position: 'absolute', right: -24, top: -24, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(99,102,241,0.35)' }} />

      <Text style={{ fontSize: 20, marginRight: 10 }}>👑</Text>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 2 }}>Go Premium</Text>
        <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 13, lineHeight: 18 }}>
          Upgrade to QuickScore Pro for ad-free experience and advanced stats
        </Text>
      </View>
      <View style={{ width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginLeft: 12 }}>
        <ChevronRight size={18} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}
