const express = require('express');
const mongoose = require('mongoose');
const Post = mongoose.model('Post');
    router = express.Router();
    router
.get('/', function(req, res) {
  Post.findOne({}, function(err, foundPost) {
    if (foundPost) {
      res.render('main', {
        title: foundPost.title,
        date: foundPost.date,
        text: foundPost.text.slice(0, 500),
        postId: foundPost._id
      }
     );
    }
  });

});

      module.exports = router;
