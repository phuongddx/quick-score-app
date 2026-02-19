# Phase 05 — Testing

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: Phase 04 (full app must be integrated)
- Code Standards: [docs/code-standards.md](../../docs/code-standards.md)

## Parallelization Info
- **Sequential** — runs after Phase 04 completes
- Tests verify the complete integrated app

## Overview
- **Priority:** P2
- **Status:** completed
- **Description:** Unit tests for data layer (stores, hooks, services) + component tests for key UI components

## File Ownership (EXCLUSIVE to this phase)
```
vitest.config.ts
src/stores/favorites-store.test.ts
src/stores/filters-store.test.ts
src/hooks/use-live-matches.test.ts
src/services/mock-data-service.test.ts
src/components/match-card.test.tsx
src/components/live-indicator.test.tsx
src/components/standings-table.test.tsx
```

## Test Configuration

**vitest.config.ts**:
```typescript
import { defineConfig } from 'vitest/config';
export default defineConfig({
  test: {
    environment: 'node', // React Native components tested with RNTL
    globals: true,
    setupFiles: ['./src/test-setup.ts'],
  },
});
```

## Test Coverage Targets

### 1. Zustand Stores (unit tests)

**favorites-store.test.ts**:
- `addTeam` adds team ID to array
- `removeTeam` removes correct ID
- `isFavoriteTeam` returns correct boolean
- `addLeague` / `removeLeague` work correctly
- Persists to AsyncStorage (mock AsyncStorage)

**filters-store.test.ts**:
- `setDate` updates `selectedDate`
- `toggleLeague` adds/removes from array
- `resetFilters` clears selections

### 2. Mock Data Service (unit tests)

**mock-data-service.test.ts**:
- `getLiveMatches()` returns only matches with `status: 'live'`
- `getMatchesByDate(date)` returns matches for correct date
- `getMatchById(id)` returns correct match or null
- `getStandings(leagueId)` returns 20 entries sorted by points
- `getFixtures(leagueId, days)` returns upcoming matches only

### 3. TanStack Query Hooks (unit tests with mock QueryClient)

**use-live-matches.test.ts**:
- Returns `isPending: true` initially
- Returns live matches array after data loads
- Data matches `mockDataService.getLiveMatches()` output

### 4. Component Tests (React Native Testing Library)

**match-card.test.tsx**:
- Renders home team name
- Renders away team name
- Renders score correctly
- Shows live indicator for live matches (green dot present)
- Does NOT show live indicator for ended matches
- `onPress` called when card tapped
- Card has minimum 44px touch target

**live-indicator.test.tsx**:
- Renders minute text
- Renders "HT" for halftime
- Renders pulsing animation element

**standings-table.test.tsx**:
- Renders all 20 teams
- First place shows CL zone border
- Bottom 3 show relegation border
- Highlighted team row has correct style

## Test Utilities

**src/test-setup.ts**:
```typescript
import '@testing-library/jest-native/extend-expect';
// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
// Mock Expo modules
jest.mock('expo-font', () => ({ useFonts: () => [true, null] }));
jest.mock('expo-router', () => ({ useLocalSearchParams: () => ({}), router: { push: jest.fn(), back: jest.fn() } }));
```

## Todo
- [x] Configure `vitest.config.ts`
- [x] Create `src/test-setup.ts` with all mocks
- [x] Write `favorites-store.test.ts` (6 test cases)
- [x] Write `filters-store.test.ts` (4 test cases)
- [x] Write `mock-data-service.test.ts` (6 test cases)
- [x] Write `use-live-matches.test.ts` (3 test cases)
- [x] Write `match-card.test.tsx` (7 test cases)
- [x] Write `live-indicator.test.tsx` (3 test cases)
- [x] Write `standings-table.test.tsx` (4 test cases)
- [x] Run `npx vitest run` — all tests must pass

## Success Criteria
- All tests pass (`npx vitest run` exits 0)
- No mock/fake implementations — tests use real store + service logic
- Coverage: stores 100%, services 80%+, key components 70%+
- Tests run in < 30 seconds

## Conflict Prevention
- Test files only — no production code modified
- Mocks defined in `test-setup.ts`, not inline (except component-specific mocks)
