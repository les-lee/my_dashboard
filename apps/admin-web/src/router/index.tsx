import { createBrowserRouter } from 'react-router-dom';
import { AdminLayout } from '../layouts/AdminLayout';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { PermissionListPage } from '../pages/PermissionListPage';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleListPage } from '../pages/RoleListPage';
import { SettingsPage } from '../pages/SettingsPage';
import { UserListPage } from '../pages/UserListPage';

export const router = createBrowserRouter([
  { path: '/login', element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { path: '/', element: <DashboardPage /> },
          { path: '/users', element: <UserListPage /> },
          { path: '/roles', element: <RoleListPage /> },
          { path: '/permissions', element: <PermissionListPage /> },
          { path: '/settings', element: <SettingsPage /> },
        ],
      },
    ],
  },
]);
