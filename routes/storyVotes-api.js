// all routes for getting or updating story votes async
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo show all story votes data (for story?)
  res.render('users')
}); 

router.post('/', (req, res) => {
  //todo create story vote data
}); 

router.get('/id', (req, res) => {
  //todo get one story vote data (is this needed?)
}); 

router.post('/id', (req, res) => {
  //todo update one story vote data (up/down/delete)
}); 

module.exports = router;