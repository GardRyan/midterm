// all routes for login/logout
const express = require('express');
const bcrypt = require("bcrypt");
const router  = express.Router();
const db = require('../db/queries/users');
const { Template } = require('ejs');

// route to show login page
router.get('/', (req, res) => {
  //todo - show login page

  res.render('login');
});

  const userId = req.session.user_id
  if (userId) {
    db.getUser(userId)
    .then((result) => {
      templateParams = { user: result};
      res.render('login', { user: result, message: undefined});
    })
    .catch((error) => {
      res.render('login', {user: undefined, message: `Error looking up user data: ${error}`});
    });
  } else {
    res.render('login', {user: undefined, message: undefined});
  }
});

// route to handle log in requests
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
  const errorMessage = 'Invalid login or password';
  if ((!(req.body.username)) || (req.body.username.length === 0)) {
    res.render('login', {user: undefined, message: errorMessage});
    return;
  }
  if ((!(req.body.password)) || (req.body.password.length === 0)) {
    res.render('login', {user: undefined, message: errorMessage});
    return;
  }

  db.getUserByUsername(req.body.username)
    .then((result) => {
      if (result) {
        //note, we would encrypt passwords ideally
        if (result.password === req.body.password) {
          req.session.user_id = result.id;
          res.redirect("/login");
        } else {
          res.render('login', {user: undefined, message: errorMessage});
        }
      } else {
        res.render('login', {user: undefined, message: errorMessage});
      }
    })
    .catch((error) => {
      console.log(error);
      res.render('login', {user: undefined, message: errorMessage});
    });
});

// route to post a logout and reset user id on the cookie
router.post('/logout', (req, res) => {
  const userId = req.session.user_id
  req.session.user_id = undefined;
  res.redirect('/login');
});

module.exports = router;
