"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Layout,
  Modal,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { Image } from "antd";
import { CSSProperties } from "react";
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter, useSearchParams } from "next/navigation";
import WelcomeTemplate from "./common/WelcomeTemplate";
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
// Array of images and template names
import WelcomeImage from "../assests/images/WelcomeTemplateImage.png";
import OfferImage from "../assests/images/OfferTemplateImage.png";
import GiftImage from "../assests/images/GiftTemplateImage.png";
import ProposalImage from "../assests/images/Screenshot 2024-12-17 155122.png";
const templates = [
  {
    image: WelcomeImage,
    name: "Welcome",
  },
  {
    image: OfferImage,
    name: "Offer",
  },
  {
    image: ProposalImage,
    name: "Proposal",
  },
  {
    image: GiftImage,
    name: "Gift",
  },
  {
    image: "https://template.canva.com/EAFHGflq-as/1/0/618w-2xzNk9wnh0Q.jpg",
    name: "XYZ",
  },
];
// Custom style for card hover effect
const hoverStyle: CSSProperties = {
  opacity: 0.7,
};
const ShowTemplate = ({ searchQuery }: any) => {
  const router = useRouter();
  // const searchParams = useSearchParams();

  const emailType: any = searchQuery;
  console.log(emailType, "emailType");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const handleCardClick = (imageUrl: any) => {
    console.log(imageUrl, "imageUrl");

    setImageUrl(imageUrl);
    setIsModalVisible(true); // Show modal with image
  };
  const handleModalClose = () => {
    setIsModalVisible(false); // Close the modal
  };
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const nameElement = e.currentTarget.querySelector(
      ".template-name"
    ) as HTMLDivElement;
    if (nameElement) {
      nameElement.style.visibility = "visible";
    }
  };
  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const nameElement = e.currentTarget.querySelector(
      ".template-name"
    ) as HTMLDivElement;
    if (nameElement) {
      nameElement.style.visibility = "hidden";
    }
  };
  const back = () => {
    router.back();
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        {/* <Tabs
defaultActiveKey="all"
items={tabs}
activeKey={activeKey}
onChange={handleChange}
style={{ backgroundColor: '#F5F5F5', padding: '10px', borderRadius: '5px' }}
/> */}
        <div style={{ marginBottom: "1rem" }}>
          {/* Breadcrumbs (commented out) */}
          <Button onClick={back}>Back</Button>
        </div>
        <Title className="mt-3" level={3}>
          All Email Templates
        </Title>
        <Card style={{ marginBottom: "1.5rem", borderRadius: 8 }}>
          <Paragraph style={{ margin: 0, fontSize: "20px", color: "#555" }}>
            We included several modern account management email templates to
            help you communicate with your users.
          </Paragraph>
        </Card>
        <Row gutter={[16, 16]} justify="center">
          {templates.map((template, index) => (
            <Col key={index} xs={24} sm={12} md={8} lg={4}>
              <Card
                hoverable
                onClick={() => handleCardClick(`${template?.name}`)}
                // onClick={() => handleCardClick(`https://picsum.photos/200/250?random=${index}`)}
                cover={
                  <div style={{ position: "relative", height: "250px" }}>
                    <img
                      src={
                        typeof template?.image === "string"
                          ? template?.image
                          : template?.image?.src
                      }
                      alt="Placeholder"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <div
                      className="template-name"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        color: "black",
                        fontSize: "25px",
                        fontWeight: "bold",
                        textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)",
                        visibility: "hidden",
                      }}
                    >{template.name}
                    </div>
                  </div>
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div>
                  <h4 className="">{template.name}</h4>
                </div>
              </Card>
              <Link
                href={`/admin/purposal/sent_purposal?field_for=${template?.name}&fieldType=email&email_mode=bulk&email_type=${emailType}`}
              >
                <Button
                  type="primary"
                  style={{ marginTop: "16px", width: "100%" }}
                >
                  Send Email
                </Button>
              </Link>
            </Col>
          ))}
        </Row>
        {/* Modal to preview the image */}
        <Modal
          visible={isModalVisible}
          onCancel={handleModalClose}
          footer={null}
          width={800} // Adjust the width as needed
          centered
          bodyStyle={{ padding: 0 }}
        >
          {/* <img
        src={imageUrl}
        alt="Preview"
        style={{ width: '100%', height: 'auto' }}
      /> */}

          {/* Welcome Template */}
          <div className="container email_welcome">
            <div className="logo fs-3">
              {imageUrl} Template
              {/* <img src="https://placeholder.com/wp-content/uploads/2018/10/placeholder.com-logo3.png" alt="cc-logo" /> */}
            </div>
            <div className="illustration">
              <div className="hgroup">
                <span className="name">Hello, John Doe</span>
                <h1>Thank you for Signing Up</h1>
                <div className="thumbs">
                  <a href="https://imgbb.com/">
                    <img src="https://i.ibb.co/2g7tS2d/good.png" alt="good" />
                  </a>
                </div>
                <p className="rad">Rad stuff is here</p>
              </div>
            </div>

            <div className="hgroup">
              {/* <br></br> */}
              <>
                Placeholder aims at solving all lending problems in africa, we
                built a platform to support the lenders community with high
                quality, cost concious assets like: the web plug in, mobile app,
                chat bot, sophiscated credit analysis, bank statement analysis
                and more. And these products live on a site packed with the best
                practice and shared knowledge resources from our team to you.
                <p>
                  <span className="raised">Hold up, there's more!</span>A 7 days
                  simulation trial, your trial starts now.
                </p>
                <p>
                  If you have any questions, kindly reach out to our team on
                  support@placeholder.com.
                </p>
                <p>
                  Have an AWESOME day! Brought to you by your friends at
                  Placeholder.
                </p>
              </>
            </div>

            <div className="button-wrap">
              <button className="explore">Explore</button>
            </div>
            <p>
              Oxygen Health Systems Inc © 2024
              {/* <br> */}
              Somewhere in earth.
              {/* </br> */}
              Tel: 331 229-7714
            </p>
          </div>
        </Modal>
      </Content>
    </Layout>
  );
};

export default ShowTemplate;
