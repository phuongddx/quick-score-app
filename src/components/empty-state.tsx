import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  icon?: string;
  title: string;
  subtitle?: string;
}

export function EmptyState({ icon = '⚽', title, subtitle }: Props) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, gap: 12 }}>
      <Text style={{ fontSize: 48 }}>{icon}</Text>
      <Text style={{ color: '#E6EDF3', fontSize: 18, fontWeight: '600', textAlign: 'center' }}>
        {title}
      </Text>
      {subtitle ? (
        <Text style={{ color: '#8B949E', fontSize: 14, textAlign: 'center', lineHeight: 20 }}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
