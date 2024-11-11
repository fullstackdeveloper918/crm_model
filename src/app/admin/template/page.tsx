"use client";
import React, { useState } from "react";
import { Button, Card, Col, Layout, Modal, Row, Tooltip, Typography } from "antd";
import { Image } from "antd";
import { CSSProperties } from "react";
import Link from "next/link";
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
// Array of images and template names
const templates = [
  {
    image: "https://template.canva.com/EAFHGflq-as/1/0/618w-2xzNk9wnh0Q.jpg",
    name: "Welcome",
  },
  {
    image:
      "https://marketplace.canva.com/EAFBJmZCuNA/1/0/640w/canva-corporate-blue-wave-shape-long-email-newsletter-GPHWBdNinmg.jpg",
    name: "Offer",
  },
  {
    image: "https://template.canva.com/EAFHGflq-as/1/0/618w-2xzNk9wnh0Q.jpg",
    name: "Proposal",
  },
  {
    image: "https://template.canva.com/EAFHGflq-as/1/0/618w-2xzNk9wnh0Q.jpg",
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

const page = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleCardClick = (imageUrl:any) => {
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Content style={{ padding: "20px" }}>
        {/* <Tabs
  defaultActiveKey="all"
  items={tabs}
  activeKey={activeKey}
  onChange={handleChange}
  style={{ backgroundColor: '#f5f5f5', padding: '10px', borderRadius: '5px' }}
/> */}
        <Title className="mt-3" level={3}>
          All Email Templates
        </Title>

        <Row gutter={[16, 16]} justify="center">
        {templates.map((template, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={4}>
            <Card
              hoverable
              onClick={() => handleCardClick(`https://picsum.photos/200/250?random=${index}`)} // Clicking opens the image
              cover={
                <div style={{ position: 'relative', height: '250px' }}>
                  {/* Fake Image Placeholder */}
                  <img
                    src={`https://picsum.photos/200/250?random=${index}`}
                    alt="Placeholder"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    className="template-name"
                    style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      fontSize: '20px',
                      fontWeight: 'bold',
                      textShadow: '2px 2px 8px rgba(0, 0, 0, 0.7)',
                      visibility: 'hidden',
                    }}
                  >
                    {template.name}
                  </div>
                </div>
              }
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div>{template.name}</div>
              {/* Button for view details */}
            </Card>
              <Link href={`#`}>
              <Button type="primary" style={{ marginTop: '16px', width: '100%' }}>
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
        <img 
          src={imageUrl} 
          alt="Preview" 
          style={{ width: '100%', height: 'auto' }} 
        />
      </Modal>
      </Content>
    </Layout>
  );
};

export default page;