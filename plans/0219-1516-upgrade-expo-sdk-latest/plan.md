---
title: "Expo SDK 52 → 55 Upgrade"
description: "Upgrade Quick Score from Expo SDK 52 to SDK 55 with React Native 0.83.2 and React 19"
status: complete
priority: P1
effort: 3h
branch: main
tags: [expo, upgrade, react-native, react-19]
created: 2026-02-19
---

# Expo SDK 52 to 55 Upgrade Plan

## Summary

Direct jump from SDK 52 (RN 0.76.3, React 18) to SDK 55 (RN 0.83.2, React 19). Codebase analysis confirms zero React 19 breaking changes (no forwardRef, useContext, Context.Provider usage). Main risk: reanimated v3 -> v4 + react-native-worklets peer dep.

## Version Targets

| Package | Current | Target |
|---------|---------|--------|
| expo | ~52.0.11 | ~55.0.0 |
| react-native | 0.76.3 | 0.83.2 |
| react | 18.3.1 | 19.x |
| expo-router | ~4.0.9 | ~5.x |
| react-native-reanimated | ~3.16.1 | ~4.1.0+ |
| react-native-gesture-handler | ~2.20.2 | ~2.30.0 |
| @types/react | ~18.3.12 | ~19.x |

## Phases

| # | Phase | Effort | Status | File |
|---|-------|--------|--------|------|
| 1 | [Run Upgrade Commands](./phase-01-run-upgrade-commands.md) | 30min | pending | Core SDK + deps upgrade |
| 2 | [Fix Breaking Changes](./phase-02-fix-breaking-changes.md) | 45min | pending | Verify configs, doctor check |
| 3 | [Housekeeping](./phase-03-housekeeping.md) | 45min | pending | React Compiler, memo cleanup |
| 4 | [Verify & Test](./phase-04-verify-and-test.md) | 60min | pending | Tests, doctor, app start |

## Key Risks

- **Reanimated v4:** Mandatory for SDK 55. Requires react-native-worklets peer dep
- **Peer dep conflicts:** Use `--legacy-peer-deps` if needed (NativeWind, testing-library)
- **New Architecture:** Default on SDK 53+. app.json already clean (no newArchEnabled flag)

## Config Files Impact

| File | Changes Needed |
|------|---------------|
| package.json | All version bumps (automated by expo install) |
| babel.config.js | NONE (reanimated/plugin still valid for v4) |
| metro.config.js | NONE (withNativeWind pattern unchanged) |
| app.json | Add experiments.reactCompiler (optional) |
| tsconfig.json | NONE |

## Research Reports

- [Expo Versions Report](./reports/researcher-0219-1517-expo-versions-report.md)
- [Ecosystem Compatibility Report](./reports/researcher-ecosystem-compat-report.md)

## Validation Log

### Session 1 — 2026-02-19
**Trigger:** Initial plan creation validation
**Questions asked:** 3

#### Questions & Answers

1. **[Architecture]** The plan assumes a direct SDK 52 → 55 jump. Research flags it as "low-to-medium" risk. Which upgrade strategy do you prefer?
   - Options: Direct 52 → 55 | Incremental 52 → 53 → 54 → 55
   - **Answer:** Direct 52 → 55 (Recommended)
   - **Rationale:** Codebase is clean (no forwardRef, useContext, NativeTabs), so no SDK-specific migration code needed. Single upgrade run via `expo install --fix` resolves all compatible versions automatically.

2. **[Scope]** Phase 03 enables React Compiler and removes React.memo from 7 components. Do you want this?
   - Options: Yes — enable React Compiler + remove React.memo | Enable React Compiler only | Skip
   - **Answer:** Yes — enable React Compiler + remove React.memo (Recommended)
   - **Rationale:** React Compiler (stable in SDK 54+) auto-memoizes at build time. Removing manual React.memo wrappers from 7 components simplifies code and lets Compiler optimize freely without interference.

3. **[Assumptions]** Phase 04 includes a manual smoke test across all 5 tabs. Do you have a simulator or device available?
   - Options: Yes — iOS Simulator or Expo Go on device | No — use npx expo export instead
   - **Answer:** Yes — iOS Simulator or Expo Go on device
   - **Rationale:** Full manual smoke test is confirmed feasible. All 5 tabs + match detail navigation + reanimated v4 animations will be visually verified.

#### Confirmed Decisions
- **Upgrade strategy:** Direct 52 → 55 — clean codebase makes single-step safe
- **React Compiler:** Enabled with React.memo removal across 7 components — Phase 03 scope confirmed
- **Smoke test:** Full manual test on iOS Simulator or Expo Go — plan as written

#### Action Items
- [x] No plan changes required — all decisions match plan as written

#### Impact on Phases
- No phase changes required. All answers confirm plan as written.
