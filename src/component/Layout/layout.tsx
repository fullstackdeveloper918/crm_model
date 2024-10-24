"use client";

import { LogoutOutlined, MailOutlined, BellOutlined } from "@ant-design/icons";
import { Avatar, Grid, Layout, MenuProps, Popconfirm } from "antd";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UsergroupAddOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { clearUserData } from "../../lib/features/userSlice";
import MenuBar from "../common/MenuBar";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { useDispatch, useSelector } from "react-redux";
// import { auth } from "@/utils/firebase";

import api from "@/utils/api";
import Search from "antd/es/input/Search";
const { Button, Dropdown, Tooltip } = {
  Dropdown: dynamic(() => import("antd").then((module) => module.Dropdown), {
    ssr: false,
  }),
  Tooltip: dynamic(() => import("antd").then((module) => module.Tooltip), {
    ssr: false,
  }),
  Button: dynamic(() => import("antd").then((module) => module.Button), {
    ssr: false,
  }),
};

const { Header, Sider, Content } = Layout;

const MainLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const screens = Grid.useBreakpoint();
  const router = useRouter();
  useEffect(() => {
    const scroll = () => {
      const header: any = document.querySelector(".ant-layout-header");
      if (window.scrollY >= 64) {
        header?.classList.add("sticky-top", "z-3", "transition-smooth");
      } else {
        header?.classList.remove("sticky-top", "z-3", "transition-smooth");
      }
    };
    const resize = () => {
      if (window.innerWidth <= 991) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };
    window.addEventListener("scroll", scroll);
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link
          rel="noopener noreferrer"
          className="text-decoration-none fw-semibold"
          href="/profile"
        >
          Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link
          rel="noopener noreferrer"
          className="text-decoration-none fw-semibold"
          href="/profile/password/change"
        >
          Change Password
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <button className="reset-all fw-semibold" type="button">
          Log Out
        </button>
      ),
    },
  ];
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);
  const handleLogout = async () => {
    try {
      setLoading(true);

      router.push("/signin");
    } catch (error) {
      setLoading(false);
    }
  };
  const setCookie = (name: string, value: string, days?: number) => {
    const expires = new Date();
    if (days) {
      expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    }
    document.cookie = `${name}=${value};${
      days ? `expires=${expires.toUTCString()};` : ""
    }path=/`;
  };

  const createSessionCookie = (idToken: string) => {
    try {
      setCookie("COOKIES_USER_ACCESS_TOKEN", idToken, 30); // 30 days
    } catch (error) {}
  };
  const refreshTokenAndSchedule = async (auth: any) => {
    try {
      const check = auth.currentUser;
      if (check) {
        const uid = check.uid;

        const expirationTime = parseInt(
          localStorage.getItem("loginExpiryTime") || "0"
        );
        const currentTime = Date.now();

        if (expirationTime < currentTime) {
          const newIdToken = await check.getIdToken(true);
          const newExpirationTime = Date.now() + 1 * 60 * 1000;
          localStorage.setItem("loginExpiryTime", newExpirationTime.toString());
          createSessionCookie(newIdToken);
          setCookie("expirationTime", newExpirationTime.toString());
          api.setToken(newIdToken);
          // setTimeout(() => refreshTokenAndSchedule(auth), 1 * 60 * 1000);
        }
      }
    } catch (error: any) {}
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Layout className="layout" hasSider>
        {!collapsed && (
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            theme="light"
            width={"250px"}
            breakpoint="lg"
            collapsedWidth="0"
            onBreakpoint={(broken) => {}}
            onCollapse={(collapsed, type) => {}}
            style={{
              overflow: "auto",
              height: screens.lg ? "100vh" : "100%",
              position: "fixed",
              background: "#ffffff",
              left: 0,
              top: 0,
              bottom: 0,
              zIndex: screens.lg ? 1 : 9,
            }}
          >
            <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
          </Sider>
        )}
        <Layout
          className="site-layout"
          style={{
            marginLeft: screens.lg ? (collapsed ? "0px" : "250px") : "0",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {/* Header  */}
          <Header
            className="site-layout-background"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0 24px",
              background: "#fff",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              height: "64px",
            }}
          >
            {/* Menu Icon */}
            {/* <div>
        {React.createElement(collapsed ? CloseOutlined : MenuOutlined, {
          className: 'trigger',
          style: { fontSize: '20px' },
          onClick: () => setCollapsed(!collapsed),
        })}
      </div> */}

            {/* Search Bar */}
            <div
              className="mt-2 "
              style={{ flex: 3, paddingLeft: "20px", marginTop: "30px" }}
            >
              <Search
                placeholder="Search"
                allowClear
                style={{
                  width: "100%",
                  maxWidth: "300px",
                  borderRadius: "20px",
                  // background: '#f5f5f5',
                  padding: "5px 10px",
                  marginTop: "5px",
                }}
              />
            </div>

            {/* Right Icons */}
            <div
              className="d-inline-flex gap-3 align-items-center"
              style={{ display: "flex", alignItems: "center", gap: "16px" }}
            >
              {/* Mail Icon */}
              <Button
                type="text"
                shape="circle"
                icon={<MailOutlined style={{ fontSize: "18px" }} />}
              />

              {/* Notification Icon */}
              <Link href={`/admin/notifications`}>
              <Button
                type="text"
                shape="circle"
                icon={<BellOutlined style={{ fontSize: "18px" }} />}
                />
                </Link>

              {/* User Section */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  borderLeft: "1px solid #f0f0f0",
                  paddingLeft: "16px",
                }}
              >
                <span>Hi, Mike</span>
                <Avatar
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTEg09MmHvC-78aaRxyd52HabsZqI1-u8R6-w&s"
                  alt="User Avatar"
                  style={{ cursor: "pointer" }}
                />
              </div>

              {/* Logout Button */}
              <Popconfirm
                title="Logout"
                onConfirm={handleLogout}
                okText="Logout"
                cancelText="Cancel"
                okButtonProps={{ type: "primary", danger: true }}
              >
                <Button
                  type="primary"
                  shape="circle"
                  icon={<LogoutOutlined />}
                  loading={loading}
                />
              </Popconfirm>
            </div>
          </Header>
          <Content className="m-4">{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default MainLayout;
