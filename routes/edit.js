const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");


    router = express.Router();
    router
      // Add a binding to handle '/tests'
      .get('/', function(req, res){
        res.render('login');
      });
      router.get('/create', function(req, res){
        if (req.isAuthenticated()) {
          res.render('create');
        } else {
          res.redirect('/edit')
        }
      });
      router.get('/register', function(req, res){
        mongoose.connection.db.collection('users').count(function(err, count) {
          if(count === 0) {
            res.render('register');
          } else {
            res.redirect('/');
          }
        });
      });

      router.post('/register', function(req,res) {
        User.register({
          username: req.body.username

    }, req.body.password, function(err, user) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } else {
        passport.authenticate("local")(req, res, function() {
          res.redirect('/edit/create');
        });
      }
    });
      });
      router.post('/login', passport.authenticate("local", {
    successRedirect: '/edit/create',
    failureRedirect: '/edit'
  }));
  router.post('/addpost', function(req,res) {
    const newPost = new Post({
      title : req.body.posttitle,
      text : req.body.postcontent
    });
    newPost.save().then(() => res.redirect('/edit/create'));
  });
      module.exports = router;
