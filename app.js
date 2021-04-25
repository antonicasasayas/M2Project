require("dotenv").config();

const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const app = express();
const axios = require("axios");
const Series = require("./models/Series.model");
require("./configs/db.config");

// Debbuger
require("./configs/debugger.config");





// Middleware Setup
// const func = require('./configs/middleware.config');
// func(app);
require("./configs/middleware.config")(app);

// Configs
require("./configs/preformatter.config")(app);
require("./configs/views.config")(app);
require("./configs/locals.config")(app);
require("./configs/session.config")(app);
require("./configs/passport.config")(app);

const index = require("./routes/index");
const authRouter = require("./routes/auth.routes");
const privateRouter = require("./routes/private.routes");

app.use("/", index);
app.use("/private", privateRouter);
app.use("/auth", authRouter);
module.exports = app;

// const titlesArray = [
  
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
//   "",
// ];
// var options = {
//   method: "GET",
//   url: "https://movie-database-imdb-alternative.p.rapidapi.com/",
//   params: { i: "tt4154796", r: "json" },
//   headers: {
//     "x-rapidapi-key": "847fb68c6fmshe4818651a4d804ep13a21djsn36682c9c927c",
//     "x-rapidapi-host": "movie-database-imdb-alternative.p.rapidapi.com",
//   },
// };

// const getFilms = () => {
//   for (let i = 0; i < titlesArray.length; i++) {
//     options.params.i = titlesArray[i];
//     axios
//       .request(options)
//       .then(function (response) {
//         Series.create({
//           title: response.data.Title,
//           actors: response.data.Actors,
//           image: response.data.Poster,
//           rating: response.data.imdbRating,
//           genre: response.data.Genre,
//           plot: response.data.Plot,
//           year: response.data.Year,
//         })
//           .then(() => console.log(`${titlesArray.length} movies created!`))
//           .catch((error) => console.error(error));
//       })
//       .catch(function (error) {
//         console.error(error);
//       });
//   }
// };
// getFilms();

console.log("IronGenerator JS imported successfully!");

//  Promise.all(promises).then((values) => {
//    Movie.insertMany(values)
//      .then(() => console.log("ready"))
//    .catch(() => console.log("whoops")  )
//  });
