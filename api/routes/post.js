const express = require("express");
const router = express.Router();
const PostModel = require("../models/Post");

// #################
// CREATE POST
// UPDATE POST
// DELETE POST
// GET POST
// GET ALL POSTS WITH QUERY 👍

// #################

// CREATE POST
router.post("/", async (req, res) => {
  const newPost = new PostModel(req.body);

  try {
    const savedPost = await newPost.save();

    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
