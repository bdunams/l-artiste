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
  
  // validate password update
  let oldPassword = req.body.oldPassword;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  req.checkBody('oldPassword', 'Old password is required').notEmpty();
  req.checkBody('password', 'New Password is required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);

  // Get Validation Results
  let errors = req.validationErrors();
  
  // IF errors, render errors to user
  if(errors){

    return res.render('account',{
        error_msg: errors
      });

  }
  
  // ELSE continue updating user password
  else{
  
  
    // IF a user is logged in and enters correct current password
    if(db.User.checkPassword(req.body.oldPassword, req.user.password)){
     
      // Hash Password with Bcryptjs
      let securePassword = db.User.hashPassword(password);
      
      // Update new password in database
      db.User.update({
        password: securePassword
      },{
        where: {
          id: req.user.id
        }
      })
      .then((user) =>{
        
        res.render('account',{
          success_msg: 'Successfully updated password!'
        });
      })
      .catch((err) => {
        
        res.render('account',{
          error_msg: 'Password update was not successful'
        });
      })
      
    }
    // ELSE old password didnt match the current password
    else{

      return res.render('account',{
            error_msg: {msg:'Password did not match'}
          });
    }
    
  }
    
});

module.exports = router;
