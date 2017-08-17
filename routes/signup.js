const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');


const db = require("../models");


/* GET Register Page */
router.get('/', function(req, res, next) {
  res.render('register');
})

/* POST New User to DB After Validation */
router.post('/', function(req, res, next) {
  
  // Post Data
  let name = req.body.name;
  let email = req.body.email;
  let bio = req.body.bio;
  let password = req.body.password;
  let confirmPassword = req.body.confirmPassword;

  
  // Express Validation
  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('confirmPassword', 'Passwords do not match').equals(req.body.password);
  
  // Get Validation Results
  let errors = req.validationErrors();
  
  // IF errors, render errors to user
  if(errors){
    console.log(errors);
    res.render('error',{
        errors: errors
      });
  }
  // ELSE continue creating new user
  else{
    
    // Hash Password with Bcrypt
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let securePassword = hash;

  
    // if sign up type is artist
    // create new artist account
    if(req.body.userType === 'artist'){


      db.Artist.findOrCreate({
        where: {
          name: name,
          email: email,
          password: securePassword,
          bio: bio
        }
      })
      .spread((artist, created) => {
        
        // IF successfully created new artist
        // redirect to artists page
        if(created){
          res.redirect(`/artists/${ name }`);
        }
        // ELSE render error page
        else{
          res.render('error',{
            errors: 'An error occurred when trying to create your account! Try again'
          });
        }
        
      })

    }
    // else create new normal user account
    else{

      db.User.findOrCreate({
        where: {
          name: name,
          email: email,
          password: securePassword
        }
      })
      .spread((user, created) => {

        // IF successfully created new artist
        // redirect to artists page
        if(created){
          res.redirect(`/`);
        }
        // ELSE render error page
        else{
          res.render('error',{
            errors: 'An error occurred when trying to create your account! Try again'
          });
        }

      })
    }
  
  }
  
});

module.exports = router;
