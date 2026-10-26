import { useState, useEffect, useCallback } from 'react';

/**
 * Hook to persist state in localStorage.
 * Used for user preferences like background animation enabled/disabled.
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // State to store our value
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Keep every hook instance that shares this key in sync (same tab via a custom
  // event, other tabs via the native storage event).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const read = () => {
      try {
        const item = window.localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch {
        /* ignore malformed values */
      }
    };
    const onLocal = (e: Event) => {
      if ((e as CustomEvent<string>).detail === key) read();
    };
    const onStorage = (e: StorageEvent) => {
      if (e.key === key) read();
    };
    window.addEventListener('local-storage', onLocal);
    window.addEventListener('storage', onStorage);
    return () => {
      window.removeEventListener('local-storage', onLocal);
      window.removeEventListener('storage', onStorage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = useCallback((value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
        window.dispatchEvent(new CustomEvent('local-storage', { detail: key }));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
