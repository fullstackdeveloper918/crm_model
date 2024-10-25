"use client"
import { Button, Input, Upload, Row, Col, Card, List, Avatar, Form } from 'antd';
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
const Sent_Purposal = () => {
    const [fileList, setFileList] = useState<any>([])
    // console.log(fileList[0].originFileObj,"fileList");
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
      const handleChange = ({ fileList }:any) => {
        setFileList(fileList);
      };
      const onFinish = (values: any) => {
        // router.push(`/admin/purposal/sent_purposal_list`)

        const formData:any = new FormData();
        console.log(values, "values");
    
        const file = values?.upload?.file;
    console.log(file,"file");
    
        if (file) {
            formData.append('file', file);
            
            // Log the FormData contents
            for (const [key, value] of formData.entries()) {
                console.log(key, value);
            }
    
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const binaryData = event.target?.result;
                console.log(binaryData, "binaryData");
            };
    
            reader.readAsArrayBuffer(file);
       
          } else {
            console.error("No file found in values.upload.file");
        }
        console.log(formData,"formData");
        
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
        <Upload 
            fileList={fileList} 
            onChange={handleChange} 
            beforeUpload={() => false} // Prevent automatic upload
          >
            <Button icon={<UploadOutlined />}>Upload Here</Button>
          </Upload>
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