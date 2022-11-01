const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const UserModel = require("../models/User");
const PostModel = require("../models/Post");

// ###############

// UPDATE USER
// DELETE
// GET SINGLE USER

// ###############

// UPDATE

router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      return res.status(200).json(updatedUser);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(401).json("You can update only your account!");
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);

      try {
        await PostModel.deleteMany({ username: user.username });
        await UserModel.findByIdAndDelete(req.params.id);

        return res.status(200).json("User has been deleted!");
      } catch (err) {
        return res.status(500).json(err);
      }
    } catch (err) {
      return res.status(500).json("User not found!");
    }
  } else {
    return res.status(401).json("You can delete only your account!");
  }
});

// GET USER
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    const { password, ...others } = user._doc;

    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
