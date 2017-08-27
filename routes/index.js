const express = require('express');
const router = express.Router();

const db = require("../models");

/* GET home page. */
router.get('/', function(req, res, next) {
  // get the top 8 artworks from db
  db.Artwork.findAll({
    limit: 8,
    order:[
      ['rating', 'DESC']
    ]
  }).then((artworks) =>{
    res.render('index', 
      { 
        title: "L'Artiste",
        artworks: artworks
      });
  })
  
});

// GET Account Settings Page
router.get('/user/account', function(req, res, next) {
  
  if(req.user){
    res.render('account');
  }
  else{
    res.redirect('/');
  }
    
});

// UPDATE User Password
router.post('/user/update-password', function(req, res, next) {
  
  if(req.user){
    
    let password = req.body.password;
    let confirmPassword = req.body.confirmPassword;
    
    res.render('account');
  }
  else{
    res.redirect('/');
  }
    
});

module.exports = router;
