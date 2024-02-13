// all routes for API calls to filter/order search data async
const express = require('express');
const router  = express.Router();
const { runWithLoginUser } = require('./partials/_loginUser')

router.get('/', (req, res) => {
  //todo - returns story data as per the filter/order specified by the client
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    res.render('users', { loginInfo });
  });
}); 

module.exports = router;