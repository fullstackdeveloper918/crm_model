"use client";
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
const Sigin = () => {
  const [loading, setLoading] = useState(false);
const router= useRouter()
  const onFinish = (values: any) => {
    console.log('Received values:', values);
    setLoading(true);
    router.push("admin/pearls")
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };


  return (
    <section
    className="auth-pages d-flex align-items-center mt-5 h-100"
    style={{
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f7f8fc',
    }}
  >
    <div
      className="container mt-5"
      style={{
        maxWidth: '400px',
        padding: '40px',
        backgroundColor: '#fff',
        borderRadius: '12px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Logo Section */}
      <div className="logo text-center mb-4">
        {/* <img
          src="https://iconape.com/wp-content/png_logo_vector/crm-logo.png"
          alt="logo"
          style={{ width: '50px' }}
        /> */}
        <h2 style={{ marginTop: '10px', fontWeight: 'bold' }}>ClarityUI</h2>
      </div>

      {/* Form Section */}
      <Form
        name="login_form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        layout="vertical"
        style={{ marginTop: '20px' }}
      >
        {/* Email Input */}
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'The input is not valid E-mail!' },
          ]}
        >
          <Input
            size="large"
            placeholder="Enter email"
            style={{
              borderRadius: '24px',
              padding: '12px 20px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f7f7f7',
            }}
          />
        </Form.Item>

        {/* Password Input */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input.Password
            size="large"
            placeholder="Enter password"
            style={{
              borderRadius: '24px',
              padding: '12px 20px',
              border: '1px solid #e0e0e0',
              backgroundColor: '#f7f7f7',
            }}
          />
        </Form.Item>

        {/* Forgot Password Link */}
        <div className="text-end mb-3">
          <Link href="/auth/forgot-password" style={{ color: '#a0a0a0' }}>
            Forgot Password?
          </Link>
        </div>

        {/* Submit Button */}
        <Button
          size="large"
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          style={{
            borderRadius: '24px',
            padding: '10px 0',
            fontSize: '16px',
            backgroundColor: '#3f82ef',
            borderColor: '#3f82ef',
          }}
        >
          Login
        </Button>
      </Form>
    </div>
  </section>
  );
};

export default Sigin;