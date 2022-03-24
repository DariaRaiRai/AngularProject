export interface HttpRequestState<T> {
  loading: boolean;
  data?: T;
  error?: boolean;
}
