"use client"
import React from 'react';
import { Card, Avatar, Typography, Button, List, Layout } from 'antd';
import { MailOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';

const { Content, Sider } = Layout;
const { Text, Title } = Typography;

const leadsData = {
  recentLeads: [
    { name: 'Jenny Wilson', email: 'w.lawson@example.com', amount: '$11,234', location: 'Austin' },
    { name: 'Devon Lane', email: 'dat.roberts@example.com', amount: '$11,159', location: 'New York' },
  ],
  callLeads: [
    { name: 'Jane Cooper', email: 'jgraham@example.com', amount: '$10,483', location: 'Toledo' },
    { name: 'Dianne Russell', email: 'curtis.d@example.com', amount: '$9,084', location: 'Naperville' },
  ],
  mailLeads: [
    { name: 'Jane Cooper', email: 'jgraham@example.com', amount: '$10,483', location: 'Toledo' },
    { name: 'Dianne Russell', email: 'curtis.d@example.com', amount: '$9,084', location: 'Naperville' },
  ]
};
const page = () => {
  return (
    <Layout style={{ minHeight: '100vh', padding: '24px' }}>
    {/* Left Main Content */}
    <Content style={{ paddingRight: '24px' }}>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
             <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
            alt="User Avatar"
            style={{ cursor: 'pointer', height:"40px", width:"40px" }}
          />
            <div style={{ marginLeft: '12px', marginTop:"10px" }}>
              <Title level={5}>Jenny Wilson</Title>
              <Text>Today 10:30 PM</Text>
            </div>
          </div>
        }
        extra={<Button ><MoreOutlined /></Button>}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
        </Text>
        <div style={{ marginTop: '12px', display: 'flex', gap: '24px' }}>
          <div>
            <MailOutlined /> w.lawson@example.com
          </div>
          <div>
            <PhoneOutlined /> 0555 066 899
          </div>
        </div>
        {/* Align Button to the End */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
          <Button type="primary">
            Send Proposal
          </Button>
        </div>
      </Card>
    </Content>

    {/* Right Sidebar */}
    <Sider width={400} style={{ background: '#fff', paddingRight: '24px', paddingLeft: '24px' }}>
      {/* Recent Leads */}
      <Card title="Recent Leads" style={{ marginBottom: '24px' }}>
        <List
          dataSource={leadsData.recentLeads}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                    alt="User Avatar"
                    style={{ cursor: 'pointer', height: "40px", width: "40px" }}
                  />
                }
                title={<Text>{item.name}</Text>}
                description={`${item.email} - ${item.location}`}
              />
              <Text>{item.amount}</Text>
            </List.Item>
          )}
        />
      </Card>

      {/* Call Leads Card */}
      <Card title="Call Leads (Monthly)" style={{ marginBottom: '24px' }}>
        <List
          dataSource={leadsData.callLeads}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                    alt="User Avatar"
                    style={{ cursor: 'pointer', height: "40px", width: "40px" }}
                  />
                }
                title={<Text>{item.name}</Text>}
                description={item.email}
              />
              <Text>{item.amount}</Text>
            </List.Item>
          )}
        />
      </Card>

      {/* Mail Leads Card */}
      <Card title="Mail Leads (Monthly)">
        <List
          dataSource={leadsData.mailLeads}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                    alt="User Avatar"
                    style={{ cursor: 'pointer', height: "40px", width: "40px" }}
                  />
                }
                title={<Text>{item.name}</Text>}
                description={item.email}
              />
              <Text>{item.amount}</Text>
            </List.Item>
          )}
        />
      </Card>
    </Sider>
  </Layout>
  )
}

export default page