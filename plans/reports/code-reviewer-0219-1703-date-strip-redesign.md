# Code Review — Date Strip Redesign

**Files:** `src/components/date-filter-strip.tsx` · `app/(tabs)/fixtures.tsx`
**Date:** 2026-02-19
**Score: 8.5 / 10**

---

## Overall Assessment

Clean, focused refactor. Both files are well under 200 lines, conventions are respected (inline styles, no React.memo, `isPending` from TanStack Query v5, `@/` path aliases). Logic is straightforward and readable. Two medium bugs and a few low-priority observations noted below.

---

## Critical Issues

None.

---

## High Priority

### 1. `getFixtures` excludes past dates — strips to the left of today show no data

`getFixtures` filters `m.startTime <= cutoff` and only returns `status === 'scheduled'` matches. The strip renders `daysRange=7` days **before** today, but the service never returns historical or past-scheduled fixtures. Selecting any day in the past will always show EmptyState regardless of real data. This is a data-layer contract issue surfaced by the redesign.

**Impact:** Left side of the date strip is permanently empty.
**Fix options:** Either limit `daysRange` to future days only (e.g. `daysStart=0, daysRange=7`), or extend `getFixtures` to include a `from` parameter covering past days.

---

## Medium Priority

### 2. Timezone mismatch: `WEEKDAYS[day.getDay()]` uses local time, `toISO` uses UTC

`toISO(d)` returns `d.toISOString().split('T')[0]` which is UTC-based. `day.getDay()` returns the local-time weekday. For users in UTC+X timezones where local date > UTC date (or UTC-X where local < UTC), the weekday label shown will be off by one from the ISO date used as the key and comparison value.

`formatDayMonth` correctly uses `d.getUTCDate()` / `d.getUTCMonth()`, but `getDay()` on line 76 is the local equivalent — it should be `d.getUTCDay()`.

```tsx
// line 76 — current (wrong in non-UTC zones)
{isCurrentDay ? 'TODAY' : WEEKDAYS[day.getDay()]}

// fix
{isCurrentDay ? 'TODAY' : WEEKDAYS[day.getUTCDay()]}
```

### 3. `today` variable re-created on every render without `useMemo`

Inside `DateFilterStrip`, `today` and the `days` array are recomputed on each render. This is fine when the parent re-renders infrequently, but since `today` is used in the `useEffect` dependency array exclusion (via `eslint-disable`), a `useMemo` or a module-level stable reference would be cleaner and avoids the lint suppression.

---

## Low Priority

### 4. `useEffect` dependency lint suppression

`eslint-disable-line react-hooks/exhaustive-deps` on line 47 hides the fact that `days` (derived from `today`) is used inside the effect. The intent (scroll on mount only) is correct, but the suppression could mask future bugs if the effect is extended. A `useRef` flag or `initialSelectedDate` ref would be more explicit.

### 5. `CompetitionChips` — `gap: 8` + `marginRight: 8` double-spacing

In `fixtures.tsx` line 24, `contentContainerStyle` sets `gap: 8`, and line 34 each chip adds `marginRight: 8`. This results in 16px spacing between chips instead of 8. `marginRight` is a leftover from before `gap` was added. Remove `marginRight: 8` from the chip style.

### 6. `todayISO()` initializer function vs. value

`useState(todayISO)` correctly passes the function (lazy init) — good. No issue, just noting it is intentional.

---

## Positive Observations

- Removing `SectionList` + `groupByDate` in favour of flat single-day filtering is a clean simplification.
- `borderBottomWidth: 3` always reserved prevents layout shift on active toggle — thoughtful detail.
- Constants (`CELL_WIDTH`, `ACTIVE_COLOR`, `INACTIVE_COLOR`) at module scope for easy theming.
- `formatDayMonth` correctly uses UTC accessors for consistency with ISO key — only `getDay()` was missed.
- Both files fit comfortably under 100 lines; no modularization needed.
- `keyExtractor` on `FlatList` uses stable `item.id` — correct.

---

## Recommended Actions

1. **[High]** Decide on past-date data: either restrict the strip to `daysRange=0..7` (future only) or extend `getFixtures` with a `from` parameter. Leaving the left side always empty will confuse users.
2. **[Medium]** Change `day.getDay()` → `day.getUTCDay()` on line 76 of `date-filter-strip.tsx`.
3. **[Low]** Remove `marginRight: 8` from `CompetitionChips` chip style (gap already handles spacing).
4. **[Low]** Consider replacing `eslint-disable` with a `useRef(false)` mount guard for explicitness.

---

## Unresolved Questions

- Should past days on the strip show live/completed matches (status !== 'scheduled')? If so, `getFixtures` needs a broader query and the date-filter approach needs to account for all statuses, not just scheduled.
- Is `daysRange=7` (15 cells total) the intended final value, or was `3` the default for a reason? At 52px/cell a 15-cell strip is 780px — wider than most phone screens, which is fine for a horizontal scroll but worth confirming with design.
