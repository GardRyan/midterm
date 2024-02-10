// all routes for getting or updating votes async
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo show all contribution votes data (for story?)
  res.render('users')
}); 

router.post('/', (req, res) => {
  //todo create contribution vote data
}); 

router.get('/id', (req, res) => {
  //todo get one contribution vote data (is this needed?)
}); 

router.post('/id', (req, res) => {
  //todo update one contribution vote data (up/down/delete)
}); 

module.exports = router;