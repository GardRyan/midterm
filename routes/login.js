// all routes for login/logout
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 

router.post('/', (req, res) => {
  //todo - execute login
  res.render('login');
}); 

router.get('/', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 

router.post('/', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 

module.exports = router;