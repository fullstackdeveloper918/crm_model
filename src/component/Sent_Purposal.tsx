"use client";
import {
  Button,
  Input,
  Upload,
  Row,
  Col,
  Card,
  List,
  Avatar,
  Form,
  Tabs,
  Badge,
  Modal,
  Radio,
  Select,
  Checkbox,
} from "antd";
import { UploadOutlined, LeftOutlined, InboxOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Dragger from "antd/es/upload/Dragger";
import api from "@/utils/api";
import { capFirst } from "@/utils/validation";
const { TextArea } = Input;
const tabs = [
  {
    key: "email",
    label: <span>Email</span>,
  },
  {
    key: "sms",
    label: <span>SMS</span>,
  },
];
const Sent_Purposal = ({ data1 }: any) => {
  console.log(data1, "data1");

  // const searchParam:any = useSearchParams();
  // const id = searchParam;
  // console.log(id,"searchParam");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const router = useRouter();
  const recentLeads = [
    {
      name: "Jenny Wilson",
      email: "j.wilson@example.com",
      amount: "$11,234",
      location: "Austin",
    },
    {
      name: "Devon Lane",
      email: "d.lane@example.com",
      amount: "$11,159",
      location: "New York",
    },
  ];

  const callLeads = [
    {
      name: "Jane Cooper",
      email: "j.cooper@example.com",
      amount: "$10,483",
      location: "Toledo",
    },
    {
      name: "Dianne Russell",
      email: "d.russell@example.com",
      amount: "$9,084",
      location: "Naperville",
    },
  ];

  const mailLeads = [
    {
      name: "Jane Cooper",
      email: "j.cooper@example.com",
      amount: "$10,483",
      location: "Toledo",
    },
    {
      name: "Dianne Russell",
      email: "d.russell@example.com",
      amount: "$9,084",
      location: "Naperville",
    },
  ];
  const [file, setFile] = useState<any>(null);
  const handleFileChange = (info: any) => {
    setFile(info.file.originFileObj);
  };
  const onFinish = async (values: any) => {
    const formData: any = new FormData();
    formData.append("file", file);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    let item = {
      // user_uuid:
    };
    try {
      const res = await api.Leads.sent_purposal(formData);
    } catch (error) {
      console.log(error, "eroor");
    }
  };
  const [activeKey, setActiveKey] = useState<any>("");
  const handleChange = (key: any) => {
    setActiveKey(key);
    console.log("Selected tab:", key); // This will log the selected tab value
  };
  console.log(data1?.data, "data1?.data");
  const [filedTypes, setFiledTypes] = useState<any>([]);

  useEffect(() => {
    if (data1?.data) {
      const types = data1.data.map((res: any) => res?.filed_type);
      console.log(types, "type");

      setFiledTypes(types);
    }
  }, [data1]);
  console.log(filedTypes, "filedTypes");
  const targetName = "Document";
  const textCount = data1?.data.filter((item:any) => item.type === "text" && item.name === targetName).length;
  console.log(textCount,"textCount");
  
  return (
    <div style={{ padding: "20px" }}>
      <Row gutter={16}>
        <Col span={16}>
          <Button icon={<LeftOutlined />} type="link">
            Back
          </Button>
          <h2>Send Proposal</h2>
          <Tabs
            defaultActiveKey="all"
            items={tabs}
            onChange={handleChange}
            style={{
              backgroundColor: "#f5f5f5",
              padding: "10px",
              borderRadius: "5px",
            }}
          />
          <Card
            title={`${capFirst(activeKey || "Email")} Form`}
            extra={
              <Button type="primary" onClick={showModal}>
                Preview
              </Button>
            }
            style={{ width: 800, margin: "auto", marginTop: "20px" }}
          >
             <Form layout="vertical">
      {data1.data.map((item:any, index:any) => {
        switch (item.filed_type) {
          case "textarea":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <TextArea placeholder={`Enter text area ${index + 1}`} />
              </Form.Item>
            );
          case "number":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <Input type="number" placeholder={`Enter number ${index + 1}`} />
              </Form.Item>
            );
          case "text":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <Input placeholder={`Enter text ${index + 1}`} />
              </Form.Item>
            );
          case "radio":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <Radio.Group>
                  <Radio value="option1">Option 1</Radio>
                  <Radio value="option2">Option 2</Radio>
                </Radio.Group>
              </Form.Item>
            );
          case "dropDown":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <Select placeholder={`Select an option ${index + 1}`}>
                  <Select.Option value="option1">Option 1</Select.Option>
                  <Select.Option value="option2">Option 2</Select.Option>
                </Select>
              </Form.Item>
            );
          case "checkbox":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <Checkbox>Check this box</Checkbox>
              </Form.Item>
            );
          case "image":
            return (
              <Form.Item key={index} label={item.filed_name}>
                <Dragger multiple={false} onChange={handleFileChange}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                  </Dragger>
              </Form.Item>
            );
          default:
            return null;
        }
      })}

      {/* Render text inputs explicitly based on the textCount */}
      {Array.from({ length: textCount }).map((_, i) => (
        <Form.Item key={`dynamic-text-${i}`} label={`Text Input for ${targetName}`}>
          <Input placeholder={`Enter text for ${targetName}`} />
        </Form.Item>
      ))}

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
          </Card>
        </Col>

        <Col span={8}>
          {/* Sidebar for Leads */}
          <Card title="Recent Leads" style={{ marginBottom: "16px" }}>
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

          <Card title="Call Leads" style={{ marginBottom: "16px" }}>
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
      <Modal
        title={`${capFirst(activeKey || "Email")} Form`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Card

        // style={{ width: 800, margin: 'auto', marginTop: '20px' }}
        >
          <Form onFinish={onFinish}>
            <label>Product Name :</label>
            <Form.Item
              name="productName"
              // label="Product Name"
              // rules={[{ required: true, message: 'Please input the product name!' }]}
            >
              asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            </Form.Item>
            <label>Label :</label>
            <Form.Item
              name="label"
              // label="Label"
              // rules={[{ required: true, message: 'Please input the label!' }]}
            >
              asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
              asdfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
            </Form.Item>

            <Form.Item name="upload">
              <Dragger multiple={false} onChange={handleFileChange}>
                <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                </p>
                <p className="ant-upload-text">
                  Click or drag file to this area to upload
                </p>
              </Dragger>
            </Form.Item>

            {/* <Form.Item>
          <Button type="primary" htmlType="submit" style={{ marginTop: '16px' }}>
            Submit
          </Button>
        </Form.Item> */}
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default Sent_Purposal;
