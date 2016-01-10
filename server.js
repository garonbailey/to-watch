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
		imdb: String,
		added: { type: Date, required: true, default: Date.now }
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

server.post('/sessions', function (req, res) {
	var checkUser = req.body.user;
	User.findOne({ username: checkUser.username }, function (err, loginUser) {
		if (err) {
			res.json(err);
		} else {
			if (loginUser.password !== checkUser.password) {
				res.send({message: "Username/password combo incorrect"});
			} else {
				req.session.user = loginUser.username;
				console.log("current user is: ", checkUser);
				console.log("user confirmation: ", loginUser);
				res.send({loggedInUser: req.session.user});
			}
		}
	});
});

server.get('/users', function (req, res) {
	User.find({}, function (err, users) {
		if (err) {
			console.log("Error getting user list: ", users);
		} else {
			res.json({users: users});
		}
	});
});

server.get('/users/:username', function (req, res) {
	var user = req.params.username;
	console.log("user from params: ", user);
	User.findOne( { username: user }, function (err, currentUser) {
		if (err) {
			res.json(err)
		} else {
			res.json({currentUser: currentUser});
			console.log("User on the Server side: ", currentUser);
		}
	});
});

server.post('/users', function (req, res) {
	var newUser = new User(req.body.user);
	newUser.list = [];
	newUser.save(function (err, user) {
		if (err) {
			console.log("Error creating user: ", err);
		} else {
			res.json({
				createdUser: user
			});
		}
	});
});

server.patch('/users/:username', function (req, res) {
	var user = req.params.username;
	var film = req.body.film;
	User.findOne( { username: user }, function (err, currentUser) {
		if (err) {
			res.json(err)
		} else {
			currentUser.list.push({ film });
			currentUser.save(function (updateErr) {
				if (!updateErr) {
					console.log("Movie added");
					res.json(currentUser);
				}
			});
		}
	});
});

// server.remove('/users/:username', function (req, res) {
// 	var user = req.params.username;
// 	var film = req.body.film;
// 	User.findOne( { username: user }, function (err, currentUser) {
// 		if (err) {
// 			res.json(err)
// 		} else {
// 			currentUser.list.title(film.title).remove();
// 			currentUser.save(function (updateErr) {
// 				if (!updateErr) {
// 					console.log("Movie removed");
// 					res.json(currentUser);
// 				}
// 			});
// 		}
// 	});
// });

server.delete('/users/:username', function (req, res) {
	var user = req.params.username;
	User.findOneAndRemove({ username: user }, function (err, userToRemove) {
		if (err) {
			res.json(err)
		} else {
			res.json({
				message: "Goodbye, Space Cowboy"
			});
		}
	});
})


// App render

server.get('*', function(req, res) {
    res.sendFile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});


//DB and Server Listen

mongoose.connect(MONGOURI + "/" + dbname);
server.listen(PORT, function () {
	console.log("Just your old pal, waiting on Port ", PORT);
});