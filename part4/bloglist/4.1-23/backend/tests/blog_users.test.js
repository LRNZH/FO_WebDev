const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcryptjs')
const app = require('../app')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
}, 100000)

describe('creating a new user', () => {
  test('succeeds with valid data', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    expect(users).toHaveLength(1)

    const savedUser = users[0]
    expect(savedUser.username).toEqual(newUser.username)

    const passwordMatch = await bcrypt.compare(newUser.password, savedUser.passwordHash)
    expect(passwordMatch).toBe(true)
  })

  test('fails with status code 400 if username or password is missing', async () => {
    const newUser = {
      name: 'Test User',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    expect(users).toHaveLength(0)
  })

  test('fails with status code 400 if username or password is less than 3 characters', async () => {
    const newUser = {
      username: 'te',
      name: 'Test User',
      password: 'tp'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    expect(users).toHaveLength(0)
  })

  test('fails with status code 400 if username is not unique', async () => {
    const newUser = {
      username: 'testuser',
      name: 'Test User',
      password: 'testpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)

    const newUser2 = {
      username: 'testuser',
      name: 'Test User 2',
      password: 'testpassword2'
    }

    await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const users = await User.find({})
    expect(users).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
