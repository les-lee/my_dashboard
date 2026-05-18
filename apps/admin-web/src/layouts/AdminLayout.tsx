import { LogoutOutlined } from '@ant-design/icons';
import { Button, Layout, Menu, Typography } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { appMenu, toAntMenuItems } from '../permissions/menu';
import { useAuthStore } from '../store/auth-store';

const { Header, Content, Sider } = Layout;

export function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { permissions, logout, user } = useAuthStore();
  const visibleMenu = appMenu.filter((item) => permissions.includes(item.permission));

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={220} theme="dark">
        <Typography.Title level={4} style={{ color: '#fff', padding: '18px 20px', margin: 0 }}>
          Admin System
        </Typography.Title>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          items={toAntMenuItems(visibleMenu)}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            background: '#fff',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 24px',
          }}
        >
          <Typography.Text strong>{user?.displayName ?? user?.username ?? '管理员'}</Typography.Text>
          <Button
            icon={<LogoutOutlined />}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            退出
          </Button>
        </Header>
        <Content className="page-content">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
