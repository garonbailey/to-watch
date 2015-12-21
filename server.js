var express        = require('express'),
	server         = express(),
	bodyParser     = require('body-parser'),
	mongoose       = require('mongoose'),
	methodOverride = require('method-override'),
	Schema         = mongoose.Schema;

var userSchema = new Schema({
	username: ,
	password: ,
	movie_list: ,
});

var User = mongoose.model('User', userSchema);

server.use(express.static('./public'));
server.use(bodyParser({ extended: true }));
server.use(bodyParser.json());

// server gets and posts

mongoose.connect('mongodb://localhost:27017/towatch');
server.listen(3000, function () {
	console.log("Just your old pal, waiting on Port 3000");
});