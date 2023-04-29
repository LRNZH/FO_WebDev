const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')


bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

bloglistRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = request.user

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

bloglistRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

bloglistRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const { id } = request.params
  const user = request.user

  if (!request.token) {
    return response.status(401).json({ error: 'Token missing' })
  }

  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  try {
    const blog = await Blog.findById(id)

    if (!blog) {
      return response.status(404).json({ error: 'Blog post not found' })
    }

    if (blog.user.toString() !== decodedToken.id.toString()) {
      return response.status(403).json({ error: `Only ${request.user.name} can delete this blog post` })
    }

    await Blog.findByIdAndDelete(id)

    response.status(200).json({
      message: `${user.name} has deleted blog with title: ${blog.title} & id: ${ id }`
    })
  } catch (error) {
    response.status(400).send({ error: 'Bad request' })
  }
})



bloglistRouter.put('/:id', async (request, response) => {
  const body = request.body

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes }, { new: true })
    if (!updatedBlog) {
      return response.status(404).json({ error: 'Blog post not found' })}
    {response.json(updatedBlog.toJSON())}
  }
  catch (error) {
    response.status(400).json({ error: 'Could not update blog.' })
  }
})

module.exports = bloglistRouter