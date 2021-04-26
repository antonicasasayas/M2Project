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
//   "tt2085059",
//   "tt7221388",
//   "tt0367279",
//   "tt5753856",
//   "tt7767422",
//   "tt1312171",
//   "tt2372162",
//   "tt2707408",
//   "tt3398228",
//   "tt5290382",
//   "tt3322312",
//   "tt1856010",
//   "tt5675620",
//   "tt1837492",
//   "tt3520702",
//   "tt6763664",
//   "tt8714904",
//   "tt3909224",
//   "tt2431438",
//   "tt5421602",
//   "tt7120662",
//   "tt6524350",
//   "tt2357547",
//   "tt7569592",
//   "tt6315640",
//   "tt7909970",
//   "tt9815454",
//   "tt2234222",
//   "tt6257970",
//   "tt9561862",
//   "tt5770786",
//   "tt5516154",
//   "tt10062292",
//   "tt7137906",
//   "tt3322310",
//   "tt4834206",
//   "tt5363918",
//   "tt2442560",
//   "tt4574334",
//   "tt6468322",
//   "tt4052886",
//   "tt10048342",
//   "tt2085059",
//   "tt7221388",
//   "tt5435008",
//   "tt3339966",
//   "tt3322314",
//   "tt5562056",
//   "tt2189461",
//   "tt5580146",
//   "tt9446688",
//   "tt7879820",
//   "tt4230076",
//   "tt2560140",
//   "tt12626014",
//   "tt2303687",
//   "tt7985576",
//   "tt2306299",
//   "tt7817340",
//   "tt7517016",
//   "tt8690776",
//   "tt2222042",
//   "tt5420376",
//   "tt11937816",
//   "tt10893694",
//   "tt3006802",
//   "tt13879466",
//   "tt0130400",
//   "tt0222584",
//   "tt3032476",
//   "tt2661044",
//   "tt2467372",
//   "tt3655782",
//   "tt0903747",
//   "tt9698442",
//   "tt11620930",
//   "tt3170832",
//   "tt0079470",
//   "tt3069894",
//   "tt1086761",
//   "tt1796960",
//   "tt9162006",
//   "tt8299508",
//   "tt11635452",
//   "tt10893694",
//   "tt0409591",
//   "tt0397442",
//   "tt3006802",
//   "tt1475582",
//   "tt0475464",
//   "tt0411008",
//   "tt1266020",
//   "tt2149175",
//   "tt9335498",
//   "tt5014882",
//   "tt4786824",
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
