const express = require("express");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const User = require("../models/User.model");
const { isLoggedOut } = require("../middlewares");
const router = express.Router();
const saltRounds = 10;

router.get("/signup", isLoggedOut, (req, res) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.render("auth/signup", {
      errorMessage: "Username and password are required.",
    });
  }

  // const regularExpresion = new RegExp('');
  // regularExpresion.test(password)

  if (password.length < 3) {
    res.render("auth/signup", {
      errorMessage: "Password should have at least 3 characters",
    });
  }

  User.findOne({ username }).then((user) => {
    if (user) {
      return res.render("auth/signup", { errorMessage: "User already exists." });
    }

    const salt = bcrypt.genSaltSync(saltRounds);
    const hashPass = bcrypt.hashSync(password, salt);

    User.create({ username, password: hashPass })
      .then((newUser) => {
        // return res.redirect('/');
        req.login(newUser, (error) => {
          if (error) {
            next(error);
          }
          return res.redirect("/private/feed");
        });
      })
      .catch((error) => {
        console.log(error);
        return res.render("auth/signup", {
          errorMessage: "Server error. Try again.",
        });
      });
  });
});

router.get("/login", isLoggedOut, (req, res) => {
  res.render("auth/login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/private/feed",
    failureRedirect: "/auth/login",
    passReqToCallback: true,
  })
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
