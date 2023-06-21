const express = require("express");
const { models, sequelize } = require("../models");

const router = express.Router();
const Blog = models.Blog;
const User = models.User;

router.get("/", async (req, res) => {
  try {
    const authors = await Blog.findAll({
      attributes: [
        "author", // Retrieve the 'author' field as the author name
        [sequelize.fn("COUNT", sequelize.col("id")), "articles"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: ["author"],
      order: [[sequelize.literal("likes"), "DESC"]],
    });

    res.json(authors);
  } catch (error) {
    console.error("Error retrieving authors:", error);
    res.status(500).json({ error: "Unable to retrieve authors" });
  }
});

module.exports = router;
