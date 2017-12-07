var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Create Schema
var pollSchema = new Schema({
  title: String,
  options: String,
  votes: String
})
// Create model
var Poll = mongoose.model('Poll', pollSchema);

module.exports = Poll;