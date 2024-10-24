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
  albumsCount: number;
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

export type SearchPhotoParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
  mode?: string;
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

export type SearchRecentViewParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
};

export type SearchGroupMembersParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
  search?: string;
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

export type FilterOption = {
  label: string;
  value: string;
  field: string;
};

export type GroupInfo = {
  title: string;
  description: string;
  groupImg: string;
  type: string;
};

export type AlbumInfo = {
  _id: string;
  title: string;
  description: string;
  type: string;
  group: {
    _id: string;
    title: string;
  };
  photosCount: number;
  createdAt: string;
  updatedAt: string;
};

export type GroupUser = {
  _id: string;
  username: string;
  fullName: string;
  img: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
};

export type Album = {
  _id: string;
  title: string;
  description: string;
  albumImg: string[];
  lastPhotos: string[];
  membersCount: number;
  ownersCount: number;
  contributorsCount: number;
  photosCount: number;
  type: string;
  createdAt: string;
  updatedAt: string;
};

export type SearchAlbumParams = {
  sort?: string;
  page?: number;
  pageSize?: number;
  search?: string;
  filter?: string;
};

export type Photo = {
  _id: string;
  title: string;
  url: string;
  owner: {
    _id: string;
    username: string;
    fullName: string;
    email: string;
    img: string;
  };
  fileSize: number;
  mimeType: string;
  tags: string[];
  commentsCount: number;
  reactsCount: number;
  createdAt: string;
  updatedAt: string;
};

export type UserNotification = {
  _id: string;
  user: {
    _id: string;
    username: string;
    email: string;
    fullName: string;
    img: string;
  };
  type: string;
  receivers: string;
  content: string;
  seen: string[];
  redirectUrl: string;
  createdAt: string;
  groupId?: string;
  albumId?: string;
};

export interface PhotoResponse {
  success: boolean
  photo: PhotoDetails
  prevPhoto?: string
  nextPhoto?: string
}

export interface PhotoDetails {
  _id: string
  type: string
  belonging: string
  owner: Owner
  title: string
  url: string
  mimeType: string
  fileSize: number
  tags: string[]
  createdAt: string
  updatedAt: string
  commentsCount: number,
  reactsCount: number
}

export interface Owner {
  _id: string
  username: string
  fullName: string
  img: string
}

export type Comment = {
  _id: string;
  userInfo: {
    _id: string;
    username: string;
    fullName: string;
    img: string;
  };
  content: string;
  createdAt: string;
  replies: Reply[]
}

export type Reply = {
  _id: string;
  userInfo: {
    _id: string;
    userName: string;
    fullName: string;
    img: string;
  };
  content: string;
  createdAt: string;
}