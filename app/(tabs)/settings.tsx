import React from 'react';
import { View, Text, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell, Activity, Sun, Moon, Globe, Key, HelpCircle, Shield, LogOut } from 'lucide-react-native';
import { SettingsRow } from '@/components/settings/settings-row';
import { SettingsSectionHeader } from '@/components/settings/settings-section-header';
import { SettingsProfileCard } from '@/components/settings/settings-profile-card';
import { SettingsSignInCard } from '@/components/settings/settings-sign-in-card';
import { SettingsPremiumBanner } from '@/components/settings/settings-premium-banner';
import { SettingsApiUsageBar } from '@/components/settings/settings-api-usage-bar';
import { useSettingsStore } from '@/stores/settings-store';

const APP_VERSION = '2.4.0 (Build 302)';
const MOCK_USER = { name: 'Julian Alvarez', email: 'julian.alvarez@quickscore.app', initials: 'JA' };
const MOCK_USAGE = { used: 850, total: 1000, resetDate: 'Nov 1, 2023' };

export default function SettingsScreen() {
  const {
    pushNotifications, liveMatchUpdates, theme, language,
    isLoggedIn, setPushNotifications, setLiveMatchUpdates,
    toggleTheme, login, logout,
  } = useSettingsStore();

  const AppearanceIcon = theme === 'dark' ? Moon : Sun;
  const appearanceLabel = theme === 'dark' ? 'Dark' : 'Light';

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Log Out', style: 'destructive', onPress: logout },
      ],
    );
  };

  const handleComingSoon = () => Alert.alert('Coming Soon', 'This feature is coming soon.');
  const handleUpgrade = () => Alert.alert('Go Premium', 'Premium upgrade coming soon.');

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 20, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 16 }}>
          Settings
        </Text>

        {/* Profile / Sign-in */}
        {isLoggedIn ? (
          <>
            <SettingsProfileCard
              name={MOCK_USER.name}
              email={MOCK_USER.email}
              initials={MOCK_USER.initials}
              badgeLabel="Pro"
            />
            <View style={{ height: 12 }} />
            <SettingsPremiumBanner onUpgrade={handleUpgrade} />
          </>
        ) : (
          <SettingsSignInCard onSignIn={login} />
        )}

        {/* General */}
        <SettingsSectionHeader title="General" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <SettingsRow
            icon={<Bell size={18} color="#8B949E" />}
            label="Push Notifications"
            toggle={{ value: pushNotifications, onValueChange: setPushNotifications }}
          />
          {isLoggedIn && (
            <SettingsRow
              icon={<Activity size={18} color="#8B949E" />}
              label="Live Match Updates"
              toggle={{ value: liveMatchUpdates, onValueChange: setLiveMatchUpdates }}
            />
          )}
          <SettingsRow
            icon={<AppearanceIcon size={18} color="#8B949E" />}
            label="Appearance"
            value={appearanceLabel}
            onPress={toggleTheme}
          />
          <SettingsRow
            icon={<Globe size={18} color="#8B949E" />}
            label="Language"
            value={language}
            onPress={handleComingSoon}
            showBorder={false}
          />
        </View>

        {/* API & Usage */}
        <SettingsSectionHeader title="API & Usage" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          {isLoggedIn ? (
            <>
              <SettingsApiUsageBar
                used={MOCK_USAGE.used}
                total={MOCK_USAGE.total}
                resetDate={MOCK_USAGE.resetDate}
              />
              <View style={{ height: 1, backgroundColor: '#21262D', marginHorizontal: 16 }} />
              <SettingsRow
                icon={<Key size={18} color="#8B949E" />}
                label="Manage API Keys"
                onPress={handleComingSoon}
                showBorder={false}
              />
            </>
          ) : (
            <View style={{ padding: 16, alignItems: 'center' }}>
              <View style={{ backgroundColor: '#21262D', borderRadius: 8, paddingVertical: 10, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Text style={{ fontSize: 14 }}>🔒</Text>
                <Text style={{ color: '#8B949E', fontSize: 14 }}>Login to view usage</Text>
              </View>
            </View>
          )}
        </View>

        {/* Support */}
        <SettingsSectionHeader title="Support" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <SettingsRow
            icon={<HelpCircle size={18} color="#8B949E" />}
            label="Help Center"
            onPress={handleComingSoon}
          />
          <SettingsRow
            icon={<Shield size={18} color="#8B949E" />}
            label="Privacy Policy"
            onPress={handleComingSoon}
            showBorder={false}
          />
        </View>

        {/* Log Out — only when signed in */}
        {isLoggedIn && (
          <>
            <View style={{ height: 20 }} />
            <View style={{ marginHorizontal: 12 }}>
              <TouchableOpacity
                onPress={handleLogout}
                style={{ backgroundColor: 'rgba(239,68,68,0.10)', borderRadius: 10, paddingVertical: 14, alignItems: 'center', borderWidth: 1, borderColor: 'rgba(239,68,68,0.25)' }}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <LogOut size={16} color="#EF4444" />
                  <Text style={{ color: '#EF4444', fontSize: 15, fontWeight: '600' }}>Log Out</Text>
                </View>
              </TouchableOpacity>
            </View>
          </>
        )}

        {/* Version footer */}
        <Text style={{ color: '#484F58', fontSize: 12, textAlign: 'center', marginTop: 24 }}>
          Version {APP_VERSION}
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
