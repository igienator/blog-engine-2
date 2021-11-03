//jshint esversion:6

require('dotenv').config()
const express = require("express");

const app = express();
const ejs = require("ejs");

const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
mongoose.connect('mongodb://localhost:27017/blogV2');
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  });

const postSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  title: String,
  text: String,
});

userSchema.plugin(passportLocalMongoose);
const User = mongoose.model('User', userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const Post = mongoose.model('Post', postSchema);

const about = require('./routes/about');
const blog = require('./routes/blog');
const blogsingle = require('./routes/blogsingle');
const edit = require('./routes/edit');
const main = require('./routes/main');


//// db
//setup
app.set('trust proxy', 1);
app.set('view engine', 'ejs');
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());



//srv
//routes
app.use('/', main);
app.use('/blog', blog);
app.use('/blog/:article', blogsingle);
app.use('/edit', edit);
app.use('/about', about);

app.listen(3000, function() {
  console.log("app listening on port 3000");
});
