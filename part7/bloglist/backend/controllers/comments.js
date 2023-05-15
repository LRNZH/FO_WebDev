const commentRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

commentRouter.post(
  '/:id/comments',
  middleware.tokenExtractor,
  async (request, response) => {
    const body = request.body
    console.log('comment router received comment:', body)
    const decodedToken = jwt.verify(request.token, process.env.SECRET)

    if (!decodedToken.id) {
      return response.status(401).json({ error: 'token invalid' })
    }

    const blog = await Blog.findById(body.blogId)

    if (!blog) {
      return response.status(404).json({ error: 'blog not found' })
    }

    const comment = new Comment({
      content: body.content,
      blog: blog._id,
    })

    const savedComment = await comment.save()
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()

    console.log('comment router saved comment:', savedComment)

    response.status(201).json(savedComment)
  }
)

module.exports = commentRouter
