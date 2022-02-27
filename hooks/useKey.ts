import { useEffect, useRef } from 'react';

const useKey = (eventName: any, key: string, callback: (e: KeyboardEvent) => void) => {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    const handle = (event: KeyboardEvent) => {
      callbackRef.current(event);
    };

    window.addEventListener(eventName, handle);

    return () => window.removeEventListener(eventName, handle);
  }, [key, eventName]);
};

export default useKey;
