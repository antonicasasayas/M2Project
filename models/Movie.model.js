const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  title: { type: String },
  author: String,  //s'han de dir igual que a la database OJO 
  rate: { type: Number}, //com fem perque mongo sapiga que a la DB hi ha movies
  date: { type: Date },
  genres: [String] //a la DB es un array d'objectes. Id i Name.
});

const Movie = mongoose.model("Movie", movieSchema);


module.exports = Movie;
