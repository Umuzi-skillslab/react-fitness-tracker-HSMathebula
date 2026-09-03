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
