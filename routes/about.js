const express = require('express'),
    router = express.Router();
    router
      // Add a binding to handle '/tests'
      .get('/', function(req, res){
        res.render('about');
      });

      module.exports = router;
