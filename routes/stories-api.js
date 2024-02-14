
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");
const { runWithLoginUser } = require('./partials/_loginUser')
// this file deals with making queries to the stories table and sending them to  the render function

// gets called by the script myStories and loads tweets of logged in user
router.post("/myStories/load", (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    
    const options = {
      orderDate: "DESC",
      orderUpvotes: "DESC",
      showMyStories: `${loginInfo.loggedInUser.id}`,
    };
    
    storiesQueries
      .getStories(options)
      .then((stories) => {
        res.json(stories)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });

  });
});

// updates the stories container with selected tweets
router.post("/", (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    
    const options = {};
    
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
        res.json(stories)
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});



module.exports = router;