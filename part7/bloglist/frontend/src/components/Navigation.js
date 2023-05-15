import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const Navigation = () => {
  return (
    <Menu mode="horizontal">
      <Menu.Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Blogs</Link>
      </Menu.Item>
      <Menu.Item key="users" icon={<UserOutlined />}>
        <Link to="/users">Users</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
