# Phase 03A — Tab Screens: Scores & Fixtures

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: Phase 02A AND Phase 02B (both must complete)
- Parallel with: Phase 03B, Phase 03C
- Wireframes: [wireframe-scores-home.html](../../docs/wireframes/wireframe-scores-home.html), [wireframe-fixtures.html](../../docs/wireframes/wireframe-fixtures.html)

## Parallelization Info
- **Runs in parallel with 03B and 03C** after both 02A + 02B complete
- No file overlap: owns ONLY `app/(tabs)/index.tsx` and `app/(tabs)/fixtures.tsx`

## Overview
- **Priority:** P1
- **Status:** completed
- **Description:** Scores (home) tab showing live match feed grouped by competition, and Fixtures tab showing upcoming schedule with date navigation

## File Ownership (EXCLUSIVE to this phase)
```
app/(tabs)/index.tsx         ← Live Scores (home tab)
app/(tabs)/fixtures.tsx      ← Fixtures/Schedule tab
```

## Implementation: Scores Screen (app/(tabs)/index.tsx)

### Layout
```
[StatusBar: dark]
[DateFilterStrip] ← horizontal scrollable date selector
[SectionList]
  ├── Section Header: <CompetitionHeader league="Premier League" liveCount=3 />
  │   ├── <MatchCard match={m1} />     ← live (green tint)
  │   ├── <MatchCard match={m2} />     ← live
  │   └── <MatchCard match={m3} />     ← scheduled
  ├── Section Header: <CompetitionHeader league="La Liga" liveCount=1 />
  │   ├── <MatchCard match={m4} />
  ...
```

### Key Logic
- Use `useMatchesByDate(selectedDate)` hook (from 02A)
- Group matches by `leagueId` → SectionList sections
- `selectedDate` from `useFiltersStore()` (Zustand)
- Date strip changes `selectedDate` → re-query
- `refetchInterval: 5000` keeps live scores updating
- `SectionList` with `stickySectionHeadersEnabled`
- Show `<LoadingSkeleton />` during `isPending`
- Show `<EmptyState />` when no matches for date
- Tab badge: live match count (green dot) via Expo Router tab options

### Code Sketch
```tsx
export default function ScoresScreen() {
  const { selectedDate, setDate } = useFiltersStore();
  const { data: matches, isPending } = useMatchesByDate(selectedDate);
  const sections = groupByLeague(matches ?? []);
  return (
    <View className="flex-1 bg-bg-primary">
      <DateFilterStrip selectedDate={selectedDate} onDateChange={setDate} />
      {isPending ? <LoadingSkeleton /> : (
        <SectionList
          sections={sections}
          renderItem={({ item }) => <MatchCard match={item} onPress={() => router.push(`/match/${item.id}`)} />}
          renderSectionHeader={({ section }) => <CompetitionHeader ... />}
          stickySectionHeadersEnabled
        />
      )}
    </View>
  );
}
```

## Implementation: Fixtures Screen (app/(tabs)/fixtures.tsx)

### Layout
```
[DateFilterStrip]
[Filter chips: PL | La Liga | Bundesliga | Serie A | Ligue 1] ← horizontal scroll
[FlatList]
  ├── Date group header: "Today, Feb 19"
  │   ├── <FixtureItem match={m1} />
  │   └── <FixtureItem match={m2} />
  ├── Date group header: "Tomorrow, Feb 20"
  ...
```

### Key Logic
- `useFixtures(leagueId?)` hook with date range
- Competition filter chips use `useFiltersStore()` toggle
- Group fixtures by date within the flat list (section headers)
- Notification bell per fixture toggles AsyncStorage key
- `FlatList` with `keyExtractor` on match id

## Todo
- [x] Implement `app/(tabs)/index.tsx` (Scores screen)
  - [x] DateFilterStrip integration with Zustand filters store
  - [x] SectionList with competition grouping
  - [x] MatchCard press → navigate to `/match/[id]`
  - [x] Live count tab badge
  - [x] Loading and empty states
- [x] Implement `app/(tabs)/fixtures.tsx` (Fixtures screen)
  - [x] Competition filter chips
  - [x] Date-grouped FlatList
  - [x] Notification toggle per match
  - [x] Loading and empty states
- [x] Both screens: verify dark theme applied
- [x] Both screens: verify navigation to match detail works (router.push)

## Success Criteria
- Scores screen shows grouped live + scheduled matches for selected date
- Date strip navigation correctly updates match list
- Live matches show green tint + live indicator
- Fixtures screen correctly filters by competition
- Both screens handle loading and empty states gracefully
- TypeScript strict — no errors

## Conflict Prevention
- Does NOT modify `app/_layout.tsx` or `app/(tabs)/_layout.tsx` (Phase 04 owns these)
- Does NOT modify any `src/` files
- Uses `router.push('/match/' + id)` — no `Link` component modifications needed
