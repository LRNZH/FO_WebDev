import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography, Button, Input, List, Form, Spin } from "antd";
import { LikeOutlined, LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { TextArea } = Input;

const BlogDetails = ({ handleLike, submitComment }) => {
  const { id } = useParams();
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((blog) => blog.id === id);
  const [comment, setComment] = useState("");

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const updateLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 };
    handleLike(updatedBlog);
  };

  if (!blog) {
    return <Spin indicator={<LoadingOutlined />} />;
  }

  return (
    <div>
      <Title level={2}>
        "{blog.title}" by {blog.author}
      </Title>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes:{" "}
        <Button type="text" onClick={updateLikes} icon={<LikeOutlined />} />
      </div>
      <div>Added by {blog.user.name}</div>
      <Title level={3}>Comments</Title>
      <List
        dataSource={blog.comments}
        renderItem={(item) => <List.Item>{item.content}</List.Item>}
      />
      <Form onFinish={(event) => submitComment(event, blog, comment)}>
        <Form.Item>
          <TextArea
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            placeholder="Add a comment"
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Comment
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogDetails;
