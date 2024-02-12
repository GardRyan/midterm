// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

const { StoryVotesDb } = require(`../db/queries/storyVotes`)
const { Votes } = require('./votes-api');

class StoryVotes extends Votes {
  constructor(router) {
    super(router, new StoryVotesDb());
    this._type = 'story';
  }
};

let storyVotes = new StoryVotes(router);
storyVotes.createRoutes();

module.exports = router;