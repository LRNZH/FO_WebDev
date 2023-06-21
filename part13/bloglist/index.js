const express = require('express');
//const cors = require('cors');
const sequelize = require('./util/db');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const authorRouter = require('./controllers/authors')
const readingListRouter = require('./controllers/readingLists');
const config = require('./util/config');

const app = express();
const PORT = config.PORT;

//app.use(cors());
app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/authors', authorRouter)
app.use('/api/readinglist', readingListRouter);

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Error:', error.message);
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: 'Validation error' });
  }
  res.status(500).json({ error: 'Internal server error' });
});

// Initialize the database and start the server
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected');
    await sequelize.sync({ alter: true }); // Synchronize the models with the database
    console.log("Database synchronized");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to the database:', error);
  }
})();


