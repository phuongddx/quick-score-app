# Expo SDK 53-55 Ecosystem Compatibility Research Report

**Date:** 2026-02-19 | **Scope:** NativeWind v4, reanimated, React 19, gesture-handler, screens

---

## 1. NativeWind v4 + Expo SDK 53/54/55

**Current Status:** NativeWind v4.2.0+ required for SDK 54+. Babel/Metro config stable across 53-55.

### Babel Config
```javascript
presets: [
  ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
  'nativewind/babel'
],
plugins: ['react-native-reanimated/plugin']
```

### Metro Config
```javascript
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
module.exports = withNativeWind(config, { input: './global.css' });
```

### Key Notes
- No config changes between SDK 53-55 (stable pattern)
- CSS interop: NativeWind v4 handles via metro preprocessor
- Tailwind CSS: Use v3.4.17+ (NOT v4.x — reserved for NativeWind v5)
- **CRITICAL:** Do NOT add `react-native-worklets/plugin` separately in Babel. Reanimated v3/v4 handles it internally; duplicate plugins cause conflicts.

---

## 2. react-native-reanimated Compatibility

### Version by SDK
- **SDK 53:** Reanimated v3.x (stable, recommended)
- **SDK 54:** Reanimated v3.x OR v4.1.0+ (v4 requires New Architecture + react-native-worklets)
- **SDK 55:** Reanimated v4.1.0+ (v3.x unsupported; SDK 55 forces New Architecture)

### react-native-worklets Requirement
- **Reanimated v3:** NOT required
- **Reanimated v4+:** REQUIRED peer dependency (must be explicitly installed despite internal bundling)
- **New Architecture:** Mandatory for Reanimated v4 on SDK 54+

### Babel Configuration
- Include ONLY `react-native-reanimated/plugin` (worklets plugin already nested)
- Adding both causes "Duplicate plugin/preset detected" error

### Migration Path
- SDK 53 → SDK 54: Can stay on Reanimated v3 (backward compatible) or migrate to v4 + New Architecture
- SDK 55+: MUST use Reanimated v4 (v3 incompatible)

---

## 3. React 19 Migration (SDK 54+)

### useContext → use()
- **Pattern:** Direct reading in render, works after early returns
- **Auto-migration:** NO codemod. Manual update required.
- **Backward compat:** useContext still works in React 19 (not removed)
- **Impact:** SDK 54 ships React 19.1.0. Functional to keep useContext, but use() is preferred for conditional context access.

```javascript
// useContext (still works)
const theme = useContext(ThemeContext);

// React 19 use() (preferred, allows conditionals)
const theme = use(ThemeContext);
```

### forwardRef Removal
- **Change:** Function components now accept `ref` as direct prop
- **Status:** forwardRef NOT removed in React 19, but deprecated (warns in strict mode)
- **Migration:** Automated codemod available from React team
- **Impact:** Class components unaffected. Functional components should migrate for cleaner API.

```javascript
// Old (still works)
const MyInput = forwardRef(({placeholder}, ref) => <input ref={ref} />);

// React 19 preferred
function MyInput({placeholder, ref}) {
  return <input placeholder={placeholder} ref={ref} />;
}
```

### Context.Provider → Context
- **Syntax:** `<Context value="..." >` replaces `<Context.Provider value="...">`
- **Impact:** Provider-scope unchanged. Purely syntax simplification.
- **Backward compat:** `.Provider` syntax still works (not removed)
- **Migration:** Straightforward find-replace, no functional changes.

```javascript
// Old
<ThemeContext.Provider value="dark">{children}</ThemeContext.Provider>

// React 19
<ThemeContext value="dark">{children}</ThemeContext>
```

---

## 4. react-native-gesture-handler Compatibility

| SDK | Compatible Version | Install Method |
|-----|-------------------|-----------------|
| 53  | ~2.28.0           | `expo install react-native-gesture-handler` |
| 54  | ~2.28.0 - 2.30.0  | `expo install react-native-gesture-handler` |
| 55  | 2.30.0 (latest)   | `expo install react-native-gesture-handler` |

**Recommendation:** Use `expo install` (auto-selects compatible version). Manual install: ≥2.28.0 acceptable for all three SDKs.

---

## 5. react-native-screens Compatibility

| SDK | Notes | Status |
|-----|-------|--------|
| 53  | Stable, no known issues | ✓ Compatible |
| 54  | XCFramework support incomplete (precompiled XCFrameworks disabled by default Aug 2024) | ⚠ Works, edge cases possible |
| 55  | Part of New Architecture mandate; fully supported | ✓ Compatible |

**Recommendation:** Use `expo install react-native-screens`. Version auto-selection handles SDK-specific requirements. No manual version pinning needed unless hitting known edge cases.

---

## 6. Summary: Migration Path (Current → SDK 54)

**Current State:** SDK 52 (RN 0.76), React 18, Reanimated v3, NativeWind v4

**To SDK 54:**
1. Update Expo SDK: `expo upgrade` → pulls SDK 54 with RN 0.81, React 19.1.0
2. No NativeWind config changes (babel/metro config identical)
3. **Choice A:** Stay on Reanimated v3 (backward compat works)
4. **Choice B:** Migrate to Reanimated v4 + enable New Architecture + install react-native-worklets
5. Context usage: Optional useContext → use() migration (not breaking)
6. forwardRef: Optional ref-as-prop migration (automated codemod available)
7. Run `expo install` for gesture-handler, screens (auto-resolves)

**To SDK 55:**
- Reanimated v3 drops; v4 mandatory
- New Architecture forced
- Same babel/metro config
- Everything else carries forward

---

## Unresolved Questions

1. Exact react-native-screens version ranges per SDK (Expo docs incomplete)
2. SDK 55 stable release date and React/RN versions (currently beta)
3. NativeWind v5 Expo SDK 54 compatibility (v5 pre-release, not stable)
4. Whether SDK 54 truly supports Reanimated v3 post-launch or only during beta

---

## Source References

- [React 19 Upgrade Guide](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)
- [React Context with use API](https://react.dev/blog/2024/04/25/react-19)
- [NativeWind Installation](https://www.nativewind.dev/docs/getting-started/installation)
- [Expo SDK 54 Beta Changelog](https://expo.dev/changelog/sdk-54-beta)
- [Expo Metro Config](https://docs.expo.dev/versions/latest/config/metro/)
- [React Native Reanimated Compatibility](https://docs.swmansion.com/react-native-reanimated/docs/guides/compatibility/)
- [React Native Reanimated Migration v3 to v4](https://docs.swmansion.com/react-native-reanimated/docs/guides/migration-from-3.x/)
- [React Native Gesture Handler - Expo Docs](https://docs.expo.dev/versions/latest/sdk/gesture-handler/)
- [React Native Screens - Expo Docs](https://docs.expo.dev/versions/latest/sdk/screens/)
- [Expo SDK 54 Upgrade Guide](https://expo.dev/blog/expo-sdk-upgrade-guide)
- [Upgrading to Expo 54 and React Native 0.81](https://medium.com/@shanavascruise/upgrading-to-expo-54-and-react-native-0-81-a-developers-survival-story-2f58abf0e326)
