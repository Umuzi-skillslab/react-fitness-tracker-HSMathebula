import {
  WEEK_DAYS,
  addExerciseToDay,
  calculateVolume,
  cloneValue,
  computeProgressTotals,
  createEmptyPlan,
  createWorkoutLog,
  filterExercises,
  getExerciseById,
  getTodayDate,
  getUniqueValues,
  groupLogsByDate,
  loadFromStorage,
  normalizePlan,
  removeExerciseFromDay,
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

  test('adds and removes an exercise on a weekday', () => {
    const exercise = { id: 2, name: 'Push-Up', difficulty: 'Beginner' };
    const plan = addExerciseToDay(createEmptyPlan(), 'Monday', exercise);

    expect(plan.Monday).toHaveLength(1);
    expect(addExerciseToDay(plan, 'Monday', exercise).Monday).toHaveLength(1);
    expect(removeExerciseFromDay(plan, 'Monday', 2).Monday).toEqual([]);
  });

  test('normalizes a partial stored plan', () => {
    expect(normalizePlan({ Monday: [{ id: 1, name: 'Push-Up' }] }).Monday[0].name).toBe(
      'Push-Up'
    );
    expect(normalizePlan(null).Sunday).toEqual([]);
  });

  test('creates a workout log and clones values', () => {
    const log = createWorkoutLog({
      exerciseId: '2',
      exerciseName: 'Push-Up',
      date: '2026-09-01',
      sets: '3',
      reps: '12',
      weight: '0',
    });

    expect(log.id).toMatch(/^log-/);
    expect(log.exerciseId).toBe(2);
    expect(getTodayDate()).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(cloneValue({ a: 1 })).toEqual({ a: 1 });
    expect(cloneValue('ok')).toBe('ok');
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

  test('returns the fallback when stored JSON is invalid', () => {
    localStorage.setItem('broken', '{not-json');
    expect(loadFromStorage('broken', 'fallback')).toBe('fallback');
  });

  test('returns false when storage writes fail', () => {
    const spy = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('quota');
    });

    expect(saveToStorage('plan', { Monday: [] })).toBe(false);
    spy.mockRestore();
  });
});
