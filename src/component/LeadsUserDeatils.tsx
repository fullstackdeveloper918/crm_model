"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  Avatar,
  Typography,
  Button,
  List,
  Layout,
  Tooltip,
  Steps,
  Space,
  Badge,
  Row,
  Tag,
  Col,
  Divider,
  Table,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  DownloadOutlined,
  FacebookFilled,
  FacebookOutlined,
  MailOutlined,
  MessageOutlined,
  MoreOutlined,
  PhoneOutlined,
  // ShareAltOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Link from "next/link";
import validation, { capFirst, replaceUnderScore } from "@/utils/validation";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/utils/api";
import { toast, ToastContainer } from "react-toastify";
import Calendar from "./common/Calendar";
import CreatMeeting from "./CreatMeeting";
import { PlusOutlined, PrinterOutlined, ShareAltOutlined, EditOutlined } from '@ant-design/icons';
const { Content, Sider } = Layout;
const { Text, Title } = Typography;
const leadsData = {
  recentLeads: [
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
  ],
  callLeads: [
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
  ],
  mailLeads: [
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
  ],
};
const { Step } = Steps;
const LeadsUserDeatils = ({ data, activitiest }: any, { data1 }: any) => {
  const [loading, setLoading] = useState(false);
  console.log(activitiest, "activitiest");
  // console.log(data2, "datadatadata");
  // data
  console.log(Array.isArray(data), "sadasdasddfg");
  const [recentActivity, RecentActivity] = useState<any>([]);

  const dataSource2 = Array.isArray(recentActivity?.data)
    ? recentActivity?.data.map((res: any, index: number) => {
        const actionForText =
          res?.action_for === "MADE_PHONE_CALL"
            ? "Phone call"
            : res?.action_for === "SENT_EMAIL"
            ? "Sent Email"
            : res?.action_for === "SENT_SMS"
            ? "Sent Sms"
            : "";
        return {
          key: index + 1,
          name: actionForText,
          date: dayjs(res?.created_at).format("DD-MM-YYYY"),
          product: "10 Downing Street",
          description: "qwertyuiopqwertyui",
          action: (
            <ul className="m-0 list-unstyled d-flex gap-2">
              <li>
                <Button
                  type="text"
                  className="px-0 border-0 bg-transparent shadow-none"
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>
              </li>
              <li>
                <Popconfirm
                  title="Delete"
                  description="Are you sure you want to delete ?"
                  onConfirm={(event: any) => {
                    // archive(res?._id);
                  }}
                >
                  <Button type="text" danger htmlType="button" className="px-0">
                    <i className="fa-solid fa-trash-can"></i>
                  </Button>
                </Popconfirm>
              </li>
            </ul>
          ),
        };
      })
    : [];
  const dataSource1 = [
    {
      key: "1",
      name: "Email",
      date: "Today, 10:00 AM",
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "Sms",
      date: "Today, 10:00 AM",
      address: "10 Downing Street",
    },
  ];

  const columns1 = [
    {
      title: "Sr. No",
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
    // {
    //   title: 'Address',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];
  const phoneValue = data?.getByOne[0]?.phone || "[]";
  let phoneNumber = "N/A"; // Default to "N/A"

  try {
    // Parse the phone value
    const parsedValue = JSON.parse(phoneValue);

    if (Array.isArray(parsedValue) && parsedValue.length > 0) {
      phoneNumber = parsedValue[0]?.number || "N/A";
    }
  } catch (error) {
    console.error("Failed to parse phone value:", error);
  }
  console.log(phoneValue, "phoneValue");
  const addressesString = data?.getByOne[0]?.addresses;
  let addressesArray = [];

  if (addressesString && addressesString !== "undefined") {
    try {
      addressesArray = JSON.parse(addressesString);
    } catch (error) {
      console.error("Error parsing addresses:", error);
    }
  }

  console.log(addressesArray, "sdfsdf");

  const phone = data?.getByOne[0]?.phones;
  // const phoneArray = JSON.parse(phone);
  let phoneArray = [];

  if (phone && phone !== "undefined") {
    try {
      phoneArray = JSON.parse(phone);
    } catch (error) {
      console.error("Error parsing phones:", error);
    }
  }
  console.log(phoneArray, "rerer");

  const router = useRouter();
  const send = () => {
    try {
      setLoading(true);
      router.push(
        `/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}&user_id=${data?.getByOne[0]?.user_uuid}&field_for=welcome&fieldType=email`
      );
    } catch (error) {
      setLoading(false);
    }
  };
  const [state, setState] = useState<any>([]);
  const getData = async () => {
    try {
      const res = await axios.get(`https://srv626615.hstgr.cloud/leads-api`);
      setState(res?.data);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  console.log(state, "state");
  const dataSource = state?.data
    ?.slice(0, 2)
    ?.map((res: any, index: number) => {
      return {
        key: index + 1,
        name: `${res?.firstName || "N/A"} ${res?.lastName || "N/A"}`, // Correctly formatted name
        email: res?.email || "N/A",
        amount: `$ ${res?.max_value || "0"}`, // Handle max_value with a fallback
        // location: res?.addresses?.slice(0,2)?.map((res1: any, index1: number) =>
        //   <span className="" key={index1}>
        //     {res1?.city}, {res1?.state}, ({res1?.zip})
        //   </span>
        // ) || "N/A", // Fallback if addresses is undefined
      };
    });

  const ChangeState = async (statusType: number) => {
    console.log(statusType, "jlsdjf");

    try {
      setLoading(false);
      let items = {
        pearl_id: data?.getByOne[0]?.pearl_id,
        user_uuid: data?.getByOne[0]?.user_uuid,
        status: statusType,
      } as any;
      const res = await api.PearlLeads.changeStatus(items);
      toast.success(res?.data);
      if (statusType == 2) {
        router.push(
          `/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}&user_uuid=${data?.getByOne[0]?.user_uuid}`
        );
      }
    } catch (error) {
      setLoading(false);
    }
  };
  console.log(recentActivity, "recentActivity");

  const getActivity = async () => {
    // let item = {
    //   user_uuid: data?.getByOne[0]?.user_uuid,
    // };
    const newStr = data?.getByOne[0]?.user_uuid.replace(
      /user_uuid: '.*?',/,
      ""
    );
    try {
      const res = await axios.get(
        `https://srv626615.hstgr.cloud/user-activity-list?user_uuid=${newStr}`
      );
      console.log(res, "activity");
      RecentActivity(res?.data);
    } catch (error) {}
  };
  useEffect(() => {
    getActivity();
  }, []);
  console.log(recentActivity, "recentActivity");
  const archive = async () => {
    try {
      let item = {
        user_uuid: data?.getByOne[0]?.user_uuid,
      };
      console.log(item, "item");

      const res = await api.PearlLeads.delete(item);
      // data();
      console.log(res, "ioioio");
      toast.success(res?.message);
      router.back();
      // window.location.reload();
    } catch (error) {}
  };
  const description = "This is a description.";
  const steps = [
    { title: 'LEAD RECEIVED', status: 'Completed', date: 'Mar 29, 23', color: 'green' },
    { title: 'CUSTOMER', status: 'Completed', date: 'Mar 29, 23', color: 'red' },
    { title: 'ESTIMATE', status: 'Completed', date: 'Mar 30, 23', color: 'gold' },
    { title: 'PROPOSAL', status: 'Completed', date: 'Apr 01, 23', color: 'cyan' },
    { title: 'FOLLOW UP', status: 'Completed', date: 'Apr 04, 23', color: 'purple' },
    { title: 'WORK', status: 'Ongoing', date: 'Apr 05, 23', color: 'lime' },
    { title: 'INVOICED', status: 'Pending', date: '', color: 'default' },
    { title: 'PAID', status: 'Pending', date: '', color: 'default' },
  ];
  return (
    <>
      <ToastContainer />
      
        <div style={{ padding: '4px' }}>
      <Space direction="vertical" className="justify-content-end" style={{ width: '100%' }}>
        {/* <Space style={{ justifyContent: 'space-between', width: '100%' }}>
          <Text strong>Stages (17)</Text>
          <Button type="primary" icon={<PlusOutlined />} style={{ backgroundColor: 'green' }}>
            Add
          </Button>
        </Space> */}
         <Card title="Lead Stages" style={{ marginTop: 24 }}>
        <Steps progressDot current={5} size="small">
          {steps.map((step, index) => (
            <Step
              key={index}
              title={
                <div style={{ textAlign: 'center' }}>
                  <Text style={{ color: step.color }}>{step.title}</Text>
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {step.status} {step.date && `(${step.date})`}
                    </Text>
                  </div>
                </div>
              }
            />
          ))}
        </Steps>
        </Card>
        {/* <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
          <Button icon={<PrinterOutlined />}>Print</Button>
          <Button icon={<ShareAltOutlined />}>Share</Button>
          <Button icon={<EditOutlined />}>Edit</Button>
        </Space> */}
      </Space>
    </div>
      <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
        {/* Header Section */}
        <Card>
          {/* <div className="mt-2 mb-5">
            <Steps
              current={1}
              items={[
                {
                  title: "Email",
                  description,        
                },
                {
                  title: "SMS",
                  description,
                  // subTitle: 'Left 00:00:08',
                },
                {
                  title: "Call",
                  description,
                },
                {
                  title: "Meeting",
                  description,
                },
              ]}
            />
          </div> */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              width: "100%",
            }}
          >
            <div style={{ flex: 1, textAlign: "start" }}>
              <Typography.Title level={3} style={{ fontWeight: "bold" }}>
                {data?.getByOne[0]?.firstName || "N/A"}{" "}
                {data?.getByOne[0]?.lastName || " "} Details
              </Typography.Title>
            </div>
            <div className="flex gap-3">
              <Tooltip title="Send SMS">
                <Button className="ViewMore">
                  <span style={{ fontSize: "20px" }}>
                    <MessageOutlined style={{ color: "blue" }} />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title="Send Mail">
                <Button className="ViewMore" loading={loading} onClick={send}>
                  <span style={{ fontSize: "20px" }}>
                    <MailOutlined style={{ color: "orange" }} />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title="Call">
                <Button className="ViewMore" onClick={() => ChangeState(3)}>
                  <span style={{ fontSize: "20px" }}>
                    <PhoneOutlined style={{ color: "green" }} />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title="Delete">
                <Popconfirm
                  title="Delete"
                  description="Are you sure you want to delete ?"
                  onConfirm={archive}
                  // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                >
                  <Button className="ViewMore">
                    <span style={{ fontSize: "20px" }}>
                      <DeleteOutlined style={{ color: "red" }} />
                    </span>
                  </Button>
                </Popconfirm>
              </Tooltip>
            </div>
          </div>
          <Row gutter={[16, 16]} align="middle">
            <Col>
              <Avatar size={64} style={{ backgroundColor: "#a5d6a7" }}>
                {data?.getByOne[0]?.firstName.slice(0, 2).toUpperCase()}
              </Avatar>
            </Col>
            <Col flex="auto">
              <Space direction="vertical" size={0}>
                <Title level={4}>
                  {" "}
                  {data?.getByOne[0]?.firstName || "N/A"}{" "}
                  {data?.getByOne[0]?.lastName || "N/A"}{" "}
                </Title>
                <Text type="secondary">
                  {data?.getByOne[0]?.email || "N/A"}
                </Text>
                <Text>
                  <PhoneOutlined style={{ marginRight: 4 }} />
                  {phoneArray?.map((res: any, index: number) => (
                    <span className="" key={index}>
                      {res?.number}
                    </span>
                  ))}
                </Text>
                {/* <Space>
              <Text>Gender: {data?.getByOne[0]?.gender === "M" ? "Male" : "Female"}</Text>
              <Divider type="vertical" />
              <Text>Address:  {addressesArray?.map((res: any, index: any) => (
                    <span className="" key={index}>
                      {res?.city}, {res?.state}, {`(${res?.zip})`}
                    </span>
                   ))}</Text>
              <Divider type="vertical" />
              <Text>Income Range: {data?.getByOne[0]?.incomeRange || "N/A"}</Text>
              <Divider type="vertical" />
              <Text>Latest Activity Date:  {dayjs(data?.getByOne[0]?.latestActivityDate).format(
                     "MM-DD-YYYY"
                   ) || "N/A"}</Text>
            </Space> */}
              </Space>
            </Col>
          </Row>
          <Row
            gutter={[16, 16]}
            style={{
              marginTop: "10px",
              border: "1px solid #f0f0f0",
              borderRadius: 8,
              padding: 16,
            }}
          >
            <Col span={6}>
              <Space direction="vertical">
                <Text type="secondary">Gender</Text>
                <Text>
                  {data?.getByOne[0]?.gender === "M" ? "Male" : "Female"}
                </Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Text type="secondary">Address</Text>
                <Text>
                  {addressesArray?.map((res: any, index: number) => (
                    <span key={index}>
                      {res?.city}, {res?.state}, {`(${res?.zip})`}
                    </span>
                  ))}
                </Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Text type="secondary">Income Range</Text>
                <Text>{data?.getByOne[0]?.incomeRange || "N/A"}</Text>
              </Space>
            </Col>
            <Col span={6}>
              <Space direction="vertical">
                <Text type="secondary">Latest Activity Date</Text>
                <Text>
                  {data?.getByOne[0]?.latestActivityDate
                    ? dayjs(data?.getByOne[0]?.latestActivityDate).format(
                        "MM-DD-YYYY"
                      )
                    : "N/A"}
                </Text>
              </Space>
            </Col>
          </Row>

          <Divider />
          {/* <Row>
        <Space>
          <Button type="default"><MessageOutlined/>SMS</Button>
          <Button type="default"><MailOutlined/>Email</Button>
          <Button type="primary"><PhoneOutlined/>Phone</Button>
          <Button>Open Deals</Button>
          <Button type="default">Closed</Button>
        </Space>
      </Row> */}
        </Card>

        {/* Upcoming Activity */}
        <Card title="Latest Activity" style={{ marginTop: 24 }}>
          {/* <List
        itemLayout="vertical"
        dataSource={[
          {
            title: 'Prepare quote for Jerome Bell',
            description:
              'She’s interested in our new product line and wants our very best price. Please include a detailed breakdown of costs.',
            priority: 'High',
            assignedTo: 'Esther Howard',
          },
        ]}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<Text>{item.title}</Text>}
              description={<Text type="secondary">{item.description}</Text>}
            />
            <Space direction="vertical">
              <Badge color="red" text={`Priority: ${item.priority}`} />
              <Text>Assigned to: {item.assignedTo}</Text>
            </Space>
          </List.Item>
        )}
      /> */}
          <Table
            dataSource={dataSource2}
            columns={columns1}
            pagination={false}
          />
        </Card>

        {/* Notes Section */}
        <Card title="Notes" style={{ marginTop: 24 }}>
          <List
            dataSource={[
              {
                content: "She’s interested in our new product line.",
                date: "Today, 10:00 AM",
              },
              {
                content: "Follow up on detailed breakdown of costs.",
                date: "Today, 10:00 AM",
              },
            ]}
            renderItem={(note) => (
              <List.Item>
                <Text>{note.content}</Text>
                <Text type="secondary" style={{ marginLeft: 16 }}>
                  {note.date}
                </Text>
              </List.Item>
            )}
          />
        </Card>
        <CreatMeeting />

        <Calendar getdata={data} />
      </div>
    </>
  );
};

export default LeadsUserDeatils;
