const express = require('express');
const router = express.Router();

const { tokenExtractor } = require("../util/middleware");
const { models } = require('../models');
const { Op } = require('sequelize')

const User = models.User;
const Blog = models.Blog;

// GET /api/blogs - List all blogs
router.get('/', async (req, res) => {
  const { search } = req.query;
  try {
    let blogs;
    if (search) {
      blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
          model: User,
          attributes: ['name'],
        },
        where: {
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${search}%`,
              },
            },
            {
              author: {
                [Op.iLike]: `%${search}%`,
              },
            },
          ],
        },
        order: [['likes', 'DESC']], 
      });
    } else {
      blogs = await Blog.findAll({
        attributes: { exclude: ['UserId'] },
        include: {
          model: User,
          attributes: ['name'],
        },
        order: [['likes', 'DESC']],
      });
    }

    res.json(blogs);
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ error: 'Unable to retrieve blogs' });
  }
});



// GET /api/blogs/:id - Get a single blog by ID
router.get('/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByPk(blogId, {
      attributes: { exclude: ['UserId'] },
      include: {
        model: User,
        attributes: ['name']
    }
    });
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error('Error retrieving blog:', error);
    res.status(500).json({ error: 'Unable to retrieve blog' });
  }
});


// POST /api/blogs - Add a new blog
router.post('/', tokenExtractor, async (req, res) => {
  try {
    const user = await User.findByPk(req.decodedToken.id)
    const blog = await Blog.create({...req.body, userId: user.id, date: new Date()})
    await user.addBlog(blog);
    res.status(201).json(blog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Unable to create blog' });
  }
});

// PUT /api/blogs/:id - Modify the like count of a blog
router.put('/:id', async (req, res) => {
  const blogId = req.params.id;
  const { likes } = req.body;
  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    blog.likes = likes;
    await blog.save();
    res.json(blog);
  } catch (error) {
    console.error('Error modifying blog:', error);
    res.status(500).json({ error: 'Unable to modify blog' });
  }
});

// DELETE /api/blogs/:id - Delete a blog
router.delete('/:id', tokenExtractor, async (req, res) => {
  const blogId = req.params.id;
  const userId = req.decodedToken.id; // Get the user ID from the decoded token

  try {
    const blog = await Blog.findByPk(blogId);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }

    if (blog.userId !== userId) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    await blog.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Unable to delete blog' });
  }
});


module.exports = router;
