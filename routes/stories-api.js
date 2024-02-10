// all routes for API calls to filter/order search data async
const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  //todo - returns story data as per the filter/order specified by the client
  res.render('users');
}); 

module.exports = router;