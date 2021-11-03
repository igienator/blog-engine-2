const express = require('express');
const mongoose = require('mongoose');
const _ = require("lodash");
const Post = mongoose.model('Post');
    router = express.Router();
    router
      // Add a binding to handle '/tests'
      .get('/', function(req, res){
        Post.find({}, function(err, foundPost) {
          if (foundPost) {
            res.render('blog', {
              posts: foundPost
            }
           );
          }
        });
      });
router.get('/:article', function(req, res) {
  const requestedPostId = req.params.article;
  Post.findOne({_id: requestedPostId}, function(err, foundPost) {
    if (foundPost) {
      res.render('blogsingle', {
        post: foundPost
      });
    }
  });
});
      module.exports = router;
