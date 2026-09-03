import {
  WEEK_DAYS,
  calculateVolume,
  computeProgressTotals,
  createEmptyPlan,
  filterExercises,
  getExerciseById,
  getUniqueValues,
  groupLogsByDate,
  loadFromStorage,
  saveToStorage,
  sortExercises,
} from './helpers';

const sampleExercises = [
  {
    id: 1,
    name: 'Barbell Squat',
    category: 'Strength',
    muscleGroup: 'Legs',
    difficulty: 'Intermediate',
  },
  {
    id: 2,
    name: 'Push-Up',
    category: 'Strength',
    muscleGroup: 'Chest',
    difficulty: 'Beginner',
  },
  {
    id: 3,
    name: 'Jump Rope',
    category: 'Cardio',
    muscleGroup: 'Full Body',
    difficulty: 'Beginner',
  },
];

describe('filterExercises', () => {
  test('filters by search text across name and category', () => {
    const results = filterExercises(sampleExercises, { search: 'cardio' });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Jump Rope');
  });

  test('applies category and difficulty filters together', () => {
    const results = filterExercises(sampleExercises, {
      category: 'Strength',
      difficulty: 'Beginner',
    });
    expect(results).toHaveLength(1);
    expect(results[0].name).toBe('Push-Up');
  });
});

describe('sortExercises', () => {
  test('sorts exercises alphabetically by name', () => {
    const results = sortExercises(sampleExercises, 'name');
    expect(results.map((exercise) => exercise.name)).toEqual([
      'Barbell Squat',
      'Jump Rope',
      'Push-Up',
    ]);
  });

  test('sorts exercises by difficulty rank', () => {
    const results = sortExercises(sampleExercises, 'difficulty');
    expect(results[0].difficulty).toBe('Beginner');
    expect(results[results.length - 1].difficulty).toBe('Intermediate');
  });
});

describe('exercise lookups', () => {
  test('returns unique sorted values for a key', () => {
    expect(getUniqueValues(sampleExercises, 'category')).toEqual([
      'Cardio',
      'Strength',
    ]);
  });

  test('finds an exercise by numeric or string id', () => {
    expect(getExerciseById(sampleExercises, '2').name).toBe('Push-Up');
  });
});

describe('planner and progress helpers', () => {
  test('creates an empty plan for every weekday', () => {
    const plan = createEmptyPlan();
    expect(Object.keys(plan)).toEqual(WEEK_DAYS);
    expect(plan.Monday).toEqual([]);
  });

  test('calculates volume and progress totals', () => {
    const logs = [
      { date: '2026-09-01', sets: 3, reps: 10, weight: 20 },
      { date: '2026-09-01', sets: 2, reps: 8, weight: 15 },
    ];

    expect(calculateVolume(3, 10, 20)).toBe(600);
    expect(computeProgressTotals(logs)).toEqual({ workouts: 2, volume: 840 });
    expect(Object.keys(groupLogsByDate(logs))).toEqual(['2026-09-01']);
  });
});

describe('localStorage helpers', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('saves and loads JSON values from storage', () => {
    const saved = saveToStorage('plan', { Monday: [] });
    expect(saved).toBe(true);
    expect(loadFromStorage('plan', {})).toEqual({ Monday: [] });
  });

  test('returns the fallback when a key is missing', () => {
    expect(loadFromStorage('missing', createEmptyPlan()).Friday).toEqual([]);
  });
});
