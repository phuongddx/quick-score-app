# Code Review: Settings Screen Redesign

**Date:** 2026-02-19
**Commit:** `dd4cef9` parent (settings-store changes in last commit alongside date-strip redesign)

---

## Scope

| File | LOC | Status |
|---|---|---|
| `src/stores/settings-store.ts` | 19 | Updated |
| `src/components/settings/settings-section-header.tsx` | 16 | New |
| `src/components/settings/settings-row.tsx` | 49 | New |
| `src/components/settings/settings-profile-card.tsx` | 30 | New |
| `app/(tabs)/settings.tsx` | 73 | Redesigned |

All files are well under the 200 LOC limit. No tests exist for settings-store (noted below).

---

## Overall Assessment

Clean, focused redesign. Component decomposition is correct (section-header, row, profile-card are each a single responsibility). Logic is simple and bug-free. The primary concerns are: (1) wholesale inline-style usage instead of NativeWind className per code standards, (2) settings store not persisted, and (3) theme toggle stored but never applied to the actual UI.

---

## Critical Issues

None — no security vulnerabilities, no data loss risks, no breaking changes to other screens.

---

## High Priority

### H1 — NativeWind className not used anywhere

`code-standards.md` explicitly mandates NativeWind v4 for all styling, with inline styles reserved for dynamic values only. Every component in this redesign uses exclusively inline `style={{}}` objects, including static values. This contradicts the project standard and makes colors/spacing impossible to theme via Tailwind tokens.

Affected: all 5 files.

Example fix for `settings-section-header.tsx`:
```tsx
// before
<View style={{ paddingHorizontal: 16, paddingTop: 20, paddingBottom: 6 }}>
  <Text style={{ color: '#8B949E', fontSize: 12, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }}>

// after
<View className="px-4 pt-5 pb-1.5">
  <Text className="text-[#8B949E] text-xs font-bold uppercase tracking-wide">
```

Dynamic values (e.g., `borderBottomWidth: showBorder ? 1 : 0`) are legitimate inline style use-cases.

### H2 — Settings store not persisted

`favorites-store.ts` uses `zustand/middleware` `persist` + AsyncStorage to survive app restarts. The settings store does not. User toggle of Push Notifications or theme resets on every cold start.

Fix: wrap with `persist` middleware the same way `favorites-store.ts` does:
```ts
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({ ... }),
    { name: 'quick-score-settings', storage: createJSONStorage(() => AsyncStorage) },
  ),
);
```

### H3 — `theme` state is stored but never applied

`toggleTheme` updates the store, and the Appearance row shows "Dark"/"Light" text — but the actual UI background colors, text colors, etc. are all hardcoded `#0D1117`/`#E6EDF3` throughout all screens. The theme toggle is essentially a no-op visually. This is a correctness issue for any user expecting the toggle to change the app appearance.

Two acceptable resolutions:
- Remove `theme` from the store entirely (YAGNI) and hard-code "Dark" as the display value until theme switching is implemented.
- Or document as `// theme toggle is UI-only placeholder; full theming TBD` so it's clear.

---

## Medium Priority

### M1 — Appearance row: mixing `value` + `onPress` — ChevronRight suppressed silently

`SettingsRow` conditional rendering for the right-side affordance:
```tsx
{toggle && <Switch ... />}
{value && <Text ...>{value}</Text>}
{onPress && !value && !toggle && <ChevronRight ... />}
```

The Appearance row passes both `value` and `onPress`. This is valid per the JSDoc comment ("makes row pressable; shows ChevronRight if no value"), but the arrow is not shown even though the row is tappable. Users get no visual cue that tapping the row does something. This is a minor UX gap — consider showing a small chevron alongside the value text when `onPress` is also set:
```tsx
{onPress && !toggle && <ChevronRight size={16} color="#8B949E" />}
```
Then value text + chevron coexist.

### M2 — Touch target height below 44pt minimum

`code-standards.md` accessibility section: "Minimum touch target: 44x44px". `SettingsRow` uses `paddingVertical: 14`, giving ~42–43px total row height (14+14 + ~15 for a 15px text line). Marginally below the iOS HIG 44pt minimum.

Fix: change `paddingVertical: 14` to `paddingVertical: 15` or add `minHeight: 44`.

