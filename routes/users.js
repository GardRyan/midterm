/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/queries/users');
const { runWithLoginUser } = require('./partials/_loginUser')

// route to get and display all users
router.get('/', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    db.getUsers()
      .then((result) => {
        res.render('users', { loginInfo, users: result })
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
  }); 
});

// route to present blank user form for entry
router.get('/new', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    res.render('user', { loginInfo, user: undefined });
  });
}); 

// route to present user form for the user with the specified id
router.get('/:id', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    db.getUser(req.params.id)
      .then((result) => {
        res.render('user', {loginInfo, user: result});
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      }); 
  }); 
});

// route to accept back user information and update or insert as appropriate
router.post('/', (req, res) => {
  runWithLoginUser(req.session, req.session.user_id, (loginInfo) => {
    const user = req.body;
    if (!req.session.styleSheets) {
      req.session.styleSheets = {};
    }
    req.session.styleSheets.colour = user.userStyleSelection;

    if (user.id) {
      db.updateUser(user) 
      .then((result) => {
        res.redirect(`/users/${user.id}`)
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
    } else {
      db.insertUser(user)
      .then((result) => {
        res.redirect(`/users/${result.id}`)
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
    }
  }); 
});

module.exports = router;
