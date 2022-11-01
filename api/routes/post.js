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

// DELETE POST
router.delete("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("Post has been deleted!");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can delete only your post!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET SINGLE POST
router.get("/find/:id", async (req, res) => {
  try {
    const singlePost = await PostModel.findById(req.params.id);

    return res.status(200).json(singlePost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL POSTS || http://localhost:4000/api/posts?user=john || http://localhost:4000/api/posts?cat=music ||
//localhost:4000/api/posts

router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;

  try {
    let posts;

    if (username) {
      posts = await PostModel.find({ username: username });
    } else if (catName) {
      posts = await PostModel.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await PostModel.find();
    }

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
