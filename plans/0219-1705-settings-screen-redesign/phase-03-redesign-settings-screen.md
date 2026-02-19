# Phase 3: Redesign Settings Screen

## Context Links
- Target spec: task description (Stitch design analysis)
- Phase 1 store: `src/stores/settings-store.ts` (updated)
- Phase 2 components: `src/components/settings/`
- Current screen: `app/(tabs)/settings.tsx`

## Overview
- **Priority:** High
- **Status:** Complete
- **Description:** Rewrite `settings.tsx` using Phase 1 store + Phase 2 components to match Stitch design with 5 sections.

## Key Insights
- Current file is 110 LOC -- target stays well under 200 LOC with extracted components
- Screen composes extracted components, minimal logic (just store hooks + alert handlers)
- `lucide-react-native` icons imported directly per the codebase pattern
- Theme toggle shows "Dark"/"Light" text based on current `theme` state value; tap calls `toggleTheme()`
- Support links show Alert "Coming soon" -- no navigation needed

## Requirements

### Functional
5 sections in order:
1. **Profile** -- `SettingsProfileCard` with mock data ("Quick Score User", "user@quickscore.app", initials "QS", badge "Pro")
2. **GENERAL** -- 3 rows:
   - Push Notifications: Bell icon + toggle (`pushNotifications`)
   - Live Match Updates: Activity icon + toggle (`liveMatchUpdates`)
   - Appearance: Sun/Moon icon (based on theme) + value text + onPress cycles theme
3. **API & USAGE** -- 1 row:
   - Data Source: Database icon + value "Mock"
4. **SUPPORT** -- 2 rows:
   - Help Center: HelpCircle icon + onPress -> Alert
   - Privacy Policy: Shield icon + onPress -> Alert
5. **Danger Zone** -- Clear Favorites red button (existing logic preserved)

### Non-Functional
- File under 150 LOC (target ~120)
- NativeWind className on RN components
- Keep existing `handleClearFavorites` alert logic
- `SafeAreaView` with `edges={['top']}` as current

## Architecture

```
settings.tsx
├── imports (react, RN, lucide icons, components, stores)
├── SettingsScreen()
│   ├── useSettingsStore() destructure
│   ├── useFavoritesStore() for clearAll
│   ├── handleClearFavorites() -- same alert logic
│   ├── handleComingSoon() -- Alert.alert("Coming Soon", ...)
│   └── JSX:
│       ├── SafeAreaView + ScrollView
│       ├── "Settings" title text
│       ├── SettingsProfileCard
│       ├── SectionHeader "GENERAL"
│       │   ├── SettingsRow (Bell + pushNotifications toggle)
│       │   ├── SettingsRow (Activity + liveMatchUpdates toggle)
│       │   └── SettingsRow (Sun/Moon + theme value + onPress)
│       ├── SectionHeader "API & USAGE"
│       │   └── SettingsRow (Database + "Mock" value)
│       ├── SectionHeader "SUPPORT"
│       │   ├── SettingsRow (HelpCircle + onPress)
│       │   └── SettingsRow (Shield + onPress)
│       └── Danger Zone: red clear button
└── export default
```

## Related Code Files
- **Modify:** `app/(tabs)/settings.tsx` (full rewrite)
- **Read:** `src/stores/settings-store.ts` (Phase 1 output)
- **Read:** `src/components/settings/*.tsx` (Phase 2 output)

## Implementation Steps

1. Clear existing `settings.tsx` content
2. Add imports:
   - React, View, Text, TouchableOpacity, Alert, ScrollView from react-native
   - SafeAreaView from react-native-safe-area-context
   - Icons: `Bell, Activity, Sun, Moon, Database, HelpCircle, Shield` from lucide-react-native
   - `SettingsRow` from `@/components/settings/settings-row`
   - `SettingsSectionHeader` from `@/components/settings/settings-section-header`
   - `SettingsProfileCard` from `@/components/settings/settings-profile-card`
   - `useSettingsStore` from `@/stores/settings-store`
   - `useFavoritesStore` from `@/stores/favorites-store`
3. Define `SettingsScreen` function component
4. Destructure store: `{ pushNotifications, liveMatchUpdates, theme, setPushNotifications, setLiveMatchUpdates, toggleTheme }`
5. Destructure favorites: `{ clearAll }`
6. Define `handleClearFavorites` (preserve existing Alert logic)
7. Define `handleComingSoon = () => Alert.alert('Coming Soon', 'This feature is coming soon.')`
8. Determine appearance icon: `theme === 'dark' ? Moon : Sun`
9. Compose JSX per Architecture section above
10. Wrap section rows in surface-colored `View` containers (`#161B22`, rounded, mx-3)
11. Danger zone: same red button styling as current
12. Export default

## Todo List
- [x] Rewrite settings.tsx imports
- [x] Wire up new store fields (pushNotifications, liveMatchUpdates, theme)
- [x] Compose profile card section
- [x] Compose GENERAL section (3 rows)
- [x] Compose API & USAGE section (1 row)
- [x] Compose SUPPORT section (2 rows)
- [x] Compose Danger Zone section
- [x] Verify file under 200 LOC
- [x] Run `npx tsc --noEmit` -- no errors
- [x] Run `npx vitest run` -- all 49 tests pass
- [x] Visual check on iOS simulator

## Success Criteria
- Settings screen matches Stitch spec layout (5 sections)
- All toggles wired to Zustand store
- Theme toggle shows current value and cycles on press
- Support links show "Coming soon" alert
- Clear favorites preserves existing behavior
- File under 150 LOC
- All 49 tests pass
- No TypeScript errors

## Risk Assessment
- **Low**: Full rewrite of single screen; no other screens depend on it
- **Low**: No existing tests for settings screen
- **Medium**: Visual fidelity to Stitch spec -- manual verification needed on simulator

## Security Considerations
- No real user data -- all mock values hardcoded
- No API calls, no auth tokens

## Next Steps
- Run full test suite to verify no regressions
- Visual QA on iOS/Android simulators
- Consider adding settings-store tests in future sprint
