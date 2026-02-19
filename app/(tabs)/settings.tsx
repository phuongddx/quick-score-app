import React from 'react';
import { View, Text, Switch, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import { useSettingsStore } from '@/stores/settings-store';
import { useFavoritesStore } from '@/stores/favorites-store';

interface ToggleRowProps {
  label: string;
  description?: string;
  value: boolean;
  onValueChange: (v: boolean) => void;
}

function ToggleRow({ label, description, value, onValueChange }: ToggleRowProps) {
  return (
    <View style={{
      flexDirection: 'row', alignItems: 'center',
      paddingHorizontal: 16, paddingVertical: 14,
      borderBottomWidth: 1, borderBottomColor: '#21262D',
    }}>
      <View style={{ flex: 1 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 15 }}>{label}</Text>
        {description ? (
          <Text style={{ color: '#8B949E', fontSize: 12, marginTop: 2 }}>{description}</Text>
        ) : null}
      </View>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#30363D', true: 'rgba(33,150,243,0.4)' }}
        thumbColor={value ? '#2196F3' : '#484F58'}
      />
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return (
    <View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 6 }}>
      <Text style={{ color: '#8B949E', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {title}
      </Text>
    </View>
  );
}

export default function SettingsScreen() {
  const {
    notifyGoals, notifyRedCards, notifyMatchStart, notifyFavoritesOnly,
    setNotifyGoals, setNotifyRedCards, setNotifyMatchStart, setNotifyFavoritesOnly,
  } = useSettingsStore();
  const { clearAll } = useFavoritesStore();

  const version = Constants.expoConfig?.version ?? '1.0.0';

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

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#0D1117' }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
        <Text style={{ color: '#E6EDF3', fontSize: 20, fontWeight: '700', paddingHorizontal: 16, paddingTop: 12, paddingBottom: 4 }}>
          Settings
        </Text>

        {/* Notifications */}
        <SectionHeader title="Notifications" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <ToggleRow label="Goals" description="Get notified when a goal is scored" value={notifyGoals} onValueChange={setNotifyGoals} />
          <ToggleRow label="Red Cards" description="Get notified for red card events" value={notifyRedCards} onValueChange={setNotifyRedCards} />
          <ToggleRow label="Match Start" description="Get notified when a match kicks off" value={notifyMatchStart} onValueChange={setNotifyMatchStart} />
          <ToggleRow label="Favorites Only" description="Only notify for saved teams" value={notifyFavoritesOnly} onValueChange={setNotifyFavoritesOnly} />
        </View>

        {/* App Info */}
        <SectionHeader title="App Info" />
        <View style={{ backgroundColor: '#161B22', borderRadius: 10, marginHorizontal: 12, overflow: 'hidden' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#21262D' }}>
            <Text style={{ color: '#E6EDF3', fontSize: 15 }}>Version</Text>
            <Text style={{ color: '#8B949E', fontSize: 14 }}>{version}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 14 }}>
            <Text style={{ color: '#E6EDF3', fontSize: 15 }}>Data Source</Text>
            <Text style={{ color: '#8B949E', fontSize: 14 }}>Mock data</Text>
          </View>
        </View>

        {/* Data */}
        <SectionHeader title="Data" />
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
