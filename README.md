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
- Add custom quests, complete them, and retain quests/rewards after a page refresh in that browser.
- Play through a short, scripted battle interaction.
- Explore a responsive dashboard and mobile navigation.

Quest progress is stored locally in browser `localStorage`; it does not sync across devices and can be cleared by the user or browser. The leaderboard, opponent, and squad matchmaking are sample content; there are no real accounts, shared rankings, multiplayer sessions, or server-side records. The repository contains optional D1/Drizzle starter files, but the app does not use a database yet.

## Implementation

The UI is in [`app/page.tsx`](app/page.tsx); pure quest state and versioned local persistence are in [`lib/questline-state.mjs`](lib/questline-state.mjs), with styling in [`app/globals.css`](app/globals.css). The UI uses React, TypeScript, Tailwind CSS, and Vinext.

## Current limits

The saved state is device/browser-local and the app has no account recovery. The leaderboard, opponent, and squad match are mock data, not evidence of real users or a live multiplayer system. Battle interactions are scripted prototype behavior.

This is a product prototype, not a released multiplayer habit platform.

## Verification

Run `npm test`, `npm run test:e2e`, `npm run lint`, and `npm run build`. The Node tests exercise quest and reward state; the Playwright browser test creates and completes quests, reloads the page, and confirms the saved UI state. GitHub Actions runs these checks on each push and pull request.
