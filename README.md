[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=24320782&assignment_repo_type=AssignmentRepo)

# FitTrack — Fitness Tracker & Workout Planner

A responsive React app for browsing exercises, planning a weekly routine, logging completed work, and watching progress over time.

## Features

- Search, filter, and sort exercises by category, muscle group, or difficulty
- Exercise detail pages with form cues and a demonstration video
- Motivational audio on the home page
- Weekly planner (Monday–Sunday) saved in `localStorage`
- Workout log with sets, reps, and weight, also saved in `localStorage`
- Progress totals and a daily volume chart
- Sticky responsive navigation and a 404 page

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm test` | Run Jest + React Testing Library |
| `npm run test:coverage` | Tests plus coverage (70% threshold) |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Routes

| Path | Page |
| --- | --- |
| `/` | Home, featured moves, and audio |
| `/exercises` | Exercise library |
| `/exercises/:id` | Exercise detail |
| `/planner` | Weekly workout planner |
| `/history` | Log workouts and view history |
| `/history/:logId` | Single log detail |
| `/progress` | Totals and volume chart |
| `*` | 404 |

Planner and history data stay in this browser (`fitness-tracker-weekly-plan` and `fitness-tracker-workout-logs`).

## Tech

React 19, Vite, React Router, PropTypes, CSS Modules, Jest, and React Testing Library.

Demo videos are unique [Creative Commons clips from Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:Videos_of_people_demonstrating_strength_training_exercises). A few movements use the closest public clip when an exact match is not available. Audio tracks are instrumental samples from [SoundHelix](https://www.soundhelix.com/).

See `PLANNING.md` for component hierarchy, data flow, and the testing plan.
