import { useEffect, useState } from 'react';

export const useFakeDelay = (delay: number = 0): boolean => {
  const [isDelayFinished, setIsDelayFinished] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (isFirstRender) {
      // set timeout for the specified delay time
      const timerId = setTimeout(() => {
        setIsDelayFinished(true);
        setIsFirstRender(false);
      }, delay); // Convert seconds to milliseconds
      return () => clearTimeout(timerId); // Clean up on unmount
    }
  }, [delay, isFirstRender]);

  return isDelayFinished;
};
