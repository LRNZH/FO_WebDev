const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const helper = require('../utils/test_helper')
const app = require('../app')
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)

const request = {
  get: () => 'Bearer secret-token'
}

const response = {}

const next = jest.fn()

describe('router login', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('testpassword', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()
  }, 100000)

  test('extracts token from Authorization header and assigns it to request.token', () => {
    middleware.tokenExtractor(request, response, next)
    expect(request.token).toBe('secret-token')
    expect(next).toHaveBeenCalledTimes(1)
  })

  test('login succeeds with valid credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'testpassword' })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toBe('testuser')
    expect(response.body.name).toBeUndefined()
  })

  test('login fails with invalid credentials', async () => {
    const response = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'wrongpassword' })
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeUndefined()
    expect(response.body.username).toBeUndefined()
    expect(response.body.name).toBeUndefined()
    expect(response.body.error).toBeDefined()
  })
})

describe('Blog API token tests', () => {
  let token

  beforeAll(async () => {
    // Register a user and get a token
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('password', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()

    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'password' })

    token = loginResponse.body.token
  }, 100000)

  beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  }, 100000)

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'New Blog',
      author: 'New Author',
      url: 'http://new-blog.com',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const titles = response.body.map(blog => blog.title)

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('New Blog')
  })
})


describe('deletion of a blog', () => {
  let token, userId

  beforeAll(async () => {
    await User.deleteMany({})

    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    }

    const userResponse = await api.post('/api/users').send(newUser)

    userId = userResponse.body.id

    const loginResponse = await api.post('/api/login').send({
      username: newUser.username,
      password: newUser.password
    })

    token = loginResponse.body.token
  }, 100000)

  beforeEach(async () => {
    await Blog.deleteMany({})

    const newBlog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      url: 'http://test.com',
      likes: 10,
      user: userId
    })

    await newBlog.save()
  })

  test('succeeds with status code 204 if id is valid and token is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).not.toContain(blogToDelete.title)
  })

  test('fails with status code 401 if token is not provided', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(blogToDelete.title)
  })

  test('fails with status code 401 if token is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', 'bearer invalidtoken')
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(r => r.title)

    expect(titles).toContain(blogToDelete.title)
  })

  test('fails with status code 403 if token is valid but user is not the creator of the blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    // Create a new user
    const newUser = {
      username: 'testuser2',
      name: 'Test User 2',
      password: 'testpassword'
    }

    await api.post('/api/users').send(newUser)

    const loginResponse = await api.post('/api/login').send({
      username: newUser.username,
      password: newUser.password
    })

    const token = loginResponse.body.token

    const response = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(403)

    expect(response.body.error).toContain(`Only ${newUser.name} can delete this blog post`)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
  })
})

describe('getting user information during blog post or delete', () => {
  beforeAll(async () => {
    await User.deleteMany({})
  }, 100000)
  beforeAll(async () => {
    await Blog.deleteMany({})
  })

  test('succeeds with valid token and user info is provided on post', async () => {

    const newUser = {
      username: 'crazyuser',
      name: 'Crazy User',
      password: 'crazypassword'
    }

    await api.post('/api/users').send(newUser)

    const loginResponse = await api.post('/api/login').send({
      username: newUser.username,
      password: newUser.password
    })

    const token = loginResponse.body.token

    const blogsAtStart = await helper.blogsInDb()

    const newBlog = {
      title: 'Crazy Blog',
      author: 'Crazy Author',
      url: 'https://crazyblog.com',
      likes: 10
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1)
    const usersAtEnd = await helper.usersInDb()
    const addedBlog = blogsAtEnd.find(blog => blog.title === newBlog.title)
    const addedUser = usersAtEnd.find(user => user.username === newUser.username)
    expect(addedBlog).toBeDefined()
    expect(addedBlog.user).toEqual(addedUser._id)
  }, 100000)

  test('succeeds with valid id and token on deletion', async () => {

    await helper.populateDatabase()

    const newBlog = {
      title: 'Useless Blog',
      author: 'Useless Author',
      url: 'https://uselessurl.com',
      likes: 5
    }

    const newUser = {
      username: 'uselessuser',
      name: 'Useless User',
      password: 'uselesspassword'
    }

    await api.post('/api/users').send(newUser)

    const usersAtEnd = await helper.usersInDb()
    const addedUser = usersAtEnd.find(user => user.username === newUser.username)
    newUser.id = addedUser._id
    newBlog.user = addedUser._id

    const loginResponse = await api.post('/api/login').send({
      username: newUser.username,
      password: newUser.password
    })

    const token = loginResponse.body.token

    const blog = await Blog(newBlog).save()

    await api
      .delete(`/api/blogs/${blog._id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)


    const updatedUser = await User.findById(newUser.id)
    expect(updatedUser.blogs).not.toContain(blog._id)
  }, 100000)
})
