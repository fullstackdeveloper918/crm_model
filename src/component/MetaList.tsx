"use client";
import React, { Fragment, useState } from "react";
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
  Input,
  Modal,
} from "antd";
import {
  DownloadOutlined,
  ExportOutlined,
  EyeOutlined,
  ImportOutlined,
  InboxOutlined,
  MailOutlined,
  MessageOutlined,
  PhoneOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import dayjs from "dayjs";
import Recent_card from "./common/Recent_card";
import { capFirst, replaceUnderScore } from "@/utils/validation";
import Pagination from "./common/Pagination";
import { ToastContainer } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
const { Title, Text } = Typography;
const { Content, Sider } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const MetaList = ({ data, data1, currentSearch, sendStatus }: any) => {
  const router = useRouter();
  console.log(data1, "dretdfghjklata");
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [viewLoading, setViewLoading] = useState<boolean>(false);
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
  const dataSource = data?.data?.map((res: any, index: number) => {
    return {
      key: index + 1,
      name: res?.full_name,
      email: res?.email,
      phone: res?.phone_number,
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
    };
  });
  const backgroundcolorMap: any = {
    prioritize: "#ffddbe",
    potential: "#e           9cece",
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
  const [loadingEmail, setLoadingEmail] = useState<boolean[]>(
    new Array(leads.length).fill(false)
  );
  const [loadingSms, setLoadingSms] = useState<boolean[]>(
    new Array(leads.length).fill(false)
  );
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const handleCardClick = (lead: any) => {
    setSelectedLead(lead); // Set the selected lead data
    setModal2Open(true); // Open the modal
  };
  const searchParams = useSearchParams();
  console.log(searchParams.get("chamber"),"searchParams");
  const chamberVlue= searchParams.get("chamber")
  const handleChange = (e: string) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());

    newSearchParams.set('chamber', e);

    router.push(`/admin/metalist?${newSearchParams.toString()}`);
  };

  // const searchParams = useSearchParams();
  const handleTabChange =(e: any) => {

    // Create a new URLSearchParams object to modify the search parameters
    const newSearchParams = new URLSearchParams(searchParams.toString());
  
    // Define a mapping for the filter options
    const filterMap: { [key: string]: string } = {
      all: "all",
      priority: "priority",
      potential: "potential",
      non_potential: "non_potential",
      call_lead: "call_lead",
      mail: "mail",
      sms: "sms",
    };
  
    // Check if the provided 'e' key exists in the filterMap and set the value
    if (filterMap[e]) {
      newSearchParams.set('filter', filterMap[e]); // Set the filter parameter to the corresponding value
    }
  
    // Update the URL with the new search parameters
    router.push(`/admin/metalist?${newSearchParams.toString()}`);
  };
  const ViewMore = () => {
    try {
      setViewLoading(true);
      router.push(`/admin/metalist/${selectedLead?.user_uuid}`);
      // setModal2Open(false)
    } catch (error) {
      setViewLoading(false);
    }
  };
  const Send = (id: any) => {
    console.log(id, "uiuiui");

    try {
      router.push(`/admin/metalist/${id}`);
    } catch (error) {
      console.error("Navigation error:", error);
    }
  };
  const sendEmail = (
    id: any,
    user_id: any,
    email_number: any,
    type: any,
    index: any
  ) => {
    console.log(id, user_id, type, email_number, "check mail");

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
        `/admin/purposal/sent_purposal?user_id=${user_id}&field_for=welcome&send_to=${email_number}&fieldType=${type}&email_type=meta`
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
  const [filter, setFilter] = useState<any>(sendStatus);
  const [searchTerm, setSearchTerm] = useState<any>(currentSearch);
  console.log(searchTerm, "searchTerm");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    // router.push(`/admin/pearls?search=${value}&filter=${filter}`);
    if (value?.trim()) {
      router.push(`/admin/metalist?search=${value}&filter=${filter}`);
    } else {
      // If the search input is empty, just update the filter (and keep it in the same tab, if any)
      router.push(`/admin/metalist?filter=${filter}`);
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
  console.log(data?.data[0]?.created_time, "sdfghjk");

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
        <Row justify="space-between" style={{ marginBottom: "0px" }}>
          <div style={{ padding: "20px",display:"flex",gap:"30px" }}>
            <Title className="mt-3" level={3}>
              All Meta Leads
            </Title>
            <Space>
              <Select
                defaultValue={chamberVlue||"All chamber"}
                style={{ width: 150 }}
                onChange={handleChange}
              >
                {data1?.data?.map((res: any, index: number) => {
                  let displayValue = "";
                  let isDisabled = false;

                  // Map the hyperbaric chamber interested in values to custom display text
                  switch (res?.hyperbaric_chamber_interested_in) {
                    case "not_sure_yet,_would_like_more_information":
                      displayValue = "Not sure";
                      break;
                    case "hard_chamber":
                      displayValue = "Hard Chamber";
                      break;
                    case "soft_chamber":
                      displayValue = "Soft Chamber";
                      break;
                    case "":
                      displayValue = "Not available";
                      isDisabled = true; // Disable this option
                      break;
                    default:
                      displayValue =
                        res?.hyperbaric_chamber_interested_in || "Unknown"; // Default case
                  }

                  return (
                    <Option
                      key={index}
                      value={res?.hyperbaric_chamber_interested_in}
                      disabled={isDisabled}
                    >
                      {displayValue}
                    </Option>
                  );
                })}
              </Select>
              {/* <Option value="all">All Leads</Option>
          <Option value="priority">High-Potential Leads</Option>
          <Option value="potential">Potential Leads</Option>
          <Option value="non_potential">Suspect Leads</Option>
          <Option value="call_lead">Call Leads</Option>
          <Option value="mail">Email Leads</Option>
          <Option value="sms">Sms Leads</Option> */}
            </Space>
          </div>
        </Row>
        <Row justify="space-between" style={{ marginBottom: "0px" }}>
          <div >
            {/* <Tabs
              defaultActiveKey={sendStatus}
              centered
              onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <span style={{ fontWeight: 600 }}>
                    All Leads
                  </span>
                }
                key="all"
              >
              </TabPane>
             
              <TabPane
                tab={`Call Leads`}
               
                key="call_lead"
              >
              </TabPane>
              <TabPane
                tab={`Email Leads`}
               
                key="mail"
              >
              </TabPane>
              <TabPane
                tab={`Sms Leads`}
               
                key="sms"
              >
              </TabPane>
            </Tabs> */}
            <Search
              size="large"
              style={{ width: "1000px" }}
              className=""
              placeholder="Search by Name & Email"
              enterButton
              value={searchTerm}
              onChange={handleSearch}
            />
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
              {data?.data?.map((lead: any, index: any) => (
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
                            if (lead?.user_uuid) {
                              sendEmail(
                                lead.pearl_id,
                                lead.user_uuid,
                                lead.phone_number,
                                "sms",
                                index
                              );
                            } else {
                              console.error("Meta ID is missing");
                            }
                          }}
                          icon={<MessageOutlined style={{ color: "blue" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="Send Email">
                        <Button
                          loading={loadingEmail[index]}
                          onClick={() => {
                            if (lead?.user_uuid) {
                              sendEmail(
                                lead.user_uuid,
                                lead.user_uuid,
                                lead.email,
                                "email",
                                index
                              );
                            } else {
                              console.error("Meta ID is missing");
                            }
                          }}
                          icon={<MailOutlined style={{ color: "orange" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="Call">
                        <Button
                          // onClick={() =>
                          //   ChangeState(3, lead.pearl_id, lead.user_uuid)
                          // }
                          icon={<PhoneOutlined style={{ color: "green" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="View">
                        <Button
                          onClick={() => {
                            if (lead?.user_uuid) {
                              Send(lead.user_uuid);
                            } else {
                              console.error("Pearl ID is missing");
                            }
                          }}
                          icon={<EyeOutlined style={{ color: "black" }} />}
                        />
                      </Tooltip>

                      {/* <Tooltip title="Delete">
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
                  </Tooltip> */}
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
                            {lead.meta_status}
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
                          {lead?.full_name || " N/A"}
                        </Title>
                        {/* More Button with Dropdown */}
                        {/* <Dropdown overlay={menu} className="gap-2" trigger={["click"]}>
                      <Button type="text" icon={<EllipsisOutlined />} />
                    </Dropdown> */}
                      </div>
                      <Text>
                        {dayjs(lead?.created_time).format("DD-MM-YYYY")}
                      </Text>
                      <Divider
                        className="pearl_card_divider"
                        style={{ margin: "0px" }}
                      />
                      <Text>
                        <PhoneOutlined /> {lead.phone_number || "N/A"}
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
              <Pagination totalItems={data?.total_count} limit={10} />
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
            {/* <p>No lead selected</p> */}

            {selectedLead ? (
              <>
                <p>{renderLeadStatusDescription(selectedLead.status)}</p>
                <p>
                  <strong>Lead Name:</strong> {selectedLead.full_name}{" "}
                </p>
                <p>
                  <strong>Email:</strong> {selectedLead.email}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedLead.phone_number || "N/A"}
                </p>
                <p>
                  <strong>Created At:</strong>{" "}
                  {dayjs(selectedLead.created_time).format("DD-MM-YYYY")}
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

export default MetaList;
