export interface Pagination<ResType> {
  page: string;
  next: string;
  entries: number;
  results: ResType[];
}
