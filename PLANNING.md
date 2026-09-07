# Fitness Tracker Planning Document

## Component Hierarchy

```
App
├── Navbar (sticky; links to all routes; active styling)
├── Routes
│   ├── Home → Header, featured Cards, AudioPlayer
│   ├── ExercisesPage → SearchBar, ExerciseFilter, ExerciseList → ExerciseCard (Badge, Button)
│   ├── ExerciseDetail (/exercises/:id) → VideoPlayer, Modal
│   ├── WorkoutPlannerPage → WorkoutPlanner → DayCard × 7
│   ├── HistoryPage → WorkoutLog → LogEntry
│   ├── ProgressPage → ProgressChart
│   └── NotFound
└── Footer
```

Nesting example: App → ExercisesPage → ExerciseList → ExerciseCard (3+ levels).

## Components to Create

- Navigation: Navbar
- UI: Button, Card, Badge, SearchBar, Loading, Modal
- Common: Header, Footer
- Exercise: ExerciseCard, ExerciseList, ExerciseDetail, ExerciseFilter
- Planner: WorkoutPlanner, DayCard
- Log: WorkoutLog, LogEntry
- Media: VideoPlayer, AudioPlayer
- Progress: ProgressChart
- Pages: Home, ExercisesPage, WorkoutPlannerPage, HistoryPage, ProgressPage, NotFound

Reusable across pages: Button, Card, Badge, Loading, SearchBar, Modal.

## Props Flow

ExercisesPage passes filtered exercises, `onSelect`, and `onAddToPlan` into ExerciseList then ExerciseCard. WorkoutPlanner passes day name, exercise list, and `onRemove` into each DayCard. HistoryPage passes log entries and `onDelete` into WorkoutLog then LogEntry.

Card and Modal use the `children` prop for composition. Button takes `variant`, `onClick`, and `type`. Badge takes `label` and `difficulty`. Calculated counts, dynamic styles, and conditional labels are passed as expression props.

PropTypes will be added on ExerciseCard, Button, Card, and DayCard. Defaults: Button `variant`, SearchBar `placeholder`, Badge `label`.

## Data Flow

Parent-to-child data uses props. Child-to-parent updates use callback props (`onSelect`, `onAdd`, `onRemove`, `onLog`). Siblings communicate through parent state: search/filter plus list; weekly plan plus day cards; history logs plus progress chart.

Data is transformed before it reaches children: filter and sort exercises, group logs by date, and compute progress totals.

## State Management

`useState` lives on the page or container that owns the data. Search, filters, and sort stay on ExercisesPage. The weekly plan stays on WorkoutPlannerPage. Workout logs are read by HistoryPage and ProgressPage through shared localStorage helpers so siblings stay in sync without deep prop drilling.

`useEffect` loads and saves persisted data, sets up media, and runs route-based effects. Two persistence features: weekly plan and workout history.

## Testing Strategy

- Component tests: render, props, and clicks for Button, Card, ExerciseCard, SearchBar, Navbar
- Integration tests: add-to-plan flow and log-workout flow
- User interaction tests: form change/submit and filter clicks
- Routing tests: navigation links, 404, and `/exercises/:id`
- Hook tests: localStorage load/save through `useEffect`
- Conditional tests: loading, empty, and error states
- Mocks for callbacks and media elements
- Target: 20+ passing tests and greater than 70% component coverage
