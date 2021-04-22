const express = require('express');
const router  = express.Router();

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index', { user: req.user});
});

router.get("/movietitle/details", (req, res, next) => {
  res.render("movie-details", { user: req.user });
});
module.exports = router;
