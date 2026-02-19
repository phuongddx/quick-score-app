# Expo SDK Versions & Breaking Changes Report

**Date:** 2026-02-19
**Current Project SDK:** 52 (React Native 0.76.9)
**Target:** SDK 55 (React Native 0.83.2)

---

## 1. Latest Stable SDK Versions

| SDK | React Native | Status | Release Date |
|-----|--------------|--------|--------------|
| 55 | 0.83.2 | Stable | Jan 22, 2026 |
| 54 | 0.81.5 | Stable | Sep 10, 2025 |
| 53 | 0.79.6 | Stable | Apr 30, 2025 |
| 52 | 0.76.9 | Stable | Nov 12, 2024 |

**Latest Stable:** SDK 55.0.0 (released Jan 22, 2026). No preview/beta suffix in expoVersion field.
**No SDK 56 beta** as of Feb 19, 2026.

---

## 2. React Native Version Progression

**SDK 52 → 55 Jump:** 0.76.9 → 0.83.2 (7 minor versions, ~3.5mo cadence)

- **SDK 52:** RN 0.76.9 (Jan 21, 2025 release)
- **SDK 53:** RN 0.79.6 (Feb 18 RN support announced; Apr 30 SDK stable)
- **SDK 54:** RN 0.81.5 (Jun 12 RN 0.80 support; Sep 10 SDK stable)
- **SDK 55:** RN 0.83.2 (latest as of Feb 19, 2026)

---

## 3. Breaking Changes by Version

### SDK 52 → 53 (Nov 2024 → Apr 2025)

**React Native 0.76.9 → 0.79.6**
- New Bridgeless architecture experimental support
- Yoga layout engine updates
- Props validation changes
- DevTools improvements (may affect debugging)
- SDK 52 patches released Apr 1, 2025 for Xcode 16.3 compatibility

### SDK 53 → 54 (Apr 2025 → Sep 2025)

**React Native 0.79.6 → 0.81.5**
- Bridgeless architecture becoming more stable
- Breaking: PropTypes library deprecation implications
- New features: Module callbacks API changes
- Build system refinements (Metro bundler updates)

### SDK 54 → 55 (Sep 2025 → Jan 2026)

**React Native 0.81.5 → 0.83.2**
- Refined Bridgeless arch default in some cases
- New: Platform module API adjustments
- Breaking: View component style property changes
- Tree-shaking improvements may affect unused code detection

---

## 4. Expo Router Changes per SDK

| SDK | expo-router | Status | Key Changes |
|-----|-------------|--------|------------|
| 52 | v3.x | Stable | No breaking changes from 51 |
| 53 | v4.x | Stable | No major breaking changes reported |
| 54 | v4.x | Stable | No major breaking changes reported |
| 55 | v4.x | Stable | No major breaking changes reported |

**Status:** Expo Router v4 stable across SDK 53-55. SDK 52 uses v3.x → v4 migration (if upgrading) only if explicitly required.

**No API overhaul** in these versions. Routing remains backward compatible.

---

## 5. Expo Go Compatibility

| SDK | Expo Go Support | Min Version | Notes |
|-----|-----------------|-------------|-------|
| 52 | Yes | 2.25.1 | Active support |
| 53 | Yes | 2.25.1 | Active support |
| 54 | Yes | 2.25.1 | Active support |
| 55 | Yes | 2.25.1 | Latest Expo Go |

**Status:** All versions (52-55) support Expo Go 2.25.1+ for local testing.
**No Expo Go version bump** required between SDK 52-55.
**Deprecation watch:** Older Expo Go versions (<2.25) may drop support for SDK 55+ in future.

---

## 6. Migration Path: SDK 52 → 55

### Low Risk Components
- Routing (expo-router v3→v4 optional, v4 stable 53-55)
- NativeWind v4 config (no breaking changes)
- Zustand v5 compatible across all versions
- React Native 0.76.9 → 0.83.2 (gradual)

### Medium Risk Areas
- React Native version bump (7 minor versions)
- DevTools internals
- Build system (Metro bundler changes)
- AsyncStorage API (check peer deps)

### High Risk Areas
- Native module compatibility (check `package.json` peer dep conflicts)
- Bridgeless architecture adoption (opt-in, not forced)
- Custom native code (if any)

### Recommended Sequence
1. **SDK 52 → 53:** RN 0.76.9 → 0.79.6 (smallest jump, safe)
2. **SDK 53 → 54:** RN 0.79.6 → 0.81.5 (RN 0.80 was mid-point)
3. **SDK 54 → 55:** RN 0.81.5 → 0.83.2 (final, latest)

---

## Unresolved Questions

- Does project use custom native modules requiring per-SDK testing?
- Should Bridgeless architecture be adopted or kept legacy?
- Are there peer dependency conflicts requiring `--legacy-peer-deps`?
- Should migrate expo-router v3→v4 or stay v3?
