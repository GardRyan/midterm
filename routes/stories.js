// all route for showing new filter page
const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");
const { runWithLoginUser } = require('./partials/_loginUser');

//loads html skeleton
router.get("/", (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    res.render("stories", {loginInfo})
  });
 
});

// gets called by ajax and does db query and sends it to render function
router.get("/load", (req, res) => {
  // default options
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    
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
        console.log(err);
        sendJsonErrorMessag(res, 500, err.message);
      });
  });
  
});

module.exports = router;

//options to make.
// by user id.
// stories i contributed to.
