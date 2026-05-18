import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Space, Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { UserRecord, usersApi } from '../api/resources';
import { PermissionButton } from '../components/PermissionButton';

export function UserListPage() {
  const [data, setData] = useState<UserRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    usersApi.list({ page: 1, pageSize: 10, keyword }).then((result) => {
      setData(result.items);
      setTotal(result.total);
    });
  }, [keyword]);

  return (
    <>
      <Typography.Title level={3}>用户管理</Typography.Title>
      <div className="toolbar">
        <Input.Search placeholder="搜索用户" allowClear onSearch={setKeyword} style={{ maxWidth: 320 }} />
        <PermissionButton type="primary" icon={<PlusOutlined />} permission="user:create">
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
    </>
  );
}
