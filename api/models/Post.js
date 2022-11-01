const mongoose = require("mongoose");

// PostSchema
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, unique: true },
    photo: { type: String, required: false },
    username: { type: String, required: true },
    categories: { type: Array, required: false }, // ["music", "life", "cricket"]
  },
  { timestamps: true }
);

// model
const PostModel = mongoose.model("Post", PostSchema);

// export
module.exports = PostModel;
