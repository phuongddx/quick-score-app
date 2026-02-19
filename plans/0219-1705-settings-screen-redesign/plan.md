---
title: "Settings Screen Redesign"
description: "Redesign Settings screen to match Stitch spec with profile, toggles, and support sections"
status: complete
priority: P2
effort: 2h
branch: main
tags: [settings, ui, redesign, react-native]
created: 2026-02-19
completed: 2026-02-19
---

# Settings Screen Redesign

## Overview

Redesign `app/(tabs)/settings.tsx` to match Stitch design spec. Add user profile section (mock), restructure toggles, add support links, and modularize into reusable components under `src/components/settings/`.

## Current State

- `settings.tsx` (110 LOC): inline `ToggleRow`/`SectionHeader` components, 4 notification toggles, app info, clear favorites button. All inline styles.
- `settings-store.ts` (23 LOC): 4 notification booleans + setters. Only consumed by `settings.tsx`. No tests.
- No `src/components/settings/` directory exists.

## Target State

5 visual sections: Profile, General, API & Usage, Support, Danger Zone. Modular components. Expanded Zustand store with `pushNotifications`, `liveMatchUpdates`, `theme`.

## Phases

| Phase | File | Status | Effort |
|-------|------|--------|--------|
| [Phase 1](./phase-01-update-settings-store.md) | Update settings store | Complete | 20min |
| [Phase 2](./phase-02-create-settings-components.md) | Create reusable settings components | Complete | 40min |
| [Phase 3](./phase-03-redesign-settings-screen.md) | Redesign settings screen | Complete | 60min |

## Key Dependencies

- `lucide-react-native` already installed (used elsewhere)
- NativeWind v4 className pattern established
- No navigation to sub-screens needed (Alert placeholders)
- No existing settings tests to break

## Risk Summary

- **Low**: Store expansion backward-compatible; only `settings.tsx` consumes it
- **Low**: No existing tests reference settings components
- **Medium**: File size discipline -- must keep settings.tsx under 200 LOC via modularization
