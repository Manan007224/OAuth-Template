var LocalStrategy = require('passport-local').Strategy;

var User = require('../user');

module.exports = function(passport) {
	//setting up passport session

	passport.serializeUser(function(user, done) {
		done(null, uer._id)
	});

	passport.deserializeUser(function(id, done){
		User.findById(id, function(err, user){
			done(err, user)
		});
	});

	passport.use('local-signup', new LocalStrategy({

			username: 'email',
			passwordField: 'password',
			passReqCallback: true
		},
			function(req, email, password, done) {
				process.nextTick(function(){
					User.findOne({'local.email': email}, function(err, user){

						if(err) return done(err);

						if(user) return done(null, false, res.json("That email is already taken"));

						else {

							var newUser = new User();
							newUser.local.email = email;
							newUser.local.password = newUser.generateHash(password);

							newUser.save(function(err) {
								if(err) console.log(err);
								return done(null, newUser)
							});
						}
					});
				});
			}));

	passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        	usernameField : 'email',
        	passwordField : 'password',
        	passReqToCallback : true // allows us to pass back the entire request to the callback
    	},
    		function(req, email, password, done) { 

        		User.findOne({ 'local.email' :  email }, function(err, user) {

            	if (err)  return done(err);

            	if (!user)  return done(null, false, req.flash('loginMessage', 'No user found.')); 

            	if (!user.validPassword(password)) return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

            	return done(null, user);
        });

    }));


};
	
	
