const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();
const Post = require('../models/Post.model');

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", { user: req.user });
});

router.get("/quiz", isLoggedIn, (req, res, next) => {
  res.render("quiz", { user: req.user });
});

router.post("/quiz", isLoggedIn, (req, res) => {
  res.redirect("/private/recommendations")
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




 router.get("/recommendations", isLoggedIn, (req, res) => {
   res.render("recommendations", { user: req.user });
 })

module.exports = router;
