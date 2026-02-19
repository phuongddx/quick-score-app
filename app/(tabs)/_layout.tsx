import React from 'react';
import { Tabs } from 'expo-router';
import { PlayCircle, Calendar, Trophy, Heart, Settings } from 'lucide-react-native';
import { useLiveMatchCount } from '@/hooks/use-live-matches';

const TAB_BAR_STYLE = {
  backgroundColor: '#161B22',
  borderTopColor: '#30363D',
  borderTopWidth: 1,
  height: 56,
  paddingBottom: 6,
} as const;

const SCREEN_OPTIONS = {
  headerShown: false,
  tabBarStyle: TAB_BAR_STYLE,
  tabBarActiveTintColor: '#2196F3',
  tabBarInactiveTintColor: '#484F58',
  tabBarLabelStyle: { fontSize: 11 } as const,
} as const;

export default function TabLayout() {
  const liveCount = useLiveMatchCount();

  return (
    <Tabs screenOptions={SCREEN_OPTIONS}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Scores',
          tabBarIcon: ({ color }) => <PlayCircle size={24} color={color} />,
          tabBarBadge: liveCount > 0 ? liveCount : undefined,
          tabBarBadgeStyle: { backgroundColor: '#00C853', color: '#0D1117', fontSize: 10, fontWeight: '700' },
        }}
      />
      <Tabs.Screen
        name="fixtures"
        options={{
          title: 'Fixtures',
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="standings"
        options={{
          title: 'Standings',
          tabBarIcon: ({ color }) => <Trophy size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
