export {};

declare global {
  interface Window {
    __PRELOADED_STATE__?: Record<string, unknown>;
  }

  enum WakeLockType { 'screen' }

  interface WakeLockSentinel extends EventTarget {
    released: boolean;
    type: WakeLockType;
    release: () => Promise<undefined>;
    onrelease: EventHandler;
  }

  interface WakeLock {
    request: (type: WakeLockType = 'screen') => Promise<WakeLockSentinel>;
  }

  interface Navigator {
    wakeLock: WakeLock;
  }
}
