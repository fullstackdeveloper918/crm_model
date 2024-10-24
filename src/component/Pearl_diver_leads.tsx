"use client"
import React, { useEffect } from 'react'
import { Layout, Row, Col, Card, Button, Select, Space, Typography, Avatar, Divider, Badge, Tabs } from 'antd';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Link from 'next/link';
import api from '@/utils/api';
import dayjs from "dayjs"
import { capFirst, replaceUnderScore } from '@/utils/validation';
// import remUndrscore from "../utils/validation/replaceUnderScore"
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

const Pearl_diver_leads = ({data}:any) => {
console.log(data,"data");

  
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
          <Col xs={24} md={18}>
            <Row gutter={[16, 16]}>
              {data?.data.map((lead:any, index:number) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Link href={`/admin/pearls/${lead?.user_uuid}`}>
                  <Card
                    hoverable
                    style={{ borderRadius: '10px' }}
                    actions={[
                      <Button type="primary" key="action" size="small">
                        {capFirst(replaceUnderScore(lead.status))}
                      </Button>,
                    ]}
                  >
                    <Space direction="vertical" size="small">
                      
                      <Title level={5}><Avatar size={34} icon={<UserOutlined />} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s`} /> {lead?.firstName?`${lead?.firstName} ${lead?.lastName}`:"N/A"}</Title>
                      <Text>{dayjs(lead?.created_at).format("DD-MM-YYYY")}</Text>
                      {/* <Text>Today 10:30 PM</Text> */}
                      <Divider></Divider>
                      <Text><PhoneOutlined /> {lead.phone||"N/A"}</Text>
                      <Text><MailOutlined /> {lead.email}</Text>
                    </Space>
                  </Card>
                  </Link>
                </Col>
              ))}
              {/* {leads.map((lead, index) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Link href={`/admin/pearls/view`}>
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
                      
                      <Title level={5}><Avatar size={34} icon={<UserOutlined />} src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s`} /> {lead.name}</Title>
                      <Text>Today 10:30 PM</Text>
                      <Divider></Divider>
                      <Text><PhoneOutlined /> {lead.phone}</Text>
                      <Text><MailOutlined /> {lead.email}</Text>
                    </Space>
                  </Card>
                  </Link>
                </Col>
              ))} */}

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