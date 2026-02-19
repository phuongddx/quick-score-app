# Phase 1: Update DateFilterStrip Component

## Overview

- **Priority**: P2
- **Status**: completed
- **Effort**: 45m
- **File**: `src/components/date-filter-strip.tsx`

## Key Insights

- Current component already has: horizontal ScrollView, date generation logic, auto-scroll via `scrollToIndex`, `selectedDate`/`onDateChange` props
- Keep same prop interface -- no breaking changes
- Replace visual style only; keep behavioral logic intact

## Requirements

### Functional
- Each cell displays two lines: weekday abbreviation (top) + date in DD.MM. format (bottom)
- Today's cell shows "TODAY" instead of weekday abbreviation
- Active cell: red text (#E53935) + 3px red underline bar at bottom of cell
- Inactive cell: muted gray text (#8B949E), no underline
- Horizontally scrollable with auto-scroll to selected date on mount

### Non-functional
- Keep file under 200 lines
- Use inline styles (StyleSheet.create or inline objects)
- No React.memo wrapping

## Related Code Files

- **Modify**: `src/components/date-filter-strip.tsx`

## Implementation Steps

1. **Update weekday formatting helper**
   - Create `getWeekdayAbbr(date: Date): string` returning 2-letter uppercase: MO/TU/WE/TH/FR/SA/SU
   - Create `isToday(date: Date): boolean` helper
   - Create `formatDayMonth(date: Date): string` returning "DD.MM." format

2. **Replace label rendering**
   - Remove current single-line label ("Yesterday"/"Today"/"Tomorrow"/full date)
   - Render two `<Text>` elements stacked vertically inside each cell:
     - Top: `isToday(date) ? "TODAY" : getWeekdayAbbr(date)`
     - Bottom: `formatDayMonth(date)`

3. **Update active/inactive styles**
   - Remove blue pill background (`backgroundColor` on active)
   - Active state:
     - Text color: `#E53935`
     - Bottom border: `borderBottomWidth: 3, borderBottomColor: '#E53935'`
   - Inactive state:
     - Text color: `#8B949E`
     - No bottom border (or transparent)

4. **Adjust cell container styles**
   - Each cell: `paddingHorizontal: 12, paddingVertical: 8, alignItems: 'center'`
   - Remove `borderRadius` and background color styles
   - Add `borderBottomWidth: 3` to all cells, with `borderBottomColor: 'transparent'` for inactive (prevents layout shift)

5. **Keep auto-scroll logic**
   - Existing `useEffect` + `scrollTo` logic should work unchanged
   - Verify `itemWidth` constant matches new cell sizing

## Todo List

- [x] Add weekday/date formatting helpers
- [x] Replace single-line label with two-line layout
- [x] Apply red active / gray inactive styles
- [x] Remove pill background, add underline bar
- [x] Verify auto-scroll still works with new cell widths
- [x] Manual test: scroll, tap different dates, verify "TODAY" label

## Success Criteria

- Cells render two lines: weekday abbreviation + DD.MM. date
- Today shows "TODAY" text
- Active = red text + red underline; inactive = gray text, no underline
- Horizontal scroll + auto-scroll to selected date works
- No layout shift between active/inactive states
- File stays under 200 lines

## Risk Assessment

- **Cell width change** may break auto-scroll offset calculation -- verify `itemWidth` constant after style change
- **"TODAY" vs 2-char abbreviation** width difference -- use fixed cell width or `minWidth` to prevent jitter
