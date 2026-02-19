# Phase 02: Fix Breaking Changes

## Context Links

- [Plan Overview](./plan.md)
- [Phase 01: Run Upgrade Commands](./phase-01-run-upgrade-commands.md)
- [Ecosystem Compat Report](./reports/researcher-ecosystem-compat-report.md)

## Overview

- **Priority:** P1
- **Status:** complete
- **Effort:** 45min
- **Description:** Verify config files still work after SDK bump, fix any breaking changes surfaced by expo-doctor

## Key Insights

- babel.config.js: `react-native-reanimated/plugin` is valid for BOTH v3 and v4. No change needed.
- metro.config.js: `withNativeWind` pattern is stable across SDK 53-55. No change needed.
- Do NOT add `react-native-worklets/plugin` to babel. Reanimated v4 plugin nests it internally. Duplicate = build error.
- React 19 breaking changes (forwardRef, useContext, Context.Provider) confirmed ZERO impact on this codebase.
- @types/react v19 may introduce stricter types. TypeScript compilation must be verified.

## Requirements

### Functional
- App compiles with no TypeScript errors
- Babel transform pipeline works (NativeWind + reanimated)
- Metro bundler resolves all modules

### Non-functional
- expo-doctor clean pass (no critical errors)
- No runtime crashes from config issues

## Architecture

No architecture changes. Config verification only.

## Related Code Files

| File | Action |
|------|--------|
| `babel.config.js` | VERIFY ONLY - no changes expected |
| `metro.config.js` | VERIFY ONLY - no changes expected |
| `tsconfig.json` | VERIFY ONLY - may need `react-jsx` update |
| `app.json` | VERIFY ONLY - check no new required fields for SDK 55 |
| `global.css` | VERIFY ONLY - NativeWind CSS input |

## Implementation Steps

### Step 1: Verify Babel Config

Read `babel.config.js` and confirm it matches:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
    ],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

**CRITICAL:** Do NOT add `nativewind/babel` preset (v4 uses jsxImportSource instead). Do NOT add `react-native-worklets/plugin` (nested in reanimated/plugin).

### Step 2: Verify Metro Config

Read `metro.config.js` and confirm unchanged:

```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

No changes needed. This pattern works across SDK 52-55.

### Step 3: TypeScript Compilation Check

```bash
npx tsc --noEmit
```

Watch for @types/react v19 issues:
- `ReactNode` type narrower (no longer includes `{}`)
- `useRef(null)` now returns `RefObject` instead of `MutableRefObject`
- `ReactElement` type changes

If errors found, fix types inline. This codebase has no forwardRef/useRef patterns that would break.

### Step 4: Run Expo Doctor (Second Pass)

```bash
npx expo-doctor
```

After phase 01 installs + config verification, this should be clean. If warnings persist:

| Warning | Action |
|---------|--------|
| "Package X version mismatch" | Run `npx expo install X` |
| "@babel/core version" | Will address in phase 03 (remove from devDeps) |
| "Deprecated package" | Evaluate if removal is safe |

### Step 5: Verify SDK 55 app.json Requirements

Check if SDK 55 requires new fields in app.json. Current config:
- No `sdkVersion` field (correct - Expo resolves from package.json)
- No `newArchEnabled` field (correct - default true on SDK 53+)
- `plugins: ["expo-router", "expo-notifications"]` - verify both still valid

If expo-doctor flags missing config, add minimally.

### Step 6: Test Metro Bundler Starts

```bash
npx expo start --clear --no-dev
```

Press `Ctrl+C` after confirming bundler initializes without errors. Verifies:
- Metro resolves all module imports
- NativeWind CSS processing works
- Reanimated babel plugin runs correctly

## Todo List

- [ ] Verify babel.config.js needs no changes
- [ ] Verify metro.config.js needs no changes
- [ ] Run `npx tsc --noEmit` and fix any @types/react v19 errors
- [ ] Run `npx expo-doctor` (second pass, should be clean)
- [ ] Verify app.json has no new required fields for SDK 55
- [ ] Test Metro bundler starts with `npx expo start --clear`

## Success Criteria

- `npx tsc --noEmit` exits 0
- `npx expo-doctor` reports no critical errors
- `npx expo start --clear` shows "Metro waiting on..." without crashes
- babel.config.js and metro.config.js unchanged from pre-upgrade

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| @types/react v19 type errors | Medium | Fix inline, usually minor |
| Metro can't resolve new reanimated v4 | Low | Verify react-native-worklets installed |
| NativeWind CSS transform breaks | Very Low | Stable across SDK 53-55 per research |
| app.json missing required SDK 55 fields | Low | expo-doctor would flag this |

## Security Considerations

- No new permissions or API keys involved
- TypeScript strict mode remains enabled

## Next Steps

- If all checks pass, proceed to [Phase 03: Housekeeping](./phase-03-housekeeping.md)
- If TypeScript errors found, fix before proceeding
- If Metro fails, debug reanimated/worklets installation
