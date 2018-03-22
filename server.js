var mongojs = require("mongojs");
var express = require("express");
//var cors = require("cors");
var app = express();
var server = app.listen(3000);

var databaseUrl = "flatStore"; 
var collections = ["gems"]
var bodyParser = require('body-parser');
var db = mongojs(databaseUrl, collections);
//app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/retrieve',function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
	db.gems.find(function(err, testData) {		
		res.send(testData);
	});	
});

app.use('/addReviews',function (req, res, next) {
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader('Access-Control-Allow-Origin', '*');	
	//console.log(req.body[0]+", "+req.body[1]);
	db.gems.update({'name': req.body[0]},{$push :{'reviews':req.body[1]}},function(err,doc){//console.log("SUCCESS");
	});
	db.gems.update({ },{ $pull: { "reviews": { "stars": { "$exists": false } } } },{ "multi": true },function(err,doc){//console.log("DEL");
	});
	res.json(req.body[1]);
});
console.log("Server is running");
