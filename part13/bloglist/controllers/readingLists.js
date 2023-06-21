// controllers/readingList.js
const express = require("express");
const { models } = require("../models");
const { tokenExtractor } = require("../util/middleware");

const router = express.Router();
const User = models.User;
const Blog = models.Blog;
const ReadingList = models.ReadingList;

// POST /api/readinglist - Add a blog to the reading list
router.post("/", async (req, res) => {
  try {
    const { userId, blogId } = req.body;
    await ReadingList.create({ userId, blogId, unread: true });
    res.status(201).json({ message: "Blog added to reading list" });
  } catch (error) {
    console.error("Error adding blog to reading list:", error);
    res.status(500).json({ error: "Unable to add blog to reading list" });
  }
});

// PUT /api/readinglist/:id - Mark a blog as read
router.put("/:id", tokenExtractor, async (req, res) => {
  const readingListId = req.params.id;
  try {
    const readingList = await ReadingList.findOne({
      where: { id: readingListId },
      include: [{ model: User }, { model: Blog }],
    });
    if (!readingList) {
      return res.status(404).json({ error: "Reading list item not found" });
    }
    // Check if the blog belongs to the authenticated user
    if (readingList.User.id !== (await User.findByPk(req.decodedToken.id))) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    readingList.unread = false;
    await readingList.save();
    res.json({ message: "Blog marked as read" });
  } catch (error) {
    console.error("Error marking blog as read:", error);
    res.status(500).json({ error: "Unable to mark blog as read" });
  }
});

// GET /api/readinglist/:userId - Get the user's reading list
router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findByPk(userId, {
      include: {
        model: Blog,
        through: { attributes: ["unread"] },
      },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error retrieving user reading list:", error);
    res.status(500).json({ error: "Unable to retrieve user reading list" });
  }
});

module.exports = router;
