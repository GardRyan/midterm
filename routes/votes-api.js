// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

class Votes {
  _router = undefined;
  constructor(router) {
    this._type = '';
    this._router = router
  }

  createRoutes = function() {    
    this._router.get(`/${this._type}/:${this._type}Id`, (req, res) => {
      //todo show all story votes for the story id
      res.send(`${this._type} votes`);
    }); 
  
    this._router.get(`/${this._type}/:${this._type}Id/:userId`, (req, res) => {
      //todo show all story votes that the user Id has made on the story id
      res.send(`${this._type} votes`);
    }); 
  
    this._router.post(`/new`, (req, res) => {
      //todo create new story vote data
      res.send(`${this._type} votes`);
    }); 
  
    this._router.get(`/:voteId`, (req, res) => {
      //todo get one story vote data (is this needed?)
      res.send(`${this._type} votes`);
    }); 
  
    this._router.post(`/:voteId`, (req, res) => {
      //todo update one story vote data (up/down/delete)
      res.send(`${this._type} votes`);
    }); 
  
    this._router.post(`/delete/:voteId`, (req, res) => {
      //todo update one story vote data (up/down/delete)
      res.send(`${this._type} votes`);
    }); 
  };
};

module.exports = { Votes };