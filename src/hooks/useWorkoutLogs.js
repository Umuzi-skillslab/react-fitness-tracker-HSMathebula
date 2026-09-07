import { useCallback } from 'react';
import { STORAGE_KEYS, createWorkoutLog } from '../utils/helpers';
import usePersistedState from './usePersistedState';

function useWorkoutLogs() {
  const [logs, setLogs] = usePersistedState(STORAGE_KEYS.WORKOUT_LOGS, []);

  const addLog = useCallback(
    (entry) => {
      const nextLog = createWorkoutLog(entry);
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

  return { logs, addLog, deleteLog };
}

export default useWorkoutLogs;
