"use client"
import { Card, Pagination, Space } from 'antd'
import React, { useEffect, useState } from 'react'
import { Layout, Row, Col, Button, Select, Typography, Avatar, Divider, Badge, Tabs, Tooltip } from 'antd';
const {Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
import { UserOutlined } from '@ant-design/icons';
import axios from 'axios';
import Link from 'next/link';
const Recent_card = () => {
  const [state,setState]=useState<any>([])
  const recentLeads = async () => {
    try {
      const res = await axios.get("https://srv626615.hstgr.cloud/recent-leads");
      console.log(res, "res");
      setState(res?.data)
    } catch (error) {}
  };

  useEffect(() => {
    recentLeads();
  }, []);
  console.log(state,"state");
  
    
  return (
    <Card title="Recent leads" style={{ marginBottom: '20px' }}>
    <Space direction="vertical">
        {state?.data?.slice(0,10).map((res:any, index:number)=>
        <Link href={`/admin/pearls/${res?.pearl_id}`} style={{ textDecoration: 'none' }}>
      <Text key={index}><Avatar size={25} icon={<UserOutlined />}  /> {res?.firstName||"N/A"} {res?.lastName||"N/A"} - { JSON.parse(res?.addresses).map((res:any, index:any)=> 
      <span className="" key={index}>{res?.city}, {res?.state}, {`(${res?.zip })`}</span>
    )}</Text>
    </Link>
        )}
      {/* <Text><Avatar size={25} icon={<UserOutlined />}  /> Devon Lane - New York</Text> */}
      {/* <Button type="link">See All Recent Leads</Button> */}
      {/* <Pagination /> */}
    </Space>
  </Card>
  )
}

export default Recent_card