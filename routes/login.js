// all routes for login/logout
const express = require('express');
// const bcrypt = require("bcrypt");
const router  = express.Router();
const db = require('../db/queries/users');
const { runWithLoginUser, renderErrorMessage } = require('./partials/_loginUser');

// route to show login page
router.get('/', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      res.render('login', { loginInfo, user: undefined, message: undefined});
    } else {
      res.redirect("/");
    }
  });
});

// route to handle log in requests
router.post('/', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    
    //we actually want the loginInfo for style sheets, since this is the login process
    loginInfo.loggedInUser = undefined;
    loginInfo.message = 'Invalid login or password';

    if ((!(req.body.username)) || (req.body.username.length === 0)) {
      res.render('login', {loginInfo, user: undefined, message: loginInfo.message});
      return;
    }
    if ((!(req.body.password)) || (req.body.password.length === 0)) {
      res.render('login', {loginInfo, user: undefined, message: loginInfo.message});
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
            res.render('login', {loginInfo, user: undefined, message: loginInfo.message});
          }
        } else {
          res.render('login', {loginInfo, user: undefined, message: loginInfo.message});
        }
      })
      .catch((error) => {
        console.log(error);
        renderErrorMessage(res, loginInfo, 500);
      });
  });
});

// route to post a logout and reset user id on the cookie
router.post('/logout', (req, res) => {
  req.session.user_id = undefined;
  res.redirect('/login');
});

module.exports = router;