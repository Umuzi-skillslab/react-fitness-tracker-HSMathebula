import { useCallback, useEffect, useState } from 'react';
import { cloneValue, loadFromStorage, saveToStorage } from '../utils/helpers';

function usePersistedState(key, fallback) {
  const [value, setValue] = useState(() => {
    const stored = loadFromStorage(key, null);
    return stored === null ? cloneValue(fallback) : stored;
  });

  useEffect(() => {
    saveToStorage(key, value);
  }, [key, value]);

  const setPersistedValue = useCallback(
    (updater) => {
      setValue((current) => {
        const next = typeof updater === 'function' ? updater(current) : updater;
        saveToStorage(key, next);
        return next;
      });
    },
    [key]
  );

  return [value, setPersistedValue];
}

export default usePersistedState;
