/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const db = require('../db/queries/users');
const { runWithLoginUser, renderErrorMessage, validRequestForUser } = require('./partials/_loginUser');
const e = require('express');

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
        renderErrorMessage(res, loginInfo, 500);
      });
  }); 
});

// route to present blank user form for entry
router.get('/new', (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      res.render('user', { loginInfo, user: undefined });
    } else {
      renderErrorMessage(res, loginInfo, 403);
    }
  });
}); 

// route to present user form for the user with the specified id
router.get('/:id', (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    if (validRequestForUser(res, loginInfo, req.params.id)) {    
      db.getUser(req.params.id)
        .then((result) => {
          if (!result) {
            renderErrorMessage(res, loginInfo, 404);
          } else {
            res.render('user', {loginInfo, user: result});
          }
        })
        .catch((error) => {
          console.log(error);
          renderErrorMessage(res, loginInfo, 500); 
        }); 
    };
  }); 
});

//validate and update a user update through POST
const postUpdate = function(res, loginInfo, user) {
  if (validRequestForUser(res, loginInfo, user.id)) {  
    db.updateUser(user) 
    .then((result) => {
      res.redirect(`/users/${user.id}`)
    })
    .catch((error) => {
      console.log(error);
      renderErrorMessage(res, loginInfo, 500); 
    });
  } 
}

const validUserData = function(user) {
  if (user === undefined) {
    return false;
  }
  
  if ((user.id !== undefined) && (user.id !== '')) {
    return false;
  }

  if ((user.username === undefined) || (user.username === '')) {
    return false;
  }

  if ((user.first_name === undefined) || (user.first_name === '')) {
    return false;
  }

  if ((user.last_name === undefined) || (user.last_name === '')) {
    return false;
  }

  if ((user.email === undefined) || (user.email === '')) {
    return false;
  }

  return true;
}

//validate and insert a user update through POST
const postInsert = function(res, loginInfo, user) {
  if ((user === undefined) || ((user.id !== undefined) && (user.id !== ''))) {
    renderErrorMessage(res, loginInfo, 400, error); 
  } else if (validUserData(user)) {
    if ((loginInfo === undefined) || (loginInfo.loggedInUser === undefined)) {
      db.insertUser(user)
      .then((result) => {
        res.redirect(`/login`);
      })
      .catch((error) => {
        console.log(error);
        renderErrorMessage(res, loginInfo, 500); 
      })
    } else {
      renderErrorMessage(res, loginInfo, 403);
    }
  } else {
    res.status(403).render('user', { loginInfo,  user, message: "Please fill in all fields." });
  }
}

// route to accept back user information and update or insert as appropriate
router.post('/', (req, res) => {
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    const user = req.body;
    if (loginInfo.loggedInUser) {
      postUpdate(res, loginInfo, user);
    } else {
      postInsert(res, loginInfo, user);
    } 
  }); 
});

module.exports = router;
