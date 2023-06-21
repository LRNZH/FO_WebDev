const express = require("express");
const { models } = require("../models");

const router = express.Router();
const User = models.User;
const Blog = models.Blog;

// GET /api/users - List all users
router.get("/", async (req, res) => {
  try {
    const users = await User.findAll({
      include: {
        model: Blog,
        attributes: { exclude: ["UserId"] },
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Unable to retrieve users" });
  }
});

// GET /api/users/:id - List specific user
router.get('/:id', async (req, res) => {
  const { read } = req.query;
  const user = await User.findByPk(req.params.id, {
    include: {
      model: Blog,
      attributes: { exclude: ['UserId'] },
      through: { attributes: [] }, // Exclude join table attributes
      where: read === 'true' ? { '$ReadingList.unread$': false } : (read === 'false' ? { '$ReadingList.unread$': true } : {})
    }
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});


// POST /api/users - Add a new user
router.post("/", async (req, res) => {
  try {
    const { name, username } = req.body;
    const newUser = await User.create({ name, username });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    if (error.name === "SequelizeValidationError") {
      const errorMessages = error.errors.map((err) => err.message);
      return res.status(400).json({ error: errorMessages });
    }
    res.status(500).json({ error: "Unable to create user" });
  }
});

// PUT /api/users/:username - Change a username
router.put("/:username", async (req, res) => {
  const { username } = req.params;
  const { newUsername } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.username = newUsername;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error("Error changing username:", error);
    res.status(500).json({ error: "Unable to change username" });
  }
});

module.exports = router;
