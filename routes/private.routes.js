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
// $or:  })[], })
// { genre: { $regex: `.*${drama}.*` } },
// { genre: { $regex: `.*${action}.*` } }
router.post("/quiz", isLoggedIn, (req, res) => {
  const { comedy, drama, action } = req.body
  Series.find({ genre: { $regex: `.*${comedy}.*` } })
    .then((comedies) => {
      console.log(`These are the ${comedies}`)
      res.render("recommendations", { comedies });
    })
    .catch((error) => console.error(error));
  
  
})


router.get("/feed", isLoggedIn, (req, res) => {
  Post.find({}).sort({date:-1})
   
    .then(posts => {
      res.render('feed', {posts})//
    })
    .catch(error => console.error(error))
  
});

 router.post("/feed", isLoggedIn, (req, res) =>{
   const { content, date } = req.body;
   Post.create({ content, date})
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
