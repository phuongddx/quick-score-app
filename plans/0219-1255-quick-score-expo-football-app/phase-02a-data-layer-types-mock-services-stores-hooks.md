# Phase 02A — Data Layer (Types, Mock Data, Services, Stores, Hooks)

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: Phase 01
- Parallel with: Phase 02B (no file overlap)
- Architecture: [docs/system-architecture.md](../../docs/system-architecture.md)
- Research: [plans/reports/researcher-0219-1253-live-football-app-tech-stack.md](../../plans/reports/researcher-0219-1253-live-football-app-tech-stack.md)

## Parallelization Info
- **Runs in parallel with Phase 02B** (components)
- No file overlap with 02B (02A owns `src/types/`, `src/data/`, `src/services/`, `src/stores/`, `src/hooks/`; 02B owns `src/components/`)
- Both 02A and 02B must complete before any Phase 03x starts

## Overview
- **Priority:** P1
- **Status:** completed
- **Description:** All data logic — TypeScript types, realistic mock data for 5 leagues, service layer, Zustand UI stores, TanStack Query hooks

## File Ownership (EXCLUSIVE to this phase)
```
src/types/match.ts
src/types/league.ts
src/types/player.ts
src/types/index.ts
src/data/mock-leagues.ts
src/data/mock-matches.ts
src/data/mock-standings.ts
src/data/mock-fixtures.ts
src/data/mock-match-detail.ts
src/data/index.ts
src/services/mock-data-service.ts
src/services/api-football-client.ts
src/stores/favorites-store.ts
src/stores/filters-store.ts
src/stores/settings-store.ts
src/hooks/use-live-matches.ts
src/hooks/use-match-detail.ts
src/hooks/use-standings.ts
src/hooks/use-fixtures.ts
src/hooks/use-favorites.ts
```

## Implementation Steps

### 1. TypeScript Types (src/types/)

**match.ts** — Core match interfaces:
```typescript
export type MatchStatus = 'scheduled' | 'live' | 'halftime' | 'ended' | 'postponed';
export type EventType = 'goal' | 'yellow_card' | 'red_card' | 'substitution' | 'penalty' | 'var';

export interface Team { id: string; name: string; shortName: string; crest: string; }
export interface MatchEvent { id: string; type: EventType; minute: number; playerId: string; playerName: string; teamId: string; detail?: string; }
export interface MatchScore { home: number; away: number; }
export interface Player { id: string; name: string; number: number; position: string; }
export interface Lineup { formation: string; startingXI: Player[]; bench: Player[]; }
export interface MatchStats { possession: [number, number]; shots: [number, number]; shotsOnTarget: [number, number]; corners: [number, number]; fouls: [number, number]; yellowCards: [number, number]; redCards: [number, number]; }
export interface Match {
  id: string; leagueId: string; leagueName: string; round: string;
  homeTeam: Team; awayTeam: Team; score: MatchScore;
  status: MatchStatus; minute?: number; startTime: string;
  events: MatchEvent[]; homeLineup?: Lineup; awayLineup?: Lineup; stats?: MatchStats;
}
```

**league.ts** — League and standings:
```typescript
export interface League { id: string; name: string; country: string; flag: string; season: number; }
export interface StandingsEntry {
  position: number; team: Team; played: number; won: number; drawn: number;
  lost: number; goalsFor: number; goalsAgainst: number; goalDiff: number;
  points: number; form: ('W'|'D'|'L')[]; zone: 'cl'|'el'|'ecl'|'relegation'|null;
}
```

### 2. Mock Data (src/data/)

Create realistic mock data for **5 leagues** (Premier League, La Liga, Bundesliga, Serie A, Ligue 1):
- `mock-leagues.ts`: 5 league objects
- `mock-matches.ts`: ~30 matches (mix of live, scheduled, ended) across all leagues
  - Include today's date matches + upcoming 7 days
  - 5-8 matches marked as `live` with minute set
  - Events (goals, cards) on live matches
- `mock-standings.ts`: Full 20-team table for each league (100 rows total)
  - Zone annotations (CL=top 4, EL=5th, ECL=6th, REL=bottom 3 for PL)
- `mock-fixtures.ts`: Next 14 days of upcoming matches
- `mock-match-detail.ts`: 3 detailed matches with full lineups + stats + events

### 3. Service Layer (src/services/)

**mock-data-service.ts**: Functions with live simulation engine:
```typescript
// Live simulation: maintains mutable match state, cycles scores every ~5s
// Each call to getLiveMatches() may return updated minutes/scores for live matches

let liveState: Map<string, { minute: number; score: MatchScore }> = new Map();
let lastSimTick = Date.now();

function tickLiveSimulation(): void {
  const now = Date.now();
  if (now - lastSimTick < 5000) return; // only tick every 5s
  lastSimTick = now;
  // Advance minutes, occasionally add goals for live matches
  for (const [id, state] of liveState) {
    state.minute = Math.min(state.minute + 1, 90);
    // ~10% chance of goal per tick (for demo effect)
    if (Math.random() < 0.1) state.score.home += 1;
  }
}

export const mockDataService = {
  getLiveMatches(): Match[]      // calls tickLiveSimulation() first
  getMatchesByDate(date: string): Match[]
  getMatchById(id: string): Match | null
  getStandings(leagueId: string): StandingsEntry[]
  getFixtures(leagueId?: string, days?: number): Match[]
  getLiveCount(): number
}
```
<!-- Updated: Validation Session 1 - Added live simulation engine (mutable state cycling) -->

