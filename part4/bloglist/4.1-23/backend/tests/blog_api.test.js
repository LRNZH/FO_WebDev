const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

describe('when there is initially some notes saved', () => {

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
})


/*describe('Successfully create a new blog post pre user/authentication', () => {
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
  },100000)

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
  }, 100000)

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
})*/

/*describe('deleting a single blog pre user/authentication', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const existingBlogs = await helper.blogsInDb()
    const blogToDelete = existingBlogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(existingBlogs.length - 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  },100000)

  test('fails with status code 404 if blog does not exist', async () => {
    const validNonexistingId = await helper.nonExistingId()

    await api
      .delete(`/api/blogs/${validNonexistingId}`)
      .expect(404)
  },100000)

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = '5a3d5da59070081a82a3445'

    await api
      .delete(`/api/blogs/${invalidId}`)
      .expect(400)
  },100000)
})*/

describe('updating a blog post', () => {
  test('updates with valid data', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog  = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes + 1)
  }, 100000)

  test('fails with status code 400 if data is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = { ...blogToUpdate, likes: 'invalid likes value' }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)
    expect(blogsAtEnd[0].likes).toBe(blogToUpdate.likes)
  })

  test('fails with status code 404 if blog post is not found', async () => {
    const validNonExistingId = await helper.nonExistingId()
    await api
      .put(`/api/blogs/${validNonExistingId}`)
      .send({ title: 'new title', url: 'new url', likes: 0 })
      .expect(404)
  }, 100000)

  test('fails with status code 400 if id is invalid', async () => {
    const invalidId = 'invalid id'
    await api
      .put(`/api/blogs/${invalidId}`)
      .send({ title: 'new title', url: 'new url', likes: 0 })
      .expect(400)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})