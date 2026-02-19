# Phase 2: Update Fixtures Screen

## Overview

- **Priority**: P2
- **Status**: completed
- **Effort**: 45m
- **File**: `app/(tabs)/fixtures.tsx`

## Key Insights

- Currently uses SectionList grouped by date showing ALL upcoming fixtures
- Need to switch to single-day view filtered by DateFilterStrip selection
- CompetitionChips filter stays -- applied on top of date filter
- Existing `groupByDate()` and `formatDateHeader()` helpers become unnecessary for the main list but can be removed or kept for potential future use

## Requirements

### Functional
- Add DateFilterStrip below CompetitionChips header area
- Default selectedDate: today's ISO date string (YYYY-MM-DD)
- Filter fixtures to only show matches for selectedDate
- Replace SectionList with FlatList (single day = no sections needed)
- Keep EmptyState when no matches for selected date + league filter
- Keep pull-to-refresh behavior

### Non-functional
- Keep file under 200 lines (currently 107)
- Use TanStack Query v5 patterns (`isPending`)

## Related Code Files

- **Modify**: `app/(tabs)/fixtures.tsx`
- **Import**: `@/components/date-filter-strip` (DateFilterStrip)

## Implementation Steps

1. **Add state for selectedDate**
   ```ts
   const [selectedDate, setSelectedDate] = useState(() => {
     const d = new Date();
     return d.toISOString().split('T')[0];
   });
   ```

2. **Import and place DateFilterStrip**
   - Import `DateFilterStrip` from `@/components/date-filter-strip`
   - Render below CompetitionChips in the header area
   - Pass `selectedDate`, `onDateChange={setSelectedDate}`, `daysRange={7}` (full week)

3. **Filter matches by selectedDate**
   - Apply date filter before league filter:
     ```ts
     const dayMatches = matches.filter(m => m.startTime.split('T')[0] === selectedDate);
     ```
   - Then apply existing competition filter on `dayMatches`

4. **Replace SectionList with FlatList**
   - Remove `groupByDate()` call and SectionList
   - Use FlatList with filtered match array
   - Remove `renderSectionHeader` -- no date group headers needed for single-day view
   - Keep existing `renderItem` for match cards
   - Keep `ListEmptyComponent` for EmptyState

5. **Update empty state messaging**
   - When no matches for selectedDate: "No fixtures for this date"
   - Consider combining with league filter context: "No [league] fixtures for this date"

6. **Cleanup**
   - Remove `groupByDate()` helper if no longer used
   - Remove `formatDateHeader()` if no longer used
   - Keep `SectionList` import removal

## Todo List

- [x] Add `selectedDate` state with today default
- [x] Import and render DateFilterStrip component
- [x] Add date filter to match filtering pipeline
- [x] Replace SectionList with FlatList
- [x] Update EmptyState message for date context
- [x] Remove unused helpers (groupByDate, formatDateHeader)
- [x] Manual test: switch dates, combine with league filter, verify empty states

## Success Criteria

- DateFilterStrip visible below CompetitionChips
- Selecting a date filters fixtures to that day only
- League filter + date filter work together
- FlatList renders single-day matches correctly
- EmptyState shows when no matches for selected date
- Pull-to-refresh still works
- File stays under 200 lines

## Risk Assessment

- **Mock data date range** -- mock fixtures may not have data for all days in the strip; verify mock data covers at least today and adjacent days
- **startTime format assumption** -- relies on `startTime` being ISO format with `T` separator; verify in mock data service
