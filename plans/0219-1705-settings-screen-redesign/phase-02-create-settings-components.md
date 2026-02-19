# Phase 2: Create Settings Components

## Context Links
- Design spec colors: `docs/design-guidelines.md` (Section 1: Color Palette)
- Component standards: `docs/code-standards.md` (Component Architecture)
- Icons: `lucide-react-native` (Bell, Activity, Sun, Moon, Database, HelpCircle, Shield, ChevronRight)

## Overview
- **Priority:** High (blocks Phase 3)
- **Status:** Complete
- **Description:** Extract reusable settings UI components into `src/components/settings/` to keep main screen under 200 LOC.

## Key Insights
- Current `settings.tsx` has inline `ToggleRow` and `SectionHeader` -- extract + enhance
- Need 3 row variants: toggle row, value row (static text), navigation row (chevron + onPress)
- Single `SettingsRow` component with conditional rendering is simpler than 3 separate components (KISS)
- Section header is trivial (~10 LOC) but worth extracting for reuse

## Requirements

### Functional
- `SettingsRow`: renders icon + label + right side (toggle | value text | chevron)
- `SettingsSectionHeader`: all-caps section title with muted color
- `SettingsProfileCard`: avatar circle w/ initials, name, email, Pro badge

### Non-Functional
- Each file under 80 LOC
- NativeWind `className` on RN components
- Inline styles only where className insufficient (conditional colors)
- kebab-case file names
- TypeScript strict, named exports

## Architecture

```
src/components/settings/
├── settings-row.tsx              # Generic row: icon + label + toggle|value|chevron
├── settings-section-header.tsx   # All-caps muted header
└── settings-profile-card.tsx     # Avatar + name + email + badge
```

### SettingsRow Props
```typescript
interface SettingsRowProps {
  icon: React.ReactNode;          // lucide icon element
  label: string;
  // Right side -- exactly one of:
  toggle?: { value: boolean; onValueChange: (v: boolean) => void };
  value?: string;                 // static text like "Dark" or "Mock"
  onPress?: () => void;           // shows ChevronRight, makes row pressable
  showBorder?: boolean;           // bottom border (default true)
}
```

### SettingsProfileCard Props
```typescript
interface SettingsProfileCardProps {
  name: string;
  email: string;
  initials: string;
  badgeLabel?: string;            // e.g. "Pro"
}
```

## Related Code Files
- **Create:** `src/components/settings/settings-row.tsx`
- **Create:** `src/components/settings/settings-section-header.tsx`
- **Create:** `src/components/settings/settings-profile-card.tsx`

## Implementation Steps

### settings-section-header.tsx (~15 LOC)
1. Accept `title: string` prop
2. Render `<View>` with horizontal padding + top/bottom spacing
3. `<Text>` with muted color `#8B949E`, 12px, bold, uppercase, letter-spacing

### settings-row.tsx (~60 LOC)
1. Accept `SettingsRowProps`
2. Outer: `TouchableOpacity` if `onPress`, else `View`
3. Left: icon + label text
4. Right side conditional:
   - If `toggle`: render `<Switch>` with blue accent track/thumb colors
   - If `value`: render muted text
   - If `onPress`: render `<ChevronRight>` icon in muted color
5. Bottom border via `showBorder` prop (default true)
6. Colors: bg transparent, text `#E6EDF3`, muted `#8B949E`, border `#21262D`
7. Switch colors: track false `#30363D`, track true `rgba(33,150,243,0.4)`, thumb `#2196F3`/`#484F58`

### settings-profile-card.tsx (~50 LOC)
1. Accept `SettingsProfileCardProps`
2. Surface card (`#161B22`, rounded-xl, mx-3, p-4)
3. Row: circular avatar (48x48, `#2196F3` bg) with white initials text
4. Right of avatar: name (white, 16px, semibold) + email (muted, 13px)
5. Badge: small rounded pill with `#2196F3` bg, white text "Pro"

## Todo List
- [x] Create `src/components/settings/` directory
- [x] Implement `settings-section-header.tsx`
- [x] Implement `settings-row.tsx` with toggle/value/onPress variants
- [x] Implement `settings-profile-card.tsx`
- [x] Verify tsc --noEmit passes

## Success Criteria
- 3 new files in `src/components/settings/`
- Each file under 80 LOC
- TypeScript compiles without errors
- Components use NativeWind className where possible

## Risk Assessment
- **Low**: New files, no existing code modified
- **Low**: Simple presentational components, no business logic

## Next Steps
- Phase 3: Compose these components in the redesigned settings screen
