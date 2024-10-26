"use client"
import React, { Fragment } from 'react'
import {
    Breadcrumb,
    Button,
    Card,
    Col,
    Divider,
    Modal,
    Row,
    Table,
    Tooltip,
    Typography,
  } from "antd";
  import { DownloadOutlined, ExportOutlined, EyeOutlined, ImportOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";
import Link from 'next/link';
import dayjs from 'dayjs';
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
                {/* <Upload className='tooltip-img' showUploadList={false} accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'> */}
              </div>
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
      </Row>
    </section>
  </Fragment>
  )
}

export default MetaList