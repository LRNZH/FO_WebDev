import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button, Space, Popconfirm } from "antd";
import {
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  LikeOutlined,
} from "@ant-design/icons";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const updateLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    handleLike(updatedBlog);
  };

  const removeBlog = () => {
    handleDelete(blog);
  };

  const blogCardStyle = {
    marginBottom: 16,
    border: "1px solid #d9d9d9",
    borderRadius: 4,
    backgroundColor: "#e3f0fe",
  };

  const cardActions = [
    <Space key="actions">
      <Button onClick={toggleDetails}>
        {showDetails ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </Button>
      {blog.user && blog.user.name === user.name && (
        <Popconfirm
          title={`Are you sure you want to delete "${blog.title}"?`}
          onConfirm={removeBlog}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" icon={<DeleteOutlined />} danger />
        </Popconfirm>
      )}
    </Space>,
  ];

  return (
    <Card
      title={
        <Link
          to={`/users/${blog.user.id}`}
        >{`"${blog.title}" by ${blog.author}`}</Link>
      }
      actions={cardActions}
      style={blogCardStyle}
    >
      {showDetails && (
        <>
          <p>{blog.url}</p>
          <Space>
            <Button type="text" onClick={updateLikes} icon={<LikeOutlined />} />
            <span>{blog.likes} likes</span>
          </Space>
          {blog.user && (
            <div>
              Saved by:{" "}
              <Link to={`/users/${blog.user.id}`}>{blog.user.name}</Link>
            </div>
          )}
        </>
      )}
    </Card>
  );
};

export default Blog;
