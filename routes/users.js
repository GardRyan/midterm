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
// leaving this available during testing.  In future this should be removed or limited to admin folks
router.get('/', (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
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
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      res.render('user', { loginInfo, user: undefined });
    } else {
      res.redirect(`/users/${loginInfo.loggedInUser.id}`);
    }
  });
}); 

// route to present user form for the user with the specified id
router.get('/:id', (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      res.redirect("/users/new")
    } else {
      if (Number(loginInfo.loggedInUser.id) === Number(req.params.id)) {
        db.getUser(req.params.id)
          .then((result) => {
            res.render('user', {loginInfo, user: result});
          })
          .catch((error) => {
            console.log(error);
            res.send(error);
          }); 
      } else {
        res.redirect(`/users/${loginInfo.loggedInUser.id}`)
      }
    };
  }); 
});

// route to accept back user information and update or insert as appropriate
router.post('/', (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    const user = req.body;
    if ((loginInfo.loggedInUser) &&
        (user.id) && 
        (Number(user.id) === Number(loginInfo.loggedInUser.id))) {
      db.updateUser(user) 
      .then((result) => {
        res.redirect(`/users/${user.id}`)
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
    } else if 
        ((loginInfo.loggedInUser === undefined)
        (user.id === undefined)) {
      db.insertUser(user)
      .then((result) => {
        res.redirect(`/users/${result.id}`)
      })
      .catch((error) => {
        console.log(error);
        res.send(error);
      });
    } else {
      res.redirect("/");
    }
  }); 
});

module.exports = router;
