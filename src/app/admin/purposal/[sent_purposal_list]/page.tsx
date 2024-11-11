"use client";
import {
  Table,
  Avatar,
  Button,
  Card,
  Row,
  Col,
  Space,
  List,
  Checkbox,
  CheckboxProps,
} from "antd";
import {
  CheckCircleOutlined,
  CheckCircleTwoTone,
  MinusCircleOutlined,
  MinusCircleTwoTone,
} from "@ant-design/icons";
import type { NextPage } from "next";
import Search from "antd/es/input/Search";
import Recent_card from "@/component/common/Recent_card";

const columns = [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    render: (avatar: string) => <Avatar src={avatar} />,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "",
    dataIndex: "status",
    key: "status",
    render: (status: boolean) =>
      status ? <CheckCircleOutlined /> : <MinusCircleOutlined />,
  },
];

const data = [
  {
    key: "1",
    avatar: "https://example.com/avatar1.png",
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    status: true,
  },
  // Add more lead data here
];

const recentLeads = [
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    amount: "$11,234",
    location: "Austin",
  },
  {
    name: "Devon Lane",
    email: "dat.roberts@example.com",
    amount: "$11,159",
    location: "New York",
  },
];

const callLeads = [
  {
    name: "Jane Cooper",
    email: "jgraham@example.com",
    amount: "$10,483",
    location: "Toledo",
  },
  {
    name: "Dianne Russell",
    email: "curtis.d@example.com",
    amount: "$9,084",
    location: "Naperville",
  },
];
const leads = [
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/1.jpg",
    //   status: true,
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    //   status: false,
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/3.jpg",
    //   status: true,
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    //   status: false,
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    //   status: true,
  },
  {
    name: "Jenny Wilson",
    email: "w.lawson@example.com",
    avatar: "https://randomuser.me/api/portraits/women/5.jpg",
    //   status: true,
  },
];
const page = () => {
  const renderLeadItem = (item: any) => (
    <List.Item>
      <List.Item.Meta
        avatar={
          <Avatar
            src={`https://randomuser.me/api/portraits/med/men/${Math.floor(
              Math.random() * 10
            )}.jpg`}
          />
        }
        title={item.name}
        description={item.email}
      />
      <div>{item.amount}</div>
    </List.Item>
  );
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Row gutter={16}>
      <Col span={16}>
      <h3 style={{ fontWeight: "bold" }}>Priorities leads box</h3>
        <Card
          style={{
            padding: "30px",
            // backgroundColor: "#f7f9fc",
            borderRadius: "8px",
          }}
        >
          <Search  style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "20px",
                  // background: '#f5f5f5',
                  padding: "5px 10px",
                //   marginTop: "5px",
                }} />
          <Row gutter={[16, 16]} justify="center" className="mt-5">
            {leads.map((lead, index) => (
              <Col key={index} span={12}>
                <Row align="middle">
                  <Col span={4}>
                    <Avatar src={lead.avatar} size={48} />
                  </Col>
                  <Col span={12}>
                    <h6 style={{ marginBottom: 0 }}>{lead.name}</h6>
                    <p style={{ marginBottom: 0, color: "#888" }}>
                      {lead.email}
                    </p>
                  </Col>
                  <Col span={4}>
                    {/* {lead.status ? ( */}
                    {/* // <CheckCircleTwoTone twoToneColor="#1890ff" /> */}
                    <Checkbox onChange={onChange} />
                    {/* //   ) : (
            //     <MinusCircleTwoTone twoToneColor="#ccc" />
            //   )} */}
                  </Col>
                </Row>
              </Col>
            ))}
          </Row>
          <Space style={{ marginTop: "50px" }}>
            <Button type="primary">Email send</Button>
            <Button>Back</Button>
          </Space>
        </Card>
      </Col>
      <Col span={8} className="mt-5">
       <Recent_card/>
        {/* <Card
          title="Call leads"
          extra={<a href="#">See all call leads</a>}
          style={{ marginTop: 16 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={callLeads}
            renderItem={renderLeadItem}
          />
        </Card>
        <Card
          title="Call leads"
          extra={<a href="#">See all call leads</a>}
          style={{ marginTop: 16 }}
        >
          <List
            itemLayout="horizontal"
            dataSource={callLeads}
            renderItem={renderLeadItem}
          />
        </Card> */}
        {/* Similarly for Mail leads */}
      </Col>
    </Row>
  );
};

export default page;
