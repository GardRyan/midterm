// all routes for login/logout
const express = require('express');
const bcrypt = require("bcrypt");
const router  = express.Router();
const db = require('../db/queries/users'); 
const { Template } = require('ejs');
const { runWithLoginUser } = require('./partials/_loginUser')

// route to show login page
router.get('/', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser) {
      res.render('login', { loginInfo, user: loginInfo.loggedInUser, message: undefined});
    } else {
      res.render('login', { loginInfo, user: undefined, message: undefined});
    }
  });
}); 

// route to handle log in requests
router.post('/', (req, res) => {
  const errorMessage = 'Invalid login or password';
  if ((!(req.body.username)) || (req.body.username.length === 0)) {
    res.render('login', {user: undefined, message: errorMessage});
    return;
  }
  if ((!(req.body.password)) || (req.body.password.length === 0)) {
    res.render('login', {user: undefined, message: errorMessage});
    return;
  }

  db.getUserByUsername(req.body.username.trim())
    .then((result) => {
      if (result) {
        //note, we would encrypt passwords ideally
        if (result.password === req.body.password) {
          req.session.user_id = result.id;
          res.redirect("/login");
        } else {
          res.render('login', {loginInfo: {loggedInUser: result, message: errorMessage}, user: undefined, message: errorMessage});
        }
      } else {
        res.render('login', {loginInfo: {loggedInUser: undefined, message: errorMessage}, user: undefined, message: errorMessage});
      }
    })
    .catch((error) => {
      console.log(error);
      res.render('login', {loginInfo: {loggedInUser: undefined, message: errorMessage}, user: undefined, message: errorMessage});
    });
}); 

// route to post a logout and reset user id on the cookie
router.post('/logout', (req, res) => {
  const userId = req.session.user_id
  req.session.user_id = undefined;
  res.redirect('/login');
}); 

module.exports = router;