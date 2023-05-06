import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Login from './components/Login'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setSuccessMessage(`Logged in as ${user.name}`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBloglistUser')
    setUser(null)
    setSuccessMessage('Logged out')
    setTimeout(() => {
      setSuccessMessage(null)
    }, 5000)
  }


  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject)
      setBlogs((prevBlogs) => [...prevBlogs, newBlog])
      setSuccessMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      setErrorMessage('Blog not saved, fix entry error(s)')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLike = async (updatedBlog) => {
    console.log ('handleLike sent', updatedBlog)
    try {
      const latestBlog = await blogService.update(updatedBlog.id, updatedBlog)
      console.log('handleLike received', latestBlog)
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) => (blog.id === latestBlog.id ? latestBlog : blog))
      )
    } catch (error) {
      console.log(error)
    }
  }

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog.id)
      const updatedBlogs = blogs.filter((b) => b.id !== blog.id)
      setBlogs(updatedBlogs)
      setSuccessMessage(`"${blog.title}" by ${blog.author} has been deleted`)
      setTimeout(() => {
        setSuccessMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error)
    }
  }


  const loginForm = () => (
    <Login
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
      handleLogin={handleLogin}
    />
  )

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)

  return (
    <div>
      <h1>Blogs app</h1>
      <Notification message={errorMessage} type="error" />
      <Notification message={successMessage} type="success" />

      {!user && loginForm()}
      {user && (
        <div>
          <p>
            {user.name} logged in <button id='logout-button' onClick={handleLogout}>logout</button>
          </p>
          <Togglable buttonLabel="create new blog entry" ref={blogFormRef}>
            <BlogForm createBlog={createBlog} />
          </Togglable>
        </div>
      )}

      <h2>blogs</h2>
      {user && (
        <div>
          {sortedBlogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App