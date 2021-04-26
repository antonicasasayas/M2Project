const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: { type: String, unique: true },
  actors: String,
  rating: { type: String },
  year: { type: String },
  genre: String,
  plot: { type: String },
  image: { type: String },
  likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  watch: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Series = mongoose.model("Series", seriesSchema);


module.exports = Series;
