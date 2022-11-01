const mongoose = require("mongoose");

// categorySchema
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

// model
const CategoryModel = mongoose.model("Category", CategorySchema);

// export
module.exports = CategoryModel;
