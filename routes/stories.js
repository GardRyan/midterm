// all route for showing new filter page
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo - get stories all stories and show to user
  // want to allow filters such as "my stories", "my conrtibutions"
  res.render('stories')
  
}); 

module.exports = router;