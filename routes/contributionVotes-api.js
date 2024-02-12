// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

const { Votes } = require('./votes-api');

class ContributionVotes extends Votes {
  constructor(router) {
    super(router);
    this._type = 'contribution';
    this._router = router
  }

};

let contributionVotes = new ContributionVotes(router);
contributionVotes.createRoutes();

module.exports = router;