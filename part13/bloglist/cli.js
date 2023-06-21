require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Add this line if using a self-signed certificate
    },
  },
});

// Define the Blog model
const Blog = sequelize.define('Blog', {
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
}, {
  tableName: 'blogs', // Add this line to specify the table name
});

// Function to print blogs
const printBlogs = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Fetch blogs from the database
    const blogs = await Blog.findAll({
      attributes: ['id', 'author', 'url', 'title', 'likes', 'createdat', 'updatedat'], // Update column names here
    });

    // Print each blog
    blogs.forEach((blog) => {
      console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
    });

    sequelize.close();
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

printBlogs();
