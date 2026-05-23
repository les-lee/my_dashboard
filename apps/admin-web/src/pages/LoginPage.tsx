import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth-store';

export function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  return (
    <main className="login-page">
      <section className="login-panel">
        <Typography.Title level={3}>Admin System</Typography.Title>
        {contextHolder}
        <Form
          layout="vertical"
          initialValues={{ username: 'admin', password: 'Admin@123456' }}
          onFinish={async (values) => {
            try {
              await login(values);
              navigate('/');
            } catch (error: any) {
              console.error('登录错误', error);
              const msg =
                error?.response?.data?.message ||
                error?.message ||
                '登录失败，请检查账号密码';
              messageApi.error(String(msg));
            }
          }}
        >
          <Form.Item name="username" label="账号" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="请输入账号" />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="请输入密码" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form>
      </section>
    </main>
  );
}
