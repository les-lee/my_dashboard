import {
  DashboardOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';

export interface AppMenuItem {
  key: string;
  label: string;
  path: string;
  permission: string;
  icon?: ReactNode;
}

export const appMenu: AppMenuItem[] = [
  { key: 'dashboard', label: 'Dashboard', path: '/', permission: 'dashboard:view', icon: <DashboardOutlined /> },
  { key: 'users', label: '用户管理', path: '/users', permission: 'user:view', icon: <UserOutlined /> },
  { key: 'roles', label: '角色管理', path: '/roles', permission: 'role:view', icon: <TeamOutlined /> },
  {
    key: 'permissions',
    label: '权限管理',
    path: '/permissions',
    permission: 'permission:view',
    icon: <SafetyCertificateOutlined />,
  },
  { key: 'settings', label: '系统设置', path: '/settings', permission: 'setting:view', icon: <SettingOutlined /> },
];

export function toAntMenuItems(items: AppMenuItem[]): MenuProps['items'] {
  return items.map((item) => ({ key: item.path, icon: item.icon, label: item.label }));
}
