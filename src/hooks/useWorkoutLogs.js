import { useCallback } from 'react';
import { STORAGE_KEYS, createWorkoutLog } from '../utils/helpers';
import usePersistedState from './usePersistedState';

function useWorkoutLogs() {
  const [logs, setLogs] = usePersistedState(STORAGE_KEYS.WORKOUT_LOGS, []);

  const addLog = useCallback(
    (entry) => {
      const nextLog = createWorkoutLog(entry);
      // Newest sessions appear first in history.
      setLogs((current) => [nextLog, ...current]);
      return nextLog;
    },
    [setLogs]
  );

  const deleteLog = useCallback(
    (logId) => {
      setLogs((current) => current.filter((log) => log.id !== logId));
    },
    [setLogs]
  );

  const updateLog = useCallback(
    (logId, entry) => {
      setLogs((current) =>
        current.map((log) =>
          log.id === logId
            ? {
                ...log,
                exerciseId:
                  entry.exerciseId == null ? log.exerciseId : Number(entry.exerciseId),
                exerciseName: entry.exerciseName,
                date: entry.date,
                sets: Number(entry.sets),
                reps: Number(entry.reps),
                weight: Number(entry.weight) || 0,
              }
            : log
        )
      );
    },
    [setLogs]
  );

  return { logs, addLog, deleteLog, updateLog };
}

export default useWorkoutLogs;
