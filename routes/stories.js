// all route for showing new filter page
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");

// basic show all stories
router.get("/", (req, res) => {
  // default options
  const options = {
    orderDate: "DESC",
    orderUpvotes: "DESC",
  };

  // makes query to db with options
  storiesQueries
    .getStories(options)
    .then((stories) => {
      // renders the page "stories"
      // stories is passed as an object here so ejs can work with it.
      res.render("stories", { stories });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

//options to make.
// by user id.
// stories i contributed to.
