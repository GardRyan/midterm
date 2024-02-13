// all route for showing new filter page
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");

//loads html skeleton
router.get("/", (req, res) => {

 res.render("stories")
});

// gets called by ajax and does db query and sends it to render function
router.get("/load", (req, res) => {
  // default options
  const options = {
    orderDate: "DESC",
    orderUpvotes: "DESC",
  };

  // makes query to db with options
  storiesQueries
    .getStories(options)
    .then((stories) => {
      //sends it to stories script
      res.json(stories)
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;

//options to make.
// by user id.
// stories i contributed to.
