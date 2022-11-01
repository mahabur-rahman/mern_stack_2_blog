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

// UPDATE POST
router.put("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );

        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
