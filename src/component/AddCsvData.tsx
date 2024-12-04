"use client"
import React, { Fragment, useEffect, useState } from 'react'
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
import Link from 'next/link';
// import React, { Fragment, useEffect } from "react";
import { DownloadOutlined, ExportOutlined, EyeOutlined, ImportOutlined, InboxOutlined, PlusOutlined } from "@ant-design/icons";
import Dragger from 'antd/es/upload/Dragger';
import api from '@/utils/api';
import { toast, ToastContainer } from 'react-toastify';
import dayjs from 'dayjs';
import axios from 'axios';
const AddCsvData = () => {
    const [state, setState] = useState<any>();
      const columns = [
        {
          title: "Sr.no",
          dataIndex: "key",
          key: "key",
        },
        {
          title: "File Name",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "Date",
          dataIndex: "date",
          key: "date",
        },
        // {
        //   title: "Action",
        //   dataIndex: "action",
        //   key: "action",
        // },
      ];
      const dataSource = state?.data?.data.map((res: any, index: number) => {
        return {
                key: index+1,
                name:res?.csv_name,
                date: dayjs(res?.created_at).format("DD-MM-YYYY"),
                product: "10 Downing Street",
                description: "qwertyuiopqwertyui",
                action: (
                  <ul className="m-0 list-unstyled d-flex gap-2">
                    <li>
                      <Link href={`#`}>
                        {" "}
                        <Tooltip title="Export File">
                          <Button className="ViewMore">
                            <ExportOutlined />
                          </Button>{" "}
                        </Tooltip>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href={`/admin/member/view`}>
                        {" "}
                        <Tooltip title="View Details">
                          <Button className="ViewMore">
                            <EyeOutlined />
                          </Button>{" "}
                        </Tooltip>
                      </Link>
                    </li> */}
                  </ul>
                ),
              
        }
    }
    );
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [file, setFile] = useState<any>(null);
      const showModal = () => {
        setIsModalOpen(true);
      };

      const handleCancel = () => {
        setIsModalOpen(false);
        setFile(null);
      };
      const handleFileChange = (info:any) => {
        setFile(info.file.originFileObj); 
      };
      const getData = async () => {
        const res = await axios.get(
          `https://srv626615.hstgr.cloud/imported-file-path`
        );
        console.log(res, "werrwetr");
        setState(res);
        
      };
      useEffect(() => {
        getData();
      }, []);
      
      const submit=async()=>{
        const formData:any = new FormData();
        formData.append('file', file);
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
          }
        try {
            const res= await api.MetaLeads.importCsv(formData)
            toast.success(res?.message)
            getData()
            setIsModalOpen(false);
        } catch (error) {
            
        }
      }
    
    
  return (
    <Fragment>
    <section>
      {/* <ToastContainer/>  */}
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
                Import Meta List
              </Typography.Title>

              <div className="d-flex gap-2">
                {/* <Upload className='tooltip-img' showUploadList={false} accept='.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'> */}
                <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  className="primaryBtn"
                  icon={<ImportOutlined />}
                  onClick={showModal}
                //   icon={<DownloadOutlined />}
                //   onClick={sent}
                >
                 Import Meta Leads
                </Button>
                {/* <Button
                  type="primary"
                  htmlType="button"
                  size="large"
                  className="primaryBtn"
                  icon={<ExportOutlined />}
                //   onClick={sent}
                >
                 Export Meta Leads
                </Button> */}
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
                  pagination={false}
                //     position: ["bottomCenter"],
                //   }}
                />
              </>
              {/* )} */}
            </div>
          </Card>
          <Modal className='text-item-center' title="Import Meta Leads" open={isModalOpen} onOk={submit} onCancel={handleCancel}>
          <Dragger   multiple={false} onChange={handleFileChange}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
  </Dragger>
      </Modal>
        </Col>
      </Row>
    </section>
  </Fragment>
  )
}

export default AddCsvData