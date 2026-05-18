import { Table, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { PermissionRecord, permissionsApi } from '../api/resources';

export function PermissionListPage() {
  const [data, setData] = useState<PermissionRecord[]>([]);

  useEffect(() => {
    permissionsApi.list({ page: 1, pageSize: 50 }).then((result) => setData(result.items));
  }, []);

  return (
    <>
      <Typography.Title level={3}>权限管理</Typography.Title>
      <Table
        rowKey="id"
        dataSource={data}
        columns={[
          { title: '名称', dataIndex: 'name' },
          { title: '编码', dataIndex: 'code' },
          { title: '资源', dataIndex: 'resource' },
        ]}
      />
    </>
  );
}
