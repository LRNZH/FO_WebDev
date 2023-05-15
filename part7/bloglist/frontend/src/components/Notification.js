import React from "react";
import { Alert } from "antd";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return (
    <Alert
      message={message}
      type="error"
      showIcon
      style={{ backgroundColor: "#ffccc7", color: "#8c2f39", marginBottom: 16 }}
    />
  );
};

export default Notification;
