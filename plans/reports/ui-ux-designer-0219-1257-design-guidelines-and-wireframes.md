# UI/UX Design: Guidelines + Wireframes — Quick Score

Date: 2026-02-19 | Scope: Design system + 5 HTML wireframes

---

## Deliverables

### 1. Design Guidelines
`/docs/design-guidelines.md` — 10.5KB

Sections:
- Color palette (bg, surface, text, accent, data-zone tokens)
- Typography scale (Inter + Roboto Mono, 9 size/weight tokens)
- Spacing system (8px base grid, component sizing table)
- Component patterns (match card, competition header, date strip, live badge, score flash, bottom tabs, standings row, stat bar)
- Animation specs (8 interactions with duration + easing)
- Iconography (Lucide, key icons table)
- Accessibility notes (touch targets, contrast, reduce-motion)
- Dark theme React Native token map

### 2. Wireframes

| File | Size | Screen |
|---|---|---|
| `wireframe-scores-home.html` | 31KB | Live Scores feed |
| `wireframe-match-detail.html` | 35KB | Match detail (events, lineups, stats) |
| `wireframe-standings.html` | 34KB | League table (all 20 PL teams) |
| `wireframe-fixtures.html` | 32KB | Upcoming fixtures |
| `wireframe-favorites.html` | 32KB | Saved teams + competitions |

All: self-contained HTML, embedded CSS, dark theme, 375px mobile viewport, Premier League sample data, annotation block at bottom.

---

## Design Decisions

### Colors
Deviated slightly from the design-system search output (which suggested `#3B82F6` blue primary for sports). Kept the brief's `#00C853` live green + `#FF3D3D` danger as primary accents. Used GitHub-dark palette (`#0D1117` / `#161B22` / `#21262D`) as base — proven dark mode with strong contrast at 375px density.

### Typography
Selected **Inter** (not Barlow Condensed from search output) — better readability at dense information sizes (12–14px). **Roboto Mono** for scores/times — critical for digit alignment in standings and score display.

### Layout
- 64px match card height → fits ~10 cards without scroll on 812px viewport
- 40px competition headers → sticky, collapsible, low visual weight
- 56px date strip → finger-friendly but compact
- 44px standings rows → meets iOS HIG touch target minimum exactly

### Key UX Patterns Implemented

**Live Scores (scores-home)**
- Date strip: 7 days scrollable, active=blue pill, dots showing match days
- Competition headers: sticky, flag + name + live count + chevron
- Match cards: green tint on live rows, pulsing 8px dot, event pills (YC/RC/goal)
- Tab badge: live match count (14) in green on active Scores tab

**Match Detail**
- Hero: 48px Roboto Mono score, live status pill below
- Tab strip: Events / Lineups / Stats / H2H / Odds (5 tabs)
- Timeline: centre divider, home=left, away=right, goal rows highlighted
- Live NOW marker: pulsing green divider at current minute
- Pitch viz: dark green gradient, team-colored 32px player dots
- Stat bars: proportional fill, home=blue, away=gray, mono values

**Standings**
- Zone borders: 3px left edge (CL=green, EL=orange, ECL=purple, REL=red)
- Highlighted row: user's saved team — blue dim bg, bold name, blue pts
- Live match inline: pulsing dot + minute on row if team playing now
- Form dots: 5-match W/D/L — 6px circles
- Pos change arrows: green up, red down, gray same

**Fixtures**
- Date strip with match-count dot per day
- Filter chips: competition multi-select, horizontal scroll
- Kickoff time: blue=today, gray=future
- Odds row: optional 1X2 mono pills below team names
- PPD badge: dims row to 0.7 opacity + amber "PPD" tag
- Notification bell: filled=active, outline=inactive

**Favorites**
- Segment control: Teams / Competitions / Players
- Live banner: auto-shows when saved teams playing — compact match rows
- Team cards: crest + standings position + league zone badge + form dots + next match strip
- Comp cards: leader row (top team + pts)
- Add dashed row: blue on hover → opens search
- Push notification CTA: links to per-team alert settings

---

## Animation Specs Summary

| Interaction | Duration | Notes |
|---|---|---|
| Live dot pulse | 1.5s ease-in-out ∞ | `prefers-reduced-motion` stops it |
| Score flash (goal) | 1.2s ease-out | color → #00E676 → back |
| Card press | 100ms ease-in | background color shift only |
| Tab switch | 200ms ease-out | color + opacity |
| Section collapse | 250ms ease-in-out | chevron + max-height |
| Bottom sheet open | 350ms ease-out | translateY |
| Date snap | 200ms ease-out | scroll-snap |

---

## Files Created

```
docs/
├── design-guidelines.md          ← NEW
└── wireframes/
    ├── wireframe-scores-home.html     ← NEW
    ├── wireframe-match-detail.html    ← NEW
    ├── wireframe-standings.html       ← NEW
    ├── wireframe-fixtures.html        ← NEW
    └── wireframe-favorites.html       ← NEW
```

---

## Unresolved Questions

1. **Odds display**: shown in Fixtures wireframe — needs product decision on default on/off per region (geo-fencing for gambling regulations).
2. **Players tab** (Favorites): segment control shows "Players" tab but not implemented — scope unclear for MVP.
3. **Settings screen**: not in scope but referenced by bottom tab — design TBD.
4. **Team crests**: wireframes use color+text abbreviation placeholders. Real implementation needs SVG/PNG crest assets from API-Football or a CDN.
5. **Landscape orientation**: all wireframes portrait-only. Tablet/landscape layout not designed.
6. **Notification permission flow**: first-time push permission prompt UX not designed.
