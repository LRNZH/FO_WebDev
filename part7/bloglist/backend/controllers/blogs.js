const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 })

  if (blogs.length === 0) {
    return response.status(404).json({ error: 'blog not found' })
  }

  response.json(blogs)
})

bloglistRouter.post(
  '/',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = request.user

    if (!body.title || !body.url) {
      return response.status(400).json({ error: 'title or url missing' })
    }

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    user.blogsCreated += 1
    await user.save()
    await savedBlog.populate('user', { username: 1, name: 1 })
    response.status(201).json(savedBlog)
  }
)

bloglistRouter.delete(
  '/:id',
  middleware.tokenExtractor,
  middleware.userExtractor,
  async (request, response) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const user = request.user
    const blogToDelete = await Blog.findById(request.params.id)

    if (!blogToDelete) {
      return response.status(404).json({ error: 'blog not found' })
    }

    if (blogToDelete.user.toString() !== user._id.toString()) {
      return response.status(403).json({ error: `Only ${user.name} can delete this blog post` })
    }

    await Blog.findByIdAndDelete(request.params.id)
    user.blogs = user.blogs.filter(
      (blog) => blog.toString() !== request.params.id
    )
    user.blogsCreated -= 1
    await user.save()
    response.status(204).end()
  }
)

bloglistRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    {
      new: true,
    }
  ).populate('user', { username: 1, name: 1 })

  if (!updatedBlog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  response.json(updatedBlog)
})



module.exports = bloglistRouter
