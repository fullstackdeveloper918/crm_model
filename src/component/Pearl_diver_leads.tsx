"use client"
import React from 'react'
import { Layout, Row, Col, Card, Button, Select, Space, Typography, Avatar, Divider, Badge, Tabs } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const tabs = [
    {
      key: 'all',
      label: (
        <span>
          All leads <Badge count={3200} />
        </span>
      ),
    },
    {
      key: 'priority',
      label: (
        <span>
          <Badge color="orange" /> Priority leads <Badge count={2200} />
        </span>
      ),
    },
    {
      key: 'non-potential',
      label: (
        <span>
          <Badge color="red" /> Non Potential leads <Badge count={3200} />
        </span>
      ),
    },
    {
      key: 'all-mails',
      label: (
        <span>
          All mails <Badge count={1200} />
        </span>
      ),
    },
    {
      key: 'call-leads',
      label: (
        <span>
          <Badge color="green" /> Call leads <Badge count={3200} />
        </span>
      ),
    },
  ];
const leads = [
  {
    name: 'Jenny Wilson',
    phone: '0555 066 899',
    email: 'w.lawson@example.com',
    label: 'Priorities leads',
    avatar: '/path/to/avatar.jpg', // You can add avatars here
    type: 'priority',
  },
  {
    name: 'Jane Cooper',
    phone: '0555 066 899',
    email: 'jgraham@example.com',
    label: 'Call leads',
    avatar: '/path/to/avatar.jpg', 
    type: 'call',
  },
  {
    name: 'Jenny Wilson',
    phone: '0555 066 899',
    email: 'w.lawson@example.com',
    label: 'Priorities leads',
    avatar: '/path/to/avatar.jpg', // You can add avatars here
    type: 'priority',
  },
  {
    name: 'Jane Cooper',
    phone: '0555 066 899',
    email: 'jgraham@example.com',
    label: 'Call leads',
    avatar: '/path/to/avatar.jpg', 
    type: 'call',
  },
  {
    name: 'Jenny Wilson',
    phone: '0555 066 899',
    email: 'w.lawson@example.com',
    label: 'Priorities leads',
    avatar: '/path/to/avatar.jpg', // You can add avatars here
    type: 'priority',
  },
  {
    name: 'Jane Cooper',
    phone: '0555 066 899',
    email: 'jgraham@example.com',
    label: 'Call leads',
    avatar: '/path/to/avatar.jpg', 
    type: 'call',
  },
  {
    name: 'Jenny Wilson',
    phone: '0555 066 899',
    email: 'w.lawson@example.com',
    label: 'Priorities leads',
    avatar: '/path/to/avatar.jpg', // You can add avatars here
    type: 'priority',
  },
  {
    name: 'Jane Cooper',
    phone: '0555 066 899',
    email: 'jgraham@example.com',
    label: 'Call leads',
    avatar: '/path/to/avatar.jpg', 
    type: 'call',
  },
  {
    name: 'Jenny Wilson',
    phone: '0555 066 899',
    email: 'w.lawson@example.com',
    label: 'Priorities leads',
    avatar: '/path/to/avatar.jpg', // You can add avatars here
    type: 'priority',
  },
  {
    name: 'Jane Cooper',
    phone: '0555 066 899',
    email: 'jgraham@example.com',
    label: 'Call leads',
    avatar: '/path/to/avatar.jpg', 
    type: 'call',
  },
  {
    name: 'Jenny Wilson',
    phone: '0555 066 899',
    email: 'w.lawson@example.com',
    label: 'Priorities leads',
    avatar: '/path/to/avatar.jpg', // You can add avatars here
    type: 'priority',
  },
  {
    name: 'Jane Cooper',
    phone: '0555 066 899',
    email: 'jgraham@example.com',
    label: 'Call leads',
    avatar: '/path/to/avatar.jpg', 
    type: 'call',
  },
  // Add more leads
];

const Pearl_diver_leads = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Content style={{ padding: '20px' }}>

      <Tabs
      defaultActiveKey="all"
      items={tabs}
      style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
    />
        <Title level={3}>All Pearl Diver Leads</Title>

        <Row justify="space-between" style={{ marginBottom: '20px' }}>
          <Space>
            <Select defaultValue="All Leads" style={{ width: 120 }}>
              <Option value="all">All Leads</Option>
              <Option value="priority">Priority Leads</Option>
            </Select>
            <Select defaultValue="Select" style={{ width: 120 }}>
              <Option value="date">Date</Option>
              <Option value="name">Name</Option>
            </Select>
          </Space>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={18}> {/* Adjusted Col for leads */}
            <Row gutter={[16, 16]}>
              {leads.map((lead, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Card
                    hoverable
                    style={{ borderRadius: '10px' }}
                    actions={[
                      <Button type="primary" key="action" size="small">
                        {lead.label}
                      </Button>,
                    ]}
                  >
                    <Space direction="vertical" size="small">
                      
                      <Title level={5}><Avatar size={34} icon={<UserOutlined />} src={lead.avatar} /> {lead.name}</Title>
                      <Text>Today 10:30 PM</Text>
                      <Divider></Divider>
                      <Text><PhoneOutlined /> {lead.phone}</Text>
                      <Text><MailOutlined /> {lead.email}</Text>
                    </Space>
                  </Card>
                </Col>
              ))}
            </Row>
          </Col>

          <Col xs={24} md={6}> {/* Adjusted Col for sidebar */}
            <Sider width={300} style={{ background: 'transparent',  }}>
              <Card title="Recent leads" style={{ marginBottom: '20px' }}>
                <Space direction="vertical">
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Jenny Wilson - Austin</Text>
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Devon Lane - New York</Text>
                  <Button type="link">See All Recent Leads</Button>
                </Space>
              </Card>
              <Card title="Call Leads" style={{ marginBottom: '20px' }}>
                <Space direction="vertical">
                
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Jane Cooper - Toledo</Text>
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Dianne Russell - Naperville</Text>
                  <Button type="link">See All Call Leads</Button>
                </Space>
              </Card>
            </Sider>
          </Col>
        </Row>
      </Content>
    </Layout>
  )
}

export default Pearl_diver_leads