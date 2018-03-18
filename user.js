var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var schema = mongoose.Schema;

var userSchema = schema({

	local: {
		email: String,
		password: String,
	},
	facebok: {
		id: String,
		token: String,
		name: String,
		email: String,
	},
	twitter: {
		id: String,
		token: String,
		displayName: String,
		username: String,
	},
	google: {
		id: String,
		token: String,
		displayName: String,
		username: String
	}
});

//hashes the passoword before it reaches to the database
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

//using bcrypt check if the password is same the local saved passowrd
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);


