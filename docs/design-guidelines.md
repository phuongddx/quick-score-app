# Quick Score - Design Guidelines

> Football live score app. Dark-first. Information-dense. Inspired by FotMob/Flashscore.

---

## 1. Color Palette

### Core

| Token | Hex | Usage |
|---|---|---|
| `color-bg-primary` | `#0D1117` | Main background |
| `color-bg-surface` | `#161B22` | Cards, sheets, panels |
| `color-bg-surface-alt` | `#1C2128` | Alternate rows, hover states |
| `color-bg-elevated` | `#21262D` | Modals, bottom sheets |
| `color-border` | `#30363D` | Dividers, card borders |
| `color-border-subtle` | `#21262D` | Section separators |

### Text

| Token | Hex | Usage |
|---|---|---|
| `color-text-primary` | `#E6EDF3` | Main text, team names, scores |
| `color-text-secondary` | `#8B949E` | Match time, competition name |
| `color-text-muted` | `#484F58` | Placeholder, disabled |
| `color-text-inverse` | `#0D1117` | Text on accent backgrounds |

### Accent

| Token | Hex | Usage |
|---|---|---|
| `color-accent-live` | `#00C853` | Live badge, live score highlight |
| `color-accent-live-dim` | `#00C85320` | Live match row background tint |
| `color-accent-goal` | `#00E676` | Goal flash animation target |
| `color-accent-danger` | `#FF3D3D` | Red card, danger alerts |
| `color-accent-warning` | `#FFB300` | Yellow card |
| `color-accent-blue` | `#2196F3` | Selected tab, CTA |
| `color-accent-blue-dim` | `#2196F320` | Selected tab background |

### Data Colors (Standings)

| Token | Hex | Usage |
|---|---|---|
| `color-data-cl` | `#00C853` | Champions League zone |
| `color-data-el` | `#FF9800` | Europa League zone |
| `color-data-ecl` | `#9C27B0` | Conference League zone |
| `color-data-relegation` | `#FF3D3D` | Relegation zone |

---

## 2. Typography Scale

### Fonts

**Primary:** `Inter` (system fallback: `-apple-system`, `SF Pro`, `Roboto`)
**Score/Time:** `Roboto Mono` or `SF Mono` — monospace ticker feel

```css
/* Google Fonts import */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Roboto+Mono:wght@500;700&display=swap');

font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
font-family-mono: 'Roboto Mono', 'SF Mono', 'Fira Code', monospace;
```

### Scale

| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `text-score` | 28px | 700 | 1.0 | Match score (H - A) |
| `text-score-sm` | 22px | 700 | 1.0 | Compact score |
| `text-heading-lg` | 18px | 600 | 1.3 | Section headers |
| `text-heading-md` | 16px | 600 | 1.4 | Card titles, team names |
| `text-body` | 14px | 400 | 1.5 | General body text |
| `text-body-sm` | 13px | 400 | 1.5 | Secondary info |
| `text-label` | 12px | 500 | 1.2 | Pills, badges, tabs |
| `text-caption` | 11px | 400 | 1.2 | Fine print, minute |
| `text-time` | 13px | 500 | 1.0 | Match time (mono) |

---

## 3. Spacing System

8px base grid.

| Token | Value | Usage |
|---|---|---|
| `space-1` | 4px | Micro gaps (icon to label) |
| `space-2` | 8px | Compact padding |
| `space-3` | 12px | Card inner padding |
| `space-4` | 16px | Standard padding |
| `space-5` | 20px | Section spacing |
| `space-6` | 24px | Large section gaps |
| `space-8` | 32px | Major section breaks |

### Component Sizing

| Component | Height |
|---|---|
| Bottom tab bar | 56px (+ safe area) |
| Date strip | 56px |
| Competition header | 40px |
| Match card | 64px |
| Match card (with events) | 80px+ |
| Team crest | 28px × 28px |
| Live badge (dot) | 8px × 8px |
| Card/red card pill | 18px × 22px |

---

## 4. Component Patterns

### 4.1 Match Card

```
┌─────────────────────────────────────────────┐
│ [Crest] Team Name          Score  [Crest]   │  64px
│ [Crest] Team Name          Score  [Crest]   │
│          42'  ●LIVE    [YC] [RC]            │  (events row)
└─────────────────────────────────────────────┘
```

- Team names: `text-heading-md`, `color-text-primary`
- Score: `text-score-sm`, `color-text-primary`, centered
- Score font: monospace for digit alignment
- Live time: `text-time` (mono), `color-accent-live`
- Live dot: 8px circle, `color-accent-live`, pulsing animation
- Card pills: YC = `#FFB300` bg, RC = `#FF3D3D` bg, white text 11px
- Live row background: subtle `color-accent-live-dim` tint
- Tap target: full card width, minimum 64px height

### 4.2 Competition Header (Collapsible)

```
┌─────────────────────────────────────────────┐
│ [Flag] PREMIER LEAGUE  England    ›  3 live │  40px
└─────────────────────────────────────────────┘
```

- Background: `color-bg-surface`
- Text: `text-label` all-caps, `color-text-secondary`
- Live count badge: `color-accent-live` text
- Chevron rotates 180° when collapsed

### 4.3 Date Filter Strip

```
─────────────────────────────────────────────────
 Fri 14  Sat 15  [Sun 16]  Mon 17  Tue 18  ...
─────────────────────────────────────────────────
```

