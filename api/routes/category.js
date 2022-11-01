const router = require("express").Router();
const CategoryModel = require("../models/Category");

// ########

// CREATE CATEGORY
// GET ALL CATEGORY

// ########

// CREATE CATEGORY
router.post("/", async (req, res) => {
  try {
    const newCat = await CategoryModel(req.body);
    const savedCat = await newCat.save();

    return res.status(201).json(savedCat);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// export
module.exports = router;
