import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";
import { List, Empty } from "antd";
import { UserOutlined } from "@ant-design/icons";

const UserBlogs = () => {
  const match = useMatch("/users/:id");
  const userId = match.params.id;
  const blogs = useSelector((state) => state.blogs);
  const users = useSelector((state) => state.users);

  const user = users.find((user) => user.id === userId);

  const userBlogs = blogs.filter((blog) => blog.user.id === userId);
  if (!user) {
    return null;
  }

  return (
    <div>
      <h3>Saved by {user.name}:</h3>
      {userBlogs.length > 0 ? (
        <List
          bordered
          dataSource={userBlogs}
          renderItem={(blog) => (
            <List.Item>
              <List.Item.Meta
                avatar={<UserOutlined />}
                title={blog.title}
                description={`by ${blog.author}`}
              />
            </List.Item>
          )}
        />
      ) : (
        <Empty description="No blogs added yet." />
      )}
    </div>
  );
};

export default UserBlogs;
