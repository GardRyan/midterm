// all routes for login/logout
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo - redirect to - if logged in then my stories (login determined by cookie)
  //                     if not logged in then login page
  res.render('users');
}); 