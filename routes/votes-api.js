// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

class Votes {
  _router = undefined;
  _db = undefined;
  constructor(router, db) {
    this._type = '';
    this._router = router;
    this._db = db;
  }

  createRoutes = function() {    
    // route to get a list of votes by element id
    this._router.get(`/list/:id`, (req, res) => {
      this._db.getVotes(req.params.id)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        }); 
    }); 
  
    //route to get a list of votes by element id for one user id
    this._router.get(`/list/:id/:userId`, (req, res) => {
      this._db.getVotesByUser(req.params.id, req.params.userId)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        }); 
    }); 
  
    // route to save a new element vote
    this._router.post(`/new`, (req, res) => {
      this._db.insertVote(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        }); 
    }); 
  
    //route to get one element vote by the vote id
    this._router.get(`/:voteId`, (req, res) => {
      this._db.getVote(req.params.voteId)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        }); 
    }); 
  
    //route to update one element vote by vote id
    this._router.post(`/:voteId`, (req, res) => {
      console.log('update vote', req.body)
      this._db.updateVote(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        }); 
    }); 
  
    //route to delete one element vote by vote id
    this._router.post(`/delete/:voteId`, (req, res) => {
      this._db.deleteVote(req.body)
        .then((result) => {
          res.send(result);
        })
        .catch((error) => {
          console.log(error);
          res.send(error);
        }); 
    }); 
  };
};

module.exports = { Votes };