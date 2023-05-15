import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        "{blog.title}" by {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes: <button onClick={updateLikes}>like</button>
      </div>
      <div>added by {blog.user.name}</div>
      <h3>Comments</h3>
      <ul>
        {blog.comments.map(
          (comment) =>
            comment.content && <li key={comment._id}>{comment.content}</li>
        )}
      </ul>
      <form onSubmit={(event) => submitComment(event, blog, comment)}>
        <input type="text" value={comment} onChange={handleCommentChange} />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default BlogDetails;
