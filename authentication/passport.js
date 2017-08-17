// Passport Authentication
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const express = require('express');
const session = require('express-session');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const bcrypt = require('bcryptjs');
let salt = bcrypt.genSaltSync(10);
let hash = bcrypt.hashSync('password', salt);

const db = require("../models");


// Authentication Middleware
module.exports = function(app){
  
  app.use(session({ 
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  
  // Initialize Passport
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Connect Flash
  app.use(flash());
  
  // Express Validator
  app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

  // Authentication Strategy
  passport.use(new LocalStrategy(
    function(email, password, done) {
      console.log(req.body.email, req.body.password);
      console.log(email, password);
      db.User.findOne({ email: email }, function(err, user) {
        console.log(err);
        if (err) { 
          done(null, false, { message: 'Unknown User' })
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect email.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));
  
  // Session Management
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
}

