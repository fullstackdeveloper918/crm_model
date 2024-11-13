"use client";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, List, Layout, Tooltip, Steps } from "antd";
import {
  DownloadOutlined,
  FacebookFilled,
  FacebookOutlined,
  MailOutlined,
  MessageOutlined,
  MoreOutlined,
  PhoneOutlined,
  ShareAltOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Link from "next/link";
import validation, { capFirst, replaceUnderScore } from "@/utils/validation";
import { useRouter } from "next/navigation";
import axios from "axios";
import api from "@/utils/api";
import { toast, ToastContainer } from "react-toastify";
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
const LeadsUserDeatils = ({ data }: any, { data1 }: any) => {
  const [loading, setLoading] = useState(false);
  console.log(data1, "rrerer");
  // console.log(data2, "datadatadata");

  const phoneValue = data?.getByOne[0]?.phone || "[]"; // Default to empty array if phone is undefined
  let phoneNumber = "N/A"; // Default to "N/A"

  try {
    // Parse the phone value
    const parsedValue = JSON.parse(phoneValue);

    // Check if parsedValue is an array and has at least one element
    if (Array.isArray(parsedValue) && parsedValue.length > 0) {
      phoneNumber = parsedValue[0]?.number || "N/A"; // Fallback to "N/A" if number is undefined
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
        `/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}&user_id=${data?.getByOne[0]?.user_uuid}&field_for=welcome`
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
  const [recentActivity, RecentActivity] = useState<any>([]);
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
  const array = ["email", "phone", "sms", "whatsapp", "facebook"];
  const getStepData = (step:any) => {
    switch (step) {
      case "email":
        return {
          title: "Email",
          description: "Send an email to the recipient.",
          icon: <MailOutlined />
        };
      case "phone":
        return {
          title: "Phone",
          description: "Make a phone call to the recipient.",
          icon: <PhoneOutlined />
        };
      case "sms":
        return {
          title: "SMS",
          description: "Send an SMS message.",
          icon: <MessageOutlined />
        };
      case "whatsapp":
        return {
          title: "WhatsApp",
          description: "Send a WhatsApp message.",
          icon: <WhatsAppOutlined />
        };
      case "facebook":
        return {
          title: "Facebook",
          description: "Send a message on Facebook.",
          icon: <FacebookFilled />
        };
      default:
        return {};
    }
  };

  const back=()=>{
router.back()
  }
  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      {/* Left Main Content */}
      <ToastContainer />
      <Content
        style={{
          display: "flex",
          justifyContent: "space-between", // Space out the cards horizontally
          // alignItems: "center",            // Center them vertically
          paddingRight: "24px",
        }}
      >
         <Card
          style={{
            maxWidth: "600px",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            {/* Breadcrumbs (commented out) */}
            <Button onClick={back}>Back</Button>
          </div>
          {/* Title */}
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
              <Tooltip title="Send Mail">
                <Button className="ViewMore" loading={loading} onClick={send}>
                  <span style={{ fontSize: "20px" }}>
                    <MailOutlined />
                  </span>
                </Button>
              </Tooltip>
              <Tooltip title="Call">
                <Button className="ViewMore" onClick={() => ChangeState(3)}>
                  <span style={{ fontSize: "20px" }}>
                    <PhoneOutlined />
                  </span>
                </Button>
              </Tooltip>
            </div>
          </div>

          {/* Car Listing */}
          <div style={{ textAlign: "start", width: "100%" }}>
            <Avatar
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
              alt="User Avatar"
              style={{ cursor: "pointer", height: "80px", width: "80px" }}
            />
            <ul style={{ listStyleType: "none", margin: "1rem 0", padding: 0 }}>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Name:</Typography.Text>
                <Typography.Text
                  style={{ marginLeft: "0.5rem", textTransform: "capitalize" }}
                >
                  {data?.getByOne[0]?.firstName || "N/A"}{" "}
                  {data?.getByOne[0]?.lastName || " "}
                </Typography.Text>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Gender:</Typography.Text>
                <Typography.Text
                  style={{ marginLeft: "0.5rem", textTransform: "capitalize" }}
                >
                  {data?.getByOne[0]?.gender === "M" ? "Male" : "Female"}
                </Typography.Text>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Email:</Typography.Text>
                <Typography.Text style={{ marginLeft: "0.5rem" }}>
                  {data?.getByOne[0]?.email || "N/A"}
                </Typography.Text>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Phone no:</Typography.Text>
                <Typography.Text style={{ marginLeft: "0.5rem" }}>
                  {phoneArray?.map((res: any, index: number) => (
                    <span className="" key={index}>
                      {res?.number}
                    </span>
                  ))}
                </Typography.Text>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Address:</Typography.Text>
                <Typography.Text style={{ marginLeft: "0.5rem" }}>
                  {addressesArray?.map((res: any, index: any) => (
                    <span className="" key={index}>
                      {res?.city}, {res?.state}, {`(${res?.zip})`}
                    </span>
                  ))}
                </Typography.Text>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Latest Activity Date:</Typography.Text>
                <Typography.Text style={{ marginLeft: "0.5rem" }}>
                  {dayjs(data?.getByOne[0]?.latestActivityDate).format(
                    "MM-DD-YYYY"
                  ) || "N/A"}
                </Typography.Text>
              </li>
              <li style={{ marginBottom: "0.5rem" }}>
                <Typography.Text>Income Range:</Typography.Text>
                <Typography.Text style={{ marginLeft: "0.5rem" }}>
                  {data?.getByOne[0]?.incomeRange || "N/A"}
                </Typography.Text>
              </li>
            </ul>
          </div>
        </Card>
      </Content>

      {/* Right Sidebar */}
      <Sider
        width={400}
        style={{
          background: "#fff",
          paddingRight: "24px",
          paddingLeft: "24px",
        }}
      >
        {/* Recent Leads */}
        <Card title="Recent Activities" style={{ marginBottom: "24px" }}>
          <div style={{ flex: 1, textAlign: "start" }}>
            <Title level={4}>
              {recentActivity?.data?.length > 0 ? (
                <>
                  {replaceUnderScore(
                    capFirst(recentActivity?.data[0]?.action_for)
                  ) || "N/A"}{" "}
                  (
                  {dayjs(recentActivity?.data[0]?.updatedAt).format(
                    "YYYY-MM-DD HH:mm"
                  )}
                  )
                </>
              ) : (
                "No data activities"
              )}
            </Title>
          </div>
        </Card>

        {/* Call Leads Card */}
        {/* <Card title="Call Leads (Monthly)" style={{ marginBottom: '24px' }}>
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
      </Card> */}

        {/* Mail Leads Card */}
        {/* <Card title="Mail Leads (Monthly)">
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
      </Card> */}
      </Sider>
    </Layout>
  );
};

export default LeadsUserDeatils;
