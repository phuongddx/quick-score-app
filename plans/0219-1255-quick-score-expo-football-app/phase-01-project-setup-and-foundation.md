# Phase 01 — Project Setup & Foundation

## Context Links
- Parent: [plan.md](./plan.md)
- Architecture: [docs/system-architecture.md](../../docs/system-architecture.md)
- Code Standards: [docs/code-standards.md](../../docs/code-standards.md)

## Parallelization Info
- **Must run first** — all other phases depend on this
- Successor phases (02A, 02B) unblocked once this completes

## Overview
- **Priority:** P0 (blocker)
- **Status:** completed
- **Description:** Initialize Expo 52+ project, configure all build tools, TypeScript strict mode, NativeWind, and project skeleton

## Requirements
- Expo SDK 52+ managed workflow
- TypeScript strict mode
- NativeWind (Tailwind CSS for React Native)
- Expo Router v3
- Gluestack UI v3 (unstyled component base)
- ESlint + Prettier configured
- Git `.gitignore` for Expo

## File Ownership (EXCLUSIVE to this phase)
```
package.json
app.json
tsconfig.json
tailwind.config.js
babel.config.js
metro.config.js
.gitignore
README.md
.eslintrc.js
.prettierrc
global.css          ← NativeWind global styles
```

## Implementation Steps

### 1. Initialize Expo Project
```bash
npx create-expo-app@latest . --template blank-typescript
```
> Run in the existing `/Users/ddphuong/Projects/next-labs/quick-score` directory

### 2. Install Core Dependencies
```bash
npx expo install expo-router expo-constants expo-linking expo-status-bar react-native-safe-area-context react-native-screens
npx expo install @tanstack/react-query zustand
npx expo install @react-native-async-storage/async-storage
npx expo install expo-notifications expo-device
npx expo install react-use-websocket
npm install nativewind@^4.0.0 tailwindcss react-native-css-interop
npm install @gluestack-ui/themed @gluestack-style/react  # For Switch/Modal only
npm install lucide-react-native
npm install --save-dev vitest @testing-library/react-native
```
<!-- Updated: Validation Session 1 - NativeWind v4, selective Gluestack usage -->

### 3. Configure app.json
```json
{
  "expo": {
    "name": "Quick Score",
    "slug": "quick-score",
    "scheme": "quick-score",
    "version": "1.0.0",
    "orientation": "portrait",
    "userInterfaceStyle": "dark",
    "backgroundColor": "#0D1117",
    "plugins": ["expo-router", "expo-notifications"],
    "android": { "adaptiveIcon": { "backgroundColor": "#0D1117" } },
    "ios": { "supportsTablet": false }
  }
}
```

### 4. Configure TypeScript (tsconfig.json)
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  }
}
```

### 5. Configure NativeWind (tailwind.config.js)
```js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0D1117',
        'bg-surface': '#161B22',
        'bg-surface-alt': '#1C2128',
        'bg-elevated': '#21262D',
        'border-default': '#30363D',
        'text-primary': '#E6EDF3',
        'text-secondary': '#8B949E',
        'text-muted': '#484F58',
        'accent-live': '#00C853',
        'accent-live-dim': 'rgba(0,200,83,0.12)',
        'accent-danger': '#FF3D3D',
        'accent-warning': '#FFB300',
        'accent-blue': '#2196F3',
        'accent-blue-dim': 'rgba(33,150,243,0.12)',
        'cl-zone': '#00C853',
        'el-zone': '#FF9800',
        'ecl-zone': '#9C27B0',
        'rel-zone': '#FF3D3D',
      }
    }
  },
  plugins: []
}
```

### 6. Configure babel.config.js (NativeWind v4)
```js
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
<!-- Updated: Validation Session 1 - NativeWind v4 babel config (no nativewind/babel plugin, use jsxImportSource) -->

### 7. Create Directory Skeleton
```bash
mkdir -p src/{components,hooks,stores,services,types,data}
mkdir -p app/match app/\(tabs\)
```

### 8. Configure metro.config.js for NativeWind v4
```js
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const config = getDefaultConfig(__dirname);
// NativeWind v4: withNativeWind wraps config for CSS processing
module.exports = withNativeWind(config, { input: './global.css' });
```
<!-- Updated: Validation Session 1 - NativeWind v4 metro config (same API, confirmed) -->

### 9. global.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Todo
- [x] Run `npx create-expo-app@latest . --template blank-typescript`
- [x] Install all dependencies
- [x] Configure app.json (scheme, dark mode, plugins)
- [x] Configure tsconfig.json with strict + path aliases
- [x] Configure tailwind.config.js with design tokens
- [x] Configure babel.config.js with NativeWind plugin
- [x] Configure metro.config.js
- [x] Create global.css
- [x] Create directory skeleton (src/, app/)
- [x] Create .gitignore for Expo
- [x] Create .eslintrc.js
- [x] Verify `npx expo start` runs without errors

## Success Criteria
- `npx expo start` launches without errors
- TypeScript strict mode active (no implicit any)
- Tailwind classes resolve in IDE
- All custom color tokens available as Tailwind classes
- Directory structure matches system-architecture.md spec

## Conflict Prevention
This phase owns ALL configuration files. No other phase should modify these.

## Risk Assessment
- NativeWind v4 breaking changes (v3 vs v4 API differs) — check exact version
- Expo Router requires specific app.json `scheme` field
- Gluestack v3 requires separate config — may need `@gluestack-ui/config`
