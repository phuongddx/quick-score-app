# Quick Score

A React Native football live score app built with Expo 52+.

## Features
- Live scores for 5 European leagues (PL, La Liga, Bundesliga, Serie A, Ligue 1)
- Fixtures & upcoming schedule with date navigation
- League standings with zone indicators
- Favorite teams & competitions tracking
- Match detail with events, lineups, stats & H2H
- Dark theme throughout

## Tech Stack
- **Expo SDK 52+** (managed workflow)
- **Expo Router v4** (file-based navigation)
- **NativeWind v4** (Tailwind CSS for React Native)
- **TanStack Query v5** (server state)
- **Zustand v5** (UI state + persistence)
- **Gluestack UI v3** (Switch/Modal primitives)
- **Vitest** (unit tests)

## Getting Started

```bash
npm install
npm start
```

## Project Structure

```
app/               # Expo Router screens
  (tabs)/          # Bottom tab screens
  match/[id].tsx   # Match detail dynamic route
src/
  components/      # Reusable UI components
  hooks/           # TanStack Query hooks
  stores/          # Zustand stores
  services/        # Data services (mock + API stub)
  types/           # TypeScript interfaces
  data/            # Mock data
```
