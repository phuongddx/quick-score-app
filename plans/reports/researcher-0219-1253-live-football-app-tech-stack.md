# Live Football Score App - Tech Stack Research Report

**Date:** Feb 19, 2025 | **Project:** Quick Score | **Status:** Complete

---

## Executive Summary

Recommended stack combines Expo managed workflow (SDK 52+), Zustand for state management, TanStack Query + WebSockets for real-time data, and Gluestack UI with NativeWind for styling. API-Football free tier recommended for comprehensive, production-ready football data.

---

## 1. Expo Setup & Workflow

**Recommended:** Expo Managed Workflow (SDK 52.0+)

### Latest Features (2025-2026)
- **Expo Router v3**: File-based navigation (Next.js style) with deep linking
- **EAS Build**: Cloud-based native compilation (no Xcode/Android Studio required)
- **Over-the-Air Updates**: Push bug fixes without app store reviews
- **Config Plugins**: Add native modules (vision-camera, maps, lottie) via managed workflow

### Managed vs Bare
| Aspect | Managed | Bare |
|--------|---------|------|
| Setup | JS/TS only, no native code | Full native control |
| Flexibility | Limited to config plugins | Complete customization |
| Time-to-market | Fast, best for MVP | Slower, for complex needs |
| **For scoring app** | **RECOMMENDED** | Optional later |

**Decision:** Start managed. Migrate to bare only if requiring native modules beyond Expo's ecosystem.

