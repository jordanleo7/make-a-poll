// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
// Import Mongoose
var mongoose = require('mongoose');
// Set up mongoose connection
mongoose.connect(process.env.MONGO_URI, {
  useMongoClient: true
});
// Get the connection
var db = mongoose.connection;
// Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'connection error:'));
// Once our connection opens, our callback will be called
// db.once('open', function() {
  // we're connected!
  // });

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
  res.status(422).send({error: err.message});
  
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
