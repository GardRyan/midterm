// all routes for getting or updating votes async
const express = require('express');
const router  = express.Router();

router.get('/contributionsVote', (req, res) => {
  //todo show all contribution votes data (for story?)
}); 

router.post('/contributionsVotes', (req, res) => {
  //todo create contribution vote data
}); 

router.get('/contributionsVotes/id', (req, res) => {
  //todo get one contribution vote data (is this needed?)
}); 

router.post('/contributionsVotes/id', (req, res) => {
  //todo update one contribution vote data (up/down/delete)
}); 