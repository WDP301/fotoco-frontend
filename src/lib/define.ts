export type Locale = 'en' | 'vi';

export type User = {
  uid: string;
  email: string;
  iat: number;
  exp: number;
};

export type AuthResponse = {
  accessToken: string;
  refreshToken?: string;
};
