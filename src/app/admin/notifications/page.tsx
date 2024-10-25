"use client";
import React from "react";
import {
  Layout,
  Row,
  Col,
  Card,
  Button,
  Select,
  Space,
  Typography,
  Avatar,
  Divider,
  Badge,
  Tabs,
  Table,
  Tooltip,
} from "antd";
import {
  EyeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import Search from "antd/es/input/Search";
import Icons from "@/component/common/Icons";

const { Header, Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;
const leads = [
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  // Add more leads
];
const members = [
  {
    key: "1",
    name: "Mike",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:true
  },
  {
    key: "2",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:true
  },
  {
    key: "3",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "4",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "5",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "6",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "7",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "8",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "9",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "10",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
  {
    key: "11",
    name: "John",
    date: "12-10-2024",
    product: "10 Downing Street",
    description: "qwertyuiopqwertyui",
    status:false
  },
];
const page = () => {
  const dataSource = members.map((member) => ({
    ...member,
    action: (
      <ul className="m-0 list-unstyled d-flex gap-2">
        <li>
        <Button shape="circle" type="link" className="p-0">
        {<Icons.RedDot />}
                        </Button>
        </li>
        <li>
          <Link href={`#`}>
            <Tooltip title="View Details">
              <Button className="ViewMore">
                <EyeOutlined />
              </Button>
            </Tooltip>
          </Link>
        </li>
      </ul>
    ),
  }));
  const columns = [
    {
      title: "Sr.no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Title level={3}>All Notifications</Title>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={18}>
            <Card className="common-card">
              {/* <div className='mb-4'>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item><Link className='text-decoration-none' href="/admin/dashboard">General</Link></Breadcrumb.Item>
                            <Breadcrumb.Item className='text-decoration-none'>Additional Users</Breadcrumb.Item>
                        </Breadcrumb>
                    </div> */}
              {/* title  */}
              <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                <Typography.Title level={3} className="m-0 fw-bold">
                  Notifications
                </Typography.Title>
              </div>
              <div className="mt-3">
                <Search 
                className="justify-content-center"
                style={{
                    width: "90%",
                    // maxWidth: "900px",
                    
                  }}/>
              </div>
              {/* Search  */}
              <Divider />
              {/* Tabs  */}
              <div className="tabs-wrapper my-4">
                {/* {loading1 ? (
                           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '20vh' }}>
                           <Spin size="large"/>
                       </div>
                        ) : ( */}
                <>
                  <Table
                    className="tableBox"
                    dataSource={dataSource}
                    columns={columns}
                    pagination={{
                      position: ["bottomCenter"],
                    }}
                  />
                </>
                {/* )} */}
              </div>
            </Card>
          </Col>

          <Col xs={24} md={6}>
            {" "}
            {/* Adjusted Col for sidebar */}
            <Sider width={300} style={{ background: "transparent" }}>
              <Card title="Recent leads" style={{ marginBottom: "20px" }}>
                <Space direction="vertical">
                  <Text>
                    <Avatar size={25} icon={<UserOutlined />} /> Jenny Wilson -
                    Austin
                  </Text>
                  <Text>
                    <Avatar size={25} icon={<UserOutlined />} /> Devon Lane -
                    New York
                  </Text>
                  <Button type="link">See All Recent Leads</Button>
                </Space>
              </Card>
              <Card title="Call Leads" style={{ marginBottom: "20px" }}>
                <Space direction="vertical">
                  <Text>
                    <Avatar size={25} icon={<UserOutlined />} /> Jane Cooper -
                    Toledo
                  </Text>
                  <Text>
                    <Avatar size={25} icon={<UserOutlined />} /> Dianne Russell
                    - Naperville
                  </Text>
                  <Button type="link">See All Call Leads</Button>
                </Space>
              </Card>
            </Sider>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};
export default page;
