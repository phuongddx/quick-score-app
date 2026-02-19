# Phase 03B — Tab Screens: Standings & Favorites

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: Phase 02A AND Phase 02B (both must complete)
- Parallel with: Phase 03A, Phase 03C
- Wireframes: [wireframe-standings.html](../../docs/wireframes/wireframe-standings.html), [wireframe-favorites.html](../../docs/wireframes/wireframe-favorites.html)

## Parallelization Info
- **Runs in parallel with 03A and 03C** after both 02A + 02B complete
- No file overlap: owns ONLY `app/(tabs)/standings.tsx` and `app/(tabs)/favorites.tsx`

## Overview
- **Priority:** P1
- **Status:** completed
- **Description:** Standings tab with league tables (zone colors, form) and Favorites tab with saved teams/competitions and live banner

## File Ownership (EXCLUSIVE to this phase)
```
app/(tabs)/standings.tsx     ← League tables
app/(tabs)/favorites.tsx     ← Saved teams/competitions
```

## Implementation: Standings Screen (app/(tabs)/standings.tsx)

### Layout
```
[League Selector Tabs: PL | La Liga | Bundesliga | Serie A | Ligue 1]
[StandingsTable entries={entries} highlightTeamId={favoriteTeamId} />]
```

### Key Logic
- `useStandings(leagueId)` hook
- Top horizontal tab strip (ScrollView) for league selection
- Selected league stored in local `useState` (not global — screen-local concern)
- Pass `favoriteTeamIds[0]` as `highlightTeamId` to table (highlight user's team)
- Live matches inline: if a team is currently playing, show pulsing dot + minute on their row
- Zones from `docs/design-guidelines.md`:
  - Positions 1-4: CL zone (`#00C853` left border)
  - Position 5: EL zone (`#FF9800`)
  - Position 6: ECL zone (`#9C27B0`)
  - Bottom 3: Relegation (`#FF3D3D`)

### Code Sketch
```tsx
const LEAGUES = [
  { id: 'pl', name: 'Premier League' },
  { id: 'laliga', name: 'La Liga' },
  { id: 'bundesliga', name: 'Bundesliga' },
  { id: 'seriea', name: 'Serie A' },
  { id: 'ligue1', name: 'Ligue 1' },
];

export default function StandingsScreen() {
  const [activeLeague, setActiveLeague] = useState(LEAGUES[0].id);
  const { data: entries, isPending } = useStandings(activeLeague);
  const { favoriteTeamIds } = useFavoritesStore();
  return (
    <View className="flex-1 bg-bg-primary">
      <LeagueTabStrip leagues={LEAGUES} active={activeLeague} onChange={setActiveLeague} />
      {isPending ? <LoadingSkeleton /> : (
        <StandingsTable entries={entries ?? []} highlightTeamId={favoriteTeamIds[0]} />
      )}
    </View>
  );
}
```

Note: `LeagueTabStrip` is a simple inline component (< 50 lines) — no need for separate file.

## Implementation: Favorites Screen (app/(tabs)/favorites.tsx)

### Layout
```
[Segment: Teams | Competitions]
[Live Banner] ← appears if any saved team is currently playing
[Content based on segment]
  Teams: list of saved team cards
  Competitions: list of saved league cards
[Add button (dashed border row)]
```

### Key Logic
- `useFavoritesStore()` for saved team/league IDs
- `useLiveMatches()` filtered by `favoriteTeamIds` → live banner
- Segment control: local `useState('teams' | 'competitions')`
- Team card shows: crest + name + league position + next match + 5-match form
- Competition card shows: league name + flag + current leader (top team + points)
- Add team: simple `TextInput` search over `mockDataService.getAllTeams()` (show list, tap to add)
- Empty state: "Add your favorite teams to track them here"

### Remove from favorites
- Long press on team/comp card → confirm remove (Alert.alert)

## Todo
- [x] Implement `app/(tabs)/standings.tsx`
  - [x] League selector horizontal tab strip
  - [x] StandingsTable with favorite team highlight
  - [x] Zone color borders on correct positions
  - [x] Loading state
- [x] Implement `app/(tabs)/favorites.tsx`
  - [x] Segment control (Teams / Competitions)
  - [x] Live banner when favorite team playing
  - [x] Team cards with position + next match + form
  - [x] Competition cards with leader row
  - [x] Add team/competition search UI
  - [x] Remove via long press
  - [x] Empty state
- [x] Both screens: verify dark theme
- [x] Verify Zustand favorites store persists after app restart

## Success Criteria
- Standings shows correct zone borders for all 5 leagues
- Favorite team row highlighted in standings
- Favorites screen shows live banner when saved team is playing
- Adding/removing favorites persists across navigation
- TypeScript strict — no errors

## Conflict Prevention
- Does NOT modify `src/components/` (02B) or `src/stores/` (02A)
- Only consumes hooks/stores — no direct store mutations except via store actions
- Does NOT modify `app/_layout.tsx` or `app/(tabs)/_layout.tsx`
