var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var representativeSchema = mongoose.Schema({
  representativeName: String,
  representativeParty: String
});

var Representative = mongoose.model('Representative', representativeSchema);

var selectAll = function(callback) {
  Representative.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

module.exports.Representative = Representative;