### M3 — Hardcoded "Quick Score User" / "user@quickscore.app" in profile card

```tsx
<SettingsProfileCard name="Quick Score User" email="user@quickscore.app" initials="QS" badgeLabel="Pro" />
```

Hardcoded placeholder data in production code with no comment explaining it. When a real auth layer is added, this will require a grep hunt. Add a `// TODO: replace with real auth user data` comment at minimum.

### M4 — No settings-store test file

`favorites-store.test.ts` and `filters-store.test.ts` exist. `settings-store.ts` has no test. The `toggleTheme` logic is straightforward but the absence is inconsistent with the test-coverage pattern the project already establishes.

---

## Low Priority

### L1 — `borderBottomColor` uses `#21262D` (bg-elevated) not `#30363D` (border token)

Per `design-guidelines.md` Section 1, `#30363D` is the designated border/divider color and `#21262D` is the elevated modal background. `SettingsRow` uses `#21262D` for dividers:
```tsx
borderBottomColor: '#21262D',
```
Should be `#30363D` to match the design token for dividers.

### L2 — Section header `letterSpacing: 0.5` — non-standard unit

RN letterSpacing is in points (not em). `0.5` is very tight. The design guidelines do not specify a value. This is fine in practice but worth noting if the design ever specifies tracking values explicitly.

### L3 — React import not needed in React 19

All four component files import `import React from 'react'` at the top. With React 19 (confirmed in project memory) and the JSX transform configured via `jsxImportSource: 'nativewind'` in babel, the explicit React import is unnecessary. Not a bug but noise.

---

## Positive Observations

- Component decomposition is correct and follows DRY — one `SettingsRow` handles toggle/value/chevron variants cleanly with a single prop-driven conditional instead of three separate components.
- `SettingsRow`'s `Container` polymorphic pattern (`const Container = onPress ? TouchableOpacity : View`) is clean and avoids duplicating JSX.
- Colors are consistent with the design palette (`#0D1117`, `#161B22`, `#8B949E`, `#E6EDF3`, `#2196F3`, `#FF3D3D`).
- `showBorder={false}` on last rows correctly removes the bottom divider, matching iOS grouped table UX.
- `Danger Zone` uses an isolated TouchableOpacity (not SettingsRow) which is appropriate — avoids misuse of the row component for a destructive action.
- `clearAll` confirmation dialog uses `style: 'destructive'` and `style: 'cancel'` correctly.
- File sizes all well under 200 LOC limit.
- `settings.tsx` at 73 LOC is well-structured and readable.

---

## Recommended Actions

1. **[High]** Migrate static style values to NativeWind `className` props across all 5 files, keeping only dynamic inline styles.
2. **[High]** Add `persist` middleware to `settings-store.ts` so toggle state survives restarts.
3. **[High]** Either remove `theme` from store (YAGNI) or add a clear TODO comment that theme switching is not yet wired to the UI.
4. **[Medium]** Fix Appearance row to show ChevronRight alongside value text when `onPress` is set.
5. **[Medium]** Add `minHeight: 44` to `SettingsRow` container for a11y compliance.
6. **[Medium]** Add `// TODO: replace with real user auth data` comment on the SettingsProfileCard call.
7. **[Medium]** Add `settings-store.test.ts` to match the pattern of other store tests.
8. **[Low]** Change `borderBottomColor` from `#21262D` to `#30363D` per design token.
9. **[Low]** Remove unnecessary `import React from 'react'` in all new component files.

---

## Metrics

| Metric | Value |
|---|---|
| Files reviewed | 5 |
| Total LOC | 187 |
| Largest file | settings.tsx (73 LOC) |
| Inline style violations | ~50+ static style props across 4 files |
| Missing tests | settings-store.test.ts |
| Linting issues | None visible (no `any`, no syntax errors) |
| TypeScript correctness | Clean — interfaces well-typed, no implicit any |

---

## Unresolved Questions

1. Is the `theme` toggle intended to drive a real theming system in a future phase? If yes, the store is correctly forward-looking. If not, it should be removed (YAGNI).
2. Is the profile card meant to be wired to a future auth system, or is it permanent placeholder UI? Affects how the `badgeLabel="Pro"` should be handled.
3. Should `pushNotifications` and `liveMatchUpdates` eventually call a native push notification permission API, or do they only control in-app behavior?
