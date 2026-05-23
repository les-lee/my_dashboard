import { http } from './http';

export interface ListQuery {
  page?: number;
  pageSize?: number;
  keyword?: string;
}

export interface PageResult<T> {
  items: T[];
  total: number;
}

export interface UserRecord {
  id: number;
  username: string;
  displayName: string;
  email?: string;
  enabled: boolean;
}

export interface CreateUserRequest {
  username: string;
  displayName: string;
  email?: string;
  password: string;
}

export interface RoleRecord {
  id: number;
  name: string;
  code: string;
  description?: string;
}

export interface PermissionRecord {
  id: number;
  name: string;
  code: string;
  resource: string;
}

export const usersApi = {
  list: (query: ListQuery) => http.get<unknown, PageResult<UserRecord>>('/users', { params: query }),
  create: (data: CreateUserRequest) => http.post<CreateUserRequest, UserRecord>('/users', data),
  remove: (id: number) => http.delete(`/users/${id}`),
};

export const rolesApi = {
  list: (query: ListQuery) => http.get<unknown, PageResult<RoleRecord>>('/roles', { params: query }),
  remove: (id: number) => http.delete(`/roles/${id}`),
};

export const permissionsApi = {
  list: (query: ListQuery) =>
    http.get<unknown, PageResult<PermissionRecord>>('/permissions', { params: query }),
};
