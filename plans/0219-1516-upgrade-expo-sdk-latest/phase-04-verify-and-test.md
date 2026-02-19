# Phase 04: Verify & Test

## Context Links

- [Plan Overview](./plan.md)
- [Phase 03: Housekeeping](./phase-03-housekeeping.md)
- [Codebase Summary](../../docs/codebase-summary.md)

## Overview

- **Priority:** P1
- **Status:** complete
- **Effort:** 60min
- **Description:** Run full test suite, expo-doctor, app startup, and update documentation

## Key Insights

- 49 tests in Vitest (node env). No RNTL renders - pure logic/store/hook tests.
- Tests mock AsyncStorage and expo-constants. Mocks may need version-specific updates.
- expo-doctor is the definitive SDK compatibility checker. Must pass clean.
- `docs/codebase-summary.md` lists current versions - must be updated to reflect SDK 55.

## Requirements

### Functional
- All 49 tests pass
- App starts in Expo Go without crashes
- All 5 tabs render correctly

### Non-functional
- expo-doctor reports zero critical errors
- Documentation reflects new SDK version

## Architecture

No architecture changes. Verification only.

## Related Code Files

### Test Files
| File | Tests | Risk |
|------|-------|------|
| `src/stores/favorites-store.test.ts` | Store logic | Low - pure Zustand |
| `src/stores/filters-store.test.ts` | Store logic | Low - pure Zustand |
| `src/services/mock-data-service.test.ts` | Service logic | Low - no RN deps |
| `src/hooks/use-live-matches.test.ts` | Hook logic | Low - timer-based |
| `src/components/match-card.test.ts` | Component helpers | Low - pure functions |
| `src/components/live-indicator.test.ts` | Component helpers | Low - pure functions |
| `src/components/standings-table.test.ts` | Component helpers | Low - pure functions |

### Test Infrastructure
| File | Risk |
|------|------|
| `src/test-setup.ts` | Medium - AsyncStorage mock may need update |
| `vitest.config.ts` | Low - node env, no RN runtime |

### Documentation
| File | Action |
|------|--------|
| `docs/codebase-summary.md` | Update version numbers |

## Implementation Steps

### Step 1: Run Vitest Suite

```bash
npx vitest run
```

Expected: 49 tests pass. If failures:

| Failure Type | Fix |
|-------------|-----|
| AsyncStorage mock API changed | Update `src/test-setup.ts` mock |
| expo-constants mock shape changed | Update vi.mock in affected test |
| Zustand v5 store API change | Unlikely (Zustand 5 compatible across) |
| Timer/interval behavior | Check `vi.useFakeTimers` still works |

### Step 2: Run Expo Doctor (Final Pass)

```bash
npx expo-doctor
```

This is the FINAL check. Must report:
- Zero "error" level issues
- Warnings acceptable only if documented and non-blocking

If issues remain from previous phases, fix now before proceeding.

### Step 3: Clear Cache and Start App

```bash
npx expo start --clear
```

Verify in terminal output:
- "Metro waiting on exp://..." appears (bundler healthy)
- No red error screens
- Press `i` for iOS simulator or scan QR for Expo Go

### Step 4: Manual Smoke Test (5 tabs)

Test each tab loads without crash:

| Tab | What to Verify |
|-----|---------------|
| Scores | Live matches render, scores update every 5s |
| Fixtures | Fixture list loads, date strip scrolls |
| Standings | League tables render, league selector works |
| Favorites | Empty state or saved favorites display |
| Settings | Theme toggle, notification preferences |

Also test:
- Match detail: tap any match card -> `/match/[id]` route loads
- Navigation: back button works from match detail
- Animations: reanimated-powered transitions smooth (validates v4)

### Step 5: Update docs/codebase-summary.md

Update version references in `docs/codebase-summary.md`:

```diff
- Expo SDK 52
+ Expo SDK 55

- React Native 0.76.3
+ React Native 0.83.2

- React 18.3.1
+ React 19.x

- react-native-reanimated ~3.16.1
+ react-native-reanimated ~4.1.x

- expo-router ~4.0.9
+ expo-router ~5.x
```

Also add note about:
- React Compiler enabled (if phase 03 completed)
- react-native-worklets as new dependency
- New Architecture enabled by default

### Step 6: Run Linter

```bash
npm run lint
```

Verify no new lint errors from React.memo removal or import changes.

## Todo List

- [ ] Run `npx vitest run` - all 49 tests must pass
- [ ] Fix any test failures (update mocks if needed)
- [ ] Run `npx expo-doctor` - must be clean
- [ ] Run `npx expo start --clear` - bundler must start
- [ ] Smoke test all 5 tabs in Expo Go / simulator
- [ ] Test match detail navigation
- [ ] Verify reanimated animations work (validates v4)
- [ ] Update `docs/codebase-summary.md` with new versions
- [ ] Run `npm run lint` - no new errors
- [ ] Commit all changes with message: "chore: upgrade expo sdk 52 to 55"

## Success Criteria

- 49/49 tests pass
- expo-doctor clean (zero critical errors)
- App starts and all 5 tabs render
- Match detail route works
- Animations smooth (reanimated v4 working)
- docs/codebase-summary.md reflects SDK 55
- Linter passes
- Single clean commit on main branch

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| Test mock incompatibility | Medium | Update mock shapes in test-setup.ts |
| Expo Go incompatible w/ SDK 55 | Low | Update Expo Go app on device |
| Reanimated v4 animation regression | Low | Visual smoke test catches this |
| Metro cache causes stale errors | Low | --clear flag handles this |

## Security Considerations

- No new permissions or API surface
- Verify `npm audit` shows no new high/critical vulnerabilities

## Next Steps

- If all checks pass: upgrade is complete
- If test failures persist: debug and fix before committing
- If Expo Go crashes: check react-native-worklets installation
- Optional follow-up: run `npm audit fix` for any new advisories
