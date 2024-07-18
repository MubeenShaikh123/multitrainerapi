var mongoose = require('mongoose');

var gallarySchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  photos: [String] // Array of strings to store file paths
});

module.exports = mongoose.model('Gallary', gallarySchema);
