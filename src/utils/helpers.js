export const WEEK_DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export const STORAGE_KEYS = {
  WEEKLY_PLAN: 'fitness-tracker-weekly-plan',
  WORKOUT_LOGS: 'fitness-tracker-workout-logs',
};

const DIFFICULTY_ORDER = {
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
};

export function createEmptyPlan() {
  return WEEK_DAYS.reduce((plan, day) => {
    plan[day] = [];
    return plan;
  }, {});
}

export function filterExercises(exercises, filters = {}) {
  const { search = '', category = '', muscleGroup = '', difficulty = '' } =
    filters;
  const query = search.trim().toLowerCase();

  // Keep an exercise when it matches the search text and every active filter.
  return exercises.filter((exercise) => {
    const matchesSearch =
      !query ||
      exercise.name.toLowerCase().includes(query) ||
      exercise.category.toLowerCase().includes(query) ||
      exercise.muscleGroup.toLowerCase().includes(query);
    const matchesCategory = !category || exercise.category === category;
    const matchesMuscle = !muscleGroup || exercise.muscleGroup === muscleGroup;
    const matchesDifficulty = !difficulty || exercise.difficulty === difficulty;

    return (
      matchesSearch && matchesCategory && matchesMuscle && matchesDifficulty
    );
  });
}

export function sortExercises(exercises, sortBy = 'name') {
  const sorted = [...exercises];

  // Difficulty uses a ranked order; other fields sort alphabetically.
  sorted.sort((a, b) => {
    if (sortBy === 'difficulty') {
      return (
        (DIFFICULTY_ORDER[a.difficulty] || 0) -
        (DIFFICULTY_ORDER[b.difficulty] || 0)
      );
    }

    const left = String(a[sortBy] || '').toLowerCase();
    const right = String(b[sortBy] || '').toLowerCase();
    return left.localeCompare(right);
  });

  return sorted;
}

export function getUniqueValues(items, key) {
  return [...new Set(items.map((item) => item[key]).filter(Boolean))].sort();
}

export function getExerciseById(exercises, id) {
  return exercises.find((exercise) => exercise.id === Number(id));
}

export function loadFromStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    // Invalid JSON or blocked storage should not crash the app.
    return fallback;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    // Quota errors or private-mode blocks should fail quietly.
    return false;
  }
}

export function groupLogsByDate(logs) {
  return logs.reduce((groups, log) => {
    const date = log.date;

    if (!groups[date]) {
      groups[date] = [];
    }

    groups[date].push(log);
    return groups;
  }, {});
}

export function calculateVolume(sets, reps, weight) {
  return Number(sets) * Number(reps) * Number(weight);
}

export function computeProgressTotals(logs) {
  return logs.reduce(
    (totals, log) => {
      totals.workouts += 1;
      totals.volume += calculateVolume(log.sets, log.reps, log.weight);
      return totals;
    },
    { workouts: 0, volume: 0 }
  );
}

export function normalizePlan(stored) {
  const empty = createEmptyPlan();

  // Old or partial storage still needs every weekday key.
  if (!stored || typeof stored !== 'object') {
    return empty;
  }

  WEEK_DAYS.forEach((day) => {
    empty[day] = Array.isArray(stored[day]) ? stored[day] : [];
  });

  return empty;
}

export function addExerciseToDay(plan, day, exercise) {
  const current = plan[day] || [];

  // Skip duplicates so the same movement is not listed twice on one day.
  if (current.some((item) => item.id === exercise.id)) {
    return plan;
  }

  return {
    ...plan,
    [day]: [
      ...current,
      {
        id: exercise.id,
        name: exercise.name,
        category: exercise.category,
        muscleGroup: exercise.muscleGroup,
        difficulty: exercise.difficulty,
      },
    ],
  };
}

export function removeExerciseFromDay(plan, day, exerciseId) {
  return {
    ...plan,
    [day]: (plan[day] || []).filter((item) => item.id !== exerciseId),
  };
}

export function createLogId() {
  // Timestamp plus a short random suffix keeps ids unique enough for this app.
  return `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function createWorkoutLog({
  exerciseId,
  exerciseName,
  date,
  sets,
  reps,
  weight = 0,
}) {
  return {
    id: createLogId(),
    exerciseId: exerciseId == null ? null : Number(exerciseId),
    exerciseName,
    date,
    sets: Number(sets),
    reps: Number(reps),
    weight: Number(weight) || 0,
  };
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

const SHORT_WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const SHORT_MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function formatDisplayDate(isoDate) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(String(isoDate || ''));

  if (!match) {
    return isoDate || '';
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return `${SHORT_WEEKDAYS[date.getDay()]}, ${day} ${SHORT_MONTHS[month - 1]}`;
}

export function formatVolume(volume) {
  return `${volume} kg`;
}

export function getWeekdayName(date = new Date()) {
  // WEEK_DAYS starts on Monday; Date#getDay starts on Sunday.
  return WEEK_DAYS[(date.getDay() + 6) % 7];
}

export function countPlannedExercises(plan) {
  return WEEK_DAYS.reduce(
    (total, day) => total + (plan?.[day]?.length || 0),
    0
  );
}

export function getLastWorkoutDate(logs) {
  if (!logs?.length) {
    return '';
  }

  return [...logs].map((log) => log.date).sort().reverse()[0];
}

export function getLastLogForExercise(logs, exerciseId) {
  if (!exerciseId) {
    return undefined;
  }

  return (logs || []).find(
    (log) => String(log.exerciseId) === String(exerciseId)
  );
}

export function toggleExerciseDone(plan, day, exerciseId) {
  return {
    ...plan,
    [day]: (plan[day] || []).map((item) =>
      item.id === exerciseId ? { ...item, done: !item.done } : item
    ),
  };
}

export function cloneValue(value) {
  // Objects and arrays are cloned so persisted fallbacks are not mutated in place.
  if (Array.isArray(value) || (value && typeof value === 'object')) {
    return JSON.parse(JSON.stringify(value));
  }

  return value;
}
