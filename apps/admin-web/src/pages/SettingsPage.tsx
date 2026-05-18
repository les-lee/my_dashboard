import { Card, Form, Input, Switch, Typography } from 'antd';

export function SettingsPage() {
  return (
    <>
      <Typography.Title level={3}>系统设置</Typography.Title>
      <Card>
        <Form layout="vertical" initialValues={{ systemName: 'Admin System', auditEnabled: true }}>
          <Form.Item label="系统名称" name="systemName">
            <Input />
          </Form.Item>
          <Form.Item label="审计日志" name="auditEnabled" valuePropName="checked">
            <Switch />
          </Form.Item>
        </Form>
      </Card>
    </>
  );
}