**Key Resources:**
- [Expo managed vs bare docs](https://github.com/expo/expo/blob/master/docs/pages/introduction/managed-vs-bare.md)
- [2025 Expo perspective](https://hashrocket.com/blog/posts/expo-for-react-native-in-2025-a-perspective)

---

## 2. Real-Time Data Architecture

**Recommended:** TanStack Query v5 + WebSocket (with fallback polling)

### Why WebSocket > Polling
- **WebSocket**: Push updates (real-time, <100ms latency)
- **Polling**: Pull every N seconds (higher battery/bandwidth drain)

### Implementation Pattern
```
TanStack Query manages cache state
    ↓
WebSocket connection maintains live updates
    ↓
Invalidate query on new match data
    ↓
UI re-renders with fresh scores
```

### Package Stack
- `@tanstack/react-query@5.x` - Server state management
- `react-use-websocket` - WebSocket wrapper
- Fallback: HTTP polling with staleTime/refetchInterval

**References:**
- [TanStack Query + WebSockets integration](https://blog.logrocket.com/tanstack-query-websockets-real-time-react-data-fetching/)
- [TanStack Query React Native support](https://tanstack.com/query/latest/docs/framework/react/react-native)

---

## 3. Football API Selection

**Recommended:** API-Football (free tier)

### Comparison

| Feature | API-Football | Football-Data.org | TheSportsDB | Sportmonks |
|---------|--------------|-------------------|-------------|-----------|
| **Free Plan** | ✅ All endpoints | ✅ Top leagues | ✅ Basic | ⚠️ 14-day trial |
| **Live Scores** | ✅ Real-time | ✅ Yes | ⚠️ Limited | ✅ Yes |
| **Leagues** | 2000+ | ~140 | ~100 | 2200+ |
| **Auth** | API key (no CC) | API key (no CC) | API key (no CC) | Requires trial |
| **Rate Limits** | 100 req/day (free) | 10 req/min | Generous | Varies |
| **Best for** | **Real-time scoring** | Analytics | Reference data | Enterprise |

### API-Football Free Tier Capabilities
- Live match data & scores
- Fixtures & standings
- Player stats, team info, league tables
- Injury reports, statistics
- No credit card required
- Sufficient for MVP with 100 req/day

**References:**
- [API-Football free access](https://www.api-football.com/)
- [Football API comparison](https://medium.com/geekculture/how-to-get-excellent-football-data-for-free-with-api-football-1b37d2db5f71)
- [Free vs paid analysis](https://www.sportmonks.com/blogs/free-vs-paid-football-apis-choosing-the-right-option-for-your-project/)

---

## 4. State Management

**Recommended:** Zustand + TanStack Query hybrid

### Architecture
- **Zustand**: UI state (favorites, filters, notifications settings)
- **TanStack Query**: Server state (match data, scores, API responses)

### Why Zustand (vs Redux Toolkit)
| Criteria | Zustand | Redux Toolkit |
|----------|---------|---------------|
| Bundle size | **~3KB** | ~20KB |
| Setup complexity | Minutes | Hours |
| Boilerplate | ✅ Minimal | ❌ Extensive |
| Real-time updates | ✅ Excellent | Adequate |
| React Native fit | **Best** | Good |
| Learning curve | ✅ Shallow | Steep |

**Zustand proves superior for sports apps:** lightweight, fast real-time updates, minimal setup overhead.

**References:**
- [Zustand comprehensive comparison](https://medium.com/@msmt0452/zustand-vs-redux-toolkit-the-complete-guide-to-state-management-in-react-4dce420741b4)
- [2025 state management analysis](https://www.syncfusion.com/blogs/post/react-state-management-libraries)

---

## 5. Navigation

**Recommended:** Expo Router v3 (file-based routing)

### Key Patterns
```
app/
  ├── (tabs)/
  │   ├── _layout.tsx
  │   ├── matches/index.tsx      # Live scores
  │   ├── favorites/index.tsx    # Bookmarked matches
  │   └── settings/index.tsx
  ├── match/
  │   └── [id].tsx              # Dynamic match detail
  └── _layout.tsx
```

### Advantages
- ✅ Deep linking out-of-box (share match URLs)
- ✅ Automatic route generation (no RouteParamList boilerplate)
- ✅ Async routes (bundle splitting by page)
- ✅ Web export capability (SEO, static generation)

**References:**
- [Expo Router intro](https://docs.expo.dev/router/introduction/)
- [Core routing concepts](https://docs.expo.dev/router/basics/core-concepts/)

---

## 6. UI Components & Styling

**Recommended:** Gluestack UI v3 + NativeWind

### Comparison

| Library | Approach | Bundle | Learning | Customization |
|---------|----------|--------|----------|---------------|
| **Gluestack UI** | Utility-first (Tailwind-like) | Small | Easy | **Highest** |
| **NativeWind** | Tailwind CSS compiler | Minimal | Easy | Very high |
| React Native Paper | Material Design | Large | Medium | Medium |
| React Native Elements | Basic components | Small | Easy | Low |

### Recommended Setup
```
Gluestack UI (unstyled components)
    ↓
NativeWind (Tailwind compilation)
    ↓
Custom Tailwind config (brand colors, sports theme)
```

**Benefits for scoring app:**
- Fast design iterations
- Small bundle (critical for React Native)
- Accessible components
- Easy sports-themed customization (icons, badges, scores display)

**References:**
- [Gluestack UI overview](https://gluestack.io/)
- [Best React Native UI libs 2025](https://blog.logrocket.com/best-react-native-ui-component-libraries/)
- [NativeWind advantages](https://www.brilworks.com/blog/best-react-native-ui-libraries/)

---

## 7. Push Notifications

**Recommended:** Expo Notifications + EAS Build

### Requirements
- Development build (Expo Go doesn't support notifications)
- Physical device testing (emulator/simulator unsupported)
- Firebase setup for Android (google-services.json)
- APNs certificate for iOS

### Package Stack
```
expo-notifications      # Request permissions, handle notifications
expo-device            # Check if running on physical device
expo-constants         # Get projectId from app config
EAS Build              # Generate dev build with push capability
```

### Implementation Steps
1. Install libraries: `expo install expo-notifications expo-device expo-constants`
2. Create notification handler (foreground + background)
3. Request user permissions & get ExpoPushToken
4. Configure Firebase (Android) + APNs (iOS)
5. Build with EAS Build
6. Test on physical device

**Key Limitation:** SDK 54+ push notifications require development build (not Expo Go).

**References:**
- [Expo Notifications setup](https://docs.expo.dev/push-notifications/push-notifications-setup/)
- [Using push notifications guide](https://docs.expo.dev/guides/using-push-notifications-services/)

---

## 8. Offline Support & Caching

**Recommended:** WatermelonDB + TanStack Query cache

### Architecture

**For small datasets (< 1000 matches):**
- Use TanStack Query caching + AsyncStorage for simple data
- Sufficient for MVP

**For large datasets / offline-first:**
- WatermelonDB (SQLite-based, reactive, lazy-loading)
- Handles 10k+ records efficiently
- Sync with backend via pull/push endpoints

### Caching Strategy
```
Network-first approach:
1. Load from network (TanStack Query)
2. Store in AsyncStorage/WatermelonDB
3. Fallback to cache if offline
4. Background sync when online
```

### Package Stack
- `@tanstack/react-query` - Query caching & invalidation
- `@react-native-async-storage/async-storage` - Simple KV store
- `watermelondb` (optional) - Full-featured offline DB
- `@react-native-community/netinfo` - Monitor connectivity

**References:**
- [Offline-first WatermelonDB + Supabase](https://supabase.com/blog/react-native-offline-first-watermelon-db)
- [Caching strategies deep dive](https://medium.com/@reactjsbd/caching-strategies-in-react-native-handling-offline-data-and-performance-on-android-devices-08901d6b0c7f)

---

## Recommended Tech Stack Summary

| Layer | Technology | Version | Why |
|-------|-----------|---------|-----|
| **Framework** | Expo | 52.0+ | Fastest MVP, EAS Build, no native config |
| **Navigation** | Expo Router | v3 | File-based, deep linking, web-ready |
| **State** | Zustand + TanStack Query | 4.x / 5.x | Lightweight, real-time, server state separation |
| **Real-time** | WebSocket (react-use-websocket) | Latest | Live scores, push updates |
| **UI Components** | Gluestack UI | v3 | Tailwind-based, highly customizable, small bundle |
| **Styling** | NativeWind | Latest | Compiled Tailwind, zero-runtime cost |
| **API** | API-Football | Free tier | 2000+ leagues, real-time, no CC required |
| **Storage** | AsyncStorage (+ WatermelonDB optional) | Latest | Cache, offline support, sync |
| **Notifications** | Expo Notifications | Latest | Native push, Firebase/APNs integrated |
| **Database** | AsyncStorage + API-Football cache | N/A | MVP-friendly, scales to WatermelonDB later |

---

## Key Packages List

```json
{
  "expo": "52.0.0",
  "expo-router": "^3.0.0",
  "react-native": "0.76.0",
  "zustand": "^4.4.0",
  "@tanstack/react-query": "^5.0.0",
  "react-use-websocket": "^4.4.0",
  "gluestack-ui": "^1.0.0",
  "nativewind": "^2.0.0",
  "@react-native-async-storage/async-storage": "^1.22.0",
  "expo-notifications": "^0.28.0",
  "expo-device": "^5.0.0",
  "expo-constants": "^15.0.0",
  "expo-build-properties": "^0.12.0"
}
```

---

## Architecture Quick Reference

```
┌─────────────────────────────────────────┐
│         Expo Router Navigation          │
│  (matches, favorites, settings routes)  │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│    Gluestack UI + NativeWind (View)     │
│    (Match cards, scores, fixtures)      │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  Zustand Store (UI state)               │
│  - Favorites, filters, settings         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  TanStack Query (Server state + cache)  │
│  - Match data, scores, fixtures         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  WebSocket + API-Football HTTP          │
│  Live updates & periodic refresh        │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│  AsyncStorage (Local persistence)       │
│  Offline fallback & cache layer         │
└─────────────────────────────────────────┘
```

---

## Next Steps

1. **Setup Phase**: Initialize Expo project with router template, configure app.json for notifications
2. **API Integration**: Register API-Football free account, implement rate-limiting wrapper
3. **State Setup**: Create Zustand stores for UI state, TanStack Query hooks for API calls
4. **Navigation**: Build Expo Router structure (matches list, match detail, favorites, settings)
5. **Real-time**: Implement WebSocket connection with fallback polling strategy
6. **UI Build**: Create reusable Gluestack components (MatchCard, ScoreBoard, FixtureList)
7. **Offline Support**: Integrate AsyncStorage caching + offline detection
8. **Notifications**: Configure Expo Notifications with EAS Build for push setup
9. **Testing**: Unit tests (vitest), integration tests (detox), E2E tests via Expo Router deep links
10. **Deploy**: EAS Build for iOS/Android, configure production API credentials

---

## Unresolved Questions

- WebSocket endpoint availability from API-Football free tier (may require HTTP polling as fallback)
- Exact rate limit behavior at scale (verify 100 req/day sufficient for live coverage)
- Firebase/APNs credential management strategy for team collaboration
- WatermelonDB sync strategy if scaling beyond 5000 concurrent matches

