# Questline

Questline is a responsive habit-game prototype that turns daily routines into quests. Complete a quest to earn coins and XP, create a custom quest, and try a short battle flow. I built it to explore whether game feedback can make habit tracking more engaging.

## Try the prototype

Requirements: Node.js 22.13 or newer and npm.

```bash
npm ci
npm run dev
```

Open the local URL printed by the development server. `npm run build` checks the production bundle, and `npm run lint` runs ESLint.

## What works

- Complete the supplied daily quests and see coins, XP, and progress update.
- Add a custom quest and complete it during the same session.
- Play through a short, scripted battle interaction.
- Explore a responsive dashboard and mobile navigation.

The state currently lives in React memory. Refreshing the page resets quests and rewards. The leaderboard, opponent, and squad matchmaking are sample content; there are no real accounts, shared rankings, multiplayer sessions, or durable database records. The repository contains optional D1/Drizzle starter files, but the app does not use a database yet.

## Implementation

The core interaction is in [`app/page.tsx`](app/page.tsx), with styling in [`app/globals.css`](app/globals.css). The UI uses React, TypeScript, Tailwind CSS, and Vinext. The included project scaffolding supports local development and build tooling.

## Next engineering milestones

1. Extract quest state and reward rules into small testable modules.
2. Persist user-owned quests and progress with an explicit data model.
3. Replace sample leaderboard and matchmaking content only after real user accounts and server-side rules exist.
4. Add interaction tests for creation, completion, refresh, and error states.

This is a product prototype, not a released multiplayer habit platform.
