var express = require('express');
var bodyParser = require('body-parser');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require("fs"));
var request = require('request');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
 var db = require('../database-mongo');
 var cors = require('cors')

var app = express()
//app.use(cors())

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.post('/items/import', function (req, res){
	console.log("calling API")
	var GoogleAPIUrl = "https://www.googleapis.com/civicinfo/v2/representatives?key=AIzaSyDiPxMHLHy_owRvZY-qBU-Umon1cCJES9I&address=" + req.body.address;
	request(GoogleAPIUrl, function(error,response,body){
		var data = JSON.parse(body)
		var officials = data.officials;
		officials.forEach(function(official){
			let representativeData = {
				representativeName: official.name,
				representativeParty: official.party
			};

			let entry = new db.Representative(representativeData);
			entry.save(function(err){
			if (err) { 
				//res.send(err) 
			}
			});
			console.log(official.name, official.party)
		});
	 });
	console.log(req.body.address);
	res.end();
});

app.get('/items', function (req, res) {
	var partyCounts = {};
 // Model.find().count(function(err, count){
  //  console.log("Number of docs: ", count );
//});db.selectAll(function(err, data) {
   // if(err) {
     // res.sendStatus(500);
    //} else {
     // res.json(data);
   // }
  //});
  db.Representative.find({}, function(error, data){
  	partyCounts['count'] = data.length;
    console.log(data);
	})
  .then(db.Representative.count({representativeParty: 'Republican'}, function(error, republicanData){
  	console.log("************************Repubs" + republicanData)
  	 RepublicanCount = republicanData;
  	partyCounts['Republican'] = RepublicanCount;
  }))
  .then(db.Representative.count({representativeParty: 'Democratic'}, function(error, democraticData){
  	console.log("************************Dems" + democraticData)
  	 DemocraticCount = democraticData;
  	partyCounts['Democratic'] = DemocraticCount;
  }))
 .then(db.Representative.find({}).count(function(error, allDataCount){
 	console.log('ALL DATA COUNT:' + partyCounts['count']);
 	var IndependentCount = partyCounts['count'] - (partyCounts['Republican'] + partyCounts['Democratic']);
  	//console.log("************************" + IndependentCount)
  	partyCounts['Independent'] = IndependentCount;
    res.send(partyCounts);
  }))
  .then(db.Representative.remove({}, function(error, data){
	}));
});


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

