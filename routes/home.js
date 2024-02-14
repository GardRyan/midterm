// all routes for login/logout
const express = require('express');
const router  = express.Router();
const { runWithLoginUser } = require('./partials/_loginUser')

router.get('/', (req, res) => {
  //todo - redirect to - if logged in then my stories (login determined by cookie)
  //                     if not logged in then login page
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    if (loginInfo.loggedInUser === undefined) {
      res.redirect("/login");
    } else {
      res.redirect('/stories');
    }
  });
});

module.exports = router;
