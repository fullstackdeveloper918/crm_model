"use client"
import { Button, Input, Upload, Row, Col, Card, List, Avatar, Form } from 'antd';
import { UploadOutlined, LeftOutlined, InboxOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Dragger from 'antd/es/upload/Dragger';
import api from '@/utils/api';
const Sent_Purposal = () => {
    const searchParam:any = useSearchParams();
    const id = searchParam;
    console.log(id,"searchParam");
    
    const router= useRouter()
    const recentLeads = [
        { name: 'Jenny Wilson', email: 'j.wilson@example.com', amount: '$11,234', location: 'Austin' },
        { name: 'Devon Lane', email: 'd.lane@example.com', amount: '$11,159', location: 'New York' },
      ];
    
      const callLeads = [
        { name: 'Jane Cooper', email: 'j.cooper@example.com', amount: '$10,483', location: 'Toledo' },
        { name: 'Dianne Russell', email: 'd.russell@example.com', amount: '$9,084', location: 'Naperville' },
      ];
    
      const mailLeads = [
        { name: 'Jane Cooper', email: 'j.cooper@example.com', amount: '$10,483', location: 'Toledo' },
        { name: 'Dianne Russell', email: 'd.russell@example.com', amount: '$9,084', location: 'Naperville' },
      ];
      const [file, setFile] = useState<any>(null);
      const handleFileChange = (info:any) => {
        setFile(info.file.originFileObj); 
      };
      const onFinish = async(values: any) => {
        const formData:any = new FormData();
        formData.append('file', file);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
          let item={
            // user_uuid:
          }
          try {
            const res= await api.Leads.sent_purposal(formData)
          } catch (error) {
            console.log(error,"eroor");
            
          }
        
    };
  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={16}>
          <Button icon={<LeftOutlined />} type="link">
            Back
          </Button>
          <h2>View Proposal</h2>

          <Form onFinish={onFinish}>
        <Form.Item
          name="productName"
          rules={[{ required: true, message: 'Please input the product name!' }]}
        >
          <Input placeholder="Product Name" style={{ marginBottom: '16px' }} />
        </Form.Item>

        <Form.Item
          name="label"
          rules={[{ required: true, message: 'Please input the label!' }]}
        >
          <Input.TextArea placeholder="Label" rows={4} style={{ marginBottom: '16px' }} />
        </Form.Item>

        <Form.Item name="upload" >
        <Dragger   multiple={false} onChange={handleFileChange}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
  </Dragger>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: '16px' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
        </Col>

        <Col span={8}>
          {/* Sidebar for Leads */}
          <Card title="Recent Leads" style={{ marginBottom: '16px' }}>
            <List
              itemLayout="horizontal"
              dataSource={recentLeads}
              renderItem={(lead) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" />}
                    title={lead.name}
                    description={lead.email}
                  />
                  <div>{lead.amount}</div>
                </List.Item>
              )}
            />
            <Button type="link">See All Recent Leads</Button>
          </Card>

          <Card title="Call Leads" style={{ marginBottom: '16px' }}>
            <List
              itemLayout="horizontal"
              dataSource={callLeads}
              renderItem={(lead) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" />}
                    title={lead.name}
                    description={lead.email}
                  />
                  <div>{lead.amount}</div>
                </List.Item>
              )}
            />
            <Button type="link">See All Call Leads</Button>
          </Card>

          <Card title="Mail Leads">
            <List
              itemLayout="horizontal"
              dataSource={mailLeads}
              renderItem={(lead) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src="https://via.placeholder.com/40" />}
                    title={lead.name}
                    description={lead.email}
                  />
                  <div>{lead.amount}</div>
                </List.Item>
              )}
            />
            <Button type="link">See All Mail Leads</Button>
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Sent_Purposal