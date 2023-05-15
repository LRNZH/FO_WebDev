import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_BLOGS":
      return action.data;
    case "CREATE_BLOG":
      return [...state, action.data];
      case "UPDATE_BLOG":
      return state.map((blog) =>
        blog.id === action.data.id ? action.data : blog
      );
    case "REMOVE_BLOG":
      return state.filter((blog) => blog.id !== action.data.id);
    default:
      return state;
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INIT_BLOGS",
      data: blogs,
    });
  };
};

export const addBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch({
        type: "CREATE_BLOG",
        data: newBlog,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateBlog = (updatedBlog) => {
  return async (dispatch) => {
    try {
      const latestBlog = await blogService.update(updatedBlog.id, updatedBlog);
      dispatch({
        type: "UPDATE_BLOG",
        data: latestBlog, 
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    try {
      await blogService.remove(blog.id);
      dispatch({
        type: "REMOVE_BLOG",
        data: blog,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addComment = (blogId, content) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.createComment(blogId, content);
      dispatch({
        type: "UPDATE_BLOG",
        data: updatedBlog,
      });
    } catch (error) {
      console.error(error);
    }
  };
};

export default blogReducer;
