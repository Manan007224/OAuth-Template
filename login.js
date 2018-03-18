'use strict'
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var db = require('./db.js');
var cookieParser = require('cookie-parser');

// mongoose.connect("mongodb://127.0.0.1/login_schema", function(err){
// 	if(err) {
// 		console.log(err);
// 	}
// 	else console.log('Succesfully connected to' + db);
// });

 // app.use(flash());
app.use(session({
	secret: 'practice_login_session'
}));
const dbOptions = {};
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('dev'));

const router = express.Router();

router.get('/', function(req, res){
	res.json("Hello there");
});

router.get('/login', function(req, res){
	res.json('loginmessage');
});

router.post('/login', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/login', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/signup', function(req, res){
	res.json('signupmessage');
});

router.post('/signup', passport.authenticate('local-signup', {
	successRedirect: '/profile',
	failureRedirect: '/signup',
}));

router.get('/profile', function(req, res){
	res.json("Hello there");
});

router.get('/logout', function(req, res){
	// req.logout();
	res.redirect('/');
});

app.use('/', router);
passport.use('./', require('./config/passport'));
const hostname = 'localhost';
const port = 8000;

const server = app.listen(port, hostname, () => {

  mongoose.connect("mongodb://127.0.0.1/login_schema", dbOptions, (err) => {
    if (err) {
      console.log(err);
    }
    console.log(`Server running at http://${hostname}:${port}/`);
  });
  
});
