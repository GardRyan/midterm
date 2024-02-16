// all route for showing new filter page
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");
const {
  runWithLoginUser,
  renderErrorMessage,
  validRequestForUser,
  sendJsonErrorMessage,
} = require("./partials/_loginUser");

//loads html skeleton
router.get("/", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    res.render("stories", { loginInfo });
  });
});

// loads page for my Stories
router.get("/myStories", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const userId = req.session.user_id;
    if (userId) {
      res.render("myStories", { loginInfo, userId });
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = router;
