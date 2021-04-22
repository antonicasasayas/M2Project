const express = require("express");
const { isLoggedIn } = require("../middlewares");
const router = express.Router();

router.get("/profile", isLoggedIn, (req, res, next) => {
  res.render("profile", { user: req.user });
});

router.get("/quiz", isLoggedIn, (req, res, next) => {
  res.render("quiz", { user: req.user });
});

router.post("/quiz", isLoggedIn, (req, res) => {
  res.redirect("/private/recommendations")
})

router.get("/feed", isLoggedIn, (req, res, next) => {
  res.render("feed", { user: req.user });
});

router.get("/recommendations", isLoggedIn, (req, res) => {
  res.render("recommendations", { user: req.user });
})

module.exports = router;