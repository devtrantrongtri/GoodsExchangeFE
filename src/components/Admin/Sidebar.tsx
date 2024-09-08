import {
  FaTachometerAlt,
  FaUsers,
  FaProductHunt,
  FaCogs,
  FaSignOutAlt,
  FaBan,
} from "react-icons/fa";
import { useState } from "react";
import { Layout, Menu, Button, Avatar, Typography, Space } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  DownOutlined,
} from "@ant-design/icons";
import Dashboard from "./Dashboard.tsx";
import User from "./User.tsx";
import Product from "./Product.tsx";

interface MenuItem {
  key: string;
  icon: JSX.Element;
  label: string;
}

const SideBar: React.FC = () => {
  const { Header, Sider, Content } = Layout;
  const { Title } = Typography;

  const [collapse, setCollapse] = useState<boolean>(false);
  const [currentComponent, setCurrentComponent] = useState<string>("dashboard");

  const components: { [key: string]: JSX.Element } = {
    dashboard: <Dashboard />,
    user: <User />,
    product: <Product />,
  };

  const items: MenuItem[] = [
    {
      key: "dashboard",
      icon: <FaTachometerAlt />,
      label: "Dashboard",
    },
    {
      key: "user",
      icon: <FaUsers />,
      label: "User",
    },
    {
      key: "product",
      icon: <FaProductHunt />,
      label: "Product",
    },
    {
      key: "report",
      icon: <FaBan />,
      label: "Report",
    },
    {
      key: "adminstrator",
      icon: <FaCogs />,
      label: "Adminstator",
    },
  ];

  const toggleOpen = () => {
    setCollapse(!collapse);
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        className="bg-[#001529] fixed top-0 left-0 bottom-0 transition-all duration-300"
        collapsed={collapse}
        collapsible
        trigger={null}
        width={200}
        collapsedWidth={80}
      >
        <div className="logo p-4 text-center">
          <div className="logo-icon">
            <img src="" alt="" className="w-[100px]" />
          </div>
        </div>

        <Menu
          defaultSelectedKeys={["dashboard"]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapse}
          items={items}
          onClick={(e) => setCurrentComponent(e.key)}
          className="mt-4"
        ></Menu>

        <div
          className={`absolute bottom-4 left-0 w-full p-4 text-center bg-[#001529] text-white ${
            collapse ? "hidden" : ""
          }`}
        >
          <p>Sign Out</p>
          <FaSignOutAlt />
        </div>
      </Sider>

      <Layout className={`transition-all duration-300 ml-[10px]`}>
        <Header className="gap-5 flex items-center bg-white p-0 text-left z-20 transition-all duration-300">
          <Button
            type="text"
            icon={collapse ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleOpen}
            className="ml-5"
          />

          <Space className="flex justify-between w-full pr-5">
            <Title className="my-5">
              <b className="text-lg">Hello, --username--</b>
              <Title className="text-gray-500">
                <p className="text-sm">Have a good day</p>
              </Title>
            </Title>
            <Space>
              <Avatar icon={<UserOutlined />} />
              <Space size="large">
                <Title>
                  <b className="text-base">--username--</b>
                  <Title className="text-gray-500">
                    <p className="text-xs">Admin</p>
                  </Title>
                </Title>
                <DownOutlined />
              </Space>
            </Space>
          </Space>
        </Header>

        <Content
          className="p-5 overflow-y-auto transition-all duration-300"
          style={{ maxHeight: "calc(100vh - 64px)" }}
        >
          {components[currentComponent]}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SideBar;
