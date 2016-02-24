var Bookshelf = require('bookshelf');

// For Local testing
/*
var config = {
	host: 'localhost',
	user: 'root',
	password: 'p',
	database: 'parkudb',
	charset: 'UTF8_GENERAL_CI'
};
*/

// For Heroku database
var config = {
	host: 'jw0ch9vofhcajqg7.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
	user: 'hacd9bv6o2fyqb9a',
	password: 'w5c6dw6vb9blc07b',
	database: 'ifevrxznxvctquex',
	charset: 'UTF8_GENERAL_CI'
};

var DB = Bookshelf.initialize({
   client: 'mysql', 
   connection: config
});

module.exports.DB = DB;
