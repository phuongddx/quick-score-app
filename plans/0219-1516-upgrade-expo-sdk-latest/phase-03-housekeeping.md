# Phase 03: Housekeeping

## Context Links

- [Plan Overview](./plan.md)
- [Phase 02: Fix Breaking Changes](./phase-02-fix-breaking-changes.md)

## Overview

- **Priority:** P2
- **Status:** complete
- **Effort:** 45min
- **Description:** Clean up deprecated devDeps, enable React Compiler, remove React.memo wrappers

## Key Insights

- `@babel/core` in devDependencies is implicit via `babel-preset-expo`. Safe to remove.
- React Compiler (SDK 54+) auto-memoizes components. Eliminates need for manual `React.memo`.
- 7 components use `React.memo`. After enabling React Compiler, these are redundant.
- React Compiler is opt-in via `app.json` experiments field. Low risk, high benefit.
- Removing React.memo is optional cleanup but reduces code noise and lets Compiler optimize freely.

## Requirements

### Functional
- React Compiler enabled and working (no runtime regressions)
- All 7 components still render correctly without React.memo

### Non-functional
- Cleaner package.json (no implicit deps)
- Components are simpler (no wrapper functions)

## Architecture

No architecture changes. Code simplification only.

## Related Code Files

### Package Cleanup
| File | Action |
|------|--------|
| `package.json` | Remove `@babel/core` from devDependencies |

### React Compiler Config
| File | Action |
|------|--------|
| `app.json` | Add `experiments.reactCompiler: true` |

### React.memo Removal (7 files)
| File | Component | Line |
|------|-----------|------|
| `src/components/stat-bar.tsx` | StatBar | 11 |
| `src/components/match-card.tsx` | MatchCard | 52 |
| `src/components/team-crest.tsx` | TeamCrest | 19 |
| `src/components/live-indicator.tsx` | LiveIndicator | 9 |
| `src/components/competition-header.tsx` | CompetitionHeader | 12 |
| `src/components/score-board.tsx` | ScoreBoard | 23 |
| `src/components/fixture-item.tsx` | FixtureItem | 24 |

## Implementation Steps

### Step 1: Remove @babel/core from devDependencies

In `package.json`, remove this line from `devDependencies`:

```diff
- "@babel/core": "^7.25.2",
```

Then run:

```bash
npm install --legacy-peer-deps
```

Babel is provided transitively by `babel-preset-expo`. Explicit dep is unnecessary.

### Step 2: Enable React Compiler in app.json

Update `app.json` experiments section:

```json
"experiments": {
  "typedRoutes": true,
  "reactCompiler": true
}
```

React Compiler auto-memoizes components, hooks, and JSX at build time. No runtime cost. Available SDK 54+.

### Step 3: Remove React.memo Wrappers (7 files)

For each file in the table above, apply this transform:

```diff
- export const ComponentName = React.memo(function ComponentName(props) {
+ export function ComponentName(props) {
    // body unchanged
- });
+ }
```

Also check if `import React from 'react'` can be removed (only if no other `React.*` usage remains). Most files import hooks directly from `'react'`, so the default import is likely removable.

### Step 4: Verify No Import Breakage

After removing React.memo, check that all imports in other files still resolve. These components use named exports, so import syntax is unchanged:

```typescript
import { MatchCard } from '@/components/match-card';
// Still works -- named export unchanged
```

### Step 5: Run TypeScript Check

```bash
npx tsc --noEmit
```

Confirm no type errors from export pattern change (const -> function declaration).

## Todo List

- [ ] Remove `@babel/core` from devDependencies
- [ ] Run `npm install --legacy-peer-deps`
- [ ] Add `reactCompiler: true` to app.json experiments
- [ ] Remove React.memo from `stat-bar.tsx`
- [ ] Remove React.memo from `match-card.tsx`
- [ ] Remove React.memo from `team-crest.tsx`
- [ ] Remove React.memo from `live-indicator.tsx`
- [ ] Remove React.memo from `competition-header.tsx`
- [ ] Remove React.memo from `score-board.tsx`
- [ ] Remove React.memo from `fixture-item.tsx`
- [ ] Clean up unused `import React` where applicable
- [ ] Run `npx tsc --noEmit` to verify

## Success Criteria

- `@babel/core` no longer in devDependencies
- app.json contains `reactCompiler: true`
- All 7 components export as plain function declarations (no React.memo)
- `npx tsc --noEmit` exits 0
- Named imports in all consuming files still resolve

## Risk Assessment

| Risk | Likelihood | Mitigation |
|------|-----------|------------|
| React Compiler causes runtime regression | Low | Test app thoroughly in phase 04 |
| Removing React.memo causes perf regression | Very Low | React Compiler handles memoization |
| Import breakage from const -> function | None | Named exports identical either way |
| Removing @babel/core breaks build | Very Low | Provided transitively by babel-preset-expo |

## Security Considerations

- No security impact. Code cleanup only.

## Next Steps

- Proceed to [Phase 04: Verify & Test](./phase-04-verify-and-test.md)
- If React Compiler causes issues, revert `reactCompiler: true` and keep React.memo
