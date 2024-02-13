
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");

router.post("/", (req, res) => {
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
  
  const optionsObj = req.body;
  console.log(optionsObj);
  if (Object.keys(optionsObj).length > 0) {
    for (let option in optionsObj) {
      options[option] = optionsObj[option];
    }
  }

  console.log("HERE",{ options });
  console.log("THERE",{ optionsObj });
  
  storiesQueries
    .getStories(options)
    .then((stories) => {
      res.json({ stories })
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
  
});

module.exports = router;