import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Activity, Sun, Moon, Database, HelpCircle, Shield } from 'lucide-react-native';
import { SettingsRow } from '@/components/settings/settings-row';
import { SettingsSectionHeader } from '@/components/settings/settings-section-header';
import { SettingsProfileCard } from '@/components/settings/settings-profile-card';
import { useSettingsStore } from '@/stores/settings-store';
import { useFavoritesStore } from '@/stores/favorites-store';

export default function SettingsScreen() {
  const { pushNotifications, liveMatchUpdates, theme, setPushNotifications, setLiveMatchUpdates, toggleTheme } = useSettingsStore();
  const { clearAll } = useFavoritesStore();

  const handleClearFavorites = () => {
    Alert.alert(
      'Clear Favorites',
      'This will remove all your saved teams and competitions. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear All', style: 'destructive', onPress: clearAll },
      ],
    );
  };

  const handleComingSoon = () => Alert.alert('Coming Soon', 'This feature is coming soon.');
  const AppearanceIcon = theme === 'dark' ? Moon : Sun;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 20, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 }}>
          Settings
        </Text>

        {/* Profile */}
        <SettingsProfileCard name="Quick Score User" email="user@quickscore.app" initials="QS" badgeLabel="Pro" />

        {/* General */}
        <SettingsSectionHeader title="General" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <SettingsRow icon={<Bell size={18} color="#8B949E" />} label="Push Notifications" toggle={{ value: pushNotifications, onValueChange: setPushNotifications }} />
          <SettingsRow icon={<Activity size={18} color="#8B949E" />} label="Live Match Updates" toggle={{ value: liveMatchUpdates, onValueChange: setLiveMatchUpdates }} />
          <SettingsRow icon={<AppearanceIcon size={18} color="#8B949E" />} label="Appearance" value={theme === 'dark' ? 'Dark' : 'Light'} onPress={toggleTheme} showBorder={false} />
        </View>

        {/* API & Usage */}
        <SettingsSectionHeader title="API & Usage" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <SettingsRow icon={<Database size={18} color="#8B949E" />} label="Data Source" value="Mock" showBorder={false} />
        </View>

        {/* Support */}
        <SettingsSectionHeader title="Support" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <SettingsRow icon={<HelpCircle size={18} color="#8B949E" />} label="Help Center" onPress={handleComingSoon} />
          <SettingsRow icon={<Shield size={18} color="#8B949E" />} label="Privacy Policy" onPress={handleComingSoon} showBorder={false} />
        </View>

        {/* Danger Zone */}
        <SettingsSectionHeader title="Danger Zone" />
        <View style={{ marginHorizontal: 12 }}>
          <TouchableOpacity
            onPress={handleClearFavorites}
            style={{ backgroundColor: 'rgba(255,61,61,0.12)', borderRadius: 10, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(255,61,61,0.3)' }}
          >
            <Text style={{ color: '#FF3D3D', fontSize: 15, fontWeight: '600' }}>Clear All Favorites</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
