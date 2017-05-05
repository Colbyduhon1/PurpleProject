var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var request = require('request');
var async = require('async');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
 var db = require('../database-mongo');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/items/import', function (req, res){
	var GoogleAPIUrl = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDiPxMHLHy_owRvZY-qBU-Umon1cCJES9I&address=" + req.body.address;
	var array = [];
	request(GoogleAPIUrl, function(error,response,body){
		var data = JSON.parse(body)
		var officials = data.officials;
		officials.forEach(function(official){
			let representativeData = {
				representativeName: official.name,
				representativeParty: official.party
			};

			let entry = new db.Representative(representativeData);
			// add the entry to the arry youre bulding
			array.push(entry);
		});
		console.log(array);
		db.Representative.create(array, function(err, entries) {
				if (err) { 
					res.send(err) 
				}
				else {
	
					res.end();
				}
			});
	 });
});



app.get('/items', function (req, res) {

let partyCounts = {};

async.parallel({
	count: function(callback) {
  	return db.Representative.find({}, function(err, data){
  		return  callback(err,data.length);
	});
  },
  	Republican: function(callback){
  		return db.Representative.count({representativeParty: 'Republican'}, function(err, data){
  			return callback(err, data);
  		});
  	},
  	Democratic: function(callback){
  		 return db.Representative.count({representativeParty: 'Democratic'}, function(err, data){
  		 	return callback(err, data);
  	});
  	},
  	Independent: function(callback){
		return db.Representative.count( {$nor: [{representativeParty: 'Democratic'},{representativeParty: 'Republican'}]} , function(err, data){
  		 	return callback(err,data);
  	});
	}
}, function(err, partyCounts){
  	return res.json(partyCounts);
  })
})

  	/*

 db.Representative.find({}).count(function(error, allDataCount){
 	console.log('ALL DATA COUNT:' + partyCounts['count']);
 	var IndependentCount = partyCounts['count'] - ((partyCounts['Republican'] + partyCounts['Democratic']));
  	partyCounts['Independent'] = IndependentCount;
  	console.log(partyCounts);
  	console.log('Sending data');
  	console.log('data sent');
  	res.send(partyCounts);
  })
  .then(db.Representative.remove({}, function(error, data){
	}));
});*/


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

