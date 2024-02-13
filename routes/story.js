// all routes for showing and updating one story
const express = require("express");
const router = express.Router();

//queries and other middleware
const {
  getContributions,
  getStoryById,
  saveContributions,
} = require("../db/queries/queries_contributions");

const { saveStory, editStory, deleteStory } = require("../db/queries/story");

//define your routes
router.get("/new", (req, res) => {
    // const userId = req.session.userId;
    // const user = users[userId];
    // const userURLs = urlsForUser(user);


    res.render("createStory");
  });

router.get("/:id", (req, res) => {
  const storyId = req.params.id;

  getContributions(storyId)
    .then((contributions) => {
      console.log(contributions);
      getStoryById(storyId).then((story) => {
        console.log(story);
        res.render("story", { story, contributions });
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/new", (req, res) => {

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

router.post("/:id", (req, res) => {
  const newContributions = {
    story_id: req.body.story_id,
    story_step: req.body.story_step,
    content: req.body.content,
    picked: req.body.picked,
    contributor_id: req.body.contributor_id,
    created_date: req.body.created_date,
    picked_date: req.body.picked_date,
  };

  saveContributions(newContribution)
    .then((contributionId) => {
      res.render("story", { story, contributions });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `An error occured while saving the contribution`});
    });
});


module.exports = router;
