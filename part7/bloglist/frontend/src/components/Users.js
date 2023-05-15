import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Table } from "antd";

const Users = () => {
  const users = useSelector((state) => state.users);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <Link to={`/users/${record.id}`}>{record.name}</Link>
      ),
    },
    {
      title: "Blogs created",
      dataIndex: "blogsCreated",
      key: "blogsCreated",
    },
  ];

  return (
    <div>
      <h3>Users</h3>
      <Table
        columns={columns}
        dataSource={users}
        pagination={false}
        size="small"
        responsive={true}
      />
    </div>
  );
};

export default Users;
