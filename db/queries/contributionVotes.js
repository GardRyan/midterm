require('dotenv').config();

const { VotesDb } = require('./votes');

class ContributionVotesDb extends VotesDb {
  constructor() {
    super();
    this._type = 'contribution';
  }
}

module.exports = { ContributionVotesDb };