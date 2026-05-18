import { useAuthStore } from '../store/auth-store';

export function usePermission(code: string) {
  return useAuthStore((state) => state.permissions.includes(code));
}
