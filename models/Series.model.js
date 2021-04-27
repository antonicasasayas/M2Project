const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: { type: String, unique: true },
  actors: String,
  rating: { type: String },
  year: { type: String },
  genre: String,
  plot: { type: String },
  image: { type: String }
});

const Series = mongoose.model("Series", seriesSchema);


module.exports = Series;
