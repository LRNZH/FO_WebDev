const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Macbeth',
    author: 'William Shakespeare',
    url: 'www.cambridge.com',
    likes: 78
  },
  {
    title: 'Love is blind',
    author: 'Chimamanda Adichie',
    url: 'www.unn.com',
    likes: 45
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon',
    url: 'www.deletesoon.com' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}


module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}