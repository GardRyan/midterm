require('dotenv').config();

const { VotesDb } = require('./votes');

class StoryVotesDb extends VotesDb {
  constructor() {
    super();
    this._type = 'story';
  }
}

module.exports = { StoryVotesDb };