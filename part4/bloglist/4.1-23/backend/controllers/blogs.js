const bloglistRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

bloglistRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

bloglistRouter.post('/', async (request, response) => {
  const body = request.body
  const user = await User.findById(body.userId)

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

bloglistRouter.delete('/:id', async (request, response) => {
  const { id } = request.params

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id)
    if (!deletedBlog) {
      return response.status(404).json({ error: 'Blog post not found' })
    }
    response.status(204).end()
  } catch (error) {
    response.status(400).send({ error: 'malformatted id' })
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