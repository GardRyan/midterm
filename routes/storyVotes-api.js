// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

const { Votes } = require('./votes-api');

class StoryVotes extends Votes {
  constructor(router) {
    super(router);
    this._type = 'story';
    this._router = router
  }

};

let storyVotes = new StoryVotes(router);
storyVotes.createRoutes();

module.exports = router;