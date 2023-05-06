import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const addBlog = async (event) => {
    event.preventDefault()
    await createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: parseInt(newLikes || 0),
    })

  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
    const urlRegex =
      // eslint-disable-next-line no-useless-escape
      /^[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if (
      event.target.value.trim().length > 4 &&
      event.key !== 'Backspace' &&
      event.target.value.match(urlRegex)
    ) {
      setNewUrl(event.target.value)
      setErrorMessage(null)
    } else if (event.target.value.trim().length > 3 && event.key !== 'Backspace') {
      setErrorMessage('Enter valid url starting with www')
    } else {
      setErrorMessage(null)
    }
  }

  const handleLikesChange = (event) => {
    setNewLikes(event.target.value)
  }

  return (
    <form onSubmit={addBlog} role="form">
      <h3>Add new blog</h3>
      <div>
        <label htmlFor="title-input">Title</label>
        <input id="title-input" type="text" value={newTitle} onChange={handleTitleChange} />
      </div>
      <div>
        <label htmlFor="author-input">Author</label>
        <input id="author-input" type="text" value={newAuthor} onChange={handleAuthorChange} />
      </div>
      <div>
        <label htmlFor="url-input">Blog url</label>
        <input
          id="url-input"
          onKeyUp={handleUrlChange}
          type="text"
          placeholder="www.example.com"
          value={url}
          onChange={handleUrlChange}
        />
      </div>
      <div>
        <label htmlFor="likes-input">Likes</label>
        <input
          id="likes-input"
          type="number"
          placeholder="0 (default)"
          value={newLikes}
          onChange={handleLikesChange}
        />
      </div>
      <button id='create-button' type="submit">create</button>
      {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
    </form>

  )}
export default BlogForm