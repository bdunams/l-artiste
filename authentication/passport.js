// Passport Authentication
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const express = require('express');
const session = require('express-session');

const db = require("../models");



module.exports = function(app){
  
  app.use(session({ 
    secret: 'secret',
    saveUninitialized: true,
    resave: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  //app.use(app.router);

  // Authentication Strategy
  passport.use(new LocalStrategy(
    function(username, password, done) {
      db.User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
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

