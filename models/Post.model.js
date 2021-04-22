const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String },
  author: String,
  date: { type: Date },
  content: String

});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