- Horizontally scrollable, no scroll indicator
- Active date: pill with `color-accent-blue` bg, white text
- Inactive: `color-text-secondary`
- Snap to center on scroll
- Height: 56px with 12px vertical padding

### 4.4 Live Badge

```css
/* Pulsing live indicator */
@keyframes live-pulse {
  0%   { opacity: 1;   transform: scale(1); }
  50%  { opacity: 0.4; transform: scale(1.5); }
  100% { opacity: 1;   transform: scale(1); }
}

.live-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00C853;
  animation: live-pulse 1.5s ease-in-out infinite;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .live-dot { animation: none; }
}
```

### 4.5 Score Flash (Goal Animation)

```css
@keyframes goal-flash {
  0%   { background-color: transparent; }
  20%  { background-color: #00C85340; }
  100% { background-color: transparent; }
}

.score-updated {
  animation: goal-flash 1.2s ease-out forwards;
}
```

### 4.6 Bottom Tab Bar

```
┌──────────────────────────────────────────────┐
│  [Scores]  [Fixtures]  [Standings]  [Fav]  [Settings] │
└──────────────────────────────────────────────┘
```

- Active: icon + label, `color-accent-blue`
- Inactive: icon only or icon + label, `color-text-muted`
- Live scores tab: green dot badge when live matches exist
- Border top: `color-border`
- Touch target: full tab width × 56px + safe area

### 4.7 Standings Row

```
  #  Team                  P   W  D  L  GD  Pts
  1  [Crest] Man City     28  20  5  3  +42  65
```

- Column widths fixed with monospace digit alignment
- Highlight current user's saved team (subtle blue left border)
- Zone color: 3px left border on position cell
- Alternate row backgrounds for readability

### 4.8 Stat Bar (Match Detail)

```
  64%  ████████████▓▓▓▓▓  36%
       Ball Possession
```

- Home stat left-aligned (blue), away right-aligned (gray)
- Bar fills proportionally
- Label centered below bar
- Home color: `color-accent-blue`, Away: `color-text-secondary`

---

## 5. Animation Specs

| Animation | Duration | Easing | Trigger |
|---|---|---|---|
| Live dot pulse | 1.5s | ease-in-out | Always (while live) |
| Score flash | 1.2s | ease-out | Score update |
| Card press | 100ms | ease-in | onPressIn |
| Tab switch | 200ms | ease-out | Tab tap |
| Section collapse | 250ms | ease-in-out | Tap header |
| Score number update | 300ms | ease-out | Goal |
| Bottom sheet open | 350ms | ease-out | Tap match |
| Date strip snap | 200ms | ease-out | Scroll release |
| Live badge text fade | 400ms | ease-in-out | Match start |

All animations must check `prefers-reduced-motion` and use instant transitions if set.

---

## 6. Iconography

- Library: Lucide Icons (React Native compatible)
- Size: 20px standard, 24px navigation tabs, 16px inline
- Color: inherit from parent text color
- No emoji icons

### Key Icons

| Icon | Usage |
|---|---|
| `play-circle` | Live match |
| `calendar` | Fixtures tab |
| `trophy` | Standings |
| `heart` / `heart-filled` | Favorites |
| `settings` | Settings |
| `chevron-right` | Competition header |
| `bell` | Notification toggle |
| `refresh-cw` | Refresh |

---

## 7. Accessibility

- Minimum touch target: 44×44px (iOS HIG) — enforce with `minHeight: 44`
- Color contrast: all text ≥ 4.5:1 on background
- Live indicators: never rely on color alone — include text "LIVE"
- Card/red card pills: include text "YC"/"RC" alongside color
- Reduce motion: check `AccessibilityInfo.isReduceMotionEnabled()`
- Screen reader: meaningful `accessibilityLabel` on match cards
- Focus management: tab order matches visual layout

---

## 8. Dark Theme Implementation Notes

### React Native
```javascript
// Theme tokens (StyleSheet / styled-components)
const colors = {
  bgPrimary:    '#0D1117',
  bgSurface:    '#161B22',
  bgSurfaceAlt: '#1C2128',
  bgElevated:   '#21262D',
  border:       '#30363D',
  borderSubtle: '#21262D',
  textPrimary:  '#E6EDF3',
  textSecondary:'#8B949E',
  textMuted:    '#484F58',
  accentLive:   '#00C853',
  accentLiveDim:'rgba(0,200,83,0.12)',
  accentDanger: '#FF3D3D',
  accentWarning:'#FFB300',
  accentBlue:   '#2196F3',
  accentBlueDim:'rgba(33,150,243,0.12)',
};
```

### StatusBar
- Style: `light-content`
- Background: `#0D1117` (match app bg)

---

## 9. Data-Dense Layout Principles

1. **Compact cards**: 64px match cards allow ~10 visible matches without scrolling
2. **No wasted whitespace**: 12px card padding (not 16px+)
3. **Fixed column widths**: standings columns never reflow — monospace digits
4. **Section headers as dividers**: competition headers replace explicit dividers
5. **Inline metadata**: cards/subs/time within the match card row, not separate rows
6. **Sticky headers**: date strip and competition headers sticky on scroll
7. **Progressive disclosure**: match card → tap → full detail (bottom sheet or new screen)
