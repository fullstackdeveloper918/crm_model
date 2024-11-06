"use client"
import React, { Fragment } from 'react'
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
  import { DownloadOutlined, ExportOutlined, EyeOutlined, ImportOutlined, InboxOutlined, MailOutlined, PhoneOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons";
import Link from 'next/link';
import dayjs from 'dayjs';
import Recent_card from './common/Recent_card';
import { capFirst, replaceUnderScore } from '@/utils/validation';
import Pagination from './common/Pagination';
const { Title, Text } = Typography;
const MetaList = ({data}:any) => {
    console.log(data,"data");
    
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
          title: "Email",
          dataIndex: "email",
          key: "email",
        },
        {
          title: "Phone No.",
          dataIndex: "phone",
          key: "phone",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
        {
          title: "Action",
          dataIndex: "action",
          key: "action",
        },
      ];
      const dataSource = data?.data.map((res: any, index: number) => {
        return {
                key: index+1,
                name:res?.full_name,
                email:res?.email,
                phone:res?.phone_number,
                date: dayjs(res?.created_at).format("DD-MM-YYYY"),
                action: (
                  <ul className="m-0 list-unstyled d-flex gap-2">
                    <li>
                      <Link href={`/admin/metalist/${res?.user_uuid}`}>
                        {" "}
                        <Tooltip title="View">
                          <Button className="ViewMore">
                            <EyeOutlined />
                          </Button>{" "}
                        </Tooltip>
                      </Link>
                    </li>
                  </ul>
                ),
              
        }
    }
    );
    const backgroundcolorMap: any = {
      prioritize: "#ffddbe",
      potential: "#e9cece",
      mails: "#4094F7",
      call: "#22C55E",
      target: "#9897FF",
    };
    const colorMap: any = {
      prioritize: "#FF7C08",
      potential: "#EF4444",
      mails: "#4094F7",
      call: "#22C55E",
      target: "#9897FF",
    };
  return (
    <Fragment>
    <section>
      <Row gutter={[20, 20]}>
        <Col span={24}>
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
                Lead List
              </Typography.Title>

              <div className="d-flex gap-2">
              </div>
            </div>
            {/* Search  */}
            <Divider />
            {/* Tabs  */}
            <Row gutter={[20, 20]}>
          <Col xs={24} md={24}>
            <Row gutter={[16, 16]}>
              {data?.data?.slice(0,12).map((lead: any, index: number) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <Link href={`/admin/metalist/${lead?.user_uuid}`}>
                    <Card
                      hoverable
                      // className={lead.status === "prioritize" ? 'blinking-card' : ''} // Adjust 'your-status' as needed
                      style={{ borderRadius: "10px" }}
                      // actions={[
                      //   <Button
                      //     style={{
                      //       color: colorMap[lead.status] || "#000000",
                      //       backgroundColor:
                      //         backgroundcolorMap[lead.status] ||
                      //         "rgb(187 181 181)",
                      //     }}
                      //     key="action"
                      //     size="small"
                      //   >
                      //     {capFirst(replaceUnderScore(lead.status))}
                      //   </Button>,
                      // ]}
                    >
                      <Space direction="vertical" size="small">
                        <Title level={5}>
                          <Avatar
                            size={34}
                            icon={<UserOutlined />}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                          />
                          {lead?.full_name||"N/A"}
                        </Title>
                        <Text>
                          {dayjs(lead?.created_at).format("DD-MM-YYYY")}
                        </Text>
                        <Divider />
                        <Text>
                          <PhoneOutlined />{" "}
                          {lead.phone_number|| "N/A"}
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
            {/* <Row justify="center">
              <Pagination totalItems={data?.data?.length} limit={10} />
            </Row> */}
          </Col>

          
        </Row>
          </Card>
        </Col>
      </Row>
    </section>
  </Fragment>
  )
}

export default MetaList