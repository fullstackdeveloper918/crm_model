import { Card, Space } from 'antd'
import React from 'react'
import { Layout, Row, Col, Button, Select, Typography, Avatar, Divider, Badge, Tabs, Tooltip } from 'antd';
const {Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
import { UserOutlined } from '@ant-design/icons';
const Recent_card = ({data}:any) => {
    console.log(data,"qwertyuiopo");
    
  return (
    <Card title="Recent leads" style={{ marginBottom: '20px' }}>
    <Space direction="vertical">
        {data?.data?.slice(0,2).map((res:any, index:number)=>
      <Text><Avatar size={25} icon={<UserOutlined />}  /> {res?.firstName||"N/A"} {res?.lastName||"N/A"} - {res?.addresses.map((res:any)=> 
      <span className="">{res?.city}, {res?.state}, {`(${res?.zip })`}</span>
      )}</Text>
        )}
      {/* <Text><Avatar size={25} icon={<UserOutlined />}  /> Devon Lane - New York</Text> */}
      <Button type="link">See All Recent Leads</Button>
    </Space>
  </Card>
  )
}

export default Recent_card