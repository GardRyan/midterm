// all routes for showing and updating one story
const express = require("express");
const router = express.Router();
const { runWithLoginUser } = require("./partials/_loginUser");

//queries and other middleware
const {
  getContributions,
  saveContributions,
  editContributions,
  deleteContributions,
  pickContribution,
  editThisContribution,
} = require("../db/queries/queries_contributions");

const {
  getStoryById,
  saveStory,
  editStory,
  deleteStory,
} = require("../db/queries/story");

//define your routes
router.get("/new", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
  res.render("createStory", { loginInfo });
  });
});

router.get("/:id/edit-story", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const storyId = req.params.id;
    const userId = req.session.user_id;

    getStoryById(storyId).then((story) => {
      if (story.deleted === false) {
        res.render("edit-story", { loginInfo, story });
      } else {
        return res
          .status(423)
          .send(
            `Error 423: The story you are trying to access has been deleted!`
          );
      }
    });
  });
});


router.get("/:id/edit-contribution", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const contributionId = req.params.id;

    editThisContribution(contributionId)
      .then((contributions) => {
        res.render("edit-contribution", { loginInfo, contributions });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  });
});

router.get("/:id/delete", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
  const storyId = req.params.id;
  const userId = req.session.user_id;

  res.render("createStory", { loginInfo });
  });
});

router.get("/:id", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const storyId = req.params.id;
    const userId = req.session.user_id;

    getContributions(storyId)
      .then((contributions) => {
        getStoryById(storyId)
          .then((story) => {
            if (story.deleted === false) {
              res.render("story", { loginInfo, story, contributions });
            } else {
              res
                .status(423)
                .send(
                  `Error 423: The story you are trying to access has been deleted!`
                );
            }
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ error: "An error occurred while fetching the story" });
          });
      })
      .catch((err) => {
        console.log(error);
        sendJsonErrorMessag(res, 500, err.message);
      });
  });
});

//this still needs editing!!
//trying to redirect to the new story page.
router.post("/new", (req, res) => {
  const userId = req.session.user_id;

  const newStory = {
    title: req.body.title,
    content: req.body.content,
    creator_id: userId,
    story_id: req.body.story_id, // Provide the required parameters
    picked: req.body.picked,
    contributor_id: req.body.contributor_id,
    created_date: req.body.created_date,
    picked_date: req.body.picked_date,
  };

  saveStory(newStory)
    .then((storyId) => {
      //this is what we're editing.
      getStoryById(storyId).then((story) => {
        if (story.deleted === false) {
          res.redirect(`/story/${storyId}`);
        } else {
          return res
            .status(423)
            .send(
              `Error 423: The story you are trying to access has been deleted!`
            );
        }
      });
    })
    .catch((error) => {
      console.error("Error saving story:", error);
      res
        .status(500)
        .json({ error: "An error occurred while saving the story" });
    });
});

router.post("/contribution/:id/edit", (req, res) => {
  const contributionId = req.params.id;

  if (contributionId !== undefined) {
    res.redirect(`/story/${contributionId}/edit-contribution`);
  } else {
    res.redirect("/stories");
  }
});

router.post("/:id/edit", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const storyId = req.params.id;

    if (storyId) {
      res.redirect(`/story/${storyId}/edit-story`);
    } else {
      res.redirect("/stories");
    }
  });
});

router.post("/:id/edit-story", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const storyId = req.params.id;
    const { title, content } = req.body;
    
    editStory({ id: storyId, title, content })
      .then((editedStory) => {
        if (editedStory) {
          res.redirect("back");
        } else {
          res.status(404).send("Story not found");
        }
      })
      .catch((error) => {
        console.error("Error editing story:", error);
        res.status(500).send("An error occurred while editing the story");
      });
  });
});

router.post("/:id/edit-contributions", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const id = req.params.id;
    const content = req.body.content;
    const story_id = req.body.story_id;

    editContributions({ content, id })
      .then((editedContribution) => {
        if (editedContribution) {
          res.redirect(`/story/${editedContribution.story_id}`);
        } else {
          res.status(404).send("Contribution not found");
        }
      })
      .catch((error) => {
        console.error("Error editing contribution:", error);
        res
          .status(500)
          .send("An error occurred while editing the contribution");
      });
  });
});

router.post("/:id/pick-contributions", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const contributionId = req.params.id;

    pickContribution(contributionId)
      .then(() => {
        res.redirect("back");
      })
      .catch((error) => {
        console.error("Error picking contribution:", error);
        res
          .status(500)
          .send("An error occurred while picking the contribution.");
      });
  });
});

router.post("/:id/delete", (req, res) => {
  const storyId = req.params.id;

  deleteStory(storyId)
    .then(() => {
      return deleteContributions({ story_id: storyId });
    })
    .then((deletedContributions) => {
      if (deletedContributions) {
      }

      res.redirect("/stories");
    })
    .catch((error) => {
      console.error("Error deleting story:", error);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the story" });
    });
});

router.post("/:id/delete-contributions", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const storyId = req.params.id;
    const story_id = storyId;

    deleteContributions(story_id)
      .then((deletedContribution) => {
        if (deletedContribution) {
          res.redirect("back");
        } else {
          res.status(404).send("Contribution not found");
        }
      })
      .catch((error) => {
        console.error("Error deleting contribution:", error);
        res
          .status(500)
          .send("An error occurred while deleting the contribution");
      });
  });
});

router.post("/:id", (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const storyId = req.params.id;
    const userId = req.session.user_id;

    const newContributions = {
      story_id: storyId,
      content: req.body.content,
      contributor_id: userId,
    };

    saveContributions(newContributions)
      .then((contributionId) => {
        res.redirect("back");
      })
      .catch((error) => {
        console.log(error);
        res
          .status(500)
          .json({ error: `An error occured while saving the contribution` });
      });
  });
});

module.exports = router;
