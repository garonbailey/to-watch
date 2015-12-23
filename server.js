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
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(methodOverride('_method'));

// server gets and posts

server.get('/users', function (req, res) {
	User.findOne()
});

server.post('/users', function (req, res) {

});


// App render

server.get('*', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//DB and Server Listen

mongoose.connect('mongodb://localhost:27017/towatch');
server.listen(3000, function () {
	console.log("Just your old pal, waiting on Port 3000");
});