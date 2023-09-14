export interface IGenericStateWithoutData {
  status: 'idle' | 'loading' | 'finished' | 'error';
  error: string | null;
}

export interface IGenericState<T> extends IGenericStateWithoutData {
  data: T;
}
