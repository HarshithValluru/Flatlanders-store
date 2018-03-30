const mongojs = require("mongojs");
const express = require("express");
const ejs = require('ejs');
const bodyParser = require('body-parser');
const lodash = require('lodash');
const os = require('os');

var port = process.env.PORT || 3001 ;

var {mongoose} = require('./server/db/mongoose');
var {gemStores} = require('./server/models/gemStores');
var {gemDetails} = require('./server/models/insertInitialData');
var username = os.userInfo().username;

var app = express();
app.use(express.static(__dirname+"/public"));
app.engine('html', ejs.renderFile);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.render('./flatlanders.html');
});

//Use this only to insert Inital Data of gems. Else Comment it.
app.get('/initialInsert',(req,res)=>{
	gemStores.remove({}).then(()=>{
		gemStores.insertMany(gemDetails).then((gems)=>{
			res.send({gems,username});
		});
	});
});

app.get('/retrieve',function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	gemStores.find().then((testData)=>{
		res.send({testData,username});
	});
});

app.use('/addReviews',function (req, res, next) {
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(req.body);
	var body = lodash.pick(req.body,["name","reviews"]);
	console.log("body::",body);
	gemStores.findOneAndUpdate({name:body.name},{$push : {reviews : body.reviews}},{new : true})
		.then((result)=>{
		console.log("1)result::",result);
		//res.send(result.reviews);
	});
	gemStores.findOneAndUpdate({ },{ $pull: { "reviews": { "stars": { "$exists": false } } } },{ "multi": true })
	.then((result)=>{
		console.log("2)result::",result.reviews);
		res.send(result.reviews);
	});
});

var server = app.listen(port,()=>{
	console.log(`Server is running at port ${port}`);
});