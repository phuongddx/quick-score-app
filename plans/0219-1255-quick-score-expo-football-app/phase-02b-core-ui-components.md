# Phase 02B — Core UI Components

## Context Links
- Parent: [plan.md](./plan.md)
- Blocked by: Phase 01
- Parallel with: Phase 02A (no file overlap)
- Design: [docs/design-guidelines.md](../../docs/design-guidelines.md)
- Wireframes: [docs/wireframes/wireframe-scores-home.html](../../docs/wireframes/wireframe-scores-home.html)

## Parallelization Info
- **Runs in parallel with Phase 02A**
- No overlap: this phase owns ONLY `src/components/`
- Both 02A and 02B must complete before Phase 03x starts
- Components depend on types from 02A — use `import type` with agreed interfaces

## Overview
- **Priority:** P1
- **Status:** completed
- **Description:** All reusable UI components using NativeWind + design tokens. Dark theme. No screen-specific logic — pure presentational + minimal local state.

## File Ownership (EXCLUSIVE to this phase)
```
src/components/match-card.tsx
src/components/live-indicator.tsx
src/components/competition-header.tsx
src/components/date-filter-strip.tsx
src/components/score-board.tsx
src/components/standings-table.tsx
src/components/fixture-item.tsx
src/components/stat-bar.tsx
src/components/event-timeline.tsx
src/components/lineup-pitch.tsx
src/components/team-crest.tsx
src/components/loading-skeleton.tsx
src/components/empty-state.tsx
src/components/index.ts
```

## Design Reference
Colors, spacing, typography from `docs/design-guidelines.md`:
- Background: `#0D1117` (bg-primary), Cards: `#161B22` (bg-surface)
- Live green: `#00C853`, Danger: `#FF3D3D`, Blue: `#2196F3`
- Match card height: 64px minimum
- Touch targets: minimum 44px

## Implementation Steps

### 1. match-card.tsx
Primary list item for scores/fixtures screens.
```
Props: { match: Match; onPress: () => void; showLeague?: boolean }
Layout: [Crest] HomeTeam  Score  AwayTeam [Crest]
                 42' • LIVE  [YC] [RC]
```
- Live rows: `bg-accent-live-dim` background tint
- Score: monospace, 22px bold
- Live indicator: `<LiveIndicator />` component
- Card/red card pills with correct colors
- `React.memo` wrapped

### 2. live-indicator.tsx
```
Props: { minute: number; isHalftime?: boolean }
```
- Pulsing 8px green dot + minute text
- Uses `Animated.loop` for pulse
- Checks `AccessibilityInfo.isReduceMotionEnabled()` — no animation if true
- Text: "HT" during halftime, "N'●" during play

### 3. competition-header.tsx
```
Props: { league: League; liveCount: number; isExpanded: boolean; onToggle: () => void }
```
- 40px height, surface background
- Flag emoji + league name (all caps, text-label)
- Live count badge (green) on right
- Chevron icon rotates on expand/collapse (Animated.Value)

### 4. date-filter-strip.tsx
```
Props: { selectedDate: string; onDateChange: (date: string) => void; daysRange?: number }
```
- Horizontal ScrollView, snap-to-item behavior
- 7 days centered on today (3 before, today, 3 after)
- Active: blue pill background, white text
- Inactive: gray text
- Generates date labels: "Yesterday", "Today", "Tomorrow", then "Mon 17" etc.

### 5. score-board.tsx
Match detail hero score component:
```
Props: { homeTeam: Team; awayTeam: Team; score: MatchScore; status: MatchStatus; minute?: number }
```
- Large 48px monospace score
- Team names below crests
- Status pill (LIVE / HT / FT / time)
- Goal flash animation via ref + `Animated.Value`

### 6. standings-table.tsx
```
Props: { entries: StandingsEntry[]; highlightTeamId?: string }
```
- FlatList for performance (100 rows)
- Sticky header row: # | Team | P | W | D | L | GD | Pts
- Zone color: 3px left border on position cell
- Highlighted team: blue dim background
- Form dots: 5 × 6px W/D/L circles
- Alternate row background (every odd row: bg-surface-alt)

### 7. fixture-item.tsx
Compact upcoming match item:
```
Props: { match: Match; onPress: () => void; onToggleNotification?: () => void }
```
- Kickoff time (blue if today, gray if future)
- Team names + vs separator
- Notification bell toggle (optional)

### 8. stat-bar.tsx
```
Props: { label: string; homeValue: number; awayValue: number; isPercentage?: boolean }
```
- Proportional fill bar (home=blue, away=gray)
- Values flanking the bar
- Label centered below

### 9. event-timeline.tsx
```
Props: { events: MatchEvent[]; homeTeamId: string }
```
- Centre divider line
- Home events left, away events right
- Goal: bold + goal icon, yellow/red card icons
- "LIVE NOW" pulsing marker at current minute

### 10. lineup-pitch.tsx
```
Props: { homeLineup: Lineup; awayLineup: Lineup }
```
- Dark green gradient pitch background
- 4-4-2, 4-3-3 etc. based on formation string
- Player dots (28px) with number overlay
- Home team: blue dots, Away team: gray dots

### 11. team-crest.tsx
```
Props: { team: Team; size?: number }
```
- Placeholder: colored circle + team short name (2-3 chars)
- Size prop (default 28px)
- When real API: load from `team.crest` URL via `expo-image`

### 12. loading-skeleton.tsx + empty-state.tsx
- `LoadingSkeleton`: animated shimmer boxes for match cards
- `EmptyState`: icon + message for empty lists

## Todo
- [x] Create `src/components/match-card.tsx` with React.memo
- [x] Create `src/components/live-indicator.tsx` with Animated pulse
- [x] Create `src/components/competition-header.tsx` with collapse animation
- [x] Create `src/components/date-filter-strip.tsx` with scroll snap
- [x] Create `src/components/score-board.tsx` with goal flash
- [x] Create `src/components/standings-table.tsx` with FlatList
- [x] Create `src/components/fixture-item.tsx`
- [x] Create `src/components/stat-bar.tsx`
- [x] Create `src/components/event-timeline.tsx`
- [x] Create `src/components/lineup-pitch.tsx`
- [x] Create `src/components/team-crest.tsx`
- [x] Create `src/components/loading-skeleton.tsx`
- [x] Create `src/components/empty-state.tsx`
- [x] Create `src/components/index.ts` barrel export
- [x] All components: verify NativeWind className works
- [x] All touch targets: minimum 44px height

## Success Criteria
- All components render without errors in isolation
- NativeWind Tailwind classes apply correctly
- Live indicator pulsing works (disabled in reduced motion)
- FlatList in standings renders 100 rows without jank
- All components export from `src/components/index.ts`
- TypeScript strict — no errors

## Conflict Prevention
- Does NOT import from `src/hooks/` or `src/stores/` — pure presentational
- Props use types from `src/types/` (agreed interface from 02A)
- Does NOT touch `app/` directory

## Risk Assessment
- `Animated` API for pulse: use `useNativeDriver: true` where possible
- FlatList with 100 standings items: use `getItemLayout` for performance
- NativeWind v4 className on custom components: use `cssInterop` from `react-native-css-interop` if needed (NOT `styled()` — removed in v4)
- lineup-pitch.tsx complex layout: may exceed 200 lines — split into `lineup-pitch-player.tsx` if needed
- Gluestack: only use `Switch` (Settings toggles) and `Modal` (bottom sheets) — do NOT use for MatchCard, StandingsTable, etc.
<!-- Updated: Validation Session 1 - NativeWind v4 (no styled()), Gluestack selective use only -->
