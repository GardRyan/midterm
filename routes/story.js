// all routes for showing and updating one story
const express = require("express");
const router = express.Router();

//queries and other middleware
const { getContributions, getStoryById } = require("../db/queries/queries_contributions");

//define your routes
router.get('/:id', (req, res) => {
  const storyId = req.params.id;

  getContributions(storyId)
    .then((contributions) => {

      getStoryById(storyId)
        .then((story) => {
          console.log(story);
      res.render("story", { story, contributions });
        });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });

});

//filter previously added additions to the story
//show current story_step contributions only
//two containers -> one to show iteration of story, one to show story_step contributions
//

// router.get('/', (req, res) => {
//   // get and return one story);
//   res.render('story')
// });

// router.post('/', (req, res) => {
//   // create and insert one contribution
// //const newContribition = req.body.
// });

router.post("/story", (req, res) => {
  // update one story
});

module.exports = router;
