import { useState } from 'react'


const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleDetails = () => {
    setShowDetails(!showDetails)
  }

  const updateLikes = () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    console.log ('updated blog', updatedBlog)
    handleLike(updatedBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      handleDelete(blog)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const buttonStyle = {
    marginLeft: 10,
  }

  const detailsStyle = {
    marginTop: 5,
    paddingLeft: 20,
  }

  return (
    <div style={blogStyle} className="blog">
      <div>
    &quot;{blog.title}&quot; by {blog.author}{' '}
        <button id='view-button' style={buttonStyle} onClick={toggleDetails}>
          {showDetails ? 'hide' : 'view'}
        </button>
      </div>
      {showDetails && (
        <div style={detailsStyle}>
          <div>url: {blog.url}</div>
          <div className="likes">
        likes: {blog.likes}{' '}
            <button id='like-button' onClick={updateLikes}>like</button>
          </div>
          {blog.user && <div>Saved by: {blog.user.name}</div>}
          {blog.user && user && blog.user.username === user.username && (
            <button id='remove-button' onClick={removeBlog}>delete</button>
          )}
        </div>
      )}
    </div>
  )
}

export default Blog