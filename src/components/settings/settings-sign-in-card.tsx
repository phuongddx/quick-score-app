import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { User } from 'lucide-react-native';

interface SettingsSignInCardProps {
  onSignIn: () => void;
}

export function SettingsSignInCard({ onSignIn }: SettingsSignInCardProps) {
  return (
    <View style={{ backgroundColor: '#161B22', borderRadius: 12, marginHorizontal: 12, padding: 24, alignItems: 'center' }}>
      <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#21262D', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
        <User size={36} color="#8B949E" />
      </View>
      <Text style={{ color: '#E6EDF3', fontSize: 18, fontWeight: '700', textAlign: 'center', marginBottom: 8 }}>
        Sign In to Sync Favorites
      </Text>
      <Text style={{ color: '#8B949E', fontSize: 14, textAlign: 'center', lineHeight: 20, marginBottom: 20 }}>
        Access your saved teams, leagues, and settings across all your devices.
      </Text>
      <TouchableOpacity
        onPress={onSignIn}
        style={{ backgroundColor: '#4F7CFF', borderRadius: 24, paddingVertical: 14, paddingHorizontal: 40, width: '100%', alignItems: 'center' }}
      >
        <Text style={{ color: '#FFFFFF', fontSize: 15, fontWeight: '700' }}>Login / Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}
