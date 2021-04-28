const express = require("express");
const { QueryCursor } = require("mongoose");
const { serializeUser } = require("passport");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Post = require("../models/Post.model");
const Series = require("../models/Series.model");
const User = require("../models/User.model");
router.get("/profile", isLoggedIn, (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .populate("favorites")
    .then((user) => {
      res.render("profile", { user });
    });
});

router.get("/series/:id", (req, res, next) => {
  const { id } = req.params;
  let addWishlist = true;
  
  let addWatchlist = true;
  
  Series.findById(id).then((series) => {
    const { _id: userID } = req.user;
    User.findById(userID).then((user) => {
      if (user.favorites.includes(id)) {
        addWishlist = false;
        
      }
      if (user.watchlist.includes(id)) {
        addWatchlist = false;
      }
      res.render("movie-details", { series, addWishlist, addWatchlist, user: req.user });
    });
  });
});

router.post("/add-favorites", (req, res, next) => {
  const { seriesID } = req.body;
  const { _id: userID } = req.user;
  
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { favorites } = user;
        if (!favorites.includes(seriesID)) {
          User.findByIdAndUpdate(
            userID,
            { $push: { favorites: seriesID } },
            { new: true }
          )
            .then((user) => res.redirect(`/private/series/${seriesID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/private/series/${seriesID}`);
        }
      } else {
        res.redirect(`/private/series/${seriesID}`);
      }
    })
    .catch((error) => next(error));
});
router.post("/remove-favorites", (req, res, next) => {
  const { seriesID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { favorites } = user;
        if (favorites.includes(seriesID)) {
          User.findByIdAndUpdate(
            userID,
            { $pull: { favorites: seriesID } },
            { new: true }
          )
            .then((user) => res.redirect(`/private/series/${seriesID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/private/series/${seriesID}`);
        }
      } else {
        res.redirect(`/private/series/${seriesID}`);
      }
    })
    .catch((error) => next(error));
});
router.post("/add-watchlist", (req, res, next) => {
  const { seriesID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { watchlist } = user;
        if (!watchlist.includes(seriesID)) {
          User.findByIdAndUpdate(
            userID,
            { $push: { watchlist: seriesID } },
            { new: true }
          )
            .then((user) => res.redirect(`/private/series/${seriesID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/private/series/${seriesID}`);
        }
      } else {
        res.redirect(`/private/series/${seriesID}`);
      }
    })
    .catch((error) => next(error));
});
router.post("/remove-watchlist", (req, res, next) => {
  const { seriesID } = req.body;
  const { _id: userID } = req.user;
  User.findById(userID)
    .then((user) => {
      if (user) {
        const { watchlist } = user;
        if (watchlist.includes(seriesID)) {
          User.findByIdAndUpdate(
            userID,
            { $pull: { watchlist: seriesID } },
            { new: true }
          )
            .then((user) => res.redirect(`/private/series/${seriesID}`))
            .catch((error) => next(error));
        } else {
          res.redirect(`/private/series/${seriesID}`);
        }
      } else {
        res.redirect(`/private/series/${seriesID}`);
      }
    })
    .catch((error) => next(error));
});

router.get("/quiz", isLoggedIn, (req, res, next) => {
  res.render("quiz", { user: req.user });
});
// router.post("/addFavorites", (req, res, next) => {
//   const { seriesID } = req.body;
//   const { _id: userID } req.user;
//   User.findById({ userID })
//     .then(user => {
//       if (user) {
//         const { favorites } = user;
//         if (!favorites.includes(seriesID)) {
//           User.findByIdAndUpdate(
//             userID,
//             { $push: {favorites: seriesID}}, {new: true}
//           )
//             .then((user) => res.redirect("/private/profile"))
//           .catch(error => next(error))
//         }
//     }
//   })
// })
router.get("/searchbar", (req, res) => {
  res.render("search");
});
router.get("/search", (req, res) => {
  const { search } = req.query;
  Series.findOne({ title: { $regex: `.*(?i)${search}.*` } })
    .then((series) => {
      res.render("series", { series, search, user: req.user });
    })
    .catch((error) => console.error(error));
});
router.get("/recommendations-json", (req, res) => {
  // this CONTROLLER is...
  Series.find({}) // ... asking for data from the Student MODEL and ...
    .then((students) => {
      res.json(students); // ... sending a VIEW to the client
    })
    .catch((error) => console.error(error));
});

router.post("/recommendations", isLoggedIn,  (req, res) => {
  const query = Object.keys(req.body).join(" ");
  console.log(query)
  console.log(req.body)

  Series.find({ genre: { $regex: `.*(?i)${query}.*` } })
    .then((series) => {
      res.render("recommendations", { series });
    })
    .catch((error) => console.error(error));
  
  
  
 
  
      
 
    
  })



router.get("/feed", isLoggedIn, (req, res) => {
  
  Post.find({})
    .sort({ date: -1 })
    .populate("user_id")
    .lean()

    .then((posts) => {
      for (let i = 0; i < posts.length; i++){

        if (String(posts[i].user_id._id) === String(req.user.id)) {
          
          posts[i].isEditable = true;
          
          }
      }
      
        
      User.find({favorites : { $exists: true}, $where:"this.favorites.length > 0"})

        .populate("favorites")
        .populate("watchlist")

        .then((users) => {
          
          Series.find({}).then((series) => {
            
            res.render("feed", {
              
              series,
              posts,
              users,
              user: req.user,
            });
          });
        })
        .catch((error) => console.error(error));
    })
  .catch(error => console.error(error))
});

router.post("/feed", isLoggedIn, (req, res) => {
  const { content, date } = req.body;
  Post.create({ content, date, user_id: req.user._id })
    .then(() => {
      res.redirect("/private/feed");
    })
    .catch((error) => {
      res.render("feed", { error });
    });
});

router.post("/:id/delete", (req, res) => {
  const { id } = req.params;
  Post.findOneAndDelete({ _id: id })
    .then(() => {
      res.redirect(`/private/feed`);
    })
    .catch((error) => console.error(error));
});

router.get("/:id/edit", isLoggedIn, (req, res) => {
  const { id } = req.params;
  Post.findOne({ _id: id })
    .then((post) => {
      res.render("edit", { post });
    })
    .catch((error) => console.error(error));
});

router.post("/:id/edit", (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  // { name:name, age:age, description:description, city:city }
  Post.findOneAndUpdate({ _id: id }, { content })
    .then(() => {
      res.redirect("/private/feed");
    })
    .catch((error) => console.error(error));
});

module.exports = router;
