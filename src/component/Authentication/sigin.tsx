"use client";
import React, { useState } from 'react';
import { Row, Col, Form, Input, Button } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import api from '@/utils/api';
import { toast } from 'react-toastify';
import { setCookie } from 'nookies';
const Sigin = () => {
  const setCookie = (name: string, value: string, days: number) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  const createSessionCookie = (idToken: string) => {
    try {
      setCookie("COOKIES_USER_ACCESS_TOKEN", idToken, 30); // 30 days
    } catch (error) {
    }
  };

  const [loading, setLoading] = useState(false);
const router= useRouter()
  const onFinish = async(values: any) => {
    console.log('Received values:', values);
  try {
    let item={
      email:values?.email,
      password:values?.password
    } as any
    setLoading(true)
    const res = await api.Auth.login(item)
    toast.success(res?.message)
    console.log(res,"ressss"); 
    setLoading(true);
    // setCookie("Token", JSON.stringify(res?.token), 30);
    createSessionCookie(res?.token);
    api.setToken(res?.token)
    router.push("admin/pearls")
  } catch (error) {
    setLoading(false)
    console.log();
    
  }finally{
    
  }
  };

  // const onFinish = (values: any) => {
  //   console.log('Received values:', values);
  //   let item={
  //     email:values?.email,
  //     password:values?.password
  //   } as any
  //   const res =  axios.post('http://localhost:3001/login', {item})
  //   .then(function (response) {
  //     console.log(response,'jldsjflgsjdflgjsldfg');
  //   });
  //   console.log(res,"ressss"); 
  //   setLoading(true);
  //   router.push("admin/pearls")
  // };
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
          <Link href="#" style={{ color: '#a0a0a0' }}>
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