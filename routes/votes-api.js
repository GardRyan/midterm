// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();
const { runWithLoginUser, sendJsonErrorMessage } = require('./partials/_loginUser')

class Votes {
  _router = undefined;
  _db = undefined;
  constructor(router, db) {
    this._type = '';
    this._router = router;
    this._db = db;
  }

  checkValidAPIRequestForUser = function(res, loginInfo, voteId, callback) {  
    if (loginInfo.loggedInUser === undefined) {
      sendJsonErrorMessage(res, 401);
      return false;
    } 
    const voteIdNum = Number(voteId);
    if (Number.isNaN(voteIdNum)) {
      sendJsonErrorMessage(res, 400);
      return false;
    }

    _db.getVote(voteIdNum)
    .then((result) => {
      if (result === undefined) {
        sendJsonErrorMessage(res, 404);
        return false;
      } else if (Number(loginInfo.loggedInUser.id) === Number(result.voter_id)) {
        callback(result);
        return true;
      } else {
        sendJsonErrorMessage(res, 403);
        return false;
      }
    })
    .catch((error) => {
      console.log(error);
      sendJsonErrorMessage(res, 500);
      return false;
    });
  };

  createRoutes = function() {    
    // route to get a list of votes by element id
    this._router.get(`/list/:id`, (req, res) => {
      runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
        this._db.getVotes(req.params.id)
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            console.log(error);
            sendJsonErrorMessage(res, 500);
          }); 
      });
    }); 
  
    //route to get a list of votes by element id for one user id
    this._router.get(`/list/:id/:userId`, (req, res) => {
      runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
          const userIdNum = Number(eq.params.userId);
          if (Number.isNaN(userIdNum)) {
            sendJsonErrorMessage(res, 400, error);
          } else if (Number(loginInfo.loggedInUser.id) === userIdNum) {
            this._db.getVotesByUser(req.params.id, req.params.userId)
            .then((result) => {
                res.json(result);
              })
              .catch((error) => {
                console.log(error);
                sendJsonErrorMessage(res, 500);
              }); 
          } else {
            sendJsonErrorMessage(res, 403, error);
          }
        } else {
          sendJsonErrorMessage(res, 401, error);
        }
      });
    }); 

    // route to save a new element vote
    this._router.post(`/new`, (req, res) => {
      runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
        if (loginInfo.loggedInUser) {
          if (Number(loginInfo.loggedInUser.id) === Number(req.session.user_id)) {
            this._db.insertVote(req.body)
            .then((result) => {
              res.status(201).json(result);
            })
            .catch((error) => {
              console.log(error);
              sendJsonErrorMessage(res, 500);
            }); 
          } else {
            sendJsonErrorMessage(res, 500, "logged in user does not match voter id.");
          }
        } else {
          sendJsonErrorMessage(res, 401, error);
        }
      });
    }); 
  
    //route to get one element vote by the vote id
    this._router.get(`/:voteId`, (req, res) => {
      runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
        checkValidAPIRequestForUser(res, loginInfo, voteId, (result) => {
          res.json(result);
        });        
      });
    }); 
  
    //route to update one element vote by vote id
    this._router.post(`/:voteId`, (req, res) => {
      runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
        checkValidAPIRequestForUser(res, loginInfo, voteId, (result) => {
          this._db.updateVote(req.body)
          .then((result) => {
            res.json(result);
          })
          .catch((error) => {
            console.log(error);
            sendJsonErrorMessage(res, 500);
          }); 
        });
      });
    });
     
  
    //route to delete one element vote by vote id
    this._router.post(`/delete/:voteId`, (req, res) => {
      runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
        checkValidAPIRequestForUser(res, loginInfo, voteId, (result) => {
          this._db.deleteVote(req.body)
            .then((result) => {
              res.json(result);
            })
            .catch((error) => {
              console.log(error);
              sendJsonErrorMessage(res, 500);
            });  
        });
      });
    }); 
  };
};

module.exports = { Votes };