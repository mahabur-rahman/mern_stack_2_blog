const router = require("express").Router();
const UserModel = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(req.body.password, salt);

    const newUser = await UserModel({
      username: req.body.username,
      email: req.body.email,
      //   password: req.body.password,
      password: hashedPass,
      profilePic: req.body.profilePic,
    });

    const userInfo = await newUser.save();

    return res.status(201).json(userInfo);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN

// export
module.exports = router;
