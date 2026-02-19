---
title: "Quick Score - React Native Football App"
description: "Expo 52+ football live score app with mock data, 5 European leagues, dark theme"
status: completed
priority: P1
effort: 12h
branch: main
tags: [react-native, expo, football, live-scores, typescript]
created: 2026-02-19
---

# Quick Score — Implementation Plan

## Overview
React Native football live score app (Expo 52+ managed) with dark theme, 5 European leagues, mock data layer, TanStack Query + Zustand state, and Expo Router v3 navigation.

## Execution Strategy
```
Phase 01 (Sequential - Foundation)
    ↓
Phase 02A ──────── Phase 02B  (Parallel - Data + Components)
    ↓                  ↓
Phase 03A ──── 03B ──── 03C  (Parallel - Screens)
         ↓
      Phase 04 (Sequential - Integration)
         ↓
      Phase 05 (Sequential - Testing)
```

## Phases

| # | Phase | Status | Group | Effort | File |
|---|-------|--------|-------|--------|------|
| 01 | Project Setup & Foundation | completed | sequential | 2h | [phase-01](./phase-01-project-setup-and-foundation.md) |
| 02A | Data Layer (types, mock data, services, hooks, stores) | completed | parallel-A | 2.5h | [phase-02a](./phase-02a-data-layer-types-mock-services-stores-hooks.md) |
| 02B | Core UI Components | completed | parallel-A | 2h | [phase-02b](./phase-02b-core-ui-components.md) |
| 03A | Tab Screens Group 1 (Scores + Fixtures) | completed | parallel-B | 1.5h | [phase-03a](./phase-03a-tab-screens-scores-and-fixtures.md) |
| 03B | Tab Screens Group 2 (Standings + Favorites) | completed | parallel-B | 1.5h | [phase-03b](./phase-03b-tab-screens-standings-and-favorites.md) |
| 03C | Match Detail + Settings screens | completed | parallel-B | 1.5h | [phase-03c](./phase-03c-match-detail-and-settings-screens.md) |
| 04 | Navigation, Providers & Integration | completed | sequential | 1h | [phase-04](./phase-04-navigation-providers-and-integration.md) |
| 05 | Testing | completed | sequential | 1h | [phase-05-testing.md](./phase-05-testing.md) |

## Dependency Graph
```
01 ──► 02A ──► 03A ──┐
   └──► 02B ──► 03B ──┼──► 04 ──► 05
              └──► 03C ──┘
```
- 01 must complete before all others
- 02A and 02B run in parallel after 01
- 03A, 03B, 03C all run in parallel after BOTH 02A and 02B complete
- 04 runs after ALL 03x phases complete
- 05 runs after 04

## File Ownership Matrix

| Phase | Owns Files |
|-------|-----------|
| 01 | `package.json`, `app.json`, `tsconfig.json`, `tailwind.config.js`, `babel.config.js`, `metro.config.js`, `.gitignore`, `README.md` |
| 02A | `src/types/`, `src/data/`, `src/services/`, `src/stores/`, `src/hooks/` |
| 02B | `src/components/` |
| 03A | `app/(tabs)/index.tsx`, `app/(tabs)/fixtures.tsx` |
| 03B | `app/(tabs)/standings.tsx`, `app/(tabs)/favorites.tsx` |
| 03C | `app/match/[id].tsx`, `app/settings.tsx` |
| 04 | `app/_layout.tsx`, `app/(tabs)/_layout.tsx` |
| 05 | `src/**/*.test.ts`, `src/**/*.test.tsx`, `vitest.config.ts` |

## Validation Log

### Session 1 — 2026-02-19
**Trigger:** Initial plan creation validation before implementation
**Questions asked:** 4

#### Questions & Answers

1. **[Architecture]** Phase 04 identifies a choice: 4 tabs (Scores, Fixtures, Standings, Favorites) with Settings accessible from Favorites, OR 5 tabs including Settings. Which layout do you prefer?
   - Options: 4 tabs + Settings in Favorites | 5 tabs including Settings
   - **Answer:** 5 tabs including Settings
   - **Rationale:** Bottom tab layout drives entire navigation structure in `app/(tabs)/_layout.tsx`. 5-tab layout means Settings is a tab screen (`app/(tabs)/settings.tsx`), not `app/settings.tsx`.

2. **[Architecture]** NativeWind v4 (latest) has a significantly different API from v3. Phase 01 flags this as a risk. Which version should we target?
   - Options: NativeWind v4 (latest) | NativeWind v2 (widely documented)
   - **Answer:** NativeWind v4 (latest)
   - **Rationale:** Config syntax changes (v4 uses `cssInterop`, no `styled()` wrapper needed). Babel plugin changes. `global.css` setup differs. All phase files using NativeWind need v4 patterns.

3. **[Assumptions]** Mock data with refetchInterval won't actually change scores unless we simulate live updates. How should we handle the 'live score cycling' simulation?
   - Options: Cycle scores every 5s in service layer | Static mock data only | Timer-based Zustand store updates
   - **Answer:** Cycle scores every 5s in service layer
   - **Rationale:** `mock-data-service.ts` must maintain mutable state (scores, minutes) and return different values on each call. Phase 02A needs a simulation engine. TanStack Query refetchInterval will then naturally deliver "live" updates to UI.

4. **[Tradeoffs]** Gluestack UI v3 adds bundle size but provides accessible component primitives. Do we actually need Gluestack UI?
   - Options: Skip Gluestack, use NativeWind + raw RN only | Keep Gluestack for accessible primitives
   - **Answer:** Keep Gluestack for accessible primitives (Switch, Checkbox, Modal)
   - **Rationale:** Use Gluestack only for Switch (Settings toggles), Modal (bottom sheets). All custom components (MatchCard, StandingsTable, etc.) remain pure NativeWind. Reduces build-from-scratch effort for accessible form controls.

#### Confirmed Decisions
- **Tabs:** 5 tabs — Settings moves to `app/(tabs)/settings.tsx`
- **NativeWind:** v4 — use `cssInterop`, no `styled()`, updated babel config
- **Live simulation:** Service-layer cycling — mock-data-service maintains mutable state
- **Gluestack:** Selective use only for Switch/Modal primitives

#### Action Items
- [ ] Phase 01: Update NativeWind install to v4, update babel/metro config for v4
- [ ] Phase 01: Update file ownership — add `app/(tabs)/settings.tsx` to Phase 03C ownership
- [ ] Phase 02A: Add live simulation engine to mock-data-service (mutable match state + cycling logic)
- [ ] Phase 02B: Remove `styled()` wrapper references, use v4 `cssInterop` if needed
- [ ] Phase 03C: Move settings screen to `app/(tabs)/settings.tsx` (tab route, not standalone)
- [ ] Phase 04: Update `_layout.tsx` to 5 tabs including Settings tab

#### Impact on Phases
- Phase 01: NativeWind v4 config changes (babel plugin, metro config, cssInterop setup)
- Phase 02A: Add live simulation engine to mock-data-service.ts
- Phase 02B: NativeWind v4 patterns (no `styled()` wrapper)
- Phase 03C: Settings at `app/(tabs)/settings.tsx` not `app/settings.tsx`
- Phase 04: 5-tab layout including Settings

---

## Key References
- Design: `docs/design-guidelines.md`
- Architecture: `docs/system-architecture.md`
- Wireframes: `docs/wireframes/`
- Research (competitor): `plans/reports/researcher-0219-1253-flashscore-competitive-analysis.md`
- Research (tech stack): `plans/reports/researcher-0219-1253-live-football-app-tech-stack.md`
