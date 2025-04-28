import { useMemo, useState } from 'react';
import useKeyPressed from '../use-key-pressed/use-key-pressed';

const useRoveFocus = (size: number) => {
  const [currentFocus, setCurrentFocus] = useState(0);

  useKeyPressed('ArrowDown', () =>
    setCurrentFocus(currentFocus === size - 1 ? 0 : currentFocus + 1)
  );
  useKeyPressed('ArrowUp', () =>
    setCurrentFocus(currentFocus === 0 ? size - 1 : currentFocus - 1)
  );

  return useMemo(
    () => [currentFocus, setCurrentFocus] as const,
    [currentFocus]
  );
};

export default useRoveFocus;


