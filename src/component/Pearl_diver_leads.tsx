"use client";
import React, { useEffect, useState } from "react";
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
  Dropdown,
  Menu,
  Popconfirm,
  Modal,
  Input,
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
import Link from "next/link";
import api from "@/utils/api";
import dayjs from "dayjs";
import { capFirst, replaceUnderScore } from "@/utils/validation";
import { useRouter, useSearchParams } from "next/navigation";
import Pagination from "./common/Pagination";
import Recent_card from "./common/Recent_card";
import { toast, ToastContainer } from "react-toastify";
// import Search from "antd/es/transfer/search";
// import { Tabs } from 'antd';
const { Search } = Input;
const { TabPane } = Tabs;
// import remUndrscore from "../utils/validation/replaceUnderScore"
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const leads = [
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  {
    name: "Jenny Wilson",
    phone: "0555 066 899",
    email: "w.lawson@example.com",
    label: "Priorities leads",
    avatar: "/path/to/avatar.jpg", // You can add avatars here
    type: "priority",
  },
  {
    name: "Jane Cooper",
    phone: "0555 066 899",
    email: "jgraham@example.com",
    label: "Call leads",
    avatar: "/path/to/avatar.jpg",
    type: "call",
  },
  // Add more leads
];

const Pearl_diver_leads = ({ data, fetchData,onArchive , sendStatus,currentSearch }: any) => {
  console.log(data, "data");
  const [filter,setFilter]=useState<any>(sendStatus)
  const [searchTerm, setSearchTerm] = useState<any>(currentSearch);
  console.log(searchTerm,"searchTerm");
  
  const [activeKey, setActiveKey] = useState("all");
  const [loadingEmail, setLoadingEmail] = useState<boolean[]>(
    new Array(leads.length).fill(false)
  );
  const [loadingSms, setLoadingSms] = useState<boolean[]>(
    new Array(leads.length).fill(false)
  );
  const [clickedTabs, setClickedTabs] = useState<any>({});
  console.log(sendStatus, "sendStatus");
  const router = useRouter();
  const handleChange1 = (value: string) => {
    // Update the URL with the selected value
    router.push(`/admin/pearls?filter=${value}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // router.push(`/admin/pearls?search=${value}&filter=${filter}`);
    if (value?.trim()) {
      router.push(`/admin/pearls?search=${value}&filter=${filter}`);
    } else {
      // If the search input is empty, just update the filter (and keep it in the same tab, if any)
      router.push(`/admin/pearls?filter=${filter}`);
    }
};
  const handleTabChange = (key: string) => {
    // Define a mapping from tab keys to filter values for the URL
    const filterMap: { [key: string]: string } = {
      all: "all",
      priority: "priority",
      potential: "potential",
      non_potential: "non_potential",
      call_lead: "call_lead",
      mail: "mail",
      sms: "sms",
    };

    // Get the filter value based on the selected tab key
    const filterValue = filterMap[key];
    setFilter(filterValue)
    if (searchTerm?.trim()) {
      router.push(`/admin/pearls?search=${searchTerm}&filter=${filterValue}`);
    } else {
      // If there is no search term, update the URL only with the selected filter
      router.push(`/admin/pearls?filter=${filterValue}`);
    }
    // Update the URL with the selected tab's filter value
    // if (filterValue) {
    //   router.push(`/admin/pearls?filter=${filterValue}&search=${searchTerm}`);
    // }
  };
  const handleChange = (key: any) => {
    setActiveKey(key);
    setClickedTabs((prev: any) => ({ ...prev, [key]: true }));
  };
  const tabs = [
    {
      key: "all",
      label: (
        <Tooltip title={`Total Pearl Diver Leads ${data?.total_length}`}>
          <span>
            {/* All leads */}
            {/* {!clickedTabs['all'] && <Badge count={data?.total_length} />} */}
            All leads
            {!clickedTabs["all"] && (
              <>
                <Badge count={data?.total_length} />
              </>
            )}
          </span>
        </Tooltip>
      ),
    },
    {
      key: "priority",
      label: (
        <span>
          {!clickedTabs["priority"] && (
            <>
              <Badge color="orange" />
            </>
          )}
          Priority leads
          {!clickedTabs["priority"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
    {
      key: "non-potential",
      label: (
        <span>
          {/* {!clickedTabs['non-potential'] && <Badge color="red" />} */}
          {!clickedTabs["non-potential"] && (
            <>
              <Badge color="red" />
            </>
          )}
          Non Potential leads
          {!clickedTabs["non-potential"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
    {
      key: "all-mails",
      label: (
        <span>
          {!clickedTabs["all-mails"] && (
            <>
              <Badge color="red" />
            </>
          )}
          All mails
          {!clickedTabs["all-mails"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
    {
      key: "call-leads",
      label: (
        <span>
          {/* {!clickedTabs['call-leads'] && <Badge color="green" />}
          Call leads */}
          {!clickedTabs["call-leads"] && (
            <>
              <Badge color="green" />
            </>
          )}
          Call leads
          {!clickedTabs["call-leads"] && (
            <>
              <Badge count={data?.total_length} />
            </>
          )}
        </span>
      ),
    },
  ];
  const [state, setState] = useState<any>([]);
  console.log(data, "data");
  const getData = async () => {
    try {
      // const res =await api.Leads.listing()
      const res = await api.Leads.listing();
      console.log(res, "kkkk");
      setState(res);
    } catch (error) {
      console.log(error, "check error");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const colorMap: { [key: string]: string } = {
    "High-Potential Leads": "rgb(14 110 49)", // Light Green
    "Potential Lead": "rgb(147 96 11)", // Yellow
    "Suspect Lead": "rgb(201 28 28)", // Red
    "mail-lead": "#007BFF", // Purple
    "call-lead": "#3B82F6", // Blue
    "sms-lead": "#6f42c1", // Orange
  };

  // Background color mapping (you can adjust these colors as needed)
  const backgroundcolorMap: { [key: string]: string } = {
    "High-Potential Leads": "rgb(207 231 211)", // Green
    "Potential Lead": "rgb(239 233 201)", // Light Yellow
    "Suspect Lead": "rgb(235 222 222)", // Light Red
    "mail-lead": "rgb(201 214 227)", // Light Purple
    "call-lead": "#BFDBFE", // Light Blue
    "sms-lead": "#e1dde9", // Light Orange
  };
  // ffddbe
  const data2 = [
    { label: "All leads ", count: fetchData?.data?.totalLeads, color: "black" },
    {
      label: "High-Potential Leads",
      count: fetchData?.data?.priorityLeads,
      color: "rgb(14 110 49)",
    },
    {
      label: "Potential leads",
      count: fetchData?.data?.potentialLeads,
      color: "rgb(147 96 11)",
    },
    {
      label: "Suspect Leads",
      count: fetchData?.data?.nonPotentialLeads,
      color: "rgb(201 28 28)",
    },
    {
      label: "All mails",
      count: fetchData?.data?.mailLeads || "0",
      color: "#007BFF",
    },
    {
      label: "Call leads",
      count: fetchData?.data?.calledLeads || "0",
      color: "#3B82F6",
      Link: `/admin/pearls?filter=call_lead`,
    },
    {
      label: "Sms leads",
      count: fetchData?.data?.smsLeads || "0",
      color: "#6f42c1",
      Link: `/admin/pearls?filter=call_lead`,
    },
    {
      label: "Deleted leads",
      count: fetchData?.data?.deletedLead || "0",
      color: "rgb(2021 28 28)",
      // Link: `/admin/pearls?filter=call_lead`,
    },
  ];
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <MailOutlined /> Email
      </Menu.Item>
      <Menu.Item key="1">
        <PhoneOutlined /> Call
      </Menu.Item>
      <Menu.Item key="2">
        <MailOutlined /> Sms
      </Menu.Item>
    </Menu>
  );
  console.log(fetchData,"mmbm");
  
  const archive = async (id: any) => {
    console.log(id, "popop");
    try {
      let item = {
        user_uuid: id,
      };
      console.log(item, "item");

      const res = await api.PearlLeads.delete(item);
      // data(); 
      console.log(res, "ioioio");
      toast.success(res?.message);
      // window.location.reload();
    } catch (error) {}
  };

  const Send = (id: any) => {
    console.log(id, "uiuiui");

    try {
      router.push(`/admin/pearls/${id}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  const ChangeState = async (
    statusType: number,
    pearlId: any,
    user_id: any
  ) => {
    console.log(statusType, "jlsdjf");

    try {
      // setLoading(false);
      let items = {
        pearl_id: pearlId,
        user_uuid: user_id,
        status: statusType,
      } as any;
      const res = await api.PearlLeads.changeStatus(items);
      console.log(res, "check res");

      toast.success(res?.data);
    } catch (error) {
      // setLoading(false);
    }
  };
  const [loadingStates, setLoadingStates] = useState<boolean[]>(
    new Array(leads.length).fill(false)
  );
  const sendEmail = (id: any, user_id: any, type: any, index: any) => {
    console.log(id, user_id, type, "check mail");

    try {
      if (type === "sms") {
        setLoadingSms((prevState) => {
          const newState = [...prevState];
          newState[index] = true; // Set the button at `index` to loading
          return newState;
        });
      } else if (type === "email") {
        setLoadingEmail((prevState) => {
          const newState = [...prevState];
          newState[index] = true; // Set the button at `index` to loading
          return newState;
        });
      }
      router.push(
        `/admin/purposal/sent_purposal?pearls_lead_id=${id}&user_id=${user_id}&field_for=welcome&fieldType=${type}`
      );
    } catch (error) {
      if (type === "sms") {
        setLoadingSms((prevState) => {
          const newState = [...prevState];
          newState[index] = false; // Set the button at `index` to loading
          return newState;
        });
      } else if (type === "email") {
        setLoadingEmail((prevState) => {
          const newState = [...prevState];
          newState[index] = false; // Set the button at `index` to loading
          return newState;
        });
      }
    }
  };
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [viewLoading, setViewLoading] = useState<boolean>(false);
  const [selectedLead, setSelectedLead] = useState<any>(null);

  const handleCardClick = (lead: any) => {
    setSelectedLead(lead); // Set the selected lead data
    setModal2Open(true); // Open the modal
  };

  const ViewMore = () => {
    try {
      setViewLoading(true);
      router.push(`/admin/pearls/${selectedLead?.pearl_id}`);
      // setModal2Open(false)
    } catch (error) {
      setViewLoading(false);
    }
  };
  const renderLeadStatusDescription = (status: string) => {
    switch (status) {
      case "High-Potential Leads":
        return "We are displaying leads based on the following criteria: the number of clicks is 5 or more, a phone number is provided, an address is on file, and the income is greater than 0 dollars.This targets highly engaged leads with complete contact information and reported income";
      case "Potential Lead":
        return "We are displaying leads based on the following criteria: the number of clicks is at least 1, a phone number is provided, an address is on file, and the income is greater than 0 dollars.This ensures we're showing leads with some level of engagement, contact information, and reported income.";
      case "Suspect Lead":
        return "We are displaying leads based on the following criteria: the number of clicks is 0, there is no address provided, and the income is 0 dollars.This makes it clear that we're filtering leads with zero clicks, no address on file, and no reported income";
      default:
        return "";
    }
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ToastContainer />
      <Content style={{ padding: "20px" }}>
        {/* <Row gutter={[16, 16]} justify="start">
          {data2.map((item: any, index: number) => (
            <Col key={index}>
              <Card
                bordered={false}
                style={{ textAlign: "center", minWidth: "100px" }}
                className="pearl_card"
              >
                <Statistic
                  title={
                    <Badge
                      color={item.color}
                      text={
                        <span style={{ fontWeight: "bold" }}>{item.label}</span>
                      }
                    />
                  }
                  value={item.count}
                  valueStyle={{ color: "#00000", fontSize: "16px" }}
                />
              </Card>
            </Col>
          ))}
        </Row> */}
        {/* <Tabs
      defaultActiveKey="all"
      items={tabs}
      activeKey={activeKey}
      onChange={handleChange}
      style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
    /> */}

        <Title className="mt-3" level={3}>
          All Pearl Diver Leads
        </Title>
        <Row justify="space-between" style={{ marginBottom: "0px" }}>
          <div  style={{  padding: "20px" }}>
            {/* <h1>Account</h1> */}
            <Tabs
              defaultActiveKey={sendStatus}
              centered
              onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <span style={{ fontWeight: 600 }}>
                    All Leads [{fetchData?.data?.totalLeads}]{" "}
                  </span>
                }
                key="all"
              >
                {/* Content for All Leads */}
              </TabPane>
              <TabPane
                // tab={<span style={{ fontWeight: 'bold' }}>High-Potential Leads [{fetchData?.data?.priorityLeads}] </span>}
                tab={
                  <span style={{ fontWeight: 600 }}>
                    High-Potential Leads [{fetchData?.data?.priorityLeads}]{" "}
                  </span>
                }
                key="priority"
              >
                {/* Content for High-Potential Leads */}
              </TabPane>
              <TabPane
                // tab={`Potential Leads [${fetchData?.data?.}]`}
                tab={
                  <span style={{ fontWeight: 600 }}>
                    Potential Leads [{fetchData?.data?.potentialLeads}]{" "}
                  </span>
                }
                key="potential"
              >
                {/* Content for Potential Leads */}
              </TabPane>
              <TabPane
                // tab={`Suspect Leads [${fetchData?.data?.nonPotentialLeads}]`}
                tab={
                  <span style={{ fontWeight: 600 }}>
                    Suspect Leads [{fetchData?.data?.nonPotentialLeads}]{" "}
                  </span>
                }
                key="non_potential"
              >
                {/* Content for Suspect Leads */}
              </TabPane>
              <TabPane
                // tab={`Call Leads [${fetchData?.data?.mailLeads}]`}
                tab={
                  <span style={{ fontWeight: 600 }}>
                    Call Leads [{fetchData?.data?.mailLeads}]{" "}
                  </span>
                }
                key="call_lead"
              >
                {/* Content for Call Leads */}
              </TabPane>
              <TabPane
                // tab={`Email Leads [${fetchData?.data?.calledLeads}]`}
                tab={
                  <span style={{ fontWeight: 600 }}>
                    Email Leads [{fetchData?.data?.calledLeads}]{" "}
                  </span>
                }
                key="mail"
              >
                {/* Content for Email Leads */}
              </TabPane>
              <TabPane
                // tab={`Sms Leads [${fetchData?.data?.smsLeads}]`}
                tab={
                  <span style={{ fontWeight: 600 }}>
                    Sms Leads [{fetchData?.data?.smsLeads}]{" "}
                  </span>
                }
                key="sms"
              >
                {/* Content for Sms Leads */}
              </TabPane>
            </Tabs>
            <Search size='large' className='' placeholder="Search by Name & Email" enterButton value={searchTerm}
                                        onChange={handleSearch} />
            <Divider />
          </div>

          {/* <Space>
            <Select
              defaultValue="All Leads"
              style={{ width: 150 }}
              onChange={handleChange1}
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
    
        </Row>
        {/* <Row>
       
        </Row> */}
        <Row gutter={[16, 16]}>
          <Col xs={24} md={18}>
            <Row gutter={[16, 16]}>
              {data?.data?.map((lead: any, index: number) => (
                <Col xs={24} sm={12} md={8} lg={6} key={index}>
                  <div
                    style={{
                      background: "#f5f7fa",
                      padding: "10px",
                      justifyContent: "center",
                      paddingLeft: "10px",
                      textAlign: "center",
                      borderRadius: "4px",
                    }}
                  >
                    <Space size="middle">
                      {/* <Tooltip title="Add">
          <Button icon={<PlusOutlined />} />
        </Tooltip> */}
                      {/* <Tooltip title="Filter">
          <Button icon={<FilterOutlined />} />
        </Tooltip> */}
                      <Tooltip title="Message">
                        <Button
                          loading={loadingSms[index]}
                          onClick={() => {
                            if (lead?.pearl_id) {
                              sendEmail(
                                lead.pearl_id,
                                lead.user_uuid,
                                "sms",
                                index
                              );
                            } else {
                              console.error("Pearl ID is missing");
                            }
                          }}
                          icon={<MessageOutlined style={{ color: "blue" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="Send Email">
                        <Button
                          loading={loadingEmail[index]}
                          onClick={() => {
                            if (lead?.pearl_id) {
                              sendEmail(
                                lead.pearl_id,
                                lead.user_uuid,
                                "email",
                                index
                              );
                            } else {
                              console.error("Pearl ID is missing");
                            }
                          }}
                          icon={<MailOutlined style={{ color: "orange" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="Call">
                        <Button
                          onClick={() =>
                            ChangeState(3, lead.pearl_id, lead.user_uuid)
                          }
                          icon={<PhoneOutlined style={{ color: "green" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="View">
                        <Button
                          onClick={() => {
                            if (lead?.pearl_id) {
                              Send(lead.pearl_id);
                            } else {
                              console.error("Pearl ID is missing");
                            }
                          }}
                          icon={<EyeOutlined style={{ color: "black" }} />}
                        />
                      </Tooltip>

                      <Tooltip title="Delete">
                        <Popconfirm
                          title="Delete"
                          description="Are you sure you want to delete ?"
                          onConfirm={(event: any) => {
                            archive(lead?.user_uuid);
                          }}
                          // okButtonProps={{ loading: deleteLoading == res._id, danger: true }}
                        >
                          <Button
                            icon={<DeleteOutlined style={{ color: "red" }} />}
                          />
                        </Popconfirm>
                      </Tooltip>
                      {/* <Tooltip title="Document">
          <Button icon={<FileOutlined />} />
        </Tooltip> */}
                      {/* <Tooltip title="Calendar">
          <Button icon={<CalendarOutlined />} />
        </Tooltip> */}
                      {/* <Tooltip title="Favorite">
          <Button icon={<StarOutlined />} />
        </Tooltip> */}
                      {/* <Tooltip title="Download">
          <Button icon={<DownloadOutlined />} />
        </Tooltip>
        <Tooltip title="User">
          <Button icon={<UserOutlined />} />
        </Tooltip>
        <Tooltip title="Table">
          <Button icon={<TableOutlined />} />
        </Tooltip>
        <Tooltip title="Image">
          <Button icon={<PictureOutlined />} />
        </Tooltip> */}
                    </Space>
                  </div>
                  {/* <Link href={`/admin/pearls/${lead?.pearl_id}`}> */}
                  <Card
                    hoverable
                    // onClick={() => handleCardClick(lead)}
                    // className={lead.status === "High-Potential Leads" ? 'blinking-card' : ''} // Adjust 'your-status' as needed
                    style={{ borderRadius: "10px" }}
                    actions={[
                      <div className="">
                        <Tooltip
                          title={
                            lead.status === "High-Potential Leads"
                              ? "We are displaying leads based on the following criteria: personal count is 5, phone number is not null, address is not null, and income value is not 0 dollars"
                              : lead.status === "Potential Lead"
                              ? " We are displaying leads based on the following criteria: personal count is 1, phone number is not null, address is not null, and income value is not 0 dollars."
                              : lead.status === "Suspect Lead"
                              ? "We are displaying leads based on the following criteria: personal count is 0, address is null, and income value is 0 dollars."
                              : ""
                          }
                        >
                          <Button
                            style={{
                              color: colorMap[lead.status] || "#000000", // Default text color if not found
                              backgroundColor:
                                backgroundcolorMap[lead.status] ||
                                "rgb(187, 181, 181)", // Default background color if not found
                            }}
                            key="action"
                            size="small"
                          >
                            {lead.status}
                          </Button>
                        </Tooltip>
                        {/* <Select
                        // defaultValue={lead.status}
                        style={{ width: 180 }}
                        // className={`custom-select ${lead.status}`} // Dynamically add class based on status
                        onChange={handleChange1}
                        key="action"
                      >
                        <Option value=""> </Option>
                        <Option value="priority">High-Potential Leads</Option>
                        <Option value="potential">Potential Leads</Option>
                        <Option value="non_potential">Suspect Leads</Option>
                        <Option value="call_lead">Call Leads</Option>
                        <Option value="mail">Email Leads</Option>
                        <Option value="sms">Sms Leads</Option>
                      </Select> */}
                      </div>,
                      // </Space>
                    ]}
                  >
                    <Space
                      direction="vertical"
                      size="small"
                      onClick={() => handleCardClick(lead)}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Title level={5} style={{ margin: 0 }}>
                          <Avatar
                            size={34}
                            icon={<UserOutlined />}
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                          />
                          {lead?.firstName
                            ? ` ${lead.firstName} ${lead.lastName}`
                            : " N/A"}
                        </Title>
                        {/* More Button with Dropdown */}
                        {/* <Dropdown overlay={menu} className="gap-2" trigger={["click"]}>
                          <Button type="text" icon={<EllipsisOutlined />} />
                        </Dropdown> */}
                      </div>
                      <Text>
                        {dayjs(lead?.created_at).format("DD-MM-YYYY")}
                      </Text>
                      <Divider
                        className="pearl_card_divider"
                        style={{ margin: "0px" }}
                      />
                      <Text>
                        <PhoneOutlined />{" "}
                        {lead.phones
                          .map((res: any, index: number) => res.number)
                          .join(", ") || "N/A"}
                      </Text>
                      <Text>
                        <MailOutlined /> {lead.email}
                      </Text>
                    </Space>
                  </Card>
                  {/* </Link> */}
                </Col>
              ))}
            </Row>

            {/* Centered Pagination */}
            <Row justify="center">
              <Pagination totalItems={data?.total_length} limit={10} />
            </Row>
          </Col>

          <Col xs={24} md={6}>
            <Recent_card />
            {/* <Card title="Call Leads" style={{ marginBottom: '20px' }}>
                <Space direction="vertical">
                
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Jane Cooper - Toledo</Text>
                  <Text><Avatar size={25} icon={<UserOutlined />}  /> Dianne Russell - Naperville</Text>
                  <Button type="link">See All Call Leads</Button>
                </Space>
              </Card> */}
          </Col>
          <Modal
            title="Lead Details"
            centered
            open={modal2Open}
            onOk={ViewMore}
            onCancel={() => setModal2Open(false)}
            okText="View More"
            okButtonProps={{
              loading: viewLoading, // Show loading state on OK button
            }}
          >
            {selectedLead ? (
              <>
                <p>{renderLeadStatusDescription(selectedLead.status)}</p>
                <p>
                  <strong>Lead Name:</strong> {selectedLead.firstName}{" "}
                  {selectedLead.lastName}
                </p>
                <p>
                  <strong>Email:</strong> {selectedLead.email}
                </p>
                <p>
                  <strong>Phone:</strong>{" "}
                  {selectedLead.phones
                    ?.map((res: any) => res.number)
                    .join(", ") || "N/A"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {dayjs(selectedLead.created_at).format("DD-MM-YYYY")}
                </p>
              </>
            ) : (
              <p>No lead selected</p>
            )}
          </Modal>
        </Row>
      </Content>
    </Layout>
  );
};

export default Pearl_diver_leads;
