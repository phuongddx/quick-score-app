---
title: "DateFilterStrip compact week-strip redesign"
description: "Redesign DateFilterStrip to compact two-line style (weekday + DD.MM.) with red active indicator, integrate into fixtures screen"
status: completed
priority: P2
effort: 1.5h
branch: main
tags: [ui, component, fixtures]
created: 2026-02-19
---

# DateFilterStrip Compact Week-Strip Redesign

## Objective

Replace the current pill-style DateFilterStrip with a compact week-strip design: two-line cells (weekday abbreviation + DD.MM. date), red text + underline for active state, muted gray for inactive. Integrate into fixtures screen for single-day filtering.

## Phases

| # | Phase | File(s) | Status | Effort |
|---|-------|---------|--------|--------|
| 1 | [Update DateFilterStrip component](./phase-01-update-date-filter-strip.md) | `src/components/date-filter-strip.tsx` | completed | 45m |
| 2 | [Update fixtures screen](./phase-02-update-fixtures-screen.md) | `app/(tabs)/fixtures.tsx` | completed | 45m |

## Key Design Decisions

- **Inline styles only** (NativeWind v4 pattern used in this codebase)
- **No React.memo** (React Compiler enabled)
- **Two-letter weekday abbreviations**: MO/TU/WE/TH/FR/SA/SU
- **"TODAY" label** replaces weekday for current date
- **Active state**: `#E53935` red text + 3px red bottom border
- **Inactive state**: `#8B949E` muted gray text, no border
- **Auto-scroll** to selected date on mount via ScrollView ref

## Dependencies

- None -- pure UI changes to two existing files
