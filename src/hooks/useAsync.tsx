import { useState, useEffect, useCallback } from 'react';

type Callback = () => Promise<unknown>;

type UseAsyncResultType = {
  execute: () => Promise<void>,
  status: string,
  value: unknown,
  error: string|null,
}

export function useAsync(asyncFunction: Callback, immediate = true):UseAsyncResultType {
  const [status, setStatus] = useState<string>('idle');
  const [value, setValue] = useState<any|null>(null);
  const [error, setError] = useState<string|null>(null);

  const execute = useCallback(() => {
    setStatus('pending');
    setValue(null);
    setError(null);

    return asyncFunction().then((response) => {
      setValue(response);
      setStatus('success');
    }).catch((err) => {
      setError(err);
      setStatus('error');
    });
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return {
    execute, status, value, error,
  };
}
