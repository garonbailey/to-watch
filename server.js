var express        = require('express'),
	server         = express(),
	bodyParser     = require('body-parser'),
	methodOverride = require('method-override'),
	mongoose       = require('mongoose'),
	Schema         = mongoose.Schema,
	PORT           = process.env.PORT || 3000,
	MONGOURI       = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
	dbname         = "towatch",
	session        = require('express-session');

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

server.use(session({
	secret: "watchinStuffs",
	resave: false,
	saveUninitialized: true
}));
server.use(express.static('./public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(methodOverride('_method'));

// server gets and posts

server.get('/users/:username', function (req, res) {
	var user = req.params.username;
	User.findOne( { username: user }, function (err, currentUser) {
		if (err) {
			res.json(err)
		} else {
			res.json(currentUser)
		}
	});
});

server.post('/users', function (req, res) {

});


// App render

server.get('*', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//DB and Server Listen

mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
	console.log("Just your old pal, waiting on Port ", PORT);
});