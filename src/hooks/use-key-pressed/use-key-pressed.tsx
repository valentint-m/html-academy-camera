import { useEffect } from 'react';

export default function useKeyPressed(key: string, action: () => void) {
  useEffect(() => {
    function onKeyUp(event: KeyboardEvent) {
      if (event.key === key) {
        action();
      }
    }
    window.addEventListener('keyup', onKeyUp);
    return () => window.removeEventListener('keyup', onKeyUp);
  },
  [key, action]);
}
