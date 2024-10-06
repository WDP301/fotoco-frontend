export type Locale = 'en' | 'vi';

export type UserJWT = {
  uid: string;
  email: string;
  iat: number;
  exp: number;
};

export type BreadItem = {
  title: string;
  url: string;
  active: boolean;
};

export type SortOption = {
  label: string;
  value: string;
  field: string;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
};

export type User = {
  _id: string;
  username: string;
  email: string;
  phoneNumber: string;
  img: string;
  fullName: string;
  status: string;
  role: string;
  groups: string[];
  histories: string[];
  notifications: string[];
  comments: string[];
  reacts: string[];
  photos: string[];
  albums: string[];
  reports: string[];
  events: string[];
  subscriptions: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type Group = {
  _id: string;
  title: string;
  description: string;
  groupImg: string;
  membersCount: number;
  ownersCount: number;
  albumCount: number;
  createdAt: string;
  updatedAt: string;
};

export type RecentPhoto = {
  _id: string;
  owner: {
    _id: string;
    fullName: string;
    email: string;
    username: string;
    img: string;
  };
  type: string;
  belonging: string;
  status: string;
  mimeType: string;
  fileSize: number;
  title: string;
  url: string;
  tags: string[];
  viewedAt: string;
};

export enum SearchParams {
  SORT = 'sort',
  PAGE = 'page',
  PER_PAGE = 'perPage',
  SEARCH = 'search',
  STATUS = 'status',
  TYPE = 'type',
  FILTER = 'filter',
  MODE = 'mode',
}

export type SearchGroupParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  type?: string;
  filter?: string;
};

export type SearchRecentViewParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
};

export type PageMeta = {
  totalPages: number;
  page: number;
  totalElements: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
};

export type FilterOption = {
  label: string;
  value: string;
  field: string;
};