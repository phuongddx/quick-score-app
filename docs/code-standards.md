# Code Standards - Quick Score v1.0

## File Naming Conventions
| Type | Pattern | Examples |
|------|---------|----------|
| Components | kebab-case | `match-card.tsx`, `lineup-pitch.tsx` |
| Hooks | kebab-case, `use-` prefix | `use-live-matches.ts`, `use-match-detail.ts` |
| Stores | kebab-case, `-store` suffix | `favorites-store.ts`, `filters-store.ts` |
| Services | kebab-case | `mock-data-service.ts`, `api-football-client.ts` |
| Types | kebab-case | `match.ts`, `league.ts`, `player.ts` |
| Tests | original name + `.test` | `match-card.test.tsx`, `favorites-store.test.ts` |

**Size Limit:** Max 200 LOC per file; split if exceeded
**Purpose:** Descriptive names enable LLM tool discovery (Grep, Glob, Search)

## TypeScript Standards
- **Strict Mode:** Enabled in `tsconfig.json`
- **No `any` types:** Always use proper interfaces
- **Type Files:** Centralized in `src/types/` directory
- **Exports:** Named exports preferred (easier refactoring)
- **Interfaces:** Props interfaces defined directly above components
- **Validation:** Zod ready for API response validation (future with real API)

### Type Definitions Example
```typescript
// src/types/match.ts
export interface Match {
  id: string;
  homeTeam: Team;
  awayTeam: Team;
  status: MatchStatus;
  score: Score;
  timestamp: number;
}

export type MatchStatus = 'scheduled' | 'live' | 'finished';
```

## Component Architecture
- **Functional components only** (no class components)
- **Props interface:** Defined above component, specific names
- **React.memo:** Applied to list items and frequently re-rendered components
- **Composition:** Prefer composition over inheritance
- **File Size:** Single responsibility; split if >100 lines

### Component Template
```typescript
interface MatchCardProps {
  match: Match;
  onPress: (matchId: string) => void;
}

export const MatchCard: React.FC<MatchCardProps> = React.memo(
  ({ match, onPress }) => {
    return (
      // JSX
    );
  }
);

MatchCard.displayName = 'MatchCard';
```

## Hooks & Custom Hooks
**Location:** `src/hooks/` directory
**Naming:** `use-` prefix for all hooks

| Hook Type | Pattern | Example |
|-----------|---------|---------|
| TanStack Query | `use-` + data type | `use-live-matches.ts` |
| Custom logic | `use-` + feature | `use-favorites.ts` |
| Zustand wrapper | `use-` + store name | `use-favorites.ts` wraps `favorites-store.ts` |

**Rule:** Never call API directly from components; use hooks

## State Management Layers
| Layer | Technology | Purpose | Scope |
|-------|-----------|---------|-------|
| **Server State** | TanStack Query v5 | Matches, scores, standings, fixtures | Global, cached |
| **UI State** | Zustand v5 | Favorites, filters, settings | Global, reactive |
| **Local State** | useState | Form inputs, modal toggles | Component, ephemeral |

**Never use useState for API data** — TanStack Query owns server state

### Zustand Store Pattern
```typescript
// src/stores/favorites-store.ts
interface FavoritesState {
  favoriteTeamIds: string[];
  favoriteCompetitions: string[];
  addTeam: (teamId: string) => void;
  removeTeam: (teamId: string) => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favoriteTeamIds: [],
      favoriteCompetitions: [],
      addTeam: (teamId) => set((state) => ({
        favoriteTeamIds: [...state.favoriteTeamIds, teamId],
      })),
      removeTeam: (teamId) => set((state) => ({
        favoriteTeamIds: state.favoriteTeamIds.filter(id => id !== teamId),
      })),
    }),
    { name: 'favorites-store', storage: AsyncStorage }
  )
);
```

## Styling Standards
- **Framework:** NativeWind v4 (Tailwind CSS for React Native)
- **Theme:** Dark mode first (sports app convention)
- **Colors:** Defined in `tailwind.config.js` as tokens
- **Spacing:** Tailwind scale (4, 8, 12, 16, 20, etc.)
- **Dark Theme Colors:**
  - Background: `#0D1117` (GitHub dark)
  - Surface: `#161B22`
  - Accent: `#2196F3` (blue)
  - Text: `#E6EDF3` (light gray)
  - Muted: `#8B949E` (medium gray)

### NativeWind Usage
```typescript
<View className="bg-slate-900 p-4 rounded-lg">
  <Text className="text-white font-semibold">Match Score</Text>
  <Text className="text-blue-400 text-lg">2 - 1</Text>
</View>
```

## Error Handling Strategy
| Scenario | Handler | Recovery |
|----------|---------|----------|
| API failures | TanStack Query error state | Show error UI, retry button |
| Component render error | ErrorBoundary | Fallback UI, log error |
| Offline access | Cache + AsyncStorage | Show cached data, offline indicator |
| Invalid data | Type guards | Validation, default values |

