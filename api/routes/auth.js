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
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ username: req.body.username });

    if (!user) {
      return res.status(400).json("Wrong credentials!");
    }

    const validatePass = await bcrypt.compare(req.body.password, user.password);

    if (!validatePass) {
      return res.status(400).json("Wrong credentials!");
    }

    const { password, ...others } = user._doc;
    return res.status(200).json(others);
  } catch (err) {
    return res.status(500).json(err);
  }
});
// export
module.exports = router;
