import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { RoleRecord, rolesApi } from '../api/resources';

export function RoleListPage() {
  const [data, setData] = useState<RoleRecord[]>([]);

  useEffect(() => {
    rolesApi.list({ page: 1, pageSize: 20 }).then((result) => setData(result.items));
  }, []);

  return (
    <>
      <Typography.Title level={3}>角色管理</Typography.Title>
      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: '角色名', dataIndex: 'name' },
          { title: '编码', dataIndex: 'code' },
          { title: '说明', dataIndex: 'description' },
        ]}
      />
    </>
  );
}
