
"use client"
import React, { useEffect, useState } from 'react';
import { Card, Avatar, Typography, Button, List, Layout, Tooltip, Popconfirm, Row, Col, Space, Divider, Table } from 'antd';
import { DeleteOutlined, MailOutlined, MessageOutlined, MoreOutlined, PhoneOutlined } from '@ant-design/icons';
import dayjs from "dayjs"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { replaceUnderScore } from '@/utils/validation';
import api from '@/utils/api';
import { toast, ToastContainer } from 'react-toastify';
const { Content, Sider } = Layout;
const { Text, Title } = Typography;
// const leadsData = {
//     recentLeads: [
//       { name: 'Jenny Wilson', email: 'w.lawson@example.com', amount: '$11,234', location: 'Austin' },
//       { name: 'Devon Lane', email: 'dat.roberts@example.com', amount: '$11,159', location: 'New York' },
//     ],
//     callLeads: [
//       { name: 'Jane Cooper', email: 'jgraham@example.com', amount: '$10,483', location: 'Toledo' },
//       { name: 'Dianne Russell', email: 'curtis.d@example.com', amount: '$9,084', location: 'Naperville' },
//     ],
//     mailLeads: [
//       { name: 'Jane Cooper', email: 'jgraham@example.com', amount: '$10,483', location: 'Toledo' },
//       { name: 'Dianne Russell', email: 'curtis.d@example.com', amount: '$9,084', location: 'Naperville' },
//     ]
//   };
const MetaListDetails = ({data,activity}:any) => {
  const [loading,setLoading]=useState(false)
  const [loading2,setLoading2]=useState(false)
  // console.log(data1, "rrerer");
  console.log(data,"datadatadata");
  // console.log(activity,"datadatadata");
  const dataSource2 = Array.isArray(activity?.data)
  ? activity?.data.map((res: any, index: number) => {
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
  // const phoneValue = data?.getByOne[0]?.phone || "[]"; // Default to empty array if phone is undefined
  // let phoneNumber = "N/A"; // Default to "N/A"

  // try {
  //   // Parse the phone value
  //   const parsedValue = JSON.parse(phoneValue);

  //   // Check if parsedValue is an array and has at least one element
  //   if (Array.isArray(parsedValue) && parsedValue.length > 0) {
  //     phoneNumber = parsedValue[0]?.number || "N/A"; // Fallback to "N/A" if number is undefined
  //   }
  // } catch (error) {
  //   console.error("Failed to parse phone value:", error);
  // }
  // console.log(phoneValue, "phoneValue");
  // const addressesString = data?.getByOne[0]?.addresses;
  // const addressesArray = JSON.parse(addressesString);

  // console.log(addressesArray, "sdfsdf");

  // const phone = data?.getByOne[0]?.phones;
  // const phoneArray = JSON.parse(phone);
  // console.log(phoneArray, "rerer");

  const router = useRouter();
  const send = (type: any) => {
    console.log(type,"uiouiouio");
    
  try {
    if(type==="sms"){
      setLoading(true)
      router.push(
        `/admin/purposal/sent_purposal?meta_lead_id=${data?.data?.user_uuid}&send_to=${data?.data?.phone_number}&field_for=welcome&fieldType=sms&email_type=meta`
      );
      // admin/purposal/sent_purposal?user_id=f3ce7edd-203f-4f5b-9167-f34fb2fc68a2&field_for=welcome&fieldType=sms&email_type=meta
    }else{
      setLoading2(true)
      router.push(
        `/admin/purposal/sent_purposal?meta_lead_id=${data?.data?.user_uuid}&field_for=welcome&fieldType=email&email_type=meta`
        // `/admin/purposal/sent_purposal?meta_lead_id=${data?.data?.user_uuid}`
        // `/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}&user_id=${data?.getByOne[0]?.user_uuid}&field_for=welcome&fieldType=email`
      );
    }
  } catch (error) {
    setLoading(false)
    setLoading2(false)
  }
  };
const [state,setState]= useState<any>([])
  const getData=async()=>{
    try {
      const res=await axios.get(`https://srv626615.hstgr.cloud/imported-meta-list`)
      setState(res?.data)
    } catch (error) {
      
    }
  }

  useEffect(()=>{
getData()
  },[])
  console.log(state,"state");
  const dataSource = state?.data?.slice(0,2)?.map((res: any, index: number) => {
    return {
      key: index + 1,
      name: `${res?.full_name || "N/A"}`, // Correctly formatted name
      email: res?.email || "N/A",
      // amount: `$ ${res?.max_value || "0"}`, // Handle max_value with a fallback
      // location: res?.addresses?.slice(0,2)?.map((res1: any, index1: number) => 
      //   <span className="" key={index1}>
      //     {res1?.city}, {res1?.state}, ({res1?.zip})
      //   </span>
      // ) || "N/A", // Fallback if addresses is undefined
    };
  });
  const back=()=>{
    router.back()
      }

      const archive = async () => {
        try {
          let item = {
            user_uuid: data?.data?.user_uuid,
          };
          console.log(item, "item");
    
          const res = await api.MetaLeads.delete(item);
          // data(); 
          console.log(res, "ioioio");
          toast.success(res?.message);
          router.back()
          // window.location.reload();
        } catch (error) {}
      };

const [loading3,setLoading3]=useState(false)
      const ChangeState = async (statusType: number) => {
        console.log(statusType, "jlsdjf");
    
        try {
          setLoading3(false);
          let items = {
            meta_id: data?.data?.user_uuid,
            user_uuid: data?.data?.user_uuid,
            status: statusType,
          } as any;
          const res = await api.MetaLeads.changeStatus(items);
          toast.success(res?.data);
          // if (statusType == 2) {
          //   router.push(
          //     `/admin/purposal/sent_purposal?pearls_lead_id=${data?.getByOne[0]?.pearl_id}&user_uuid=${data?.getByOne[0]?.user_uuid}`
          //   );
          // }
        } catch (error) {
          setLoading3(false);
        }
      };
  return (
    <>
    <ToastContainer/>
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
                 {data?.data?.full_name || "N/A"} Details
               </Typography.Title>
             </div>
            <div className="flex gap-3">
            <Tooltip title="Message">
                 <Button className="ViewMore"loading={loading} onClick={()=>send("sms")}>
                   <span style={{ fontSize: "20px" }}>
                     <MessageOutlined  style={{ color: "blue" }}/>
                   </span>
                 </Button>
             </Tooltip>
               <Tooltip title="Send Mail">
                 <Button className="ViewMore" loading={loading2} onClick={()=>send("email")}>
                   <span style={{ fontSize: "20px" }}>
                     <MailOutlined style={{ color: "orange" }}/>
                   </span>
                 </Button>
               </Tooltip>
               <Tooltip title="Call">
                 <Button className="ViewMore" 
                 onClick={() => ChangeState(3)}
                 >
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
          {data?.data?.full_name.slice(0, 2).toUpperCase()}
          </Avatar>
        </Col>
        <Col flex="auto">
          <Space direction="vertical" size={0}>
            <Title level={4}>  {data?.data?.full_name||"N/A"}</Title>
            <Text type="secondary"> {data?.data?.email||"N/A"}</Text>
            <Text>
              <PhoneOutlined style={{ marginRight: 4 }} />
           {data?.data?.phone_number||"N/A"}
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
          <Text type="secondary">Planing make purchase</Text>
          <Text>{data?.data?.planing_make_purchase}</Text>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical">
          <Text type="secondary">Budget Range Purchase</Text>
          <Text>
          <Text>{data?.data?.budget_range_purchase}</Text>
          </Text>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical">
          <Text type="secondary">Status</Text>
          <Text>{data?.data?.meta_status || "N/A"}</Text>
        </Space>
      </Col>
      <Col span={6}>
        <Space direction="vertical">
          <Text type="secondary">Latest Activity Date</Text>
          <Text>
            {/* {data?.getByOne[0]?.latestActivityDate
              ? dayjs(data?.getByOne[0]?.latestActivityDate).format("MM-DD-YYYY")
              : "N/A"} */}
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
      {activity?.data.length?
      <Table dataSource={dataSource2} columns={columns1} pagination={false} />
      :"No Activities Found"}
    </Card>

    {/* Notes Section */}
    <Card title="Notes" style={{ marginTop: 24 }}>
    {data?.data?.notes}
      {/* <List
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
      /> */}
    </Card>
  </div>
    </>
  )
}

export default MetaListDetails