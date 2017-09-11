var express    = require('express');
var app        = express();
var morgan     = require('morgan');
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var router     = express.Router();//define router used for routing in api.js 
var appRoutes  = require('./app/routes/api')(router);//location of router
var path       = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//for parsing values in json format
app.use(express.static(__dirname + '/public'));//Make available all files in frontend
app.use('/api',appRoutes);//Use the routes in api.js


//http://localhost:3030/api/users
//solarcoin -db name
mongoose.connect('mongodb://localhost:27017/solarcoin',function(err) {
	if(err) {
		console.log('Not connected to the database'+ err);
	} else { 
		console.log('successfully connected to MongoDB');
	}
});

app.get('*',function(req,res){

	res.sendFile(path.join(__dirname + '/public/app/views/index.html') );
});

app.listen(process.env.PORT || 3030, function(){

	console.log('Running the server');
});