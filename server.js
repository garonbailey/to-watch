var express        = require('express'),
	server         = express(),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose       = require('mongoose'),
	Schema         = mongoose.Schema;

// Mongoose

var userSchema = new Schema({
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	list: [{ 
		title: String, 
		year: String, 
		img: String, 
		imdb: String 
	}]
});

var User = mongoose.model('User', userSchema);

//Server Usage and Settings

server.use(express.static('./public'));
server.use(bodyParser.urlEncoded({ extended: true }));
server.use(bodyParser.json());
server.use(methodOverride('_method'));

// server gets and posts

server.get('/user', function (req, res) {
	User.findOne()
});

server.post('/user', function (req, res) {

});

server.post('/user/:id', function (req, res) {

});

//DB and Server Listen

mongoose.connect('mongodb://localhost:27017/towatch');
server.listen(3000, function () {
	console.log("Just your old pal, waiting on Port 3000");
});