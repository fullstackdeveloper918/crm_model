"use client";
import React, { Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Card,
  Col,
  Divider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
  Typography,
} from "antd";
import Link from "next/link";
// import React, { Fragment, useEffect } from "react";
import {
  DownloadOutlined,
  EditFilled,
  ExportOutlined,
  EyeOutlined,
  ImportOutlined,
  InboxOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import api from "@/utils/api";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import axios from "axios";
import { parseCookies } from "nookies";
import { useSearchParams } from "next/navigation";
import validation from "@/utils/validation";
const { Option } = Select;
const TemplateFields = () => {
  const cookies = parseCookies();
  const userId = cookies.user_uuid;
  const [form] = Form.useForm();
  const [state, setState] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const searchParams = useSearchParams();
  const type:any = searchParams.get("type");
  console.log(type, "type");
  const getData = async () => {
    const res = await axios.get(`https://srv626615.hstgr.cloud/field-list`);
    console.log(res?.data, "check");
    setState(res?.data);
  };
  const columns = [
    {
      title: "Sr.no",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Fields Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Fields Type",
    //   dataIndex: "type",
    //   key: "type",
    // },
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
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectType, setSelectType] = useState<any>(null);
  const handleEdit = async (id: any) => {
    console.log(id, "idididid");
    setSelectType("edit");
    setLoading(true);
    setSelectedId(id);
    setIsModalOpen(true);

    try {
      const response = await axios.get(
        `https://srv626615.hstgr.cloud/field-detail?filed_id=${id}`
      );
      console.log(response.data.data, "response");

      const { filed_name, filed_type } = response.data.data;

      form.setFieldsValue({
        filed_name: response?.data?.data?.filed_name,
        filed_type: response?.data?.data?.filed_type,
      });
      getData();
    } catch (error) {
      console.error("Error fetching details:", error);
    } finally {
      setLoading(false);
    }
  };
  const archive = async (id: any) => {
    try {
      let item = {
        filed_id: id,
      };
      const res = await api.Fields.delete(item);

      getData();
      toast.success(res?.message);
    } catch (error) {}
  };
  const filterData = state?.data?.filter((res: any) => res?.field_for === (validation.toLowCase(type)));

console.log(filterData, "filterData");
  const dataSource = filterData?.map((res: any, index: number) => {
    return {
      key: index + 1,
      name: res?.filed_name,
      date: dayjs(res?.created_at).format("DD-MM-YYYY"),
      product: "10 Downing Street",
      description: "qwertyuiopqwertyui",
      //   type:res?.filed_type,
      action: (
        <ul className="m-0 list-unstyled d-flex gap-2">
          <li>
            {/* <Link href={`/admin/meetings/${res?.id}/edit`}> */}
            <Button
              type="text"
              className="px-0 border-0 bg-transparent shadow-none"
              onClick={() => handleEdit(res?._id)}
            >
              <i className="fa-solid fa-pen-to-square"></i>
            </Button>
            {/* </Link> */}
          </li>
          <li>
            <Popconfirm
              title="Delete"
              description="Are you sure you want to delete ?"
              onConfirm={(event: any) => {
                archive(res?._id);
              }}
              // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
            >
              <Button type="text" danger htmlType="button" className="px-0">
                <i className="fa-solid fa-trash-can"></i>
              </Button>
            </Popconfirm>
          </li>
        </ul>
      ),
    };
  });
  const [file, setFile] = useState<any>(null);
  const showModal = () => {
    setSelectType("add");
    setIsModalOpen(true);
  };
  console.log(selectType, "tytytyt");

  const handleCancel = () => {
    setIsModalOpen(false);
    setFile(null);
    form.resetFields();
  };
  const handleFileChange = (info: any) => {
    setFile(info.file.originFileObj);
  };

  useEffect(() => {
    getData();
  }, []);

  const submit = async (values: any) => {
    console.log(values, "ytytyytyt");
    let items = {
      user_uuid: userId,
      field_name: values.filed_name,
      field_type: values.filed_type,
      field_for:type === "Gift" 
      ? "gift" 
      : type === "Welcome"
        ? "welcome"
        : type === "Offer"
          ? "offer"
          : type === "Proposal"
            ? "proposal"
            : "xyz"
    };
    try {
      const res = await api.Fields.add(items);
      toast.success(res?.message);
      getData();
      setIsModalOpen(false);
    } catch (error) {}
  };
  const editFields = async (values: any) => {
    let items = {
      filed_id: selectedId,
      filed_name: values.filed_name,
      filed_type: values.filed_type,
      field_for:type === "Gift" 
      ? "gift" 
      : type === "Welcome"
        ? "welcome"
        : type === "Offer"
          ? "offer"
          : type === "Proposal"
            ? "proposal"
            : "xyz"
    };
    try {
      const res = await api.Fields.edit(items);
      toast.success(res?.message);
      getData();
      setIsModalOpen(false);
    } catch (error) {}
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
                  {type} Fields List
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
                    Add Field
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
                    //   pagination={{
                    //     position: ["bottomCenter"],
                    //   }}
                  />
                </>
                {/* )} */}
              </div>
            </Card>
            <Modal
              className="text-item-center"
              title={selectType === "edit" ? "Edit Fields" : "Add Fields"}
              open={isModalOpen}
              onCancel={handleCancel}
              footer={[
                <Button
                  key="back"
                  onClick={handleCancel}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Cancel
                </Button>,
                <Button
                  key="submit"
                  form="myForm"
                  type="primary"
                  htmlType="submit"
                  style={{ marginLeft: "5px" }}
                >
                  Submit
                </Button>,
              ]}
            >
              <Form
                form={form}
                id="myForm"
                layout="vertical"
                onFinish={selectType === "edit" ? editFields : submit}
              >
                <Form.Item
                  name="filed_name"
                  label="Field Name"
                  rules={[
                    { required: true, message: "Please input the field name!" },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="filed_type"
                  label="Field Type"
                  rules={[
                    { required: true, message: "Please select a field type!" },
                  ]}
                >
                  <Select
                    placeholder="Select an option"
                    style={{ width: "100%" }}
                  >
                    <Option value="text">Text</Option>
                    <Option value="textarea">Textarea</Option>
                    <Option value="number">Number</Option>
                    {/* <Option value="radio">Radio</Option> */}
                    {/* <Option value="dropDown">DropDown</Option> */}
                    {/* <Option value="checkbox">Checkbox</Option> */}
                    <Option value="image">Image</Option>
                  </Select>
                </Form.Item>
               
              </Form>
            </Modal>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default TemplateFields;
