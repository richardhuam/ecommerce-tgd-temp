export interface IApiResponse<T> {
  ok: boolean;
  data: T;
}

export type IPagination = {
  query: string;
  currentPage: number;
  hasNextPage: boolean;
  totalItems: number;
  totalPages: number;
  limit: number;
};

export type IQueryParams = {
  keyWord: string;
  page: number;
  limit: number;
  sort: string;
  filter: string;
};
