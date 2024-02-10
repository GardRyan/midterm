// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

router.get('/storyVotes', (req, res) => {
  //todo show all story votes data (for story?)
}); 

router.post('/storyVotes', (req, res) => {
  //todo create story vote data
}); 

router.get('/storyVotes/id', (req, res) => {
  //todo get one story vote data (is this needed?)
}); 

router.post('/storyVotes/id', (req, res) => {
  //todo update one story vote data (up/down/delete)
}); 