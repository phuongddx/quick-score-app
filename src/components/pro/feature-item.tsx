import React from 'react';
import { View, Text } from 'react-native';

interface FeatureItemProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

export function FeatureItem({ icon, title, subtitle }: FeatureItemProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 }}>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          backgroundColor: '#1e293b',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 15, fontWeight: '600' }}>{title}</Text>
        <Text style={{ color: '#8B949E', fontSize: 13 }}>{subtitle}</Text>
      </View>
    </View>
  );
}
