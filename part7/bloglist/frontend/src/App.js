import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import Users from "./components/Users";
import blogService from "./services/blogs";
import { initializeUsers } from "./reducers/userReducer";
import loginService from "./services/login";
import { useDispatch, useSelector } from "react-redux";
import {
  setNotification,
  removeNotification,
} from "./reducers/notificationReducer";
import {
  initializeBlogs,
  addBlog,
  updateBlog,
  deleteBlog,
  addComment,
} from "./reducers/blogReducer";
import {
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import UserBlogs from "./components/UserBlogs";
import BlogDetails from "./components/BlogDetails";
import Navigation from "./components/Navigation";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
      dispatch(initializeBlogs())
}, []);


  useEffect(() => {
    dispatch(initializeUsers());
  }, [dispatch]);

  const handleLogin = async (event) => {


    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      dispatch(setNotification(`Logged in as ${user.name}`));
      navigate("/");
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (exception) {
      dispatch(setNotification("Wrong username or password"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    dispatch(setNotification(`${user ? user.name : "User"} logged out`));
    setUser(null);
    setUsername("");
    setPassword("");
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };

  const createBlog = async (blog) => {
    try {
      await dispatch(addBlog(blog));
      await dispatch(initializeUsers());
      dispatch(
        setNotification(`A new blog ${blog.title} by ${blog.author} added`)
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      dispatch(setNotification("Blog not saved, fix entry error(s)"));
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    }
  };

  const handleDelete = async (blog) => {
    try {
      await dispatch(deleteBlog(blog));
      await dispatch(initializeUsers());
      dispatch(
        setNotification(`"${blog.title}" by ${blog.author} has been deleted`)
      );
      setTimeout(() => {
        dispatch(removeNotification());
      }, 5000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async (updatedBlog) => {
    try {
      dispatch(updateBlog(updatedBlog));
      await dispatch(initializeBlogs(updatedBlog));
    } catch (error) {
      console.log(error);
    }
  };

  const submitComment = async (event, blog, comment) => {
    event.preventDefault();
    await dispatch(addComment(blog.id, comment));
    await dispatch(initializeBlogs(blog));
    await setComment("");
    dispatch(setNotification("Comment added"));
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);

  };

  const loginForm = () => (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  );

  const sortedBlogs =
    blogs && blogs.length > 0 ? blogs.sort((a, b) => b.likes - a.likes) : [];

  return (
    <div>
      {user && <Navigation />}
      <p>
        {user && user.name} logged in{" "}
        <button id="logout-button" onClick={handleLogout}>
          logout
        </button>
      </p>
      <h1>Blogs app</h1>
      {notification && <Notification message={notification} />}
      {!user && loginForm()}
      {user && (
        <div>
          <Togglable buttonLabel="Add New Blog" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}
      <div id="card-container">
        <Routes>
          <Route
            path="/"
            element={
              user && blogs && blogs.length > 0 ? (
                sortedBlogs.map((blog) => (
                  <Blog
                    key={blog.id}
                    id="blog"
                    blog={blog}
                    handleLike={handleLike}
                    handleDelete={handleDelete}
                    user={user}
                  />
                ))
              ) : (
                <React.Fragment>
                  <p>No blogs available.</p>
                </React.Fragment>
              )
            }
          />
          <Route path="/users" element={user && <Users />} />
          <Route path="/users/:id" element={user && <UserBlogs />} />
          <Route
            path="/blogs/:id"
            element={
              user && (
                <BlogDetails
                  handleLike={handleLike}
                  submitComment={submitComment}
                />
              )
            }
          />
        </Routes>
      </div>
    </div>
  );
};
export default App;