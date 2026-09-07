import { useCallback, useState } from 'react';

function useNotice() {
  const [notice, setNotice] = useState('');

  const showNotice = useCallback((message) => {
    setNotice(message);
  }, []);

  const clearNotice = useCallback(() => {
    setNotice('');
  }, []);

  return { notice, showNotice, clearNotice };
}

export default useNotice;
