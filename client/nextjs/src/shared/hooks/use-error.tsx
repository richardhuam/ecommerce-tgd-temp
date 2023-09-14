import { useEffect, useState } from 'react';

import { errorMessageResolver } from '../utils/api/api-error-message-resolver';

export function useError(error: unknown) {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    // cleaning previous error
    setErrorMessage(null);
    // if no errors provided simply return
    if (!error) return;
    // set the error to errorMessage state
    setErrorMessage(errorMessageResolver(error));
  }, [error]);

  return { errorMessage };
}
