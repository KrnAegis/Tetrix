var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)
const path = require("path");
const port = process.env.PORT || 5000;
const app = express();
require('dotenv').config()
const passport = require('./passport/index.js')
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

var db = require("./models");



app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/tetrix";
console.log("This is mondo uri", MONGODB_URI)

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/tetrix", {
	useMongoClient: true
});


var mdb = mongoose.connection;

mdb.on("error", function(err) {
  console.log("Mongoose Error: ", err);
});

mdb.once("open", function() {
  console.log("Mongoose connection successful.");
});


// ===== Passport ====
app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser


// Send every request to the React app
// Define any API routes before this runs
// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/build/static/index.html");
});

app.get("/users/all", function(req, res) {
      console.log("route being called for get users")
  db.User
    .find({})
    .then(function(dbUsers) {
    	console.log("GETTING IT!")
      res.json(dbUsers);
    })
    .catch(function(err) {
      res.json(err);
    });

});


app.get("/users/:id", function(req, res) {
  db.User
    .findOne({ _id: req.params.id })
    .populate("nickname")
    .then(function(dbUsers) {
      res.json(dbUsers);
    })
    .catch(function(err) {
      res.json(err);
    });
});

// =============================================================================
app.get('/user', (req, res, next) => {
  console.log('===== user!!======')
  console.log(req.user)
  if (req.user) {
    return res.json({ user: req.user })
  } else {
    return res.json({ user: null })
  }
});

app.post(
  '/login',
  function(req, res, next) {
    console.log(req.body)
    console.log('================')
    next()
  },
  passport.authenticate('local'),
  (req, res) => {
    console.log("this is req after auth " ,req.user)
    console.log('POST to /login')
    const user = JSON.parse(JSON.stringify(req.user)) // hack
    const cleanUser = Object.assign({}, user)
    if (cleanUser) {
      console.log(`Deleting ${cleanUser.password}`)
      delete cleanUser.password
    }
    res.json({ user: cleanUser })
  });

app.post('/logout', (req, res) => {
  if (req.user) {
    req.session.destroy()
    res.clearCookie('connect.sid') // clean up!
    return res.json({ msg: 'logging you out' })
  } else {
    return res.json({ msg: 'no user to log out!' })
  }
})

app.post('/signup', (req, res) => {
  console.log("this is from server", req.body)
  var user = req.body.user;
  var password = req.body.password;
  var nickname = req.body.nickname;
  // ADD VALIDATION
  db.User.findOne({ 'user': user }, (err, userMatch) => {
    if (userMatch) {
      return res.json({
        error: `Sorry, already a user with the username: ${user}`
      })
    }
    db.User
    .create({
      user: user, 
      password: password,
      nickname: nickname
    }).then((dbUser, err) =>{
      console.log("MADE IT HERE!");
      console.log("this is dbUser ", dbUser)
      const userId = dbUser._id;
      return res.json(dbUser)
    }).catch((err) =>{
      console.log(err);
    });
  })
})

//================================================================================
app.post("/users/save", function(req, res) {
	console.log("this is from server", req.body)
	var user = req.body.user;
	var password = req.body.password;
	var nickname = req.body.nickname;
	console.log("this is user name and password and nickname " + user + " " + password + " " + nickname);

	db.User
	.create({
		user: user, 
		password: password
	}).then((dbUser, err) =>{
		console.log("MADE IT HERE!");
		console.log("this is dbUser ", dbUser)
		const userId = dbUser._id;
		db.Nickname
		.create({nickname:nickname})
		.then(function(dbNickname){
			return db.User.findOneAndUpdate({ _id: userId }, { nickname: dbNickname._id }, { new: true });
		})
	}).catch((err) =>{
		console.log(err);
	});

	//res.json("sdfghjkljghfsdfghjk");
});



app.listen(port, function() {
  console.log(`🌎 ==> Server now on port ${port}!`);
});
