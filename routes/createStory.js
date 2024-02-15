// all routes for showing and updating one story
const express = require("express");
const router = express.Router();
const { runWithLoginUser } = require('./partials/_loginUser')

//queries and other middleware
const { saveStory } = require("../db/queries/queries_contributions");
//define your routes
router
  .get("/", (req, res) => {
    // const userId = req.session.userId;
    // const user = users[userId];
    // const userURLs = urlsForUser(user);


    res.render("createStory");
  });


router.post("/", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
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
        res.status(500).json({ error: 'An error occurred while saving the story' });
      });
  });

});

module.exports = router;
