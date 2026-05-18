import { create } from 'zustand';
import { authApi, LoginPayload, LoginResponse } from '../api/auth';
import { tokenStorage } from '../utils/token-storage';

interface AuthState {
  user?: LoginResponse['user'];
  permissions: string[];
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => void;
  setUser: (user: LoginResponse['user']) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  permissions: [],
  isAuthenticated: Boolean(tokenStorage.getAccessToken()),
  login: async (payload) => {
    const data = await authApi.login(payload);
    tokenStorage.setTokens(data.accessToken, data.refreshToken);
    set({ user: data.user, permissions: data.user.permissions, isAuthenticated: true });
  },
  logout: () => {
    tokenStorage.clear();
    set({ user: undefined, permissions: [], isAuthenticated: false });
  },
  setUser: (user) => set({ user, permissions: user.permissions, isAuthenticated: true }),
}));
