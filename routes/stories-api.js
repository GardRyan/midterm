
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");
const { runWithLoginUser } = require('./partials/_loginUser')

router.post("/", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    
    const userInfo = loginInfo.loggedInUser;

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

    storiesQueries
      .getStories(options)
      .then((stories) => {
        // console.log(stories);
        res.json(stories)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

module.exports = router;