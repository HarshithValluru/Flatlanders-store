const mongojs = require("mongojs");
const express = require("express");
const path = require('path');
const ejs = require('ejs');
const bodyParser = require('body-parser');

// To sign up into MongoDB:
var databaseUrl = "flatStore"; 
var collections = ["gems"]
var db = mongojs(databaseUrl, collections);

var app = express();
app.use(express.static(__dirname));
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.render('./flatlanders.html');
});

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

var server = app.listen(3000,()=>{
	console.log("Server is running at port 3000..");
});