const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String },
  user_id: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date },
  content: String
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
