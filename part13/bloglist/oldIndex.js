require('dotenv').config();
const express = require('express');
const { Sequelize, DataTypes, Model } = require('sequelize');

const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Add this line if using a self-signed certificate
    },
  },
});

class Blog extends Model {}
Blog.init(
  {
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Blog',
    tableName: 'blogs',
    underscored: true,
    timestamps: false,
  }
);

// GET /api/blogs - List all blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (error) {
    console.error('Error retrieving blogs:', error);
    res.status(500).json({ error: 'Unable to retrieve blogs' });
  }
});

// GET /api/blogs/:id - Get a single blog by ID
app.get('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const blog = await Blog.findByPk(blogId);
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
app.post('/api/blogs', async (req, res) => {
  try {
    const { author, url, title, likes } = req.body;
    const newBlog = await Blog.create({ author, url, title, likes });
    res.status(201).json(newBlog);
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ error: 'Unable to create blog' });
  }
});

// DELETE /api/blogs/:id - Delete a blog
app.delete('/api/blogs/:id', async (req, res) => {
  const blogId = req.params.id;
  try {
    const deletedBlog = await Blog.destroy({ where: { id: blogId } });
    if (deletedBlog === 0) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({ error: 'Unable to delete blog' });
  }
});

// Sync the database and start the server
sequelize.sync().then(() => {
  console.log('Database synced');
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
