// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();
const { runWithLoginUser } = require('./partials/_loginUser')

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
      runWithLoginUser(req.session.user_id, (loginInfo) => {
        this._db.getVotes(req.params.id)
          .then((result) => {
            res.send(result);
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          }); 
      });
    }); 
  
    //route to get a list of votes by element id for one user id
    this._router.get(`/list/:id/:userId`, (req, res) => {
      runWithLoginUser(req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
          if (Number(loginInfo.loggedInUser.id) === Number(req.session.user_id)) {
            this._db.getVotesByUser(req.params.id, req.params.userId)
            .then((result) => {
                res.send(result);
              })
              .catch((error) => {
                console.log(error);
                res.send(error);
              }); 
          } else {
            res.send("Error: logged in user does not match voter id.");
          }
        } else {
          res.send("Error: need valid user logged in.")
        }
      });
    }); 
  
    // route to save a new element vote
    this._router.post(`/new`, (req, res) => {
      runWithLoginUser(req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
          if (Number(loginInfo.loggedInUser.id) === Number(req.session.user_id)) {
            this._db.insertVote(req.body)
            .then((result) => {
              res.send(result);
            })
            .catch((error) => {
              console.log(error);
              res.send(error);
            }); 
          } else {
            res.send("Error: logged in user does not match voter id.");
          }
        } else {
          res.send("Error: need valid user logged in.")
        }
      });
    }); 
  
    //route to get one element vote by the vote id
    this._router.get(`/:voteId`, (req, res) => {
      runWithLoginUser(req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
          if (Number(loginInfo.loggedInUser.id) === Number(req.session.user_id)) {
            this._db.getVote(req.params.voteId)
            .then((result) => {
              res.send(result);
            })
            .catch((error) => {
              console.log(error);
              res.send(error);
            });
          } else {
            res.send("Error: logged in user does not match voter id.");
          }
        } else {
          res.send("Error: need valid user logged in.")
        }
      });
    }); 
  
    //route to update one element vote by vote id
    this._router.post(`/:voteId`, (req, res) => {
      runWithLoginUser(req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
          if (Number(loginInfo.loggedInUser.id) === Number(req.session.user_id)) {
            this._db.updateVote(req.body)
            .then((result) => {
              res.send(result);
            })
            .catch((error) => {
              console.log(error);
              res.send(error);
            }); 
          } else {
            res.send("Error: logged in user does not match voter id.");
          }
        } else {
          res.send("Error: need valid user logged in.")
        }
      });
    }); 
  
    //route to delete one element vote by vote id
    this._router.post(`/delete/:voteId`, (req, res) => {
      runWithLoginUser(req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
            if (Number(loginInfo.loggedInUser.id) === Number(req.session.user_id)) {
            this._db.deleteVote(req.body)
            .then((result) => {
              res.send(result);
            })
            .catch((error) => {
              console.log(error);
              res.send(error);
            }); 
          } else {
            res.send("Error: logged in user does not match voter id.");
          }
        } else {
          res.send("Error: need valid user logged in.")
        }  
      });
    }); 
  };
};

module.exports = { Votes };