import React from 'react';
import { View, Text } from 'react-native';

interface SettingsProfileCardProps {
  name: string;
  email: string;
  initials: string;
  badgeLabel?: string;
}

export function SettingsProfileCard({ name, email, initials, badgeLabel }: SettingsProfileCardProps) {
  return (
    <View style={{ backgroundColor: '#161B22', borderRadius: 12, marginHorizontal: 12, padding: 16, flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: '#2196F3', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
        <Text style={{ color: '#FFFFFF', fontSize: 16, fontWeight: '700' }}>{initials}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <Text style={{ color: '#E6EDF3', fontSize: 16, fontWeight: '600' }}>{name}</Text>
          {badgeLabel && (
            <View style={{ backgroundColor: '#2196F3', borderRadius: 10, paddingHorizontal: 8, paddingVertical: 2 }}>
              <Text style={{ color: '#FFFFFF', fontSize: 11, fontWeight: '600' }}>{badgeLabel}</Text>
            </View>
          )}
        </View>
        <Text style={{ color: '#8B949E', fontSize: 13, marginTop: 2 }}>{email}</Text>
      </View>
    </View>
  );
}
