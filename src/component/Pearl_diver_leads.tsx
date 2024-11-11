"use client";
import React, { useEffect, useState } from "react";
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
  Tooltip,
  Statistic,
} from "antd";
import { MailOutlined, PhoneOutlined, UserOutlined } from "@ant-design/icons";
import Link from "next/link";
import api from "@/utils/api";
import dayjs from "dayjs";
import { capFirst, replaceUnderScore } from "@/utils/validation";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./common/Pagination";
import Recent_card from "./common/Recent_card";
// import remUndrscore from "../utils/validation/replaceUnderScore"
const { Content, Sider } = Layout;
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

const Pearl_diver_leads = ({ data, fetchData,fetchData1 }: any) => {
  const [activeKey, setActiveKey] = useState("all");
  const [clickedTabs, setClickedTabs] = useState<any>({});
  console.log(data, "data");
  const router = useRouter();
  const handleChange1 = (value: string) => {
    // Update the URL with the selected value
    router.push(`/admin/pearls?filter=${value}`);
  };

  const handleChange = (key: any) => {
    setActiveKey(key);
    setClickedTabs((prev: any) => ({ ...prev, [key]: true }));
  };
  const tabs = [
    {
      key: "all",
      label: (
        <Tooltip title={`Total Pearl Diver Leads ${data?.total_length}`}>
          <span>
            {/* All leads */}
            {/* {!clickedTabs['all'] && <Badge count={data?.total_length} />} */}
            All leads
            {!clickedTabs["all"] && (
              <>
                <Badge count={data?.total_length} />
              </>
            )}
          </span>
        </Tooltip>
      ),
    },
    {
      key: "priority",
      label: (
        <span>
          {!clickedTabs["priority"] && (
            <>
              <Badge color="orange" />
            </>
          )}
          Priority leads
          {!clickedTabs["priority"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
    {
      key: "non-potential",
      label: (
        <span>
          {/* {!clickedTabs['non-potential'] && <Badge color="red" />} */}
          {!clickedTabs["non-potential"] && (
            <>
              <Badge color="red" />
            </>
          )}
          Non Potential leads
          {!clickedTabs["non-potential"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
    {
      key: "all-mails",
      label: (
        <span>
          {!clickedTabs["all-mails"] && (
            <>
              <Badge color="red" />
            </>
          )}
          All mails
          {!clickedTabs["all-mails"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
    {
      key: "call-leads",
      label: (
        <span>
          {/* {!clickedTabs['call-leads'] && <Badge color="green" />}
          Call leads */}
          {!clickedTabs["call-leads"] && (
            <>
              <Badge color="green" />
            </>
          )}
          Call leads
          {!clickedTabs["call-leads"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
  ];
  const [state, setState] = useState<any>([]);
  console.log(data, "data");
  const getData = async () => {
    try {
      // const res =await api.Leads.listing()
      const res = await api.Leads.listing();
      console.log(res, "kkkk");
      setState(res);
    } catch (error) {
      console.log(error, "check error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const colorMap: { [key: string]: string } = {
    "High-Potential Leads": "rgb(14 110 49)", // Light Green
    "Potential Lead": "rgb(147 96 11)", // Yellow
    "Suspect Lead": "rgb(201 28 28)", // Red
    "mail-lead": "#007BFF", // Purple
    "call-lead": "#3B82F6", // Blue
    "sms-lead": "#6f42c1", // Orange
  };
  
  // Background color mapping (you can adjust these colors as needed)
  const backgroundcolorMap: { [key: string]: string } = {
"High-Potential Leads": "rgb(207 231 211)", // Green
    "Potential Lead": "rgb(239 233 201)", // Light Yellow
    "Suspect Lead": "rgb(235 222 222)", // Light Red
    "mail-lead": "rgb(201 214 227)", // Light Purple
    "call-lead": "#BFDBFE", // Light Blue
    "sms-lead": "#e1dde9", // Light Orange
  };
  // ffddbe
  const data2 = [
    { label: "All leads ", count: fetchData?.data?.totalLeads, color: "black" },
    {
      label: "High-Potential Leads",
      count: fetchData?.data?.priorityLeads,
      color: "rgb(14 110 49)",
      
    },
    {
      label: "Potential leads",
      count: fetchData?.data?.potentialLeads,
      color: "rgb(147 96 11)",
    },
    {
      label: "Suspect Leads",
      count: fetchData?.data?.nonPotentialLeads,
      color: "rgb(201 28 28)",
    },
    { label: "All mails", count:fetchData?.data?.mailLeads||"0", color: "#007BFF" },
    { label: "Call leads", count: fetchData?.data?.calledLeads||"0", color: "#3B82F6",Link:`/admin/pearls?filter=call_lead` },
    { label: "Sms leads", count: fetchData?.data?.smsLeads||"0", color: "#6f42c1",Link:`/admin/pearls?filter=call_lead` },
  ];
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        <Row gutter={[16, 16]} justify="start">
          {data2.map((item: any, index: number) => (
            <Col key={index}>
              <Card
                bordered={false}
                style={{ textAlign: "center", minWidth: "100px" }}
                className="pearl_card"
              >
                <Statistic
                  title={
                    <Badge
                      color={item.color}
                      text={
                        <span style={{ fontWeight: "bold" }}>{item.label}</span>
                      }
                    />
                  }
                  value={item.count}
                  valueStyle={{ color: "#00000", fontSize: "16px" }}
                />
              </Card>
            </Col>
          ))}
        </Row>
        {/* <Tabs
      defaultActiveKey="all"
      items={tabs}
      activeKey={activeKey}
      onChange={handleChange}
      style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
    /> */}
        <Title className="mt-3" level={3}>
          All Pearl Diver Leads
        </Title>

        <Row justify="space-between" style={{ marginBottom: "20px" }}>
          <Space>
            <Select
              defaultValue="All Leads"
              style={{ width: 150 }}
              onChange={handleChange1}
            >
              <Option value="all">All Leads</Option>
              <Option value="priority">High-Potential Leads</Option>
              <Option value="potential">Potential Leads</Option>
              <Option value="non_potential">Suspect Leads</Option>
              <Option value="call_lead">Call Leads</Option>
              <Option value="mail">Email Leads</Option>
              <Option value="sms">Sms Leads</Option>
              {/* <Option value="mail">Mail Leads</Option>
              <Option value="call">Call Leads</Option> */}
            </Select> 
            {/* <Select defaultValue="Select" style={{ width: 120 }}>
              <Option value="date">Date</Option>
              <Option value="name">Name</Option>
            </Select> */}
          </Space>
        </Row>

        <Row gutter={[16, 16]}>
          <Col xs={24} md={18}>
            <Row gutter={[16, 16]}>
              {data?.data?.map((lead: any, index: number) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Link href={`/admin/pearls/${lead?.pearl_id}`}>
                    <Card
                      hoverable
                      // className={lead.status === "prioritize" ? 'blinking-card' : ''} // Adjust 'your-status' as needed
                      style={{ borderRadius: "10px" }}
                      actions={[
                        <Tooltip title={lead.status==="High-Potential Leads"?"We are displaying leads based on the following criteria: personal count is 5, phone number is not null, address is not null, and income value is not 0 dollars":lead.status==="Potential Lead"?" We are displaying leads based on the following criteria: personal count is 1, phone number is not null, address is not null, and income value is not 0 dollars.":lead.status==="Suspect Lead"?"We are displaying leads based on the following criteria: personal count is 0, address is null, and income value is 0 dollars.":""}>
                        <Button
                          style={{
                            color: colorMap[lead.status] || "#000000", // Default text color if not found
                            backgroundColor: backgroundcolorMap[lead.status] || "rgb(187, 181, 181)", // Default background color if not found
                          }}
                          key="action"
                          size="small"
                        >
                          {((lead.status))}
                        </Button>
                        </Tooltip>
                        ,
                      ]}
                    >
                      <Space direction="vertical" size="small">
                        <Title level={5}>
                          <Avatar
                            size={34}
                            icon={<UserOutlined />}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                          />
                          {lead?.firstName
                            ? `${lead?.firstName} ${lead?.lastName}`
                            : "N/A"}
                        </Title>
                        <Text>
                          {dayjs(lead?.created_at).format("DD-MM-YYYY")}
                        </Text>
                        <Divider className="pearl_card_divider" style={{margin:"0px"}}/>
                        <Text>
                          <PhoneOutlined />{" "}
                          {lead.phones
                            .map((res: any, index: number) => res.number)
                            .join(", ") || "N/A"}
                        </Text>
                        <Text>
                          <MailOutlined /> {lead.email}
                        </Text>
                      </Space>
                    </Card>
                  </Link>
                </Col>
              ))}
            </Row>

            {/* Centered Pagination */}
            <Row justify="center">
              <Pagination totalItems={data?.total_length} limit={10} />
            </Row>
          </Col>

          <Col xs={24} md={6}>
            <Recent_card />
            {/* <Card title="Call Leads" style={{ marginBottom: '20px' }}>
                <Space direction="vertical">
                
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Jane Cooper - Toledo</Text>
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Dianne Russell - Naperville</Text>
                  <Button type="link">See All Call Leads</Button>
                </Space>
              </Card> */}
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default Pearl_diver_leads;
