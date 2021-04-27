const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String },
  posts: [String], //mongoose model object id ref: "Post"
  favorites: [{ type: Schema.Types.ObjectId, ref: "Series" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;