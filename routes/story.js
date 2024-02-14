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

  router.get("/:id/edit", (req, res) => {
    const storyId = req.params.id;
    const userId = req.session.user_id



    res.render("createStory");
  });

  router.get("/:id/delete", (req, res) => {
    const storyId = req.params.id;
    const userId = req.session.user_id



    res.render("createStory");
  });

router.get("/:id", (req, res) => {
  const storyId = req.params.id;
  const userId = req.session.user_id

  console.log(req.params);

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
  const userId = req.session.user_id


  const newStory = {
    title: req.body.title,
    content: req.body.content,
    creator_id: userId,
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
  const storyId = req.params.id;
  const userId = req.session.user_id

  const newContributions = {
    story_id: storyId,
    story_step: 1,
    content: req.body.content,
    contributor_id: userId,
  };

  saveContributions(newContribution)
    .then((contributionId) => {
      res.status(201).send();
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: `An error occured while saving the contribution`});
    });
});

router.post("/:id/edit", (req, res) => {

});

router.post("/:id/delete", (req, res) => {
  const storyId = req.params.id;


  deleteStory(storyId)
  .then(() => {
    res.redirect("/stories")
    })
    .catch((error) => {
      console.error('Error deleting story:', error);
      res.status(500).json({ error: 'An error occurred while deleting the story' });
    });
});

module.exports = router;
