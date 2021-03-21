import { useState, useEffect, useCallback } from 'react';

type Callback = () => Promise<unknown>;

type UseAsyncResultType = {
  execute: () => Promise<void>,
  status: string,
  value: unknown,
  error: string|null,
}

enum STATUSES {
  'PENDING' = 'pending',
  'SUCCESS' = 'success',
  'ERROR' = 'error',
}

export function useAsync(
  asyncFunction: Callback,
  atTimeToCall = true,
):UseAsyncResultType {
  const [status, setStatus] = useState<string>('idle');
  const [value, setValue] = useState<any|null>(null);
  const [error, setError] = useState<string|null>(null);

  const execute = useCallback(() => {
    setStatus(STATUSES.PENDING);
    setValue(null);
    setError(null);

    return asyncFunction().then((response) => {
      setValue(response);
      setStatus(STATUSES.SUCCESS);
    }).catch((err) => {
      setError(err);
      setStatus(STATUSES.ERROR);
    });
  }, [asyncFunction]);

  useEffect(() => {
    if (atTimeToCall) {
      execute();
    }
  }, [execute, atTimeToCall]);

  return {
    execute, status, value, error,
  };
}
