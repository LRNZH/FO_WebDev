const express = require('express');
const jwt = require('jsonwebtoken')
const { models } = require('../models');

const router = express.Router();
const User = models.User;
const { SECRET } = require('../util/config')


router.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ 
    where: { 
      username: body.username
    }
  })
  
// Generic password for all users
  const passwordCorrect = body.password === 'secret'

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username, 
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router 