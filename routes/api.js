var express = require('express');
var bodyParser = require('body-parser');
var urlEncodedParser = bodyParser.urlencoded({ extended: false });
var router = express.Router();
var Poll = require('../models/polls');

// Get individual poll
router.get("/userpolls", function (req, res, next) {
  
  Poll.find({ 'creator': 'placeholder' }).then(data => {
    res.json(data);
  })

})

router.get("/polll/*", function (req, res, next) {
  
  var poll_id = req.params[0];

  Poll.find({ '_id': poll_id }).then(data => {
    res.json(data);
  })

})

// Get all polls
router.get("/polls", function (req, res, next) {
  
  Poll.find({}).then(eachOne => {
    res.json(eachOne);
  })

})
  
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
  var createdBy = 'placeholder2';
  var createPoll = new Poll({ title: req.body.title, options: createOptions, votes: createVotes, voted: [], creator: createdBy });
  
  // Create poll
  Poll.create(createPoll).then(function(poll){
    res.redirect('/');
  }).catch(next);
  
});

// Update a poll
router.put("/polls/:id", urlEncodedParser, function(req,res,next){
  

  Poll.findByIdAndUpdate({_id: req.params.id}, req.body).then(function() {
    Poll.findOne({_id: req.params.id}).then(function(poll){
      res.send(poll);
    })
    
  })
  
})

// Delete a poll
router.delete("/polls", function(req,res,next){
  res.send({type: 'DELETE'});
})



module.exports = router;