"use client";
import React, { useState } from "react";
import {
  Button,
  Col,
  Flex,
  Input,
  Layout,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
} from "antd";
import {
  CalendarOutlined,
  DeleteOutlined,
  DownloadOutlined,
  EllipsisOutlined,
  EyeFilled,
  EyeOutlined,
  FileOutlined,
  FilterOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  PictureOutlined,
  PlusOutlined,
  StarOutlined,
  TableOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { TableColumnsType, TableProps } from "antd";
import { ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Recent_card from "./common/Recent_card";
import Link from "next/link";
import dayjs from "dayjs";
import Pagination from "./common/Pagination";
import { capFirst } from "@/utils/validation";
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Search } = Input;
type TableRowSelection<T extends object = object> =
  TableProps<T>["rowSelection"];
const { Option } = Select;
interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

const array = [
  { name: "abhay", age: "32", address: "xyz", id: "1123" },
  { name: "abhishek", age: "42", address: "abc", id: "2587" },
];

const columns: TableColumnsType<DataType> = [
  {
    title: "Sr. No",
    dataIndex: "key",
    key: "key",
  },
  { title: "Name", dataIndex: "name", key: "key" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Created at", dataIndex: "created_at", key: "created_at" },
  { title: "Status", dataIndex: "status", key: "status" },
  { title: "Action", dataIndex: "action", key: "action" },
];
const columns1: TableColumnsType<DataType> = [
  {
    title: "Sr. No",
    dataIndex: "key",
    key: "key",
  },
  { title: "Name", dataIndex: "name", key: "key" },
  { title: "Email", dataIndex: "email", key: "email" },
  { title: "Phone", dataIndex: "phone", key: "phone" },
  // { title: "Gender", dataIndex: "gender", key: "gender" },
  { title: "Created at", dataIndex: "created_at", key: "created_at" },
  // { title: "Status", dataIndex: "status", key: "status" },
  { title: "Action", dataIndex: "action", key: "action" },
];

const PearlsSelectUsers = ({
  data,
  data1,
  fetchData,
  onArchive,
  sendStatus,
  currentSearch,
}: any) => {
  const router = useRouter();
  console.log(data1, "data1");
  const [searchTerm, setSearchTerm] = useState<any>(currentSearch);
  const searchParams = useSearchParams();
  let leads_type = searchParams.get("leads_type");
  console.log(leads_type, "leads_type");

  //   let array=[
  //     {
  // name:"abhay",
  // email:"",
  // phone:["1234567","9876543"],
  // gender:"M",
  // created_at:"123456",
  // status:"High",
  // peral_id:"123213",
  // user_uuid:"avc56566asjhsa8d998"
  //     },
  //     {
  // name:"abhay1",
  // email:"",
  // phone:["12234567","98736543"],
  // gender:"F",
  // created_at:"4567",
  // status:"Potential",
  // peral_id:"3242",
  // user_uuid:"reyert979435hkyrt9"
  //     },
  //   ]
  // Map your array to dataSource format
  const dataSource: any = data.data.map((item: any, index: number) => {
    return {
      key: index + 1,
      name: (
        <div
          className="user-detail d-inline-flex gap-2 align-items-center"
          key={item._id}
        >
          <Typography.Text className="text-capitalize">
            {item.firstName ? `${item.firstName} ${item.lastName}` : "N/A"}
          </Typography.Text>
        </div>
      ),
      email: item.email
        ? item.email?.length >= 20
          ? `${item.email.slice(0, 20)}...`
          : item.email
        : "N/A",
      phone:
        item.phones.map((res: any, index: number) => res.number).join(", ") ||
        "N/A",
      gender: item?.gender ? (item?.gender === "M" ? "Male" : "Female") : "N/A",
      created_at: dayjs(item?.created_at).format("DD-MM-YYYY") || "N/A",
      status: item?.status || "N/A",
      pearl_id: item?.pearl_id || "N/A", // Include pearl_id here
      user_uuid: item?.user_uuid || "N/A",
      action: (
        <ul className="list-unstyled mb-0 gap-3 d-flex">
          <li>
            <Link href={`/admin/pearls/${item?.pearl_id}`}>
              <Button className="ViewMore">
                <EyeOutlined />
              </Button>
            </Link>
          </li>
        </ul>
      ),
    };
  });
  const dataSource1: any = data1?.data.map((item: any, index: number) => {
    return {
      key: index + 1,
      name: (
        <div
          className="user-detail d-inline-flex gap-2 align-items-center"
          key={item._id}
        >
          <Typography.Text className="text-capitalize">
            {item.full_name||"N/A"}
          </Typography.Text>
        </div>
      ),
      email: item.email|| "N/A",
      phone:item.phone_number||"N/A",
      // gender: item?.gender ? (item?.gender === "M" ? "Male" : "Female") : "N/A",
      created_at: dayjs(item?.created_time).format("DD-MM-YYYY") || "N/A",
      // status: item?.status || "N/A",
      pearl_id: item?.pearl_id || "N/A", // Include pearl_id here
      user_uuid: item?.user_uuid || "N/A",
      action: (
        <ul className="list-unstyled mb-0 gap-3 d-flex">
          <li>
            <Link href={`/admin/metalist/${item?.user_uuid}`}>
              <Button className="ViewMore">
                <EyeOutlined />
              </Button>
            </Link>
          </li>
        </ul>
      ),
    };
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (value: string) => {
    // Update the URL with the selected value
    if (searchTerm?.trim()) {
      router.push(`/admin/template?search=${searchTerm}&filter=${value}`);
    } else {
      // If there is no search term, update the URL only with the selected filter
      router.push(`/admin/template?filter=${value}`);
    }
    // router.push(`/admin/template?filter=${value}`);
  };
  const handleChange1 = (value: string) => {
    // Update the URL with the selected value
    console.log(value, "hsakhd");

    if (searchTerm?.trim()) {
      router.push(`/admin/template?search=${searchTerm}&leads_type=${value}`);
    } else {
      // If there is no search term, update the URL only with the selected filter
      router.push(`/admin/template?leads_type=${value}`);
    }
    // router.push(`/admin/template?filter=${value}`);
  };
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // router.push(`/admin/pearls?search=${value}&filter=${filter}`);
    if (value?.trim()) {
      router.push(`/admin/template?search=${value}&filter=${value}`);
    } else {
      // If the search input is empty, just update the filter (and keep it in the same tab, if any)
      router.push(`/admin/template?filter=${value}`);
    }
  };
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]); // To track row selections
  const [selectedRowIds, setSelectedRowIds] = useState<string[]>([]); // Store selected ids in the state
  console.log(selectedRowIds, "selectedRowIds");
  const [selectedData, setSelectedData] = useState<any[]>([]);
  console.log(selectedData, "selectedData");
  const sanitizeData = (data: any) => {
    return data.map((item: any) => {
      const { _context, ...rest } = item; // Remove React context or unwanted properties
      return rest;
    });
  };
  // When selection changes, update both row keys and ids
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Get selected row data from the dataSource based on selected row keys
    const selectedItems = dataSource.filter((item: any) =>
      newSelectedRowKeys.includes(item.key)
    );
    console.log(selectedItems, "selectedItems");

    // localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    // if (selectedItems) {
    //     localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    //   }
    // const sanitizedItems = sanitizeData(selectedItems);

    const filterArrayId = selectedItems.map((res: any) => ({
      pearl_id: res.pearl_id,
      user_uuid: res.user_uuid,
      name: res.name?.props?.children.props?.children,
    }));
    if (selectedItems) {
      localStorage.setItem("filterArrayId", JSON.stringify(filterArrayId));
    }
    console.log(filterArrayId, "filterArrayId");
    setSelectedData(selectedItems);
  };

  const rowSelection: TableProps<DataType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onSelectChange1 = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);

    // Get selected row data from the dataSource based on selected row keys
    const selectedItems = dataSource1.filter((item: any) =>
      newSelectedRowKeys.includes(item.key)
    );
    console.log(selectedItems, "selectedItems");

    // localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    // if (selectedItems) {
    //     localStorage.setItem("selectedItems", JSON.stringify(selectedItems));
    //   }
    // const sanitizedItems = sanitizeData(selectedItems);

    const filterArrayId = selectedItems.map((res: any) => ({
      meta_id: res.user_uuid,
      // pearl_id: res.pearl_id,
      user_uuid: res.user_uuid,
      name: res.name?.props?.children.props?.children,
    }));
    if (selectedItems) {
      localStorage.setItem("filterArrayId", JSON.stringify(filterArrayId));
    }
    console.log(filterArrayId, "filterArrayId");
    setSelectedData(selectedItems);
  };

  const rowSelection1: TableProps<DataType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange1,
  };

  const hasSelected = selectedRowKeys.length > 0;
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ToastContainer />
      <Content style={{ padding: "20px" }}>
        <div className="d-flex" style={{ width: "90%", gap: "20px" }}>
          <Title className="mt-3" level={3}>
            All {capFirst(leads_type)} Diver Leads
          </Title>
          <Space>
            <Select
              defaultValue={leads_type}
              style={{ width: 150 }}
              onChange={handleChange1}
            >
              <Option value="pearl">Pearl Leads</Option>
              <Option value="meta">Meta Leads</Option>
            </Select>
          </Space>
        </div>
        {leads_type==="pearl"?
        <>
          <Row style={{ marginBottom: "0px" }}>
            <div className="d-flex" style={{ width: "90%", gap: "20px" }}>
              <Search
                size="large"
                className=""
                placeholder="Search by Name & Email"
                enterButton
                value={searchTerm}
                onChange={handleSearch}
              />
              <Space>
                <Select
                  defaultValue="All Leads"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="all">All Leads</Option>
                  <Option value="priority">High-Potential Leads</Option>
                  <Option value="potential">Potential Leads</Option>
                  <Option value="non_potential">Suspect Leads</Option>
                  <Option value="call_lead">Call Leads</Option>
                  <Option value="mail">Email Leads</Option>
                  <Option value="sms">Sms Leads</Option>
                </Select>
              </Space>
            </div>
          </Row>
          {/* <Row>
     
      </Row> */}
          <Row gutter={[16, 16]} className="mt-5">
            <Col xs={24} md={18}>
              <Flex gap="middle" vertical>
                <Flex align="center" justify="space-between" gap="middle">
                  {`Selected ${selectedRowKeys.length} leads`}
                  {hasSelected ? (
                    // <Link href={`/admin/purposal/sent_purposal?pearls_lead_id={37267659}&user_id=208b7baa-54e3-4029-a94f-38be548217a3&field_for=welcome&fieldType=email`}>
                    <Link
                      href={`/admin/template/show_template?email_type=${leads_type}`}
                    >
                      <Button
                        type="primary"
                        disabled={!hasSelected}
                        loading={loading}
                      >
                        Send Email
                      </Button>
                    </Link>
                  ) : (
                    ""
                  )}
                  {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : null} */}
                </Flex>
                <Table<DataType>
                  rowSelection={rowSelection}
                  columns={columns}
                  dataSource={dataSource}
                  pagination={false}
                />
              </Flex>
              <Row justify="center">
                <Pagination totalItems={data?.total_length} limit={10} />
              </Row>
            </Col>

            <Col xs={24} md={6} className="mt-5">
              <Recent_card />
              {/* <Card title="Call Leads" style={{ marginBottom: '20px' }}>
              <Space direction="vertical">
              
                <Text><Avatar size={25} icon={<UserOutlined />}  /> Jane Cooper - Toledo</Text>
                <Text><Avatar size={25} icon={<UserOutlined />}  /> Dianne Russell - Naperville</Text>
                <Button type="link">See All Call Leads</Button>
              </Space>
            </Card> */}
            </Col>
          </Row>
        </>:
          <>
          <Row style={{ marginBottom: "0px" }}>
            <div className="d-flex" style={{ width: "90%", gap: "20px" }}>
              <Search
                size="large"
                className=""
                placeholder="Search by Name & Email"
                enterButton
                value={searchTerm}
                onChange={handleSearch}
              />
              {/* <Space>
                <Select
                  defaultValue="All Leads"
                  style={{ width: 150 }}
                  onChange={handleChange}
                >
                  <Option value="all">All Leads</Option>
                  <Option value="priority">High-Potential Leads</Option>
                  <Option value="potential">Potential Leads</Option>
                  <Option value="non_potential">Suspect Leads</Option>
                  <Option value="call_lead">Call Leads</Option>
                  <Option value="mail">Email Leads</Option>
                  <Option value="sms">Sms Leads</Option>
                </Select>
              </Space> */}
            </div>
          </Row>
          {/* <Row>
     
      </Row> */}
          <Row gutter={[16, 16]} className="mt-5">
            <Col xs={24} md={18}>
              <Flex gap="middle" vertical>
                <Flex align="center" justify="space-between" gap="middle">
                  {`Selected ${selectedRowKeys.length} leads`}
                  {hasSelected ? (
                    // <Link href={`/admin/purposal/sent_purposal?pearls_lead_id={37267659}&user_id=208b7baa-54e3-4029-a94f-38be548217a3&field_for=welcome&fieldType=email`}>
                    <Link
                      href={`/admin/template/show_template?email_type=${leads_type}`}
                    >
                      <Button
                        type="primary"
                        disabled={!hasSelected}
                        loading={loading}
                      >
                        Send Email
                      </Button>
                    </Link>
                  ) : (
                    ""
                  )}
                  {/* {hasSelected ? `Selected ${selectedRowKeys.length} items` : null} */}
                </Flex>
                <Table<DataType>
                  rowSelection={rowSelection1}
                  columns={columns1}
                  dataSource={dataSource1}
                  pagination={false}
                />
              </Flex>
              <Row justify="center">
                <Pagination totalItems={data?.total_length} limit={10} />
              </Row>
            </Col>

            <Col xs={24} md={6} className="mt-5">
              <Recent_card />
              {/* <Card title="Call Leads" style={{ marginBottom: '20px' }}>
              <Space direction="vertical">
              
                <Text><Avatar size={25} icon={<UserOutlined />}  /> Jane Cooper - Toledo</Text>
                <Text><Avatar size={25} icon={<UserOutlined />}  /> Dianne Russell - Naperville</Text>
                <Button type="link">See All Call Leads</Button>
              </Space>
            </Card> */}
            </Col>
          </Row>
        </>}
      </Content>
    </Layout>
  );
};

export default PearlsSelectUsers;
