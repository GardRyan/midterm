const express = require("express");
const router = express.Router();
const storiesQueries = require("../db/queries/stories");
const { runWithLoginUser, renderErrorMessage, validRequestForUser, sendJsonErrorMessage } = require("./partials/_loginUser");
// this file deals with making queries to the stories table and sending them to  the render function

const getOptions = function (user_id, req) {
  const options = {};
  
  if (user_id) {
    options.showMyStories = `${user_id}`;
  };

  if (Object.keys(req.body).length > 0) {
    const optionsObj = req.body;
    for (let option in optionsObj) {
      options[option] = optionsObj[option];
    }
  } else {
    options.orderDate = "DESC";
    options.orderUpvotes  = "DESC";
  };

  return options;
};

const makeQuery = function (user_id, req, res) {
  const options = getOptions(user_id, req);
  storiesQueries
    .getStories(options)
    .then((stories) => {
      res.json(stories);
    })
    .catch((err) => {
      sendJsonErrorMessage(res, 500, err.message);
      //res.status(500).json({ error: err.message });
    });
};

router.post("/myStories/load", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {

    makeQuery(req.session.user_id, req, res);
  });
});

router.get("/load", (req, res) => {
  // default options
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    makeQuery(undefined, req, res);
  });
});

// updates the stories container with selected tweets
router.post("/", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    makeQuery(undefined, req, res);
  });
});

module.exports = router;
