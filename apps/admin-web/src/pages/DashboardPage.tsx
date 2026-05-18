import { Card, Col, Row, Statistic, Typography } from 'antd';

export function DashboardPage() {
  return (
    <>
      <Typography.Title level={3}>Dashboard</Typography.Title>
      <Row gutter={16}>
        <Col xs={24} md={8}>
          <Card><Statistic title="用户数" value={128} /></Card>
        </Col>
        <Col xs={24} md={8}>
          <Card><Statistic title="角色数" value={6} /></Card>
        </Col>
        <Col xs={24} md={8}>
          <Card><Statistic title="权限点" value={42} /></Card>
        </Col>
      </Row>
    </>
  );
}
