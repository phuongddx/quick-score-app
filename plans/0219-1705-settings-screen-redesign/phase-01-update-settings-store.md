# Phase 1: Update Settings Store

## Context Links
- Current store: `src/stores/settings-store.ts`
- Store pattern ref: `docs/code-standards.md` (Zustand Store Pattern section)
- Design colors: `docs/design-guidelines.md`

## Overview
- **Priority:** High (blocks Phase 2-3)
- **Status:** Complete
- **Description:** Expand `settings-store.ts` with new state fields for the redesigned screen while keeping old notification fields for backward compat.

## Key Insights
- `useSettingsStore` only consumed by `app/(tabs)/settings.tsx` -- safe to refactor
- No tests for settings store -- can freely change interface
- Old `notify*` fields can be replaced since no other consumers

## Requirements

### Functional
- Add `pushNotifications: boolean` (default `true`) -- replaces general notification concept
- Add `liveMatchUpdates: boolean` (default `true`) -- new toggle
- Add `theme: 'dark' | 'light'` (default `'dark'`) -- appearance setting
- Remove old fields: `notifyGoals`, `notifyRedCards`, `notifyMatchStart`, `notifyFavoritesOnly` + their setters
- Add setters: `setPushNotifications`, `setLiveMatchUpdates`, `toggleTheme`

### Non-Functional
- Keep file under 30 LOC
- Named export only (`useSettingsStore`)
- TypeScript strict mode compliant

## Architecture

```
SettingsState {
  pushNotifications: boolean     // Bell toggle
  liveMatchUpdates: boolean      // Activity toggle
  theme: 'dark' | 'light'       // Appearance cycling
  setPushNotifications(v) => void
  setLiveMatchUpdates(v) => void
  toggleTheme() => void
}
```

Store remains in-memory (no persist) -- same as current.

## Related Code Files
- **Modify:** `src/stores/settings-store.ts`

## Implementation Steps

1. Open `src/stores/settings-store.ts`
2. Replace `SettingsState` interface with new fields:
   - `pushNotifications: boolean`
   - `liveMatchUpdates: boolean`
   - `theme: 'dark' | 'light'`
3. Replace setters:
   - `setPushNotifications: (v: boolean) => void`
   - `setLiveMatchUpdates: (v: boolean) => void`
   - `toggleTheme: () => void`
4. Update `create` call with new defaults and implementations
5. `toggleTheme` should flip `'dark'` <-> `'light'`
6. Verify TypeScript compiles: `npx tsc --noEmit`

## Todo List
- [x] Replace SettingsState interface
- [x] Update store create() with new defaults
- [x] Implement toggleTheme (flip dark/light)
- [x] Remove old notify* fields and setters
- [x] Verify tsc --noEmit passes

## Success Criteria
- Store exports `useSettingsStore` with 3 state fields + 3 actions
- `npx tsc --noEmit` passes
- All 49 existing tests still pass (`npx vitest run`)

## Risk Assessment
- **Low**: Only `settings.tsx` imports this store, will be updated in Phase 3
- Temporarily breaks `settings.tsx` until Phase 3 completes -- acceptable since phases run sequentially

## Next Steps
- Phase 2: Create settings UI components that consume these store fields
