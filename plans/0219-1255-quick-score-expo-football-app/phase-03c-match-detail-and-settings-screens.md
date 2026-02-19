# Phase 03C — Match Detail & Settings Screens

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: Phase 02A AND Phase 02B (both must complete)
- Parallel with: Phase 03A, Phase 03B
- Wireframes: [wireframe-match-detail.html](../../docs/wireframes/wireframe-match-detail.html)

## Parallelization Info
- **Runs in parallel with 03A and 03B** after both 02A + 02B complete
- No file overlap: owns ONLY `app/match/[id].tsx` and `app/settings.tsx`

## Overview
- **Priority:** P1
- **Status:** completed
- **Description:** Match Detail dynamic route (full match info with tabs) and Settings screen (notification prefs)

## File Ownership (EXCLUSIVE to this phase)
```
app/match/[id].tsx               ← Match detail dynamic route
app/(tabs)/settings.tsx          ← Settings tab screen (5-tab layout)
```
<!-- Updated: Validation Session 1 - Settings moved to app/(tabs)/settings.tsx (5-tab layout) -->

## Implementation: Match Detail (app/match/[id].tsx)

### Layout
```
[Back button header]
[ScoreBoard hero: HomeTeam  2 - 1  AwayTeam | 67' LIVE]
[Tab strip: Events | Lineups | Stats | H2H]
[Tab Content]
  Events:  <EventTimeline events={match.events} homeTeamId={...} />
  Lineups: <LineupPitch homeLineup={...} awayLineup={...} />
  Stats:   list of <StatBar /> for each stat
  H2H:     simple list of last 5 meetings
```

### Key Logic
- `useLocalSearchParams()` to get `id`
- `useMatchDetail(id)` hook — refetchInterval: 5000 for live matches
- Tab state: local `useState<'events' | 'lineups' | 'stats' | 'h2h'>('events')`
- Show "Loading..." during `isPending`, error state if match not found
- Back button: `router.back()` or Expo Router header
- Favorite toggle button in header (heart icon → adds/removes team from favorites)
- Notification bell in header for this specific match

### H2H Tab (simple)
Show last 5 meetings from mock data (hardcode 5 match results per matchup):
```tsx
const H2H_DATA = {
  'manu-mancity': [/* 5 match results */],
  // etc.
}
// Lookup by sorted team IDs
```

### Code Sketch
```tsx
export default function MatchDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: match, isPending } = useMatchDetail(id);
  const [activeTab, setActiveTab] = useState<'events'|'lineups'|'stats'|'h2h'>('events');

  if (isPending) return <LoadingScreen />;
  if (!match) return <ErrorScreen message="Match not found" />;

  return (
    <View className="flex-1 bg-bg-primary">
      <ScoreBoard homeTeam={match.homeTeam} awayTeam={match.awayTeam}
                  score={match.score} status={match.status} minute={match.minute} />
      <TabStrip tabs={['Events','Lineups','Stats','H2H']} active={activeTab} onChange={setActiveTab} />
      {activeTab === 'events' && <EventTimeline events={match.events} homeTeamId={match.homeTeam.id} />}
      {activeTab === 'lineups' && match.homeLineup && <LineupPitch homeLineup={match.homeLineup} awayLineup={match.awayLineup!} />}
      {activeTab === 'stats' && match.stats && <StatsPanel stats={match.stats} />}
      {activeTab === 'h2h' && <H2HPanel homeTeam={match.homeTeam} awayTeam={match.awayTeam} />}
    </View>
  );
}
```

Note: `TabStrip`, `StatsPanel`, `H2HPanel`, `LoadingScreen`, `ErrorScreen` are small inline components (each < 50 lines) defined in the same file or split if needed. `StatsPanel` maps over stats keys and renders `<StatBar />` components.

## Implementation: Settings Screen (app/(tabs)/settings.tsx)
<!-- Updated: Validation Session 1 - Settings is a tab screen, not standalone route -->

### Layout
```
[Header: Settings]
[Section: Notifications]
  Notify on goals (Toggle)
  Notify on red cards (Toggle)
  Notify on match start (Toggle)
  Favorites only (Toggle)
[Section: App Info]
  Version: 1.0.0
  API: Mock data (tap to configure)
[Section: Data]
  Clear favorites (destructive)
```

### Key Logic
- `useSettingsStore()` for all toggles
- `Switch` component (React Native) for each toggle
- Version from `Constants.expoConfig?.version`
- "Clear favorites" → `Alert.alert` confirm → call `favoritesStore.clearAll()`
- Toggle changes persist via Zustand (settings store uses AsyncStorage too if needed — but `mmkv` not needed, just in-memory is fine for settings)

## Todo
- [x] Implement `app/match/[id].tsx`
  - [x] Parse `id` from route params
  - [x] ScoreBoard hero section
  - [x] Tab strip (Events/Lineups/Stats/H2H)
  - [x] EventTimeline tab content
  - [x] LineupPitch tab content
  - [x] StatsPanel tab content (list of StatBar)
  - [x] H2H tab (last 5 results from mock)
  - [x] Live match auto-refresh (5s interval)
  - [x] Header: back button + favorite toggle + notification bell
  - [x] Loading + error states
- [x] Implement `app/settings.tsx`
  - [x] Notification toggles (4 toggles)
  - [x] App version display
  - [x] Clear favorites with confirmation
- [x] Both screens: verify dark theme
- [x] Match detail: verify refetch updates score in ScoreBoard

## Success Criteria
- Match detail renders for all 3 mock detailed matches
- All 4 tabs display correct content
- ScoreBoard updates live (mock cycling simulation)
- Settings toggles persist in Zustand store
- TypeScript strict — no errors

## Conflict Prevention
- Does NOT modify `src/components/` (02B) or `src/hooks/` (02A)
- Inline small helper components stay within the file (< 50 lines each)
- If any inline component exceeds 50 lines, extract to new file in `src/components/` — but notify team
