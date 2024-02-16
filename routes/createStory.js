// all routes for showing and updating one story
const express = require("express");
const router = express.Router();
const { runWithLoginUser, renderErrorMessage } = require('./partials/_loginUser')

//queries and other middleware
const { saveStory } = require("../db/queries/queries_contributions");
//define your routes
router
  .get("/", (req, res) => {
    runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
      if (loginInfo.loggedInUser === undefined) {
        renderErrorMessage(res, loginInfo, 401);
        //res.redirect("/login");
      } else {
        // const userId = req.session.userId;
        // const user = users[userId];
        // const userURLs = urlsForUser(user);
        res.render("createStory");
      }
    });
  });

router.post("/", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      //res.redirect("/login");
      renderErrorMessage(res, loginInfo, 401);
    } else {
      const newStory = {
        title: req.body.title,
        content: req.body.content,
        creator_id: req.body.creator_id,
        completed: req.body.completed,
        created_date: req.body.created_date,
        completed_date: req.body.completed_date,
        public: req.body.public,
        deleted: req.body.deleted,
      };

      saveStory(newStory)
        .then((storyId) => {
          res.redirect("/stories")
        })
        .catch((error) => {
          console.error('Error saving story:', error);
          renderErrorMessage(res, loginInfo, 500, 'An error occurred while saving the story');
        })
    };
  });
});

module.exports = router;
