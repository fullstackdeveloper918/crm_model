"use client";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, List, Layout, Tooltip } from "antd";
import {
  DownloadOutlined,
  MailOutlined,
  MoreOutlined,
  PhoneOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import Link from "next/link";
import validation from "@/utils/validation";
import { useRouter } from "next/navigation";
import axios from "axios";
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
const LeadsUserDeatils = ({ data }: any, { data1 }: any) => {
  const [loading, setLoading] = useState(false);
  console.log(data1, "rrerer");
  console.log(data, "datadatadata");

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
  const addressesArray = JSON.parse(addressesString);

  console.log(addressesArray, "sdfsdf");

  const phone = data?.getByOne[0]?.phones;
  const phoneArray = JSON.parse(phone);
  console.log(phoneArray, "rerer");

  const router = useRouter();
  const send = () => {
    try {
      setLoading(true);
      router.push(
        `/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}`
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

  return (
    <Layout style={{ minHeight: "100vh", padding: "24px" }}>
      {/* Left Main Content */}
      <Content style={{ paddingRight: "24px" }}>
        {/* <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center' }}>
             <Avatar
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
            alt="User Avatar"
            style={{ cursor: 'pointer', height:"40px", width:"40px" }}
          />
            <div style={{ marginLeft: '12px', marginTop:"10px" }}>
              <Title level={5}>{data?.getByOne[0]?.firstName||"N/A"} {data?.getByOne[0]?.lastName||" "}</Title>
              <Text>{dayjs(data?.getByOne[0]?.created_at).format("DD-MM-YYYY")||"N/A"}</Text>
            </div>
          </div>
        }
        extra={<Button ><MoreOutlined /></Button>}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.
        </Text>
        <div style={{ marginTop: '12px', display: 'flex', gap: '24px' }}>
          <div>
            <MailOutlined /> {data?.getByOne[0]?.email||"N/A"}
          </div>
          <div>
            <PhoneOutlined />{"+12697605426"}
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
            <Link href={`/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}`}>
          <Button type="primary">
            Send Proposal
          </Button>
            </Link>
        </div>
      </Card> */}
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
                <Button className="ViewMore">
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
        <Card title="Recent Leads" style={{ marginBottom: "24px" }}>
          <List
            dataSource={dataSource}
            renderItem={(item: any) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                      alt="User Avatar"
                      style={{
                        cursor: "pointer",
                        height: "40px",
                        width: "40px",
                      }}
                    />
                  }
                  title={<Text>{item.name}</Text>}
                  description={`${item.email} `}
                  // description={`${item.email} - ${item.location}`}
                />
                <Text>{item.amount}</Text>
              </List.Item>
            )}
          />
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