**api-football-client.ts**: Stub ready for real API integration:
```typescript
// TODO: Replace with real API-Football calls
// Rate limit: 100 req/day free tier
export const apiFootballClient = {
  baseUrl: 'https://v3.football.api-sports.io',
  apiKey: process.env.EXPO_PUBLIC_API_FOOTBALL_KEY ?? '',
  // Methods mirror mock-data-service interface
}
```

### 4. Zustand Stores (src/stores/)

**favorites-store.ts**: AsyncStorage-persisted favorites:
```typescript
interface FavoritesStore {
  favoriteTeamIds: string[];
  favoriteLeagueIds: string[];
  addTeam(id: string): void;
  removeTeam(id: string): void;
  addLeague(id: string): void;
  removeLeague(id: string): void;
  isFavoriteTeam(id: string): boolean;
}
// Use zustand/middleware persist with AsyncStorage
```

**filters-store.ts**: Active date and competition filters:
```typescript
interface FiltersStore {
  selectedDate: string; // ISO date string
  selectedLeagueIds: string[]; // empty = all leagues
  setDate(date: string): void;
  toggleLeague(id: string): void;
  resetFilters(): void;
}
```

**settings-store.ts**: Notification and display settings:
```typescript
interface SettingsStore {
  notifyGoals: boolean;
  notifyRedCards: boolean;
  notifyMatchStart: boolean;
  notifyFavoritesOnly: boolean;
  setNotifyGoals(v: boolean): void;
  setNotifyRedCards(v: boolean): void;
  setNotifyMatchStart(v: boolean): void;
  setNotifyFavoritesOnly(v: boolean): void;
}
```

### 5. TanStack Query Hooks (src/hooks/)

**use-live-matches.ts**:
```typescript
export function useLiveMatches() {
  return useQuery({
    queryKey: ['matches', 'live'],
    queryFn: () => mockDataService.getLiveMatches(),
    refetchInterval: 5000, // simulate real-time
    staleTime: 2000,
  });
}
```

**use-matches-by-date.ts** (rename of use-fixtures + scores combined):
- `useMatchesByDate(date: string)` — for scores tab
- `useFixtures(leagueId?: string)` — for fixtures tab
- `useMatchDetail(id: string)` — for match detail screen
- `useStandings(leagueId: string)` — for standings tab
- `useFavoriteMatches()` — filter matches by favorite teams

## Todo
- [x] Create `src/types/match.ts` with all match interfaces
- [x] Create `src/types/league.ts` with League + StandingsEntry
- [x] Create `src/types/player.ts` with Player interface
- [x] Create `src/types/index.ts` barrel export
- [x] Create `src/data/mock-leagues.ts` (5 leagues)
- [x] Create `src/data/mock-matches.ts` (~30 matches, mix live/ended/scheduled)
- [x] Create `src/data/mock-standings.ts` (full tables for all 5 leagues)
- [x] Create `src/data/mock-fixtures.ts` (14 days upcoming)
- [x] Create `src/data/mock-match-detail.ts` (3 detailed matches)
- [x] Create `src/data/index.ts` barrel export
- [x] Create `src/services/mock-data-service.ts`
- [x] Create `src/services/api-football-client.ts` (stub)
- [x] Create `src/stores/favorites-store.ts` (with AsyncStorage persist)
- [x] Create `src/stores/filters-store.ts`
- [x] Create `src/stores/settings-store.ts`
- [x] Create `src/hooks/use-live-matches.ts`
- [x] Create `src/hooks/use-match-detail.ts`
- [x] Create `src/hooks/use-standings.ts`
- [x] Create `src/hooks/use-fixtures.ts`
- [x] Create `src/hooks/use-favorites.ts`
- [x] Verify TypeScript strict compiles with no errors

## Success Criteria
- All types exported cleanly from `src/types/index.ts`
- Mock data covers all 5 leagues with realistic team/player names
- At least 5 "live" matches in mock data with events
- Zustand stores compile with AsyncStorage persistence
- TanStack Query hooks return correct mock data shapes
- No TypeScript errors in strict mode

## Conflict Prevention
- Does NOT touch `src/components/` (owned by 02B)
- Does NOT touch `app/` directory (owned by 03x/04)
- Exports clean interfaces that 02B components will consume

## Risk Assessment
- Zustand persist middleware with AsyncStorage requires `@react-native-async-storage/async-storage` configured (done in Phase 01)
- Mock data volume: 5 leagues × 20 teams = 100 standings rows — keep in one file, split if >200 lines
- TanStack Query v5 API differs from v4 (no `isLoading` deprecated in v5, use `isPending`)
