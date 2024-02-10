// all routes for login/logout
const express = require('express');
const router  = express.Router();

router.get('/login', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 

router.post('/login', (req, res) => {
  //todo - execute login
  res.render('login');
}); 

router.get('/logout', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 

router.post('/logout', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 