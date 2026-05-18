import { http } from './http';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: {
    id: number;
    username: string;
    displayName: string;
    permissions: string[];
  };
}

export const authApi = {
  login: (payload: LoginPayload) => http.post<unknown, LoginResponse>('/auth/login', payload),
  profile: () => http.get<unknown, LoginResponse['user']>('/auth/profile'),
  logout: () => http.post('/auth/logout'),
};
