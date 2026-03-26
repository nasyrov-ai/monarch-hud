# Monarch HUD — Gamified Personal Dashboard

A cyberpunk-styled personal HUD that turns daily productivity into a game. Track quests, manage inventory, level up skills, and monitor stats — all through a sci-fi terminal interface.

## Features

- **Quest Log** — track daily and weekly goals as in-game quests
- **Inventory System** — manage tools, resources, and achievements
- **Skill Tree** — visualize skill progression across domains
- **Stat Bars** — real-time progress indicators with animated HUD elements
- **Terminal Aesthetic** — cyan-on-dark cyberpunk UI with glow effects
- **Real-time Updates** — WebSocket integration for live data sync

## Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Next.js App    │────▶│   Supabase DB    │────▶│  Real-time   │
│  (React + TS)    │     │  (quests, stats) │     │  WebSocket   │
└─────────────────┘     └──────────────────┘     └─────────────┘
        │
        ▼
┌─────────────────┐
│  Framer Motion   │
│  (animations)    │
└─────────────────┘
```

## Tech Stack

| Technology | Purpose |
|-----------|---------|
| Next.js 16 | App framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS 4 | Utility-first styling |
| Framer Motion | Animations and transitions |
| Supabase | Database and real-time subscriptions |
| Socket.io | Live data synchronization |
| Lucide React | Icon system |

## Quick Start

```bash
git clone https://github.com/nasyrov-ai/monarch-hud.git
cd monarch-hud
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
monarch-hud/
├── app/
│   ├── api/          # API routes (files, processes, skills)
│   ├── page.tsx      # Main HUD interface
│   └── layout.tsx    # Root layout
├── src/
│   ├── components/   # UI: StatBar, QuestLog, Inventory, Terminal
│   ├── hooks/        # Custom hooks: usePlayerStats, useQuests
│   ├── services/     # Sound effects service
│   ├── lib/          # Supabase client, inventory data
│   └── types/        # TypeScript type definitions
└── tailwind.config.ts
```

## License

MIT
