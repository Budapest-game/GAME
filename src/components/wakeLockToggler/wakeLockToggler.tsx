import React, { useState } from 'react';
import { Button } from '../button/button';

export function WakeLockToggler(): JSX.Element {
  const [wakeLock, setWakeLock] = useState<null | WakeLockSentinel>(null);

  let isSupported = false;

  if ('wakeLock' in navigator) {
    isSupported = true;
  } else {
    console.log('не поддерживается');
  }

  const toggleWakeLock = async () => {
    if (wakeLock !== null) {
      wakeLock.release()
        .then(() => {
          setWakeLock(null);
        });
    } else {
      try {
        const tmp = await navigator.wakeLock.request();
        setWakeLock(tmp);
        console.log('wake lock');
      } catch (err) {
        console.log('невозможно получить wake lock', err);
      }
    }
  };

  return (
    <Button
      onClick={toggleWakeLock}
      text={wakeLock ? 'Разрешить затемнение' : 'Экран, не спать!'}
      disabled={!isSupported}
    />
  );
}
