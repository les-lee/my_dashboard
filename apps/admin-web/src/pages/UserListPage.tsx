import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Form, Input, Modal, Space, Table, Typography } from 'antd';
import { globalMessage } from '../utils/global-message';
import { useEffect, useState } from 'react';
import { CreateUserRequest, UserRecord, usersApi } from '../api/resources';
import { PermissionButton } from '../components/PermissionButton';

export function UserListPage() {
  const [data, setData] = useState<UserRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');
  const [createVisible, setCreateVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [form] = Form.useForm<CreateUserRequest>();

  useEffect(() => {
    usersApi.list({ page: 1, pageSize: 10, keyword }).then((result) => {
      setData(result.items);
      setTotal(result.total);
    });
  }, [keyword]);

  const reload = () => {
    usersApi.list({ page: 1, pageSize: 10, keyword }).then((result) => {
      setData(result.items);
      setTotal(result.total);
    });
  };

  const handleCreate = async (values: CreateUserRequest) => {
    setConfirmLoading(true);
    try {
      await usersApi.create(values);
      globalMessage.success('用户创建成功');
      setCreateVisible(false);
      form.resetFields();
      reload();
    } catch (_error) {
      globalMessage.error('创建用户失败，请检查输入或重试');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <>
      <Typography.Title level={3}>用户管理</Typography.Title>
      <div className="toolbar">
        <Input.Search placeholder="搜索用户" allowClear onSearch={setKeyword} style={{ maxWidth: 320 }} />
        <PermissionButton
          type="primary"
          icon={<PlusOutlined />}
          permission="user:create"
          onClick={() => setCreateVisible(true)}
        >
          新增用户
        </PermissionButton>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        pagination={{ total }}
        columns={[
          { title: '账号', dataIndex: 'username' },
          { title: '姓名', dataIndex: 'displayName' },
          { title: '邮箱', dataIndex: 'email' },
          { title: '状态', dataIndex: 'enabled', render: (enabled) => (enabled ? '启用' : '禁用') },
          {
            title: '操作',
            render: (_, record) => (
              <Space>
                <PermissionButton danger icon={<DeleteOutlined />} permission="user:delete" onClick={() => usersApi.remove(record.id)}>
                  删除
                </PermissionButton>
              </Space>
            ),
          },
        ]}
      />
      <Modal
        title="新增用户"
        open={createVisible}
        onCancel={() => setCreateVisible(false)}
        confirmLoading={confirmLoading}
        okText="创建"
        cancelText="取消"
        onOk={() => form.submit()}
      >
        <Form form={form} layout="vertical" onFinish={handleCreate}>
          <Form.Item name="username" label="账号" rules={[{ required: true, message: '请输入账号' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="displayName" label="姓名" rules={[{ required: true, message: '请输入姓名' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="email" label="邮箱" rules={[{ type: 'email', message: '请输入有效邮箱' }]}> 
            <Input />
          </Form.Item>
          <Form.Item name="password" label="密码" rules={[{ required: true, message: '请输入密码' }, { min: 8, message: '密码至少 8 位' }]}> 
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
