import React from 'react';
import { View, Text } from 'react-native';

interface SettingsSectionHeaderProps {
  title: string;
}

export function SettingsSectionHeader({ title }: SettingsSectionHeaderProps) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 6 }}>
      <Text style={{ color: '#8B949E', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {title}
      </Text>
    </View>
  );
}
