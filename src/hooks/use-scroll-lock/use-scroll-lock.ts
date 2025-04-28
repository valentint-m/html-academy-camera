import { useLayoutEffect } from 'react';

export default function useScrollLock () {
  useLayoutEffect(() => {
    const windowOverflowType = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      (document.body.style.overflow = windowOverflowType);
    };
  }, []);
}
