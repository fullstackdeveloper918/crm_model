"use client";
import React, { useEffect, useState } from "react";
import { Card, Avatar, Typography, Button, List, Layout, Tooltip, Steps, Space, Badge, Row, Tag, Col, Divider, Table, Popconfirm } from "antd";
import {
  DeleteOutlined,
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
const LeadsUserDeatils = ({ data,activitiest }: any, { data1 }: any) => {
  const [loading, setLoading] = useState(false);
  console.log(activitiest, "activitiest");
  // console.log(data2, "datadatadata");
  // data
  console.log(Array.isArray(data),"sadasdasddfg");
  const [recentActivity, RecentActivity] = useState<any>([]);
  
  const dataSource2 = Array.isArray(recentActivity?.data)
  ? recentActivity?.data.map((res: any, index: number) => {
    const actionForText = res?.action_for === "MADE_PHONE_CALL" ? "Phone call" : res?.action_for==="SENT_EMAIL"?"Sent Email": res?.action_for==="SENT_SMS"?"Sent Sms":"";
      return {
        key: index + 1,
        name:actionForText,
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
      
      key: '1',
      name: 'Email',
      date:  'Today, 10:00 AM',
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'Sms',
      date: 'Today, 10:00 AM',
      address: '10 Downing Street',
    }
  ];
  
  const columns1 = [
    {
      title: 'Sr. No',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
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
  console.log(recentActivity,"recentActivity");
  
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
      router.back()
      // window.location.reload();
    } catch (error) {}
  };
  return (
    // <Layout style={{ minHeight: "100vh", padding: "24px" }}>
    //   {/* Left Main Content */}
    //   <ToastContainer />
    //   <Content
    //     style={{
    //       display: "flex",
    //       justifyContent: "space-between", // Space out the cards horizontally
    //       // alignItems: "center",            // Center them vertically
    //       paddingRight: "24px",
    //     }}
    //   >
    //      <Card
    //       style={{
    //         // maxWidth: "600px",
    //         width:"600px",
    //         margin: "auto",
    //         display: "flex",
    //         flexDirection: "column",
    //       }}
    //     >
    //       <div style={{ marginBottom: "1rem" }}>
    //         {/* Breadcrumbs (commented out) */}
    //         <Button onClick={back}>Back</Button>
    //       </div>
    //       {/* Title */}
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           alignItems: "start",
    //           width: "100%",
    //         }}
    //       >
    //         <div style={{ flex: 1, textAlign: "start" }}>
    //           <Typography.Title level={3} style={{ fontWeight: "bold" }}>
    //             {data?.getByOne[0]?.firstName || "N/A"}{" "}
    //             {data?.getByOne[0]?.lastName || " "} Details
    //           </Typography.Title>
    //         </div>
    //         <div className="flex gap-3">
    //           <Tooltip title="Send Mail">
    //             <Button className="ViewMore" loading={loading} onClick={send}>
    //               <span style={{ fontSize: "20px" }}>
    //                 <MailOutlined />
    //               </span>
    //             </Button>
    //           </Tooltip>
    //           <Tooltip title="Call">
    //             <Button className="ViewMore" onClick={() => ChangeState(3)}>
    //               <span style={{ fontSize: "20px" }}>
    //                 <PhoneOutlined />
    //               </span>
    //             </Button>
    //           </Tooltip>
    //         </div>
    //       </div>

    //       {/* Car Listing */}
    //       <div style={{ textAlign: "start", width: "100%" }}>
    //         <Avatar
    //           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
    //           alt="User Avatar"
    //           style={{ cursor: "pointer", height: "80px", width: "80px" }}
    //         />
    //         <ul style={{ listStyleType: "none", margin: "1rem 0", padding: 0 }}>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Name:</Typography.Text>
    //             <Typography.Text
    //               style={{ marginLeft: "0.5rem", textTransform: "capitalize" }}
    //             >
    //               {data?.getByOne[0]?.firstName || "N/A"}{" "}
    //               {data?.getByOne[0]?.lastName || " "}
    //             </Typography.Text>
    //           </li>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Gender:</Typography.Text>
    //             <Typography.Text
    //               style={{ marginLeft: "0.5rem", textTransform: "capitalize" }}
    //             >
    //               {data?.getByOne[0]?.gender === "M" ? "Male" : "Female"}
    //             </Typography.Text>
    //           </li>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Email:</Typography.Text>
    //             <Typography.Text style={{ marginLeft: "0.5rem" }}>
    //               {data?.getByOne[0]?.email || "N/A"}
    //             </Typography.Text>
    //           </li>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Phone no:</Typography.Text>
    //             <Typography.Text style={{ marginLeft: "0.5rem" }}>
    //               {phoneArray?.map((res: any, index: number) => (
    //                 <span className="" key={index}>
    //                   {res?.number}
    //                 </span>
    //               ))}
    //             </Typography.Text>
    //           </li>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Address:</Typography.Text>
    //             <Typography.Text style={{ marginLeft: "0.5rem" }}>
    //               {addressesArray?.map((res: any, index: any) => (
    //                 <span className="" key={index}>
    //                   {res?.city}, {res?.state}, {`(${res?.zip})`}
    //                 </span>
    //               ))}
    //             </Typography.Text>
    //           </li>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Latest Activity Date:</Typography.Text>
    //             <Typography.Text style={{ marginLeft: "0.5rem" }}>
    //               {dayjs(data?.getByOne[0]?.latestActivityDate).format(
    //                 "MM-DD-YYYY"
    //               ) || "N/A"}
    //             </Typography.Text>
    //           </li>
    //           <li style={{ marginBottom: "0.5rem" }}>
    //             <Typography.Text>Income Range:</Typography.Text>
    //             <Typography.Text style={{ marginLeft: "0.5rem" }}>
    //               {data?.getByOne[0]?.incomeRange || "N/A"}
    //             </Typography.Text>
    //           </li>
    //         </ul>
    //       </div>
    //     </Card>
    //   </Content>

    //   {/* Right Sidebar */}
    //   <Sider
    //     width={400}
    //     style={{
    //       background: "#fff",
    //       paddingRight: "24px",
    //       paddingLeft: "24px",
    //     }}
    //   >
    //     {/* Recent Leads */}
    //     <Card title="Recent Activities" style={{ marginBottom: "24px" }}>
    //       <div style={{ flex: 1, textAlign: "start" }}>
    //         <Title level={4}>
    //           {recentActivity?.data?.length > 0 ? (
    //             <>
    //               {replaceUnderScore(
    //                 capFirst(recentActivity?.data[0]?.action_for)
    //               ) || "N/A"}{" "}
    //               (
    //               {dayjs(recentActivity?.data[0]?.updatedAt).format(
    //                 "YYYY-MM-DD HH:mm"
    //               )}
    //               )
    //             </>
    //           ) : (
    //             "No data activities"
    //           )}
    //         </Title>
    //       </div>
    //     </Card>

    //     {/* Call Leads Card */}
    //     {/* <Card title="Call Leads (Monthly)" style={{ marginBottom: '24px' }}>
    //     <List
    //       dataSource={leadsData.callLeads}
    //       renderItem={(item) => (
    //         <List.Item>
    //           <List.Item.Meta
    //             avatar={
    //               <Avatar
    //                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
    //                 alt="User Avatar"
    //                 style={{ cursor: 'pointer', height: "40px", width: "40px" }}
    //               />
    //             }
    //             title={<Text>{item.name}</Text>}
    //             description={item.email}
    //           />
    //           <Text>{item.amount}</Text>
    //         </List.Item>
    //       )}
    //     />
    //   </Card> */}

    //     {/* Mail Leads Card */}
    //     {/* <Card title="Mail Leads (Monthly)">
    //     <List
    //       dataSource={leadsData.mailLeads}
    //       renderItem={(item) => (
    //         <List.Item>
    //           <List.Item.Meta
    //             avatar={
    //               <Avatar
    //                 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
    //                 alt="User Avatar"
    //                 style={{ cursor: 'pointer', height: "40px", width: "40px" }}
    //               />
    //             }
    //             title={<Text>{item.name}</Text>}
    //             description={item.email}
    //           />
    //           <Text>{item.amount}</Text>
    //         </List.Item>
    //       )}
    //     />
    //   </Card> */}
    //   </Sider>
    // </Layout>
    <div style={{ padding: 24, maxWidth: 800, margin: '0 auto' }}>
    {/* Header Section */}
    <Card>
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
            <Tooltip title="Call">
                 <Button className="ViewMore" >
                   <span style={{ fontSize: "20px" }}>
                     <MessageOutlined  style={{ color: "blue" }}/>
                   </span>
                 </Button>
             </Tooltip>
               <Tooltip title="Send Mail">
                 <Button className="ViewMore" loading={loading} onClick={send}>
                   <span style={{ fontSize: "20px" }}>
                     <MailOutlined style={{ color: "orange" }}/>
                   </span>
                 </Button>
               </Tooltip>
               <Tooltip title="Call">
                 <Button className="ViewMore" onClick={() => ChangeState(3)}>
                   <span style={{ fontSize: "20px" }}>
                     <PhoneOutlined style={{ color: "green" }}/>
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
                           <DeleteOutlined style={{ color: "red" }}/>
                           </span>
                            </Button>
                        </Popconfirm>
                      </Tooltip>

           </div>
         </div>
      <Row gutter={[16, 16]} align="middle" >
        <Col>
          <Avatar size={64}  style={{ backgroundColor: "#a5d6a7" }} >
          {data?.getByOne[0]?.firstName.slice(0, 2).toUpperCase()}
          </Avatar>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <Title level={4}> {data?.getByOne[0]?.firstName || "N/A"}{" "}  {data?.getByOne[0]?.lastName || "N/A"}{" "}</Title>
            <Text type="secondary">{data?.getByOne[0]?.email || "N/A"}</Text>
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
      <Row gutter={[16, 16]}  style={{ marginTop:"10px", border: '1px solid #f0f0f0', borderRadius: 8, padding: 16 }}>
      <Col span={6}>
        <Space direction="vertical">
          <Text type="secondary">Gender</Text>
          <Text>{data?.getByOne[0]?.gender === "M" ? "Male" : "Female"}</Text>
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
              ? dayjs(data?.getByOne[0]?.latestActivityDate).format("MM-DD-YYYY")
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
      <Table dataSource={dataSource2} columns={columns1} pagination={false} />
    </Card>

    {/* Notes Section */}
    <Card title="Notes" style={{ marginTop: 24 }}>
      <List
        dataSource={[
          { content: 'She’s interested in our new product line.', date: 'Today, 10:00 AM' },
          { content: 'Follow up on detailed breakdown of costs.', date: 'Today, 10:00 AM' },
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
  </div>
  );
};

export default LeadsUserDeatils;
