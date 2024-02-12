require('dotenv').config();
const db = require('../connection');

const { VotesDb } = require('./votes');

class StoryVotesDb extends VotesDb {
  constructor(){
    super();
    this._type = 'story';
  }
}

module.exports = { StoryVotesDb }