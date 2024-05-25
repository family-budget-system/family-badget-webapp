
export type DateRangeDto = {
  upper: string;
  lower: string;
}

export type RangeLocalDate = {
  empty: boolean;
  lowerBoundClosed: boolean;
  upperBoundClosed: boolean;
}

export enum InterfaceModsEnum {
  EDIT = "edit",
  CREATE = "create",
  VIEW = "view",
}

export type TabType = {
  value: string;
  name: string;
  error: boolean;
}

export interface TokenData {
  access_token: string;
}

export interface PageableDataResponse {
  items: unknown;
  meta: PageableMeta
}

export interface PageableMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}