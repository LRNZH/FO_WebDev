const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

const initialUsers = [
  {
    username: 'testuser1',
    name: 'Test User 1',
    passwordHash: bcrypt.hashSync('testpassword', 10),
  },
  {
    username: 'testuser2',
    name: 'Test User 2',
    passwordHash: bcrypt.hashSync('testpassword', 10),
  }
]

const initialBlogs = [
  {
    title: 'Macbeth',
    author: 'William Shakespeare',
    url: 'www.cambridge.com',
    likes: 78,
    user: null // This will be populated later
  },
  {
    title: 'Love is blind',
    author: 'Chimamanda Adichie',
    url: 'www.unn.com',
    likes: 45,
    user: null // This will be populated later
  }
]

const populateDatabase = async () => {
  await User.deleteMany({})
  await Blog.deleteMany({})

  const users = await Promise.all(initialUsers.map(async (user) => {
    const newUser = new User(user)
    return await newUser.save()
  }))

  const blogs = await Promise.all(initialBlogs.map(async (blog) => {
    const user = users[0] // Assign blog to the first user in the list
    blog.user = user._id
    const newBlog = new Blog(blog)
    return await newBlog.save()
  }))

  users.forEach((user) => {
    user.blogs = blogs.map((blog) => blog._id)
    user.save()
  })
}

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
  return users
}


module.exports = {
  initialUsers, initialBlogs, populateDatabase, nonExistingId, blogsInDb, usersInDb,
}