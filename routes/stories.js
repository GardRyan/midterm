// all route for showing new filter page
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");
const { runWithLoginUser } = require('./partials/_loginUser');

//loads html skeleton
router.get("/", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    res.render("stories", {loginInfo})
  });
});

// loads page for my Stories
router.get("/myStories", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      return res.redirect("/login")
    }
    return res.render("myStories", {loginInfo})
  });
});

module.exports = router;

