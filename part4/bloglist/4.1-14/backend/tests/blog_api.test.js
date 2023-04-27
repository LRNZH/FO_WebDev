const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('../utils/api_test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain(
    'Macbeth'
  )
})

test('unique identifier property is named id', async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body
  contents.forEach((post) => {
    expect(post.id).toBeDefined()
    expect(post._id).toBeUndefined()
  })
})

test('succeeds with valid data', async () => {
  const oldResponse = await api.get('/api/blogs')
  const existing=oldResponse.body
  const newBlog = {
    title: 'New blog post',
    author: 'John Doe',
    url: 'http://example.com',
    likes: 5
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)
  expect(response.body).toHaveLength(existing.length+1)
  expect(titles).toContain('New blog post')
})

test('likes default to 0 if missing', async () => {
  const newBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'https://testblog.com',
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBe(0)
})

test('returns 400 Bad Request if title is missing', async () => {
  const newBlog = {
    author: 'Adam Smith',
    url: 'https://adamsmith.com',
    likes: 10
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

test('returns 400 Bad Request if url is missing', async () => {
  const newBlog = {
    title: 'My new blog post',
    author: 'Adam Smith',
    likes: 10
  }
  await api.post('/api/blogs').send(newBlog).expect(400)
})

afterAll(async () => {
  await mongoose.connection.close()
})