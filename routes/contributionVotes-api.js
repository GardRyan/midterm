// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

const { ContributionVotesDb } = require(`../db/queries/contributionVotes`)

const { Votes } = require('./votes-api');

class ContributionVotes extends Votes {
  constructor(router) {
    super(router, new ContributionVotesDb());
    this._type = 'contribution';
  }
};

let contributionVotes = new ContributionVotes(router);
contributionVotes.createRoutes();

module.exports = router;