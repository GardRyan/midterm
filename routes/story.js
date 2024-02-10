// all routes for showing and updating one story
const express = require('express');
const router  = express.Router();

router.get('/story/:id', (req, res) => {
  // get and return one story);
}); 

router.post('/story', (req, res) => {
  // create and insert one story
}); 

router.post('/story/:id', (req, res) => {
  // update one story
}); 