### Query Hook Error Pattern
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['matches'],
  queryFn: fetchMatches,
  staleTime: 5000,
  retry: 2,
  retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
});

if (error) return <ErrorState onRetry={() => queryClient.refetchQueries()} />;
```

## Testing Standards
- **Framework:** Vitest
- **Component Testing:** React Native Testing Library
- **Test Files:** `*.test.ts` or `*.test.tsx`
- **Setup:** `src/test-setup.ts`
- **Coverage Goal:** >80% for critical paths

### Test File Structure
```typescript
// src/components/match-card.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react-native';
import { MatchCard } from './match-card';

describe('MatchCard', () => {
  it('renders match score', () => {
    const mock = { /* match object */ };
    const { getByText } = render(<MatchCard match={mock} onPress={() => {}} />);
    expect(getByText('2')).toBeDefined();
  });
});
```

## API Integration Standards
**Primary:** `src/services/api-football-client.ts` (all API calls)
**Secondary:** `src/services/mock-data-service.ts` (development)

### Rules
1. Never call API directly from components
2. Always use hooks (`use-*` pattern) as abstraction
3. Implement rate limiting wrapper for real API (100 req/day limit)
4. Cache responses via TanStack Query (staleTime: 5000-300000ms)
5. Handle errors gracefully with fallback UI

### Real API Pattern (Future)
```typescript
// src/services/api-football-client.ts
const apiClient = axios.create({
  baseURL: 'https://v3.football.api-sports.io',
  headers: { 'x-apisports-key': process.env.EXPO_PUBLIC_API_KEY },
});

export const fetchLiveMatches = async () => {
  const { data } = await apiClient.get('/fixtures', {
    params: { live: 'all' },
  });
  return data.response.map(parseMatch);
};
```

## Git & Commit Standards
- **Commit Format:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`, `test:`)
- **Example:** `feat: add H2H tab to match detail` / `fix: standings zone colors`
- **No Secrets:** Exclude `.env`, API keys, credentials
- **Branch Strategy:** Feature branch per task, main for releases
- **PR Requirements:** Passing tests, code review, docs updated

## Performance Standards
| Metric | Target | Current |
|--------|--------|---------|
| App startup | <2s | ~1.5s ✓ |
| Screen transition | <500ms | <300ms ✓ |
| List render (100 items) | <1s | ~500ms ✓ |
| Memory usage | <100MB | ~80MB ✓ |
| Score update latency | <3s | ~5s (mock) ✓ |

## Configuration Files
| File | Purpose |
|------|---------|
| `tsconfig.json` | TypeScript strict mode, path aliases (@/) |
| `tailwind.config.js` | Dark theme colors, spacing scale |
| `babel.config.js` | Expo preset, NativeWind plugin |
| `vitest.config.ts` | React Native test config, setup file |
| `metro.config.js` | Expo Router config, asset bundling |
| `.eslintrc.js` | Linting rules, TypeScript parser |
| `.prettierrc` | Code formatting (semicolons, tabs, quotes) |

## Accessibility (a11y) Standards
- **Color Contrast:** AA level (4.5:1 for text)
- **Touch Targets:** Min 44x44pt for interactive elements
- **Labels:** All buttons/inputs have labels or aria-label equivalents
- **Font Sizes:** Min 14sp for body text, 18sp for touch targets
- **Dark Mode:** Full support with adequate contrast

## Security Standards
- **API Keys:** Never commit; use environment variables
- **AsyncStorage:** OS-level encryption (Keychain on iOS, EncryptedSharedPreferences on Android)
- **Network:** HTTPS only, certificate pinning ready
- **Secrets:** `.env` excluded from git; `.env.example` checked in as template
- **Dependencies:** Regular audit (`npm audit`), pinned versions

## Documentation Requirements
- **Inline Comments:** Explain "why", not "what" (code shows what)
- **Complex Logic:** Add TODO/FIXME markers
- **Exported Functions:** JSDoc comments with params, returns
- **Component Props:** TypeScript interfaces are self-documenting
- **API Integration:** Document rate limits, auth, error codes

### JSDoc Example
```typescript
/**
 * Fetch live matches and filter by competition
 * @param competitionId - The competition ID to filter by
 * @returns Promise<Match[]> - Array of live matches
 * @throws Error if API returns 500
 */
export const fetchLiveMatches = async (competitionId: string): Promise<Match[]> => {
  // ...
};
```

## Code Review Checklist
- [ ] TypeScript strict mode errors? None
- [ ] Tests pass? 100%
- [ ] Console errors/warnings? Clean
- [ ] Bundle size impact? <100KB
- [ ] Performance: list render <1s? Yes
- [ ] Props interfaces defined? Yes
- [ ] Error handling present? Yes
- [ ] Accessibility considered? Yes
- [ ] Documentation updated? Yes
- [ ] Secrets committed? No
