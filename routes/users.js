/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo - list of all users - maybe not needed?
  res.render('users');
}); 

router.get('/:id', (req, res) => {
  //todo:  show user info - allow update
}); 

router.post('/', (req, res) => {
  //todo: create user (registration)
}); 

router.post('/:id', (req, res) => {
  //todo: update user (registration)
}); 


module.exports = router;
