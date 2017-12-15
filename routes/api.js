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
  
  var createTitle = req.body.title;
  // Split textarea by enter/return
  var createOptions = req.body.options.split(/\r?\n/);
  var createdBy = 'placeholder';

  var createPoll = new Poll({ 
    title: createTitle,
    options: [],
    voted: [],
    creator: createdBy 
  });
  
  // Save poll
  Poll.create(createPoll).then(function(){
    Poll.findOne({title: createTitle}).then(function(poll){
      // Add options to poll
      var i = 0;
      for (i = 0; i < createOptions.length; i++) {
        var currentOption = createOptions[i];
        poll.options.push({name: currentOption, votes: 0});
      }
      poll.save();
    })
    res.redirect('/');
  });
  
});

// Update a poll
router.put("/polls/:id", urlEncodedParser, function(req,res,next){
  
  var poll_id = req.params[0];

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