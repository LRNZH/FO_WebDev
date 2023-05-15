import { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Input, Button, notification } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import {
  setNotification,
  removeNotification,
} from "../reducers/notificationReducer";

const BlogForm = ({ createBlog }) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    const { title, author, url, likes } = values;
    try {
      await createBlog({
        title,
        author,
        url,
        likes: parseInt(likes || 0),
      });

      dispatch(setNotification(`A new blog ${title} by ${author} added`));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);

      form.resetFields();
    } catch (error) {
      dispatch(setNotification("Blog not saved, fix entry error(s)"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const handleUrlChange = (event) => {
    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (
      event.target.value.trim().length > 4 &&
      event.key !== "Backspace" &&
      event.target.value.match(urlRegex)
    ) {
      form.setFieldsValue({ url: event.target.value });
    } else if (
      event.target.value.trim().length > 3 &&
      event.key !== "Backspace"
    ) {
      notification.warning({
        message: "Enter valid url starting with www",
        duration: 3,
      });
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <h3>Add new blog</h3>
      <Form.Item
        name="title"
        label="Title"
        rules={[{ required: true, message: "Please enter title" }]}
      >
        <Input placeholder="Title" />
      </Form.Item>
      <Form.Item
        name="author"
        label="Author"
        rules={[{ required: true, message: "Please enter author" }]}
      >
        <Input placeholder="Author" />
      </Form.Item>
      <Form.Item
        name="url"
        label="Blog url"
        rules={[
          { required: true, message: "Please enter blog url" },
          {
            pattern:
              /^((http|https):\/\/)?(www.)?[a-z0-9]+\.[a-z]{2,}(\.[a-z]{2,})?$/i,
            message: "Please enter a valid url",
          },
        ]}
      >
        <Input placeholder="www.example.com" onKeyUp={handleUrlChange} />
      </Form.Item>
      <Form.Item name="likes" label="Likes">
        <Input type="number" placeholder="0 (default)" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" icon={<PlusOutlined />}>
          Create
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BlogForm;
