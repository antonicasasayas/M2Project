const express = require("express");
const { serializeUser } = require("passport");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Post = require('../models/Post.model');
const Series = require("../models/Series.model")
router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", { user: req.user });
});



router.get("/quiz", isLoggedIn, (req, res, next) => {
  res.render("quiz", { user: req.user})
  
  
  
});

router.get("/searchbar",(req, res) => {
  res.render("search")
})
router.get("/search", (req, res) => {
  
  console.log(req.query.serie);
  const series = req.query.serie;
  Series.findOne({ title: { $regex: `.*(?i)${series}.*` } })
    .then((series) => {
      console.log(series);
      res.render("movie-details", { series });
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
// $or:  })[], })
// { genre: { $regex: `.*${drama}.*` } },
// { genre: { $regex: `.*${action}.*` } }
router.post("/recommendations", isLoggedIn, (req, res) => {
  const { comedy, action, drama } = req.body;
  ;
  //  Series.find({or:[{ genre: { $regex: `.*${comedy}.*`} },{ genre: { $regex: `.*${comedy}.*`]})
  Series.find({
    $or: [
      { genre: { $regex: `.*${comedy}.*` } },
      { genre: { $regex: `.*${action}.*` } },
      { genre: { $regex: `.*${drama}.*` } },
    ],
  })
    .sort({ rating: -1 })
    // filter("rating":NaN)
    // Series.find({$text: { $search: "Comedy"}}).sort({"rating":-1}).limit(3)
    //  Series.find().sort({"rating":-1})
    .then((comedies) => {
      console.log(`These are the ${comedies}`);
      res.render("recommendations", { comedies });
    })
    .catch((error) => console.error(error));
});

router.get("/feed", isLoggedIn, (req, res) => {
  Post.find({}).sort({date:-1})
   .populate("user_id")
    .then(posts => {
      res.render('feed', {posts, user: req.user})//
    })
    .catch(error => console.error(error))
  
});

 router.post("/feed", isLoggedIn, (req, res) =>{
   const { content, date } = req.body;
   Post.create({ content, date, user_id: req.user._id})
   .then(() => {
    res.redirect("/private/feed")
  })
  .catch(error => {
    res.render('feed', { error })
  })
 })

 router.post('/:id/delete', (req, res) => {
  const { id } = req.params;
  Post.findOneAndDelete({ _id: id })
  .then(() => {
    res.redirect(`/private/feed`);
  })
  .catch(error => console.error(error))
})

 
router.get("/:id/edit", isLoggedIn, (req,res) =>{
  const { id } = req.params;
  Post.findOne({ _id: id })
    .then(post => {
      res.render('edit', { post });
    })
    .catch(error => console.error(error))
})

router.post('/:id/edit', (req, res) => {
  const { content } = req.body;
  const { id } = req.params;
  // { name:name, age:age, description:description, city:city }
  Post.findOneAndUpdate({ _id: id }, { content })
    .then(() => {
      res.redirect("/private/feed");
    })
    .catch(error => console.error(error))
})




 
module.exports = router;
