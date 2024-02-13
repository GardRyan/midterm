// all route for showing new filter page
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");

router.get("/", (req, res) => {
  //todo - get stories all stories and show to user
  // want to allow filters such as "my stories", "my conrtibutions"
  // make a simple form
  // check that works
  // build option with one option
  // test query with option

  // plan:
  // take options obj from forms
  // alter options to reflect new options pass that into getstories
  
  const options = {
    orderDate: "DESC",
    orderUpvotes: "DESC",
  };

  const optionsObj = req.query;
  if (Object.keys(optionsObj).length > 0) {
    for (let option in optionsObj) {
      options[option] = optionsObj[option];
    }
  }

  console.log({ options });
  console.log({ optionsObj });
  
  storiesQueries
    .getStories(options)
    .then((stories) => {
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