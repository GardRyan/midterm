// all routes for showing and updating one story
const express = require('express');
const router  = express.Router();
const getContributions = require ('../queries_contributions.js')

router.get('/:id', (req, res) => {
  // get and return one story);
});

router.get('/', (req, res) => {
  // get and return one story);
  res.render('story')
});

router.post('/', (req, res) => {
  // create and insert one story

});

router.post('/:id', (req, res) => {
  // update one story
});

module.exports = router;

