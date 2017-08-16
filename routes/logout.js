const express = require('express');
const router = express.Router();

const db = require("../models");

/* GET home page. */
router.post('/', function(req, res, next){
            
  req.logout();
            
  res.redirect('/');
});

module.exports = router;
