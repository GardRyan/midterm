require('dotenv').config();
const db = require('../connection');

const { VotesDb } = require('./votes');

class ContributionVotesDb extends VotesDb {
  constructor(){
    super();
    this._type = 'contribution';
  }
}

module.exports = { ContributionVotesDb }