/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');
const { runWithLoginUser } = require('./partials/_loginUser')

router.get('/', (req, res) => {
  //TODO: I DON"T THINK WE NEED THIS
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    userQueries.getUsers()
      .then(users => {
        res.json({ users });
      })
      .catch(err => {
        console.log(err);
        sendJsonErrorMessag(res, 500, err.message);
      });
  });
});

module.exports = router;
