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
import { useRouter } from "next/navigation";
const { Title, Text } = Typography;
const { Content, Sider } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;
const MetaList = ({ data, currentSearch, sendStatus }: any) => {
  const router = useRouter();
  console.log(data, "dretdfghjklata");
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
  const [selectedLead, setSelectedLead] = useState<any>(null);
  const handleCardClick = (lead: any) => {
    setSelectedLead(lead); // Set the selected lead data
    setModal2Open(true); // Open the modal
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
  return (
    //   <Fragment>
    //   <section>
    //     <Row gutter={[20, 20]}>
    //       <Col span={24}>
    //         <Card className="common-card">
    //           {/* <div className='mb-4'>
    //                     <Breadcrumb separator=">">
    //                         <Breadcrumb.Item><Link className='text-decoration-none' href="/admin/dashboard">General</Link></Breadcrumb.Item>
    //                         <Breadcrumb.Item className='text-decoration-none'>Additional Users</Breadcrumb.Item>
    //                     </Breadcrumb>
    //                 </div> */}
    //           {/* title  */}
    //           <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
    //             <Typography.Title level={3} className="m-0 fw-bold">
    //               Meta Lead List
    //             </Typography.Title>

    //             <div className="d-flex gap-2">
    //             </div>
    //           </div>
    //           {/* Search  */}
    //           <Divider />
    //           {/* Tabs  */}
    //           <Row gutter={[20, 20]}>
    //         <Col xs={24} md={24}>
    //           <Row gutter={[16, 16]}>
    //             {data?.data?.map((lead: any, index: number) => (
    //               <Col xs={24} sm={12} md={8} lg={6} key={index}>
    //                 <Link href={`/admin/metalist/${lead?.user_uuid}`}>
    //                   <Card
    //                     hoverable
    //                     // className={lead.status === "prioritize" ? 'blinking-card' : ''} // Adjust 'your-status' as needed
    //                     style={{ borderRadius: "10px" }}
    //                     // actions={[
    //                     //   <Button
    //                     //     style={{
    //                     //       color: colorMap[lead.status] || "#000000",
    //                     //       backgroundColor:
    //                     //         backgroundcolorMap[lead.status] ||
    //                     //         "rgb(187 181 181)",
    //                     //     }}
    //                     //     key="action"
    //                     //     size="small"
    //                     //   >
    //                     //     {capFirst(replaceUnderScore(lead.status))}
    //                     //   </Button>,
    //                     // ]}
    //                   >
    //                     <Space direction="vertical" size="small">
    //                       <Title level={5}>
    //                         <Avatar
    //                           size={34}
    //                           icon={<UserOutlined />}
    //                           src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
    //                         />
    //                         {lead?.full_name||"N/A"}
    //                       </Title>
    //                       <Text>
    //                         {dayjs(lead?.created_at).format("DD-MM-YYYY")}
    //                       </Text>
    //                       <Divider />
    //                       <Text>
    //                         <PhoneOutlined />{" "}
    //                         {lead.phone_number|| "N/A"}
    //                       </Text>
    //                       <Text>
    //                         <MailOutlined /> {lead.email}
    //                       </Text>
    //                     </Space>
    //                   </Card>
    //                 </Link>
    //               </Col>
    //             ))}
    //           </Row>

    //           {/* Centered Pagination */}
    //           <Row justify="center">
    //             <Pagination totalItems={data?.pagination?.totalCount} limit={12} />
    //           </Row>
    //         </Col>

    //       </Row>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </section>
    // </Fragment>
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
          All Meta Leads
        </Title>
        <Row justify="space-between" style={{ marginBottom: "0px" }}>
          <div style={{ padding: "20px" }}>
            {/* <h1>Account</h1> */}
            <Tabs
              defaultActiveKey={sendStatus}
              centered
              // onChange={handleTabChange}
            >
              <TabPane
                tab={
                  <span style={{ fontWeight: 600 }}>
                    All Leads
                    {/* [{fetchData?.data?.totalLeads}]{" "} */}
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
                    High-Potential Leads
                    {/* [{fetchData?.data?.priorityLeads}]{" "} */}
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
                    Potential Leads
                    {/* [{fetchData?.data?.potentialLeads}]{" "} */}
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
                    Suspect Leads
                    {/* [{fetchData?.data?.nonPotentialLeads}]{" "} */}
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
                    Call Leads
                    {/* [{fetchData?.data?.mailLeads}]{" "} */}
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
                    Email Leads
                    {/* [{fetchData?.data?.calledLeads}]{" "} */}
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
                    Sms Leads
                    {/* [{fetchData?.data?.smsLeads}]{" "} */}
                  </span>
                }
                key="sms"
              >
                {/* Content for Sms Leads */}
              </TabPane>
            </Tabs>
            <Search
              size="large"
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
                          // loading={loadingSms[index]}
                          // onClick={() => {
                          //   if (lead?.pearl_id) {
                          //     sendEmail(
                          //       lead.pearl_id,
                          //       lead.user_uuid,
                          //       "sms",
                          //       index
                          //     );
                          //   } else {
                          //     console.error("Pearl ID is missing");
                          //   }
                          // }}
                          icon={<MessageOutlined style={{ color: "blue" }} />}
                        />
                      </Tooltip>
                      <Tooltip title="Send Email">
                        <Button
                          // loading={loadingEmail[index]}
                          // onClick={() => {
                          //   if (lead?.pearl_id) {
                          //     sendEmail(
                          //       lead.pearl_id,
                          //       lead.user_uuid,
                          //       "email",
                          //       index
                          //     );
                          //   } else {
                          //     console.error("Pearl ID is missing");
                          //   }
                          // }}
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
                          // onClick={() => {
                          //   if (lead?.pearl_id) {
                          //     Send(lead.pearl_id);
                          //   } else {
                          //     console.error("Pearl ID is missing");
                          //   }
                          // }}
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
                        {dayjs(lead?.created_at).format("DD-MM-YYYY")}
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

export default MetaList;
