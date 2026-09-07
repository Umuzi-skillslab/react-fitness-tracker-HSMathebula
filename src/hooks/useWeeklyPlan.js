import { useCallback } from 'react';
import {
  STORAGE_KEYS,
  addExerciseToDay,
  createEmptyPlan,
  normalizePlan,
  removeExerciseFromDay,
} from '../utils/helpers';
import usePersistedState from './usePersistedState';

function useWeeklyPlan() {
  const [storedPlan, setPlan] = usePersistedState(
    STORAGE_KEYS.WEEKLY_PLAN,
    createEmptyPlan()
  );
  // Always expose a full Monday–Sunday object, even if storage is incomplete.
  const plan = normalizePlan(storedPlan);

  const addExercise = useCallback(
    (day, exercise) => {
      setPlan((current) => addExerciseToDay(normalizePlan(current), day, exercise));
    },
    [setPlan]
  );

  const removeExercise = useCallback(
    (day, exerciseId) => {
      setPlan((current) =>
        removeExerciseFromDay(normalizePlan(current), day, exerciseId)
      );
    },
    [setPlan]
  );

  return { plan, addExercise, removeExercise };
}

export default useWeeklyPlan;
