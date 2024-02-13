// all routes for showing and updating one story
const express = require("express");
const router = express.Router();

//queries and other middleware
const {
  getContributions,
  getStoryById,
  saveContributions,
} = require("../db/queries/queries_contributions");

//define your routes
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
