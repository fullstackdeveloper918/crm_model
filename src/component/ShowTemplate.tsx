"use client";
import React, { useState } from "react";
import { Button, Card, Col, Layout, Modal, Row, Tooltip, Typography } from "antd";
import { Image } from "antd";
import { CSSProperties } from "react";
import Link from "next/link";
import Paragraph from "antd/es/typography/Paragraph";
import { useRouter, useSearchParams } from "next/navigation";
const { Content, Sider } = Layout;
const { Title, Text } = Typography;
// Array of images and template names
const templates = [
  {
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJI7QvdqwJasVb6STL3XcGcsGglIeLimN1tQ&s",
    name: "Welcome",
  },
  {
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQUxA_YnNbhw4TuWg7cry9Pe_OWjoIrOm2A&s",
    name: "Offer",
  },
  {
    image: "https://template.canva.com/EAFHGflq-as/1/0/618w-2xzNk9wnh0Q.jpg",
    name: "Proposal",
  },
  {
    image: "https://picsum.photos/200/250",
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
const ShowTemplate = ({searchQuery}:any) => {


    const router= useRouter()
    // const searchParams = useSearchParams();

    const emailType: any = searchQuery
    console.log(emailType,"emailType");
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
  const back=()=>{
    router.back()
  }
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
        <Button onClick={back}>
            Back
          </Button>
      </div>
      <Title className="mt-3" level={3}>
        All Email Templates
      </Title>
      <Card style={{ marginBottom: '1.5rem', borderRadius: 8 }}>
    <Paragraph style={{ margin: 0, fontSize: '20px', color: '#555' }}>
      We included several modern account management email templates to help you communicate with your users.
    </Paragraph>
  </Card>
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
                  src={template?.image}
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
            <Link href={`/admin/purposal/sent_purposal?field_for=${template?.name}&fieldType=email&email_mode=bulk&email_type=${emailType}`}>
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
  )
}

export default ShowTemplate