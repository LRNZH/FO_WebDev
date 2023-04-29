const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
const Blog = require('../models/blog')


usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password) {
    return response.status(400).json({ error: 'username and password are required' })
  }

  if (body.username.length < 3 || body.password.length < 3) {
    return response.status(400).json({ error: 'username and password must be at least 3 characters long' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(201).json(savedUser.toJSON())

    if (body.blog) {
      const blog = await Blog.findById(body.blog)
      blog.user = savedUser._id
      await blog.save()
      
    }

  } catch (exception) {
    response.status(400).json({ error: exception.message })
  }
})


usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', { title: 1, author: 1 , url: 1 , content: 1 })
  response.json(users)
})


module.exports = usersRouter
