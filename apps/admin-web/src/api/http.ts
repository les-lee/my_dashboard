import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '../utils/token-storage';
import { globalMessage } from '../utils/global-message';

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL ?? '/api',
  timeout: 15000,
});

http.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = tokenStorage.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

http.interceptors.response.use(
  (response) => response.data,
  async (error: AxiosError) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    const requestUrl = original?.url ?? '';
    const isAuthEndpoint = requestUrl.includes('/auth/login') || requestUrl.includes('/auth/register') || requestUrl.includes('/auth/refresh');

    if (error.response?.status === 401 && !original?._retry && !isAuthEndpoint) {
      original._retry = true;
      const refreshToken = tokenStorage.getRefreshToken();
      if (refreshToken) {
        try {
          const data = await axios.post(`${http.defaults.baseURL}/auth/refresh`, { refreshToken });
          tokenStorage.setTokens(data.data.accessToken, data.data.refreshToken);
          original.headers.Authorization = `Bearer ${data.data.accessToken}`;
          return http(original);
        } catch (refreshError) {
          tokenStorage.clear();
          globalMessage.error('登录已过期，请重新登录');
          return Promise.reject(refreshError);
        }
      }
      globalMessage.error('认证失败，请重新登录');
      return Promise.reject(error);
    }

    if (error.response) {
      const responseData = error.response.data as any;
      const msg = responseData?.message || responseData?.error || error.response.statusText || '请求失败';
      globalMessage.error(String(msg));
    } else if (error.request) {
      globalMessage.error('无法连接到服务器，请检查网络');
    } else {
      globalMessage.error('请求发送失败');
    }

    return Promise.reject(error);
  },
);
