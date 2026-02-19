# Flashscore & Competitive Analysis Report
**Date:** 2026-02-19 | **Research Focus:** Football app features, UX patterns, real-time infrastructure

## Executive Summary
Analyzed Flashscore (4.9★, 14K reviews), SofaScore, OneFootball, and FotMob. MVP priority: live scores + match details + lineups + notifications. Real-time update cadence: 2-5 sec standard; users abandon apps with >5 sec delays.

---

## FEATURE PRIORITY FOR MVP (Priority Tier)

### Tier 1: Core Match Data (Days 1-2)
- **Live Score Display** - Match status, current score, last updated timestamp
- **Match Details** - Teams, lineups, substitutions, goals/cards log
- **Push Notifications** - Goal alerts, red cards, match start (Firebase/OneSignal)

### Tier 2: Context & Navigation (Days 3-4)
- **Standings/Tables** - Live league positions, points
- **Fixtures** - Today's matches, upcoming 7 days (sorted by kick-off time)
- **Live Standings** - Real-time table updates linked to matches

### Tier 3: Advanced UX (Days 5-7)
- **Player Stats** - xG, xA, shots, passes, touches (Flashscore differentiator)
- **Favorites System** - Save teams/competitions for quick access
- **Live Commentary** - Text updates when unavailable for video
- **Wear OS Support** - Smartwatch notifications (FotMob)

### Tier 4: Revenue/Retention (Post-MVP)
- **Betting Odds Display** - Partner bookmaker listings (geo-targeted)
- **Video Highlights** - Licensed or user-generated (FotMob feature)
- **Player Tracking** - Favorite player notifications (Flashscore)

---

## KEY SCREENS TO IMPLEMENT

| Screen | Purpose | Key Elements |
|--------|---------|--------------|
| **Home/Scores** | Live match feed | Match cards (score, time, status), filters (competition/date) |
| **Match Detail** | Full game context | Lineups, stats, timeline, commentaries |
| **Standings** | League positions | Table, top scorers, form indicators |
| **Fixtures** | Schedule view | Date-grouped matches, team filters |
| **Favorites** | Quick access | Saved teams/leagues, pinned matches |
| **Settings** | Notification config | Alert types, favorite teams, dark mode |

---

## DATA REQUIREMENTS

### Real-Time Data
```
Live Match: {
  match_id, status (pre/live/ended), score_home, score_away,
  current_minute, last_event_time, live_updates_url
}

Events: {goal, yellow_card, red_card, substitution, corner,
penalty, var_review, injury, stoppage_time}

Lineup: {
  team_id, formation, players[], captain, coach, bench[]
}
```

### Static Data
- League metadata (competition_id, rounds, format)
- Team profiles (name, crest, venue, coach)
- Player profiles (position, number, nationality)

### Update Frequency
- **Live matches:** WebSocket push every 2-5 sec (events only)
- **Standings:** HTTP poll every 30 sec
- **Fixtures:** HTTP poll every 5 min

---

## NAVIGATION & UX PATTERNS (Worth Replicating)

### Layout Architecture
- **Bottom Tab Bar** (Flashscore/FotMob pattern):
  - Scores (active by default)
  - Competitions
  - News
  - Account

- **Horizontal Scrollable Filters** (match date, competition)
- **Match Card Stack** - Swipeable cards on mobile

### Real-Time Indicators
- **Pulsing badge** on match card when live event occurs
- **Timeline bar** showing event density (goals clustered = visual cue)
- **Last update timestamp** ("Updated 2 seconds ago")

### Personalization (Flashscore strength)
- One-tap favorite toggle per team
- Persistent favorites bar at top of scores screen
- Custom alert presets (goals only, all events, none)

### Notification Strategy
- **High-impact only:** Goals, red cards, match start
- **Batching:** Group 3+ quick events (e.g., 2 goals in 30 sec = 1 notification)
- **Quiet hours:** Respect DND settings (prevent early morning notifications)

---

## COMPETITIVE DIFFERENTIATION INSIGHTS

| Feature | Flashscore | SofaScore | OneFootball | FotMob |
|---------|-----------|-----------|------------|--------|
| Player Ratings | ✓ Unique | ✗ | ✗ | ✗ |
| xG/xA Display | ✓ | ✓ Detailed | ✗ | ✓ |
| Predictions | ✓ Line-ups | ✗ | ✗ | ✗ |
| News Integration | ✓ | Limited | ✓ | ✓ |
| Video Highlights | ✗ | ✗ | ✓ | ✓ |
| Betting Odds | ✓ | ✗ | ✗ | ✗ |
| Smartwatch | ✗ | ✗ | ✗ | ✓ |

**MVP Recommendation:** Match Flashscore's core (live scores + lineups + player ratings) but add FotMob's visual polish (shot maps, heat maps). Avoid news/video MVP (resource-intensive).

---

## TECHNICAL INFRASTRUCTURE PATTERNS

### Real-Time Update Architecture
- **WebSocket** for live match data (server-sent events acceptable as fallback)
- **In-memory cache** for active matches (Redis suggested)
- **CDN** for static assets (team crests, logos)
- **Long-term DB** (PostgreSQL) for finished matches, player records

### Push Notification Stack
- **Provider:** Firebase Cloud Messaging (FCM) + APNs
- **Filtering:** Server-side: only send if user subscribed to team/competition
- **Retry logic:** Exponential backoff for delivery failures
- **Analytics:** Track delivery rate, click-through rate per alert type

### Performance Benchmarks
- Latency target: <3 sec from event to user notification
- DB query: <100ms for match detail (with indexing)
- API response: <200ms for score update
- Push delivery: 95%+ within 30 seconds of event

---

## SOURCES & REFERENCES
- [Flashscore App Store](https://apps.apple.com/vn/app/flashscore-live-scores-news/id766443283)
- [Sportmonks: Real-time Livescore Architecture](https://www.sportmonks.com/blogs/building-a-real-time-livescore-app-with-a-football-api-best-practices/)
- [FotMob App](https://apps.apple.com/us/app/fotmob-soccer-live-scores/id488575683)
- [SofaScore vs OneFootball Comparison](https://www.saashub.com/compare-sofascore-vs-onefootball)

---

## UNRESOLVED QUESTIONS
1. **Data Source:** Which football API provider (Sportmonks, RapidAPI Football-Data, ESPN)? Cost varies 10x-100x.
2. **Licensing:** Video highlights require licensing; static data (scores/stats) generally free via APIs.
3. **MVP Scope:** First league focus (Premier League only) or multi-league from day 1?
4. **Monetization:** Betting affiliate revenue only, or freemium premium tier?
