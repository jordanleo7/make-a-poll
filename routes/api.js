var express = require('express');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
const router = express.Router();
const Poll = require('../models/polls');

// Get a poll
router.get("/polls", function (req, res, next) {
  
  Poll.find({}).then(function(polls){
    res.send(polls);
  })
  
  
  
  
  /*Poll.find({}, function (err, poll) {
        if (err) return err;
        response.send(poll);
      })
  */
});

// Create a poll
router.post("/polls", urlEncodedParser, function (req, res, next) {
  
  // Split textarea by enter/return
  var createOptions = req.body.options.split(/\r?\n/);
  // Create array of votes ie. 0,0,0,0
  var i = 0;
  var createVotes = [];
  for (i = 0; i < createOptions.length; i++) { 
    createVotes.push(0);
  }
  var createPoll = new Poll({ title: req.body.title, options: createOptions, votes: createVotes});
  
  // Create poll
  Poll.create(createPoll).then(function(poll){
    res.send(poll);
  }).catch(next);
  
});

// Update a poll


// Delete a poll
router.delete("/polls", function(req,res,next){
  res.send({type: 'DELETE'});
})

module.exports = router;