export type Locale = 'en' | 'vi';

export type UserJWT = {
  uid: string;
  email: string;
  iat: number;
  exp: number;
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

export type SearchGroupParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  type?: string;
  filter?: string;
};

export type PageMeta = {
  totalPages: number;
  page: number;
  totalElements: number;
  pageSize: number;
  hasNext: boolean;
  hasPrev: boolean;
};
