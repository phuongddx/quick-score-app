# Phase 04 — Navigation, Providers & Integration

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: All Phase 03x (03A, 03B, 03C must all complete)
- Architecture: [docs/system-architecture.md](../../docs/system-architecture.md)

## Parallelization Info
- **Sequential** — must run after all Phase 03x complete
- Wires together all screens, providers, and navigation layout

## Overview
- **Priority:** P1
- **Status:** completed
- **Description:** Root layout with QueryClient provider + Zustand hydration, bottom tab navigator with icons/badges, and AsyncStorage persistence wiring

## File Ownership (EXCLUSIVE to this phase)
```
app/_layout.tsx              ← Root layout (providers, StatusBar, fonts)
app/(tabs)/_layout.tsx       ← Bottom tab navigator (icons, labels, badges)
```

## Implementation: Root Layout (app/_layout.tsx)

### Responsibilities
1. Wrap app in `QueryClientProvider`
2. Load fonts (Inter + Roboto Mono via `expo-font` or `useFonts`)
3. Configure StatusBar (dark, `#0D1117` background)
4. Handle splash screen (hide after fonts loaded)
5. Add `GestureHandlerRootView` wrapper

```tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,
      retry: 2,
      refetchOnWindowFocus: false, // React Native doesn't have "windows"
    }
  }
});

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Inter-Regular': require('../assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('../assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('../assets/fonts/Inter-SemiBold.ttf'),
    'Inter-Bold': require('../assets/fonts/Inter-Bold.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" backgroundColor="#0D1117" />
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="match/[id]" options={{ headerShown: false, presentation: 'card' }} />
          <Stack.Screen name="settings" options={{ title: 'Settings', headerStyle: { backgroundColor: '#161B22' }, headerTintColor: '#E6EDF3' }} />
        </Stack>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}
```

Note on fonts: If bundling Inter is too heavy, fall back to system fonts (`-apple-system` / `Roboto`) and remove font loading.

## Implementation: Bottom Tab Navigator (app/(tabs)/_layout.tsx)

### 5 Tabs (Confirmed via validation)
| Tab | Route | Icon (Lucide) | Badge |
|-----|-------|--------------|-------|
| Scores | `index` | `play-circle` | live count (green) |
| Fixtures | `fixtures` | `calendar` | - |
| Standings | `standings` | `trophy` | - |
| Favorites | `favorites` | `heart` | - |
| Settings | `settings` | `settings` | - |
<!-- Updated: Validation Session 1 - 5-tab layout confirmed, Settings at app/(tabs)/settings.tsx -->

```tsx
import { Tabs } from 'expo-router';
import { PlayCircle, Calendar, Trophy, Heart, Settings } from 'lucide-react-native';
import { useLiveMatchCount } from '@/hooks/use-live-matches';

export default function TabLayout() {
  const liveCount = useLiveMatchCount();
  return (
    <Tabs screenOptions={{
      tabBarStyle: { backgroundColor: '#161B22', borderTopColor: '#30363D', height: 56 },
      tabBarActiveTintColor: '#2196F3',
      tabBarInactiveTintColor: '#484F58',
      headerShown: false,
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Scores',
        tabBarIcon: ({ color }) => <PlayCircle size={24} color={color} />,
        tabBarBadge: liveCount > 0 ? liveCount : undefined,
        tabBarBadgeStyle: { backgroundColor: '#00C853' },
      }} />
      <Tabs.Screen name="fixtures" options={{ title: 'Fixtures', tabBarIcon: ({ color }) => <Calendar size={24} color={color} /> }} />
      <Tabs.Screen name="standings" options={{ title: 'Standings', tabBarIcon: ({ color }) => <Trophy size={24} color={color} /> }} />
      <Tabs.Screen name="favorites" options={{ title: 'Favorites', tabBarIcon: ({ color }) => <Heart size={24} color={color} /> }} />
      <Tabs.Screen name="settings" options={{ title: 'Settings', tabBarIcon: ({ color }) => <Settings size={24} color={color} /> }} />
    </Tabs>
  );
}
```
<!-- Updated: Validation Session 1 - 5 tabs, Settings tab added -->

## AsyncStorage Persistence Wiring
Zustand `favorites-store.ts` in Phase 02A uses `persist` middleware. Verify in this phase:
- Import `AsyncStorage` from `@react-native-async-storage/async-storage`
- Zustand persist storage adapter configured correctly
- Test: add favorite → close app → reopen → favorite still present

## Live Count Hook (add to src/hooks/ — but 02A owns hooks dir)
**Note:** `useLiveMatchCount()` is a simple derived hook. Add to `use-live-matches.ts` in Phase 02A implementation OR define inline here. Prefer adding to Phase 02A file.

## Todo
- [x] Implement `app/_layout.tsx`
  - [x] QueryClientProvider with query client config
  - [x] Font loading (useFonts) + SplashScreen management
  - [x] StatusBar dark configuration
  - [x] Stack navigator with screen options
  - [x] GestureHandlerRootView wrapper
- [x] Implement `app/(tabs)/_layout.tsx`
  - [x] 5-tab Tabs navigator (Scores, Fixtures, Standings, Favorites, Settings)
  - [x] Lucide icons for each tab
  - [x] Live count badge on Scores tab
  - [x] Dark tab bar styling (bg #161B22, border #30363D)
  - [x] Active/inactive color tokens
- [x] Verify AsyncStorage persistence for Zustand favorites store
- [x] End-to-end navigation test: Scores → Match Detail → Back
- [x] Verify all fonts load correctly
- [x] Test on iOS simulator + Android emulator

## Success Criteria
- App launches with dark splash screen → home tab
- All 4 tabs navigate correctly
- Live count badge shows on Scores tab
- Match Detail accessible from any match card
- Settings screen accessible from Favorites or header
- Favorites persist after navigation away and back
- No white flash on app launch (dark theme from start)

## Conflict Prevention
- Only touches `app/_layout.tsx` and `app/(tabs)/_layout.tsx`
- Does NOT modify any screen files
- If Settings needs to be in tabs: add `settings` to tab layout only here
