// all routes for login/logout
const express = require('express');
const router  = express.Router();
const db = require('../db/queries/users'); 

// route to show login page
router.get('/', (req, res) => {
  res.render('login');
}); 

// route to hadndle log in requests
router.post('/', (req, res) => {
  //todo: we should display an appropriate error message if not correct credentials
  if ((!(req.body.username)) || (req.body.username.length === 0)) {
    console.log('invalid body')
    res.render('login');
    return;
  }
  if ((!(req.body.password)) || (req.body.password.length === 0)) {
    console.log('invalid password')
    res.render('login');
    return;
  }

  db.getUserByUsername(req.body.username)
    .then((result) => {
      //note, we would encrypt passwords ideally
      if (result.password === req.body.password) {
        //todo - set login cookie
        console.log('match')
        res.redirect("/users");  //todo:  just sending it somewhere for now
      } else {
        console.log(`passwords don't match`);
        res.render('login');
      }
    })
    .catch((error1) => {
      console.log(error1);
      res.send(error1);
    });
}); 

// don't think we want this
// router.get('/logout', (req, res) => {
//   //todo - show login page
  
//   res.render('login');
// }); 

router.post('/', (req, res) => {
  //todo - show login page
  
  res.render('login');
}); 

module.exports = router;