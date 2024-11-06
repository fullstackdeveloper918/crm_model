"use client";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import Link from "next/link";
import React, { Fragment, useEffect } from "react";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import axios from "axios";
const Purposal_List = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mike",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "2",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "3",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "4",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "5",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "6",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "7",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "8",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "9",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "10",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
    {
      key: "11",
      name: "John",
      date: "12-10-2024",
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            <Link href={`#`}>
              {" "}
              <Tooltip title="View Details">
                <Button className="ViewMore">
                  <EyeOutlined />
                </Button>{" "}
              </Tooltip>
            </Link>
          </li>
        </ul>
      ),
    },
  ];
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
      title: "Product Name",
      dataIndex: "product",
      key: "product",
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
const router= useRouter()
const getData=async()=>{
    try {
        // const res =await api.Leads.listing()
        const res = await api.Leads.listing();
        console.log(res,"kkkk");
        
    } catch (error) {
        console.log(error,"check error");
        
    }
}
useEffect(()=>{
getData()
},[])
  const sent=()=>{
    router.push(`/admin/purposal/sent_purposal`)
  }
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
                Proposal  Users
                </Typography.Title>

                <div className="d-flex gap-2">
                  {/* <Upload className='tooltip-img' showUploadList={false} accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'> */}
                  <Button
                    type="primary"
                    htmlType="button"
                    size="large"
                    className="primaryBtn"
                    icon={<PlusOutlined />}
                    onClick={sent}
                  >
                    Sent Proposal 
                  </Button>
                  {/* </Upload> */}
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
  );
};

export default Purposal_List;
