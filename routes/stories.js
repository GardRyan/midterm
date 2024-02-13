// all route for showing new filter page
const express = require('express');
const router  = express.Router();
const { runWithLoginUser } = require('./partials/_loginUser')

router.get('/', (req, res) => {
  //todo - get stories all stories and show to user
  // want to allow filters such as "my stories", "my conrtibutions"
  runWithLoginUser(req.session.user_id, (loginInfo) => {
    res.render('stories', { loginInfo })
  });
}); 

module.exports = router;