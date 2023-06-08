import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const Login = (props) => {
  const onFinish = (values) => {
    props.handleLogin(values);
  };

  return (
    <Form
      name="login-form"
      onFinish={onFinish}
      layout="vertical"
      style={{ maxWidth: 400, margin: "auto" }}
    >
      <Form.Item
        label="Username"
        name="username"
        id="username-input"
        rules={[{ required: true, message: "Please enter your username!" }]}
      >
        <Input
          prefix={<UserOutlined />}
          placeholder="Enter your username"
          value={props.username}
          onChange={({ target }) => props.setUsername(target.value)}
        />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        id="password-input"
        rules={[{ required: true, message: "Please enter your password!" }]}
      >
        <Input.Password
          prefix={<LockOutlined />}
          placeholder="Enter your password"
          value={props.password}
          onChange={({ target }) => props.setPassword(target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          id="login-button"
          style={{ backgroundColor: "#1890ff", borderColor: "#1890ff" }}
        >
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
